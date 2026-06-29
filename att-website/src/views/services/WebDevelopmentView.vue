<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  {
    icon: "code",
    title: "Custom Build, No Bloat",
    desc: "Hand-coded on modern frameworks — no page-builder plugins or template bloat slowing down your site.",
  },
  {
    icon: "speed",
    title: "Performance Engineered",
    desc: "Optimized assets, lazy loading, and clean code structured for fast load times and high Core Web Vitals scores.",
  },
  {
    icon: "security",
    title: "Secure by Default",
    desc: "Best-practice security headers, sanitized inputs, and dependency hygiene built in from the first commit.",
  },
  {
    icon: "devices",
    title: "Fully Responsive",
    desc: "Tested across real devices and breakpoints, not just a browser resize — every layout holds up in the field.",
  },
  {
    icon: "integration_instructions",
    title: "CMS & API Integration",
    desc: "Headless CMS, third-party APIs, and CRM connections wired in cleanly so content and data stay easy to manage.",
  },
  {
    icon: "auto_fix_high",
    title: "Scalable Architecture",
    desc: "Component-based structure that grows with you — new pages and features added without rebuilding the foundation.",
  },
];

const steps = [
  {
    num: "01",
    icon: "manage_search",
    title: "Technical Scoping",
    desc: "We review the design, define the stack, and map out data, integrations, and hosting requirements before writing code.",
    week: "Week 1",
  },
  {
    num: "02",
    icon: "account_tree",
    title: "Environment & Setup",
    desc: "Repository, staging environment, and core architecture stood up — the foundation every page builds on.",
    week: "Week 1–2",
  },
  {
    num: "03",
    icon: "code",
    title: "Build & Integrate",
    desc: "Pages, components, and integrations built iteratively, with staging links shared as features come online.",
    week: "Week 2–5",
  },
  {
    num: "04",
    icon: "task_alt",
    title: "QA & Launch",
    desc: "Cross-browser and device testing, performance checks, then a clean deployment to production.",
    week: "Week 5–6",
  },
];

const work = [
  {
    name: "SteadyAsset",
    tag: "Brand Identity · UI/UX · Website",
    metricVal: "8.44x",
    metricLabel: "ROAS",
    img: "../../assets/img/project/c4/project-thum-sa.png",
    href: "/project/steadyasset",
  },
  {
    name: "SaveDesk",
    tag: "Full Redesign · UI/UX",
    metricVal: "+42%",
    metricLabel: "Conversion",
    img: "../../assets/img/project/c7/project-thum-sd.png",
    href: "/project/savedesk",
  },
  {
    name: "Samsiddhi Designs",
    tag: "Brand Identity · UI/UX · Website",
    metricVal: "3.5x",
    metricLabel: "Pipeline",
    img: "../../assets/img/project/c9/project-thum-sd.png",
    href: "/project/samsiddhi-designs",
  },
];

const faqs = [
  {
    q: "How much does web development cost?",
    body: "Most development engagements fall between ₹75,000 and ₹5,00,000, depending on page count, integrations, and custom functionality. We scope exact pricing after understanding what the site needs to do for your business.",
    note: "No fixed packages. Scope drives price, not the other way round.",
  },
  {
    q: "How long does a development project take?",
    body: "Most builds run 5–8 weeks from technical scoping to launch, depending on integrations and content volume. Setup takes 1–2 weeks, build and integration 3–5 weeks, with QA and launch in the final stretch.",
    note: "Timelines are agreed upfront and tracked at every milestone.",
  },
  {
    q: "What tech stack do you build on?",
    body: "We choose the stack based on the project — typically Vue or React for interactive front-ends, with WordPress or a headless CMS where content teams need to self-manage. No one-size-fits-all platform.",
    note: "Most clients choose to keep design and build under one roof.",
  },
  {
    q: "Do you handle hosting and ongoing maintenance?",
    body: "Yes. We can set up and manage hosting, and offer ongoing maintenance plans for updates, monitoring, and performance tuning after launch — so the site stays fast and secure long-term.",
    link: "/website-maintenance",
    linkText: "See what's included in website maintenance",
  },
];

let gsapContext;

function initFaqTabs() {
  const rail = document.querySelector(".wd-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".wd-faq-tab");
  const answers = document.querySelectorAll(".wd-faq-answer");
  const stage = document.querySelector(".wd-faq-stage");
  let active = 0;

  const ticker = document.createElement("div");
  ticker.className = "wd-tab-ticker";
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

    tabs[active].classList.remove("wd-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("wd-tab-active");
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
    gsap.utils.toArray(".wd-include-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".wd-process-step", {
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".wd-process-steps", start: "top 80%", once: true },
    });

    gsap.utils.toArray(".wd-work-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".wd-faq-rail, .wd-faq-stage", {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".wd-faq-section", start: "top 78%", once: true },
    });

    gsap.from(".wd-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".wd-cta-section", start: "top 80%", once: true },
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
      <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
        <ul class="list-unstyled">
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li class="active">Web Development</li>
        </ul>
        <div class="section-heading heading-left">
          <h1 class="title h2 mb-0">Custom Web Development Built for <span class="text-ly">Performance, Scalability & Growth</span></h1>
          <p>From business websites to complex web applications, we build secure, high-performance digital solutions tailored to your goals.</p>
        </div>
      </div>
      <div class="banner-thumbnail " style="right: 300px;bottom: 80px;">
        <div class=""
          style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
          <img src="../../assets/img/amorboy/process-1.png" class="w-100 animate__animated slideInRight"
            style="animation-duration: 3s" alt="Illustration">
        </div>
      </div>
    </div>
  </div>

  <!-- What's Included -->
  <section class="wd-include-section">
    <div class="wd-include-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">What's Included</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Every Build Engagement <span class="text-ly">Covers This</span>
          </h2>
        </div>
        <p class="text-slate-500 max-w-sm mb-0 text-sm">
          No stripped-down "starter" version. Every project gets the same rigor applied to the
          architecture, performance, and security.
        </p>
      </div>

      <div class="wd-include-grid">
        <div v-for="item in includes" :key="item.title" class="wd-include-card">
          <div class="wd-include-icon">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>
          <h3 class="wd-include-title">{{ item.title }}</h3>
          <p class="wd-include-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="wd-process-section" id="process">
    <div class="wd-process-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Our Process</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            From First Commit to <span class="text-ly">Production Launch</span>
          </h2>
        </div>
        <p class="text-slate-500 max-w-sm mb-0 text-sm">
          A defined sequence, not an open-ended back-and-forth — so you always know what happens
          next and when.
        </p>
      </div>

      <div class="wd-process-steps">
        <div v-for="step in steps" :key="step.num" class="wd-process-step" :data-step="step.num">
          <div class="wd-ps-icon">
            <span class="material-symbols-outlined">{{ step.icon }}</span>
          </div>
          <div class="wd-ps-title">{{ step.title }}</div>
          <div class="wd-ps-desc">{{ step.desc }}</div>
          <div class="wd-ps-week">{{ step.week }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Work -->
  <section class="wd-work-section">
    <div class="wd-work-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Recent Work</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Builds That <span class="text-ly">Shipped & Performed</span>
          </h2>
        </div>
        <a href="/case-studies" class="wd-work-link">View all case studies →</a>
      </div>

      <div class="wd-work-grid">
        <a v-for="item in work" :key="item.name" :href="item.href" class="wd-work-card">
          <div class="wd-work-thumb">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="wd-work-body">
            <div class="wd-work-tag">{{ item.tag }}</div>
            <div class="wd-work-name">{{ item.name }}</div>
            <div class="wd-work-metric">
              <span class="wd-work-metric-val">{{ item.metricVal }}</span>
              <span class="wd-work-metric-label">{{ item.metricLabel }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="wd-faq-section" id="faq">
    <div class="wd-faq-inner">
      <div class="wd-faq-header">
        <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span class="text-ly">Common Questions</span>
        </div>
        <h2 class="font-bold text-dark mb-3" style="font-weight: 600">
          Questions We Hear <span class="text-ly">Before a Project Starts</span>
        </h2>
        <p class="text-slate-500 max-w-md mx-auto mb-0 text-sm">
          What clients usually want to know before committing to a web development project.
        </p>
      </div>

      <div class="wd-faq-rail" role="tablist" aria-label="Web development FAQ topics">
        <button
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="wd-faq-tab"
          :class="{ 'wd-tab-active': i === 0 }"
          :data-tab="i"
          role="tab"
          :aria-selected="i === 0 ? 'true' : 'false'"
          aria-controls="wd-faq-stage"
        >
          <span class="wd-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="wd-tab-q">{{ ['Pricing', 'Timeline', 'Stack', 'Maintenance'][i] }}</span>
        </button>
      </div>

      <div class="wd-faq-stage" id="wd-faq-stage" role="tabpanel">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q + '-answer'"
          class="wd-faq-answer"
          :class="{ 'd-none': i !== 0 }"
          :data-answer="i"
        >
          <h3 class="wd-answer-q">{{ faq.q }}</h3>
          <p class="wd-answer-body">{{ faq.body }}</p>
          <p v-if="faq.note" class="wd-answer-note">{{ faq.note }}</p>
          <a v-if="faq.link" :href="faq.link" class="wd-answer-link">{{ faq.linkText }} &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="wd-cta-section">
    <div class="wd-cta-inner">
      <h2 class="wd-cta-title">
        Ready to Build a Site That <span class="text-ly">Actually Performs?</span>
      </h2>
      <p class="wd-cta-sub">
        A 20-minute call costs you nothing and tells you exactly where your current site is
        leaving visitors on the table.
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
.wd-include-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .wd-include-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .wd-include-section { padding: 3rem 1.25rem; }
}

.wd-include-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.wd-include-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .wd-include-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .wd-include-grid { grid-template-columns: 1fr; }
}

.wd-include-card {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 2rem;
}

.wd-include-icon {
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

.wd-include-icon .material-symbols-outlined {
  font-size: 1.35rem;
}

.wd-include-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.wd-include-desc {
  font-size: 0.86rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0;
}

/* ─── Process ────────────────────────────────────────────────────────── */
.wd-process-section {
  padding: 6rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

@media (max-width: 1100px) {
  .wd-process-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .wd-process-section { padding: 3rem 1.25rem; }
}

.wd-process-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.wd-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .wd-process-steps { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .wd-process-steps { grid-template-columns: 1fr; }
}

.wd-process-step {
  background: #fff;
  padding: 2.25rem 1.75rem;
  position: relative;
  overflow: hidden;
}

.wd-process-step::before {
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

.wd-ps-icon {
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

.wd-ps-icon .material-symbols-outlined {
  font-size: 1.2rem;
}

.wd-ps-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.55rem;
  position: relative;
  z-index: 1;
}

.wd-ps-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.65;
  margin-bottom: 0.9rem;
  position: relative;
  z-index: 1;
}

.wd-ps-week {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

/* ─── Recent Work ────────────────────────────────────────────────────── */
.wd-work-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .wd-work-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .wd-work-section { padding: 3rem 1.25rem; }
}

.wd-work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.wd-work-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.wd-work-link:hover { color: #b45309; }

.wd-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .wd-work-grid { grid-template-columns: 1fr; }
}

.wd-work-card {
  display: block;
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.wd-work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.wd-work-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f1f5f9;
}

.wd-work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.wd-work-card:hover .wd-work-thumb img {
  transform: scale(1.05);
}

.wd-work-body {
  padding: 1.5rem;
  background: #fff;
}

.wd-work-tag {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.wd-work-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.wd-work-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.wd-work-metric-val {
  font-size: 1.1rem;
  font-weight: 900;
  color: #facc15;
  font-variant-numeric: tabular-nums;
}

.wd-work-metric-label {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
.wd-faq-section {
  padding: 6rem 1.5rem;
  background: #f8fafc;
  overflow: hidden;
}

@media (max-width: 768px) {
  .wd-faq-section { padding: 4rem 1.25rem; }
}

.wd-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.wd-faq-header {
  margin-bottom: 3rem;
  text-align: center;
}

.wd-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.wd-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.wd-faq-tab {
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

.wd-faq-tab:hover {
  background: rgba(250, 204, 21, 0.06);
}

.wd-faq-tab:hover .wd-tab-num { color: #facc15; }
.wd-faq-tab:hover .wd-tab-q { color: #0f172a; }

.wd-faq-tab.wd-tab-active .wd-tab-num { color: #facc15; }
.wd-faq-tab.wd-tab-active .wd-tab-q { color: #0f172a; font-weight: 700; }

.wd-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.wd-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.wd-faq-stage {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  min-height: 220px;
  position: relative;
}

@media (max-width: 640px) {
  .wd-faq-stage { padding: 1.75rem; }
}

.wd-answer-q {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.wd-answer-body {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
}

.wd-answer-note {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.wd-answer-link {
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

.wd-answer-link:hover { gap: 0.5rem; }

/* ─── Closing CTA ────────────────────────────────────────────────────── */
.wd-cta-section {
  padding: 7rem 4rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .wd-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .wd-cta-section { padding: 4rem 1.25rem; }
}

.wd-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.wd-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

.wd-cta-sub {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.75;
}
</style>