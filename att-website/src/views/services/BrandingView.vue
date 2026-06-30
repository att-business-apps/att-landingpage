<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  {
    icon: "explore",
    title: "Brand Strategy & Positioning",
    desc: "Define your positioning, messaging, audience, and competitive advantage before visual design begins—so every creative decision has purpose.",
  },
  {
    icon: "draw",
    title: "Logo & Visual Identity",
    desc: "Create a memorable logo system and visual identity that works consistently across digital products, packaging, print, and advertising.",
  },
  {
    icon: "palette",
    title: "Color, Type & Brand System",
    desc: "Establish a complete visual language with colors, typography, spacing, imagery, and components that keep every customer touchpoint consistent.",
  },
  {
    icon: "menu_book",
    title: "Brand Guidelines",
    desc: "Comprehensive brand documentation that ensures your identity stays consistent across every platform, team, and marketing campaign.",
  },
  {
    icon: "campaign",
    title: "Marketing Collateral",
    desc: "Business cards, presentations, social templates, and marketing assets designed to strengthen brand recognition everywhere customers interact with you.",
  },
  {
    icon: "rocket_launch",
    title: "Launch-Ready Assets",
    desc: "Receive production-ready files for print, web, social media, signage, and packaging—organized for seamless handoff to any team or vendor.",
  },
  {
    icon: "record_voice_over",
    title: "Brand Voice & Messaging",
    desc: "Develop a consistent tone of voice, messaging framework, and communication guidelines so every interaction sounds unmistakably like your brand.",
  },
];

const steps = [
  {
    num: "01",
    icon: "manage_search",
    title: "Discovery & Research",
    desc: "We study your market, competitors, and audience to understand what your brand actually needs to communicate.",
    week: "Week 1",
  },
  {
    num: "02",
    icon: "explore",
    title: "Strategy & Positioning",
    desc: "Mission, values, and market position defined and agreed on, giving every design decision after this a clear direction.",
    week: "Week 1–2",
  },
  {
    num: "03",
    icon: "draw",
    title: "Identity Design",
    desc: "Logo concepts, color, and typography developed and refined into a complete, cohesive visual identity system.",
    week: "Week 2–4",
  },
  {
    num: "04",
    icon: "task_alt",
    title: "Guidelines & Handoff",
    desc: "Brand guidelines documented and final assets delivered in every format your team and vendors will need.",
    week: "Week 4–5",
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
    q: "How much does branding cost?",
    body: "Most branding engagements fall between ₹40,000 and ₹2,50,000, depending on whether it's a logo and identity system or a full brand strategy with guidelines and collateral. We scope exact pricing after understanding what you need.",
    note: "No fixed packages. Scope drives price, not the other way round.",
  },
  {
    q: "How long does a branding project take?",
    body: "Most projects run 4–5 weeks from discovery to final handoff. Strategy and positioning take 1–2 weeks, identity design 2–3 weeks, with guidelines and asset delivery in the final stretch.",
    note: "Timelines are agreed upfront and tracked at every milestone.",
  },
  {
    q: "How many logo concepts will I see?",
    body: "We typically present 2–3 distinct directions rather than a dozen variations of the same idea — each one a genuinely different concept, so the choice is meaningful rather than overwhelming.",
    note: "Quality of options matters more than quantity.",
  },
  {
    q: "Can you rebrand an existing business?",
    body: "Yes. Rebrands follow the same process but start with an audit of what's working and what isn't in your current identity, so we evolve the brand rather than starting from zero unnecessarily.",
    link: "/case-studies",
    linkText: "See how this plays out in our case studies",
  },
];

let gsapContext;

function initFaqTabs() {
  const rail = document.querySelector(".br-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".br-faq-tab");
  const answers = document.querySelectorAll(".br-faq-answer");
  const stage = document.querySelector(".br-faq-stage");
  let active = 0;

  const ticker = document.createElement("div");
  ticker.className = "br-tab-ticker";
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

    tabs[active].classList.remove("br-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("br-tab-active");
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
    gsap.utils.toArray(".br-include-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray(".br-work-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".br-process-step", {
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".br-process-steps", start: "top 80%", once: true },
    });

    gsap.from(".br-faq-rail, .br-faq-stage", {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".br-faq-section", start: "top 78%", once: true },
    });

    gsap.from(".br-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".br-cta-section", start: "top 80%", once: true },
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
                    <li class="active text-ly">Branding</li>
                </ul>
                <div class="section-heading heading-left">
                <h1 class="title h2 mb-0">
                    Build a Brand People <span class="text-ly">Trust, Remember & Choose.</span>
                </h1>
                <p>
                    Every brand element is designed to communicate your value, build confidence, and create a consistent customer experience.
                </p>
                </div>
            </div>
            <div class="banner-thumbnail " style="right: 250px;bottom: 40px;">
                <div class=""
                style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../../assets/img/amorboy/process-2.png" class="w-100 animate__animated slideInRight"
                    style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
    </div>

  <!-- What's Included -->
  <section class="br-include-section">
    <div class="br-include-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">What's Included</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Every Branding Engagement <span class="text-ly">Covers This</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          Define your positioning, messaging, audience, and competitive advantage before visual design begins—so every creative decision has purpose.
        </p>
      </div>

      <div class="br-include-grid">
        <div v-for="item in includes" :key="item.title" class="br-include-card">
          <div class="br-include-icon">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>
          <h3 class="br-include-title">{{ item.title }}</h3>
          <p class="br-include-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="br-process-section" id="process">
    <div class="br-process-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Our Process</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            From First Insight to <span class="text-ly">Finished Identity</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          A defined sequence, not an open-ended back-and-forth — so you always know what happens
          next and when.
        </p>
      </div>

      <div class="br-process-steps">
        <div v-for="step in steps" :key="step.num" class="br-process-step" :data-step="step.num">
          <div class="br-ps-icon">
            <span class="material-symbols-outlined">{{ step.icon }}</span>
          </div>
          <div class="br-ps-title">{{ step.title }}</div>
          <div class="br-ps-desc">{{ step.desc }}</div>
          <div class="br-ps-week">{{ step.week }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Work -->
  <section class="br-work-section">
    <div class="br-work-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Recent Work</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Brands That <span class="text-ly">Shipped & Stuck</span>
          </h2>
        </div>
        <a href="/case-studies" class="br-work-link">View all case studies →</a>
      </div>

      <div class="br-work-grid">
        <a v-for="item in work" :key="item.name" :href="item.href" class="br-work-card">
          <div class="br-work-thumb">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="br-work-body">
            <div class="br-work-tag">{{ item.tag }}</div>
            <div class="br-work-name">{{ item.name }}</div>
            <div class="br-work-metric">
              <span class="br-work-metric-val">{{ item.metricVal }}</span>
              <span class="br-work-metric-label">{{ item.metricLabel }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="br-faq-section" id="faq">
    <div class="br-faq-inner">
      <div class="br-faq-header">
        <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span class="text-ly">Common Questions</span>
        </div>
        <h2 class="font-bold text-dark mb-3" style="font-weight: 600">
          Questions We Hear <span class="text-ly">Before a Project Starts</span>
        </h2>
        <p class="text-slate-500 max-w-md mx-auto mb-0 text-sm">
          What clients usually want to know before committing to a branding project.
        </p>
      </div>

      <div class="br-faq-rail" role="tablist" aria-label="Branding FAQ topics">
        <button
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="br-faq-tab"
          :class="{ 'br-tab-active': i === 0 }"
          :data-tab="i"
          role="tab"
          :aria-selected="i === 0 ? 'true' : 'false'"
          aria-controls="br-faq-stage"
        >
          <span class="br-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="br-tab-q">{{ ['Pricing', 'Timeline', 'Concepts', 'Rebrands'][i] }}</span>
        </button>
      </div>

      <div class="br-faq-stage" id="br-faq-stage" role="tabpanel">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q + '-answer'"
          class="br-faq-answer"
          :class="{ 'd-none': i !== 0 }"
          :data-answer="i"
        >
          <h3 class="br-answer-q">{{ faq.q }}</h3>
          <p class="br-answer-body">{{ faq.body }}</p>
          <p v-if="faq.note" class="br-answer-note">{{ faq.note }}</p>
          <a v-if="faq.link" :href="faq.link" class="br-answer-link">{{ faq.linkText }} &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="br-cta-section">
    <div class="br-cta-inner">
      <h2 class="br-cta-title">
        Ready for a Brand That <span class="text-ly">Actually Sticks?</span>
      </h2>
      <p class="br-cta-sub">
        A 20-minute call costs you nothing and tells you exactly where your current brand is
        falling flat.
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
.br-include-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .br-include-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .br-include-section { padding: 3rem 1.25rem; }
}

.br-include-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.br-include-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .br-include-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .br-include-grid { grid-template-columns: 1fr; }
}

.br-include-card {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);

    .br-include-icon {
      background: rgba(250, 204, 21, 0.55);
    }
  }
}

.br-include-icon {
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

.br-include-icon .material-symbols-outlined {
  font-size: 1.35rem;
}

.br-include-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.br-include-desc {
  font-size: 0.86rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0;
}

/* ─── Recent Work ────────────────────────────────────────────────────── */
.br-work-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .br-work-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .br-work-section { padding: 3rem 1.25rem; }
}

.br-work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.br-work-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.br-work-link:hover { color: #b45309; }

.br-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .br-work-grid { grid-template-columns: 1fr; }
}

.br-work-card {
  display: block;
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.br-work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.br-work-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f1f5f9;
}

.br-work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.br-work-card:hover .br-work-thumb img {
  transform: scale(1.05);
}

.br-work-body {
  padding: 1.5rem;
  background: #fff;
}

.br-work-tag {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.br-work-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.br-work-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.br-work-metric-val {
  font-size: 1.1rem;
  font-weight: 900;
  color: #facc15;
  font-variant-numeric: tabular-nums;
}

.br-work-metric-label {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

/* ─── Process ────────────────────────────────────────────────────────── */
.br-process-section {
  padding: 6rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

@media (max-width: 1100px) {
  .br-process-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .br-process-section { padding: 3rem 1.25rem; }
}

.br-process-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.br-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .br-process-steps { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .br-process-steps { grid-template-columns: 1fr; }
}

.br-process-step {
  background: #fff;
  padding: 2.25rem 1.75rem;
  position: relative;
  overflow: hidden;
}

.br-process-step::before {
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

.br-ps-icon {
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

.br-ps-icon .material-symbols-outlined {
  font-size: 1.2rem;
}

.br-ps-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.55rem;
  position: relative;
  z-index: 1;
}

.br-ps-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.65;
  margin-bottom: 0.9rem;
  position: relative;
  z-index: 1;
}

.br-ps-week {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
.br-faq-section {
  padding: 6rem 1.5rem;
  background: #f8fafc;
  overflow: hidden;
}

@media (max-width: 768px) {
  .br-faq-section { padding: 4rem 1.25rem; }
}

.br-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.br-faq-header {
  margin-bottom: 3rem;
  text-align: center;
}

.br-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.br-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.br-faq-tab {
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

.br-faq-tab:hover {
  background: rgba(250, 204, 21, 0.06);
}

.br-faq-tab:hover .br-tab-num { color: #facc15; }
.br-faq-tab:hover .br-tab-q { color: #0f172a; }

.br-faq-tab.br-tab-active .br-tab-num { color: #facc15; }
.br-faq-tab.br-tab-active .br-tab-q { color: #0f172a; font-weight: 700; }

.br-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.br-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.br-faq-stage {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  min-height: 220px;
  position: relative;
}

@media (max-width: 640px) {
  .br-faq-stage { padding: 1.75rem; }
}

.br-answer-q {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.br-answer-body {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
}

.br-answer-note {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.br-answer-link {
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

.br-answer-link:hover { gap: 0.5rem; }

/* ─── Closing CTA ────────────────────────────────────────────────────── */
.br-cta-section {
  padding: 7rem 4rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .br-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .br-cta-section { padding: 4rem 1.25rem; }
}

.br-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.br-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

.br-cta-sub {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.75;
}
</style>