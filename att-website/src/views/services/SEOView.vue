<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  {
    icon: "manage_search",
    title: "Technical SEO Audit",
    desc: "Find and fix crawlability, indexing, and site-speed issues holding your rankings back before any content goes live.",
  },
  {
    icon: "search",
    title: "Keyword & Competitor Research",
    desc: "Identify the exact terms your customers are searching, and where competitors are already winning, before we touch a page.",
  },
  {
    icon: "article",
    title: "On-Page & Content Optimization",
    desc: "Title tags, headers, internal links, and content structured around search intent — not stuffed with keywords.",
  },
  {
    icon: "link",
    title: "Authority & Link Building",
    desc: "Earn relevant backlinks and citations that build domain authority and trust signals search engines reward.",
  },
  {
    icon: "speed",
    title: "Core Web Vitals & Performance",
    desc: "Page speed and stability improvements that help both rankings and the experience visitors actually have on your site.",
  },
  {
    icon: "monitoring",
    title: "Reporting & Rank Tracking",
    desc: "Clear monthly reporting on rankings, traffic, and conversions, so you always know what SEO is actually delivering.",
  },
];

const steps = [
  {
    num: "01",
    icon: "manage_search",
    title: "Audit & Research",
    desc: "We audit your site's technical health and research the keywords your customers are actually searching for.",
    week: "Week 1–2",
  },
  {
    num: "02",
    icon: "account_tree",
    title: "Strategy & Roadmap",
    desc: "Priority fixes, content plan, and link-building targets mapped into a roadmap built around your business goals.",
    week: "Week 2",
  },
  {
    num: "03",
    icon: "build",
    title: "Implementation",
    desc: "Technical fixes, on-page optimization, and content updates rolled out in priority order, not all at once.",
    week: "Week 3–8",
  },
  {
    num: "04",
    icon: "task_alt",
    title: "Track & Refine",
    desc: "Rankings and traffic tracked monthly, with the strategy adjusted based on what's actually moving the needle.",
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
    q: "How much does SEO cost?",
    body: "Most SEO engagements fall between ₹25,000 and ₹1,50,000 per month, depending on competition, content volume, and link-building scope. We scope exact pricing after auditing your site and market.",
    note: "No fixed packages. Scope drives price, not the other way round.",
  },
  {
    q: "How long until I see results from SEO?",
    body: "Most sites see early movement in rankings within 8–12 weeks, with meaningful traffic growth building over 4–6 months. SEO compounds over time — it's not a one-time fix.",
    note: "Timelines depend on competition and your site's starting point.",
  },
  {
    q: "Do you guarantee a #1 ranking?",
    body: "No, and no honest agency should. Search algorithms aren't something any agency controls. What we commit to is a clear strategy, consistent execution, and transparent reporting on real progress.",
    note: "Anyone promising guaranteed rankings is overselling.",
  },
  {
    q: "Is SEO better than paid ads?",
    body: "They serve different purposes. SEO builds compounding, long-term organic traffic; paid ads deliver immediate visibility. Most businesses benefit from both working together.",
    link: "/digital-marketing",
    linkText: "See our digital marketing service",
  },
];

let gsapContext;

function initFaqTabs() {
  const rail = document.querySelector(".seo-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".seo-faq-tab");
  const answers = document.querySelectorAll(".seo-faq-answer");
  const stage = document.querySelector(".seo-faq-stage");
  let active = 0;

  const ticker = document.createElement("div");
  ticker.className = "seo-tab-ticker";
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

    tabs[active].classList.remove("seo-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("seo-tab-active");
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
    gsap.utils.toArray(".seo-include-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray(".seo-work-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".seo-process-step", {
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".seo-process-steps", start: "top 80%", once: true },
    });

    gsap.from(".seo-faq-rail, .seo-faq-stage", {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".seo-faq-section", start: "top 78%", once: true },
    });

    gsap.from(".seo-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".seo-cta-section", start: "top 80%", once: true },
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
                    <li class="active text-ly">SEO</li>
                </ul>
                <div class="section-heading heading-left">
                <h1 class="title h2 mb-0">
                    Get Found by the Right Customers <span class="text-ly">at the Right Time.</span>
                </h1>
                <p>
                    Our SEO strategies improve your visibility, attract qualified traffic, and help your business achieve sustainable organic growth.
                </p>
                </div>
            </div>
            <div class="banner-thumbnail " style="right: -150px;bottom: 0px;">
                <div class=""
                style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../../assets/img/amorboy/am-doing.png" class="w-50 animate__animated slideInRight"
                    style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
    </div>

  <!-- What's Included -->
  <section class="seo-include-section">
    <div class="seo-include-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">What's Included</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Every SEO Engagement <span class="text-ly">Covers This</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          Every campaign is built with the same focus on technical health, content quality, and authority — nothing important is treated as an add-on.
        </p>
      </div>

      <div class="seo-include-grid">
        <div v-for="item in includes" :key="item.title" class="seo-include-card">
          <div class="seo-include-icon">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>
          <h3 class="seo-include-title">{{ item.title }}</h3>
          <p class="seo-include-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="seo-process-section" id="process">
    <div class="seo-process-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Our Process</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            From First Audit to <span class="text-ly">Sustained Rankings</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          A defined sequence, not an open-ended back-and-forth — so you always know what happens
          next and when.
        </p>
      </div>

      <div class="seo-process-steps">
        <div v-for="step in steps" :key="step.num" class="seo-process-step" :data-step="step.num">
          <div class="seo-ps-icon">
            <span class="material-symbols-outlined">{{ step.icon }}</span>
          </div>
          <div class="seo-ps-title">{{ step.title }}</div>
          <div class="seo-ps-desc">{{ step.desc }}</div>
          <div class="seo-ps-week">{{ step.week }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Work -->
  <section class="seo-work-section">
    <div class="seo-work-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Recent Work</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Campaigns That <span class="text-ly">Shipped & Ranked</span>
          </h2>
        </div>
        <a href="/case-studies" class="seo-work-link">View all case studies →</a>
      </div>

      <div class="seo-work-grid">
        <a v-for="item in work" :key="item.name" :href="item.href" class="seo-work-card">
          <div class="seo-work-thumb">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="seo-work-body">
            <div class="seo-work-tag">{{ item.tag }}</div>
            <div class="seo-work-name">{{ item.name }}</div>
            <div class="seo-work-metric">
              <span class="seo-work-metric-val">{{ item.metricVal }}</span>
              <span class="seo-work-metric-label">{{ item.metricLabel }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="seo-faq-section" id="faq">
    <div class="seo-faq-inner">
      <div class="seo-faq-header">
        <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span class="text-ly">Common Questions</span>
        </div>
        <h2 class="font-bold text-dark mb-3" style="font-weight: 600">
          Questions We Hear <span class="text-ly">Before a Project Starts</span>
        </h2>
        <p class="text-slate-500 max-w-md mx-auto mb-0 text-sm">
          What clients usually want to know before committing to an SEO project.
        </p>
      </div>

      <div class="seo-faq-rail" role="tablist" aria-label="SEO FAQ topics">
        <button
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="seo-faq-tab"
          :class="{ 'seo-tab-active': i === 0 }"
          :data-tab="i"
          role="tab"
          :aria-selected="i === 0 ? 'true' : 'false'"
          aria-controls="seo-faq-stage"
        >
          <span class="seo-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="seo-tab-q">{{ ['Pricing', 'Timeline', 'Guarantees', 'SEO vs Ads'][i] }}</span>
        </button>
      </div>

      <div class="seo-faq-stage" id="seo-faq-stage" role="tabpanel">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q + '-answer'"
          class="seo-faq-answer"
          :class="{ 'd-none': i !== 0 }"
          :data-answer="i"
        >
          <h3 class="seo-answer-q">{{ faq.q }}</h3>
          <p class="seo-answer-body">{{ faq.body }}</p>
          <p v-if="faq.note" class="seo-answer-note">{{ faq.note }}</p>
          <a v-if="faq.link" :href="faq.link" class="seo-answer-link">{{ faq.linkText }} &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="seo-cta-section">
    <div class="seo-cta-inner">
      <h2 class="seo-cta-title">
        Ready to Get Found by <span class="text-ly">More of the Right Customers?</span>
      </h2>
      <p class="seo-cta-sub">
        A 20-minute call costs you nothing and tells you exactly where your current SEO is
        leaving traffic on the table.
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
.seo-include-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .seo-include-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .seo-include-section { padding: 3rem 1.25rem; }
}

.seo-include-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.seo-include-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .seo-include-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .seo-include-grid { grid-template-columns: 1fr; }
}

.seo-include-card {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);

    .seo-include-icon {
      background: rgba(250, 204, 21, 0.55);
    }
  }
}

.seo-include-icon {
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

.seo-include-icon .material-symbols-outlined {
  font-size: 1.35rem;
}

.seo-include-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.seo-include-desc {
  font-size: 0.86rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0;
}

/* ─── Recent Work ────────────────────────────────────────────────────── */
.seo-work-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .seo-work-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .seo-work-section { padding: 3rem 1.25rem; }
}

.seo-work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.seo-work-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.seo-work-link:hover { color: #b45309; }

.seo-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .seo-work-grid { grid-template-columns: 1fr; }
}

.seo-work-card {
  display: block;
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.seo-work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.seo-work-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f1f5f9;
}

.seo-work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.seo-work-card:hover .seo-work-thumb img {
  transform: scale(1.05);
}

.seo-work-body {
  padding: 1.5rem;
  background: #fff;
}

.seo-work-tag {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.seo-work-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.seo-work-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.seo-work-metric-val {
  font-size: 1.1rem;
  font-weight: 900;
  color: #facc15;
  font-variant-numeric: tabular-nums;
}

.seo-work-metric-label {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

/* ─── Process ────────────────────────────────────────────────────────── */
.seo-process-section {
  padding: 6rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

@media (max-width: 1100px) {
  .seo-process-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .seo-process-section { padding: 3rem 1.25rem; }
}

.seo-process-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.seo-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .seo-process-steps { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .seo-process-steps { grid-template-columns: 1fr; }
}

.seo-process-step {
  background: #fff;
  padding: 2.25rem 1.75rem;
  position: relative;
  overflow: hidden;
}

.seo-process-step::before {
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

.seo-ps-icon {
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

.seo-ps-icon .material-symbols-outlined {
  font-size: 1.2rem;
}

.seo-ps-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.55rem;
  position: relative;
  z-index: 1;
}

.seo-ps-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.65;
  margin-bottom: 0.9rem;
  position: relative;
  z-index: 1;
}

.seo-ps-week {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
.seo-faq-section {
  padding: 6rem 1.5rem;
  background: #f8fafc;
  overflow: hidden;
}

@media (max-width: 768px) {
  .seo-faq-section { padding: 4rem 1.25rem; }
}

.seo-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.seo-faq-header {
  margin-bottom: 3rem;
  text-align: center;
}

.seo-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.seo-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.seo-faq-tab {
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

.seo-faq-tab:hover {
  background: rgba(250, 204, 21, 0.06);
}

.seo-faq-tab:hover .seo-tab-num { color: #facc15; }
.seo-faq-tab:hover .seo-tab-q { color: #0f172a; }

.seo-faq-tab.seo-tab-active .seo-tab-num { color: #facc15; }
.seo-faq-tab.seo-tab-active .seo-tab-q { color: #0f172a; font-weight: 700; }

.seo-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.seo-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.seo-faq-stage {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  min-height: 220px;
  position: relative;
}

@media (max-width: 640px) {
  .seo-faq-stage { padding: 1.75rem; }
}

.seo-answer-q {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.seo-answer-body {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
}

.seo-answer-note {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.seo-answer-link {
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

.seo-answer-link:hover { gap: 0.5rem; }

/* ─── Closing CTA ────────────────────────────────────────────────────── */
.seo-cta-section {
  padding: 7rem 4rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .seo-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .seo-cta-section { padding: 4rem 1.25rem; }
}

.seo-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.seo-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

.seo-cta-sub {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.75;
}
</style>