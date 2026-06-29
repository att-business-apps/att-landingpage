<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  {
    icon: "conversion_path",
    title: "Funnel Strategy & Mapping",
    desc: "Map every customer touchpoint—from first click to closed deal—so your funnel works as one connected growth system.",
  },
  {
    icon: "web",
    title: "High-Converting Landing Pages",
    desc: "Conversion-focused landing pages built around one clear offer, persuasive messaging, and a single goal—more qualified enquiries.",
  },
  {
    icon: "fact_check",
    title: "Lead Qualification Forms",
    desc: "Smart forms that filter serious prospects, reduce spam, and help your sales team focus on high-intent leads.",
  },
  {
    icon: "sync_alt",
    title: "CRM & Automation Integration",
    desc: "Automatically send leads into your CRM, trigger follow-ups, and ensure every enquiry is captured and nurtured.",
  },
  {
    icon: "ads_click",
    title: "Paid Traffic Alignment",
    desc: "Google, Meta, and LinkedIn campaigns aligned with landing pages to maximize conversion rates and reduce acquisition costs.",
  },
  {
    icon: "analytics",
    title: "Conversion Tracking & Reporting",
    desc: "Track every click, form submission, phone call, and conversion so you know exactly which campaigns generate revenue.",
  },
  {
    icon: "mark_email_read",
    title: "Email & Follow-Up Automation",
    desc: "Automated email sequences nurture new leads, reduce response time, and increase sales opportunities without manual effort.",
  },
  {
    icon: "trending_up",
    title: "Lead Quality Optimization",
    desc: "Continuous testing and optimization improve lead quality, conversion rates, and cost per acquisition over time.",
  },
];

const steps = [
  {
    num: "01",
    icon: "manage_search",
    title: "Audit & Strategy",
    desc: "We review your current funnel (or starting point), your offer, and your audience before designing anything.",
    week: "Week 1",
  },
  {
    num: "02",
    icon: "account_tree",
    title: "Funnel & Page Design",
    desc: "Landing pages and forms designed around a single conversion goal, built on proven structure, not guesswork.",
    week: "Week 1–2",
  },
  {
    num: "03",
    icon: "sync_alt",
    title: "Integrate & Automate",
    desc: "CRM, email, and notification systems wired in, so qualified leads reach your team the moment they convert.",
    week: "Week 2–3",
  },
  {
    num: "04",
    icon: "task_alt",
    title: "Launch & Optimize",
    desc: "Go live with tracking confirmed, then iterate on real conversion data — not assumptions — in the weeks after.",
    week: "Week 3–4",
  },
];

const work = [
  {
    name: "SteadyAsset",
    tag: "Brand Identity · UI/UX · Website",
    metricVal: "8.44x",
    metricLabel: "ROAS",
    img: new URL("../../assets/img/project/c4/project-thum-sa.png", import.meta.url).href,
    href: "/project/steadyasset",
  },
  {
    name: "SaveDesk",
    tag: "Full Redesign · UI/UX",
    metricVal: "+42%",
    metricLabel: "Conversion",
    img: new URL("../../assets/img/project/c7/project-thum-sd.png", import.meta.url).href,
    href: "/project/savedesk",
  },
  {
    name: "Samsiddhi Designs",
    tag: "Brand Identity · UI/UX · Website",
    metricVal: "3.5x",
    metricLabel: "Pipeline",
    img: new URL("../../assets/img/project/c9/project-thum-sd.png", import.meta.url).href,
    href: "/project/samsiddhi-designs",
  },
];

const faqs = [
  {
    q: "How much does a lead generation system cost?",
    body: "Most lead generation engagements fall between ₹50,000 and ₹3,00,000, depending on the number of funnels, integrations, and whether paid traffic management is included. We scope exact pricing after understanding your offer and goals.",
    note: "No fixed packages. Scope drives price, not the other way round.",
  },
  {
    q: "How long until I start seeing leads?",
    body: "Most funnels go live in 3–4 weeks from strategy to launch. If paid traffic is driving visitors, leads can start coming in within days of launch — though optimization continues after that.",
    note: "Timelines are agreed upfront and tracked at every milestone.",
  },
  {
    q: "Do you also manage the ad campaigns?",
    body: "We can. Many clients pair this service with our digital marketing or LinkedIn marketing services so the funnel and the traffic driving it are built by the same team, with no gap in messaging.",
    link: "/digital-marketing",
    linkText: "See our digital marketing service",
  },
  {
    q: "What counts as a 'qualified' lead?",
    body: "We define qualification criteria with you upfront — budget, timeline, fit — and build forms and scoring around it, so the leads reaching your team are ones worth a follow-up call, not just an email address.",
    note: "Quality is designed in, not filtered after the fact.",
  },
];

let gsapContext;

function initFaqTabs() {
  const rail = document.querySelector(".lg-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".lg-faq-tab");
  const answers = document.querySelectorAll(".lg-faq-answer");
  const stage = document.querySelector(".lg-faq-stage");
  let active = 0;

  const ticker = document.createElement("div");
  ticker.className = "lg-tab-ticker";
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

    tabs[active].classList.remove("lg-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("lg-tab-active");
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
    gsap.utils.toArray(".lg-include-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".lg-process-step", {
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".lg-process-steps", start: "top 80%", once: true },
    });

    gsap.utils.toArray(".lg-work-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".lg-faq-rail, .lg-faq-stage", {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".lg-faq-section", start: "top 78%", once: true },
    });

    gsap.from(".lg-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".lg-cta-section", start: "top 80%", once: true },
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
                    <li class="active text-ly">Lead Generation</li>
                </ul>
                <div class="section-heading heading-left">
                <h1 class="title h2 mb-0">
                    Turn Traffic Into a <span class="text-ly">Predictable Pipeline</span>.
                </h1>
                <p>
                    Landing pages, funnels, automation, and tracking built to consistently generate leads that convert into customers.
                </p>
                </div>
            </div>
            <div class="banner-thumbnail " style="right: 100px;bottom: 0px;">
                <div class=""
                style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../../assets/img/amorboy/laptop-poses-banner.png" class="w-75 animate__animated slideInRight"
                    style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
    </div>

  <!-- What's Included -->
  <section class="lg-include-section">
    <div class="lg-include-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">What's Included</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Every Funnel Engagement <span class="text-ly">Covers This</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          Every lead generation system follows the same proven framework—from funnel strategy and landing pages to CRM automation and conversion tracking—so every lead has a clear path to becoming a customer.
        </p>
      </div>

      <div class="lg-include-grid">
        <div v-for="item in includes" :key="item.title" class="lg-include-card">
          <div class="lg-include-icon">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>
          <h3 class="lg-include-title">{{ item.title }}</h3>
          <p class="lg-include-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="lg-process-section" id="process">
    <div class="lg-process-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Our Process</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            From First Click to <span class="text-ly">Closed Deal</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          A defined sequence, not an open-ended back-and-forth — so you always know what happens
          next and when.
        </p>
      </div>

      <div class="lg-process-steps">
        <div v-for="step in steps" :key="step.num" class="lg-process-step" :data-step="step.num">
          <div class="lg-ps-icon">
            <span class="material-symbols-outlined">{{ step.icon }}</span>
          </div>
          <div class="lg-ps-title">{{ step.title }}</div>
          <div class="lg-ps-desc">{{ step.desc }}</div>
          <div class="lg-ps-week">{{ step.week }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Work -->
  <section class="lg-work-section">
    <div class="lg-work-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Recent Work</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Funnels That <span class="text-ly">Shipped & Performed</span>
          </h2>
        </div>
        <a href="/case-studies" class="lg-work-link">View all case studies →</a>
      </div>

      <div class="lg-work-grid">
        <a v-for="item in work" :key="item.name" :href="item.href" class="lg-work-card">
          <div class="lg-work-thumb">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="lg-work-body">
            <div class="lg-work-tag">{{ item.tag }}</div>
            <div class="lg-work-name">{{ item.name }}</div>
            <div class="lg-work-metric">
              <span class="lg-work-metric-val">{{ item.metricVal }}</span>
              <span class="lg-work-metric-label">{{ item.metricLabel }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="lg-faq-section" id="faq">
    <div class="lg-faq-inner">
      <div class="lg-faq-header">
        <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span class="text-ly">Common Questions</span>
        </div>
        <h2 class="font-bold text-dark mb-3" style="font-weight: 600">
          Questions We Hear <span class="text-ly">Before a Project Starts</span>
        </h2>
        <p class="text-slate-500 max-w-md mx-auto mb-0 text-sm">
          What clients usually want to know before committing to a lead generation project.
        </p>
      </div>

      <div class="lg-faq-rail" role="tablist" aria-label="Lead generation FAQ topics">
        <button
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="lg-faq-tab"
          :class="{ 'lg-tab-active': i === 0 }"
          :data-tab="i"
          role="tab"
          :aria-selected="i === 0 ? 'true' : 'false'"
          aria-controls="lg-faq-stage"
        >
          <span class="lg-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="lg-tab-q">{{ ['Pricing', 'Timeline', 'Ad Management', 'Lead Quality'][i] }}</span>
        </button>
      </div>

      <div class="lg-faq-stage" id="lg-faq-stage" role="tabpanel">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q + '-answer'"
          class="lg-faq-answer"
          :class="{ 'd-none': i !== 0 }"
          :data-answer="i"
        >
          <h3 class="lg-answer-q">{{ faq.q }}</h3>
          <p class="lg-answer-body">{{ faq.body }}</p>
          <p v-if="faq.note" class="lg-answer-note">{{ faq.note }}</p>
          <a v-if="faq.link" :href="faq.link" class="lg-answer-link">{{ faq.linkText }} &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="lg-cta-section">
    <div class="lg-cta-inner">
      <h2 class="lg-cta-title">
        Ready for a Pipeline That <span class="text-ly">Fills Itself?</span>
      </h2>
      <p class="lg-cta-sub">
        A 20-minute call costs you nothing and tells you exactly where your current funnel is
        losing qualified leads.
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
.lg-include-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .lg-include-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .lg-include-section { padding: 3rem 1.25rem; }
}

.lg-include-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.lg-include-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .lg-include-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .lg-include-grid { grid-template-columns: 1fr; }
}

.lg-include-card {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);

    .lg-include-icon {
      background: rgba(250, 204, 21, 0.55);
    }
  }
}

.lg-include-icon {
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

.lg-include-icon .material-symbols-outlined {
  font-size: 1.35rem;
}

.lg-include-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.lg-include-desc {
  font-size: 0.86rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0;
}

/* ─── Process ────────────────────────────────────────────────────────── */
.lg-process-section {
  padding: 6rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

@media (max-width: 1100px) {
  .lg-process-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .lg-process-section { padding: 3rem 1.25rem; }
}

.lg-process-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.lg-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .lg-process-steps { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .lg-process-steps { grid-template-columns: 1fr; }
}

.lg-process-step {
  background: #fff;
  padding: 2.25rem 1.75rem;
  position: relative;
  overflow: hidden;
}

.lg-process-step::before {
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

.lg-ps-icon {
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

.lg-ps-icon .material-symbols-outlined {
  font-size: 1.2rem;
}

.lg-ps-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.55rem;
  position: relative;
  z-index: 1;
}

.lg-ps-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.65;
  margin-bottom: 0.9rem;
  position: relative;
  z-index: 1;
}

.lg-ps-week {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

/* ─── Recent Work ────────────────────────────────────────────────────── */
.lg-work-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .lg-work-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .lg-work-section { padding: 3rem 1.25rem; }
}

.lg-work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.lg-work-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.lg-work-link:hover { color: #b45309; }

.lg-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .lg-work-grid { grid-template-columns: 1fr; }
}

.lg-work-card {
  display: block;
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.lg-work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.lg-work-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f1f5f9;
}

.lg-work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.lg-work-card:hover .lg-work-thumb img {
  transform: scale(1.05);
}

.lg-work-body {
  padding: 1.5rem;
  background: #fff;
}

.lg-work-tag {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.lg-work-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.lg-work-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.lg-work-metric-val {
  font-size: 1.1rem;
  font-weight: 900;
  color: #facc15;
  font-variant-numeric: tabular-nums;
}

.lg-work-metric-label {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
.lg-faq-section {
  padding: 6rem 1.5rem;
  background: #f8fafc;
  overflow: hidden;
}

@media (max-width: 768px) {
  .lg-faq-section { padding: 4rem 1.25rem; }
}

.lg-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.lg-faq-header {
  margin-bottom: 3rem;
  text-align: center;
}

.lg-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.lg-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.lg-faq-tab {
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

.lg-faq-tab:hover {
  background: rgba(250, 204, 21, 0.06);
}

.lg-faq-tab:hover .lg-tab-num { color: #facc15; }
.lg-faq-tab:hover .lg-tab-q { color: #0f172a; }

.lg-faq-tab.lg-tab-active .lg-tab-num { color: #facc15; }
.lg-faq-tab.lg-tab-active .lg-tab-q { color: #0f172a; font-weight: 700; }

.lg-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.lg-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.lg-faq-stage {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  min-height: 220px;
  position: relative;
}

@media (max-width: 640px) {
  .lg-faq-stage { padding: 1.75rem; }
}

.lg-answer-q {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.lg-answer-body {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
}

.lg-answer-note {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.lg-answer-link {
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

.lg-answer-link:hover { gap: 0.5rem; }

/* ─── Closing CTA ────────────────────────────────────────────────────── */
.lg-cta-section {
  padding: 7rem 4rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .lg-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .lg-cta-section { padding: 4rem 1.25rem; }
}

.lg-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.lg-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

.lg-cta-sub {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.75;
}
</style>