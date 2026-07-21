<script setup>
import { ref, reactive, computed, nextTick, onMounted, onBeforeUnmount } from "vue";

/**
 * AmortreeBot — guided lead-capture chatbot.
 *
 * Why "guided" instead of a raw LLM hookup: a free-form AI chatbot needs a
 * server-side API key (an LLM call from the browser would expose that key
 * to anyone who opens devtools). This widget gets you 90% of the value —
 * instant answers about services, qualifying questions, lead capture, and
 * contextual FAQs — with zero backend to run. If you later want true
 * generative answers, swap `sendToSheet()`'s endpoint for a small
 * serverless function that calls an LLM server-side and keep everything else.
 *
 * Every completed conversation is POSTed to a Google Apps Script Web App,
 * which appends a row to a Google Sheet. See google-apps-script.gs.
 *
 * UX notes (v4):
 * - Contact info (name, phone, email) is now collected right up front, before
 *   services are shown — this guarantees a lead is captured even if the
 *   visitor never picks a service. A lightweight, silent POST fires the
 *   moment email is collected (source: "chatbot-partial"), then a second,
 *   fuller POST fires at the natural end of the conversation once service +
 *   notes are known (source: "chatbot"). If you'd rather only ever get one
 *   row per visitor, remove the `silentCapture()` call in `handleEmail()`
 *   and dedupe isn't needed.
 * - Expanding/collapsing a long answer ("Show more"/"Show less") no longer
 *   yanks the scroll position to the bottom — it anchors the scroll to the
 *   same relative spot so nothing jumps.
 * - Several of the bot's stock lines (greeting, prompts, transitions) are
 *   picked at random from a small set of variants each time, so repeat
 *   visits/testing don't feel like the exact same script on a loop.
 * - Conversations persist to localStorage (continuity across reloads/closed tabs).
 */

// ── Config ──────────────────────────────────────────────────────────────────
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbzd3LSVcOjacl7YBqQnxnB_kp_eksqIrn8KO1JpMLrj1YStoTjtHLP5eJjR7kTOo7MMng/exec";
const STORAGE_KEY = "amb_conversation_v4";
const TRUNCATE_LEN = 200; // characters before a bot message collapses behind "Show more"
const SUGGESTIONS_PER_TURN = 3; // how many FAQ chips to surface after each answer

// ── Small phrasing variety, so the bot doesn't sound identical every time ───
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randDelay(min = 320, max = 680) { return Math.floor(min + Math.random() * (max - min)); }

const GREETINGS = [
  "👋 Welcome to amortree Tech! I'm your AI assistant, here to help you explore our services, answer your questions, and connect you with our team when you're ready.",
  "Hi there! 👋 I'm the amortree AI Assistant. Whether you need a website, branding, digital marketing, or a custom solution, I'm here to point you in the right direction.",
  "Hello! 🚀 I'm the amortree AI Assistant. Tell me about your business or project, and I'll help you find the best solution or connect you with our experts.",
  "Welcome! ✨ Need a website, eCommerce store, SEO, branding, or digital marketing? Ask me anything—I'm here to help you get started.",
  "Hey! 👋 I'm your amortree AI Assistant. I can explain our services, recommend the right solution for your business, or help you request a free consultation.",
  "Hi! 💙 Looking to grow your business online? I'm here to answer your questions, guide you through our services, and help you take the next step with confidence.",
];
const NAME_PROMPTS = [
  "First off — what should I call you?",
  "To kick things off, what's your name?",
  "Let's start simple — what should I call you?",
];
const PHONE_PROMPTS = (name) => ([
  `Great to meet you, ${name}! 😉 Could you share a phone number where our team can reach you?`,
  `Lovely to meet you, ${name}! 📱 What's the best phone number to reach you on?`,
  `Thanks, ${name}! Mind popping in a phone number so our team can follow up?`,
]);
const EMAIL_PROMPTS = [
  "Perfect! And what's the best email address to reach you at? 📧",
  "Great, got it! One more — what's a good email for you?",
  "Thanks! Last one — what email should we use to follow up?",
];
const SERVICE_TRANSITIONS = (name) => ([
  `Thank you so much for sharing your details, ${name}! ☀️ Now that I have your info, here are the services we offer. Please choose one!`,
  `All set, ${name}! 🎉 Here's what we can help with — pick whatever fits best.`,
  `Perfect, ${name} — you're all set up. Here's a look at what we offer!`,
]);
const FAQ_FOLLOWUPS = [
  "Anything else you'd like to know, or ready for a quote?",
  "Want to dig into anything else, or should we get you a quote?",
  "Got more questions, or ready to get a quote rolling?",
];
const FAQ_EXHAUSTED = [
  "That covers the common questions here — want me to connect you with the team for a free quote?",
  "That's the main stuff people ask about this — ready for a free quote from the team?",
  "I think that covers it — shall I connect you with the team for a free quote?",
];

const SERVICES = [
  { id: "web-design", label: "Website Design", blurb: "We design custom, conversion-focused websites — not templates. Typical turnaround is 2–4 weeks depending on scope.", link: "/website-design" },
  { id: "web-dev", label: "Web Development", blurb: "From marketing sites to custom web apps, built to be fast, maintainable, and easy for your team to update.", link: "/web-development" },
  { id: "ecommerce", label: "E-commerce & Shopify", blurb: "Shopify builds and custom e-commerce, set up to actually convert — clean checkout flow, fast load times, mobile-first.", link: "/shopify-development" },
  { id: "seo", label: "SEO", blurb: "Local and national SEO — Google Business Profile, on-page fundamentals, and content that targets what your customers actually search.", link: "/seo" },
  { id: "marketing", label: "Digital Marketing", blurb: "Paid ads, social, and LinkedIn marketing built around measurable lead flow, not vanity metrics.", link: "/digital-marketing" },
  { id: "branding", label: "Branding & UI/UX", blurb: "Logo, visual identity, and UI/UX design that gives your business a consistent, professional look across every touchpoint.", link: "/branding" },
  { id: "leadgen", label: "Lead Generation", blurb: "WhatsApp funnels, landing pages, and contact flows designed specifically to turn visitors into enquiries.", link: "/lead-generation" },
  { id: "maintenance", label: "Website Maintenance", blurb: "Ongoing updates, security patches, and small content changes, so your site never quietly goes stale.", link: "/website-maintenance" },
  { id: "other", label: "Something else", blurb: null, link: null },
];

const KEYWORD_MAP = [
  { id: "web-design", words: ["design", "redesign", "website design", "look", "ui"] },
  { id: "web-dev", words: ["develop", "development", "build", "code", "app"] },
  { id: "ecommerce", words: ["shop", "store", "ecommerce", "e-commerce", "shopify", "sell online"] },
  { id: "seo", words: ["seo", "rank", "google", "search engine"] },
  { id: "marketing", words: ["marketing", "ads", "social media", "linkedin", "campaign"] },
  { id: "branding", words: ["brand", "logo", "identity", "ux", "ui/ux"] },
  { id: "leadgen", words: ["leads", "lead generation", "whatsapp", "enquiries", "enquiry"] },
  { id: "maintenance", words: ["maintain", "maintenance", "update my site", "fix my site", "broken"] },
];

const GREETING_WORDS = ["hi", "hii", "hiii", "hello", "hey", "heya", "yo", "sup", "hola", "hlo"];

// ── FAQ content — PLACEHOLDER, not sourced from amortree.com ────────────────
const FAQS_BY_SERVICE = {
    "web-design": [
        { q: "What is included in your website design service?", a: "Our service includes research, wireframing, custom UI/UX design, responsive layouts, and design revisions before development begins." },
        { q: "Do you design for mobile devices?", a: "Yes. Every interface is designed to deliver a seamless experience across desktops, tablets, and smartphones." },
        { q: "Can you redesign my existing website?", a: "Absolutely. We can modernize your current website while improving usability, branding, and conversions." },
        { q: "What if I don't like the initial design direction?", a: "We work closely with you, gathering feedback and refining the design until it aligns with your vision and business goals." },
        { q: "Do I own the final design files?", a: "Yes. Once the project is completed and paid in full, you receive ownership of the approved design assets." },
        { q: "How long does the design process take?", a: "Most website design projects are completed within 1–3 weeks, depending on the project's scope and feedback timeline." },
    ],
    "web-dev": [
        { q: "Do you build fully custom websites?", a: "Yes. Every website is custom-developed based on your business goals without relying on pre-built templates." },
        { q: "Will I own the website after it's completed?", a: "Yes. You receive full ownership of the website, including the source code and project assets." },
        { q: "Can my website grow as my business grows?", a: "Absolutely. We build scalable solutions that can be expanded with new features whenever needed." },
        { q: "Will my website be fast and SEO-friendly?", a: "Yes. Performance, responsive design, clean code, and SEO best practices are built into every project." },
        { q: "Can you integrate third-party services?", a: "Yes. We integrate payment gateways, CRMs, APIs, booking systems, analytics, and more." },
        { q: "Will my website work on all devices?", a: "Yes. Every website is optimized for desktops, tablets, and mobile devices." },
    ],
    "ecommerce": [
        { q: "Do you build custom eCommerce websites?", a: "Yes. We create online stores tailored to your products, customers, and business workflows." },
        { q: "Which platforms do you work with?", a: "We primarily build with Shopify and custom development depending on your business requirements." },
        { q: "Can you migrate my existing online store?", a: "Yes. We can safely migrate products, customers, and order data from most platforms." },
        { q: "Will my store be mobile-friendly?", a: "Absolutely. Every store is optimized for mobile shopping and checkout." },
        { q: "Can you integrate payment gateways?", a: "Yes. We integrate secure payment gateways, shipping providers, and third-party business tools." },
        { q: "Do you provide support after launch?", a: "Yes. We offer ongoing maintenance, updates, and technical support whenever required." },
    ],
    "seo": [
        { q: "What SEO services do you offer?", a: "We provide technical SEO, on-page optimization, local SEO, content optimization, and performance improvements." },
        { q: "How long does SEO take to show results?", a: "Most businesses begin seeing meaningful improvements within 3–6 months." },
        { q: "Do you guarantee first-page rankings?", a: "No. Ethical SEO focuses on sustainable growth rather than unrealistic guarantees." },
        { q: "Can you optimize my existing website?", a: "Yes. We improve your current website's structure, speed, and search visibility." },
        { q: "Do you optimize Google Business Profile?", a: "Yes. Local SEO and Google Business Profile optimization are part of our services." },
        { q: "Will I receive SEO reports?", a: "Yes. You'll receive regular reports showing rankings, traffic, and overall SEO performance." },
    ],
    "marketing": [
        { q: "Which marketing services do you provide?", a: "We manage Google Ads, Meta Ads, LinkedIn Ads, SEO, and digital growth strategies." },
        { q: "Which advertising platforms do you use?", a: "We advertise on Google, Facebook, Instagram, LinkedIn, and other relevant platforms." },
        { q: "Can you manage my social media?", a: "Yes. We create content, schedule posts, and manage paid advertising campaigns." },
        { q: "How do you measure campaign success?", a: "We track leads, conversions, engagement, and return on ad spend through analytics." },
        { q: "Is there a minimum advertising budget?", a: "No fixed minimum. We recommend a budget based on your goals and competition." },
        { q: "Do you provide monthly reports?", a: "Yes. You'll receive clear reports with actionable insights and campaign performance." },
    ],
    "branding": [
        { q: "What does a branding package include?", a: "It includes logo design, colors, typography, visual identity, and brand guidelines." },
        { q: "Can you redesign an existing brand?", a: "Yes. We modernize brands while preserving the elements your customers already recognize." },
        { q: "Do you design logos separately?", a: "Yes. Logo design can be provided as a standalone service." },
        { q: "How do you create a brand identity?", a: "We start by understanding your business, audience, and positioning before designing." },
        { q: "Will I receive editable files?", a: "Yes. You'll receive the final brand assets in industry-standard formats." },
        { q: "Can you create marketing materials too?", a: "Yes. We also design business cards, brochures, presentations, social media assets, and more." },
    ],
    "leadgen": [
        { q: "What is lead generation?", a: "Lead generation is the process of attracting potential customers and converting them into qualified enquiries." },
        { q: "Do you build landing pages?", a: "Yes. We create high-converting landing pages tailored to your campaigns." },
        { q: "Can you integrate WhatsApp?", a: "Yes. We build WhatsApp lead flows that make it easy for customers to contact your business." },
        { q: "Do you connect with CRM systems?", a: "Yes. We integrate with popular CRM platforms whenever required." },
        { q: "How do you improve lead quality?", a: "We use better targeting, optimized landing pages, and qualification strategies." },
        { q: "Can you automate follow-ups?", a: "Yes. We can automate responses and lead nurturing using the right tools." },
    ],
    "maintenance": [
        { q: "What does your maintenance service include?", a: "It includes updates, security monitoring, backups, performance checks, and technical support." },
        { q: "Is maintenance mandatory?", a: "No. Maintenance is optional, but it helps keep your website secure and reliable." },
        { q: "Do you provide emergency support?", a: "Yes. Critical website issues are prioritized and resolved as quickly as possible." },
        { q: "Can you update website content?", a: "Yes. We can assist with content, image, and feature updates whenever needed." },
        { q: "Do you monitor website uptime?", a: "Yes. We monitor uptime to quickly detect and respond to unexpected issues." },
        { q: "Can I request new features later?", a: "Absolutely. New functionality can be planned and developed whenever your business requires it." },
    ],
};

const GENERAL_FAQS = [
  { q: "What if I'm not happy with the final result?", a: "We build in revision rounds specifically so we can course-correct together before final delivery, rather than surprising you with a finished product." },
  { q: "Do I own the website and code after it's built?", a: "Yes — full ownership transfers to you once the project is paid in full. No lock-in, no recurring platform fees to us." },
  { q: "How does payment work?", a: "Typically a deposit to start, a milestone payment at design approval, and the balance on delivery — so you're never paying in full upfront." },
  { q: "How much does a website cost?", a: "It depends on scope — a single landing page typically runs ₹8,000–₹25,000, while a full multi-page site is usually ₹25,000–₹80,000+. Happy to give you a specific range once I know a bit about your project." },
  { q: "How long does a project take?", a: "A landing page usually takes 1–2 weeks, a multi-page site 3–6 weeks — assuming your content and brand assets are ready to go when we start." },
  { q: "Do you work with clients outside Bengaluru?", a: "Yes — we're based in Bengaluru but work with clients across India and internationally, entirely remote." },
];

// ── State ───────────────────────────────────────────────────────────────────
const open = ref(false);
const hasOpenedOnce = ref(false);
const showPulse = ref(true);
const typing = ref(false);
const input = ref("");
const messagesEl = ref(null);
const inputEl = ref(null);
const sending = ref(false);
const sent = ref(false);

const messages = ref([]);
const lead = reactive({ name: "", service: "", serviceLabel: "", email: "", phone: "", message: "" });
const askedFaqs = ref([]); // question text already shown, so suggestions don't repeat

const step = ref("name");
const nameAttempts = ref(0);

let msgId = 0;
const typeIntervals = new Map();

const inputPlaceholder = computed(() => (
  step.value === "service" ? "Please select an option above…" : "Write your message…"
));

function pushBotMessage(text, opts = {}) {
  const msg = reactive({
    id: ++msgId,
    from: "bot",
    text,
    displayText: "",
    typed: false,
    expanded: false,
    quickReplies: opts.quickReplies || null,
    suggestions: opts.suggestions || null,
    time: new Date(),
  });
  messages.value.push(msg);
  scrollToBottom();
  typeMessage(msg);
  return msg;
}

function pushUserMessage(text) {
  messages.value.push({ id: ++msgId, from: "user", text, displayText: text, typed: true, quickReplies: null, suggestions: null, expanded: true, time: new Date() });
  scrollToBottom();
  saveState();
}

function typeMessage(msg) {
  const chars = Array.from(msg.text);
  let i = 0;
  const interval = setInterval(() => {
    i++;
    msg.displayText = chars.slice(0, i).join("");
    if (i % 4 === 0) scrollToBottom();
    if (i >= chars.length) {
      clearInterval(interval);
      typeIntervals.delete(msg.id);
      msg.typed = true;
      scrollToBottom();
      saveState();
    }
  }, 16);
  typeIntervals.set(msg.id, interval);
}

function skipTyping(msg) {
  if (msg.typed) return;
  const interval = typeIntervals.get(msg.id);
  if (interval) clearInterval(interval);
  msg.displayText = msg.text;
  msg.typed = true;
  saveState();
}

// Only auto-follow the conversation to the bottom; never yank the view for
// actions the user initiated somewhere they were already reading (see
// withScrollAnchor for that case).
function scrollToBottom() {
  nextTick(() => { if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight; });
}

// Keeps whatever the user is currently looking at anchored in place while a
// message's height changes (e.g. Show more/Show less), instead of forcing a
// jump to the bottom. Fixes the "conversation jumps around" issue.
function withScrollAnchor(mutate) {
  const el = messagesEl.value;
  const prevHeight = el ? el.scrollHeight : 0;
  const prevTop = el ? el.scrollTop : 0;
  mutate();
  nextTick(() => {
    if (!el) return;
    const newHeight = el.scrollHeight;
    el.scrollTop = prevTop + (newHeight - prevHeight);
  });
}

function botSay(text, opts = {}, delay = null) {
  typing.value = true;
  scrollToBottom();
  const d = delay ?? randDelay();
  return new Promise((resolve) => {
    setTimeout(() => {
      typing.value = false;
      const msg = pushBotMessage(text, opts);
      const check = setInterval(() => { if (msg.typed) { clearInterval(check); resolve(); } }, 40);
    }, d);
  });
}

function formatTime(d) { return new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }

function escapeHtml(str) { return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function renderRich(text) {
  let safe = escapeHtml(text);
  safe = safe.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  safe = safe.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener" class="amb-link">$1<\/a>');
  return safe;
}

function isNewGroup(i) {
  const prev = messages.value[i - 1];
  return !prev || prev.from !== messages.value[i].from;
}
function showAvatar(i) { return messages.value[i].from === "bot" && isNewGroup(i); }
function isLastInGroup(i) {
  const next = messages.value[i + 1];
  return !next || next.from !== messages.value[i].from;
}

// ── Long-answer truncation ("Show more") ────────────────────────────────────
function needsTruncation(msg) {
  return msg.from === "bot" && Array.from(msg.text).length > TRUNCATE_LEN;
}
function truncatedText(msg) {
  const chars = Array.from(msg.text);
  if (chars.length <= TRUNCATE_LEN) return msg.text;
  return chars.slice(0, TRUNCATE_LEN).join("").trimEnd() + "…";
}
function displayedText(msg) {
  if (needsTruncation(msg) && !msg.expanded) return truncatedText(msg);
  return msg.text;
}
function toggleExpand(msg) {
  withScrollAnchor(() => { msg.expanded = !msg.expanded; });
  saveState();
}

// ── Contextual FAQ suggestions ───────────────────────────────────────────
function faqPoolFor(serviceId) {
  return FAQS_BY_SERVICE[serviceId] || GENERAL_FAQS;
}
function nextFaqs(serviceId, limit = SUGGESTIONS_PER_TURN) {
  return faqPoolFor(serviceId).filter((f) => !askedFaqs.value.includes(f.q)).slice(0, limit);
}
function buildSuggestions(serviceId, { includeQuote = true } = {}) {
  const faqs = nextFaqs(serviceId).map((f) => ({ type: "faq", label: f.q, item: f }));
  if (includeQuote) faqs.push({ type: "quote", label: "Get a free quote" });
  return faqs;
}

function handleSuggestionClick(msg, s) {
  msg.suggestions = null;
  if (s.type === "quote") {
    pushUserMessage("Get a free quote");
    handleWantsQuote("yes");
  } else {
    askSuggestedFaq(s.item);
  }
}

async function askSuggestedFaq(item) {
  pushUserMessage(item.q);
  if (!askedFaqs.value.includes(item.q)) askedFaqs.value.push(item.q);
  await botSay(item.a);

  const remaining = nextFaqs(lead.service);
  if (remaining.length > 0) {
    await botSay(pick(FAQ_FOLLOWUPS), { suggestions: buildSuggestions(lead.service) });
    step.value = "exploring";
  } else {
    await botSay(pick(FAQ_EXHAUSTED), {
      quickReplies: [
        { label: "Yes, get me a quote", value: "yes" },
        { label: "Just browsing for now", value: "no" },
      ],
    });
    step.value = "wantsQuote";
  }
  saveState();
}

// ── Silent partial capture ──────────────────────────────────────────────
// Fires the moment we have name + phone + email, independent of whether the
// visitor goes on to pick a service. Guarantees the lead lands in the sheet
// even if they close the tab right after this point.
async function silentCapture() {
  if (!SHEET_ENDPOINT) return;
  try {
    await fetch(SHEET_ENDPOINT, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name: lead.name, service: "", email: lead.email, phone: lead.phone,
        message: "", source: "chatbot-partial", page: window.location.pathname,
      }),
    });
  } catch (err) {
    console.error("AmortreeBot: partial capture failed", err);
  }
}

// ── Persistence (continuity across reloads / closed tabs) ──────────────────
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      messages: messages.value.map((m) => ({
        id: m.id, from: m.from, text: m.text, expanded: m.expanded,
        quickReplies: m.quickReplies, suggestions: m.suggestions, time: m.time,
      })),
      lead: { ...lead },
      askedFaqs: askedFaqs.value,
      step: step.value,
      hasOpenedOnce: hasOpenedOnce.value,
      nameAttempts: nameAttempts.value,
      sent: sent.value,
    }));
  } catch (e) {
    // localStorage may be unavailable (private browsing, disabled storage) — fail silently
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data.messages || !data.messages.length) return false;

    messages.value = data.messages.map((m) => reactive({
      ...m,
      displayText: m.text,
      typed: true,
    }));
    Object.assign(lead, data.lead || {});
    askedFaqs.value = data.askedFaqs || [];
    step.value = data.step || "name";
    hasOpenedOnce.value = !!data.hasOpenedOnce;
    nameAttempts.value = data.nameAttempts || 0;
    sent.value = !!data.sent;
    msgId = messages.value.reduce((max, m) => Math.max(max, m.id), 0);
    return true;
  } catch (e) {
    return false;
  }
}

function clearState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
}

// ── Lifecycle ───────────────────────────────────────────────────────────────
function toggleOpen() {
  open.value = !open.value;
  showPulse.value = false;
  if (open.value && messages.value.length === 0) {
    hasOpenedOnce.value = true;
    startConversation();
  }
  if (open.value) nextTick(() => inputEl.value?.focus());
}

async function startConversation() {
  await botSay(pick(GREETINGS), {}, randDelay(250, 450));
  await botSay(pick(NAME_PROMPTS));
  step.value = "name";
}

function restart() {
  typeIntervals.forEach((iv) => clearInterval(iv));
  typeIntervals.clear();
  messages.value = [];
  Object.assign(lead, { name: "", service: "", serviceLabel: "", email: "", phone: "", message: "" });
  askedFaqs.value = [];
  step.value = "name";
  nameAttempts.value = 0;
  sent.value = false;
  clearState();
  startConversation();
}

// ── Upfront contact capture: name → phone → email → services ───────────────
async function askServices() {
  step.value = "service";
  await botSay(pick(SERVICE_TRANSITIONS(lead.name.split(" ")[0])), {
    quickReplies: SERVICES.map((s) => ({ label: s.label, value: s.id })),
  });
}

async function handleName(text) {
  pushUserMessage(text);
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  if (GREETING_WORDS.includes(lower)) {
    await botSay("I see you're saying hi again! 😊 But I still need to know your name to get started. Could you please share it with me?");
    return;
  }

  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  if (trimmed.length < 3 || (wordCount === 1 && trimmed.length <= 3)) {
    nameAttempts.value++;
    if (nameAttempts.value === 1) {
      await botSay("Thanks for sharing! However, it seems like I need a full name to proceed. Could you please provide your complete name?");
      return;
    }
  }

  lead.name = trimmed;
  await botSay(pick(PHONE_PROMPTS(trimmed.split(" ")[0])));
  step.value = "phone";
  saveState();
}

async function handlePhone(text) {
  pushUserMessage(text);
  const trimmed = text.trim();
  const digitsOnly = trimmed.replace(/[\s\-()]/g, "");
  if (!PHONE_RE.test(digitsOnly)) {
    await botSay("Hmm, that doesn't look like a valid 10-digit mobile number — mind sharing it again?");
    return;
  }
  lead.phone = digitsOnly;
  await botSay(pick(EMAIL_PROMPTS));
  step.value = "email";
  saveState();
}

async function handleEmail(text) {
  pushUserMessage(text);
  const trimmed = text.trim();
  if (!EMAIL_RE.test(trimmed)) {
    await botSay("It looks like there was an issue validating that email — could you please double-check it and share a valid one?");
    return;
  }
  lead.email = trimmed;
  silentCapture(); // fire-and-forget: the lead is now safely captured either way
  await askServices();
  saveState();
}

// ── Validation ────────────────────────────────────────────────────────────
// Heuristic only — no client-side check can confirm an email is real or
// deliverable. Rejects obviously-implausible entries (single-char local
// part or domain label, e.g. "d@f.com") without pretending to guarantee
// the address actually exists. True verification needs a server-side
// MX-record check or a confirmation email.
const EMAIL_RE = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]{1,}@[a-zA-Z0-9][a-zA-Z0-9-]{1,}\.[a-zA-Z]{2,}$/;

// Indian mobile numbers: 10 digits starting 6-9, optional +91 / 0 prefix.
// Swap for an E.164-style check if you regularly serve international clients.
const PHONE_RE = /^(?:\+91[-\s]?|0)?[6-9]\d{9}$/;

// ── Service selection & downstream flow ─────────────────────────────────
async function handleServiceChoice(id) {
  const svc = SERVICES.find((s) => s.id === id);
  lead.service = id;
  lead.serviceLabel = svc.label;
  pushUserMessage(svc.label);

  if (svc.blurb) {
    await botSay(`${svc.blurb} You can also browse this on our ${svc.label} page: ${window.location.origin}${svc.link}`);
    await botSay("Want to know more, or should I connect you with the team for a free quote?", {
      suggestions: buildSuggestions(id),
    });
    step.value = "exploring";
  } else {
    await botSay("No problem — tell me a bit about what you need and I'll pass it straight to the team.");
    step.value = "notes";
  }
  saveState();
}

async function handleWantsQuote(value) {
  if (value === "yes") {
    await botSay(`Great — I've already got your contact details, ${lead.name.split(" ")[0]}. Anything specific about the project you'd like the team to know? (Or say "skip.")`);
    step.value = "notes";
  } else {
    await botSay(`All good — the page will be right here whenever you're ready. Anything else I can help with?`, {
      quickReplies: [
        { label: "Ask about another service", value: "restart-service" },
        { label: "Actually, get me a quote", value: "yes" },
      ],
    });
    step.value = "browsing";
  }
  saveState();
}

function handleBrowsingChoice(value) {
  if (value === "restart-service") askServices();
  else handleWantsQuote("yes");
}

async function handleNotes(text) {
  pushUserMessage(text);
  if (!/^skip$/i.test(text.trim())) lead.message = text.trim();
  await submitLead();
}

async function submitLead() {
  sending.value = true;
  await botSay("Sending this to our team now…", {}, 300);
  const ok = await sendToSheet();
  sending.value = false;
  sent.value = ok;
  if (ok) {
    await botSay(`Thanks, ${lead.name.split(" ")[0]} — that's in. Someone from the team will reach out shortly. In the meantime, feel free to browse our work, or I'm happy to answer more questions.`, {
      quickReplies: [
        { label: "Ask about another service", value: "restart-service" },
        { label: "That's all for now", value: "done" },
      ],
    });
  } else {
    await botSay("Hmm, that didn't go through on my end. You can also reach us directly — want me to open the contact page?", {
      quickReplies: [{ label: "Open contact page", value: "contact" }],
    });
  }
  step.value = "done";
  saveState();
}

async function sendToSheet() {
  if (!SHEET_ENDPOINT) {
    console.warn("AmortreeBot: SHEET_ENDPOINT is not set — lead was not saved.");
    return false;
  }
  try {
    await fetch(SHEET_ENDPOINT, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name: lead.name, service: lead.serviceLabel, email: lead.email,
        phone: lead.phone, message: lead.message, source: "chatbot", page: window.location.pathname,
      }),
    });
    return true;
  } catch (err) {
    console.error("AmortreeBot: failed to submit lead", err);
    return false;
  }
}

async function handleDoneChoice(value) {
  if (value === "restart-service") {
    askServices();
  } else if (value === "contact") {
    window.location.href = "/contact";
  } else {
    await botSay("Sounds good — I'll be right here if you need anything else. 👋");
  }
}

function handleQuickReply(msg, qr) {
  msg.quickReplies = null;
  saveState();
  if (step.value === "service") {
    handleServiceChoice(qr.value); // pushes its own labeled message
    return;
  }
  pushUserMessage(qr.label);
  if (step.value === "wantsQuote") handleWantsQuote(qr.value);
  else if (step.value === "browsing") handleBrowsingChoice(qr.value);
  else if (step.value === "done") handleDoneChoice(qr.value);
}

function matchKeyword(text) {
  const lower = text.toLowerCase();
  for (const entry of KEYWORD_MAP) {
    if (entry.words.some((w) => lower.includes(w))) return entry.id;
  }
  return null;
}

async function handleSubmit() {
  const text = input.value.trim();
  if (!text || typing.value) return;
  input.value = "";

  if (step.value === "name") return handleName(text);
  if (step.value === "phone") return handlePhone(text);
  if (step.value === "email") return handleEmail(text);
  if (step.value === "notes") return handleNotes(text);

  pushUserMessage(text);
  const matched = matchKeyword(text);
  if (matched && ["service", "exploring", "browsing", "done"].includes(step.value)) {
    handleServiceChoice(matched);
  } else {
    await botSay("I want to make sure I point you the right way — could you pick one of the options above, or tell me a bit more about what you need?");
  }
}

onMounted(() => {
  loadState();
  scrollToBottom();
});
onBeforeUnmount(() => typeIntervals.forEach((iv) => clearInterval(iv)));
</script>

<template>
  <div class="amb-root">
    <button
      class="amb-fab"
      :class="{ 'amb-fab-open': open }"
      type="button"
      :aria-label="open ? 'Close chat' : 'Open chat with amortree assistant'"
      @click="toggleOpen"
    >
      <span v-if="showPulse && !open" class="amb-fab-pulse" aria-hidden="true"></span>
      <svg v-if="!open" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 4h16v12H7l-3 3V4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="12" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
      </svg>
      <svg v-else width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    <transition name="amb-panel-fade">
      <div v-if="open" class="amb-panel" role="dialog" aria-label="amortree assistant chat">
        <header class="amb-header">
          <div class="amb-header-left">
            <span class="amb-header-logo" aria-hidden="true">
              <img src="../assets/img/att-icon-light.svg" alt="" />
            </span>
            <!-- <div>
              <div class="amb-header-title">amortree assistant</div>
              <div class="amb-header-status">
                <span class="amb-status-dot" aria-hidden="true"></span>
                Online
              </div>
            </div> -->
          </div>
          <button class="amb-header-btn" type="button" aria-label="Restart conversation" @click="restart">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13.5 8a5.5 5.5 0 11-1.6-3.9M13.5 2v3.5H10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </header>

        <div ref="messagesEl" class="amb-messages">
          <template v-for="(m, i) in messages" :key="m.id">
            <div
              class="amb-msg-row"
              :class="[
                m.from === 'user' ? 'amb-msg-row-user' : 'amb-msg-row-bot',
                isNewGroup(i) ? 'amb-msg-new-group' : 'amb-msg-same-group',
              ]"
            >
              <div class="amb-avatar-slot" v-if="m.from === 'bot'" aria-hidden="true">
                <div class="amb-avatar" v-if="showAvatar(i)">
                  <img src="../assets/img/att-icon-dark.svg" alt="" />
                </div>
              </div>

              <div class="amb-msg-col">
                <div
                  class="amb-bubble"
                  :class="m.from === 'user' ? 'amb-bubble-user' : 'amb-bubble-bot'"
                  @click="m.from === 'bot' && skipTyping(m)"
                >
                  <span v-if="m.from === 'bot' && m.typed" v-html="renderRich(displayedText(m))"></span>
                  <span v-else>{{ m.displayText }}</span>
                  <span v-if="m.from === 'bot' && !m.typed" class="amb-caret" aria-hidden="true"></span>
                  <button
                    v-if="m.from === 'bot' && m.typed && needsTruncation(m)"
                    type="button"
                    class="amb-showmore-btn"
                    @click.stop="toggleExpand(m)"
                  >{{ m.expanded ? 'Show less' : 'Show more' }}</button>
                </div>

                <div v-if="isLastInGroup(i)" class="amb-msg-time" :class="m.from === 'user' ? 'amb-msg-time-user' : ''">
                  {{ formatTime(m.time) }}
                </div>

                <div v-if="m.quickReplies && m.typed" class="amb-quick-replies">
                  <button
                    v-for="qr in m.quickReplies"
                    :key="qr.value"
                    type="button"
                    class="amb-qr-row"
                    @click="handleQuickReply(m, qr)"
                  >
                    <span>{{ qr.label }}</span>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>

                <div v-if="m.suggestions && m.suggestions.length && m.typed" class="amb-suggestions">
                  <button
                    v-for="(s, idx) in m.suggestions"
                    :key="idx"
                    type="button"
                    class="amb-chip"
                    :class="s.type === 'quote' ? 'amb-chip-cta' : 'amb-chip-faq'"
                    @click="handleSuggestionClick(m, s)"
                  >
                    <svg v-if="s.type === 'quote'" width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                    </svg>
                    <svg v-else width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/>
                      <path d="M6.1 6.2a1.9 1.9 0 013.6.9c0 1.1-1.5 1.3-1.5 2.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                      <circle cx="8.1" cy="11.4" r="0.55" fill="currentColor"/>
                    </svg>
                    {{ s.label }}
                  </button>
                </div>
              </div>
            </div>
          </template>

          <div v-if="typing" class="amb-msg-row amb-msg-row-bot amb-msg-new-group">
            <div class="amb-avatar-slot" aria-hidden="true">
              <div class="amb-avatar">
                <img src="../assets/img/att-icon-dark.svg" alt="" />
              </div>
            </div>
            <div class="amb-bubble amb-bubble-bot amb-typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <form class="amb-input-bar" @submit.prevent="handleSubmit">
          <input
            ref="inputEl"
            v-model="input"
            type="text"
            class="amb-input"
            :placeholder="inputPlaceholder"
            :disabled="sending"
            autocomplete="off"
          />
          <button type="submit" class="amb-send-btn" :disabled="!input.trim() || sending" aria-label="Send message">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 14l12-6L2 2v4.5L10 8l-8 1.5V14z" fill="currentColor"/>
            </svg>
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.amb-root {
  --amb-accent: #facc15;
  --amb-dark: #0f172a;
  --amb-border: #e6e9ee;
  --amb-text: #1e293b;
  --amb-muted: #7c8697;
  font-family: var(--font-body, Inter, system-ui, sans-serif);
  * { box-sizing: border-box; }
}

// ── Floating button ──────────────────────────────────────────────────────
.amb-fab {
  position: fixed; bottom: 24px; right: 24px;
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--amb-dark); color: var(--amb-accent);
  border: 2px solid var(--amb-accent);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; box-shadow: 0 10px 30px rgba(15,23,42,0.35);
  z-index: 9998; transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(15,23,42,0.4); }
}
.amb-fab-logo {
  width: 24px; height: 24px;
  filter: brightness(0) saturate(100%) invert(88%) sepia(41%) saturate(1099%) hue-rotate(357deg) brightness(101%) contrast(97%);
}
.amb-fab-pulse {
  position: absolute; inset: -4px; border-radius: 50%;
  border: 2px solid var(--amb-accent);
  animation: amb-pulse-ring 2s ease-out infinite;
}
@keyframes amb-pulse-ring { 0% { transform: scale(0.9); opacity: 0.8; } 100% { transform: scale(1.35); opacity: 0; } }

// ── Panel ────────────────────────────────────────────────────────────────
.amb-panel {
  position: fixed; bottom: 92px; right: 24px;
  width: 372px; max-width: calc(100vw - 32px);
  height: 580px; max-height: calc(100vh - 130px);
  background: #fff; border-radius: 18px;
  box-shadow: 0 24px 70px rgba(15,23,42,0.25);
  display: flex; flex-direction: column; overflow: hidden;
  z-index: 9999; border: 1px solid var(--amb-border);

  &::after {
    content: ''; position: absolute; bottom: -9px; right: 22px;
    width: 16px; height: 16px; background: #fff;
    border-right: 1px solid var(--amb-border); border-bottom: 1px solid var(--amb-border);
    transform: rotate(45deg); box-shadow: 4px 4px 8px rgba(15,23,42,0.04);
  }

  @media (max-width: 480px) {
    right: 16px; left: 16px; width: auto; bottom: 84px; height: calc(100vh - 112px);
    &::after { display: none; }
  }
}
.amb-panel-fade-enter-active, .amb-panel-fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.amb-panel-fade-enter-from, .amb-panel-fade-leave-to { opacity: 0; transform: translateY(14px) scale(0.97); }

// ── Header ───────────────────────────────────────────────────────────────
.amb-header {
  background: var(--amb-dark); padding: 0.85rem 1rem;
  display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
}
.amb-header-left { display: flex; align-items: center; gap: 0.6rem; }
.amb-header-logo {
  width: 30px; height: 30px; border-radius: 9px; background: transparent;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  img { width: 30px; height: 30px; }
}
.amb-header-title { color: #f8fafc; font-size: 0.85rem; font-weight: 700; letter-spacing: -0.01em; }
.amb-header-status { display: flex; align-items: center; gap: 0.3rem; color: #94a3b8; font-size: 0.66rem; margin-top: 0.1rem; }
.amb-status-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 0 3px rgba(74,222,128,0.15); }
.amb-header-btn {
  width: 28px; height: 28px; border-radius: 8px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  color: #cbd5e1; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.15s, transform 0.15s;
  &:hover { background: rgba(255,255,255,0.12); transform: rotate(-25deg); }
}

// ── Messages ─────────────────────────────────────────────────────────────
.amb-messages {
  flex: 1; overflow-y: auto; padding: 0.95rem 0.85rem 0.4rem;
  display: flex; flex-direction: column;
  background: #f7f8fa;

  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #d5d9e0; border-radius: 999px; }
}

.amb-msg-row {
  display: flex; align-items: flex-end; gap: 0.4rem;
  max-width: 90%;
}
.amb-msg-row-bot { align-self: flex-start; }
.amb-msg-row-user { align-self: flex-end; flex-direction: row-reverse; }

.amb-msg-row.amb-msg-new-group { margin-top: 0.55rem; }
.amb-msg-row.amb-msg-same-group { margin-top: 0.1rem; }
.amb-msg-row:first-child { margin-top: 0; }

.amb-avatar-slot {
  width: 22px; flex-shrink: 0;
  display: flex; align-items: flex-end; justify-content: center;
}
.amb-avatar {
  width: 24px; height: 24px; border-radius: 7px; flex-shrink: 0;
  background: #fdedad;
  display: flex; align-items: center; justify-content: center;
  img { width: 18px; height: 18px; }
}

.amb-msg-col { display: flex; flex-direction: column; min-width: 0; }

.amb-bubble {
  padding: 0.35rem 0.5rem;
  border-radius: 13px;
  font-size: 0.78rem; line-height: 1.48;
  word-break: break-word;
}
.amb-bubble-bot {
  background: #f7f8fa; color: var(--amb-text);
  border: 1px solid #f7f8fa;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(15,23,42,0.04);
  cursor: default;

  :deep(strong) { color: var(--amb-dark); font-weight: 700; }
  :deep(.amb-link) {
    color: #b45309; font-weight: 600; text-decoration: underline;
    text-decoration-color: rgba(180,83,9,0.35);
    &:hover { text-decoration-color: currentColor; }
  }
}
.amb-bubble-user {
  background: var(--amb-dark); color: #f8fafc;
  border-bottom-right-radius: 4px;
  box-shadow: 0 1px 2px rgba(15,23,42,0.1);
}

.amb-showmore-btn {
  display: inline; margin-left: 0.3em;
  background: none; border: none; padding: 0;
  font-size: inherit; font-weight: 700; color: #b45309;
  text-decoration: underline; text-decoration-color: rgba(180,83,9,0.35);
  cursor: pointer;
  &:hover { text-decoration-color: currentColor; }
}

.amb-caret {
  display: inline-block; width: 2px; height: 0.9em;
  background: var(--amb-dark); margin-left: 2px; vertical-align: -0.12em;
  animation: amb-caret-blink 0.8s step-end infinite;
}
@keyframes amb-caret-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.amb-msg-time { font-size: 0.6rem; color: var(--amb-muted); margin-top: 0.2rem; padding: 0 0.2rem; }
.amb-msg-time-user { text-align: right; }

// ── Quick replies (list rows — used for binary choices) ─────────────────
.amb-quick-replies {
  margin-top: 0.45rem; background: #fff;
  border: 1px solid var(--amb-border); border-radius: 11px; overflow: hidden;
  box-shadow: 0 1px 2px rgba(15,23,42,0.04);
}
.amb-qr-row {
  display: flex; align-items: center; justify-content: space-between; width: 100%;
  background: none; border: none; border-bottom: 1px solid var(--amb-border);
  padding: 0.5rem 0.7rem; font-size: 0.75rem; font-weight: 600; color: var(--amb-dark);
  text-align: left; cursor: pointer; transition: background 0.15s, padding-left 0.15s;

  &:last-child { border-bottom: none; }
  &:hover { background: rgba(250,204,21,0.09); padding-left: 0.85rem; }
  svg { color: var(--amb-muted); flex-shrink: 0; transition: transform 0.15s, color 0.15s; }
  &:hover svg { transform: translateX(2px); color: var(--amb-dark); }
}

// ── Suggestion chips (contextual FAQ + quote CTA) ───────────────────────
.amb-suggestions {
  margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.4rem;
}
.amb-chip {
  display: inline-flex; align-items: center; gap: 0.3rem;
  border-radius: 999px; padding: 0.42rem 0.7rem;
  font-size: 0.71rem; font-weight: 600; line-height: 1.2;
  cursor: pointer; transition: transform 0.12s ease, box-shadow 0.15s ease, background 0.15s ease;
  max-width: 100%;
  text-align: left;

  &:hover { transform: translateY(-1px); }
}
.amb-chip-faq {
  background: #fff; color: var(--amb-dark);
  border: 1px solid var(--amb-border);
  box-shadow: 0 1px 2px rgba(15,23,42,0.04);
  &:hover { border-color: var(--amb-accent); background: rgba(250,204,21,0.08); }
}
.amb-chip-cta {
  background: var(--amb-dark); color: var(--amb-accent);
  border: 1px solid var(--amb-dark);
  box-shadow: 0 2px 6px rgba(15,23,42,0.18);
  &:hover { background: #1e293b; }
}

// Typing indicator
.amb-typing {
  display: flex; align-items: center; gap: 3px; padding: 0.65rem 0.8rem;
  span {
    width: 5px; height: 5px; border-radius: 50%; background: #9aa3b0;
    animation: amb-bounce 1.2s infinite ease-in-out;
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
  }
}
@keyframes amb-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-4px); opacity: 1; } }

// ── Input bar ────────────────────────────────────────────────────────────
.amb-input-bar {
  display: flex; align-items: center; gap: 0.45rem;
  padding: 0.5rem 0.65rem;
  border-top: 1px solid var(--amb-border);
  background: #fff; flex-shrink: 0;
}
.amb-input {
  flex: 1; height: 37px;
  border: 1.5px solid var(--amb-border);
  background: #f7f8fa; border-radius: 999px;
  padding: 0 0.9rem;
  font-size: 0.79rem; color: var(--amb-text);
  outline: none; transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;

  &:focus { border-color: var(--amb-dark); background: #fff; box-shadow: 0 0 0 3px rgba(15,23,42,0.06); }
  &::placeholder { color: #a3abb8; }
}
.amb-send-btn {
  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
  background: var(--amb-accent); color: var(--amb-dark); border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: transform 0.15s, opacity 0.15s;

  &:hover:not(:disabled) { transform: scale(1.08); }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
}
</style>