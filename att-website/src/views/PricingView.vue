<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const waBase = "https://wa.me/917975859061/?text=";

const plans = [
  {
    key: "launch",
    icon: "rocket_launch",
    name: "Launch",
    tagline: "For founders ready to go live with a site that earns trust from day one.",
    price: "₹49,000",
    priceNote: "One-time investment",
    featured: false,
    includesFrom: null,
    features: [
      "Premium UI/UX design",
      "Mobile-first build",
      "Technical SEO foundation",
      "WhatsApp integration",
      "Performance optimization",
      "GitHub CI/CD + DigitalOcean hosting",
    ],
    ctaText: "Start with Launch",
    waText: "I'm interested in the Launch package (₹49,000). Can we talk?",
  },
  {
    key: "growth",
    icon: "star",
    name: "Growth",
    tagline: "For businesses ready to turn traffic into a predictable pipeline.",
    price: "₹89,000",
    priceNote: "One-time investment",
    featured: true,
    badge: "Most Popular",
    includesFrom: "Launch",
    features: [
      "Conversion rate optimization",
      "Dedicated landing pages",
      "Analytics setup & tracking",
      "Integrated blog",
      "Advanced speed optimization",
      "3 months of support",
    ],
    ctaText: "Start with Growth",
    waText: "I'm interested in the Growth package (₹89,000). Can we talk?",
  },
  {
    key: "scale",
    icon: "workspace_premium",
    name: "Scale",
    tagline: "For teams ready to automate operations and compound growth.",
    price: "₹1,49,000+",
    priceNote: "Starting investment",
    featured: false,
    includesFrom: "Growth",
    features: [
      "Custom integrations",
      "Workflow automation",
      "CRM setup & sync",
      "Advanced SEO strategy",
      "Ongoing conversion optimization",
      "Priority support",
    ],
    ctaText: "Start with Scale",
    waText: "I'm interested in the Scale package (₹1,49,000+). Can we talk?",
  },
];

const trustPoints = [
  { icon: "fact_check", label: "Fixed scope, no surprise invoices" },
  { icon: "forum", label: "WhatsApp-first communication" },
  { icon: "person_pin", label: "One dedicated project lead" },
  { icon: "verified", label: "Post-launch support included" },
];

const faqs = [
  {
    q: "Pricing Basis",
    question: "What determines which plan I need?",
    body: "Launch fits a focused, conversion-ready website for founders getting online. Growth adds the conversion and content infrastructure to turn traffic into leads. Scale is for teams that need automation, CRM, and ongoing optimization at pace.",
    note: "Not sure which fits? A 20-minute call will tell you.",
  },
  {
    q: "Payment Terms",
    question: "How is payment structured?",
    body: "We work on a milestone basis — typically 50% to begin the engagement and 50% on delivery. For Scale engagements with a longer scope, payments are split across project milestones agreed upfront.",
    note: "No hidden fees. What's quoted is what's billed.",
  },
  {
    q: "Upgrading",
    question: "Can I upgrade my plan later?",
    body: "Yes. Most clients start with Launch or Growth and upgrade as the business scales. We credit your original investment toward the upgraded package when moving up within 6 months of your first launch.",
    note: "Growth is designed to expand into Scale seamlessly.",
  },
  {
    q: "What's Included",
    question: "Is hosting or domain included in these prices?",
    body: "These packages cover design, development, and the listed features. Hosting and domain registration are billed separately at cost — we'll recommend the right setup for your traffic and budget during the strategy call.",
    note: "We keep pass-through costs transparent, always at cost.",
  },
  {
    q: "Custom Scope",
    question: "What if my project doesn't fit any tier?",
    body: "Some projects — multi-language sites, marketplace builds, complex integrations — fall outside these tiers entirely. We scope those individually after understanding your requirements on a strategy call.",
    note: "Every custom quote still follows the same fixed-scope approach.",
  },
];

let gsapContext;

function initFaqTabs() {
  const rail = document.querySelector(".pv-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".pv-faq-tab");
  const answers = document.querySelectorAll(".pv-faq-answer");
  const stage = document.querySelector(".pv-faq-stage");
  let active = 0;

  const ticker = document.createElement("div");
  ticker.className = "pv-tab-ticker";
  rail.appendChild(ticker);

  function positionTicker(tab) {
    const railRect = rail.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    gsap.to(ticker, {
      x: tabRect.left - railRect.left,
      width: tabRect.width,
      duration: 0.38,
      ease: "power3.out",
    });
  }

  function showAnswer(index) {
    if (index === active) return;

    const outEl = answers[active];
    gsap.to(outEl, {
      y: -10,
      autoAlpha: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => outEl.classList.add("d-none"),
    });

    const inEl = answers[index];
    inEl.classList.remove("d-none");
    gsap.fromTo(
      inEl,
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.38, ease: "power3.out" },
    );

    gsap.fromTo(
      stage,
      { scaleX: 0.995, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.35, ease: "power2.out" },
    );

    tabs[active].classList.remove("pv-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("pv-tab-active");
    tabs[index].setAttribute("aria-selected", "true");
    positionTicker(tabs[index]);

    active = index;
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => showAnswer(i));
  });

  requestAnimationFrame(() => positionTicker(tabs[0]));
  window.addEventListener("resize", () => positionTicker(tabs[active]), { passive: true });
}

onMounted(() => {
  gsapContext = gsap.context(() => {
    gsap.from(".pv-hero-eyebrow, .pv-hero-title, .pv-hero-sub", {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.utils.toArray(".pv-plan-card").forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        autoAlpha: 0,
        duration: 0.75,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pv-plans-grid", start: "top 78%", once: true },
      });
    });

    gsap.from(".pv-trust-item", {
      y: 20,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: ".pv-trust-strip", start: "top 88%", once: true },
    });

    gsap.from(".pv-faq-heading, .pv-faq-sub", {
      y: 22,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.65,
      ease: "power2.out",
      scrollTrigger: { trigger: ".pv-faq-section", start: "top 80%", once: true },
    });

    gsap.from(".pv-faq-tab", {
      y: 20,
      autoAlpha: 0,
      stagger: 0.07,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: { trigger: ".pv-faq-rail", start: "top 88%", once: true },
    });

    gsap.from(".pv-faq-stage", {
      y: 28,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ".pv-faq-stage", start: "top 90%", once: true },
    });

    gsap.from(".pv-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".pv-cta-section", start: "top 80%", once: true },
    });

    // Card hover lift for non-featured cards (featured card has its own elevated state)
    gsap.utils.toArray(".pv-plan-card:not(.pv-featured)").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
      });
    });

    initFaqTabs();
  });
});

onBeforeUnmount(() => {
  gsapContext && gsapContext.revert();
});
</script>

<template>
  <!-- ============================================================
       HERO — Breadcrumb banner, matches ServicesView
       ============================================================ -->
  <div class="breadcrum-area breadcrumb-banner">
    <div class="container">
      <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
        <ul class="list-unstyled">
          <li><a href="/">Home</a></li>
          <li class="active">Pricing</li>
        </ul>
        <div class="section-heading heading-left">
          <div class="pv-hero-eyebrow inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
            <span class="text-ly">Simple, Transparent Pricing</span>
          </div>
          <h1 class="pv-hero-title title h2 mb-4">
            Fixed Packages. <span class="text-ly">No Surprise Invoices.</span>
          </h1>
          <p class="pv-hero-sub">
            Three ways to work with us — each scoped, priced, and delivered on a fixed timeline.
            Pick where you are today; every plan is built to grow into the next.
          </p>
        </div>
      </div>
      <div class="banner-thumbnail" style="bottom: 0px">
        <div
          style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);"
        >
          <img
            src="../assets/img/amorboy/am-service.png"
            class="w-75 animate__animated slideInRight"
            style="animation-duration: 3s"
            alt="Illustration"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================================
       PRICING TIERS
       ============================================================ -->
  <section class="pv-plans-section">
    <div class="pv-plans-inner">
      <div class="pv-plans-grid">
        <div
          v-for="plan in plans"
          :key="plan.key"
          class="pv-plan-card"
          :class="{ 'pv-featured': plan.featured }"
        >
          <div v-if="plan.badge" class="pv-plan-badge">{{ plan.badge }}</div>

          <div class="pv-plan-icon">
            <span class="material-symbols-outlined">{{ plan.icon }}</span>
          </div>

          <h3 class="pv-plan-name">{{ plan.name }}</h3>
          <p class="pv-plan-tagline">{{ plan.tagline }}</p>

          <div class="pv-plan-price-block">
            <div class="pv-plan-price">{{ plan.price }}</div>
            <div class="pv-plan-price-note">{{ plan.priceNote }}</div>
          </div>

          <a
            class="pv-plan-cta"
            :href="waBase + encodeURIComponent(plan.waText)"
            target="_blank"
            rel="noopener"
          >
            {{ plan.ctaText }}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 13L13 3M13 3H6M13 3V10"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>

          <div class="pv-plan-divider"></div>

          <div v-if="plan.includesFrom" class="pv-plan-includes">
            Everything in {{ plan.includesFrom }}, plus:
          </div>

          <ul class="pv-plan-features">
            <li v-for="feature in plan.features" :key="feature">
              <span class="material-symbols-outlined pv-check">check_circle</span>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Trust strip -->
      <div class="pv-trust-strip">
        <div v-for="point in trustPoints" :key="point.label" class="pv-trust-item">
          <span class="material-symbols-outlined pv-trust-icon">{{ point.icon }}</span>
          <span>{{ point.label }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       FAQ — Numbered Tab Rail + Expanding Stage
       ============================================================ -->
  <section class="pv-faq-section py-28 px-6 overflow-hidden" id="pricing-faq">
    <div class="pv-faq-inner">
      <div class="pv-faq-header mb-16 text-center">
        <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span class="text-ly">Pricing Questions</span>
        </div>
        <h2 class="pv-faq-heading text-3xl font-display font-bold text-dark mb-3" style="font-weight: 600">
          Questions <span class="text-ly">About Our Pricing</span>
        </h2>
        <p class="pv-faq-sub text-slate-500 max-w-md mx-auto mb-0 text-sm">
          The questions we hear most before a project kicks off.
        </p>
      </div>

      <!-- Tab Rail -->
      <div class="pv-faq-rail" role="tablist" aria-label="Pricing FAQ topics">
        <button
          v-for="(item, i) in faqs"
          :key="item.q"
          class="pv-faq-tab"
          :class="{ 'pv-tab-active': i === 0 }"
          :data-tab="i"
          role="tab"
          :aria-selected="i === 0 ? 'true' : 'false'"
          aria-controls="pv-faq-stage"
        >
          <span class="pv-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="pv-tab-q">{{ item.q }}</span>
        </button>
      </div>

      <!-- Stage Panel -->
      <div class="pv-faq-stage" id="pv-faq-stage" role="tabpanel">
        <div
          v-for="(item, i) in faqs"
          :key="item.question"
          class="pv-faq-answer"
          :class="{ 'd-none': i !== 0 }"
          :data-answer="i"
        >
          <h3 class="pv-answer-q">{{ item.question }}</h3>
          <p class="pv-answer-body">{{ item.body }}</p>
          <p class="pv-answer-note">{{ item.note }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       CLOSING CTA
       ============================================================ -->
  <section class="pv-cta-section">
    <div class="pv-cta-inner">
      <div class="pv-cta-eyebrow">
        <span class="text-ly">Ready to Get Started?</span>
      </div>
      <h2 class="pv-cta-title">
        Let's Find the <span class="text-ly">Right Plan</span> for Your Business
      </h2>
      <p class="pv-cta-sub">
        A 20-minute strategy call costs you nothing and tells you exactly which package fits — no
        pressure, no obligation.
      </p>
      <div class="d-flex justify-content-center flex-wrap gap-3 mt-5">
        <a
          class="amor-btn btn-fill-primary btn-large"
          href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call%20to%20discuss%20pricing."
        >Book Your Free Strategy Call</a>
        <a href="/estimate" class="amor-btn btn-borderd light">Get a Project Estimate</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── Pricing Plans Section ──────────────────────────────────────────── */
.pv-plans-section {
  padding: 7rem 4rem 6rem;
  background: #f8fafc;
}

@media (max-width: 1100px) {
  .pv-plans-section { padding: 4.5rem 2rem 4rem; }
}

@media (max-width: 768px) {
  .pv-plans-section { padding: 3.5rem 1.25rem 3rem; }
}

.pv-plans-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.pv-plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  align-items: center;
}

@media (max-width: 1024px) {
  .pv-plans-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; gap: 2.25rem; }
}

/* ─── Plan Card ───────────────────────────────────────────────────────── */
.pv-plan-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  padding: 2.75rem 2.25rem 2.5rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  will-change: transform;
}

.pv-plan-card.pv-featured {
  background: linear-gradient(165deg, #14141a 0%, #0a0a0d 100%);
  border: 1px solid rgba(250, 204, 21, 0.35);
  box-shadow: 0 32px 64px -24px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(250, 204, 21, 0.08);
  transform: scale(1.045);
  z-index: 2;
}

@media (max-width: 1024px) {
  .pv-plan-card.pv-featured { transform: scale(1); order: -1; }
}

.pv-plan-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #facc15;
  color: #0f172a;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  box-shadow: 0 8px 20px -6px rgba(250, 204, 21, 0.6);
  white-space: nowrap;
}

.pv-plan-icon {
  width: 56px;
  height: 56px;
  border-radius: 15px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  margin-bottom: 1.75rem;
}

.pv-featured .pv-plan-icon {
  background: #facc15;
  border-color: #facc15;
  color: #0f172a;
}

.pv-plan-icon .material-symbols-outlined {
  font-size: 1.65rem;
}

.pv-plan-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.01em;
  margin-bottom: 0.6rem;
}

.pv-featured .pv-plan-name {
  color: #ffffff;
}

.pv-plan-tagline {
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.65;
  min-height: 3rem;
  margin-bottom: 1.75rem;
}

.pv-featured .pv-plan-tagline {
  color: rgba(255, 255, 255, 0.55);
}

.pv-plan-price-block {
  margin-bottom: 1.75rem;
}

.pv-plan-price {
  font-size: clamp(2.1rem, 3.2vw, 2.6rem);
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}

.pv-featured .pv-plan-price {
  color: #ffffff;
}

.pv-plan-price-note {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #94a3b8;
  margin-top: 0.5rem;
}

.pv-featured .pv-plan-price-note {
  color: rgba(255, 255, 255, 0.4);
}

.pv-plan-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #0f172a;
  background: transparent;
  border: 1px solid rgba(15, 23, 42, 0.16);
  border-radius: 12px;
  padding: 0.9rem 1.25rem;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease, gap 0.3s ease;
  margin-bottom: 2rem;
}

.pv-plan-cta:hover {
  background: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
  gap: 0.7rem;
}

.pv-featured .pv-plan-cta {
  background: #facc15;
  color: #0f172a;
  border-color: #facc15;
}

.pv-featured .pv-plan-cta:hover {
  background: #eab308;
  border-color: #eab308;
  color: #0f172a;
}

.pv-plan-divider {
  height: 1px;
  background: rgba(15, 23, 42, 0.08);
  margin-bottom: 1.5rem;
}

.pv-featured .pv-plan-divider {
  background: rgba(255, 255, 255, 0.1);
}

.pv-plan-includes {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin-bottom: 1.1rem;
}

.pv-featured .pv-plan-includes {
  color: rgba(255, 255, 255, 0.45);
}

.pv-plan-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.pv-plan-features li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.88rem;
  color: #334155;
  line-height: 1.5;
}

.pv-featured .pv-plan-features li {
  color: rgba(255, 255, 255, 0.85);
}

.pv-check {
  font-size: 1.1rem;
  color: #eab308;
  flex-shrink: 0;
  margin-top: 0.05rem;
}

.pv-featured .pv-check {
  color: #facc15;
}

/* ─── Trust Strip ─────────────────────────────────────────────────────── */
.pv-trust-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 4.5rem;
}

@media (max-width: 900px) {
  .pv-trust-strip { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .pv-trust-strip { grid-template-columns: 1fr; }
}

.pv-trust-item {
  background: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1.5rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #334155;
}

.pv-trust-icon {
  font-size: 1.35rem;
  color: #eab308;
  flex-shrink: 0;
}

/* ─── FAQ — Tab Rail + Stage (matches HomeView pattern) ────────────────── */
.pv-faq-section {
  background: #ffffff;
}

.pv-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.pv-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.pv-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.pv-faq-tab {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.75rem 1.25rem 0.9rem;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 0.2s ease;
  border-radius: 0.5rem 0.5rem 0 0;
  will-change: transform, opacity;
}

.pv-faq-tab:hover {
  background: rgba(250, 204, 21, 0.06);
}

.pv-faq-tab:hover .pv-tab-num { color: #facc15; }
.pv-faq-tab:hover .pv-tab-q { color: #0f172a; }

.pv-faq-tab.pv-tab-active .pv-tab-num { color: #facc15; }
.pv-faq-tab.pv-tab-active .pv-tab-q { color: #0f172a; font-weight: 700; }

.pv-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.pv-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.pv-faq-stage {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem 3rem;
  min-height: 220px;
  position: relative;
  will-change: transform, opacity;
}

@media (max-width: 640px) {
  .pv-faq-stage { padding: 2rem 1.5rem; }
}

.pv-faq-answer {
  will-change: transform, opacity;
}

.pv-answer-q {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.pv-answer-body {
  font-size: 0.95rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
  max-width: 640px;
}

.pv-answer-note {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

/* ─── Closing CTA ─────────────────────────────────────────────────────── */
.pv-cta-section {
  padding: 7rem 4rem;
  text-align: center;
  background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%);
}

@media (max-width: 1100px) {
  .pv-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .pv-cta-section { padding: 4rem 1.25rem; }
}

.pv-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.pv-cta-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.pv-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  margin-bottom: 1.25rem;
}

.pv-cta-sub {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.75;
}
</style>