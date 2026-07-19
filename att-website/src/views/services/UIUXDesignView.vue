<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  {
    icon: "manage_search",
    title: "User Research",
    desc: "We uncover user needs, business goals, and behavioral insights before making design decisions—so every screen solves a real problem.",
  },
  {
    icon: "account_tree",
    title: "Information Architecture",
    desc: "Organized user flows, navigation, and content hierarchy that help users find what they need without confusion.",
  },
  {
    icon: "draft",
    title: "Wireframes & Interactive Prototypes",
    desc: "Validate ideas early with clickable prototypes—reducing revisions before visual design begins.",
  },
  {
    icon: "palette",
    title: "Visual & Interaction Design",
    desc: "Beautiful, consistent interfaces with thoughtful motion, accessibility, and reusable design systems that strengthen your brand.",
  },
  {
    icon: "groups",
    title: "Usability Testing",
    desc: "Observe real users completing real tasks to uncover friction, improve usability, and validate decisions before development starts.",
  },
  {
    icon: "rocket_launch",
    title: "Developer-Ready Handoff",
    desc: "Pixel-perfect Figma files, design tokens, assets, and documentation that help developers build accurately with minimal back-and-forth.",
  },
];

const steps = [
  {
    num: "01",
    icon: "manage_search",
    title: "Discover & Research",
    desc: "We study your users, competitors, and goals to understand what the experience actually needs to solve.",
    week: "Week 1",
  },
  {
    num: "02",
    icon: "account_tree",
    title: "Flows & Wireframes",
    desc: "User flows and low-fidelity wireframes mapped and agreed on — the structure, before the styling.",
    week: "Week 1–2",
  },
  {
    num: "03",
    icon: "design_services",
    title: "UI Design & Prototyping",
    desc: "High-fidelity screens built on a defined design system, with interactive prototypes for key flows.",
    week: "Week 2–4",
  },
  {
    num: "04",
    icon: "task_alt",
    title: "Test & Handoff",
    desc: "Usability testing surfaces friction early, then a clean, developer-ready handoff with specs in place.",
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
    q: "How much does UI/UX design cost?",
    body: "Most UI/UX engagements fall between ₹60,000 and ₹3,50,000, depending on the number of flows, screens, and whether research and testing are included. We scope exact pricing after understanding what you need designed.",
    note: "No fixed packages. Scope drives price, not the other way round.",
  },
  {
    q: "How long does a UI/UX project take?",
    body: "Most projects run 4–5 weeks from research to final handoff. Flows and wireframes take 1–2 weeks, visual design and prototyping 2–3 weeks, with usability testing woven in before handoff.",
    note: "Timelines are agreed upfront and tracked at every milestone.",
  },
  {
    q: "Do you design for web, mobile, or both?",
    body: "Both. We design responsive web interfaces and native mobile app experiences, using the same research-driven process either way — the platform changes the patterns, not the rigor.",
    note: "Most projects span both, since users move between devices.",
  },
  {
    q: "Will I get a usable prototype, or just static screens?",
    body: "You get clickable prototypes for key flows, not just static mockups — so you and your team can actually walk through the experience and catch issues before development starts.",
    link: "/projects",
    linkText: "See how this plays out in our Projects",
  },
];

let gsapContext;

function initFaqTabs() {
  const rail = document.querySelector(".uxd-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".uxd-faq-tab");
  const answers = document.querySelectorAll(".uxd-faq-answer");
  const stage = document.querySelector(".uxd-faq-stage");
  let active = 0;

  const ticker = document.createElement("div");
  ticker.className = "uxd-tab-ticker";
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

    tabs[active].classList.remove("uxd-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("uxd-tab-active");
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
    gsap.utils.toArray(".uxd-include-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".uxd-process-step", {
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".uxd-process-steps", start: "top 80%", once: true },
    });

    gsap.utils.toArray(".uxd-work-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".uxd-faq-rail, .uxd-faq-stage", {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".uxd-faq-section", start: "top 78%", once: true },
    });

    gsap.from(".uxd-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".uxd-cta-section", start: "top 80%", once: true },
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
                    <li class="active text-ly">UI/UX Design</li>
                </ul>
                <div class="section-heading heading-left">
                <h1 class="title h2 mb-0">
                    Every Screen Should Guide <span class="text-ly">Users Toward A Better Decision.</span>
                </h1>
                <p>
                    We combine user research, conversion strategy, and modern interface design to create digital experiences that increase engagement, improve retention, and drive measurable business growth.
                </p>
                </div>
            </div>
            <div class="banner-thumbnail " style="right: 300px;bottom: 80px;">
                <div class=""
                style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../../assets/img/amorboy/process-3.png" class="w-100 animate__animated slideInRight"
                    style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
    </div>

  <!-- What's Included -->
  <section class="uxd-include-section">
    <div class="uxd-include-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">What's Included</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Every Design Engagement <span class="text-ly">Covers This</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          Every interface is backed by research, validated through testing, and documented for seamless development. Nothing is designed on assumptions.
        </p>
      </div>

      <div class="uxd-include-grid">
        <div v-for="item in includes" :key="item.title" class="uxd-include-card">
          <div class="uxd-include-icon">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>
          <h3 class="uxd-include-title">{{ item.title }}</h3>
          <p class="uxd-include-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Work -->
  <section class="uxd-work-section">
    <div class="uxd-work-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Recent Work</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Experiences That <span class="text-ly">Shipped & Performed</span>
          </h2>
        </div>
        <a href="/projects" class="uxd-work-link">View all Projects →</a>
      </div>

      <div class="uxd-work-grid">
        <a v-for="item in work" :key="item.name" :href="item.href" class="uxd-work-card">
          <div class="uxd-work-thumb">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="uxd-work-body">
            <div class="uxd-work-tag">{{ item.tag }}</div>
            <div class="uxd-work-name">{{ item.name }}</div>
            <div class="uxd-work-metric">
              <span class="uxd-work-metric-val">{{ item.metricVal }}</span>
              <span class="uxd-work-metric-label">{{ item.metricLabel }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="uxd-process-section" id="process">
    <div class="uxd-process-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Our Process</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            From First Insight to <span class="text-ly">Final Handoff</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          A defined sequence, not an open-ended back-and-forth — so you always know what happens
          next and when.
        </p>
      </div>

      <div class="uxd-process-steps">
        <div v-for="step in steps" :key="step.num" class="uxd-process-step" :data-step="step.num">
          <div class="uxd-ps-icon">
            <span class="material-symbols-outlined">{{ step.icon }}</span>
          </div>
          <div class="uxd-ps-title">{{ step.title }}</div>
          <div class="uxd-ps-desc">{{ step.desc }}</div>
          <div class="uxd-ps-week">{{ step.week }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="uxd-faq-section" id="faq">
    <div class="uxd-faq-inner">
      <div class="uxd-faq-header">
        <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span class="text-ly">Common Questions</span>
        </div>
        <h2 class="font-bold text-dark mb-3" style="font-weight: 600">
          Questions We Hear <span class="text-ly">Before a Project Starts</span>
        </h2>
        <p class="text-slate-500 max-w-md mx-auto mb-0 text-sm">
          What clients usually want to know before committing to a UI/UX design project.
        </p>
      </div>

      <div class="uxd-faq-rail" role="tablist" aria-label="UI/UX design FAQ topics">
        <button
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="uxd-faq-tab"
          :class="{ 'uxd-tab-active': i === 0 }"
          :data-tab="i"
          role="tab"
          :aria-selected="i === 0 ? 'true' : 'false'"
          aria-controls="uxd-faq-stage"
        >
          <span class="uxd-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="uxd-tab-q">{{ ['Pricing', 'Timeline', 'Platforms', 'Prototypes'][i] }}</span>
        </button>
      </div>

      <div class="uxd-faq-stage" id="uxd-faq-stage" role="tabpanel">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q + '-answer'"
          class="uxd-faq-answer"
          :class="{ 'd-none': i !== 0 }"
          :data-answer="i"
        >
          <h3 class="uxd-answer-q">{{ faq.q }}</h3>
          <p class="uxd-answer-body">{{ faq.body }}</p>
          <p v-if="faq.note" class="uxd-answer-note">{{ faq.note }}</p>
          <a v-if="faq.link" :href="faq.link" class="uxd-answer-link">{{ faq.linkText }} &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="uxd-cta-section">
    <div class="uxd-cta-inner">
      <h2 class="uxd-cta-title">
        Ready for an Experience That <span class="text-ly">Actually Converts?</span>
      </h2>
      <p class="uxd-cta-sub">
        A 20-minute call costs you nothing and tells you exactly where your current experience is
        losing users.
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

<style lang="scss" scoped>
/* ─── What's Included ───────────────────────────────────────────────── */
.uxd-include-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .uxd-include-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .uxd-include-section { padding: 3rem 1.25rem; }
}

.uxd-include-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.uxd-include-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .uxd-include-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .uxd-include-grid { grid-template-columns: 1fr; }
}

.uxd-include-card {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);

    .uxd-include-icon {
      background: rgba(250, 204, 21, 0.55);
    }
  }
}

.uxd-include-icon {
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

.uxd-include-icon .material-symbols-outlined {
  font-size: 1.35rem;
}

.uxd-include-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.uxd-include-desc {
  font-size: 0.86rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0;
}

/* ─── Process ────────────────────────────────────────────────────────── */
.uxd-process-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .uxd-process-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .uxd-process-section { padding: 3rem 1.25rem; }
}

.uxd-process-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.uxd-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .uxd-process-steps { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .uxd-process-steps { grid-template-columns: 1fr; }
}

.uxd-process-step {
  background: #f8fafc;
  padding: 2.25rem 1.75rem;
  position: relative;
  overflow: hidden;
}

.uxd-process-step::before {
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

.uxd-ps-icon {
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

.uxd-ps-icon .material-symbols-outlined {
  font-size: 1.2rem;
}

.uxd-ps-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.55rem;
  position: relative;
  z-index: 1;
}

.uxd-ps-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.65;
  margin-bottom: 0.9rem;
  position: relative;
  z-index: 1;
}

.uxd-ps-week {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

/* ─── Recent Work ────────────────────────────────────────────────────── */
.uxd-work-section {
  padding: 6rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

@media (max-width: 1100px) {
  .uxd-work-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .uxd-work-section { padding: 3rem 1.25rem; }
}

.uxd-work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.uxd-work-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.uxd-work-link:hover { color: #b45309; }

.uxd-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .uxd-work-grid { grid-template-columns: 1fr; }
}

.uxd-work-card {
  display: block;
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.uxd-work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.uxd-work-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f1f5f9;
}

.uxd-work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.uxd-work-card:hover .uxd-work-thumb img {
  transform: scale(1.05);
}

.uxd-work-body {
  padding: 1.5rem;
  background: #fff;
}

.uxd-work-tag {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.uxd-work-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.uxd-work-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.uxd-work-metric-val {
  font-size: 1.1rem;
  font-weight: 900;
  color: #facc15;
  font-variant-numeric: tabular-nums;
}

.uxd-work-metric-label {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
.uxd-faq-section {
  padding: 6rem 1.5rem;
  background: #f8fafc;
  overflow: hidden;
}

@media (max-width: 768px) {
  .uxd-faq-section { padding: 4rem 1.25rem; }
}

.uxd-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.uxd-faq-header {
  margin-bottom: 3rem;
  text-align: center;
}

.uxd-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.uxd-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.uxd-faq-tab {
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

.uxd-faq-tab:hover {
  background: rgba(250, 204, 21, 0.06);
}

.uxd-faq-tab:hover .uxd-tab-num { color: #facc15; }
.uxd-faq-tab:hover .uxd-tab-q { color: #0f172a; }

.uxd-faq-tab.uxd-tab-active .uxd-tab-num { color: #facc15; }
.uxd-faq-tab.uxd-tab-active .uxd-tab-q { color: #0f172a; font-weight: 700; }

.uxd-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.uxd-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.uxd-faq-stage {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  min-height: 220px;
  position: relative;
}

@media (max-width: 640px) {
  .uxd-faq-stage { padding: 1.75rem; }
}

.uxd-answer-q {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.uxd-answer-body {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
}

.uxd-answer-note {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.uxd-answer-link {
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

.uxd-answer-link:hover { gap: 0.5rem; }

/* ─── Closing CTA ────────────────────────────────────────────────────── */
.uxd-cta-section {
  padding: 7rem 4rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .uxd-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .uxd-cta-section { padding: 4rem 1.25rem; }
}

.uxd-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.uxd-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

.uxd-cta-sub {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.75;
}
</style>