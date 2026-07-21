<script setup>
import { computed, onBeforeUnmount, onMounted, nextTick, reactive, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const waBase = "https://wa.me/917975859061/?text=";

/* ---------------------------------------------------------------- */
/* Lead capture — URL input → modal → Google Sheet                   */
/*                                                                    */
/* SETUP REQUIRED:                                                    */
/* 1. Create a Google Sheet with header row:                          */
/*    Timestamp | Full Name | Email | Phone | Company Name |          */
/*    Company Website | Industry | Source                            */
/* 2. Extensions → Apps Script, paste the doPost() script provided    */
/*    alongside this file, then Deploy → New deployment → Web app     */
/*    (Execute as: Me, Who has access: Anyone).                       */
/* 3. Paste the resulting /exec URL below.                            */
/* ---------------------------------------------------------------- */
const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbywOPzc6Pn-7YQ4fbChfmJ39d32s4L8mCSYJ3eUAONsV8cjWIMelRhFrh5HRS5Rv5Nb/exec";

const industryOptions = [
  "Manufacturing & Auto-Ancillary",
  "Healthcare & MedTech",
  "IT & Technology Services",
  "Fintech & Financial Services",
  "Logistics & Supply Chain",
  "Professional Services",
  "Other",
];

const websiteUrl = ref("");
const heroUrlError = ref("");
const isModalOpen = ref(false);
const formState = ref("idle"); // idle | submitting | success
const leadSaveWarning = ref(""); // soft, non-blocking note if the Sheet write couldn't be confirmed

const form = reactive({
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  companyWebsite: "",
  industry: "",
  _hp: "", // honeypot — must stay empty; bots tend to fill every field
});

const formErrors = ref({});

function isValidUrlish(value) {
  return /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(value.trim());
}

function normalizeUrl(value) {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function openModal(prefillUrl = "") {
  if (prefillUrl) form.companyWebsite = prefillUrl;
  formState.value = "idle";
  formErrors.value = {};
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
}

let successTimeoutId = null;

function closeModal() {
  if (successTimeoutId) {
    clearTimeout(successTimeoutId);
    successTimeoutId = null;
  }
  isModalOpen.value = false;
  document.body.style.overflow = "";
  if (formState.value === "success") {
    // Clean slate for the next visitor / next submission
    websiteUrl.value = "";
    form.fullName = "";
    form.email = "";
    form.phone = "";
    form.companyName = "";
    form.companyWebsite = "";
    form.industry = "";
    formState.value = "idle";
    leadSaveWarning.value = "";
  }
}

function submitHeroUrl() {
  const val = websiteUrl.value.trim();
  if (!val) {
    heroUrlError.value = "Enter your website to continue.";
    return;
  }
  if (!isValidUrlish(val)) {
    heroUrlError.value = "Enter a valid website, e.g. yourbusiness.com";
    return;
  }
  heroUrlError.value = "";
  openModal(normalizeUrl(val));
}

function validateForm() {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (form.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a valid phone number.";
  if (!form.companyName.trim()) errors.companyName = "Please enter your company name.";
  if (!isValidUrlish(form.companyWebsite)) errors.companyWebsite = "Enter a valid website.";
  if (!form.industry) errors.industry = "Please select your industry.";
  formErrors.value = errors;
  return Object.keys(errors).length === 0;
}

function proceedToLiveCheck() {
  const site = form.companyWebsite;
  isModalOpen.value = false;
  document.body.style.overflow = "";
  // Clean slate for the next visitor / next submission
  websiteUrl.value = "";
  form.fullName = "";
  form.email = "";
  form.phone = "";
  form.companyName = "";
  form.companyWebsite = "";
  form.industry = "";
  formState.value = "idle";
  leadSaveWarning.value = "";

  runLiveCheck(site);
  requestAnimationFrame(() => {
    document.querySelector(".hero-visual")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

async function submitAuditForm() {
  if (form._hp) {
    // Honeypot tripped — silently "succeed" without writing anything.
    formState.value = "success";
    successTimeoutId = setTimeout(proceedToLiveCheck, 1400);
    return;
  }
  if (!validateForm()) return;

  formState.value = "submitting";
  form.companyWebsite = normalizeUrl(form.companyWebsite);
  leadSaveWarning.value = "";

  const payload = {
    timestamp: new Date().toISOString(),
    fullName: form.fullName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    companyName: form.companyName.trim(),
    companyWebsite: form.companyWebsite,
    industry: form.industry,
    source: "Growth Score Landing Page",
  };

  // Saving the lead is best-effort and must never block the live check —
  // that's the actual thing the visitor is here for. If the Sheet write
  // isn't configured or fails, we log it clearly (so it doesn't go
  // unnoticed) and surface a soft, non-blocking note instead of a hard
  // error screen.
  if (GOOGLE_SHEET_WEBHOOK_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT")) {
    console.warn("GOOGLE_SHEET_WEBHOOK_URL is not set — this lead was NOT saved. See setup notes above submitAuditForm().");
    leadSaveWarning.value = "We couldn't confirm your details were saved — message us on WhatsApp just in case.";
  } else {
    try {
      // Apps Script Web Apps don't return usable CORS headers, so the response
      // body/status can't be read from here (mode: "no-cors" → opaque response).
      // A network-level failure (offline, blocked, wrong URL) still throws and
      // is caught below; anything that reaches the try block without throwing
      // is treated as delivered.
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Audit form submission failed:", err);
      leadSaveWarning.value = "We couldn't confirm your details were saved — message us on WhatsApp just in case.";
    }
  }

  formState.value = "success";
  // Brief reassurance, then roll straight into the real live check regardless
  // of whether the Sheet write above succeeded.
  successTimeoutId = setTimeout(proceedToLiveCheck, 1600);
}

/* ---------------------------------------------------------------- */
/* Hero — REAL live check, powered by Google PageSpeed Insights       */
/*                                                                    */
/* This calls Google's public PageSpeed Insights API, which actually  */
/* loads the submitted URL server-side (the same way Google's own     */
/* Lighthouse tooling does) and returns real Performance, SEO, and    */
/* Best Practices scores plus real Core Web Vitals.                   */
/*                                                                    */
/* ⚠️ ACTION REQUIRED — READ THIS:                                    */
/* Without an API key below, EVERY unauthenticated caller of this API */
/* worldwide shares one small daily quota. In practice that means it  */
/* runs out almost immediately — this is not a bug, it's Google's     */
/* free-tier design. You WILL see "Quota exceeded" errors until you   */
/* set PAGESPEED_API_KEY. To fix, permanently:                        */
/*   1. https://console.cloud.google.com/ → create/select a project   */
/*   2. Enable the "PageSpeed Insights API" (no billing needed for     */
/*      normal traffic on this API)                                   */
/*   3. Credentials → Create Credentials → API key → copy it           */
/*   4. Paste it below                                                */
/* Takes about 5 minutes and raises your quota from "shared and tiny" */
/* to 25,000 requests/day, on your own account.                       */
/*                                                                    */
/* HONESTY NOTE: This instant check only measures the 3 of 6 Growth   */
/* Score pillars that are genuinely checkable from a public,          */
/* no-backend API call (Performance, on-page SEO signals, Security /  */
/* Best Practices). Design & UX quality, AI/search discoverability,   */
/* and conversion readiness need a real look at the site and are NOT  */
/* faked here — they're offered as the follow-up full audit via the   */
/* lead form instead of being invented as a live number. Don't remove */
/* this note without re-reading it.                                  */
/* ---------------------------------------------------------------- */
const PAGESPEED_API_KEY = "AIzaSyBcAN9sn1W_t1R-kuM00BT-IbCywvIdMjA"; // 👈 paste your free Google API key here — see note above

const pendingUrl = ref("");
const liveCheckStatus = ref("idle"); // idle | loading | success | error
const liveCheckError = ref("");

const liveResult = reactive({
  url: "",
  overall: 0,
  performance: 0,
  seo: 0,
  bestPractices: 0,
  lcp: "—",
  cls: "—",
  tbt: "—",
  httpsOk: null,
  titleOk: null,
  metaDescOk: null,
  crawlableOk: null,
});

const liveDisplay = reactive({ overall: 0, performance: 0, seo: 0, bestPractices: 0 });

function tierFor(score) {
  if (score < 30) return "Seedling";
  if (score < 60) return "Sapling";
  if (score < 80) return "Growing Tree";
  return "Full Canopy";
}

/* Lighthouse-style severity banding, reused for every pillar bar, the
   gauge ring, and the detail rows below — so colour always means the
   same thing everywhere on the card. */
function bandFor(score) {
  if (score >= 90) return "good";
  if (score >= 50) return "ok";
  return "poor";
}

// The overall gauge/tier colour follows the tier's own boundaries
// (0–59 / 60–79 / 80–100) rather than bandFor's stricter 90/50 split —
// otherwise an 85 "Full Canopy" would render in amber, which reads as
// a contradiction rather than nuance.
function tierBand(score) {
  if (score >= 80) return "good";
  if (score >= 60) return "ok";
  return "poor";
}

const PILLAR_META = {
  performance: { label: "Performance", metricLabel: "LCP", metricKey: "lcp" },
  seo: { label: "On-Page SEO Signals", metricLabel: "Meta setup", metricKey: null },
  bestPractices: { label: "Security & Best Practices", metricLabel: "HTTPS", metricKey: null },
};

// The single lowest-scoring pillar, surfaced as one clear "fix this first"
// callout instead of letting a high overall/tier number hide a real problem
// (e.g. an 85 overall next to a 16-second LCP).
const weakestPillar = computed(() => {
  const entries = ["performance", "seo", "bestPractices"].map((key) => ({
    key,
    ...PILLAR_META[key],
    score: liveResult[key],
  }));
  return entries.reduce((worst, cur) => (cur.score < worst.score ? cur : worst), entries[0]);
});

// True when the headline tier reads better than the worst pillar actually
// is — the exact "85 / Full Canopy next to a 16.7s LCP" mismatch. When
// this fires we show a caution note instead of letting the tier stand
// unqualified.
const hasHiddenWeakness = computed(() => liveResult.overall >= 60 && weakestPillar.value.score < 50);

function opportunityMessage(pillar) {
  if (pillar.key === "performance") {
    return `Largest Contentful Paint is ${liveResult.lcp} — anything past 2.5s starts losing visitors before the page even finishes loading.`;
  }
  if (pillar.key === "seo") {
    return "Thin or missing title tags and meta descriptions make it harder for both search engines and AI tools to understand what the page is about.";
  }
  return "A security or best-practices gap — often a missing HTTPS redirect or an outdated library — that browsers flag to visitors before they reach your content.";
}

function animateLiveResult() {
  ["overall", "performance", "seo", "bestPractices"].forEach((key, i) => {
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: liveResult[key],
      duration: 1,
      delay: i * 0.1,
      ease: "power2.out",
      onUpdate: () => {
        liveDisplay[key] = Math.round(proxy.val);
      },
    });
  });
}

const LIVE_CHECK_CACHE_TTL = 15 * 60 * 1000; // 15 minutes — avoids re-burning quota while testing/demoing

function getCachedLiveCheck(cacheKey) {
  try {
    const raw = sessionStorage.getItem("amortree_live_check:" + cacheKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.savedAt > LIVE_CHECK_CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function setCachedLiveCheck(cacheKey, data) {
  try {
    sessionStorage.setItem("amortree_live_check:" + cacheKey, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // sessionStorage unavailable (private browsing, etc.) — caching is a nice-to-have, not required.
  }
}

const liveCheckErrorType = ref(""); // "" | "quota" | "timeout" | "network" | "generic"

async function runLiveCheck(rawUrl) {
  const target = normalizeUrl(rawUrl);
  pendingUrl.value = target;
  liveCheckError.value = "";
  liveCheckErrorType.value = "";

  const cacheKey = target.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  const cached = getCachedLiveCheck(cacheKey);
  if (cached) {
    // Same URL checked recently in this session — reuse it instead of
    // spending another call against Google's (easily-exhausted) free quota.
    liveCheckStatus.value = "loading";
    Object.assign(liveResult, cached);
    liveDisplay.overall = 0;
    liveDisplay.performance = 0;
    liveDisplay.seo = 0;
    liveDisplay.bestPractices = 0;
    setTimeout(() => {
      liveCheckStatus.value = "success";
      animateLiveResult();
    }, 350);
    return;
  }

  liveCheckStatus.value = "loading";

  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", target);
  endpoint.searchParams.set("strategy", "mobile");
  ["performance", "seo", "best-practices"].forEach((c) => endpoint.searchParams.append("category", c));
  if (PAGESPEED_API_KEY) endpoint.searchParams.set("key", PAGESPEED_API_KEY);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);

  try {
    const res = await fetch(endpoint.toString(), { signal: controller.signal });
    const data = await res.json();

    if (!res.ok || data.error) {
      throw new Error(data?.error?.message || `Live check failed (HTTP ${res.status}).`);
    }

    const lh = data.lighthouseResult;
    const cats = lh?.categories;
    const audits = lh?.audits;
    if (!cats || !audits) throw new Error("Google returned an unexpected response for that URL.");

    const perf = Math.round((cats.performance?.score ?? 0) * 100);
    const seo = Math.round((cats.seo?.score ?? 0) * 100);
    const bp = Math.round((cats["best-practices"]?.score ?? 0) * 100);

    const resultData = {
      url: target.replace(/^https?:\/\//i, ""),
      performance: perf,
      seo,
      bestPractices: bp,
      overall: Math.round((perf + seo + bp) / 3),
      lcp: audits["largest-contentful-paint"]?.displayValue || "—",
      cls: audits["cumulative-layout-shift"]?.displayValue || "—",
      tbt: audits["total-blocking-time"]?.displayValue || "—",
      httpsOk: (audits["is-on-https"]?.score ?? 1) === 1,
      titleOk: (audits["document-title"]?.score ?? 1) === 1,
      metaDescOk: (audits["meta-description"]?.score ?? 1) === 1,
      crawlableOk: (audits["is-crawlable"]?.score ?? 1) === 1,
    };

    Object.assign(liveResult, resultData);
    setCachedLiveCheck(cacheKey, resultData);

    liveDisplay.overall = 0;
    liveDisplay.performance = 0;
    liveDisplay.seo = 0;
    liveDisplay.bestPractices = 0;
    liveCheckStatus.value = "success";
    animateLiveResult();
  } catch (err) {
    console.error("Live check failed:", err);
    const msg = err.message || "";

    if (/quota/i.test(msg) || /RESOURCE_EXHAUSTED/i.test(msg)) {
      liveCheckErrorType.value = "quota";
      liveCheckError.value =
        "Google's free PageSpeed quota for today is used up. Without an API key, every visitor to every site using this free tier shares one small daily quota — it runs out fast. Add a free key (takes about 5 minutes) to fix this permanently.";
    } else if (err.name === "AbortError") {
      liveCheckErrorType.value = "timeout";
      liveCheckError.value =
        "That scan took too long and timed out. Some sites block automated scanners — try again, or request a manual audit below.";
    } else if (msg.includes("Failed to fetch")) {
      liveCheckErrorType.value = "network";
      liveCheckError.value = "Couldn't reach Google's audit service — check your connection and try again.";
    } else {
      liveCheckErrorType.value = "generic";
      liveCheckError.value = `${msg || "We couldn't complete a live scan for that site."} It may be blocking automated tools, or the URL may be incorrect.`;
    }
    liveCheckStatus.value = "error";
  } finally {
    clearTimeout(timeoutId);
  }
}

/* ---------------------------------------------------------------- */
/* Problem — invisible grove                                         */
/* ---------------------------------------------------------------- */
const groveBars = [38, 52, 88, 44, 60, 34, 70, 48, 56, 40];

/* ---------------------------------------------------------------- */
/* Stat band                                                         */
/* ---------------------------------------------------------------- */
const statBand = [
  { big: "2+", text: "years designing and building production websites, SaaS products, and mobile apps for growing B2B teams.", source: "Amortree Tech" },
  { big: "72hr", text: "from a kickoff call to a scoped proposal and timeline — no lengthy sales process before you see a plan.", source: "Amortree Engagement" },
  { big: "6", text: "disciplines under one roof: design, development, SaaS product, mobile, SEO, and growth strategy.", source: "Amortree Coverage" },
];

/* ---------------------------------------------------------------- */
/* What We Do — services (rendered as GSAP-driven stacked cards)     */
/* ---------------------------------------------------------------- */
const services = [
  {
    index: "01",
    title: "Website Design & Development",
    body: "Custom-built marketing sites, landing pages, and web apps, designed around how your buyers actually browse and convert — not a template with your logo on it.",
    checks: ["Custom UI/UX design", "Responsive front-end build", "CMS & headless integrations", "Conversion-focused landing pages"],
    meta: "Most requested",
    icon: "language",
  },
  {
    index: "02",
    title: "UI/UX Strategy & Product Design",
    body: "Interfaces for SaaS products and internal tools, grounded in real user flows — wireframes through pixel-perfect, developer-ready design systems.",
    checks: ["User research & flow mapping", "Wireframes to hi-fi UI", "Design systems & tokens", "Usability testing"],
    meta: "Design-led",
    icon: "design_services",
  },
  {
    index: "03",
    title: "SaaS Product Development",
    body: "End-to-end build for SaaS products — from MVP to a scalable Vue front end backed by the APIs and integrations your product actually needs.",
    checks: ["MVP to production build", "Vue / React front-ends", "API & third-party integrations", "Iterative, sprint-based delivery"],
    meta: "Full-stack",
    icon: "dashboard_customize",
  },
  {
    index: "04",
    title: "Mobile App Development",
    body: "Native-feeling experiences for iOS and Android, built to carry the same design system as your website and product so the brand never feels disjointed.",
    checks: ["iOS & Android builds", "Cross-platform frameworks", "App store readiness", "Design consistency with web"],
    meta: "iOS & Android",
    icon: "smartphone",
  },
  {
    index: "05",
    title: "SEO & Digital Growth",
    body: "Technical SEO, on-page structure, and content architecture that gets you found on Google — and increasingly, cited inside AI answers like ChatGPT and Gemini.",
    checks: ["Technical & on-page SEO", "Content architecture", "Structured data (schema)", "AI & search discoverability"],
    meta: "Ongoing",
    icon: "trending_up",
  },
  {
    index: "06",
    title: "Brand & Growth Strategy",
    body: "Positioning, messaging, and a growth roadmap that ties design, content, and marketing to one measurable goal: pipeline, not just page views.",
    checks: ["Brand positioning", "Messaging & content strategy", "Growth roadmap", "Quarterly strategy reviews"],
    meta: "Strategic",
    icon: "insights",
  },
];

/* ---------------------------------------------------------------- */
/* Growth Score rings + tiers                                        */
/* ---------------------------------------------------------------- */
const ringCards = [
  { pct: "32%", note: "Primary driver", title: "Design & UX Quality", body: "Whether the site is clear, credible, and easy to act on — from first impression to the moment someone reaches for a form or a call." },
  { pct: "20%", title: "Performance", body: "Load speed and Core Web Vitals. Slow, janky pages lose visitors before they read a word, and get crawled less often." },
  { pct: "20%", title: "SEO & Content", body: "On-page structure, content depth, and technical SEO — the foundation that gets you found on Google in the first place." },
  { pct: "12%", title: "Security Health", body: "SSL validity, HTTPS enforcement, and crawler-friendly configuration. A grade of C or below and both buyers and bots hesitate." },
  { pct: "10%", title: "AI & Search Discoverability", body: "Structured data and machine-readable content — the signals that let AI tools like ChatGPT, Claude, and Gemini find and cite you." },
  { pct: "6%", title: "Conversion Readiness", body: "How easy the site makes it to actually reach out — clear CTAs, working forms, and a path from visitor to lead." },
];

const tierStages = [
  { range: "0–29", name: "Seedling", body: "Buyers can't easily find, trust, or convert with you online. The basics — speed, clarity, or SEO — are holding the site back." },
  { range: "30–59", name: "Sapling", body: "You're present but unconfirmed — design or content gaps keep visitors from committing to a conversation." },
  { range: "60–79", name: "Growing Tree", body: "The fundamentals are in place. This is where search engines, AI tools, and buyers start taking you seriously." },
  { range: "80–100", name: "Full Canopy", body: "Fast, secure, well-structured, and easy to act on — a site that earns trust and converts on its own." },
];

/* ---------------------------------------------------------------- */
/* Case study                                                        */
/* ---------------------------------------------------------------- */
const caseStudy = {
  client: "Kestrel Bearings",
  meta: "Industry: Precision Bearings & Motion Components  ·  Engagement: Website Rebuild + Growth, 84 Days",
  metrics: [
    { num: "11→76", label: "Growth Score lift in 84 days" },
    { num: "3.1x", label: "Increase in qualified inbound enquiries" },
  ],
  blocks: [
    { title: "The Challenge", body: "Kestrel had two decades of precision-motion expertise and ISO 9001 certification — almost none of it visible on a site untouched since 2016. Buyers researching vendors, on Google or through AI tools, found little to go on." },
    { title: "What We Did", body: "The audit scored them a Seedling at 11. We rebuilt the site on a proper design system, restructured content and schema around their real capabilities, and lifted Core Web Vitals and security to production-grade." },
    { title: "The Impact", body: "Score moved from 11 to 76 — Growing Tree — in 84 days. Qualified inbound enquiries rose 3.1x in the two months after launch, and Kestrel now reads as credible wherever a buyer looks, search engine or AI assistant." },
  ],
};

/* ---------------------------------------------------------------- */
/* Industries                                                        */
/* ---------------------------------------------------------------- */
const industries = [
  { icon: "precision_manufacturing", title: "Manufacturing & Auto-Ancillary", body: "Product catalogs, certifications, and OEM relationships built into a site that reads as credible to procurement teams and modern search alike.", tags: ["Product Catalogs", "ISO / IATF Content", "OEM Portals"] },
  { icon: "medical_services", title: "Healthcare & MedTech", body: "Accreditation-forward websites and patient- or partner-facing tools that meet compliance needs without sacrificing usability.", tags: ["NABH / NABL Content", "Patient UX", "Compliance-Aware"] },
  { icon: "terminal", title: "IT & Technology Services", body: "Service pages, case studies, and credential-rich content structured to win enterprise procurement attention.", tags: ["Case Study Systems", "Service Pages", "Credential Markup"] },
  { icon: "account_balance", title: "Fintech & Financial Services", body: "Licensing, compliance, and product clarity — presented with the trust signals financial buyers expect.", tags: ["Compliance Content", "Product Clarity", "Trust Signals"] },
  { icon: "local_shipping", title: "Logistics & Supply Chain", body: "Coverage maps, fleet capability, and partner network detail structured for fast vendor evaluation.", tags: ["Coverage Pages", "Fleet Data", "Partner Network"] },
  { icon: "workspace_premium", title: "Professional Services", body: "Expertise, credentials, and case studies structured to turn consulting inquiries into qualified conversations.", tags: ["Expertise Pages", "Case Studies", "Lead Capture"] },
];

/* ---------------------------------------------------------------- */
/* FAQ                                                                */
/* ---------------------------------------------------------------- */
const faqs = [
  { q: "What does Amortree actually build?", a: "Websites, SaaS products, and mobile apps — plus the SEO and growth strategy to make sure they get found and used. Most engagements start with a website or product redesign and grow into an ongoing growth retainer." },
  { q: "How is this different from a typical web agency?", a: "One team covers design, front-end development, product, and growth — the same people from kickoff to launch. Nothing gets lost in a hand-off between a design studio and a separate dev shop." },
  { q: "Do you work with early-stage products, or only established companies?", a: "Both. We've taken SaaS ideas from a blank canvas to a working MVP, and we've rebuilt decade-old sites for established B2B manufacturers and service firms." },
  { q: "What's the free website check on this page?", a: "It's a real, live scan of your site's Performance, on-page SEO, and Security — the same technology behind Google's own Lighthouse tooling. It's a taste of the full six-pillar Growth Score, not a marketing gimmick." },
  { q: "How long does a typical website or product build take?", a: "A focused marketing site or landing page usually ships in 4–8 weeks. SaaS MVPs and larger product builds run longer and are scoped after a kickoff call." },
  { q: "Do you offer support after launch?", a: "Yes — ongoing retainers cover maintenance, SEO, content, and iterative product work, so the site keeps improving instead of going stale the day it ships." },
  { q: "Can you help us get found by AI tools like ChatGPT and Gemini, not just Google?", a: "Yes. Structured data and machine-readable content are part of our SEO & Growth service, and it's one of the six pillars in the Growth Score." },
  { q: "What is the Growth Score?", a: "A 0–100 measure of how well your website actually works for the business behind it, built from six weighted pillars: Design & UX (32%), Performance (20%), SEO & Content (20%), Security (12%), AI & Search Discoverability (10%), and Conversion Readiness (6%)." },
  { q: "What industries do you work with?", a: "Manufacturing, healthcare, IT services, fintech, logistics, and professional services, with more playbooks in progress. If your buyers research vendors online, we can help you win that moment." },
];
const activeFaq = ref(0);

/* ---------------------------------------------------------------- */
/* Final CTA stats                                                   */
/* ---------------------------------------------------------------- */
const finalStats = [
  { num: "4–8 wks", body: "Typical timeline for a full website or landing page design-and-build, start to launch." },
  { num: "6", body: "Core disciplines covered in-house: design, front-end, SaaS product, mobile, SEO, and growth." },
  { num: "1", body: "Team from first call to launch — no hand-off between a design agency and a separate dev shop." },
];

/* ---------------------------------------------------------------- */
/* Lifecycle                                                         */
/* ---------------------------------------------------------------- */
let gsapContext;

onMounted(async () => {
  if (!PAGESPEED_API_KEY) {
    console.warn(
      "[Amortree Live Check] No PAGESPEED_API_KEY set. Without one, this page shares Google's " +
        "small public quota with every other unauthenticated caller worldwide, and will hit " +
        "\"Quota exceeded\" errors almost immediately. Get a free key (~5 min, no billing " +
        "required for normal use) at https://developers.google.com/speed/docs/insights/v5/get-started " +
        "and paste it into PAGESPEED_API_KEY near the top of this file.",
    );
  }

  // Make sure every v-for list (services, industries, rings) has actually
  // painted before we start measuring elements for ScrollTrigger.
  await nextTick();

  gsapContext = gsap.context(() => {
    gsap.from(".hero-eyebrow, .hero-title, .hero-lede, .hero-cta-row, .hero-trust", {
      y: 26,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
    });

    gsap.from(".hero-visual", {
      y: 30,
      autoAlpha: 0,
      duration: 0.9,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    gsap.utils.toArray(".industry-card").forEach((card, i) => {
      gsap.from(card, {
        y: 24,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      });
    });

    gsap.utils.toArray(".ring-card").forEach((card, i) => {
      gsap.from(card, {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 92%", once: true },
      });
    });

    /* ------------------------------------------------------------
       "What We Do" — vertically stacked service cards.

       Earlier versions of this used GSAP's ScrollTrigger.pin (both
       for the header and for each card, at different points across
       several attempts). That kept producing new failure modes —
       most recently, cards rendering narrower and shifted from the
       header instead of aligned to it. The likely cause: once
       multiple simultaneous position:fixed pins are in play, along
       with a `perspective` on the pinned element itself, the browser
       has more edge cases to get right than is worth the risk here.

       Switched to a much simpler, far more battle-tested pattern:
       plain CSS `position: sticky` handles "stay in place while
       scrolling" (see .stack-card below) — no GSAP pin, no pin-spacer
       elements, none of the position:fixed containing-block quirks
       that `transform`/`perspective`/`filter` on an ancestor can
       trigger. GSAP's only job here is the scroll-scrubbed scale/tilt
       animation on the card once it's already stuck in place, which
       is a much smaller, safer surface area.

       The separately pinned header (from earlier attempts) has been
       dropped entirely — it was the other half of what kept breaking,
       and a working card stack matters more than a header that also
       stays fixed. It scrolls normally above the cards now.
       ------------------------------------------------------------ */
    const stackCards = gsap.utils.toArray(".stack-card");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const STICKY_TOP = 126; // must match the top value on .stack-card in CSS

    if (stackCards.length && !prefersReducedMotion) {
      stackCards.forEach((wrapper, i) => {
        const isLast = i === stackCards.length - 1;
        if (isLast) return; // nothing ever covers the last card, so it never animates

        const card = wrapper.querySelector(".stack-card-inner");
        const next = stackCards[i + 1];
        const scale = 0.94 - i * 0.015;

        gsap.to(card, {
          scale,
          rotationX: -8,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: () => `top top+=${STICKY_TOP}`,
            endTrigger: next,
            end: () => `top top+=${STICKY_TOP}`,
            scrub: true,
          },
        });
      });
    }
  });

  // Recalculate trigger positions once everything (fonts, images, layout)
  // has fully settled — stacked cards are especially sensitive to this.
  window.requestAnimationFrame(() => ScrollTrigger.refresh());
});

onBeforeUnmount(() => {
  gsapContext && gsapContext.revert();
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="amor-score-page">
    <main id="top">
      <!-- ============================================================
           HERO
           ============================================================ -->
      <section class="as-hero">
        <div class="as-aurora" aria-hidden="true"></div>
        <span class="as-hero-watermark" aria-hidden="true">A</span>

        <div class="as-wrap as-hero-center">
          <div class="as-eyebrow as-eyebrow-center hero-eyebrow mt-16">WEBSITE DEVELOPMENT • UI/UX • SEO • DIGITAL GROWTH</div>
          <h1 class="as-hero-title hero-title">
            Your Website Could Be <span class="accent-italic">Losing Customers Every Single Day.</span>
          </h1>
          <p class="as-hero-lede hero-lede">
            Get a professional website audit that uncovers the problems hurting your Google rankings, user experience, trust, speed, and conversions.
            You'll receive actionable recommendations—not generic AI suggestions.
          </p>
          <form class="as-url-form as-url-form-center hero-cta-row" @submit.prevent="submitHeroUrl">
            <span class="material-symbols-outlined as-url-icon" aria-hidden="true">language</span>
            <input
              v-model.trim="websiteUrl"
              type="text"
              inputmode="url"
              placeholder="Your website URL"
              aria-label="Your website URL"
              @focus="heroUrlError = ''"
            />
            <button class="as-btn as-btn-primary" type="submit">
              Get My Free Audit
              <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </button>
          </form>
          <p v-if="heroUrlError" class="as-field-error as-hero-url-error as-field-error-center">{{ heroUrlError }}</p>
          <div class="as-hero-secondary-link">
            <a href="#what-we-do">See what we do</a>
          </div>
          <div class="as-trust-strip as-trust-strip-center hero-trust">
            <span>No commitment</span><span>Delivered within 72 hours</span><span>Manual review by our team</span>
          </div>
        </div>

        <div class="as-wrap">
          <div class="as-hero-visual hero-visual">
            <div class="score-card" :class="'is-' + liveCheckStatus">
              <!-- IDLE -->
              <div v-if="liveCheckStatus === 'idle'" class="live-state live-idle">
                <span class="material-symbols-outlined live-state-icon" aria-hidden="true">bolt</span>
                <h3>Your live check will appear here</h3>
                <p>
                  Enter your website above and tell us a bit about your business — then we'll run
                  a real scan: actual Lighthouse performance, on-page SEO signals, and security
                  checks, live.
                </p>
              </div>

              <!-- LOADING -->
              <div v-else-if="liveCheckStatus === 'loading'" class="live-state live-loading">
                <div class="live-loading-track"><span class="live-loading-bar"></span></div>
                <p class="live-loading-domain">{{ pendingUrl }}</p>
                <p class="live-loading-copy">
                  Running a real scan on your site — this can take up to 30 seconds since we're
                  actually loading the page, the same way Google does.
                </p>
              </div>

              <!-- ERROR -->
              <div v-else-if="liveCheckStatus === 'error'" class="live-state live-error">
                <span class="material-symbols-outlined live-state-icon" aria-hidden="true">error</span>
                <h3>{{ liveCheckErrorType === "quota" ? "Free quota used up for today" : "We couldn't complete a live scan" }}</h3>
                <p>{{ liveCheckError }}</p>
                <div class="live-error-actions">
                  <a
                    v-if="liveCheckErrorType === 'quota'"
                    class="as-btn as-btn-primary"
                    href="https://developers.google.com/speed/docs/insights/v5/get-started"
                    target="_blank"
                    rel="noopener"
                  >Get a Free API Key</a>
                  <button v-else class="as-btn as-btn-primary" type="button" @click="runLiveCheck(pendingUrl)">Try Again</button>
                  <a
                    class="as-btn as-btn-ghost"
                    :href="waBase + encodeURIComponent('Hi, the live check for ' + pendingUrl + ' failed on the site. Could you take a look?')"
                    target="_blank"
                    rel="noopener"
                  >Message Us Instead</a>
                </div>
              </div>

              <!-- SUCCESS -->
              <template v-else>
                <div class="score-card-top">
                  <div class="domain-chip"><span class="dot dot-live"></span>{{ liveResult.url }}</div>
                  <div class="live-badge"><span class="live-dot"></span>Live Scan</div>
                </div>

                <div class="score-card-body">
                  <div class="score-card-left">
                    <div class="score-eyebrow">Website Growth Score</div>

                    <div class="score-gauge" :class="'is-' + tierBand(liveDisplay.overall)" :style="{ '--gauge-pct': liveDisplay.overall + '%' }">
                      <div class="score-gauge-hole">
                        <span class="score-num">{{ liveDisplay.overall }}</span>
                        <span class="score-of">/ 100</span>
                      </div>
                    </div>

                    <div class="score-tier-row">
                      <span class="score-tier" :class="'is-' + tierBand(liveDisplay.overall)">{{ tierFor(liveDisplay.overall) }}</span>
                      <span v-if="hasHiddenWeakness" class="score-tier-caution" title="One pillar is scoring well below this headline number">
                        <span class="material-symbols-outlined" aria-hidden="true">warning</span>
                      </span>
                    </div>
                  </div>

                  <div class="score-pillars">
                    <div class="score-pillar-row">
                      <span class="pillar-label">Performance</span>
                      <span class="pillar-bar">
                        <span
                          class="pillar-bar-fill"
                          :class="'is-' + bandFor(liveDisplay.performance)"
                          :style="{ width: liveDisplay.performance + '%' }"
                        ></span>
                      </span>
                      <span class="pillar-value" :class="'is-' + bandFor(liveDisplay.performance)">{{ liveDisplay.performance }}</span>
                    </div>
                    <div class="score-pillar-row">
                      <span class="pillar-label">On-Page SEO Signals</span>
                      <span class="pillar-bar">
                        <span
                          class="pillar-bar-fill"
                          :class="'is-' + bandFor(liveDisplay.seo)"
                          :style="{ width: liveDisplay.seo + '%' }"
                        ></span>
                      </span>
                      <span class="pillar-value" :class="'is-' + bandFor(liveDisplay.seo)">{{ liveDisplay.seo }}</span>
                    </div>
                    <div class="score-pillar-row">
                      <span class="pillar-label">Security &amp; Best Practices</span>
                      <span class="pillar-bar">
                        <span
                          class="pillar-bar-fill"
                          :class="'is-' + bandFor(liveDisplay.bestPractices)"
                          :style="{ width: liveDisplay.bestPractices + '%' }"
                        ></span>
                      </span>
                      <span class="pillar-value" :class="'is-' + bandFor(liveDisplay.bestPractices)">{{ liveDisplay.bestPractices }}</span>
                    </div>
                  </div>
                </div>

                <!-- The one thing worth fixing first — never buried behind
                     a decent-looking overall number. -->
                <div
                  v-if="weakestPillar.score < 90"
                  class="live-opportunity"
                  :class="'is-' + bandFor(weakestPillar.score)"
                >
                  <span class="material-symbols-outlined live-opportunity-icon" aria-hidden="true">priority_high</span>
                  <div class="live-opportunity-copy">
                    <p class="live-opportunity-title">
                      Fix this first: {{ weakestPillar.label }}
                      <span class="live-opportunity-score">{{ weakestPillar.score }}/100</span>
                    </p>
                    <p class="live-opportunity-body">{{ opportunityMessage(weakestPillar) }}</p>
                  </div>
                </div>

                <div class="live-detail-grid">
                  <div class="live-detail-item">
                    <span class="material-symbols-outlined" :class="liveResult.httpsOk ? 'is-pass' : 'is-fail'" aria-hidden="true">
                      {{ liveResult.httpsOk ? "check_circle" : "cancel" }}
                    </span>
                    HTTPS enabled
                  </div>
                  <div class="live-detail-item">
                    <span class="material-symbols-outlined" :class="liveResult.titleOk ? 'is-pass' : 'is-fail'" aria-hidden="true">
                      {{ liveResult.titleOk ? "check_circle" : "cancel" }}
                    </span>
                    Title tag present
                  </div>
                  <div class="live-detail-item">
                    <span class="material-symbols-outlined" :class="liveResult.metaDescOk ? 'is-pass' : 'is-fail'" aria-hidden="true">
                      {{ liveResult.metaDescOk ? "check_circle" : "cancel" }}
                    </span>
                    Meta description present
                  </div>
                  <div class="live-detail-item">
                    <span class="material-symbols-outlined" :class="liveResult.crawlableOk ? 'is-pass' : 'is-fail'" aria-hidden="true">
                      {{ liveResult.crawlableOk ? "check_circle" : "cancel" }}
                    </span>
                    Crawlable by bots
                  </div>
                  <div class="live-detail-item live-detail-metric" :class="'is-' + bandFor(liveDisplay.performance)">
                    LCP <strong>{{ liveResult.lcp }}</strong>
                  </div>
                  <div class="live-detail-item live-detail-metric">CLS <strong>{{ liveResult.cls }}</strong></div>
                </div>

                <div class="live-upsell">
                  <p>
                    This instant check covers 3 of the 6 pillars in your full Growth Score.
                    <strong>Design &amp; UX, AI/search discoverability, and conversion readiness</strong>
                    are already on the way — your full report lands within 72 hours.
                  </p>
                  <a
                    class="as-btn as-btn-ghost"
                    :href="waBase + encodeURIComponent('Hi, I just ran a live check for ' + liveResult.url + ' and wanted to follow up on my full audit.')"
                    target="_blank"
                    rel="noopener"
                  >Message us on WhatsApp</a>
                </div>
              </template>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================
           WHAT WE DO — vertically stacked service cards (GSAP)
           ============================================================ -->
      <section id="what-we-do" class="as-section as-section-light as-services-section">
        <div class="as-wrap">
          <div class="as-section-head reveal">
            <div class="as-eyebrow">What We Do</div>
            <h2 class="as-h2">One team, six disciplines, no hand-offs.</h2>
            <p class="as-body-lg">
              Design, build, and grow — under one roof. Scroll to see everything one Amortree
              engagement can cover, end to end.
            </p>
          </div>

          <div class="stack-wrap">
            <div v-for="service in services" :key="service.title" class="stack-card">
              <div class="stack-card-inner">
                <div class="stack-card-top">
                  <div class="stack-icon"><span class="material-symbols-outlined">{{ service.icon }}</span></div>
                  <span class="stack-index">{{ service.index }} / 06</span>
                </div>
                <h3>{{ service.title }}</h3>
                <p>{{ service.body }}</p>
                <ul class="stack-checks">
                  <li v-for="c in service.checks" :key="c">
                    <span class="material-symbols-outlined">check</span>{{ c }}
                  </li>
                </ul>
                <span class="stack-meta">{{ service.meta }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================
           PROBLEM
           ============================================================ -->
      <section class="as-section as-section-light">
        <div class="as-wrap as-problem-grid">
          <div class="reveal">
            <div class="as-eyebrow">The Invisible Roots</div>
            <h2 class="as-h2">Why a good business can still have an invisible website.</h2>
            <p class="as-body-lg">
              Buyers now research vendors across Google, review sites, and increasingly AI tools
              before they ever pick up the phone. A site that's slow, thin on content, or unclear
              about what you do gets skipped — no matter how good the business behind it is.
            </p>
          </div>
          <div class="reveal">
            <div class="grove" aria-hidden="true">
              <div
                v-for="(h, i) in groveBars"
                :key="i"
                class="grove-stalk"
                :class="{ 'is-lit': i === 2 }"
                :style="{ height: h + '%' }"
              ></div>
            </div>
            <p class="as-stat-caption">
              Most B2B websites we audit score under <strong>50/100</strong> on Growth Score before
              we touch them. The gap is rarely the business — it's the site.
            </p>
          </div>
        </div>
      </section>

      <!-- ============================================================
           STAT BAND
           ============================================================ -->
      <div class="as-stat-band as-section-light">
        <div class="as-wrap as-stat-band-grid">
          <div v-for="stat in statBand" :key="stat.big" class="as-stat-cell reveal">
            <div class="as-stat-big">{{ stat.big }}</div>
            <p>{{ stat.text }}</p>
            <div class="as-stat-src">{{ stat.source }}</div>
          </div>
        </div>
      </div>

      <!-- ============================================================
           SCORE / RINGS
           ============================================================ -->
      <section id="score" class="as-section as-section-light">
        <div class="as-wrap">
          <div class="as-section-head reveal">
            <div class="as-eyebrow">The Growth Score</div>
            <h2 class="as-h2">Six pillars. One number that tells you where the site is costing you leads.</h2>
            <p class="as-body-lg">
              Every site we look at is scored across six weighted pillars — the same six things
              that decide whether a visitor becomes a lead.
            </p>
          </div>

          <div class="as-rings-grid">
            <div v-for="ring in ringCards" :key="ring.title" class="ring-card">
              <div class="ring-pct">{{ ring.pct }}<span v-if="ring.note"> · {{ ring.note }}</span></div>
              <h4>{{ ring.title }}</h4>
              <p>{{ ring.body }}</p>
            </div>
          </div>

          <div class="as-stages-strip reveal">
            <div v-for="tier in tierStages" :key="tier.name" class="as-stage-block">
              <div class="as-stage-range">{{ tier.range }}</div>
              <h4>{{ tier.name }}</h4>
              <p>{{ tier.body }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================
           CASE STUDY
           ============================================================ -->
      <section id="case-study" class="as-section as-section-light">
        <div class="as-wrap">
          <div class="as-section-head reveal">
            <div class="as-eyebrow">Case Study</div>
            <h2 class="as-h2">Proven growth. Visible canopy.</h2>
          </div>

          <div class="as-case-card reveal">
            <div class="as-case-top">
              <div>
                <div class="as-case-client">{{ caseStudy.client }}</div>
                <div class="as-case-meta">{{ caseStudy.meta }}</div>
              </div>
              <div class="as-case-metrics">
                <div v-for="m in caseStudy.metrics" :key="m.label" class="as-case-metric">
                  <div class="as-case-metric-num">{{ m.num }}</div>
                  <div class="as-case-metric-label">{{ m.label }}</div>
                </div>
              </div>
            </div>
            <div class="as-case-body">
              <div v-for="block in caseStudy.blocks" :key="block.title" class="as-case-block">
                <h5>{{ block.title }}</h5>
                <p>{{ block.body }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================
           INDUSTRIES
           ============================================================ -->
      <section id="industries" class="as-section as-section-light">
        <div class="as-wrap">
          <div class="as-section-head reveal">
            <div class="as-eyebrow">Industries We Serve</div>
            <h2 class="as-h2">Every B2B category. Rooted differently.</h2>
            <p class="as-body-lg">
              Every industry has its own trust signals and procurement behavior. We design and
              structure each one for how buyers in that category actually decide.
            </p>
          </div>

          <div class="as-industry-grid">
            <div v-for="ind in industries" :key="ind.title" class="industry-card">
              <span class="material-symbols-outlined industry-icon">{{ ind.icon }}</span>
              <h4>{{ ind.title }}</h4>
              <p>{{ ind.body }}</p>
              <div class="as-tag-row">
                <span v-for="tag in ind.tags" :key="tag" class="as-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================
           FAQ
           ============================================================ -->
      <section class="as-section as-section-light" id="faq">
        <div class="as-wrap as-faq-wrap">
          <div class="as-section-head reveal">
            <div class="as-eyebrow">Have Questions? We've Got Answers.</div>
            <h2 class="as-h2">When in doubt, always ask.</h2>
          </div>

          <div class="as-faq-list">
            <div
              v-for="(item, i) in faqs"
              :key="item.q"
              class="as-faq-item"
              :class="{ 'is-open': activeFaq === i }"
            >
              <button class="as-faq-q" type="button" @click="activeFaq = activeFaq === i ? -1 : i">
                <span>{{ item.q }}</span>
                <span class="as-faq-plus" aria-hidden="true"></span>
              </button>
              <div class="as-faq-a" v-show="activeFaq === i">
                <p>{{ item.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================
           FINAL CTA
           ============================================================ -->
      <section class="as-final-cta" id="final-cta">
        <div class="as-wrap">
          <div class="as-eyebrow" style="justify-content: center">Free Website Check · No Commitment</div>
          <h2 class="as-h2">Get your free Website Growth Score.</h2>
          <p class="as-body-lg as-final-lede">
            A real, live scan of your site today — and a full six-pillar report within 72 hours,
            so you know exactly what design, dev, or SEO work would move the needle.
          </p>
          <form class="as-url-form as-url-form-center" @submit.prevent="submitHeroUrl">
            <span class="material-symbols-outlined as-url-icon" aria-hidden="true">language</span>
            <input
              v-model.trim="websiteUrl"
              type="text"
              inputmode="url"
              placeholder="yourbusiness.com"
              aria-label="Your website URL"
              @focus="heroUrlError = ''"
            />
            <button class="as-btn as-btn-primary" type="submit">
              Check My Website
              <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </button>
          </form>
          <p v-if="heroUrlError" class="as-field-error as-hero-url-error" style="justify-content: center; display: flex">
            {{ heroUrlError }}
          </p>
          <div class="as-trust-strip" style="justify-content: center; margin-top: 22px">
            <span>Free check</span><span>72-hour proposal</span><span>No commitment</span><span>Any industry</span>
          </div>

          <div class="as-final-stats">
            <div v-for="stat in finalStats" :key="stat.num" class="as-final-cell">
              <div class="as-final-num">{{ stat.num }}</div>
              <p>{{ stat.body }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ============================================================
         AUDIT REQUEST MODAL
         (kept inside .amor-score-page so it inherits the
         --gold/--surface-* custom properties scoped here)
         ============================================================ -->
    <transition name="as-modal-fade">
      <div v-if="isModalOpen" class="as-modal-overlay" @click.self="closeModal">
        <div class="as-modal" role="dialog" aria-modal="true" aria-labelledby="auditModalTitle">
          <button class="as-modal-close" type="button" aria-label="Close" @click="closeModal">
            <span class="material-symbols-outlined" aria-hidden="true">close</span>
          </button>

          <template v-if="formState !== 'success'">
            <h3 id="auditModalTitle" class="as-modal-title">Get your free Website Growth Score</h3>
            <p class="as-modal-sub">
              A few quick details, then your live check runs instantly.
            </p>

            <form class="as-modal-form" @submit.prevent="submitAuditForm">
              <!-- Honeypot — hidden from real visitors, catches simple bots -->
              <input
                v-model="form._hp"
                type="text"
                tabindex="-1"
                autocomplete="off"
                class="as-hp-field"
                aria-hidden="true"
              />

              <label class="as-field">
                <span>Full name</span>
                <input v-model.trim="form.fullName" type="text" placeholder="Jordan Mehta" autocomplete="name" />
                <span v-if="formErrors.fullName" class="as-field-error">{{ formErrors.fullName }}</span>
              </label>

              <label class="as-field">
                <span>Phone number</span>
                <input v-model.trim="form.phone" type="tel" placeholder="+91 98765 43210" autocomplete="tel" />
                <span v-if="formErrors.phone" class="as-field-error">{{ formErrors.phone }}</span>
              </label>

              <label class="as-field as-field-span2">
                <span>Email</span>
                <input v-model.trim="form.email" type="email" placeholder="jordan@company.com" autocomplete="email" />
                <span v-if="formErrors.email" class="as-field-error">{{ formErrors.email }}</span>
              </label>

              <label class="as-field">
                <span>Company name</span>
                <input
                  v-model.trim="form.companyName"
                  type="text"
                  placeholder="Kestrel Bearings"
                  autocomplete="organization"
                />
                <span v-if="formErrors.companyName" class="as-field-error">{{ formErrors.companyName }}</span>
              </label>

              <label class="as-field">
                <span>Company website</span>
                <input v-model.trim="form.companyWebsite" type="text" placeholder="yourbusiness.com" />
                <span v-if="formErrors.companyWebsite" class="as-field-error">{{ formErrors.companyWebsite }}</span>
              </label>

              <label class="as-field as-field-span2">
                <span>Industry</span>
                <select v-model="form.industry">
                  <option value="" disabled>Select your industry</option>
                  <option v-for="opt in industryOptions" :key="opt" :value="opt">{{ opt }}</option>
                </select>
                <span v-if="formErrors.industry" class="as-field-error">{{ formErrors.industry }}</span>
              </label>

              <button class="as-btn as-btn-primary as-btn-large as-modal-submit as-field-span2" type="submit" :disabled="formState === 'submitting'">
                <span v-if="formState !== 'submitting'">Start My Free Check</span>
                <span v-else class="as-spinner-row"><span class="as-spinner" aria-hidden="true"></span>Submitting…</span>
              </button>
            </form>
          </template>

          <template v-else>
            <div class="as-modal-success">
              <span class="material-symbols-outlined as-success-icon" aria-hidden="true">task_alt</span>
              <h3 id="auditModalTitle" class="as-modal-title">You're all set{{ form.fullName ? ", " + form.fullName.split(" ")[0] : "" }}.</h3>
              <p class="as-modal-sub">
                Pulling up your live check for <strong>{{ form.companyWebsite }}</strong> now. Your
                full six-pillar Growth Score report will also land in your inbox — and on
                WhatsApp — within 72 hours.
              </p>
              <p v-if="leadSaveWarning" class="as-form-banner">{{ leadSaveWarning }}</p>
              <div class="as-modal-success-actions">
                <a
                  class="as-btn as-btn-ghost"
                  :href="waBase + encodeURIComponent('Hi, I just submitted my details for a free Website Growth Score for ' + form.companyWebsite + '.')"
                  target="_blank"
                  rel="noopener"
                >Message us on WhatsApp too</a>
                <button class="as-btn as-btn-primary" type="button" @click="proceedToLiveCheck">See My Live Check</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
/* ==================================================
   Local design tokens — matches the amortree Tech
   dark/gold system used across Header/Footer/Pricing
   ================================================== */
.amor-score-page {
  --gold: var(--logo-yellow, #e4c535);
  --gold-soft: #e4c535;
  --leaf: #8fbf7f;
  --leaf-dim: #4f7457;
  --surface-0: #030304;
  --surface-1: #0b0b0d;
  --surface-2: #17171b;
  --surface-3: #1e1e23;
  --line: rgba(255, 255, 255, 0.08);
  --line-strong: rgba(255, 255, 255, 0.16);
  --ink: #f5f5f7;
  --ink-muted: #9a9aa6;
  --ink-faint: #6c6c76;
  --serif: var(--font-instrument, "Instrument Serif", serif);
  --heading-font: var(--font-primary, "Google Sans", sans-serif);
  --body-font: var(--font-secondary, "Google Sans Flex", sans-serif);
  --mono-font: ui-monospace, "SF Mono", "Roboto Mono", monospace;
  --ease: cubic-bezier(0.19, 1, 0.22, 1);

  background: var(--surface-0);
  color: var(--ink);
  font-family: var(--body-font);
  line-height: 1.6;
  /* NOTE: deliberately no overflow-x here. Setting overflow-x without
     overflow-y makes the browser implicitly treat this element as a
     scroll container, which changes what `position: sticky` sticks
     relative to and breaks the "What We Do" stacked cards below. The
     hero watermark this used to clip is already contained by
     .as-hero's own `overflow: hidden`, so nothing else relies on it. */
}

.amor-score-page :deep(h1),
.amor-score-page :deep(h2),
.amor-score-page :deep(h3),
.amor-score-page :deep(h4) {
  font-family: var(--heading-font);
  margin: 0;
}

.accent-italic {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 600;
  background: linear-gradient(100deg, var(--gold-soft), var(--gold) 70%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.as-wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 32px;
  position: relative;
  z-index: 1;
}
@media (max-width: 720px) {
  .as-wrap { padding: 0 20px; }
}

.as-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono-font);
  font-size: 12.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-soft);
  margin-bottom: 18px;

  &::before {
    content: "";
    width: 14px;
    height: 1px;
    background: var(--gold);
    display: inline-block;
  }
}

.as-h2 {
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.15;
  color: var(--ink);
}

.as-body-lg {
  margin-top: 16px;
  color: var(--ink-muted);
  font-size: 16.5px;
  line-height: 1.7;
}

.as-section-head {
  max-width: 640px;
  margin-bottom: 50px;
}

/* ==================================================
   Buttons
   ================================================== */
.as-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 26px;
  border-radius: 999px;
  font-size: 14.5px;
  font-weight: 600;
  border: 1px solid transparent;
  transition: transform 0.2s var(--ease), background 0.2s var(--ease), border-color 0.2s var(--ease), color 0.2s var(--ease);
  cursor: pointer;
}

.as-btn-primary {
  background: linear-gradient(100deg, var(--gold-soft), var(--gold));
  color: var(--surface-0);
}
.as-btn-primary:hover {
  transform: translateY(-2px);
  filter: brightness(1.06);
}

.as-btn-large {
  padding: 15px 30px;
  font-size: 15px;
}

.as-btn-ghost {
  border-color: var(--line-strong);
  color: var(--ink-muted);
  background: transparent;
}
.as-btn-ghost:hover {
  color: var(--ink);
  border-color: var(--gold);
}

/* ==================================================
   HERO
   ================================================== */
.as-hero {
  position: relative;
  overflow: hidden;
  padding: 88px 0 76px;
}

.as-aurora {
  position: absolute;
  inset: -10% -10% auto -10%;
  height: 560px;
  pointer-events: none;
  background:
    radial-gradient(480px 320px at 15% 15%, rgba(228, 197, 53, 0.14), transparent 70%),
    radial-gradient(420px 280px at 85% 5%, rgba(143, 191, 127, 0.08), transparent 70%);
  filter: blur(10px);
}

.as-hero-watermark {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--heading-font);
  font-weight: 700;
  font-size: min(46vw, 620px);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.05);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.as-hero-center {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.as-eyebrow-center {
  justify-content: center;
}

.as-hero-title {
  font-size: clamp(34px, 4.6vw, 58px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.12;
  color: var(--ink);
}

.as-hero-lede {
  margin-top: 22px;
  font-size: 18px;
  color: var(--ink-muted);
  max-width: 52ch;
  line-height: 1.7;
}

.as-hero-secondary-link {
  margin-top: 18px;

  a {
    font-size: 14px;
    color: var(--ink-faint);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s ease;
  }
  a:hover {
    color: var(--gold-soft);
  }
}

.as-trust-strip {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 0;
  font-family: var(--mono-font);
  font-size: 12px;
  color: var(--ink-faint);
  letter-spacing: 0.02em;

  span:not(:last-child)::after {
    content: "·";
    margin: 0 12px;
    color: var(--line-strong);
  }
}
.as-trust-strip-center {
  justify-content: center;
}

/* ─── URL capture form (hero + final CTA) ─────────────────────────── */
.as-url-form {
  margin-top: 34px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
}
.as-url-form-center {
  justify-content: center;
}

.as-url-icon {
  display: none;
}

.as-url-form input {
  flex: 1 1 260px;
  min-width: 0;
  max-width: 340px;
  padding: 13px 18px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: var(--surface-2);
  color: var(--ink);
  font-size: 14.5px;
  font-family: var(--body-font);
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
}
.as-url-form input::placeholder {
  color: var(--ink-faint);
}
.as-url-form input:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(228, 197, 53, 0.14);
}

.as-field-error {
  display: block;
  margin-top: 8px;
  font-size: 12.5px;
  color: #f0806f;
}
.as-field-error-center {
  text-align: center;
}

/* ─── Hero score card ─────────────────────────────────────────────── */
.as-hero-visual {
  position: relative;
  z-index: 1;
  margin-top: 56px;
}

.score-card {
  /* Local light-theme tokens — everything inside this card (idle, loading,
     error, and success states; gauge; pillar bars; opportunity callout)
     already reads colour via var(--surface-*), var(--ink*), and
     var(--gold-soft), so overriding them here re-themes the whole card
     without touching the surrounding dark hero. */
  --surface-1: #ffffff;
  --surface-2: #f8fafc;
  --surface-3: #eef1f6;
  --ink: #0f172a;
  --ink-muted: #475569;
  --ink-faint: #94a3b8;
  --line: #e2e8f0;
  --line-strong: #d6dee7;
  --gold-soft: #a9790a;

  position: relative;
  border: 1px solid var(--line);
  background: linear-gradient(180deg, var(--surface-1), var(--surface-2));
  border-radius: 26px;
  padding: 34px 38px;
  box-shadow: 0 30px 60px -30px rgba(15, 23, 42, 0.16), 0 1px 0 rgba(15, 23, 42, 0.03);
}

.score-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  gap: 12px;
  flex-wrap: wrap;
}

.domain-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface-3);
  border: 1px solid var(--line);
  padding: 7px 14px;
  border-radius: 999px;
  font-family: var(--mono-font);
  font-size: 12.5px;
  color: var(--ink-muted);

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--leaf);
  }
}

.live-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #4f7457;

  .live-dot {
    color: #4f7457;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--leaf);
    animation: as-live-pulse 1.6s ease-out infinite;

  }
}
.dot-live {
  background: var(--leaf);
}

@keyframes as-live-pulse {
  0% { box-shadow: 0 0 0 0 rgba(143, 191, 127, 0.45); }
  70% { box-shadow: 0 0 0 8px rgba(143, 191, 127, 0); }
  100% { box-shadow: 0 0 0 0 rgba(143, 191, 127, 0); }
}

/* ─── Live check states: idle / loading / error ───────────────────── */
.score-card.is-idle,
.score-card.is-loading,
.score-card.is-error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 340px;
  text-align: center;
}

.live-state {
  max-width: 380px;
  margin: 0 auto;
}

.live-state-icon {
  display: block;
  font-size: 40px;
  color: var(--gold-soft);
  margin-bottom: 14px;
}
.live-error .live-state-icon {
  color: #f0806f;
}

.live-idle h3,
.live-error h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 10px;
}
.live-idle p,
.live-error p {
  font-size: 14px;
  color: var(--ink-muted);
  line-height: 1.6;
}

.live-loading {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.live-loading-track {
  height: 6px;
  border-radius: 999px;
  background: var(--surface-3);
  overflow: hidden;
  margin-bottom: 22px;
}

.live-loading-bar {
  display: block;
  height: 100%;
  width: 40%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--gold-soft), var(--gold));
  animation: as-loading-slide 1.4s ease-in-out infinite;
}

@keyframes as-loading-slide {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(60%); }
  100% { transform: translateX(220%); }
}

.live-loading-domain {
  font-family: var(--mono-font);
  font-size: 13px;
  color: var(--gold-soft);
  margin-bottom: 8px;
  word-break: break-all;
}

.live-loading-copy {
  font-size: 13.5px;
  color: var(--ink-muted);
  line-height: 1.6;
}

.live-error-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 18px;
  flex-wrap: wrap;
}

/* ─── Live check success: detail grid + upsell ────────────────────── */
.live-detail-grid {
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px 20px;
}
@media (max-width: 760px) {
  .live-detail-grid { grid-template-columns: repeat(2, 1fr); }
}

.live-detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--ink-muted);

  .material-symbols-outlined {
    font-size: 16px;
  }
}
.is-pass { color: #4f7457; }
.is-fail { color: #f0806f; }

.live-detail-metric strong {
  color: var(--ink);
  font-family: var(--mono-font);
  margin-left: 4px;
}
.live-detail-metric.is-poor strong { color: #f0806f; }
.live-detail-metric.is-ok strong { color: #a16207; }

/* ─── "Fix this first" opportunity callout ────────────────────────
   Surfaces the single lowest-scoring pillar in plain language, so a
   decent-looking overall number can never quietly bury a real
   problem (e.g. a 16s LCP sitting under an 85/100 "Full Canopy"). */
.live-opportunity {
  margin-top: 24px;
  padding: 16px 18px;
  border-radius: 14px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  border: 1px solid;
}
.live-opportunity.is-poor {
  background: rgba(240, 128, 111, 0.12);
  border-color: rgba(240, 128, 111, 0.4);
}
.live-opportunity.is-ok {
  background: rgba(234, 179, 8, 0.14);
  border-color: rgba(234, 179, 8, 0.4);
}
.live-opportunity.is-good {
  background: rgba(143, 191, 127, 0.14);
  border-color: rgba(143, 191, 127, 0.4);
}
.live-opportunity-icon {
  flex: none;
  font-size: 18px;
  margin-top: 1px;
}
.live-opportunity.is-poor .live-opportunity-icon { color: #f0806f; }
.live-opportunity.is-ok .live-opportunity-icon { color: #a16207; }
.live-opportunity.is-good .live-opportunity-icon { color: var(--leaf); }

.live-opportunity-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink);
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}
.live-opportunity-score {
  font-family: var(--mono-font);
  font-size: 11.5px;
  color: var(--ink-faint);
  font-weight: 400;
}
.live-opportunity-body {
  margin-top: 4px;
  font-size: 13px;
  color: var(--ink-muted);
  line-height: 1.6;
}

.live-upsell {
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px dashed rgba(228, 197, 53, 0.3);
  text-align: center;
}
.live-upsell p {
  font-size: 13.5px;
  color: var(--ink-muted);
  line-height: 1.6;
  max-width: 46ch;
  margin: 0 auto 16px;
}
.live-upsell strong {
  color: var(--gold-soft);
  font-weight: 600;
}
.live-upsell .as-btn {
  margin: 0 auto;
}

.score-card-body {
  display: flex;
  align-items: center;
  gap: 48px;
}
@media (max-width: 760px) {
  .score-card-body {
    flex-direction: column;
    align-items: stretch;
    gap: 28px;
  }
}

.score-card-left {
  flex: none;
  width: 200px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
@media (max-width: 760px) {
  .score-card-left {
    width: auto;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid var(--line);
    padding-bottom: 28px;
  }
}

.score-eyebrow {
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.score-domain {
  margin-top: 6px;
  font-family: var(--mono-font);
  font-size: 13px;
  color: var(--ink-muted);
  word-break: break-all;
}

/* ─── Radial score gauge ───────────────────────────────────────────
   A conic-gradient ring reads instantly ("how full is the circle")
   in a way a bare number doesn't, and its colour — driven by the
   same good/ok/poor band as every other score on the card — is the
   first signal before anyone reads a digit. */
.score-gauge {
  --gauge-color: var(--leaf);
  position: relative;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-top: 18px;
  background: conic-gradient(var(--gauge-color) var(--gauge-pct), var(--surface-3) 0);
  transition: background 0.3s ease;
}
@media (max-width: 760px) {
  .score-gauge { margin: 18px auto 0; }
}

.score-gauge.is-good { --gauge-color: var(--leaf); }
.score-gauge.is-ok { --gauge-color: #eab308; }
.score-gauge.is-poor { --gauge-color: #f0806f; }

.score-gauge-hole {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  background: var(--surface-1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score-num {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: 34px;
  line-height: 1;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

.score-of {
  font-family: var(--mono-font);
  color: var(--ink-faint);
  font-size: 11px;
  margin-top: 2px;
}

.score-tier-row {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
@media (max-width: 760px) {
  .score-tier-row { justify-content: center; }
}

.score-tier {
  font-family: var(--mono-font);
  font-size: 12.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.score-tier.is-good { color: #4f7457; }
.score-tier.is-ok { color: #a16207; }
.score-tier.is-poor { color: #dc2626; }

.score-tier-caution {
  display: inline-flex;
  color: #d97706;

  .material-symbols-outlined {
    font-size: 16px;
  }
}

.score-pillars {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.score-pillar-row {
  display: grid;
  grid-template-columns: 1fr 90px 30px;
  align-items: center;
  gap: 10px;
}

.pillar-label {
  font-size: 12.5px;
  color: var(--ink-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pillar-bar {
  height: 5px;
  border-radius: 999px;
  background: var(--surface-3);
  overflow: hidden;
}

/* Bars are coloured per their own score, not a single flat gradient —
   a 56 and a 100 should never look like the same colour of "done". */
.pillar-bar-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
}
.pillar-bar-fill.is-good { background: linear-gradient(90deg, var(--leaf-dim), var(--leaf)); }
.pillar-bar-fill.is-ok { background: linear-gradient(90deg, #a16207, #eab308); }
.pillar-bar-fill.is-poor { background: linear-gradient(90deg, #b3382b, #f0806f); }

.pillar-value {
  font-family: var(--mono-font);
  font-size: 12px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.pillar-value.is-good { color: #4f7457; }
.pillar-value.is-ok { color: #a16207; }
.pillar-value.is-poor { color: #f0806f; }

/* ==================================================
   Generic section
   ================================================== */
.as-section {
  padding: 96px 0;
  position: relative;
}
.as-section-soft {
  background: var(--surface-1);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
/* Light section — mirrors PricingView.vue's alternating light FAQ band.
   Overriding the tokens here is enough: every rule in this file reads
   colors via var(--ink)/var(--ink-muted)/var(--line)/etc., so the whole
   section (headings, body copy, dividers, the FAQ accordion) flips to a
   light theme without needing section-specific color rules. */
.as-section-light {
  /* --surface-0 is intentionally NOT overridden here — it doubles as the
     dark "text on gold accent" color (buttons, active states, etc.)
     throughout this file, not just a background. Redefining it would
     make gold buttons render with invisible white-on-gold text. */
  --surface-1: #f8fafc;
  --surface-2: #f1f5f9;
  --surface-3: #e9edf2;
  --ink: #0f172a;
  --ink-muted: #475569;
  --ink-faint: #94a3b8;
  --line: #e2e8f0;
  --line-strong: #cbd5e1;
  --gold-soft: #a9790a;
}
/* Explicit white only for full sections — .as-stat-band carries the same
   token overrides above but keeps its own var(--surface-1) background
   (now a soft off-white) so it reads as a distinct band, not a seam. */
.as-section.as-section-light {
  background: #ffffff;
}
@media (max-width: 760px) {
  .as-section { padding: 64px 0; }
}

/* ─── Problem / grove ──────────────────────────────────────────────── */
.as-problem-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}
@media (max-width: 860px) {
  .as-problem-grid { grid-template-columns: 1fr; gap: 36px; }
}

.grove {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 140px;
  margin-top: 10px;
}

.grove-stalk {
  flex: 1;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 4px 4px 0 0;
  position: relative;

  &.is-lit {
    background: var(--leaf-dim);
    border-color: var(--leaf);

    &::after {
      content: "";
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--gold);
      box-shadow: 0 0 14px 2px rgba(228, 197, 53, 0.35);
    }
  }
}

.as-stat-caption {
  margin-top: 16px;
  font-size: 14.5px;
  color: var(--ink-muted);

  strong {
    color: var(--gold-soft);
    font-family: var(--mono-font);
  }
}

/* ─── Stat band ────────────────────────────────────────────────────── */
.as-stat-band {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--surface-1);
}
.as-stat-band-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 760px) {
  .as-stat-band-grid { grid-template-columns: 1fr; }
}

.as-stat-cell {
  padding: 56px 34px;
  border-right: 1px solid var(--line);
}
.as-stat-cell:last-child { border-right: none; }
@media (max-width: 760px) {
  .as-stat-cell { border-right: none; border-bottom: 1px solid var(--line); padding: 38px 4px; }
}

.as-stat-big {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: 52px;
  color: var(--gold-soft);
}

.as-stat-cell p {
  margin-top: 12px;
  color: var(--ink-muted);
  font-size: 15px;
  max-width: 32ch;
}

.as-stat-src {
  margin-top: 14px;
  font-family: var(--mono-font);
  font-size: 11px;
  color: var(--ink-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* ─── What We Do — stacked service cards ──────────────────────────── */
.as-services-section {
  overflow: visible;
}

.stack-wrap {
  position: relative;
}

.stack-card {
  position: sticky;
  top: 126px; /* matches the fixed nav height; also referenced as STICKY_TOP in <script setup> */
  perspective: 1000px;
  margin-bottom: 32px;
}
.stack-card:last-child {
  margin-bottom: 0;
}
/* Later cards need to render above earlier ones so the stacking reads
   correctly as you scroll past each sticky point. */
.stack-card:nth-child(1) { z-index: 1; }
.stack-card:nth-child(2) { z-index: 2; }
.stack-card:nth-child(3) { z-index: 3; }
.stack-card:nth-child(4) { z-index: 4; }
.stack-card:nth-child(5) { z-index: 5; }
.stack-card:nth-child(6) { z-index: 6; }

.stack-card-inner {
  background: var(--surface-2);
  border: 1px solid var(--line-strong);
  border-radius: 26px;
  padding: 44px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 70px -30px rgba(0, 0, 0, 0.18);
  transform-origin: center top;
  will-change: transform, opacity;
}
@media (max-width: 640px) {
  .stack-card-inner { padding: 30px 24px; }
}

.stack-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.stack-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(140deg, rgba(228, 197, 53, 0.16), rgba(143, 191, 127, 0.1));
  border: 1px solid rgba(228, 197, 53, 0.25);
  color: var(--gold-soft);

  .material-symbols-outlined {
    font-size: 24px;
  }
}

.stack-index {
  font-family: var(--mono-font);
  font-size: 12.5px;
  letter-spacing: 0.06em;
  color: var(--ink-faint);
}

.stack-card-inner h3 {
  font-size: 25px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 12px;
}
.stack-card-inner p {
  font-size: 15.5px;
  color: var(--ink-muted);
  line-height: 1.7;
  max-width: 62ch;
}

.stack-checks {
  list-style: none;
  padding: 0;
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 24px;
}
@media (max-width: 600px) {
  .stack-checks { grid-template-columns: 1fr; }
}
.stack-checks li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: var(--ink-muted);

  .material-symbols-outlined {
    font-size: 16px;
    color: var(--gold-soft);
    margin-top: 1px;
  }
}

.stack-meta {
  margin-top: auto;
  padding-top: 22px;
  display: inline-block;
  font-family: var(--mono-font);
  font-size: 12px;
  color: var(--gold-soft);
  border-top: 1px dashed var(--line-strong);
  width: fit-content;
}

/* ─── Score rings ──────────────────────────────────────────────────── */
.as-rings-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 900px) { .as-rings-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .as-rings-grid { grid-template-columns: 1fr; } }

.ring-card {
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 26px;
  transition: border-color 0.25s var(--ease), transform 0.25s var(--ease);
}
.ring-card:hover {
  border-color: rgba(228, 197, 53, 0.35);
  transform: translateY(-3px);
}

.ring-pct {
  font-family: var(--mono-font);
  color: var(--gold-soft);
  font-size: 13px;
  letter-spacing: 0.04em;
}
.ring-card h4 {
  font-size: 17.5px;
  font-weight: 600;
  margin-top: 10px;
  color: var(--ink);
}
.ring-card p {
  margin-top: 10px;
  font-size: 14px;
  color: var(--ink-muted);
  line-height: 1.65;
}

.as-stages-strip {
  margin-top: 64px;
  border: 1px solid var(--line);
  border-radius: 22px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 760px) {
  .as-stages-strip { grid-template-columns: 1fr; }
}

.as-stage-block {
  padding: 28px 26px;
  border-right: 1px solid var(--line);
  background: var(--surface-2);
}
.as-stage-block:last-child {
  border-right: none;
  background: linear-gradient(180deg, rgba(228, 197, 53, 0.1), transparent);
}
@media (max-width: 760px) {
  .as-stage-block { border-right: none; border-bottom: 1px solid var(--line); }
}
.as-stage-range {
  font-family: var(--mono-font);
  font-size: 12px;
  color: var(--ink-faint);
}
.as-stage-block h4 {
  font-size: 18px;
  font-weight: 600;
  margin-top: 8px;
  color: var(--ink);
}
.as-stage-block p {
  margin-top: 10px;
  font-size: 13.5px;
  color: var(--ink-muted);
  line-height: 1.6;
}

/* ─── Case study ───────────────────────────────────────────────────── */
.as-case-card {
  border: 1px solid var(--line);
  border-radius: 22px;
  background: linear-gradient(160deg, var(--surface-2), var(--surface-1));
  padding: 48px;
}
@media (max-width: 640px) { .as-case-card { padding: 30px 22px; } }

.as-case-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--line);
}
.as-case-client {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: 28px;
  color: var(--ink);
}
.as-case-meta {
  font-family: var(--mono-font);
  font-size: 12.5px;
  color: var(--ink-faint);
  margin-top: 6px;
}
.as-case-metrics {
  display: flex;
  gap: 56px;
  flex-wrap: wrap;
}
.as-case-metric-num {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: 36px;
  background: linear-gradient(100deg, var(--gold-soft), var(--gold));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.as-case-metric-label {
  font-size: 13px;
  color: var(--ink-muted);
  margin-top: 4px;
  max-width: 22ch;
}

.as-case-body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 34px;
}
@media (max-width: 820px) { .as-case-body { grid-template-columns: 1fr; } }

.as-case-block h5 {
  font-family: var(--mono-font);
  font-size: 12px;
  color: var(--leaf);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.as-case-block p {
  font-size: 14.5px;
  color: var(--ink-muted);
  line-height: 1.7;
}

/* ─── Industries ───────────────────────────────────────────────────── */
.as-industry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 920px) { .as-industry-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .as-industry-grid { grid-template-columns: 1fr; } }

.industry-card {
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface-2);
  transition: border-color 0.25s var(--ease), transform 0.25s var(--ease);
}
.industry-card:hover {
  border-color: rgba(228, 197, 53, 0.3);
  transform: translateY(-3px);
}
.industry-icon {
  color: var(--gold-soft);
  font-size: 26px;
}
.industry-card h4 {
  font-size: 17px;
  font-weight: 600;
  margin-top: 12px;
  color: var(--ink);
}
.industry-card p {
  margin-top: 10px;
  font-size: 14px;
  color: var(--ink-muted);
  line-height: 1.65;
}

.as-tag-row {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.as-tag {
  font-family: var(--mono-font);
  font-size: 11px;
  color: var(--ink-faint);
  border: 1px solid var(--line);
  padding: 4px 9px;
  border-radius: 999px;
}

/* ─── FAQ ──────────────────────────────────────────────────────────── */
.as-faq-wrap {
  max-width: 840px;
}
.as-faq-item {
  border-top: 1px solid var(--line);
}
.as-faq-item:last-child {
  border-bottom: 1px solid var(--line);
}
.as-faq-q {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: var(--ink);
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  font-size: 16.5px;
  font-family: var(--body-font);
  font-weight: 500;
}
.as-faq-plus {
  flex: none;
  width: 22px;
  height: 22px;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: var(--leaf);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::before { width: 14px; height: 1.5px; }
  &::after { width: 1.5px; height: 14px; transition: transform 0.25s var(--ease); }
}
.as-faq-item.is-open .as-faq-plus::after {
  transform: translate(-50%, -50%) rotate(90deg);
}
.as-faq-a p {
  padding: 0 0 26px;
  color: var(--ink-muted);
  font-size: 14.5px;
  max-width: 74ch;
  line-height: 1.75;
}

/* ─── Final CTA ────────────────────────────────────────────────────── */
.as-final-cta {
  padding: 96px 0;
  background: linear-gradient(180deg, var(--surface-1), var(--surface-0));
  border-top: 1px solid var(--line);
  text-align: center;
}
.as-final-lede {
  margin: 18px auto 0;
  max-width: 52ch;
}
.as-final-stats {
  margin-top: 64px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line);
}
@media (max-width: 700px) { .as-final-stats { grid-template-columns: 1fr; } }
.as-final-cell {
  padding: 34px 20px;
  border-right: 1px solid var(--line);
}
.as-final-cell:last-child { border-right: none; }
@media (max-width: 700px) {
  .as-final-cell { border-right: none; border-bottom: 1px solid var(--line); }
}
.as-final-num {
  font-family: var(--mono-font);
  font-size: 30px;
  color: var(--gold-soft);
}
.as-final-cell p {
  font-size: 13.5px;
  margin-top: 8px;
  max-width: 30ch;
  margin-left: auto;
  margin-right: auto;
  color: var(--ink-muted);
}

/* ==================================================
   AUDIT REQUEST MODAL
   ================================================== */
.as-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(3, 3, 4, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.as-modal-fade-enter-active,
.as-modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.as-modal-fade-enter-from,
.as-modal-fade-leave-to {
  opacity: 0;
}
.as-modal-fade-enter-active .as-modal,
.as-modal-fade-leave-active .as-modal {
  transition: transform 0.28s var(--ease), opacity 0.28s var(--ease);
}
.as-modal-fade-enter-from .as-modal,
.as-modal-fade-leave-to .as-modal {
  transform: translateY(16px) scale(0.98);
  opacity: 0;
}

.as-modal {
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  background: linear-gradient(180deg, var(--surface-2), var(--surface-1));
  border: 1px solid var(--line-strong);
  border-radius: 22px;
  padding: 32px 32px 28px;
  box-shadow: 0 50px 100px -30px rgba(0, 0, 0, 0.7);
}
@media (max-width: 560px) {
  .as-modal { padding: 26px 20px 22px; border-radius: 18px; }
}

.as-modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  background: transparent;
  color: var(--ink-muted);
  cursor: pointer;
  transition: 0.2s var(--ease);
}
.as-modal-close:hover {
  color: var(--surface-0);
  background: var(--gold);
  border-color: var(--gold);
}

.as-modal-title {
  text-align: center;
  font-size: clamp(20px, 2.6vw, 24px);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.25;
  color: var(--ink);
  margin: 0 auto 6px;
  max-width: 26ch;
}

.as-modal-sub {
  text-align: center;
  font-size: 13.5px;
  color: var(--ink-muted);
  line-height: 1.5;
  max-width: 40ch;
  margin: 0 auto 20px;
}

.as-modal-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 14px;
}
@media (max-width: 480px) {
  .as-modal-form { grid-template-columns: 1fr; }
}

.as-field-span2 {
  grid-column: 1 / -1;
}

.as-hp-field {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.as-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;

  span:first-child {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
}

.as-field input,
.as-field select {
  width: 100%;
  max-height: 44px;
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid var(--line-strong);
  background: var(--surface-3);
  color: var(--ink);
  font-size: 14px;
  font-family: var(--body-font);
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
  appearance: none;
}
.as-field select {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239a9aa6' stroke-width='2'%3e%3cpath d='M6 9l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 16px;
  padding-right: 40px;
}
.as-field select option {
  background: var(--surface-2);
  color: var(--ink);
}
.as-field input::placeholder {
  color: var(--ink-faint);
}
.as-field input:focus,
.as-field select:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(228, 197, 53, 0.14);
}

.as-form-banner {
  font-size: 13px;
  color: #f0806f;
  line-height: 1.6;
  text-align: center;

  a {
    color: var(--gold-soft);
    text-decoration: underline;
  }
}

.as-modal-submit {
  width: 100%;
  justify-content: center;
  margin-top: 6px;
}
.as-modal-submit:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

.as-spinner-row {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.as-spinner {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid rgba(3, 3, 4, 0.3);
  border-top-color: var(--surface-0);
  animation: as-spin 0.7s linear infinite;
}

@keyframes as-spin {
  to { transform: rotate(360deg); }
}

.as-modal-success {
  text-align: center;
}

.as-success-icon {
  font-size: 44px;
  color: var(--leaf);
  margin-bottom: 12px;
}

.as-modal-success-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}
.as-modal-success-actions .as-btn {
  width: 100%;
  justify-content: center;
}

@media (prefers-reduced-motion: reduce) {
  .amor-score-page * {
    transition: none !important;
  }
}
</style>