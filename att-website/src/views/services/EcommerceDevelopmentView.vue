<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  {
    icon: "shopping_cart",
    title: "Conversion-Optimized Storefront",
    desc: "Design every product, category, and checkout page to reduce friction, build trust, and convert more visitors into paying customers.",
  },
  {
    icon: "payments",
    title: "Secure Payment Integration",
    desc: "Fast, secure checkout with trusted payment gateways that reduce cart abandonment and give customers confidence to complete every purchase.",
  },
  {
    icon: "inventory_2",
    title: "Inventory & Catalog Management",
    desc: "Organize products, collections, variants, and inventory into a system that's easy to manage today and ready to scale tomorrow.",
  },
  {
    icon: "local_shipping",
    title: "Shipping & Fulfillment",
    desc: "Configure shipping rules, delivery zones, taxes, and fulfillment workflows that match how your business actually operates.",
  },
  {
    icon: "trending_up",
    title: "Analytics & Tracking Built In",
    desc: "Track every purchase, abandoned cart, conversion, and customer journey with GA4 and ecommerce analytics built in from day one.",
  },
  {
    icon: "verified_user",
    title: "Mobile-First & Secure",
    desc: "Optimized for mobile shoppers with fast loading, secure checkout, and seamless purchasing across every device.",
  },
];

const steps = [
  {
    num: "01",
    icon: "manage_search",
    title: "Store Strategy & Scoping",
    desc: "We map your catalog, payment needs, and fulfillment flow before choosing a platform or writing a line of code.",
    week: "Week 1",
  },
  {
    num: "02",
    icon: "account_tree",
    title: "Storefront & Catalog Setup",
    desc: "Core store structure, product catalog, and category architecture stood up — the foundation for everything after.",
    week: "Week 1–3",
  },
  {
    num: "03",
    icon: "design_services",
    title: "Design & Checkout Build",
    desc: "Storefront design, cart, and checkout flow built and connected to payment and shipping providers.",
    week: "Week 3–5",
  },
  {
    num: "04",
    icon: "task_alt",
    title: "Test & Launch",
    desc: "Full purchase-flow testing across devices and payment methods, then a clean go-live with tracking confirmed.",
    week: "Week 5–6",
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
    q: "How much does ecommerce development cost?",
    body: "Most ecommerce builds fall between ₹1,00,000 and ₹6,00,000, depending on catalog size, custom features, and payment/shipping integrations. We scope exact pricing after understanding your product range and platform needs.",
    note: "No fixed packages. Scope drives price, not the other way round.",
  },
  {
    q: "How long does an ecommerce project take?",
    body: "Most stores launch in 5–8 weeks from strategy to go-live. Catalog and storefront setup take 2–3 weeks, design and checkout build 2–3 weeks, with testing and launch in the final stretch.",
    note: "Timelines are agreed upfront and tracked at every milestone.",
  },
  {
    q: "Which ecommerce platforms do you build on?",
    body: "We work across Shopify, WooCommerce, and fully custom builds — the choice depends on your catalog complexity, budget, and how much control you need over checkout and integrations.",
    link: "/shopify-development",
    linkText: "See our dedicated Shopify development service",
  },
  {
    q: "Can you migrate my existing store?",
    body: "Yes. We handle migrations from other platforms with care for SEO, product data, and customer records — so you don't lose rankings, reviews, or order history in the switch.",
    note: "Migration timelines depend on catalog size and existing platform.",
  },
];

let gsapContext;

function initFaqTabs() {
  const rail = document.querySelector(".ecd-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".ecd-faq-tab");
  const answers = document.querySelectorAll(".ecd-faq-answer");
  const stage = document.querySelector(".ecd-faq-stage");
  let active = 0;

  const ticker = document.createElement("div");
  ticker.className = "ecd-tab-ticker";
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

    tabs[active].classList.remove("ecd-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("ecd-tab-active");
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
    gsap.utils.toArray(".ecd-include-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        delay: (i % 3) * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".ecd-process-step", {
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".ecd-process-steps", start: "top 80%", once: true },
    });

    gsap.utils.toArray(".ecd-work-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".ecd-faq-rail, .ecd-faq-stage", {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".ecd-faq-section", start: "top 78%", once: true },
    });

    gsap.from(".ecd-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".ecd-cta-section", start: "top 80%", once: true },
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
                    <li class="active text-ly">Ecommerce Development</li>
                </ul>
                <div class="section-heading heading-left">
                <h1 class="title h2 mb-0">
                    Ecommerce Stores That Convert More <span class="text-ly">Visitors Into Loyal Customers.</span>
                </h1>
                <p>
                    We build high-performance ecommerce experiences that increase conversions, simplify buying, and help brands grow revenue through better customer experiences.
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
  <section class="ecd-include-section">
    <div class="ecd-include-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">What's Included</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Every Store Engagement <span class="text-ly">Covers This</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          Every store is built with the same focus on conversion, performance, security, and long-term scalability—nothing important is treated as an add-on.
        </p>
      </div>

      <div class="ecd-include-grid">
        <div v-for="item in includes" :key="item.title" class="ecd-include-card">
          <div class="ecd-include-icon">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>
          <h3 class="ecd-include-title">{{ item.title }}</h3>
          <p class="ecd-include-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="ecd-process-section" id="process">
    <div class="ecd-process-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Our Process</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            From First Product to <span class="text-ly">First Sale</span>
          </h2>
        </div>
        <p class="text-slate-800 max-w-sm mb-0 text-sm">
          A defined sequence, not an open-ended back-and-forth — so you always know what happens
          next and when.
        </p>
      </div>

      <div class="ecd-process-steps">
        <div v-for="step in steps" :key="step.num" class="ecd-process-step" :data-step="step.num">
          <div class="ecd-ps-icon">
            <span class="material-symbols-outlined">{{ step.icon }}</span>
          </div>
          <div class="ecd-ps-title">{{ step.title }}</div>
          <div class="ecd-ps-desc">{{ step.desc }}</div>
          <div class="ecd-ps-week">{{ step.week }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Work -->
  <section class="ecd-work-section">
    <div class="ecd-work-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Recent Work</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            Stores That <span class="text-ly">Shipped & Sold</span>
          </h2>
        </div>
        <a href="/case-studies" class="ecd-work-link">View all case studies →</a>
      </div>

      <div class="ecd-work-grid">
        <a v-for="item in work" :key="item.name" :href="item.href" class="ecd-work-card">
          <div class="ecd-work-thumb">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="ecd-work-body">
            <div class="ecd-work-tag">{{ item.tag }}</div>
            <div class="ecd-work-name">{{ item.name }}</div>
            <div class="ecd-work-metric">
              <span class="ecd-work-metric-val">{{ item.metricVal }}</span>
              <span class="ecd-work-metric-label">{{ item.metricLabel }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="ecd-faq-section" id="faq">
    <div class="ecd-faq-inner">
      <div class="ecd-faq-header">
        <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span class="text-ly">Common Questions</span>
        </div>
        <h2 class="font-bold text-dark mb-3" style="font-weight: 600">
          Questions We Hear <span class="text-ly">Before a Project Starts</span>
        </h2>
        <p class="text-slate-500 max-w-md mx-auto mb-0 text-sm">
          What clients usually want to know before committing to an ecommerce development project.
        </p>
      </div>

      <div class="ecd-faq-rail" role="tablist" aria-label="Ecommerce development FAQ topics">
        <button
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="ecd-faq-tab"
          :class="{ 'ecd-tab-active': i === 0 }"
          :data-tab="i"
          role="tab"
          :aria-selected="i === 0 ? 'true' : 'false'"
          aria-controls="ecd-faq-stage"
        >
          <span class="ecd-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="ecd-tab-q">{{ ['Pricing', 'Timeline', 'Platforms', 'Migration'][i] }}</span>
        </button>
      </div>

      <div class="ecd-faq-stage" id="ecd-faq-stage" role="tabpanel">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q + '-answer'"
          class="ecd-faq-answer"
          :class="{ 'd-none': i !== 0 }"
          :data-answer="i"
        >
          <h3 class="ecd-answer-q">{{ faq.q }}</h3>
          <p class="ecd-answer-body">{{ faq.body }}</p>
          <p v-if="faq.note" class="ecd-answer-note">{{ faq.note }}</p>
          <a v-if="faq.link" :href="faq.link" class="ecd-answer-link">{{ faq.linkText }} &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="ecd-cta-section">
    <div class="ecd-cta-inner">
      <h2 class="ecd-cta-title">
        Ready for a Store That <span class="text-ly">Actually Sells?</span>
      </h2>
      <p class="ecd-cta-sub">
        A 20-minute call costs you nothing and tells you exactly where your current store is
        losing sales.
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
.ecd-include-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .ecd-include-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .ecd-include-section { padding: 3rem 1.25rem; }
}

.ecd-include-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.ecd-include-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .ecd-include-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .ecd-include-grid { grid-template-columns: 1fr; }
}

.ecd-include-card {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);

    .ecd-include-icon {
      background: rgba(250, 204, 21, 0.55);
    }
  }
}

.ecd-include-icon {
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

.ecd-include-icon .material-symbols-outlined {
  font-size: 1.35rem;
}

.ecd-include-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.ecd-include-desc {
  font-size: 0.86rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0;
}

/* ─── Process ────────────────────────────────────────────────────────── */
.ecd-process-section {
  padding: 6rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

@media (max-width: 1100px) {
  .ecd-process-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .ecd-process-section { padding: 3rem 1.25rem; }
}

.ecd-process-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.ecd-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .ecd-process-steps { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .ecd-process-steps { grid-template-columns: 1fr; }
}

.ecd-process-step {
  background: #fff;
  padding: 2.25rem 1.75rem;
  position: relative;
  overflow: hidden;
}

.ecd-process-step::before {
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

.ecd-ps-icon {
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

.ecd-ps-icon .material-symbols-outlined {
  font-size: 1.2rem;
}

.ecd-ps-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.55rem;
  position: relative;
  z-index: 1;
}

.ecd-ps-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.65;
  margin-bottom: 0.9rem;
  position: relative;
  z-index: 1;
}

.ecd-ps-week {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

/* ─── Recent Work ────────────────────────────────────────────────────── */
.ecd-work-section {
  padding: 6rem 4rem;
  background: #fff;
}

@media (max-width: 1100px) {
  .ecd-work-section { padding: 4rem 2rem; }
}

@media (max-width: 768px) {
  .ecd-work-section { padding: 3rem 1.25rem; }
}

.ecd-work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.ecd-work-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.ecd-work-link:hover { color: #b45309; }

.ecd-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .ecd-work-grid { grid-template-columns: 1fr; }
}

.ecd-work-card {
  display: block;
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.ecd-work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.ecd-work-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f1f5f9;
}

.ecd-work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.ecd-work-card:hover .ecd-work-thumb img {
  transform: scale(1.05);
}

.ecd-work-body {
  padding: 1.5rem;
  background: #fff;
}

.ecd-work-tag {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.ecd-work-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.ecd-work-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.ecd-work-metric-val {
  font-size: 1.1rem;
  font-weight: 900;
  color: #facc15;
  font-variant-numeric: tabular-nums;
}

.ecd-work-metric-label {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
.ecd-faq-section {
  padding: 6rem 1.5rem;
  background: #f8fafc;
  overflow: hidden;
}

@media (max-width: 768px) {
  .ecd-faq-section { padding: 4rem 1.25rem; }
}

.ecd-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.ecd-faq-header {
  margin-bottom: 3rem;
  text-align: center;
}

.ecd-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.ecd-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.ecd-faq-tab {
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

.ecd-faq-tab:hover {
  background: rgba(250, 204, 21, 0.06);
}

.ecd-faq-tab:hover .ecd-tab-num { color: #facc15; }
.ecd-faq-tab:hover .ecd-tab-q { color: #0f172a; }

.ecd-faq-tab.ecd-tab-active .ecd-tab-num { color: #facc15; }
.ecd-faq-tab.ecd-tab-active .ecd-tab-q { color: #0f172a; font-weight: 700; }

.ecd-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.ecd-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.ecd-faq-stage {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  min-height: 220px;
  position: relative;
}

@media (max-width: 640px) {
  .ecd-faq-stage { padding: 1.75rem; }
}

.ecd-answer-q {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.ecd-answer-body {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
}

.ecd-answer-note {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.ecd-answer-link {
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

.ecd-answer-link:hover { gap: 0.5rem; }

/* ─── Closing CTA ────────────────────────────────────────────────────── */
.ecd-cta-section {
  padding: 7rem 4rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .ecd-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .ecd-cta-section { padding: 4rem 1.25rem; }
}

.ecd-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.ecd-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

.ecd-cta-sub {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.75;
}
</style>