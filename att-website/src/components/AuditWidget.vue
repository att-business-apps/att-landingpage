<script setup>
import { ref, computed, reactive } from "vue";

// ─── State ──────────────────────────────────────────────────────────
const url        = ref("");
const phase      = ref("idle");   // idle | contact | loading | result | error
const scores     = ref(null);
const errorMsg   = ref("");
const inputRef   = ref(null);
const pendingTarget = ref(""); // normalised URL, captured at the idle step and carried through contact → loading

// ─── Contact capture (name + phone, before running the audit) ───────
// Same Apps Script deployment as AiScoreView.vue's lead form, routed to
// a separate "Widget Leads" tab via formType. See Code.gs for setup.
const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbywOPzc6Pn-7YQ4fbChfmJ39d32s4L8mCSYJ3eUAONsV8cjWIMelRhFrh5HRS5Rv5Nb/exec";

const contact = reactive({
  name: "",
  phone: "",
  _hp: "", // honeypot — must stay empty; bots tend to fill every field
});
const contactErrors = ref({});
const contactSubmitting = ref(false);
const leadSaveWarning = ref(""); // soft, non-blocking note if the Sheet write couldn't be confirmed
const nameRef = ref(null);

function validateContact() {
  const errors = {};
  if (!contact.name.trim()) errors.name = "Please enter your name.";
  if (contact.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a valid phone number.";
  contactErrors.value = errors;
  return Object.keys(errors).length === 0;
}

async function submitContact() {
  if (contact._hp) {
    // Honeypot tripped — silently proceed without writing anything.
    await runAudit();
    return;
  }
  if (!validateContact()) return;

  contactSubmitting.value = true;
  leadSaveWarning.value = "";

  const payload = {
    formType: "widget",
    timestamp: new Date().toISOString(),
    name: contact.name.trim(),
    phone: contact.phone.trim(),
    website: pendingTarget.value,
    source: "Home Audit Widget",
  };

  // Saving the lead is best-effort and must never block the audit —
  // that's what the visitor is actually here for. If the Sheet write
  // fails, log it clearly and surface a soft, non-blocking note instead
  // of a hard error screen.
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
    console.error("Widget lead submission failed:", err);
    leadSaveWarning.value = "Couldn't confirm your details were saved, but your audit is still running.";
  }

  contactSubmitting.value = false;
  await runAudit();
}

// ─── PageSpeed Insights API ─────────────────────────────────────────
// Called directly with a hardcoded key (not read from .env).
// 👈 paste your PageSpeed Insights API key here
const PSI_KEY = "AIzaSyBcAN9sn1W_t1R-kuM00BT-IbCywvIdMjA";
const PSI = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

const CATEGORIES = [
  { key: "performance",    label: "Performance",   icon: "speed"         },
  { key: "seo",            label: "SEO",           icon: "manage_search" },
  { key: "accessibility",  label: "Accessibility", icon: "accessibility" },
  { key: "best-practices", label: "Best Practices",icon: "verified"      },
];

// Derive an organic lead-gen score from PSI data
function deriveLeadGen(data) {
  const cats = data?.lighthouseResult?.categories ?? {};
  const perf = (cats["performance"]?.score ?? 0)    * 100;
  const seo  = (cats["seo"]?.score ?? 0)            * 100;
  // Weighted average biased toward things that directly lose leads
  return Math.round(perf * 0.45 + seo * 0.55);
}

function label(score) {
  if (score >= 90) return { text: "Excellent", cls: "score--great" };
  if (score >= 70) return { text: "Good",      cls: "score--good"  };
  if (score >= 50) return { text: "Needs work", cls: "score--warn" };
  return               { text: "Critical",    cls: "score--bad"   };
}

function overallLabel(avg) {
  if (avg >= 80) return { text: "Your site is in good shape.", sub: "A few targeted improvements could push it further." };
  if (avg >= 60) return { text: "Your site is leaving leads on the table.", sub: "Some key areas need attention before they cost you more." };
  return               { text: "Your site needs urgent attention.", sub: "These issues are actively costing you organic leads right now." };
}

// ─── Validate & normalise URL ───────────────────────────────────────
function normalise(raw) {
  let u = raw.trim();
  if (!u) return null;
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  try { return new URL(u).href; }
  catch { return null; }
}

// ─── Start flow: validate URL, then collect name + phone ────────────
function startAudit() {
  const target = normalise(url.value);
  if (!target) {
    errorMsg.value = "Please enter a valid website URL.";
    phase.value = "error";
    return;
  }
  pendingTarget.value = target;
  errorMsg.value = "";
  contactErrors.value = {};
  phase.value = "contact";
  setTimeout(() => nameRef.value?.focus(), 100);
}

function backToIdle() {
  phase.value = "idle";
}

// ─── Run audit ──────────────────────────────────────────────────────
async function runAudit() {
  const target = pendingTarget.value;
  if (!target) {
    errorMsg.value = "Please enter a valid website URL.";
    phase.value = "error";
    return;
  }

  phase.value  = "loading";
  errorMsg.value = "";

  const cats   = CATEGORIES.map(c => `category=${c.key}`).join("&");
  const apiUrl = `${PSI}?url=${encodeURIComponent(target)}&strategy=mobile&${cats}${PSI_KEY ? "&key=" + PSI_KEY : ""}`;

  // Retry with backoff on 429 (rate limit) — PSI briefly rate-limits bursts,
  // a short retry usually clears it without bothering the user.
  const MAX_ATTEMPTS = 3;
  let lastErr = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(apiUrl);

      if (!res.ok) {
        let detail = "";
        try { detail = (await res.json())?.error?.message ?? ""; } catch { /* ignore */ }

        if (res.status === 429 && attempt < MAX_ATTEMPTS) {
          await new Promise(r => setTimeout(r, attempt * 1500)); // 1.5s, 3s backoff
          continue;
        }
        throw new Error(`API error ${res.status}${detail ? `: ${detail}` : ""}`);
      }

      const data  = await res.json();
      const cats2 = data?.lighthouseResult?.categories ?? {};
      const result = {};

      CATEGORIES.forEach(c => {
        result[c.key] = Math.round((cats2[c.key]?.score ?? 0) * 100);
      });
      result["lead-gen"] = deriveLeadGen(data);

      scores.value = result;
      phase.value  = "result";
      return;
    } catch (e) {
      lastErr = e;
      // Network-level failures (CORS, offline, DNS) won't succeed on retry — bail immediately.
      if (!(e instanceof Error) || !/^API error 429/.test(e.message)) break;
    }
  }

  errorMsg.value = friendlyError(lastErr);
  phase.value = "error";
}

// Turn a raw fetch/API error into something the visitor can act on.
function friendlyError(e) {
  const msg = e?.message ?? "";
  if (/429/.test(msg)) {
    return "We're getting a lot of audit requests right now. Please try again in a minute.";
  }
  if (/\b40[0-3]\b/.test(msg)) {
    return "That URL couldn't be scanned. Double-check it's spelled correctly and publicly reachable.";
  }
  if (/Failed to fetch|NetworkError|Load failed/i.test(msg)) {
    return "Couldn't reach the audit service. Check your connection and try again.";
  }
  return "Couldn't complete the audit. Please try again in a moment.";
}

// ─── Computed helpers ───────────────────────────────────────────────
const overall = computed(() => {
  if (!scores.value) return 0;
  const vals = Object.values(scores.value);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
});

const overallInfo = computed(() => overallLabel(overall.value));

const allScores = computed(() => {
  if (!scores.value) return [];
  return [
    ...CATEGORIES.map(c => ({
      key:   c.key,
      label: c.label,
      icon:  c.icon,
      score: scores.value[c.key] ?? 0,
    })),
    { key: "lead-gen", label: "Lead Generation", icon: "hub", score: scores.value["lead-gen"] ?? 0 },
  ];
});

const whatsappLink = computed(() => {
  const u  = normalise(url.value) ?? url.value;
  const sc = overall.value;
  const msg = encodeURIComponent(
    `Hi Amortree Team, I just checked my website (${u}) and got a score of ${sc}/100 on your audit widget. I'd love a free strategy call to fix it!`
  );
  return `https://wa.me/917975859061?text=${msg}`;
});

function reset() {
  phase.value = "idle";
  scores.value = null;
  url.value = "";
  pendingTarget.value = "";
  contact.name = "";
  contact.phone = "";
  contact._hp = "";
  contactErrors.value = {};
  leadSaveWarning.value = "";
  setTimeout(() => inputRef.value?.focus(), 100);
}
</script>

<template>
  <div class="aw-card">

    <!-- ── IDLE ─────────────────────────────────────────────────── -->
    <template v-if="phase === 'idle' || phase === 'error'">
      <div class="aw-header">
        <div class="aw-badge">
          <span class="material-symbols-outlined">radar</span>
          Free Instant Audit
        </div>
        <h3 class="aw-title">How many leads is your website losing?</h3>
        <p class="aw-sub">Enter your URL — we'll score it on Performance, SEO, Accessibility, and Lead Generation potential in seconds.</p>
      </div>

      <div class="aw-form">
        <div class="aw-input-wrap">
          <span class="material-symbols-outlined aw-input-icon">language</span>
          <input
            ref="inputRef"
            v-model="url"
            type="url"
            placeholder="Your website URL"
            class="aw-input"
            @keyup.enter="startAudit"
            autocomplete="url"
            spellcheck="false"
          />
        </div>
        <button class="aw-btn" @click="startAudit">
          Analyse My Site
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      <p v-if="phase === 'error'" class="aw-error">
        <span class="material-symbols-outlined">error</span>
        {{ errorMsg }}
      </p>

      <div class="aw-trust-row">
        <span><span class="material-symbols-outlined">lock</span>Powered by Google PageSpeed Insights</span>
        <span><span class="material-symbols-outlined">bolt</span>Results in ~10 seconds</span>
        <span><span class="material-symbols-outlined">visibility_off</span>No sign-up needed</span>
      </div>
    </template>

    <!-- ── CONTACT (name + phone, before running the audit) ────────── -->
    <template v-else-if="phase === 'contact'">
      <div class="aw-header">
        <div class="aw-badge">
          <span class="material-symbols-outlined">radar</span>
          Free Instant Audit
        </div>
        <h3 class="aw-title">Where should we send your score?</h3>
        <p class="aw-sub">Quick details so we can follow up if your site needs work — then we'll scan <strong>{{ pendingTarget.replace(/^https?:\/\//i, '') }}</strong> right away.</p>
      </div>

      <div class="aw-form">
        <div class="aw-input-wrap">
          <span class="material-symbols-outlined aw-input-icon">person</span>
          <input
            ref="nameRef"
            v-model="contact.name"
            type="text"
            placeholder="Your name"
            class="aw-input"
            autocomplete="name"
            @keyup.enter="submitContact"
          />
        </div>
        <p v-if="contactErrors.name" class="aw-error">
          <span class="material-symbols-outlined">error</span>{{ contactErrors.name }}
        </p>

        <div class="aw-input-wrap">
          <span class="material-symbols-outlined aw-input-icon">call</span>
          <input
            v-model="contact.phone"
            type="tel"
            placeholder="Phone number"
            class="aw-input"
            autocomplete="tel"
            @keyup.enter="submitContact"
          />
        </div>
        <p v-if="contactErrors.phone" class="aw-error">
          <span class="material-symbols-outlined">error</span>{{ contactErrors.phone }}
        </p>

        <!-- Honeypot — hidden from real visitors, catches basic bots -->
        <input v-model="contact._hp" type="text" class="aw-hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />

        <button class="aw-btn" :disabled="contactSubmitting" @click="submitContact">
            {{ contactSubmitting ? "Starting scan…" : "Run My Audit" }}
            <span v-if="!contactSubmitting" class="material-symbols-outlined">arrow_forward</span>
            <span v-else class="aw-btn-spinner"></span>
        </button>

        <button class="aw-cta-ghost" type="button" @click="backToIdle">
          <span class="material-symbols-outlined">arrow_back</span>
          Back
        </button>
      </div>

      <p v-if="leadSaveWarning" class="aw-error">
        <span class="material-symbols-outlined">error</span>
        {{ leadSaveWarning }}
      </p>
    </template>

    <!-- ── LOADING ───────────────────────────────────────────────── -->
    <template v-else-if="phase === 'loading'">
      <div class="aw-loading">
        <div class="aw-spinner">
          <div class="aw-spinner-ring"></div>
          <span class="material-symbols-outlined aw-spinner-icon">radar</span>
        </div>
        <p class="aw-loading-title">Scanning your site…</p>
        <div class="aw-scan-steps">
          <div class="aw-scan-step">
            <span class="material-symbols-outlined">speed</span> Checking performance
          </div>
          <div class="aw-scan-step">
            <span class="material-symbols-outlined">manage_search</span> Analysing SEO signals
          </div>
          <div class="aw-scan-step">
            <span class="material-symbols-outlined">hub</span> Scoring lead-gen potential
          </div>
        </div>
      </div>
    </template>

    <!-- ── RESULT ────────────────────────────────────────────────── -->
    <template v-else-if="phase === 'result'">
      <!-- Overall -->
      <div class="aw-overall">
        <div class="aw-overall-ring" :class="label(overall).cls">
          <svg viewBox="0 0 100 100" class="aw-ring-svg">
            <circle cx="50" cy="50" r="42" class="aw-ring-bg"/>
            <circle
              cx="50" cy="50" r="42"
              class="aw-ring-fill"
              :stroke-dasharray="`${(overall / 100) * 264} 264`"
              :class="label(overall).cls"
            />
          </svg>
          <div class="aw-ring-inner">
            <span class="aw-ring-num">{{ overall }}</span>
            <span class="aw-ring-denom">/100</span>
          </div>
        </div>
        <div class="aw-overall-copy">
          <div class="aw-result-url">{{ url }}</div>
          <div class="aw-result-verdict" :class="label(overall).cls">{{ label(overall).text }}</div>
          <p class="aw-result-sub">{{ overallInfo.text }}</p>
          <p class="aw-result-hint">{{ overallInfo.sub }}</p>
        </div>
      </div>

      <!-- Score bars -->
      <div class="aw-scores">
        <div v-for="s in allScores" :key="s.key" class="aw-score-row">
          <span class="material-symbols-outlined aw-score-icon">{{ s.icon }}</span>
          <span class="aw-score-label">{{ s.label }}</span>
          <div class="aw-bar-wrap">
            <div class="aw-bar" :class="label(s.score).cls" :style="{ width: s.score + '%' }"></div>
          </div>
          <span class="aw-score-num" :class="label(s.score).cls">{{ s.score }}</span>
          <span class="aw-score-tag" :class="label(s.score).cls">{{ label(s.score).text }}</span>
        </div>
      </div>

      <!-- CTA -->
      <div class="aw-result-cta">
        <a :href="whatsappLink" target="_blank" rel="noopener" class="aw-cta-primary">
          <span class="material-symbols-outlined">chat</span>
          Book Free Strategy Call
        </a>
        <button class="aw-cta-ghost" @click="reset">
          <span class="material-symbols-outlined">refresh</span>
          Check another site
        </button>
      </div>

      <p class="aw-result-note">
        Scored on mobile via Google PageSpeed Insights. Results typically represent real-world visitor experience.
      </p>
    </template>

  </div>
</template>

<style scoped>
/* ─── Card shell ───────────────────────────────────────────────── */
.aw-card {
  background: rgba(8, 9, 12, 0.78);
  border: 1px solid rgba(250, 204, 21, 0.18);
  border-radius: 24px;
  padding: 2rem 1.75rem;
  backdrop-filter: blur(24px);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04) inset,
    0 32px 80px rgba(0,0,0,0.45),
    0 0 60px rgba(250,204,21,0.04);
  position: relative;
  overflow: hidden;
  max-width: 480px;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% -20%, rgba(250,204,21,0.07), transparent 65%);
    pointer-events: none;
  }
}

/* ─── Header ───────────────────────────────────────────────────── */
.aw-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(250,204,21,0.1);
  border: 1px solid rgba(250,204,21,0.25);
  color: #facc15;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;

  .material-symbols-outlined { font-size: 0.95rem; }
}

.aw-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 0.6rem;
}

.aw-sub {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.65;
  margin-bottom: 1.5rem;
}

/* ─── Input ────────────────────────────────────────────────────── */
.aw-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.aw-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.aw-input-icon {
  position: absolute;
  left: 0.9rem;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.4);
  pointer-events: none;
}

.aw-input {
  width: 100%;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 0.9rem 1rem 0.9rem 2.7rem;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.25s, background 0.25s;

  &::placeholder { color: rgba(255,255,255,0.3); }

  &:focus {
    border-color: rgba(250,204,21,0.45);
    background: rgba(255,255,255,0.09);
  }
}

.aw-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.5rem;
  border-radius: 12px;
  background: #facc15;
  color: #0f172a;
  font-size: 0.9rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(250,204,21,0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .material-symbols-outlined { font-size: 1.1rem; }
}

.aw-btn-spinner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(15, 23, 42, 0.3);
  border-top-color: #0f172a;
  animation: spin 0.7s linear infinite;
}

.aw-hp-field {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.aw-error {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: #f87171;
  margin-bottom: 0.75rem;

  .material-symbols-outlined { font-size: 1rem; }
}

/* ─── Trust row ─────────────────────────────────────────────────── */
.aw-trust-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255,255,255,0.07);

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.72rem;
    color: rgba(255,255,255,0.38);
    font-weight: 500;

    .material-symbols-outlined { font-size: 0.9rem; }
  }
}

/* ─── Loading ───────────────────────────────────────────────────── */
.aw-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  gap: 1.5rem;
}

.aw-spinner {
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.aw-spinner-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.08);
  border-top-color: #facc15;
  animation: spin 1s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.aw-spinner-icon {
  font-size: 1.6rem;
  color: #facc15;
}

.aw-loading-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.aw-scan-steps {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
}

.aw-scan-step {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.5);
  animation: step-pulse 1.5s ease infinite;

  &:nth-child(2) { animation-delay: 0.4s; }
  &:nth-child(3) { animation-delay: 0.8s; }

  .material-symbols-outlined { font-size: 1rem; color: #facc15; }
}

@keyframes step-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* ─── Result — overall ring ─────────────────────────────────────── */
.aw-overall {
  display: flex;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.aw-overall-ring {
  position: relative;
  flex-shrink: 0;
  width: 90px;
  height: 90px;
}

.aw-ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.aw-ring-bg {
  fill: none;
  stroke: rgba(255,255,255,0.07);
  stroke-width: 8;
}

.aw-ring-fill {
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dasharray 1s ease;

  &.score--great { stroke: #22c55e; }
  &.score--good  { stroke: #facc15; }
  &.score--warn  { stroke: #f97316; }
  &.score--bad   { stroke: #ef4444; }
}

.aw-ring-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.aw-ring-num {
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
}

.aw-ring-denom {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.45);
}

.aw-result-url {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.25rem;
  word-break: break-all;
}

.aw-result-verdict {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;

  &.score--great { color: #22c55e; }
  &.score--good  { color: #facc15; }
  &.score--warn  { color: #f97316; }
  &.score--bad   { color: #ef4444; }
}

.aw-result-sub {
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.4;
  margin-bottom: 0.25rem;
}

.aw-result-hint {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.5;
  margin: 0;
}

/* ─── Score bars ────────────────────────────────────────────────── */
.aw-scores {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
}

.aw-score-row {
  display: grid;
  grid-template-columns: 18px 110px 1fr 30px 72px;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 400px) {
    grid-template-columns: 18px 80px 1fr 28px 60px;
  }
}

.aw-score-icon {
  font-size: 1rem;
  color: rgba(255,255,255,0.35);
}

.aw-score-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  white-space: nowrap;
}

.aw-bar-wrap {
  height: 6px;
  background: rgba(255,255,255,0.07);
  border-radius: 999px;
  overflow: hidden;
}

.aw-bar {
  height: 100%;
  border-radius: 999px;
  transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);

  &.score--great { background: #22c55e; }
  &.score--good  { background: #facc15; }
  &.score--warn  { background: #f97316; }
  &.score--bad   { background: #ef4444; }
}

.aw-score-num {
  font-size: 0.82rem;
  font-weight: 800;
  text-align: right;

  &.score--great { color: #22c55e; }
  &.score--good  { color: #facc15; }
  &.score--warn  { color: #f97316; }
  &.score--bad   { color: #ef4444; }
}

.aw-score-tag {
  font-size: 0.62rem;
  font-weight: 700;
  text-align: center;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  white-space: nowrap;

  &.score--great { background: rgba(34,197,94,0.12);  color: #22c55e; }
  &.score--good  { background: rgba(250,204,21,0.12); color: #facc15; }
  &.score--warn  { background: rgba(249,115,22,0.12); color: #f97316; }
  &.score--bad   { background: rgba(239,68,68,0.12);  color: #ef4444; }
}

/* ─── Result CTAs ───────────────────────────────────────────────── */
.aw-result-cta {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.aw-cta-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem;
  border-radius: 12px;
  background: #facc15;
  color: #0f172a;
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(250,204,21,0.3);
    color: #0f172a;
  }

  .material-symbols-outlined { font-size: 1.1rem; }
}

.aw-cta-ghost {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: transparent;
  color: rgba(255,255,255,0.6);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.3);
    color: #fff;
  }

  .material-symbols-outlined { font-size: 1rem; }
}

.aw-result-note {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.3);
  line-height: 1.5;
  text-align: center;
  margin: 0;
}
</style>