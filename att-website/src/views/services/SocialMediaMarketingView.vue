<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  {
    icon: "calendar_month",
    title: "Content Strategy & Calendar",
    desc: "Monthly content plans aligned with your business goals, audience interests, and campaigns—not random daily posting.",
  },
  {
    icon: "draw",
    title: "Content Creation",
    desc: "Professionally designed graphics, reels, carousels, and short-form videos that strengthen your brand and increase engagement.",
  },
  {
    icon: "ads_click",
    title: "Paid Social Campaigns",
    desc: "Meta, Instagram, and LinkedIn campaigns optimized to generate qualified leads, website traffic, and sales—not just impressions.",
  },
  {
    icon: "forum",
    title: "Community Management",
    desc: "Respond to comments, messages, and mentions quickly to build stronger customer relationships and increase trust.",
  },
  {
    icon: "diversity_3",
    title: "Influencer & UGC Collaboration",
    desc: "Partner with creators and leverage authentic user-generated content to expand reach and improve purchase confidence.",
  },
  {
    icon: "monitoring",
    title: "Analytics & Reporting",
    desc: "Track engagement, follower growth, reach, leads, and conversions with reports focused on business impact—not vanity metrics.",
  },
  {
    icon: "trending_up",
    title: "Brand Growth Strategy",
    desc: "Content pillars and positioning designed to increase awareness, authority, and long-term brand value.",
  },
  {
    icon: "settings_suggest",
    title: "Platform Optimization",
    desc: "Optimize bios, highlights, profiles, and page structure so visitors immediately understand your business and take action.",
  },
];

const steps = [
  {
    num: "01",
    icon: "manage_search",
    title: "Audit & Strategy",
    desc: "We review your current presence, audience, and competitors before building a content plan or running any ads.",
    week: "Week 1",
  },
  {
    num: "02",
    icon: "calendar_month",
    title: "Content Calendar & Creation",
    desc: "A content calendar built and the first batch of posts, graphics, and reels produced for your review.",
    week: "Week 1–2",
  },
  {
    num: "03",
    icon: "campaign",
    title: "Launch & Promote",
    desc: "Organic posting begins on schedule, with paid campaigns launched to extend reach to the right audiences.",
    week: "Week 2–3",
  },
  {
    num: "04",
    icon: "trending_up",
    title: "Engage & Optimize",
    desc: "Community management runs daily, with content and targeting refined monthly based on real performance data.",
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
    q: "How much does social media marketing cost?",
    body: "Most engagements fall between ₹20,000 and ₹90,000 per month for content and management, separate from any ad spend. We scope exact pricing after understanding your platforms and content needs.",
    note: "No fixed packages. Scope drives price, not the other way round.",
  },
  {
    q: "How many posts will you create per month?",
    body: "Typically 12–20 posts across feed, stories, and reels depending on the plan, plus daily community management. We focus on consistent quality over arbitrary volume targets.",
    note: "Cadence is set based on what your audience actually engages with.",
  },
  {
    q: "Which platforms do you manage?",
    body: "Primarily Instagram and Facebook, since that's where most of our clients' audiences are most active — we'll recommend other platforms only if your audience data actually supports it.",
    note: "We don't spread budget across platforms just to look comprehensive.",
  },
  {
    q: "Do I need to approve content before it's posted?",
    body: "Yes, by default. We send a content calendar for your review and approval before anything goes live, so you always have visibility and control over what represents your brand.",
    link: "/digital-marketing",
    linkText: "See our broader digital marketing service",
  },
];

let gsapContext;

function initFaqTabs() {
  const rail = document.querySelector(".smm-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".smm-faq-tab");
  const answers = document.querySelectorAll(".smm-faq-answer");
  const stage = document.querySelector(".smm-faq-stage");
  let active = 0;

  const ticker = document.createElement("div");
  ticker.className = "smm-tab-ticker";
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

    tabs[active].classList.remove("smm-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("smm-tab-active");
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
    gsap.utils.toArray(".smm-include-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray(".smm-work-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".smm-process-step", {
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".smm-process-steps", start: "top 80%", once: true },
    });

    gsap.from(".smm-faq-rail, .smm-faq-stage", {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".smm-faq-section", start: "top 78%", once: true },
    });

    gsap.from(".smm-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".smm-cta-section", start: "top 80%", once: true },
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
                    <li class="active text-ly">Social Media Marketing</li>
                </ul>
                <div class="section-heading heading-left">
                <h1 class="title h2 mb-0">
                    Build an Audience That <span class="text-ly">Actually Buys.</span>
                </h1>
                <p>
                    We design content systems and paid social campaigns that build genuine audience engagement and drive consistent demand for your brand.
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
  <section class="smm-include-section">
    <div class="smm-include-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">What's Included</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Every Social Engagement <span class="text-ly">Covers This</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          Every social media engagement follows a structured content system—from strategy and creative to community, paid promotion, and reporting—so every post supports measurable business growth.
        </p>
      </div>

      <div class="smm-include-grid">
        <div v-for="item in includes" :key="item.title" class="smm-include-card">
          <div class="smm-include-icon">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>
          <h3 class="smm-include-title">{{ item.title }}</h3>
          <p class="smm-include-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="smm-process-section" id="process">
    <div class="smm-process-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Our Process</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            From First Post to <span class="text-ly">Consistent Demand</span>
          </h2>
        </div>
        <p class="text-slate-500 max-w-sm mb-0 text-sm">
          A defined sequence, not an open-ended back-and-forth — so you always know what happens
          next and when.
        </p>
      </div>

      <div class="smm-process-steps">
        <div v-for="step in steps" :key="step.num" class="smm-process-step" :data-step="step.num">
          <div class="smm-ps-icon">
            <span class="material-symbols-outlined">{{ step.icon }}</span>
          </div>
          <div class="smm-ps-title">{{ step.title }}</div>
          <div class="smm-ps-desc">{{ step.desc }}</div>
          <div class="smm-ps-week">{{ step.week }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Work -->
  <section class="smm-work-section">
    <div class="smm-work-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Recent Work</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Brands That <span class="text-ly">Shipped & Grew</span>
          </h2>
        </div>
        <a href="/projects" class="smm-work-link">View all Projects →</a>
      </div>

      <div class="smm-work-grid">
        <a v-for="item in work" :key="item.name" :href="item.href" class="smm-work-card">
          <div class="smm-work-thumb">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="smm-work-body">
            <div class="smm-work-tag">{{ item.tag }}</div>
            <div class="smm-work-name">{{ item.name }}</div>
            <div class="smm-work-metric">
              <span class="smm-work-metric-val">{{ item.metricVal }}</span>
              <span class="smm-work-metric-label">{{ item.metricLabel }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="smm-faq-section" id="faq">
    <div class="smm-faq-inner">
      <div class="smm-faq-header">
        <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span class="text-ly">Common Questions</span>
        </div>
        <h2 class="font-bold text-dark mb-3" style="font-weight: 600">
          Questions We Hear <span class="text-ly">Before a Project Starts</span>
        </h2>
        <p class="text-slate-500 max-w-md mx-auto mb-0 text-sm">
          What clients usually want to know before committing to a social media marketing project.
        </p>
      </div>

      <div class="smm-faq-rail" role="tablist" aria-label="Social media marketing FAQ topics">
        <button
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="smm-faq-tab"
          :class="{ 'smm-tab-active': i === 0 }"
          :data-tab="i"
          role="tab"
          :aria-selected="i === 0 ? 'true' : 'false'"
          aria-controls="smm-faq-stage"
        >
          <span class="smm-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="smm-tab-q">{{ ['Pricing', 'Content Volume', 'Platforms', 'Approval'][i] }}</span>
        </button>
      </div>

      <div class="smm-faq-stage" id="smm-faq-stage" role="tabpanel">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q + '-answer'"
          class="smm-faq-answer"
          :class="{ 'd-none': i !== 0 }"
          :data-answer="i"
        >
          <h3 class="smm-answer-q">{{ faq.q }}</h3>
          <p class="smm-answer-body">{{ faq.body }}</p>
          <p v-if="faq.note" class="smm-answer-note">{{ faq.note }}</p>
          <a v-if="faq.link" :href="faq.link" class="smm-answer-link">{{ faq.linkText }} &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="smm-cta-section">
    <div class="smm-cta-inner">
      <h2 class="smm-cta-title">
        Ready for Social That <span class="text-ly">Actually Drives Demand?</span>
      </h2>
      <p class="smm-cta-sub">
        A 20-minute call costs you nothing and tells you exactly where your current social
        presence is falling short.
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
.smm-include-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .smm-include-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .smm-include-section { padding: 3rem 1.25rem; }
}

.smm-include-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.smm-include-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .smm-include-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .smm-include-grid { grid-template-columns: 1fr; }
}

.smm-include-card {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);

    .smm-include-icon {
      background: rgba(250, 204, 21, 0.55);
    }
  }
}

.smm-include-icon {
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

.smm-include-icon .material-symbols-outlined {
  font-size: 1.35rem;
}

.smm-include-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.smm-include-desc {
  font-size: 0.86rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0;
}

/* ─── Recent Work ────────────────────────────────────────────────────── */
.smm-work-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .smm-work-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .smm-work-section { padding: 3rem 1.25rem; }
}

.smm-work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.smm-work-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.smm-work-link:hover { color: #b45309; }

.smm-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .smm-work-grid { grid-template-columns: 1fr; }
}

.smm-work-card {
  display: block;
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.smm-work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.smm-work-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f1f5f9;
}

.smm-work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.smm-work-card:hover .smm-work-thumb img {
  transform: scale(1.05);
}

.smm-work-body {
  padding: 1.5rem;
  background: #fff;
}

.smm-work-tag {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.smm-work-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.smm-work-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.smm-work-metric-val {
  font-size: 1.1rem;
  font-weight: 900;
  color: #facc15;
  font-variant-numeric: tabular-nums;
}

.smm-work-metric-label {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

/* ─── Process ────────────────────────────────────────────────────────── */
.smm-process-section {
  padding: 6rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

@media (max-width: 1100px) {
  .smm-process-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .smm-process-section { padding: 3rem 1.25rem; }
}

.smm-process-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.smm-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .smm-process-steps { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .smm-process-steps { grid-template-columns: 1fr; }
}

.smm-process-step {
  background: #fff;
  padding: 2.25rem 1.75rem;
  position: relative;
  overflow: hidden;
}

.smm-process-step::before {
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

.smm-ps-icon {
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

.smm-ps-icon .material-symbols-outlined {
  font-size: 1.2rem;
}

.smm-ps-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.55rem;
  position: relative;
  z-index: 1;
}

.smm-ps-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.65;
  margin-bottom: 0.9rem;
  position: relative;
  z-index: 1;
}

.smm-ps-week {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
.smm-faq-section {
  padding: 6rem 1.5rem;
  background: #f8fafc;
  overflow: hidden;
}

@media (max-width: 768px) {
  .smm-faq-section { padding: 4rem 1.25rem; }
}

.smm-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.smm-faq-header {
  margin-bottom: 3rem;
  text-align: center;
}

.smm-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.smm-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.smm-faq-tab {
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

.smm-faq-tab:hover {
  background: rgba(250, 204, 21, 0.06);
}

.smm-faq-tab:hover .smm-tab-num { color: #facc15; }
.smm-faq-tab:hover .smm-tab-q { color: #0f172a; }

.smm-faq-tab.smm-tab-active .smm-tab-num { color: #facc15; }
.smm-faq-tab.smm-tab-active .smm-tab-q { color: #0f172a; font-weight: 700; }

.smm-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.smm-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.smm-faq-stage {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  min-height: 220px;
  position: relative;
}

@media (max-width: 640px) {
  .smm-faq-stage { padding: 1.75rem; }
}

.smm-answer-q {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.smm-answer-body {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
}

.smm-answer-note {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.smm-answer-link {
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

.smm-answer-link:hover { gap: 0.5rem; }

/* ─── Closing CTA ────────────────────────────────────────────────────── */
.smm-cta-section {
  padding: 7rem 4rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .smm-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .smm-cta-section { padding: 4rem 1.25rem; }
}

.smm-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.smm-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

.smm-cta-sub {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.75;
}
</style>