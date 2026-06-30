<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  {
    icon: "security",
    title: "Security Monitoring & Updates",
    desc: "Protect your website with regular security patches, vulnerability monitoring, and dependency updates before issues become threats.",
  },
  {
    icon: "cloud_sync",
    title: "Automated Backups",
    desc: "Automated daily backups with secure off-site storage and fast recovery, so unexpected issues never become business disasters.",
  },
  {
    icon: "speed",
    title: "Performance Monitoring",
    desc: "Monitor uptime, Core Web Vitals, and server performance continuously to keep your website fast and reliable.",
  },
  {
    icon: "account_tree",
    title: "Git Version Control & CI/CD",
    desc: "Every code change is managed in GitHub with automated CI/CD deployments to DigitalOcean, ensuring safe releases, rollback capability, and zero manual deployment errors.",
  },
  {
    icon: "edit_note",
    title: "Content & Minor Updates",
    desc: "Need text, images, banners, or minor layout changes? We handle routine website updates quickly without requiring a full development cycle.",
  },
  {
    icon: "support_agent",
    title: "Priority Technical Support",
    desc: "Direct access to the team that built your website for faster issue resolution, technical guidance, and ongoing improvements.",
  },
  {
    icon: "dns",
    title: "DigitalOcean Cloud Infrastructure",
    desc: "Enterprise-grade hosting on DigitalOcean with scalable cloud infrastructure, SSL, server monitoring, and optimized deployment pipelines.",
  },
];

const steps = [
  {
    num: "01",
    icon: "manage_search",
    title: "Site Audit",
    desc: "We review your current site's security, performance, and technical health before setting up any maintenance plan.",
    week: "Week 1",
  },
  {
    num: "02",
    icon: "backup",
    title: "Setup & Baseline",
    desc: "Monitoring, backups, and update schedules configured, with a clean baseline established for ongoing tracking.",
    week: "Week 1",
  },
  {
    num: "03",
    icon: "security",
    title: "Ongoing Monitoring",
    desc: "Updates, backups, and uptime checks run on schedule in the background, with issues flagged before they escalate.",
    week: "Ongoing",
  },
  {
    num: "04",
    icon: "task_alt",
    title: "Monthly Reporting",
    desc: "A clear monthly summary of what was updated, fixed, and monitored, so maintenance never feels like a black box.",
    week: "Monthly",
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
    q: "How much does website maintenance cost?",
    body: "Most maintenance plans fall between ₹5,000 and ₹25,000 per month, depending on site complexity and how much content/update support is included. We scope exact pricing after reviewing your site.",
    note: "No fixed packages. Scope drives price, not the other way round.",
  },
  {
    q: "Do I need maintenance if my site already works fine?",
    body: "Yes — most sites that 'work fine' are quietly accumulating outdated plugins, unpatched vulnerabilities, and slowing performance. Maintenance catches problems before visitors or search engines notice.",
    note: "Prevention is far cheaper than fixing a hacked or broken site.",
  },
  {
    q: "What happens if my site goes down?",
    body: "Uptime monitoring alerts us immediately, and we work to restore the site as a priority — not as a ticket in a generic queue. Recent backups mean most issues are a quick rollback, not a rebuild.",
    note: "Response time depends on your plan, but downtime is always priority one.",
  },
  {
    q: "Can you take over maintenance for a site you didn't build?",
    body: "Yes. We start with a technical audit to understand the existing setup before taking on ongoing maintenance, so we're not flying blind on a site we didn't originally build.",
    link: "/estimate",
    linkText: "Get a quote for your existing site",
  },
];

let gsapContext;

function initFaqTabs() {
  const rail = document.querySelector(".wm-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".wm-faq-tab");
  const answers = document.querySelectorAll(".wm-faq-answer");
  const stage = document.querySelector(".wm-faq-stage");
  let active = 0;

  const ticker = document.createElement("div");
  ticker.className = "wm-tab-ticker";
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

    tabs[active].classList.remove("wm-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("wm-tab-active");
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
    gsap.utils.toArray(".wm-include-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray(".wm-work-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".wm-process-step", {
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".wm-process-steps", start: "top 80%", once: true },
    });

    gsap.from(".wm-faq-rail, .wm-faq-stage", {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".wm-faq-section", start: "top 78%", once: true },
    });

    gsap.from(".wm-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".wm-cta-section", start: "top 80%", once: true },
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
                    <li class="active text-ly">Website Maintenance</li>
                </ul>
                <div class="section-heading heading-left">
                <h1 class="title h2 mb-0">
                    Keep Your Website <span class="text-ly">Secure, Fast & Future-Ready.</span>
                </h1>
                <p>
                    Protect your investment with proactive maintenance, performance optimization, security updates, and continuous technical support.
                </p>
                </div>
            </div>
            <div class="banner-thumbnail " style="right: -150px;bottom: 40px;">
                <div class=""
                style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../../assets/img/amorboy/am-doing.png" class="w-50 animate__animated slideInRight"
                    style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
    </div>

  <!-- What's Included -->
  <section class="wm-include-section">
    <div class="wm-include-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">What's Included</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Every Maintenance Plan <span class="text-ly">Covers This</span>
          </h2> 
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          Every maintenance plan includes proactive security, performance monitoring, GitHub version control, and automated DigitalOcean deployments—keeping your website secure, stable, and always ready for growth.
        </p>
      </div>

      <div class="wm-include-grid">
        <div v-for="item in includes" :key="item.title" class="wm-include-card">
          <div class="wm-include-icon">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>
          <h3 class="wm-include-title">{{ item.title }}</h3>
          <p class="wm-include-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="wm-process-section" id="process">
    <div class="wm-process-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Our Process</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            From First Audit to <span class="text-ly">Ongoing Peace of Mind</span>
          </h2>
        </div>
        <p class="text-slate-500 max-w-sm mb-0 text-sm">
          A defined sequence, not an open-ended back-and-forth — so you always know what happens
          next and when.
        </p>
      </div>

      <div class="wm-process-steps">
        <div v-for="step in steps" :key="step.num" class="wm-process-step" :data-step="step.num">
          <div class="wm-ps-icon">
            <span class="material-symbols-outlined">{{ step.icon }}</span>
          </div>
          <div class="wm-ps-title">{{ step.title }}</div>
          <div class="wm-ps-desc">{{ step.desc }}</div>
          <div class="wm-ps-week">{{ step.week }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Work -->
  <section class="wm-work-section">
    <div class="wm-work-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Recent Work</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Sites We <span class="text-ly">Built & Keep Running</span>
          </h2>
        </div>
        <a href="/case-studies" class="wm-work-link">View all case studies →</a>
      </div>

      <div class="wm-work-grid">
        <a v-for="item in work" :key="item.name" :href="item.href" class="wm-work-card">
          <div class="wm-work-thumb">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="wm-work-body">
            <div class="wm-work-tag">{{ item.tag }}</div>
            <div class="wm-work-name">{{ item.name }}</div>
            <div class="wm-work-metric">
              <span class="wm-work-metric-val">{{ item.metricVal }}</span>
              <span class="wm-work-metric-label">{{ item.metricLabel }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="wm-faq-section" id="faq">
    <div class="wm-faq-inner">
      <div class="wm-faq-header">
        <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span class="text-ly">Common Questions</span>
        </div>
        <h2 class="font-bold text-dark mb-3" style="font-weight: 600">
          Questions We Hear <span class="text-ly">Before a Plan Starts</span>
        </h2>
        <p class="text-slate-500 max-w-md mx-auto mb-0 text-sm">
          What clients usually want to know before committing to a maintenance plan.
        </p>
      </div>

      <div class="wm-faq-rail" role="tablist" aria-label="Website maintenance FAQ topics">
        <button
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="wm-faq-tab"
          :class="{ 'wm-tab-active': i === 0 }"
          :data-tab="i"
          role="tab"
          :aria-selected="i === 0 ? 'true' : 'false'"
          aria-controls="wm-faq-stage"
        >
          <span class="wm-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="wm-tab-q">{{ ['Pricing', 'Why Bother', 'Downtime', 'Existing Sites'][i] }}</span>
        </button>
      </div>

      <div class="wm-faq-stage" id="wm-faq-stage" role="tabpanel">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q + '-answer'"
          class="wm-faq-answer"
          :class="{ 'd-none': i !== 0 }"
          :data-answer="i"
        >
          <h3 class="wm-answer-q">{{ faq.q }}</h3>
          <p class="wm-answer-body">{{ faq.body }}</p>
          <p v-if="faq.note" class="wm-answer-note">{{ faq.note }}</p>
          <a v-if="faq.link" :href="faq.link" class="wm-answer-link">{{ faq.linkText }} &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="wm-cta-section">
    <div class="wm-cta-inner">
      <h2 class="wm-cta-title">
        Ready to Stop Worrying <span class="text-ly">About Your Website?</span>
      </h2>
      <p class="wm-cta-sub">
        A 20-minute call costs you nothing and tells you exactly how exposed your current site
        is to security and performance issues.
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
.wm-include-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .wm-include-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .wm-include-section { padding: 3rem 1.25rem; }
}

.wm-include-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.wm-include-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .wm-include-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .wm-include-grid { grid-template-columns: 1fr; }
}

.wm-include-card {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);

    .wm-include-icon {
      background: rgba(250, 204, 21, 0.55);
    }
  }
}

.wm-include-icon {
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

.wm-include-icon .material-symbols-outlined {
  font-size: 1.35rem;
}

.wm-include-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.wm-include-desc {
  font-size: 0.86rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0;
}

/* ─── Recent Work ────────────────────────────────────────────────────── */
.wm-work-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .wm-work-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .wm-work-section { padding: 3rem 1.25rem; }
}

.wm-work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.wm-work-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.wm-work-link:hover { color: #b45309; }

.wm-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .wm-work-grid { grid-template-columns: 1fr; }
}

.wm-work-card {
  display: block;
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.wm-work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.wm-work-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f1f5f9;
}

.wm-work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.wm-work-card:hover .wm-work-thumb img {
  transform: scale(1.05);
}

.wm-work-body {
  padding: 1.5rem;
  background: #fff;
}

.wm-work-tag {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.wm-work-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.wm-work-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.wm-work-metric-val {
  font-size: 1.1rem;
  font-weight: 900;
  color: #facc15;
  font-variant-numeric: tabular-nums;
}

.wm-work-metric-label {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

/* ─── Process ────────────────────────────────────────────────────────── */
.wm-process-section {
  padding: 6rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

@media (max-width: 1100px) {
  .wm-process-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .wm-process-section { padding: 3rem 1.25rem; }
}

.wm-process-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.wm-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .wm-process-steps { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .wm-process-steps { grid-template-columns: 1fr; }
}

.wm-process-step {
  background: #fff;
  padding: 2.25rem 1.75rem;
  position: relative;
  overflow: hidden;
}

.wm-process-step::before {
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

.wm-ps-icon {
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

.wm-ps-icon .material-symbols-outlined {
  font-size: 1.2rem;
}

.wm-ps-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.55rem;
  position: relative;
  z-index: 1;
}

.wm-ps-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.65;
  margin-bottom: 0.9rem;
  position: relative;
  z-index: 1;
}

.wm-ps-week {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
.wm-faq-section {
  padding: 6rem 1.5rem;
  background: #f8fafc;
  overflow: hidden;
}

@media (max-width: 768px) {
  .wm-faq-section { padding: 4rem 1.25rem; }
}

.wm-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.wm-faq-header {
  margin-bottom: 3rem;
  text-align: center;
}

.wm-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.wm-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.wm-faq-tab {
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

.wm-faq-tab:hover {
  background: rgba(250, 204, 21, 0.06);
}

.wm-faq-tab:hover .wm-tab-num { color: #facc15; }
.wm-faq-tab:hover .wm-tab-q { color: #0f172a; }

.wm-faq-tab.wm-tab-active .wm-tab-num { color: #facc15; }
.wm-faq-tab.wm-tab-active .wm-tab-q { color: #0f172a; font-weight: 700; }

.wm-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.wm-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.wm-faq-stage {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  min-height: 220px;
  position: relative;
}

@media (max-width: 640px) {
  .wm-faq-stage { padding: 1.75rem; }
}

.wm-answer-q {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.wm-answer-body {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
}

.wm-answer-note {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.wm-answer-link {
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

.wm-answer-link:hover { gap: 0.5rem; }

/* ─── Closing CTA ────────────────────────────────────────────────────── */
.wm-cta-section {
  padding: 7rem 4rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .wm-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .wm-cta-section { padding: 4rem 1.25rem; }
}

.wm-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.wm-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

.wm-cta-sub {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.75;
}
</style>