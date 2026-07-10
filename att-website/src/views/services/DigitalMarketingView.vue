<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  {
    icon: "campaign",
    title: "Paid Media Strategy",
    desc: "Google, Meta, and LinkedIn campaigns planned around your actual sales funnel, not a generic media plan template.",
  },
  {
    icon: "ads_click",
    title: "Ad Creative & Copy",
    desc: "High-converting creatives and persuasive copy designed to capture attention, increase clicks, and improve conversions.",
  },
  {
    icon: "filter_alt",
    title: "Landing Page Alignment",
    desc: "Landing pages designed to match campaign messaging, reduce drop-offs, and turn more visitors into qualified leads.",
  },
  {
    icon: "tune",
    title: "Audience Targeting & Testing",
    desc: "Continuous audience, creative, and offer testing to improve campaign performance and lower acquisition costs.",
  },
  {
    icon: "payments",
    title: "Budget & Bid Management",
    desc: "Daily budget optimization and smart bidding strategies that maximize ROI while minimizing wasted ad spend.",
  },
  {
    icon: "monitoring",
    title: "Reporting & ROI Tracking",
    desc: "GA4, Meta Pixel, Google Ads, LinkedIn Insight Tag, and event tracking configured accurately before campaigns launch.",
  },
  {
    icon: "conversion_path",
    title: "Conversion Tracking",
    desc: "Clear reporting tied to leads and revenue, not just clicks and impressions, so you know what your budget is buying.",
  },
  {
    icon: "schema",
    title: "Funnel Optimization",
    desc: "Identify and remove friction across your marketing funnel to improve lead quality and conversion rates.",
  },
];

const steps = [
  {
    num: "01",
    icon: "manage_search",
    title: "Audit & Strategy",
    desc: "We review your goals, audience, and current performance (if any) before recommending a single platform or budget.",
    week: "Week 1",
  },
  {
    num: "02",
    icon: "design_services",
    title: "Creative & Campaign Setup",
    desc: "Ad creative, copy, and targeting structured and built across the right platforms for your audience and offer.",
    week: "Week 1–2",
  },
  {
    num: "03",
    icon: "ads_click",
    title: "Launch & Test",
    desc: "Campaigns go live with structured testing across creatives and audiences to find what converts fastest.",
    week: "Week 2–4",
  },
  {
    num: "04",
    icon: "trending_up",
    title: "Optimize & Scale",
    desc: "Budget shifts toward what's working, with regular reporting so scaling decisions are based on real numbers.",
    week: "Ongoing",
  },
];

const work = [
  {
    name: "UAE Links",
    tag: "UI/UX Design · Website",
    metricVal: "10K+",
    metricLabel: "Organic Traffic",
    img: new URL("../../assets/img/project/c1/project-thum-uaeLinks.png", import.meta.url).href,
    href: "/project/uae-links",
  },
  {
    name: "SteadyAsset",
    tag: "Brand Identity · UI/UX · Website",
    metricVal: "3K+",
    metricLabel: "Organic Traffic",
    img: new URL("../../assets/img/project/c4/project-thum-sa.png", import.meta.url).href,
    href: "/project/steadyasset",
  },
  {
    name: "SaveDesk",
    tag: "Full Redesign · UI/UX",
    metricVal: "100%",
    metricLabel: "IA Re-Mapped",
    img: new URL("../../assets/img/project/c7/project-thum-sd.png", import.meta.url).href,
    href: "/project/savedesk",
  },
];

const faqs = [
  {
    q: "How much does digital marketing cost?",
    body: "Management fees typically fall between ₹20,000 and ₹1,00,000 per month, separate from ad spend itself. We scope exact pricing after understanding your goals, platforms, and budget range.",
    note: "No fixed packages. Scope drives price, not the other way round.",
  },
  {
    q: "How much should I budget for ad spend?",
    body: "It depends on your market and goals, but most campaigns need a minimum viable budget to gather meaningful data — usually ₹30,000–₹50,000/month to start testing properly across creatives and audiences.",
    note: "We'll recommend a realistic starting budget after the audit.",
  },
  {
    q: "Which platforms do you run campaigns on?",
    body: "Primarily Google Ads, Meta (Facebook/Instagram), and LinkedIn, chosen based on where your actual customers spend time — not run across every platform by default to pad a report.",
    link: "/linkedin-marketing",
    linkText: "See our dedicated LinkedIn marketing service",
  },
  {
    q: "How long until campaigns start performing?",
    body: "Most campaigns need 2–4 weeks of testing to find a winning combination of audience and creative. Performance typically stabilizes and improves from there as we optimize based on real data.",
    note: "Early weeks are about learning, not just results.",
  },
];

let gsapContext;

function initFaqTabs() {
  const rail = document.querySelector(".dm-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".dm-faq-tab");
  const answers = document.querySelectorAll(".dm-faq-answer");
  const stage = document.querySelector(".dm-faq-stage");
  let active = 0;

  const ticker = document.createElement("div");
  ticker.className = "dm-tab-ticker";
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
      { y: 0, autoAlpha: 1, duration: 0.38, ease: "power3.out" }
    );

    gsap.fromTo(
      stage,
      { scaleX: 0.995, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.35, ease: "power2.out" }
    );

    tabs[active].classList.remove("dm-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("dm-tab-active");
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
    gsap.utils.toArray(".dm-include-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray(".dm-work-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".dm-process-step", {
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".dm-process-steps", start: "top 80%", once: true },
    });

    gsap.from(".dm-faq-rail, .dm-faq-stage", {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".dm-faq-section", start: "top 78%", once: true },
    });

    gsap.from(".dm-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".dm-cta-section", start: "top 80%", once: true },
    });
  });

  initFaqTabs();
});

onBeforeUnmount(() => {
  gsapContext && gsapContext.revert();
});
</script>

<template>
    <div class="breadcrum-area breadcrumb-banner">
        <div class="container">
            <div
                class="breadcrumb animate__animated fadeInUp"
                style="animation-duration: 2s"
            >
                <ul class="list-unstyled">
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li class="active text-ly">Digital Marketing</li>
                </ul>
                <div class="section-heading heading-left">
                <h1 class="title h2 mb-0">
                    Digital Marketing That Delivers <span class="text-ly">Measurable Business Growth.</span>
                </h1>
                <p>
                    From strategy to execution, we create data-driven campaigns that generate leads, increase brand awareness, and maximize ROI.
                </p>
                </div>
            </div>
            <div class="banner-thumbnail " style="right: 250px;bottom: 00px;">
                <div class=""
                style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../../assets/img/amorboy/laptop-poses.png" class="w-100 animate__animated slideInRight"
                    style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
    </div>

  <!-- What's Included -->
  <section class="dm-include-section">
    <div class="dm-include-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">What's Included</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Every Campaign Engagement <span class="text-ly">Covers This</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          Every campaign is planned around your business goals—from targeting and creative to landing pages, tracking, and optimization. Nothing important is left to chance.
        </p>
      </div>

      <div class="dm-include-grid">
        <div v-for="item in includes" :key="item.title" class="dm-include-card">
          <div class="dm-include-icon">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>
          <h3 class="dm-include-title">{{ item.title }}</h3>
          <p class="dm-include-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="dm-process-section" id="process">
    <div class="dm-process-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Our Process</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            From First Audit to <span class="text-ly">Scalable Growth</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          A defined sequence, not an open-ended back-and-forth — so you always know what happens
          next and when.
        </p>
      </div>

      <div class="dm-process-steps">
        <div v-for="step in steps" :key="step.num" class="dm-process-step" :data-step="step.num">
          <div class="dm-ps-icon">
            <span class="material-symbols-outlined">{{ step.icon }}</span>
          </div>
          <div class="dm-ps-title">{{ step.title }}</div>
          <div class="dm-ps-desc">{{ step.desc }}</div>
          <div class="dm-ps-week">{{ step.week }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Work -->
  <section class="dm-work-section">
    <div class="dm-work-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Recent Work</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Campaigns That <span class="text-ly">Shipped & Performed</span>
          </h2>
        </div>
        <a href="/projects" class="dm-work-link">View all Projects →</a>
      </div>

      <div class="dm-work-grid">
        <a v-for="item in work" :key="item.name" :href="item.href" class="dm-work-card">
          <div class="dm-work-thumb">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="dm-work-body">
            <div class="dm-work-tag">{{ item.tag }}</div>
            <div class="dm-work-name">{{ item.name }}</div>
            <div class="dm-work-metric">
              <span class="dm-work-metric-val">{{ item.metricVal }}</span>
              <span class="dm-work-metric-label">{{ item.metricLabel }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="dm-faq-section" id="faq">
    <div class="dm-faq-inner">
      <div class="dm-faq-header">
        <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span class="text-ly">Common Questions</span>
        </div>
        <h2 class="font-bold text-dark mb-3" style="font-weight: 600">
          Questions We Hear <span class="text-ly">Before a Project Starts</span>
        </h2>
        <p class="text-slate-500 max-w-md mx-auto mb-0 text-sm">
          What clients usually want to know before committing to a digital marketing project.
        </p>
      </div>

      <div class="dm-faq-rail" role="tablist" aria-label="Digital marketing FAQ topics">
        <button
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="dm-faq-tab"
          :class="{ 'dm-tab-active': i === 0 }"
          :data-tab="i"
          role="tab"
          :aria-selected="i === 0 ? 'true' : 'false'"
          aria-controls="dm-faq-stage"
        >
          <span class="dm-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="dm-tab-q">{{ ['Pricing', 'Ad Budget', 'Platforms', 'Timeline'][i] }}</span>
        </button>
      </div>

      <div class="dm-faq-stage" id="dm-faq-stage" role="tabpanel">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q + '-answer'"
          class="dm-faq-answer"
          :class="{ 'd-none': i !== 0 }"
          :data-answer="i"
        >
          <h3 class="dm-answer-q">{{ faq.q }}</h3>
          <p class="dm-answer-body">{{ faq.body }}</p>
          <p v-if="faq.note" class="dm-answer-note">{{ faq.note }}</p>
          <a v-if="faq.link" :href="faq.link" class="dm-answer-link">{{ faq.linkText }} &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="dm-cta-section">
    <div class="dm-cta-inner">
      <h2 class="dm-cta-title">
        Ready for Campaigns That <span class="text-ly">Actually Deliver ROI?</span>
      </h2>
      <p class="dm-cta-sub">
        A 20-minute call costs you nothing and tells you exactly where your current marketing
        spend is underperforming.
      </p>
      <div class="d-flex justify-content-center flex-wrap gap-3 mt-5">
        <a
          class="amor-btn btn-fill-primary btn-large"
          href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call."
        >Book Your Free Strategy Call</a>
        <a href="/estimate" class="amor-btn btn-borderd light">Get a Project Estimate</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── What's Included ───────────────────────────────────────────────── */
.dm-include-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .dm-include-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .dm-include-section { padding: 3rem 1.25rem; }
}

.dm-include-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.dm-include-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .dm-include-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .dm-include-grid { grid-template-columns: 1fr; }
}

.dm-include-card {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);

    .dm-include-icon {
      background: rgba(250, 204, 21, 0.55);
    }
  }
}

.dm-include-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  margin-bottom: 1.25rem;
}

.dm-include-icon .material-symbols-outlined {
  font-size: 1.35rem;
}

.dm-include-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.dm-include-desc {
  font-size: 0.86rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0;
}

/* ─── Recent Work ────────────────────────────────────────────────────── */
.dm-work-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .dm-work-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .dm-work-section { padding: 3rem 1.25rem; }
}

.dm-work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.dm-work-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.dm-work-link:hover { color: #b45309; }

.dm-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .dm-work-grid { grid-template-columns: 1fr; }
}

.dm-work-card {
  display: block;
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.dm-work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.dm-work-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f1f5f9;
}

.dm-work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.dm-work-card:hover .dm-work-thumb img {
  transform: scale(1.05);
}

.dm-work-body {
  padding: 1.5rem;
  background: #fff;
}

.dm-work-tag {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.dm-work-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.dm-work-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.dm-work-metric-val {
  font-size: 1.1rem;
  font-weight: 900;
  color: #facc15;
  font-variant-numeric: tabular-nums;
}

.dm-work-metric-label {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

/* ─── Process ────────────────────────────────────────────────────────── */
.dm-process-section {
  padding: 6rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

@media (max-width: 1100px) {
  .dm-process-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .dm-process-section { padding: 3rem 1.25rem; }
}

.dm-process-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.dm-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .dm-process-steps { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .dm-process-steps { grid-template-columns: 1fr; }
}

.dm-process-step {
  background: #fff;
  padding: 2.25rem 1.75rem;
  position: relative;
  overflow: hidden;
}

.dm-process-step::before {
  content: attr(data-step);
  position: absolute;
  top: -1rem;
  right: 1.1rem;
  font-size: 6rem;
  font-weight: 900;
  color: rgba(15, 23, 42, 0.04);
  line-height: 1;
  pointer-events: none;
  font-variant-numeric: tabular-nums;
}

.dm-ps-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.75rem;
  color: #facc15;
  position: relative;
  z-index: 1;
}

.dm-ps-icon .material-symbols-outlined {
  font-size: 1.2rem;
}

.dm-ps-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.55rem;
  position: relative;
  z-index: 1;
}

.dm-ps-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.65;
  margin-bottom: 0.9rem;
  position: relative;
  z-index: 1;
}

.dm-ps-week {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
.dm-faq-section {
  padding: 6rem 1.5rem;
  background: #f8fafc;
  overflow: hidden;
}

@media (max-width: 768px) {
  .dm-faq-section { padding: 4rem 1.25rem; }
}

.dm-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.dm-faq-header {
  margin-bottom: 3rem;
  text-align: center;
}

.dm-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.dm-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.dm-faq-tab {
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
}

.dm-faq-tab:hover {
  background: rgba(250, 204, 21, 0.06);
}

.dm-faq-tab:hover .dm-tab-num { color: #facc15; }
.dm-faq-tab:hover .dm-tab-q { color: #0f172a; }

.dm-faq-tab.dm-tab-active .dm-tab-num { color: #facc15; }
.dm-faq-tab.dm-tab-active .dm-tab-q { color: #0f172a; font-weight: 700; }

.dm-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.dm-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.dm-faq-stage {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  min-height: 220px;
  position: relative;
}

@media (max-width: 640px) {
  .dm-faq-stage { padding: 1.75rem; }
}

.dm-answer-q {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.dm-answer-body {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
}

.dm-answer-note {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.dm-answer-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #b45309;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  transition: gap 0.2s ease;
}

.dm-answer-link:hover { gap: 0.5rem; }

/* ─── Closing CTA ────────────────────────────────────────────────────── */
.dm-cta-section {
  padding: 7rem 4rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .dm-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .dm-cta-section { padding: 4rem 1.25rem; }
}

.dm-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.dm-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

.dm-cta-sub {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.75;
}
</style>