<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  {
    icon: "person",
    title: "Profile & Page Optimization",
    desc: "Founder and company profiles rebuilt to read like a credible authority, not a half-finished resume page.",
  },
  {
    icon: "edit_note",
    title: "Content Strategy & Writing",
    desc: "A consistent posting cadence built around topics your buyers actually care about, written in your voice.",
  },
  {
    icon: "diversity_3",
    title: "Targeted Outreach",
    desc: "Connection and messaging sequences aimed at the specific roles and companies that match your ideal customer.",
  },
  {
    icon: "campaign",
    title: "LinkedIn Ad Campaigns",
    desc: "Sponsored content and lead-gen forms targeted by job title, industry, and company size — not broad guesswork.",
  },
  {
    icon: "groups",
    title: "Engagement & Community",
    desc: "Active engagement on relevant posts and groups that keeps your brand visible between your own posts.",
  },
  {
    icon: "monitoring",
    title: "Pipeline Reporting",
    desc: "Clear reporting tied to connections, conversations, and meetings booked — not just impressions and likes.",
  },
];

const steps = [
  {
    num: "01",
    icon: "manage_search",
    title: "Audit & ICP Definition",
    desc: "We review your current presence and define exactly who you're trying to reach — by role, industry, and company size.",
    week: "Week 1",
  },
  {
    num: "02",
    icon: "person",
    title: "Profile & Content Setup",
    desc: "Profiles optimized and a content calendar built around topics that establish authority with your target buyers.",
    week: "Week 1–2",
  },
  {
    num: "03",
    icon: "diversity_3",
    title: "Outreach & Campaigns",
    desc: "Outreach sequences and ad campaigns launched, targeting the specific decision-makers defined in your ICP.",
    week: "Week 2–4",
  },
  {
    num: "04",
    icon: "trending_up",
    title: "Track & Refine",
    desc: "Conversations and meetings tracked weekly, with messaging and targeting refined based on what's converting.",
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
    q: "How much does LinkedIn marketing cost?",
    body: "Most engagements fall between ₹25,000 and ₹1,20,000 per month, separate from any LinkedIn ad spend. We scope exact pricing after understanding your target accounts and goals.",
    note: "No fixed packages. Scope drives price, not the other way round.",
  },
  {
    q: "Will you post and message from my personal profile?",
    body: "Yes, typically from the founder's or a key team member's profile — LinkedIn outreach and content perform far better from a real person than a company page alone, since buyers trust people over logos.",
    note: "We work with you to keep the voice authentically yours.",
  },
  {
    q: "How long until I see leads from LinkedIn?",
    body: "Organic content and outreach typically need 6–8 weeks to build momentum and trust before conversations turn into meetings. Paid campaigns can generate leads faster but cost more upfront.",
    note: "LinkedIn rewards consistency more than any single post.",
  },
  {
    q: "Is LinkedIn marketing only for B2B companies?",
    body: "It works best for B2B, recruiting, and high-ticket B2C where the buyer is a professional making a considered decision — not for impulse-purchase consumer products.",
    link: "/digital-marketing",
    linkText: "See our broader digital marketing service",
  },
];

let gsapContext;

function initFaqTabs() {
  const rail = document.querySelector(".li-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".li-faq-tab");
  const answers = document.querySelectorAll(".li-faq-answer");
  const stage = document.querySelector(".li-faq-stage");
  let active = 0;

  const ticker = document.createElement("div");
  ticker.className = "li-tab-ticker";
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

    tabs[active].classList.remove("li-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("li-tab-active");
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
    gsap.utils.toArray(".li-include-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray(".li-work-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".li-process-step", {
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".li-process-steps", start: "top 80%", once: true },
    });

    gsap.from(".li-faq-rail, .li-faq-stage", {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".li-faq-section", start: "top 78%", once: true },
    });

    gsap.from(".li-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".li-cta-section", start: "top 80%", once: true },
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
                    <li class="active text-ly">LinkedIn Marketing</li>
                </ul>
                <div class="section-heading heading-left">
                <h1 class="title h2 mb-0">
                    Reach Decision-Makers <span class="text-ly">Where They Actually Are.</span>
                </h1>
                <p>
                    We craft B2B-focused LinkedIn content, outreach, and ad strategy that gets your brand in front of the people who sign the checks.
                </p>
                </div>
            </div>
            <div class="banner-thumbnail " style="right: -150px;bottom: 0px;">
                <div class=""
                style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../../assets/img/amorboy/am-why.png" class="w-50 animate__animated slideInRight"
                    style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
    </div>

  <!-- What's Included -->
  <section class="li-include-section">
    <div class="li-include-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">What's Included</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Every LinkedIn Engagement <span class="text-ly">Covers This</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          Every campaign is built with the same focus on targeting, authority, and pipeline — nothing important is treated as an add-on.
        </p>
      </div>

      <div class="li-include-grid">
        <div v-for="item in includes" :key="item.title" class="li-include-card">
          <div class="li-include-icon">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>
          <h3 class="li-include-title">{{ item.title }}</h3>
          <p class="li-include-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="li-process-section" id="process">
    <div class="li-process-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Our Process</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            From First Connection to <span class="text-ly">Booked Meeting</span>
          </h2>
        </div>
        <p class="text-slate-500 max-w-sm mb-0 text-sm">
          A defined sequence, not an open-ended back-and-forth — so you always know what happens
          next and when.
        </p>
      </div>

      <div class="li-process-steps">
        <div v-for="step in steps" :key="step.num" class="li-process-step" :data-step="step.num">
          <div class="li-ps-icon">
            <span class="material-symbols-outlined">{{ step.icon }}</span>
          </div>
          <div class="li-ps-title">{{ step.title }}</div>
          <div class="li-ps-desc">{{ step.desc }}</div>
          <div class="li-ps-week">{{ step.week }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Work -->
  <section class="li-work-section">
    <div class="li-work-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Recent Work</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Brands That <span class="text-ly">Shipped & Connected</span>
          </h2>
        </div>
        <a href="/projects" class="li-work-link">View all Projects →</a>
      </div>

      <div class="li-work-grid">
        <a v-for="item in work" :key="item.name" :href="item.href" class="li-work-card">
          <div class="li-work-thumb">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="li-work-body">
            <div class="li-work-tag">{{ item.tag }}</div>
            <div class="li-work-name">{{ item.name }}</div>
            <div class="li-work-metric">
              <span class="li-work-metric-val">{{ item.metricVal }}</span>
              <span class="li-work-metric-label">{{ item.metricLabel }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="li-faq-section" id="faq">
    <div class="li-faq-inner">
      <div class="li-faq-header">
        <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span class="text-ly">Common Questions</span>
        </div>
        <h2 class="font-bold text-dark mb-3" style="font-weight: 600">
          Questions We Hear <span class="text-ly">Before a Project Starts</span>
        </h2>
        <p class="text-slate-500 max-w-md mx-auto mb-0 text-sm">
          What clients usually want to know before committing to a LinkedIn marketing project.
        </p>
      </div>

      <div class="li-faq-rail" role="tablist" aria-label="LinkedIn marketing FAQ topics">
        <button
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="li-faq-tab"
          :class="{ 'li-tab-active': i === 0 }"
          :data-tab="i"
          role="tab"
          :aria-selected="i === 0 ? 'true' : 'false'"
          aria-controls="li-faq-stage"
        >
          <span class="li-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="li-tab-q">{{ ['Pricing', 'Profile Voice', 'Timeline', 'Fit'][i] }}</span>
        </button>
      </div>

      <div class="li-faq-stage" id="li-faq-stage" role="tabpanel">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q + '-answer'"
          class="li-faq-answer"
          :class="{ 'd-none': i !== 0 }"
          :data-answer="i"
        >
          <h3 class="li-answer-q">{{ faq.q }}</h3>
          <p class="li-answer-body">{{ faq.body }}</p>
          <p v-if="faq.note" class="li-answer-note">{{ faq.note }}</p>
          <a v-if="faq.link" :href="faq.link" class="li-answer-link">{{ faq.linkText }} &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="li-cta-section">
    <div class="li-cta-inner">
      <h2 class="li-cta-title">
        Ready to Reach the People Who <span class="text-ly">Actually Sign Off?</span>
      </h2>
      <p class="li-cta-sub">
        A 20-minute call costs you nothing and tells you exactly where your current LinkedIn
        presence is falling short.
      </p>
      <div class="d-flex justify-content-center flex-wrap gap-3 mt-5">
        <a
          class="amor-btn btn-fill-primary btn-large"
          href="https://calendar.app.google/oxixnGZCQPPcqaWd6" target="_blank" rel="noopener noreferrer"
        >Book Your Free Strategy Call</a>
        <a href="/estimate" class="amor-btn btn-borderd light">Get a Project Estimate</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── What's Included ───────────────────────────────────────────────── */
.li-include-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .li-include-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .li-include-section { padding: 3rem 1.25rem; }
}

.li-include-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.li-include-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .li-include-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .li-include-grid { grid-template-columns: 1fr; }
}

.li-include-card {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);

    .li-include-icon {
      background: rgba(250, 204, 21, 0.55);
    }
  }
}

.li-include-icon {
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

.li-include-icon .material-symbols-outlined {
  font-size: 1.35rem;
}

.li-include-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.li-include-desc {
  font-size: 0.86rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0;
}

/* ─── Recent Work ────────────────────────────────────────────────────── */
.li-work-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .li-work-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .li-work-section { padding: 3rem 1.25rem; }
}

.li-work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.li-work-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.li-work-link:hover { color: #b45309; }

.li-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .li-work-grid { grid-template-columns: 1fr; }
}

.li-work-card {
  display: block;
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.li-work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.li-work-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f1f5f9;
}

.li-work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.li-work-card:hover .li-work-thumb img {
  transform: scale(1.05);
}

.li-work-body {
  padding: 1.5rem;
  background: #fff;
}

.li-work-tag {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.li-work-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.li-work-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.li-work-metric-val {
  font-size: 1.1rem;
  font-weight: 900;
  color: #facc15;
  font-variant-numeric: tabular-nums;
}

.li-work-metric-label {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

/* ─── Process ────────────────────────────────────────────────────────── */
.li-process-section {
  padding: 6rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

@media (max-width: 1100px) {
  .li-process-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .li-process-section { padding: 3rem 1.25rem; }
}

.li-process-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.li-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .li-process-steps { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .li-process-steps { grid-template-columns: 1fr; }
}

.li-process-step {
  background: #fff;
  padding: 2.25rem 1.75rem;
  position: relative;
  overflow: hidden;
}

.li-process-step::before {
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

.li-ps-icon {
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

.li-ps-icon .material-symbols-outlined {
  font-size: 1.2rem;
}

.li-ps-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.55rem;
  position: relative;
  z-index: 1;
}

.li-ps-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.65;
  margin-bottom: 0.9rem;
  position: relative;
  z-index: 1;
}

.li-ps-week {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
.li-faq-section {
  padding: 6rem 1.5rem;
  background: #f8fafc;
  overflow: hidden;
}

@media (max-width: 768px) {
  .li-faq-section { padding: 4rem 1.25rem; }
}

.li-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.li-faq-header {
  margin-bottom: 3rem;
  text-align: center;
}

.li-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.li-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.li-faq-tab {
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

.li-faq-tab:hover {
  background: rgba(250, 204, 21, 0.06);
}

.li-faq-tab:hover .li-tab-num { color: #facc15; }
.li-faq-tab:hover .li-tab-q { color: #0f172a; }

.li-faq-tab.li-tab-active .li-tab-num { color: #facc15; }
.li-faq-tab.li-tab-active .li-tab-q { color: #0f172a; font-weight: 700; }

.li-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.li-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.li-faq-stage {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  min-height: 220px;
  position: relative;
}

@media (max-width: 640px) {
  .li-faq-stage { padding: 1.75rem; }
}

.li-answer-q {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.li-answer-body {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
}

.li-answer-note {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.li-answer-link {
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

.li-answer-link:hover { gap: 0.5rem; }

/* ─── Closing CTA ────────────────────────────────────────────────────── */
.li-cta-section {
  padding: 7rem 4rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .li-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .li-cta-section { padding: 4rem 1.25rem; }
}

.li-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.li-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

.li-cta-sub {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.75;
}
</style>