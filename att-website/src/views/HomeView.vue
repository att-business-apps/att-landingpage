<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const disableBtn = ref(false);
const from_name = ref("");
const email = ref("");
const phoneNumber = ref("");
const message = ref("");
const homePage = ref(null);
let gsapContext;
let pointerCleanup;
let structuredDataScript;

function injectStructuredData() {
  const siteUrl = "https://amortree.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Amortree Tech",
        url: siteUrl,
        logo: `${siteUrl}/favicon.ico`,
        description:
          "Amortree Tech is a digital growth agency in Bengaluru helping startups and growing businesses build strategic websites, UI/UX, and digital experiences that generate leads and accelerate growth.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        sameAs: [
          "https://linkedin.com/company/amortree-tech",
          "https://twitter.com/amortreetech",
          "https://facebook.com/amortreetech",
          "https://instagram.com/amortreetech",
        ],
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-leadgen`,
        name: "Lead Generation",
        provider: { "@id": `${siteUrl}/#organization` },
        description:
          "Conversion-focused landing pages, paid campaign structure, and CRM integration built for B2B and service businesses.",
        url: `${siteUrl}/lead-generation-systems`,
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-ecommerce`,
        name: "E-commerce Growth",
        provider: { "@id": `${siteUrl}/#organization` },
        description:
          "Checkout and product page optimization, performance creative, and retention flows for Shopify and custom stores.",
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-startup`,
        name: "Startup Launch",
        provider: { "@id": `${siteUrl}/#organization` },
        description:
          "Rapid product UI/UX prototyping, investor-ready pitch platforms, and a modern, scalable tech stack for founders.",
      },
      {
        "@type": "Review",
        itemReviewed: { "@id": `${siteUrl}/#organization` },
        author: { "@type": "Person", name: "Ganesh Moorthy" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "They did an excellent job on our website. They were highly understanding of our needs, thoughtful in their design approach, and very practical in aligning their ideas with our vision.",
      },
      {
        "@type": "Review",
        itemReviewed: { "@id": `${siteUrl}/#organization` },
        author: { "@type": "Person", name: "Sandeep L" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Outstanding work completed on time and to a high standard, reflecting real dedication and expertise.",
      },
      {
        "@type": "Review",
        itemReviewed: { "@id": `${siteUrl}/#organization` },
        author: { "@type": "Person", name: "Bharathkumar MS" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Amortree Tech is a pleasure to work with. They're responsive, professional, and always willing to go the extra mile.",
      },
      {
        "@type": "Review",
        itemReviewed: { "@id": `${siteUrl}/#organization` },
        author: { "@type": "Person", name: "Suresh Babu" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Good understanding of our needs from the start. A genuinely professional service provider, and a job well done.",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does a website cost at Amortree?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most engagements fall between ₹50,000 and ₹5,00,000, depending on scope.",
            },
          },
          {
            "@type": "Question",
            name: "How long does a project take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most projects run 4 to 10 weeks from strategy to launch.",
            },
          },
          {
            "@type": "Question",
            name: "Do you only build websites, or do you handle marketing too?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Amortree works across strategy, UX, development, SEO, and paid acquisition.",
            },
          },
          {
            "@type": "Question",
            name: "What industries does Amortree work with?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Real estate and professional service firms, SaaS and startup founders, and manufacturing and healthcare businesses.",
            },
          },
          {
            "@type": "Question",
            name: "What happens after I book a strategy call with Amortree?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Amortree reviews the prospective client's current site and metrics before the call.",
            },
          },
        ],
      },
    ],
  };

  structuredDataScript = document.createElement("script");
  structuredDataScript.type = "application/ld+json";
  structuredDataScript.text = JSON.stringify(structuredData);
  document.head.appendChild(structuredDataScript);
}

function sendMail() {
  var params = {
    from_name: from_name.value,
    to_name: "Admin",
    email: email.value,
    phoneNumber: phoneNumber.value,
    message: message.value,
  };

  const serviceID = "service_77crg6o";

  if (!params.from_name) { alert("Please enter your name"); return; }
  if (!params.email) { alert("Please enter your email"); return; }
  if (!params.phoneNumber) { alert("Please enter your phone number"); return; }
  if (!params.message) { alert("Please enter your requirement"); return; }

  disableBtn.value = true;
  emailjs.send(serviceID, getTemplate("admin"), params)
    .then((res) => { from_name.value = ""; email.value = ""; phoneNumber.value = ""; message.value = ""; disableBtn.value = false; })
    .catch((err) => console.log(err));
  emailjs.send(serviceID, getTemplate("customer"), params)
    .then((res) => { from_name.value = ""; email.value = ""; phoneNumber.value = ""; message.value = ""; disableBtn.value = false; })
    .catch((err) => console.log(err));
}

function getTemplate(target) {
  if (target == "admin") return "template_tcauze5";
  if (target == "customer") return "template_svj7071";
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ Tab Rail — pure GSAP, no Bootstrap JS dependency
// ─────────────────────────────────────────────────────────────────────────────
function initFaqTabs() {
  const rail = document.querySelector(".att-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".att-faq-tab");
  const answers = document.querySelectorAll(".att-faq-answer");
  const stage = document.querySelector(".att-faq-stage");
  let active = 0;

  // Underline ticker — a shared element that slides under the active tab
  const ticker = document.createElement("div");
  ticker.className = "att-tab-ticker";
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

    // Outgoing answer: fade + slide up
    const outEl = answers[active];
    gsap.to(outEl, {
      y: -10,
      autoAlpha: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => outEl.classList.add("d-none"),
    });

    // Incoming answer: prep + fade down in
    const inEl = answers[index];
    inEl.classList.remove("d-none");
    gsap.fromTo(inEl,
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.38, ease: "power3.out" }
    );

    // Stage: brief scale pulse to signal the swap
    gsap.fromTo(stage,
      { scaleX: 0.995, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.35, ease: "power2.out" }
    );

    // Tab states
    tabs[active].classList.remove("att-tab-active");
    tabs[active].setAttribute("aria-selected", "false");
    tabs[index].classList.add("att-tab-active");
    tabs[index].setAttribute("aria-selected", "true");
    positionTicker(tabs[index]);

    active = index;
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => showAnswer(i));
  });

  // Initial ticker position (after layout)
  requestAnimationFrame(() => positionTicker(tabs[0]));
  // Re-position on resize
  window.addEventListener("resize", () => positionTicker(tabs[active]), { passive: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// Recent Work — numbered row list animations (reference style)
// ─────────────────────────────────────────────────────────────────────────────
function animateWorkSection() {
  // Header title cascades in
  gsap.from(".att-work-title", {
    y: 60,
    autoAlpha: 0,
    duration: 1.1,
    ease: "expo.out",
    immediateRender: false,
    scrollTrigger: { trigger: ".att-work-section", start: "top 75%", once: true },
  });
  gsap.from(".att-work-header-right", {
    y: 30,
    autoAlpha: 0,
    duration: 0.9,
    delay: 0.15,
    ease: "power3.out",
    immediateRender: false,
    scrollTrigger: { trigger: ".att-work-section", start: "top 75%", once: true },
  });

  // Each row slides in from left, staggered
  gsap.utils.toArray(".att-cs-item").forEach((item) => {
    gsap.from(item, {
      x: -40,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: item, start: "top 88%", once: true },
    });
  });

  // Hover: translateX inner + show preview
  gsap.utils.toArray(".att-cs-item").forEach((item) => {
    const inner = item.querySelector(".att-cs-inner");
    const preview = item.querySelector(".att-cs-preview");

    item.addEventListener("mouseenter", () => {
      gsap.to(inner, { x: 8, duration: 0.35, ease: "power2.out" });
      if (preview) gsap.to(preview, { autoAlpha: 1, right: "80px", duration: 0.4, ease: "power3.out" });
    });
    item.addEventListener("mouseleave", () => {
      gsap.to(inner, { x: 0, duration: 0.35, ease: "power2.out" });
      if (preview) gsap.to(preview, { autoAlpha: 0, right: "-220px", duration: 0.3, ease: "power2.in" });
    });
  });

  // Arrow hover rotation
  gsap.utils.toArray(".att-cs-arrow").forEach((arrow) => {
    const item = arrow.closest(".att-cs-item");
    item.addEventListener("mouseenter", () => {
      gsap.to(arrow, { rotation: -45, duration: 0.3, ease: "power2.out" });
    });
    item.addEventListener("mouseleave", () => {
      gsap.to(arrow, { rotation: 0, duration: 0.3, ease: "power2.out" });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Process section — staggered step entrance + bottom-border hover line
// ─────────────────────────────────────────────────────────────────────────────
function animateProcessSection() {
  gsap.from(".att-process-title", {
    y: 60,
    autoAlpha: 0,
    duration: 1,
    ease: "expo.out",
    immediateRender: false,
    scrollTrigger: { trigger: ".att-process-section", start: "top 72%", once: true },
  });
  gsap.from(".att-process-sub", {
    y: 40,
    autoAlpha: 0,
    duration: 0.9,
    delay: 0.1,
    ease: "power3.out",
    immediateRender: false,
    scrollTrigger: { trigger: ".att-process-section", start: "top 72%", once: true },
  });
  gsap.from(".att-process-step", {
    y: 60,
    autoAlpha: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    immediateRender: false,
    scrollTrigger: { trigger: ".att-process-steps", start: "top 78%", once: true },
  });

  // Bottom-border swipe on hover (injected line element)
  document.querySelectorAll(".att-process-step").forEach((step) => {
    const line = document.createElement("div");
    line.className = "att-ps-hover-line";
    step.appendChild(line);

    step.addEventListener("mouseenter", () => {
      gsap.to(line, { width: "100%", duration: 0.4, ease: "power3.out" });
    });
    step.addEventListener("mouseleave", () => {
      gsap.to(line, { width: "0%", duration: 0.3, ease: "power2.in" });
    });
  });
}


function animateWhySection() {
  if (!homePage.value) return;

  // Header elements
  gsap.from(".att-why-heading, .att-why-sub", {
    y: 24,
    autoAlpha: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: "power2.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: ".att-why-section",
      start: "top 80%",
      once: true,
    },
  });

  // Label row
  gsap.from(".att-why-label-row > div", {
    autoAlpha: 0,
    y: 10,
    stagger: 0.12,
    duration: 0.5,
    ease: "power2.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: ".att-why-label-row",
      start: "top 88%",
      once: true,
    },
  });

  // Each pair: "before" wipes in from left, "after" wipes in from right
  // using clipPath so the reveal feels like a curtain opening
  document.querySelectorAll(".att-why-pair").forEach((pair, i) => {
    const before = pair.querySelector(".att-cell-before");
    const after = pair.querySelector(".att-cell-after");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pair,
        start: "top 85%",
        once: true,
      },
    });

    tl.fromTo(before,
      { clipPath: "inset(0 100% 0 0)", autoAlpha: 0 },
      { clipPath: "inset(0 0% 0 0)", autoAlpha: 1, duration: 0.55, ease: "power3.out" }
    )
    .fromTo(after,
      { clipPath: "inset(0 0 0 100%)", autoAlpha: 0 },
      { clipPath: "inset(0 0 0 0%)", autoAlpha: 1, duration: 0.55, ease: "power3.out" },
      "-=0.35"
    );

    // Icon: pop in after cells land
    tl.fromTo(pair.querySelectorAll(".att-cell-icon"),
      { scale: 0.4, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, stagger: 0.08, duration: 0.35, ease: "back.out(1.6)" },
      "-=0.2"
    );
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ Section entrance
// ─────────────────────────────────────────────────────────────────────────────
function animateFaqSection() {
  // Header
  gsap.from(".att-faq-heading, .att-faq-sub", {
    y: 22,
    autoAlpha: 0,
    stagger: 0.1,
    duration: 0.65,
    ease: "power2.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: ".att-faq-section",
      start: "top 80%",
      once: true,
    },
  });

  // Tab rail: each tab slides up from below in sequence
  gsap.from(".att-faq-tab", {
    y: 20,
    autoAlpha: 0,
    stagger: 0.07,
    duration: 0.5,
    ease: "power3.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: ".att-faq-rail",
      start: "top 88%",
      once: true,
    },
  });

  // Stage panel entrance
  gsap.from(".att-faq-stage", {
    y: 28,
    autoAlpha: 0,
    duration: 0.7,
    ease: "power3.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: ".att-faq-stage",
      start: "top 90%",
      once: true,
    },
  });
}

function animateHomePage() {
  if (!homePage.value) return;

  pointerCleanup?.();
  pointerCleanup = undefined;
  gsapContext?.revert();
  gsapContext = gsap.context(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const allMotionTargets = [
      ".home-motion-section",
      ".motion-card",
      ".motion-text",
      ".home-banner .title",
      ".home-banner .subtitle",
      ".banner-form",
      ".step-arrow",
      "#results .group",
      "#results img",
      "#reviews .glass-card",
    ];

    if (prefersReducedMotion) {
      gsap.set(allMotionTargets, { clearProps: "all" });
      return;
    }

    // Hero entrance
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".home-banner .inline-flex", { y: 16, autoAlpha: 0, duration: 0.6 })
      .fromTo(
        ".hero-title-token",
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, immediateRender: false },
        "-=0.2",
      )
      .from(".home-banner .h5 span", { y: 14, autoAlpha: 0, stagger: 0.06, duration: 0.5 }, "-=0.35")
      .from(".home-banner .subtitle", { y: 16, autoAlpha: 0, duration: 0.6 }, "-=0.3")
      .from(".home-banner .amor-btn", { y: 14, autoAlpha: 0, stagger: 0.06, duration: 0.5 }, "-=0.25")
      .from(".home-metric", { y: 16, autoAlpha: 0, stagger: 0.05, duration: 0.5 }, "-=0.2")
      .fromTo(
        ".banner-form",
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, immediateRender: false, clearProps: "opacity,visibility" },
        "-=0.35",
      );

    // Background shape drift on hero scroll
    gsap.to(".shape-group-banner .shape", {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: ".banner-style-1",
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    // Generic section reveals
    const pageSections = [...homePage.value.querySelectorAll(":scope > section:not(.d-none)")];

    pageSections.forEach((section) => {
      // Skip the two custom sections — they have their own animations
      if (section.classList.contains("att-why-section") || section.classList.contains("att-faq-section")) return;

      const headingItems = section.querySelectorAll("h2, h3, .section-heading, .motion-text");
      const cards = section.querySelectorAll(".motion-card, .review-card, .glass-card, .step-arrow, .project-grid, .why > div");

      if (headingItems.length) {
        gsap.from(headingItems, {
          y: 28, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none", once: true },
        });
      }

      if (cards.length) {
        gsap.from(cards, {
          y: 32, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none", once: true },
        });
      }
    });

    // Card hover lift
    gsap.utils.toArray(".motion-card, .review-card, .glass-card, .project-grid")
      .forEach((card) => {
        card.addEventListener("mouseenter", () => { gsap.to(card, { y: -4, duration: 0.25, ease: "power2.out" }); });
        card.addEventListener("mouseleave", () => { gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" }); });
      });

    // Why & FAQ custom animations
    animateWhySection();
    animateFaqSection();
    // Work & Process custom animations
    animateWorkSection();
    animateProcessSection();

    ScrollTrigger.refresh();
  }, homePage.value);
}

onMounted(async () => {
  injectStructuredData();
  await nextTick();
  animateHomePage();
  initFaqTabs();
});

onBeforeUnmount(() => {
  pointerCleanup?.();
  gsapContext?.revert();
  structuredDataScript?.remove();
});
</script>

<template>
  <main ref="homePage" class="home-motion-page">
    <div class="banner banner-style-1">
      <div class="container-fluid">
        <div class="row align-items-end align-items-xl-end">
          <div class="col-lg-10 mx-auto pb-5">
            <div class="home-banner banner-content text-center">
              <div class="animate__animated fadeInUp" style="animation-duration: 1s">
                <div class="flex justify-center mb-4">
                  <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
                    Strategy
                    <span class="animate-ping relative flex" style="animation-duration: 1.25s">→</span>
                    Design
                    <span class="animate-ping relative flex" style="animation-duration: 1s">→</span>
                    Development
                    <span class="animate-ping relative flex" style="animation-duration: 1.25s">→</span>
                    Growth
                  </div>
                </div>

                <h1 class="title hero-title d-inline" ref="myElement">
                  <span class="hero-title-token">Websites That Build Trust.</span>
                  <span class="hero-title-token hero-title-highlight text-ly">Generate Leads.</span>
                  <span class="hero-title-token hero-title-highlight gradient-text-light">Drive Growth.</span>
                </h1>
                <p class="subtitle w-75 md:w-100 mt-4">
                  We combine strategy, UX, development, SEO, and AI-ready optimization to create websites that become your highest-performing business asset.
                </p>

                <h2 class="h5 mt-4 flex items-center justify-center gap-3">
                  <span class="gradient-text yellow-light">Designed for businesses that are ready to grow—not just go online.</span>
                </h2>
                <div class="d-flex justify-content-center gap-3 mt-5">
                  <a class="amor-btn btn-fill-primary btn-large"
                    href="https://wa.me/917975859061/?text=I%20need%20to%20Book%20Your%20Free%20Strategy%20Call.">Book Your Free Strategy Call</a>
                  <a href="/case-studies" class="amor-btn btn-borderd light">Explore Case Studies</a>
                </div>
                <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
                  <div class="home-metric flex flex-col items-center justify-around">
                    <span class="text-3xl font-bold text-primary gradient-text blue-light">30+</span>
                    <span class="text-xs uppercase tracking-widest text-slate-300">Businesses Empowered</span>
                  </div>
                  <div class="home-metric flex flex-col items-center">
                    <span class="text-3xl font-bold text-primary gradient-text yellow-light">10+</span>
                    <span class="text-xs uppercase tracking-widest text-slate-300">Business Industries</span>
                  </div>
                  <div class="home-metric flex flex-col items-center">
                    <span class="text-3xl font-bold text-primary gradient-text green-light">98%</span>
                    <span class="text-xs uppercase tracking-widest text-slate-300">Client Satisfaction</span>
                  </div>
                  <div class="home-metric flex flex-col items-center">
                    <span class="text-3xl font-bold text-primary gradient-text text-lr">100%</span>
                    <span class="text-xs uppercase tracking-widest text-slate-300">Custom Designed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-none row align-items-end align-items-xl-end">
          <div class="amorboy animate__animated animate__slideInDown" style="animation-duration: 8s">
            <img src="../assets/img/amorboy/am-fly-1.png" alt="" />
            <img src="../assets/img/amorboy/am-doing.png" alt="" />
          </div>
          <div class="col-lg-5 col-md-10 mx-auto animate__animated fadeInUp" style="animation-duration: 2s">
            <div class="contact-form-box banner-form">
              <h3 class="title text-center">
                <span class="gradient-text blue-dark">Unlock</span> Your Online
                <span class="gradient-text yellow-dark">Potential</span>
              </h3>
              <form class="amor-contact-form">
                <div class="form-group mb--40">
                  <textarea name="contact-message" id="message" class="form-control textarea" v-model="message"
                    cols="30" rows="2" placeholder="How can we help you?" required></textarea>
                </div>
                <div class="form-group">
                  <input type="text" v-model="from_name" class="form-control" name="contact-name" placeholder="Your Name" required="" />
                </div>
                <div class="form-group">
                  <input type="email" v-model="email" class="form-control" name="contact-email" placeholder="Your Email" required />
                </div>
                <div class="form-group mb--40">
                  <input type="tel" class="form-control" v-model="phoneNumber" name="contact-phone" placeholder="Your Phone" required />
                </div>
                <div class="form-group">
                  <button @click="sendMail" type="button" class="amor-btn btn-borderd btn-fluid light" name="submit-btn" :disabled="disableBtn">
                    Get My Free Audit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ul class="list-unstyled shape-group-banner">
        <li class="shape shape-1"><img src="../assets/img/shapes/bubble-39.png" alt="Bubble" /></li>
        <li class="shape shape-2"><img src="../assets/img/shapes/bubble-38.png" alt="Bubble" /></li>
        <li class="shape shape-3"><img src="../assets/img/shapes/bubble-14.png" alt="Bubble" /></li>
        <li class="shape shape-4"><img src="../assets/img/shapes/bubble-14.png" alt="Bubble" /></li>
        <li class="shape shape-5"><img src="../assets/img/shapes/bubble-14.png" alt="Bubble" /></li>
        <li class="shape shape-6"><img src="../assets/img/shapes/bubble-40.png" alt="Bubble" /></li>
        <li class="shape shape-7"><img src="../assets/img/shapes/bubble-41.png" alt="Bubble" /></li>
        <li class="shape shape-8"><img src="../assets/img/shapes/bubble-14.png" alt="Bubble" /></li>
        <li class="shape shape-9"><img src="../assets/img/shapes/bubble-40.png" alt="Bubble" /></li>
      </ul>
    </div>

    <section class="home-motion-section bg-white py-24">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
          <div>
            <div class="inline-block py-2 px-4 rounded bg-dark text-brand-700 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <span class="text-ly">Who We Work With</span>
            </div>
            <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
              Not Every Business Needs a Better Website. <span class="d-inline text-ly">The Right Businesses Need a Better Growth Partner.</span>
            </h2>
          </div>
          <p class="motion-text text-slate-800 max-w-sm mb-0">
            We intentionally partner with a limited number of businesses each quarter so every client receives strategic attention—not just project management.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="motion-card bg-dark p-10 rounded-2xl text-center hover:shadow-xl transition-shadow hover:scale-[1.02] transition-all">
            <div class="w-16 h-16 bg-blue-300 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="material-symbols-outlined text-3xl">apartment</span>
            </div>
            <h4 class="font-medium mb-3 d-block text-lg" style="font-weight: 500;">Real Estate &amp; Professional Services</h4>
            <p class="text-slate-300">Firms where trust is decided before the first call — and the website is doing that work, or isn't.</p>
          </div>
          <div class="motion-card bg-dark p-10 rounded-2xl text-center hover:shadow-xl transition-shadow hover:scale-[1.02] transition-all">
            <div class="w-16 h-16 bg-indigo-300 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="material-symbols-outlined text-3xl">monitoring</span>
            </div>
            <h4 class="font-medium mb-3 d-block medium text-lb" style="font-weight: 500;">SaaS &amp; Startups</h4>
            <p class="text-slate-300">Founders who need a site that holds up in front of investors, not just visitors.</p>
          </div>
          <div class="motion-card bg-dark p-10 rounded-2xl text-center hover:shadow-xl transition-shadow hover:scale-[1.02] transition-all">
            <div class="w-16 h-16 bg-purple-300 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="material-symbols-outlined text-3xl">precision_manufacturing</span>
            </div>
            <h4 class="font-medium mb-3 d-block medium text-lr" style="font-weight: 500;">Manufacturing &amp; Healthcare</h4>
            <p class="text-slate-300">Established operators whose digital presence still undersells what the business actually delivers.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="home-motion-section pb-24 px-4 bg-white">
      <div class="motion-card max-w-7xl mx-auto rounded-3xl p-12 border border-secondary shadow-sm relative overflow-hidden hover:scale-[1.02] transition-all">
        <div class="home-parallax absolute top-0 right-0 p-8 opacity-[0.06]">
          <span class="material-icons-outlined text-ly" style="font-size: 16rem">insights</span>
        </div>
        <div class="relative">
          <h2 class="text-2xl font-medium mb-5 flex items-center gap-3" style="font-weight: 600">
            <span class="text-dark">What's Really <span class="text-lr">Holding Your Business</span> Back?</span>
          </h2>
          <p class="text-slate-600 mb-8 max-w-2xl">
            Before recommending solutions, we identify where your business is losing opportunities. These are the four patterns we uncover most often.
          </p>
          <div class="grid md:grid-cols-2 gap-y-6 gap-x-12">
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">trending_down</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">Traffic Without Action</p>
                <p class="text-sm text-slate-600 mb-2">Visitors arrive, but the site gives them no reason to take the next step.</p>
              </div>
            </div>
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">payments</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">Spend Outpacing Return</p>
                <p class="text-sm text-slate-600 mb-2">Ad budgets are doing their job; the landing experience isn't doing its.</p>
              </div>
            </div>
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">visibility</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">Visibility Without Revenue</p>
                <p class="text-sm text-slate-600 mb-2">Attention is growing faster than the systems built to capture it.</p>
              </div>
            </div>
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">explore_off</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">No Single Source of Strategy</p>
                <p class="text-sm text-slate-600 mb-2">Design, dev, and marketing decisions are being made in isolation from each other.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         WHAT IT'S LIKE WORKING WITH AMORTREE — Before / After Wipe Grid
         ============================================================ -->
    <section class="att-why-section pb-28 px-6 bg-white overflow-hidden" id="why-us">
      <div class="container mx-auto max-w-6xl">
        <div class="att-why-header mb-20">
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
            <span class="text-ly">THE EXPERIENCE</span>
          </div>
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 class="text-3xl font-display font-bold text-dark mb-0 att-why-heading" style="font-weight: 600">
              What It's Like <span class="text-ly">Working With Amortree</span>
            </h2>
            <p class="att-why-sub text-slate-500 max-w-xs mb-0 text-sm leading-relaxed">
              Most agencies hand you a deliverable. We build the system the deliverable is supposed to produce.
            </p>
          </div>
        </div>

        <div class="att-why-grid">
          <!-- Column labels -->
          <div class="att-why-label-row">
            <div class="att-col-label att-col-label--before">
              <span class="att-label-dot att-label-dot--red">
                <span class="material-icons-outlined" style="font-size: 11px">close</span>
              </span>
              <span>Traditional Agency</span>
            </div>
            <div class="att-col-label att-col-label--after">
              <span class="att-label-dot att-label-dot--green">
                <span class="material-icons-outlined" style="font-size: 11px">check</span>
              </span>
              <span>Amortree</span>
            </div>
          </div>

          <!-- Pair 1 -->
          <div class="att-why-pair">
            <div class="att-why-cell att-cell-before">
              <span class="material-symbols-outlined att-cell-icon">bolt</span>
              <p class="att-cell-label">Designs first, asks strategy questions later — if at all.</p>
            </div>
            <div class="att-why-cell att-cell-after">
              <span class="material-symbols-outlined att-cell-icon">target</span>
              <p class="att-cell-label"><strong>Strategy before screens.</strong> Every visual decision traces back to a defined conversion goal.</p>
            </div>
          </div>

          <!-- Pair 2 -->
          <div class="att-why-pair">
            <div class="att-why-cell att-cell-before">
              <span class="material-symbols-outlined att-cell-icon">thumb_down</span>
              <p class="att-cell-label">Measures success by deliverables shipped, not revenue moved.</p>
            </div>
            <div class="att-why-cell att-cell-after">
              <span class="material-symbols-outlined att-cell-icon">trending_up</span>
              <p class="att-cell-label"><strong>Measured against business results.</strong> We track conversion lift, pipeline velocity, and ROAS — not just task completion.</p>
            </div>
          </div>

          <!-- Pair 3 -->
          <div class="att-why-pair">
            <div class="att-why-cell att-cell-before">
              <span class="material-symbols-outlined att-cell-icon">casino</span>
              <p class="att-cell-label">Creative direction based on gut feel and trend-chasing.</p>
            </div>
            <div class="att-why-cell att-cell-after">
              <span class="material-symbols-outlined att-cell-icon">analytics</span>
              <p class="att-cell-label"><strong>Decisions backed by data.</strong> We audit your current metrics before recommending a single screen.</p>
            </div>
          </div>

          <!-- Pair 4 -->
          <div class="att-why-pair">
            <div class="att-why-cell att-cell-before">
              <span class="material-symbols-outlined att-cell-icon">logout</span>
              <p class="att-cell-label">Hands off the file and disappears after launch day.</p>
            </div>
            <div class="att-why-cell att-cell-after">
              <span class="material-symbols-outlined att-cell-icon">handshake</span>
              <p class="att-cell-label"><strong>A partner past launch day.</strong> We keep tuning against live data long after the site goes live.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="home-motion-section py-24" id="solutions" style="background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%)">
      <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
          <div>
            <div class="inline-block py-2 px-4 rounded bg-dark text-brand-700 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <span class="text-ly">HOW WE HELP</span>
            </div>
            <h2 class="font-bold text-light mb-0" style="font-weight: 600">
              Choose the <span class="text-ly">Growth Path</span> That Fits Your Business
            </h2>
          </div>
          <p class="motion-text text-slate-100 max-w-sm mb-0">
            Every engagement is tailored to your business goals—not a predefined package.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="motion-card group relative bg-background-light p-8 rounded-xl border border-dark transition-all hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full">
            <div class="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-6">
              <span class="material-icons-outlined text-3xl">hub</span>
            </div>
            <h4 class="text-2xl font-bolder mb-3" style="font-weight: 600">
              <a href="/lead-generation" class="text-white text-decoration-none">Lead Generation Systems</a>
            </h4>
            <p class="text-slate-300 mb-6 flex-grow">For B2B and service businesses that need a website to do the qualifying, not just the introducing.</p>
            <ul class="space-y-3 mb-8 text-sm p-0">
              <li class="flex items-center gap-2"><span class="material-icons-outlined text-green-500 text-sm">check_circle</span>Professional Services</li>
              <li class="flex items-center gap-2"><span class="material-icons-outlined text-green-500 text-sm">check_circle</span>Healthcare</li>
              <li class="flex items-center gap-2"><span class="material-icons-outlined text-green-500 text-sm">check_circle</span>Real Estate</li>
              <li class="flex items-center gap-2"><span class="material-icons-outlined text-green-500 text-sm">check_circle</span>B2B Companies</li>
            </ul>
            <div class="pt-6 border-t border-slate-200">
              <p class="text-xs uppercase font-bold text-slate-400 mb-2"><small>EXPECTED OUTCOME</small></p>
              <h5 class="text-lg font-bold text-primary mb-2" style="font-weight: 600">A Predictable Lead Pipeline</h5>
              <p class="text-xs text-slate-500 mb-0">Typical delivery: 4–8 weeks</p>
            </div>
          </div>
          <div class="motion-card group relative bg-dark p-8 rounded-xl border border-dark transition-all shadow-2xl flex flex-col h-full">
            <div class="w-14 h-14 bg-white/10 text-white rounded-lg flex items-center justify-center mb-6">
              <span class="material-icons-outlined text-3xl">shopping_bag</span>
            </div>
            <h4 class="text-2xl font-bold mb-3 text-white" style="font-weight: 600">E-commerce Growth Systems</h4>
            <p class="text-slate-300 mb-6 flex-grow">For Shopify and custom stores where the storefront is the limiting factor on revenue, not traffic.</p>
            <ul class="space-y-3 mb-8 text-sm text-slate-200 font-medium p-0">
              <li class="flex items-center gap-2"><span class="material-icons-outlined text-primary text-sm">check_circle</span>Shopify Stores</li>
              <li class="flex items-center gap-2"><span class="material-icons-outlined text-primary text-sm">check_circle</span>D2C Brands</li>
              <li class="flex items-center gap-2"><span class="material-icons-outlined text-primary text-sm">check_circle</span>Retail Businesses</li>
            </ul>
            <div class="pt-6 border-t border-white/20">
              <p class="text-xs uppercase font-bold text-slate-400 mb-2"><small>EXPECTED OUTCOME</small></p>
              <h5 class="text-lg font-bold text-white mb-2" style="font-weight: 600">Higher Return Per Visitor</h5>
              <p class="text-xs text-slate-400 mb-0">Typical delivery: 3–6 weeks</p>
            </div>
          </div>
          <div class="motion-card group relative bg-background-light p-8 rounded-xl border border-dark transition-all hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full">
            <div class="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center mb-6">
              <span class="material-icons-outlined text-3xl">rocket_launch</span>
            </div>
            <h4 class="text-2xl font-bold mb-3" style="font-weight: 600">Startup Launch Foundations</h4>
            <p class="text-slate-300 mb-6 flex-grow">For founders who need a product and site that hold up in front of investors and early customers alike.</p>
            <ul class="space-y-3 mb-8 text-sm p-0">
              <li class="flex items-center gap-2"><span class="material-icons-outlined text-green-500 text-sm">check_circle</span>SaaS</li>
              <li class="flex items-center gap-2"><span class="material-icons-outlined text-green-500 text-sm">check_circle</span>Tech Startups</li>
              <li class="flex items-center gap-2"><span class="material-icons-outlined text-green-500 text-sm">check_circle</span>Founders</li>
              <li class="flex items-center gap-2"><span class="material-icons-outlined text-green-500 text-sm">check_circle</span>MVPs</li>
            </ul>
            <div class="pt-6 border-t border-slate-200">
              <p class="text-xs uppercase font-bold text-slate-500 mb-2"><small>EXPECTED OUTCOME</small></p>
              <h5 class="text-lg font-bold text-primary mb-2" style="font-weight: 600">A Foundation That Scales With You</h5>
              <p class="text-xs text-slate-500 mb-0">Typical delivery: 6–10 weeks</p>
            </div>
          </div>
        </div>
        <h6 class="text-center mt-5 mb-1" style="font-weight: 400">Not sure which path fits your business?</h6>
        <div class="d-flex justify-content-center gap-3 mt-4">
          <a class="amor-btn btn-fill-primary btn-large"
            href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call.">Book Your Free Strategy Call</a>
        </div>
      </div>
    </section>

    <section class="py-40 bg-white" id="results">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div class="lg:col-span-6">
            <div class="inline-block py-2 px-4 rounded bg-dark text-brand-700 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <span class="text-ly">Results, Not Promises</span>
            </div>
            <h2 class="text-6xl lg:text-8xl font-display mb-12 text-dark" style="font-weight: 600">
              Hard Data. <br /><span class="text-gradient-brand text-ly">Zero Guesswork.</span>
            </h2>
            <div class="space-y-12 relative">
              <div class="group">
                <div class="flex justify-between items-center mb-0">
                  <div>
                    <h4 class="font-bold text-2xl text-dark mb-1">Average Conversion Improvement</h4>
                    <p class="text-slate-600 font-medium mb-4">Average across post-launch client sites</p>
                  </div>
                  <span class="text-5xl font-black text-ly font-display">+42%</span>
                </div>
                <div class="h-4 w-full bg-dark rounded-full overflow-hidden p-1">
                  <div class="h-full bg-warning rounded-full shadow-[0_0_10px_rgba(12,146,235,0.2)] transition-all duration-1000" style="width: 88%"></div>
                </div>
              </div>
              <div class="group">
                <div class="flex justify-between items-center mb-0">
                  <div>
                    <h4 class="font-bold text-2xl text-dark mb-1">Lead-to-Customer Speed</h4>
                    <p class="text-slate-600 font-medium mb-4">Faster lead-to-close for B2B clients</p>
                  </div>
                  <span class="text-5xl font-black text-ly font-display">3.5x</span>
                </div>
                <div class="h-4 w-full bg-dark rounded-full overflow-hidden p-1">
                  <div class="h-full bg-warning rounded-full shadow-[0_0_10px_rgba(12,146,235,0.2)]" style="width: 94%"></div>
                </div>
              </div>
              <div class="group">
                <div class="flex justify-between items-center mb-0">
                  <div>
                    <h4 class="font-bold text-2xl text-dark mb-1">Managed Ad Revenue</h4>
                    <p class="text-slate-600 font-medium mb-4">Tracked across active client accounts</p>
                  </div>
                  <span class="text-5xl font-black text-ly font-display">$12M+</span>
                </div>
                <div class="h-4 w-full bg-dark rounded-full overflow-hidden p-1">
                  <div class="h-full bg-warning rounded-full shadow-[0_0_10px_rgba(12,146,235,0.2)]" style="width: 76%"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-6 relative">
            <div class="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-charcoal-200/50 group border border-charcoal-100">
              <img alt="Data analytics dashboard"
                class="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-1000 mob-stat"
                src="../assets/img/project/c4/sa-ad.png" />
              <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              <div class="absolute bottom-8 left-8 right-8 p-10 bg-white/95 backdrop-blur-xl rounded-3xl border border-charcoal-100 shadow-xl">
                <div class="d-block d-md-flex align-items-center justify-content-between mb-3">
                  <div class="flex gap-1 text-brand-600">
                    <span class="material-symbols-outlined fill-1 text-ly">star</span>
                    <span class="material-symbols-outlined fill-1 text-ly">star</span>
                    <span class="material-symbols-outlined fill-1 text-ly">star</span>
                    <span class="material-symbols-outlined fill-1 text-ly">star</span>
                    <span class="material-symbols-outlined fill-1 text-ly">star</span>
                  </div>
                  <span class="py-2 px-3 rounded bg-dark text-brand-700 text-xs mt-2 mt-md-0">Verified Business Owner</span>
                </div>
                <p class="text-dark font-bold text-xl leading-relaxed mb-6 italic">
                  "Amortree is a very professional and end-to-end service provider. They have good understanding of the clients needs and work in a timely and efficient manner."
                </p>
                <div class="flex items-center gap-4">
                  <img alt="Client" class="w-14 h-14" src="../assets/img/project/c4/icon-sa.svg" />
                  <div>
                    <h5 class="text-base font-black text-secondary mb-0">Menaka Krishna</h5>
                    <small class="text-xs text-secondary mb-0">CEO @ SteadyAsset</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute bg-dark -top-10 -right-10 bg-brand-600 p-8 rounded-3xl shadow-2xl hidden xl:block">
              <div class="flex items-center justify-center gap-6">
                <div class="w-16 h-16 bg-white text-brand-600 rounded-full flex items-center justify-center">
                  <span class="material-symbols-outlined text-4xl font-bold">payments</span>
                </div>
                <div>
                  <p class="text-xs font-black text-white uppercase tracking-[0.2em] mb-1">Live ROAS</p>
                  <p class="text-4xl font-black text-ly mb-0">8.44x</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         HOW WE WORK — 4-step process grid (reference: Our Approach)
         ============================================================ -->
    <section class="att-process-section" id="process">
      <div class="att-process-inner">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
          <div>
            <div class="inline-block py-2 px-4 rounded bg-dark text-brand-700 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <span class="text-ly">Our Approach</span>
            </div>
            <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
              How We <span class="text-ly">Deliver Results</span>
            </h2>
          </div>
          <p class="motion-text text-slate-800 max-w-sm mb-0">
            Every engagement follows a proven framework that balances creative ambition with strategic execution. We don't just build websites — we engineer growth systems.
          </p>
        </div>
        <div class="att-process-steps">
          <div class="att-process-step" data-step="01">
            <div class="att-ps-icon">
              <span class="material-symbols-outlined">manage_search</span>
            </div>
            <div class="att-ps-title">Audit &amp; Strategy</div>
            <div class="att-ps-desc">Deep-dive into your brand, audience, and current digital presence. We map the competitive landscape and identify exactly where you're losing ground before recommending anything.</div>
            <div class="att-ps-week">Week 1–2</div>
          </div>
          <div class="att-process-step" data-step="02">
            <div class="att-ps-icon">
              <span class="material-symbols-outlined">design_services</span>
            </div>
            <div class="att-ps-title">Design &amp; Build</div>
            <div class="att-ps-desc">Information architecture, user flow, and visual execution — built against the strategy, not a template. Every pixel earns its place with intention.</div>
            <div class="att-ps-week">Weeks 2–6</div>
          </div>
          <div class="att-process-step" data-step="03">
            <div class="att-ps-icon">
              <span class="material-symbols-outlined">rocket_launch</span>
            </div>
            <div class="att-ps-title">Launch</div>
            <div class="att-ps-desc">Performance-optimized deployment with careful QA. We watch real metrics from day one, not after a cooling-off period.</div>
            <div class="att-ps-week">Week 6–7</div>
          </div>
          <div class="att-process-step" data-step="04">
            <div class="att-ps-icon">
              <span class="material-symbols-outlined">trending_up</span>
            </div>
            <div class="att-ps-title">Optimize &amp; Scale</div>
            <div class="att-ps-desc">Ongoing analytics monitoring to iterate and compound results. We keep tuning against live data long after launch day — not just hand off and disappear.</div>
            <div class="att-ps-week">Ongoing</div>
          </div>
        </div>
      </div>
    </section>

    <div class="d-none section serviceSec pt-5 section-padding" id="whatWeDo">
      <!-- legacy services grid — kept hidden -->
    </div>

    <!-- ============================================================
         RECENT WORK — Numbered row list (reference: On Going Projects)
         ============================================================ -->
    <section class="att-work-section" id="work">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div class="inline-block py-2 px-4 rounded bg-dark text-brand-700 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span class="text-ly">Recent Work</span>
          </div>
          <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
            <span class="text-ly">Real Projects.</span> Real Outcomes.
          </h2>
        </div>
        <p class="motion-text text-slate-800 max-w-sm mb-0">
          Real projects. Real outcomes. Each crafted to convert and designed to last.
        </p>
      </div>

      <div class="att-cs-grid">
        <!-- Row 1 -->
        <div class="att-cs-item">
          <div class="att-cs-inner">
            <div class="att-cs-num">01</div>
            <div class="att-cs-info">
              <div class="att-cs-tag">Brand Identity · UI/UX · Website</div>
              <div class="att-cs-name">SteadyAsset</div>
            </div>
            <div class="att-cs-desc">Investment platform brand identity, conversion-focused UI/UX, and full website build with a live ROAS tracking overlay.</div>
            <div class="att-cs-metrics">
              <div class="att-cs-metric">
                <span class="att-cs-metric-val">8.44x</span>
                <span class="att-cs-metric-label">ROAS</span>
              </div>
            </div>
            <a href="project/steadyasset" class="att-cs-arrow" aria-label="View SteadyAsset">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
          <div class="att-cs-preview">
            <img src="../assets/img/project/c4/project-thum-sa.png" alt="SteadyAsset" />
          </div>
        </div>
        <hr class="att-cs-divider" />

        <!-- Row 2 -->
        <div class="att-cs-item">
          <div class="att-cs-inner">
            <div class="att-cs-num">02</div>
            <div class="att-cs-info">
              <div class="att-cs-tag">Full Redesign · UI/UX</div>
              <div class="att-cs-name">SaveDesk</div>
            </div>
            <div class="att-cs-desc">Full redesign from wireframes to high-fidelity UI/UX — restructured IA, new design system, and a measurable lift in task-completion rate.</div>
            <div class="att-cs-metrics">
              <div class="att-cs-metric">
                <span class="att-cs-metric-val">+42%</span>
                <span class="att-cs-metric-label">Conversion</span>
              </div>
            </div>
            <a href="project/savedesk" class="att-cs-arrow" aria-label="View SaveDesk">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
          <div class="att-cs-preview">
            <img src="../assets/img/project/c7/project-thum-sd.png" alt="SaveDesk" />
          </div>
        </div>
        <hr class="att-cs-divider" />

        <!-- Row 3 -->
        <div class="att-cs-item">
          <div class="att-cs-inner">
            <div class="att-cs-num">03</div>
            <div class="att-cs-info">
              <div class="att-cs-tag">Brand Identity · UI/UX · Website</div>
              <div class="att-cs-name">Samsiddhi Designs</div>
            </div>
            <div class="att-cs-desc">Brand identity, UI/UX, and full website for an interior design firm. Portfolio-first layout with inquiry flow built to qualify leads, not just showcase work.</div>
            <div class="att-cs-metrics">
              <div class="att-cs-metric">
                <span class="att-cs-metric-val">3.5x</span>
                <span class="att-cs-metric-label">Pipeline</span>
              </div>
            </div>
            <a href="project/samsiddhi-designs" class="att-cs-arrow" aria-label="View Samsiddhi Designs">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
          <div class="att-cs-preview">
            <img src="../assets/img/project/c9/project-thum-sd.png" alt="Samsiddhi Designs" />
          </div>
        </div>
        <hr class="att-cs-divider" />

        <!-- Row 4 -->
        <div class="att-cs-item">
          <div class="att-cs-inner">
            <div class="att-cs-num">04</div>
            <div class="att-cs-info">
              <div class="att-cs-tag">UI/UX · Website · Analytics</div>
              <div class="att-cs-name">UAE Links</div>
            </div>
            <div class="att-cs-desc">UI/UX design, full website build, and analytics implementation for a cross-border services platform. Data infrastructure in place from day one.</div>
            <div class="att-cs-metrics">
              <div class="att-cs-metric">
                <span class="att-cs-metric-val">+55%</span>
                <span class="att-cs-metric-label">Inquiries</span>
              </div>
            </div>
            <a href="project/uae-links" class="att-cs-arrow" aria-label="View UAE Links">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
          <div class="att-cs-preview">
            <img src="../assets/img/project/c1/project-thum-uaeLinks.png" alt="UAE Links" />
          </div>
        </div>
      </div>

      <div class="d-lg-flex justify-content-center" style="padding: 3rem 0 0">
        <a class="amor-btn btn-borderd light" href="/case-studies">Explore Case Studies</a>
      </div>
    </section>

    <section class="section section-padding bg-color-light" id="reviews">
      <div class="container-fluid">
        <div class="section-heading heading-center">
          <span class="subtitle">In Their Words</span>
          <h2 class="title">
            <span class="gradient-text yellow-dark">What Clients</span> Say About Working With Us
          </h2>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="glass-card p-10 rounded-3xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-2 h-full bg-warning group-hover:w-full group-hover:opacity-5 transition-all duration-700"></div>
            <div class="flex gap-1 text-ly mb-6">
              <span class="material-symbols-outlined">star</span><span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span><span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
            </div>
            <p class="text-xl text-white italic mb-10 leading-relaxed font-light">
              "Hi, I just wanted to take a moment to express my sincere appreciation for the outstanding work you've done. Completing it on time and to such a high standard is a testament to your dedication and expertise."
            </p>
            <div class="flex items-center gap-4">
              <img src="../assets/img/project/c2/icon-sc.svg" class="m-0" style="height: 40px" alt="Solved Cube Logo" />
              <div>
                <p class="font-bold text-white uppercase text-sm tracking-widest mb-1">Sandeep L</p>
                <small class="text-xs text-ll font-bold mb-0">Co-Founder, Solved Cube IT Solution</small>
              </div>
            </div>
          </div>
          <div class="glass-card p-10 rounded-3xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-2 h-full bg-warning group-hover:w-full group-hover:opacity-5 transition-all duration-700"></div>
            <div class="flex gap-1 text-ly mb-6">
              <span class="material-symbols-outlined">star</span><span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span><span class="material-symbols-outlined">star</span>
            </div>
            <p class="text-xl text-white italic mb-10 leading-relaxed font-light">
              "They did an excellent job on our website. They were highly understanding of our needs, thoughtful in their design approach, and very practical in aligning their ideas with our vision."
            </p>
            <div class="flex items-center gap-4">
              <img src="../assets/img/project/c12/icon-rr.svg" class="m-0" style="height: 40px" alt="Raksha Realty" />
              <div>
                <p class="font-bold text-white uppercase text-sm tracking-widest mb-1">Ganesh Moorthy</p>
                <small class="text-xs text-ll font-bold mb-0">Founder, Raksha Realty</small>
              </div>
            </div>
          </div>
          <div class="glass-card p-10 rounded-3xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-2 h-full bg-warning group-hover:w-full group-hover:opacity-5 transition-all duration-700"></div>
            <div class="flex gap-1 text-ly mb-6">
              <span class="material-symbols-outlined">star</span><span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span><span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
            </div>
            <p class="text-xl text-white italic mb-10 leading-relaxed font-light">
              "Amortree Tech is a pleasure to work with. They're responsive, professional, and always willing to go the extra mile. I highly recommend their services."
            </p>
            <div class="flex items-center gap-4">
              <img src="../assets/img/project/c9/icon-sd.svg" class="m-0" style="height: 40px" alt="Samsiddhi Logo" />
              <div>
                <p class="font-bold text-white uppercase text-sm tracking-widest mb-1">Bharathkumar MS</p>
                <small class="text-xs text-ll font-bold mb-0">Founder, Samsiddhi Designs</small>
              </div>
            </div>
          </div>
          <div class="glass-card p-10 rounded-3xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-2 h-full bg-warning group-hover:w-full group-hover:opacity-5 transition-all duration-700"></div>
            <div class="flex gap-1 text-ly mb-6">
              <span class="material-symbols-outlined">star</span><span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span><span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
            </div>
            <p class="text-xl text-white italic mb-10 leading-relaxed font-light">
              "Good understanding of our needs from the start. A genuinely professional service provider, and a job well done."
            </p>
            <div class="flex items-center gap-4">
              <img src="../assets/img/project/c6/spr-logo.svg" class="m-0" style="height: 40px" alt="SPR Real Estate" />
              <div>
                <p class="font-bold text-white uppercase text-sm tracking-widest mb-1">Suresh Babu</p>
                <small class="text-xs text-ll font-bold mb-0">Founder, SPR Real Estate</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="list-unstyled shape-group-banner">
        <li class="shape shape-3"><img src="../assets/img/shapes/bubble-14.png" alt="Bubble" /></li>
        <li class="shape shape-4"><img src="../assets/img/shapes/bubble-14.png" alt="Bubble" /></li>
        <li class="shape shape-6"><img src="../assets/img/shapes/bubble-40.png" alt="Bubble" /></li>
        <li class="shape shape-7"><img src="../assets/img/shapes/bubble-41.png" alt="Bubble" /></li>
      </ul>
    </section>

    <!-- ============================================================
         FAQ — Numbered Tab Rail + Expanding Stage
         ============================================================ -->
    <section class="att-faq-section py-28 px-6 bg-color-light overflow-hidden" id="faq">
      <div class="container mx-auto max-w-5xl">
        <div class="att-faq-header mb-16 text-center">
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
            <span class="text-ly">Common Questions</span>
          </div>
          <h2 class="att-faq-heading text-3xl font-display font-bold text-dark mb-3" style="font-weight: 600">
            Questions <span class="text-ly">Founders Usually Ask</span>
          </h2>
          <p class="att-faq-sub text-slate-500 max-w-md mx-auto mb-0 text-sm">
            The questions founders and business owners ask most before starting a project with us.
          </p>
        </div>

        <!-- Tab Rail -->
        <div class="att-faq-rail" role="tablist" aria-label="FAQ topics">
          <button class="att-faq-tab att-tab-active" data-tab="0" role="tab" aria-selected="true" aria-controls="att-faq-stage">
            <span class="att-tab-num">01</span>
            <span class="att-tab-q">Pricing</span>
          </button>
          <button class="att-faq-tab" data-tab="1" role="tab" aria-selected="false" aria-controls="att-faq-stage">
            <span class="att-tab-num">02</span>
            <span class="att-tab-q">Timeline</span>
          </button>
          <button class="att-faq-tab" data-tab="2" role="tab" aria-selected="false" aria-controls="att-faq-stage">
            <span class="att-tab-num">03</span>
            <span class="att-tab-q">Scope</span>
          </button>
          <button class="att-faq-tab" data-tab="3" role="tab" aria-selected="false" aria-controls="att-faq-stage">
            <span class="att-tab-num">04</span>
            <span class="att-tab-q">Industries</span>
          </button>
          <button class="att-faq-tab" data-tab="4" role="tab" aria-selected="false" aria-controls="att-faq-stage">
            <span class="att-tab-num">05</span>
            <span class="att-tab-q">Process</span>
          </button>
        </div>

        <!-- Stage Panel -->
        <div class="att-faq-stage" id="att-faq-stage" role="tabpanel">
          <div class="att-faq-answer" data-answer="0">
            <h3 class="att-answer-q">How much does a website cost at Amortree?</h3>
            <p class="att-answer-body">
              Most engagements fall between &#8377;50,000 and &#8377;5,00,000,
              depending on scope — from a focused conversion-first landing page
              to a full lead-generation system with CRM integration. We scope
              exact pricing after the strategy call, once we understand what
              the site actually needs to do for your business.
            </p>
            <p class="att-answer-note">No fixed packages. Scope drives price, not the other way round.</p>
          </div>
          <div class="att-faq-answer d-none" data-answer="1">
            <h3 class="att-answer-q">How long does a project take?</h3>
            <p class="att-answer-body">
              Most projects run 4–10 weeks from strategy to launch. Audit
              and strategy take 1–2 weeks; design and build 2–6 weeks. Ongoing
              optimization continues after launch — we don't hand off and disappear.
            </p>
            <p class="att-answer-note">Timelines are defined upfront and updated at every milestone.</p>
          </div>
          <div class="att-faq-answer d-none" data-answer="2">
            <h3 class="att-answer-q">Do you only build websites, or do you handle marketing too?</h3>
            <p class="att-answer-body">
              We work across strategy, UX, development, SEO, and paid acquisition — because a website's performance
              depends on all of them working together, not just the design. A well-designed site sitting on a broken
              acquisition path still doesn't convert.
            </p>
            <p class="att-answer-note">The site is the system. We build the whole thing.</p>
          </div>
          <div class="att-faq-answer d-none" data-answer="3">
            <h3 class="att-answer-q">What industries do you work with?</h3>
            <p class="att-answer-body">
              Primarily real estate and professional service firms, SaaS and startup founders, and manufacturing
              and healthcare businesses. These are sectors where trust is earned before the first call — and the
              website is doing that work, or it isn't.
            </p>
            <a href="/case-studies" class="att-answer-link">See our case studies &rarr;</a>
          </div>
          <div class="att-faq-answer d-none" data-answer="4">
            <h3 class="att-answer-q">What happens after I book a strategy call?</h3>
            <p class="att-answer-body">
              We review your current site and metrics before the call, so the conversation starts with specific
              observations about your business — not a generic sales pitch. You'll leave with a clear picture of
              where the site is losing ground and what fixing it looks like.
            </p>
            <p class="att-answer-note">20 minutes. No pressure, no obligation.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="home-motion-section py-24 px-6 bg-dark" style="background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%)">
      <div class="container mx-auto max-w-3xl text-center">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4 text-white" style="font-weight: 600">
          Ready to Build Your <br> <span class="text-ly">Next Growth System?</span>
        </h2>
        <p class="motion-text text-slate-300 max-w-xl mx-auto mb-10">
          A 20-minute call costs you nothing and tells you exactly where your site is leaving leads on the table.
        </p>
        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <a class="amor-btn btn-fill-primary btn-large"
            href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call.">Book Your Free Strategy Call</a>
          <a href="/estimate" class="amor-btn btn-borderd light">Get a Project Estimate</a>
        </div>
        <p class="mt-5 text-center text-slate-500 text-xs mb-0">
          <small>No pressure, no obligation — just clarity on what your website should be doing for your business.</small>
        </p>
      </div>
    </section>

    <!-- Legacy sections — hidden, kept for reference -->
    <section class="d-none section section-padding-equal bg-color-white" id="about"></section>
    <section class="d-none section section-padding faqSec bg-color-light"></section>
  </main>
</template>

<style lang="scss" scoped>
// ─── Base page ────────────────────────────────────────────────────────────────
.home-motion-page {
  overflow-x: hidden;
  perspective: 1200px;
  transform-style: preserve-3d;
}

.home-motion-page section,
.home-motion-page .banner-style-1 {
  position: relative;
  isolation: isolate;
}

.home-motion-section,
.motion-card,
.home-metric,
.banner-form,
.home-banner,
.hero-title,
.step-arrow,
.glass-card,
.project-grid,
.amorboy img,
.shape-group-banner .shape {
  will-change: transform, opacity;
}

.motion-card,
.project-grid,
.review-card,
.services-grid,
.glass-card,
.step-arrow {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.home-motion-page .amor-btn,
.home-motion-page input,
.home-motion-page textarea,
.home-motion-page .motion-card {
  transition: border-color 0.28s ease, background-color 0.28s ease, box-shadow 0.28s ease;
}

.home-motion-page input:focus,
.home-motion-page textarea:focus {
  box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.18);
}

.home-motion-page .banner-form {
  display: block;
  opacity: 1;
  visibility: visible;
  position: relative;
  transform-origin: center top;
  z-index: 2;
}

.home-motion-page .shape-group-banner {
  pointer-events: none;
}

.hero-title {
  perspective: 900px;
  opacity: 1;
}

.hero-title-token {
  display: inline-block;
  margin-right: 0.18em;
  color: #f8fafc;
  -webkit-text-fill-color: currentColor;
  background: none;
  transform-origin: center bottom;
  will-change: transform, opacity;
}

.hero-title-highlight {
  background-image: linear-gradient(110deg, #facc15 0%, #ffffff 36%, #60a5fa 68%, #facc15 100%);
  background-size: 220% 220%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.amorboy {
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 8%;
  left: 0;
  z-index: -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img { width: 30%; }
}

.step-arrow {
  clip-path: polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%);
}
@media (max-width: 768px) {
  .step-arrow { clip-path: none; }
}

// ─── Why Businesses Choose Amortree ─────────────────────────────────────────
.att-why-section {
  background: #fff;
}

.att-why-header {
  .att-why-heading { line-height: 1.15; }
  .att-why-sub { opacity: 0.75; }
}

.att-why-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  overflow: hidden;
}

.att-why-label-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #0f172a;

  .att-col-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.65rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #64748b;

    &--before { border-right: 1px solid rgba(255,255,255,0.06); }
    &--after { color: #94a3b8; }
  }

  .att-label-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &--red  { background: rgba(239,68,68,0.15); color: #f87171; }
    &--green { background: rgba(34,197,94,0.15); color: #4ade80; }
  }
}

.att-why-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #e2e8f0;

  &:first-of-type { border-top: none; }
}

.att-why-cell {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.75rem 2rem;

  // Clip-path starts collapsed — GSAP animates it open
  clip-path: inset(0 0 0 0);

  &.att-cell-before {
    background: #fafafa;
    border-right: 1px solid #e2e8f0;

    .att-cell-icon { color: #fca5a5; }
    .att-cell-label { color: #64748b; }
  }

  &.att-cell-after {
    background: #fff;

    .att-cell-icon { color: #facc15; }
    .att-cell-label {
      color: #1e293b;
      strong { color: #0f172a; }
    }
  }
}

.att-cell-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
  will-change: transform, opacity;
}

.att-cell-label {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .att-why-pair { grid-template-columns: 1fr; }
  .att-why-label-row { grid-template-columns: 1fr; }
  .att-why-label-row .att-col-label--before { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .att-why-cell.att-cell-before { border-right: none; border-bottom: 1px solid #e2e8f0; }
}

// ─── FAQ — Tab Rail + Stage ───────────────────────────────────────────────────
.att-faq-section {
  background: var(--color-bg-light, #f8fafc);
}

.att-faq-rail {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px; // so ticker doesn't clip
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

// Sliding underline ticker — positioned by JS
.att-tab-ticker {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: #facc15;
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
}

.att-faq-tab {
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
  will-change: transform, opacity;

  &:hover {
    background: rgba(250, 204, 21, 0.06);
    .att-tab-num { color: #facc15; }
    .att-tab-q { color: #0f172a; }
  }

  &.att-tab-active {
    .att-tab-num { color: #facc15; }
    .att-tab-q { color: #0f172a; font-weight: 700; }
  }
}

.att-tab-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.2s ease;
}

.att-tab-q {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.att-faq-stage {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2.5rem 3rem;
  min-height: 220px;
  position: relative;
  will-change: transform, opacity;
}

.att-faq-answer {
  will-change: transform, opacity;
}

.att-answer-q {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.35;
}

.att-answer-body {
  font-size: 0.95rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1rem;
  max-width: 640px;
}

.att-answer-note {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.att-answer-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: #facc15;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  transition: gap 0.2s ease;

  &:hover { gap: 0.5rem; color: #eab308; }
}


// ─── Recent Work — Numbered Row List ─────────────────────────────────────────
.att-work-section {
  padding: 8rem 4rem;
  background: var(--color-bg-white, #fff);

  @media (max-width: 1100px) { padding: 5rem 2rem; }
  @media (max-width: 768px)  { padding: 4rem 1.25rem; }
}

.att-work-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 4rem;
  gap: 2rem;

  @media (max-width: 768px) { flex-direction: column; align-items: flex-start; margin-bottom: 2.5rem; }
}

.att-work-title {
  font-size: clamp(3.2rem, 8vw, 7.5rem);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.01em;
  color: #0f172a;
  will-change: transform, opacity;
}

.att-work-header-right {
  text-align: right;
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.7;
  max-width: 260px;

  @media (max-width: 768px) { text-align: left; max-width: 100%; }
}

.att-cs-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.att-cs-item {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: #f8fafc;
  cursor: pointer;
  transition: background 0.35s ease;

  &:hover { background: #f1f5f9; }
}

.att-cs-inner {
  display: grid;
  grid-template-columns: 80px 1fr 1fr auto auto;
  align-items: center;
  gap: 2.5rem;
  padding: 4rem 2.5rem;
  will-change: transform;

  @media (max-width: 1100px) { grid-template-columns: 60px 1fr 1fr auto; }
  @media (max-width: 768px)  {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 1.5rem;
  }
}

.att-cs-num {
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 900;
  color: rgba(15, 23, 42, 0.08);
  line-height: 1;
  transition: color 0.3s ease;
  font-variant-numeric: tabular-nums;

  .att-cs-item:hover & { color: #facc15; opacity: 0.55; }

  @media (max-width: 768px) { display: none; }
}

.att-cs-info {
  min-width: 0;
}

.att-cs-tag {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 0.35rem;
  font-weight: 500;
}

.att-cs-name {
  font-size: clamp(1.6rem, 2.8vw, 2.8rem);
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;

  .att-cs-item:hover & { color: #facc15; }
}

.att-cs-desc {
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.65;
  font-weight: 400;
  transition: color 0.3s ease;

  .att-cs-item:hover & { color: #475569; }
}

.att-cs-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-end;

  @media (max-width: 1100px) { display: none; }
}

.att-cs-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.att-cs-metric-val {
  font-size: 1.5rem;
  font-weight: 900;
  color: #facc15;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.att-cs-metric-label {
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 500;
}

.att-cs-arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(15, 23, 42, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  text-decoration: none;
  flex-shrink: 0;
  transition: border-color 0.3s, background 0.3s, color 0.3s;
  will-change: transform;

  .att-cs-item:hover & {
    border-color: #facc15;
    background: #facc15;
    color: #0f172a;
  }
}

// Hover preview — slides in from right
.att-cs-preview {
  position: absolute;
  top: 50%;
  right: -220px;
  width: 200px;
  height: 130px;
  border-radius: 10px;
  overflow: hidden;
  transform: translateY(-50%);
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  visibility: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.att-cs-divider {
  height: 1px;
  background: rgba(15, 23, 42, 0.05);
  border: none;
  margin: 0;
}

// ─── Process — 4-Step Grid ───────────────────────────────────────────────────
.att-process-section {
  padding: 8rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);

  @media (max-width: 1100px) { padding: 5rem 2rem; }
  @media (max-width: 768px)  { padding: 4rem 1.25rem; }
}

.att-process-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.att-process-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: flex-end;
  margin-bottom: 5rem;

  @media (max-width: 768px) { grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 3rem; }
}

.att-section-label {
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #facc15;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: #facc15;
    flex-shrink: 0;
  }
}

.att-process-title {
  font-size: clamp(2.8rem, 5.5vw, 5.5rem);
  font-weight: 700;
  line-height: 0.9;
  color: #0f172a;
  will-change: transform, opacity;
}

.att-process-sub {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.75;
  font-weight: 400;
  will-change: transform, opacity;
}

.att-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 900px)  { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px)  { grid-template-columns: 1fr; }
}

.att-process-step {
  background: #f8fafc;
  padding: 2.5rem 2rem;
  position: relative;
  overflow: hidden;
  transition: background 0.35s ease;
  will-change: transform, opacity;

  &:hover { background: #f1f5f9; }

  // Ghost step number — decorative
  &::before {
    content: attr(data-step);
    position: absolute;
    top: -1rem;
    right: 1.25rem;
    font-size: 7rem;
    font-weight: 900;
    color: rgba(15, 23, 42, 0.04);
    line-height: 1;
    pointer-events: none;
    transition: color 0.35s ease;
    font-variant-numeric: tabular-nums;
  }

  &:hover::before { color: rgba(250, 204, 21, 0.07); }
}

.att-ps-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: #facc15;

  .material-symbols-outlined { font-size: 1.25rem; }
}

.att-ps-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: 0.01em;
  margin-bottom: 0.6rem;
}

.att-ps-desc {
  font-size: 0.83rem;
  color: #64748b;
  line-height: 1.72;
  font-weight: 400;
  margin-bottom: 1rem;
}

.att-ps-week {
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-top: auto;
}

// Bottom-border swipe line — injected by GSAP
.att-ps-hover-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #facc15;
  pointer-events: none;
  will-change: width;
}

</style>