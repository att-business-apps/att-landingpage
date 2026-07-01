<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "917975859061";

const services = [
  "Website Design",
  "Web Development",
  "UI/UX Design",
  "Ecommerce Development",
  "Lead Generation",
  "Shopify Development",
  "SEO",
  "Digital Marketing",
  "Social Media Marketing",
  "LinkedIn Marketing",
  "Branding",
  "Website Maintenance",
  "Not Sure Yet",
];

const budgets = [
  "Under ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹3,00,000",
  "₹3,00,000 – ₹5,00,000",
  "₹5,00,000+",
];

const timelines = ["ASAP", "Within 1 month", "1–3 months", "Just exploring"];

const form = ref({
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
});

const submitted = ref(false);
const error = ref("");

const isValid = computed(() => {
  const digitsOnly = form.value.phone.replace(/[^0-9]/g, "");
  return (
    form.value.name.trim().length > 1 &&
    digitsOnly.length >= 10 &&
    form.value.service !== ""
  );
});

function buildWhatsAppMessage() {
  const f = form.value;
  const lines = [
    `Hi Amortree Tech, I'd like a project estimate.`,
    ``,
    `*Name:* ${f.name}`,
  ];
  if (f.company) lines.push(`*Company:* ${f.company}`);
  lines.push(`*Phone:* ${f.phone}`);
  if (f.email) lines.push(`*Email:* ${f.email}`);
  if (f.website) lines.push(`*Current Website:* ${f.website}`);
  lines.push(`*Service Needed:* ${f.service}`);
  if (f.budget) lines.push(`*Budget Range:* ${f.budget}`);
  if (f.timeline) lines.push(`*Timeline:* ${f.timeline}`);
  if (f.message) {
    lines.push(``, `*Project Details:*`, f.message);
  }
  return lines.join("\n");
}

function submitEstimate() {
  error.value = "";

  if (!form.value.name.trim()) {
    error.value = "Please enter your name.";
    return;
  }

  const digitsOnly = form.value.phone.replace(/[^0-9]/g, "");
  if (digitsOnly.length < 10) {
    error.value = "Please enter a valid phone number (at least 10 digits).";
    return;
  }

  if (!form.value.service) {
    error.value = "Please select the service you're interested in.";
    return;
  }

  const message = buildWhatsAppMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  submitted.value = true;
  // Direct navigation, not window.open — wa.me deep links are far more reliable
  // this way on mobile browsers and don't get caught by popup blockers.
  window.location.href = url;
}

function resendToWhatsApp() {
  const message = buildWhatsAppMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.location.href = url;
}

function resetForm() {
  form.value = {
    name: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  };
  submitted.value = false;
  error.value = "";
}

let gsapContext;

onMounted(() => {
  gsapContext = gsap.context(() => {
    gsap.from(".est-hero-eyebrow, .est-hero-title, .est-hero-sub", {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.from(".est-form-card", {
      y: 40,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.15,
    });

    gsap.utils.toArray(".est-trust-item").forEach((item, i) => {
      gsap.from(item, {
        y: 24,
        autoAlpha: 0,
        duration: 0.6,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 90%", once: true },
      });
    });
  });
});

onBeforeUnmount(() => {
  gsapContext && gsapContext.revert();
});
</script>

<template>
    <div class="breadcrum-area breadcrumb-banner">
        <div class="container">
            <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
                    <ul class="list-unstyled">
                        <li><a href="/">Home</a></li>
                        <li class="active">Estimate</li>
                    </ul>
                <div class="section-heading heading-left">
                    <h1 class="title h2 mb-4">Tell Us About Your Project. <span class="text-ly">We'll Reply on WhatsApp</span></h1>
                    <p>Fill in a few details below and hit submit — your project brief opens directly in WhatsApp, ready to send. No back-and-forth email threads, no waiting on a contact form.</p>
                </div>
            </div>
            <div class="banner-thumbnail " style="right: 200px;bottom: 80px;">
                <div class=""
                style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../assets/img/amorboy/process-1.png" class="w-100 animate__animated slideInRight"
                    style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
    </div>

  <!-- Form -->
  <section class="est-form-section">
    <div class="est-form-inner">
      <div class="est-form-card">
        <div v-if="!submitted">
          <div class="est-form-header">
            <h2 class="est-form-title">Project Details</h2>
            <p class="est-form-sub">The more you share, the faster we can scope an accurate estimate.</p>
          </div>

          <form class="est-form" @submit.prevent="submitEstimate">
            <div class="est-grid">
              <div class="est-field">
                <label for="est-name">Full Name <span class="est-req">*</span></label>
                <input
                  id="est-name"
                  v-model="form.name"
                  type="text"
                  placeholder="Your name"
                  autocomplete="name"
                />
              </div>

              <div class="est-field">
                <label for="est-company">Company Name</label>
                <input
                  id="est-company"
                  v-model="form.company"
                  type="text"
                  placeholder="Your company (optional)"
                  autocomplete="organization"
                />
              </div>

              <div class="est-field">
                <label for="est-phone">Phone Number <span class="est-req">*</span></label>
                <input
                  id="est-phone"
                  v-model="form.phone"
                  type="tel"
                  inputmode="tel"
                  placeholder="+91 98765 43210"
                  autocomplete="tel"
                />
              </div>

              <div class="est-field">
                <label for="est-email">Email Address</label>
                <input
                  id="est-email"
                  v-model="form.email"
                  type="email"
                  placeholder="you@company.com"
                  autocomplete="email"
                />
              </div>

              <div class="est-field est-field-wide">
                <label for="est-website">Current Website</label>
                <input
                  id="est-website"
                  v-model="form.website"
                  type="text"
                  placeholder="www.example.com (if you have one)"
                />
              </div>

              <div class="est-field est-field-wide">
                <label for="est-service">Service You Need <span class="est-req">*</span></label>
                <select id="est-service" v-model="form.service">
                  <option value="" disabled>Select a service</option>
                  <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>

              <div class="est-field">
                <label for="est-budget">Approximate Budget</label>
                <select id="est-budget" v-model="form.budget">
                  <option value="" disabled>Select a range</option>
                  <option v-for="b in budgets" :key="b" :value="b">{{ b }}</option>
                </select>
              </div>

              <div class="est-field">
                <label for="est-timeline">Timeline</label>
                <select id="est-timeline" v-model="form.timeline">
                  <option value="" disabled>When do you want to start?</option>
                  <option v-for="t in timelines" :key="t" :value="t">{{ t }}</option>
                </select>
              </div>

              <div class="est-field est-field-wide">
                <label for="est-message">Tell Us More About Your Project</label>
                <textarea
                  id="est-message"
                  v-model="form.message"
                  rows="4"
                  placeholder="What are you trying to build or fix? Any specific features, pages, or goals?"
                ></textarea>
              </div>
            </div>

            <p v-if="error" class="est-error">{{ error }}</p>

            <button type="submit" class="est-submit-btn" :disabled="!isValid">
              <span class="material-symbols-outlined">chat</span>
              Send via WhatsApp
            </button>

            <p class="est-disclaimer">
              Submitting takes you straight to WhatsApp with your details pre-filled — you'll
              just need to hit send. We typically reply within a few hours during business days.
            </p>
          </form>
        </div>

        <div v-else class="est-success">
          <div class="est-success-icon">
            <span class="material-symbols-outlined">check_circle</span>
          </div>
          <h3 class="est-success-title">Redirecting you to WhatsApp…</h3>
          <p class="est-success-sub">
            Your project details are ready and pre-filled. If WhatsApp didn't open automatically,
            click the button below to continue.
          </p>
          <div class="est-success-actions">
            <button type="button" class="est-retry-btn" @click="resendToWhatsApp">
              Open WhatsApp Again
            </button>
            <button type="button" class="est-reset-btn" @click="resetForm">
              Submit a Different Project
            </button>
          </div>
        </div>
      </div>

      <!-- Trust strip -->
      <div class="est-trust-row">
        <div class="est-trust-item">
          <span class="material-symbols-outlined">bolt</span>
          <span>Reply within hours, not days</span>
        </div>
        <div class="est-trust-item">
          <span class="material-symbols-outlined">lock</span>
          <span>Your details go straight to us — no third-party storage</span>
        </div>
        <div class="est-trust-item">
          <span class="material-symbols-outlined">price_check</span>
          <span>No fixed packages — scope drives price, not the other way round</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── Hero ───────────────────────────────────────────────────────────── */
.est-hero {
  position: relative;
  padding: 14rem 4rem 5rem;
  background-image: url(../../src/assets/img/banner-bg.svg);
  background-attachment: fixed;
  background-position: center -10rem;
  background-size: cover;
  background-repeat: no-repeat;
}

@media (max-width: 1100px) {
  .est-hero { padding: 10rem 2rem 4rem; }
}

@media (max-width: 768px) {
  .est-hero { padding: 7.5rem 1.25rem 3rem; }
}

.est-hero-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.est-breadcrumb {
  margin-bottom: 1.75rem;
}

.est-breadcrumb ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
}

.est-breadcrumb a {
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  transition: color 0.25s ease;
}

.est-breadcrumb a:hover { color: #facc15; }
.est-breadcrumb li.active { color: #facc15; }

.est-breadcrumb li:not(:last-child)::after {
  content: "/";
  margin-left: 0.5rem;
  color: rgba(255, 255, 255, 0.25);
}

.est-hero-title {
  font-size: clamp(2.1rem, 4.6vw, 3.4rem);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.01em;
  color: #fff;
  margin-bottom: 1.25rem;
}

.est-hero-title span {
    font-family: var(--font-instrument);
}

.est-hero-sub {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.75;
  max-width: 560px;
  margin: 0 auto;
}

/* ─── Form Section ───────────────────────────────────────────────────── */
.est-form-section {
  padding: 5rem 1.5rem 7rem;
  background: #f8fafc;
}

@media (max-width: 768px) {
  .est-form-section { padding: 3rem 1.25rem 4rem; }
}

.est-form-inner {
  max-width: 760px;
  margin: -7rem auto 0;
  position: relative;
  z-index: 2;
}

.est-form-card {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 32px 64px -24px rgba(15, 23, 42, 0.25);
  padding: 3rem;
}

@media (max-width: 640px) {
  .est-form-card { padding: 1.75rem; border-radius: 18px; }
}

.est-form-header {
  margin-bottom: 2rem;
}

.est-form-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.4rem;
}

.est-form-sub {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0;
}

.est-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 640px) {
  .est-grid { grid-template-columns: 1fr; }
}

.est-field-wide {
  grid-column: 1 / -1;
}

.est-field {
  display: flex;
  flex-direction: column;
}

.est-field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
}

.est-req {
  color: #dc2626;
}

.est-field input,
.est-field select,
.est-field textarea {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
  padding: 0.85rem 1rem;
  font-size: 0.92rem;
  color: #0f172a;
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  font-family: inherit;
}

.est-field input::placeholder,
.est-field textarea::placeholder {
  color: #94a3b8;
}

.est-field input:focus,
.est-field select:focus,
.est-field textarea:focus {
  outline: none;
  border-color: #facc15;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.15);
}

.est-field select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

.est-field textarea {
  resize: vertical;
  min-height: 110px;
}

.est-error {
  font-size: 0.85rem;
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
}

.est-submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: #0f172a;
  color: #facc15;
  font-size: 0.95rem;
  font-weight: 700;
  border: none;
  border-radius: 14px;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.est-submit-btn .material-symbols-outlined {
  font-size: 1.2rem;
}

.est-submit-btn:hover:not(:disabled) {
  background: #1e293b;
  transform: translateY(-2px);
}

.est-submit-btn:disabled {
  background: #cbd5e1;
  color: #94a3b8;
  cursor: not-allowed;
  transform: none;
}

.est-disclaimer {
  font-size: 0.76rem;
  color: #94a3b8;
  text-align: center;
  margin: 1rem 0 0;
  line-height: 1.6;
}

/* ─── Success State ──────────────────────────────────────────────────── */
.est-success {
  text-align: center;
  padding: 1rem 0;
}

.est-success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #16a34a;
}

.est-success-icon .material-symbols-outlined {
  font-size: 2.2rem;
}

.est-success-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.est-success-sub {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.7;
  max-width: 440px;
  margin: 0 auto 2rem;
}

.est-success-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.est-retry-btn {
  background: #0f172a;
  color: #facc15;
  font-size: 0.88rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.est-retry-btn:hover { background: #1e293b; }

.est-reset-btn {
  background: transparent;
  color: #475569;
  font-size: 0.88rem;
  font-weight: 600;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: border-color 0.3s ease, color 0.3s ease;
}

.est-reset-btn:hover {
  border-color: #cbd5e1;
  color: #0f172a;
}

/* ─── Trust Strip ─────────────────────────────────────────────────────── */
.est-trust-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .est-trust-row { grid-template-columns: 1fr; }
}

.est-trust-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.8rem;
  color: #475569;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 12px;
  padding: 0.9rem 1rem;
  line-height: 1.4;
}

.est-trust-item .material-symbols-outlined {
  font-size: 1.2rem;
  color: #facc15;
  flex-shrink: 0;
}
</style>