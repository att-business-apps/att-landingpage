<script setup>
import { ref, reactive, nextTick, onMounted } from "vue";

/**
 * AmortreeBot — guided lead-capture chatbot.
 *
 * Why "guided" instead of a raw LLM hookup:
 * a free-form AI chatbot needs a server-side API key (an LLM call from the
 * browser would expose that key to anyone who opens devtools). This widget
 * gets you 90% of the value — instant answers about services, qualifying
 * questions, and lead capture — with zero backend to run. If you later want
 * true generative answers, swap `sendToSheet()`'s endpoint for a small
 * serverless function that calls an LLM server-side and keep everything else.
 *
 * Every completed conversation is POSTed to a Google Apps Script Web App,
 * which appends a row to a Google Sheet. See google-apps-script.gs.
 */

// ── Config ──────────────────────────────────────────────────────────────────
// Set this to your deployed Apps Script Web App URL (see setup guide).
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbzd3LSVcOjacl7YBqQnxnB_kp_eksqIrn8KO1JpMLrj1YStoTjtHLP5eJjR7kTOo7MMng/exec";

const SERVICES = [
  {
    id: "web-design",
    label: "Website Design",
    blurb:
      "We design custom, conversion-focused websites — not templates. Typical turnaround is 2–4 weeks depending on scope.",
    link: "/website-design",
  },
  {
    id: "web-dev",
    label: "Web Development",
    blurb:
      "From marketing sites to custom web apps, built to be fast, maintainable, and easy for your team to update.",
    link: "/web-development",
  },
  {
    id: "ecommerce",
    label: "E-commerce & Shopify",
    blurb:
      "Shopify builds and custom e-commerce, set up to actually convert — clean checkout flow, fast load times, mobile-first.",
    link: "/shopify-development",
  },
  {
    id: "seo",
    label: "SEO",
    blurb:
      "Local and national SEO — Google Business Profile, on-page fundamentals, and content that targets what your customers actually search.",
    link: "/seo",
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    blurb:
      "Paid ads, social, and LinkedIn marketing built around measurable lead flow, not vanity metrics.",
    link: "/digital-marketing",
  },
  {
    id: "branding",
    label: "Branding & UI/UX",
    blurb:
      "Logo, visual identity, and UI/UX design that gives your business a consistent, professional look across every touchpoint.",
    link: "/branding",
  },
  {
    id: "leadgen",
    label: "Lead Generation",
    blurb:
      "WhatsApp funnels, landing pages, and contact flows designed specifically to turn visitors into enquiries.",
    link: "/lead-generation",
  },
  {
    id: "maintenance",
    label: "Website Maintenance",
    blurb:
      "Ongoing updates, security patches, and small content changes, so your site never quietly goes stale.",
    link: "/website-maintenance",
  },
  { id: "other", label: "Something else", blurb: null, link: null },
];

// Loose keyword routing, used when someone types instead of tapping a chip.
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
const lead = reactive({
  name: "",
  service: "",
  serviceLabel: "",
  email: "",
  phone: "",
  message: "",
});

// step controls what the next free-text input is interpreted as
const step = ref("name"); // name -> service -> detail -> wantsQuote -> email -> phone -> notes -> done

let msgId = 0;
function pushMessage(from, text, opts = {}) {
  messages.value.push({
    id: ++msgId,
    from,
    text,
    quickReplies: opts.quickReplies || null,
    time: new Date(),
  });
  scrollToBottom();
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesEl.value) {
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
    }
  });
}

function botSay(text, opts = {}, delay = 500) {
  typing.value = true;
  scrollToBottom();
  return new Promise((resolve) => {
    setTimeout(() => {
      typing.value = false;
      pushMessage("bot", text, opts);
      resolve();
    }, delay);
  });
}

function formatTime(d) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ── Lifecycle ───────────────────────────────────────────────────────────────
function toggleOpen() {
  open.value = !open.value;
  showPulse.value = false;
  if (open.value && !hasOpenedOnce.value) {
    hasOpenedOnce.value = true;
    startConversation();
  }
  if (open.value) {
    nextTick(() => inputEl.value?.focus());
  }
}

async function startConversation() {
  await botSay(
    "Hey there \u{1F44B} I'm the amortree assistant. I can tell you about our services, point you to the right page, or get your project in front of our team.",
    {},
    400
  );
  await botSay("First off — what should I call you?");
}

function restart() {
  messages.value = [];
  Object.assign(lead, { name: "", service: "", serviceLabel: "", email: "", phone: "", message: "" });
  step.value = "name";
  sent.value = false;
  startConversation();
}

// ── Flow ────────────────────────────────────────────────────────────────────
async function askServices() {
  step.value = "service";
  await botSay(`Nice to meet you, ${lead.name.split(" ")[0]}. What are you looking for help with?`, {
    quickReplies: SERVICES.map((s) => ({ label: s.label, value: s.id })),
  });
}

async function handleServiceChoice(id) {
  const svc = SERVICES.find((s) => s.id === id);
  lead.service = id;
  lead.serviceLabel = svc.label;
  pushMessage("user", svc.label);

  if (svc.blurb) {
    await botSay(svc.blurb);
    await botSay(`You can also browse this on our ${svc.label} page — want me to connect you with the team for a free quote?`, {
      quickReplies: [
        { label: "Yes, get me a quote", value: "yes" },
        { label: "Just browsing for now", value: "no" },
      ],
    });
    step.value = "wantsQuote";
  } else {
    await botSay("No problem — tell me a bit about what you need and I'll pass it straight to the team.");
    step.value = "notes";
  }
}

async function handleWantsQuote(value) {
  pushMessage("user", value === "yes" ? "Yes, get me a quote" : "Just browsing for now");
  if (value === "yes") {
    await botSay("Great — what's the best email to reach you at?");
    step.value = "email";
  } else {
    const svc = SERVICES.find((s) => s.id === lead.service);
    await botSay(
      `All good — here's the page whenever you're ready: ${window.location.origin}${svc.link}. Anything else I can help with?`,
      {
        quickReplies: [
          { label: "Ask about another service", value: "restart-service" },
          { label: "Actually, get me a quote", value: "yes" },
        ],
      }
    );
    step.value = "browsing";
  }
}

async function handleBrowsingChoice(value) {
  if (value === "restart-service") {
    pushMessage("user", "Ask about another service");
    askServices();
  } else {
    handleWantsQuote("yes");
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleEmail(text) {
  pushMessage("user", text);
  if (!EMAIL_RE.test(text.trim())) {
    await botSay("That doesn't look like a valid email — mind double-checking it?");
    return;
  }
  lead.email = text.trim();
  await botSay("Got it. Phone number's optional — share it if you'd like a callback, or just say \u201cskip.\u201d");
  step.value = "phone";
}

async function handlePhone(text) {
  pushMessage("user", text);
  if (!/^skip$/i.test(text.trim())) {
    lead.phone = text.trim();
  }
  await botSay("Last thing — anything specific about the project you want the team to know? (Or say \u201cskip.\u201d)");
  step.value = "notes";
}

async function handleNotes(text) {
  pushMessage("user", text);
  if (!/^skip$/i.test(text.trim())) {
    lead.message = text.trim();
  }
  await submitLead();
}

async function submitLead() {
  sending.value = true;
  await botSay("Sending this to our team now\u2026", {}, 300);
  const ok = await sendToSheet();
  sending.value = false;
  sent.value = ok;
  if (ok) {
    await botSay(
      `Thanks, ${lead.name.split(" ")[0]} \u2014 that's in. Someone from the team will reach out shortly. In the meantime, feel free to browse our work, or I'm happy to answer more questions.`,
      {
        quickReplies: [
          { label: "Ask about another service", value: "restart-service" },
          { label: "That's all for now", value: "done" },
        ],
      }
    );
  } else {
    await botSay(
      "Hmm, that didn't go through on my end. You can also reach us directly \u2014 want me to open the contact page?",
      { quickReplies: [{ label: "Open contact page", value: "contact" }] }
    );
  }
  step.value = "done";
}

async function sendToSheet() {
  if (!SHEET_ENDPOINT) {
    console.warn(
      "AmortreeBot: VITE_CHATBOT_SHEET_URL is not set — lead was not saved. See chatbot-setup-guide.md."
    );
    return false;
  }
  try {
    // Apps Script Web Apps don't return CORS headers for simple deployments,
    // so we fire the request in no-cors mode. We can't read the response,
    // but the row still gets appended server-side.
    await fetch(SHEET_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name: lead.name,
        service: lead.serviceLabel,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        source: "chatbot",
        page: window.location.pathname,
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
    pushMessage("user", "Ask about another service");
    askServices();
  } else if (value === "contact") {
    pushMessage("user", "Open contact page");
    window.location.href = "/contact";
  } else {
    pushMessage("user", "That's all for now");
    await botSay("Sounds good \u2014 I'll be right here if you need anything else. \u{1F44B}");
  }
}

// ── Quick reply + free text dispatch ───────────────────────────────────────
function handleQuickReply(msgIndex, qr) {
  // lock the quick replies on this message once used
  messages.value[msgIndex].quickReplies = null;

  if (step.value === "service") handleServiceChoice(qr.value);
  else if (step.value === "wantsQuote") handleWantsQuote(qr.value);
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

  if (step.value === "name") {
    lead.name = text;
    pushMessage("user", text);
    askServices();
    return;
  }

  if (step.value === "email") return handleEmail(text);
  if (step.value === "phone") return handlePhone(text);
  if (step.value === "notes") return handleNotes(text);

  // Free-text typed during a quick-reply step: try keyword routing.
  pushMessage("user", text);
  const matched = matchKeyword(text);
  if (matched && (step.value === "service" || step.value === "browsing" || step.value === "done")) {
    handleServiceChoice(matched);
  } else {
    await botSay(
      "I want to make sure I point you the right way \u2014 could you pick one of the options above, or tell me a bit more about what you need?"
    );
  }
}

onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div class="amb-root">
    <!-- Floating toggle button -->
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
      <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    <!-- Chat panel -->
    <transition name="amb-panel-fade">
      <div v-if="open" class="amb-panel" role="dialog" aria-label="amortree assistant chat">
        <header class="amb-header">
          <div class="amb-header-left">
            <span class="amb-header-logo" aria-hidden="true">
                <img
                    class="footer-logo"
                    src="../assets/img/att-icon-dark.svg"
                    alt="amortree Tech"
                />
            </span>
            <div>
              <div class="amb-header-title">amortree assistant</div>
              <div class="amb-header-status">
                <span class="amb-status-dot" aria-hidden="true"></span>
                Online
              </div>
            </div>
          </div>
          <button class="amb-header-btn" type="button" aria-label="Restart conversation" @click="restart">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13.5 8a5.5 5.5 0 11-1.6-3.9M13.5 2v3.5H10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </header>

        <div ref="messagesEl" class="amb-messages">
          <template v-for="(m, i) in messages" :key="m.id">
            <div class="amb-msg-row" :class="m.from === 'user' ? 'amb-msg-row-user' : 'amb-msg-row-bot'">
              <div class="amb-avatar" v-if="m.from === 'bot'" aria-hidden="true">a</div>
              <div class="amb-msg-col">
                <div class="amb-bubble" :class="m.from === 'user' ? 'amb-bubble-user' : 'amb-bubble-bot'">
                  {{ m.text }}
                </div>
                <div class="amb-msg-time" :class="m.from === 'user' ? 'amb-msg-time-user' : ''">
                  {{ formatTime(m.time) }}
                </div>
                <div v-if="m.quickReplies" class="amb-quick-replies">
                  <button
                    v-for="qr in m.quickReplies"
                    :key="qr.value"
                    type="button"
                    class="amb-chip"
                    @click="handleQuickReply(i, qr)"
                  >
                    {{ qr.label }}
                  </button>
                </div>
              </div>
            </div>
          </template>

          <div v-if="typing" class="amb-msg-row amb-msg-row-bot">
            <div class="amb-avatar" aria-hidden="true">b</div>
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
            placeholder="Write your message…"
            :disabled="sending"
            autocomplete="off"
          />
          <button type="submit" class="amb-send-btn" :disabled="!input.trim() || sending" aria-label="Send message">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
  --amb-dark-2: #06060a;
  --amb-border: #e2e8f0;
  --amb-text: #1e293b;
  --amb-muted: #64748b;
  font-family: var(--font-body, Inter, system-ui, sans-serif);
}

// ── Floating button ──────────────────────────────────────────────────────
.amb-fab {
  position: fixed;
  bottom: 24px; right: 24px;
  width: 58px; height: 58px;
  border-radius: 50%;
  background: var(--amb-dark);
  color: var(--amb-accent);
  border: 2px solid var(--amb-accent);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.35);
  z-index: 9998;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(15, 23, 42, 0.4); }
}

.amb-fab-pulse {
  position: absolute; inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--amb-accent);
  animation: amb-pulse-ring 2s ease-out infinite;
}
@keyframes amb-pulse-ring {
  0%   { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.35); opacity: 0; }
}

// ── Panel ────────────────────────────────────────────────────────────────
.amb-panel {
  position: fixed;
  bottom: 96px; right: 24px;
  width: 380px;
  max-width: calc(100vw - 32px);
  height: 560px;
  max-height: calc(100vh - 140px);
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.25);
  display: flex; flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  border: 1px solid var(--amb-border);

  @media (max-width: 480px) {
    right: 16px; left: 16px; width: auto;
    bottom: 88px; height: calc(100vh - 120px);
  }
}

.amb-panel-fade-enter-active, .amb-panel-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.amb-panel-fade-enter-from, .amb-panel-fade-leave-to {
  opacity: 0; transform: translateY(12px) scale(0.98);
}

// ── Header ───────────────────────────────────────────────────────────────
.amb-header {
  background: var(--amb-dark);
  padding: 1rem 1.1rem;
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}

.amb-header-left { display: flex; align-items: center; gap: 0.65rem; }

.amb-header-logo {
  width: 34px; height: 34px; border-radius: 9px;
  background: white; color: var(--amb-dark);
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 1rem; text-transform: lowercase;
  flex-shrink: 0;

  img {padding: 0.185rem;}
}

.amb-header-title { color: #f8fafc; font-size: 0.9rem; font-weight: 700; }

.amb-header-status {
  display: flex; align-items: center; gap: 0.35rem;
  color: #94a3b8; font-size: 0.72rem; margin-top: 0.1rem;
}

.amb-status-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #4ade80; flex-shrink: 0;
}

.amb-header-btn {
  width: 30px; height: 30px; border-radius: 8px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  color: #cbd5e1; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.15s;
  &:hover { background: rgba(255,255,255,0.12); }
}

// ── Messages ─────────────────────────────────────────────────────────────
.amb-messages {
  flex: 1; overflow-y: auto;
  padding: 1.1rem;
  display: flex; flex-direction: column; gap: 0.85rem;
  background: #f8fafc;
}

.amb-msg-row {
  display: flex; align-items: flex-end; gap: 0.5rem;
  max-width: 88%;
}
.amb-msg-row-bot { align-self: flex-start; }
.amb-msg-row-user { align-self: flex-end; flex-direction: row-reverse; }

.amb-avatar {
  width: 24px; height: 24px; border-radius: 7px; flex-shrink: 0;
  background: var(--amb-dark); color: var(--amb-accent);
  font-size: 0.7rem; font-weight: 900;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 2px;
}

.amb-msg-col { display: flex; flex-direction: column; min-width: 0; }

.amb-bubble {
  padding: 0.6rem 0.85rem;
  border-radius: 14px;
  font-size: 0.85rem; line-height: 1.55;
  word-break: break-word;
}
.amb-bubble-bot {
  background: #fff; color: var(--amb-text);
  border: 1px solid var(--amb-border);
  border-bottom-left-radius: 4px;
}
.amb-bubble-user {
  background: var(--amb-dark); color: #f8fafc;
  border-bottom-right-radius: 4px;
}

.amb-msg-time {
  font-size: 0.62rem; color: var(--amb-muted); margin-top: 0.25rem; padding: 0 0.2rem;
}
.amb-msg-time-user { text-align: right; }

.amb-quick-replies {
  display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.5rem;
}

.amb-chip {
  background: #fff; color: var(--amb-dark);
  border: 1.5px solid var(--amb-dark);
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
  font-size: 0.76rem; font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover { background: var(--amb-accent); border-color: var(--amb-accent); }
}

// Typing indicator
.amb-typing {
  display: flex; align-items: center; gap: 4px;
  padding: 0.75rem 0.9rem;
  span {
    width: 6px; height: 6px; border-radius: 50%;
    background: #94a3b8;
    animation: amb-bounce 1.2s infinite ease-in-out;
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
  }
}
@keyframes amb-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-4px); opacity: 1; }
}

// ── Input bar ────────────────────────────────────────────────────────────
.amb-input-bar {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem;
  border-top: 1px solid var(--amb-border);
  background: #fff; flex-shrink: 0;
}

.amb-input {
  flex: 1;
  border: 1px solid var(--amb-border);
  background: #f8fafc;
  border-radius: 999px;
  padding: 0.6rem 1rem;
  font-size: 0.85rem; color: var(--amb-text);
  outline: none;
  transition: border-color 0.15s;

  &:focus { border-color: var(--amb-dark); }
  &::placeholder { color: #94a3b8; }
}

.amb-send-btn {
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  background: var(--amb-accent); color: var(--amb-dark);
  border: none; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: transform 0.15s, opacity 0.15s;

  &:hover:not(:disabled) { transform: scale(1.06); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
}
</style>