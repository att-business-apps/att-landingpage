<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuditWidget from "@/components/AuditWidget.vue";

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
let motionIdleCallback;
let motionFallbackTimer;
let motionScrollHandler;

// ─── Testimonials carousel ───────────────────────────────────────────
const testimonials = [
  {
    quote: "Hi, I just wanted to take a moment to express my sincere appreciation for the outstanding work you've done. Completing it on time and to such a high standard is a testament to your dedication and expertise.",
    author: "Sandeep L",
    role: "Co-Founder, Solved Cube IT Solutions",
    logo: new URL("../assets/img/project/c2/icon-sc.svg", import.meta.url).href,
    stars: 5,
    tag: "Web Design & Branding",
  },
  {
    quote: "They did an excellent job on our website. They were highly understanding of our needs, thoughtful in their design approach, and very practical in aligning their ideas with our vision.",
    author: "Ganesh Moorthy",
    role: "Founder, Raksha Realty",
    logo: new URL("../assets/img/project/c12/icon-rr.svg", import.meta.url).href,
    stars: 4,
    tag: "Redesign & Pitch Deck",
  },
  {
    quote: "Amortree Tech is a pleasure to work with. They're responsive, professional, and always willing to go the extra mile. I highly recommend their services to any business serious about digital growth.",
    author: "Bharathkumar MS",
    role: "Manager, Samsiddhi Designs",
    logo: new URL("../assets/img/project/c9/icon-sd.svg", import.meta.url).href,
    stars: 5,
    tag: "UI/UX Design & Development",
  },
  {
    quote: "Good understanding of our needs from the start. A genuinely professional service provider, and a job well done. The site looks exactly how we envisioned it and performs better than we hoped.",
    author: "Suresh Babu",
    role: "Founder, SPR Real Estate",
    logo: new URL("../assets/img/project/c6/spr-logo.svg", import.meta.url).href,
    stars: 5,
    tag: "Real Estate Website",
  },
  {
    quote: "Working with Amortree was seamless. They turned a complex brief into an interface that our team actually loves using every day. The dashboard feels like it was built by people who truly understood our users.",
    author: "SaveDesk Team",
    role: "SaveDesk Analytics India Pvt Ltd",
    logo: new URL("../assets/img/project/c7/icon-sd.png", import.meta.url).href,
    stars: 5,
    tag: "Dashboard Redesign",
  },
];

// Carousel state
const tcActiveIndex = ref(0);
const tcTrackRef    = ref(null);
const tcAutoTimer   = ref(null);
const tcTotal       = testimonials.length;

const tcNext = () => {
  tcActiveIndex.value = (tcActiveIndex.value + 1) % tcTotal;
  tcAnimateSlide();
};
const tcPrev = () => {
  tcActiveIndex.value = (tcActiveIndex.value - 1 + tcTotal) % tcTotal;
  tcAnimateSlide();
};
const tcGoTo = (i) => {
  tcActiveIndex.value = i;
  tcAnimateSlide();
};

function tcAnimateSlide() {
  if (!tcTrackRef.value) return;
  const cards = tcTrackRef.value.querySelectorAll(".tc-card");
  gsap.to(cards, {
    opacity: 0,
    y: 18,
    duration: 0.22,
    ease: "power2.in",
    onComplete: () => {
      gsap.set(cards, { y: -18 });
      gsap.to(cards, { opacity: 1, y: 0, duration: 0.42, ease: "power3.out" });
    },
  });
}

function tcStartAuto() {
  tcAutoTimer.value = setInterval(tcNext, 5000);
}
function tcStopAuto() {
  clearInterval(tcAutoTimer.value);
}


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
// FAQ Tab Rail - pure GSAP, no Bootstrap JS dependency
// ─────────────────────────────────────────────────────────────────────────────
function initFaqTabs() {
  const rail = document.querySelector(".att-faq-rail");
  if (!rail) return;

  const tabs = rail.querySelectorAll(".att-faq-tab");
  const answers = document.querySelectorAll(".att-faq-answer");
  const stage = document.querySelector(".att-faq-stage");
  let active = 0;

  // Underline ticker - a shared element that slides under the active tab
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
// Recent Work - numbered row list animations (reference style)
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
      if (preview) gsap.to(preview, { autoAlpha: 1, right: "160px", duration: 0.4, ease: "power3.out" });
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
// Process section - staggered step entrance + bottom-border hover line
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

function animateAudienceSection() {
  const section = homePage.value?.querySelector(".att-audience-section");
  if (!section) return;

  const intro = section.querySelectorAll(".att-audience-kicker, .att-audience-title, .att-audience-copy");
  const cards = section.querySelectorAll(".att-audience-card");

  gsap.from(intro, {
    y: 34,
    autoAlpha: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    immediateRender: false,
    scrollTrigger: { trigger: section, start: "top 78%", once: true },
  });

  gsap.from(cards, {
    y: 54,
    rotateX: 5,
    autoAlpha: 0,
    duration: 0.9,
    stagger: { each: 0.11, from: "start" },
    ease: "power3.out",
    immediateRender: false,
    scrollTrigger: { trigger: section.querySelector(".att-audience-grid"), start: "top 82%", once: true },
  });

  gsap.to(section.querySelector(".att-audience-glow"), {
    yPercent: -22,
    ease: "none",
    scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.7 },
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
      // Skip the two custom sections - they have their own animations
      if (section.classList.contains("att-why-section") || section.classList.contains("att-faq-section") || section.classList.contains("att-audience-section")) return;

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
    animateAudienceSection();
    // Work & Process custom animations
    animateWorkSection();
    animateProcessSection();

    ScrollTrigger.refresh();
  }, homePage.value);
}

onMounted(async () => {
  injectStructuredData();
  await nextTick();
  initFaqTabs();

  motionScrollHandler = () => {
    window.clearTimeout(motionFallbackTimer);
    motionFallbackTimer = window.setTimeout(() => {
      window.removeEventListener("scroll", motionScrollHandler);
      if ("requestIdleCallback" in window) {
        motionIdleCallback = window.requestIdleCallback(animateHomePage, { timeout: 3000 });
      } else {
        animateHomePage();
      }
    }, 500);
  };
  window.addEventListener("scroll", motionScrollHandler, { passive: true });
});

onBeforeUnmount(() => {
  if (motionScrollHandler) {
    window.removeEventListener("scroll", motionScrollHandler);
  }
  if (motionIdleCallback !== undefined && "cancelIdleCallback" in window) {
    window.cancelIdleCallback(motionIdleCallback);
  }
  window.clearTimeout(motionFallbackTimer);
  pointerCleanup?.();
  gsapContext?.revert();
  structuredDataScript?.remove();
});
</script>

<template>
  <main ref="homePage" class="home-motion-page">
    <!-- HERO SECTION - full replacement for .banner.banner-style-1 -->
    <div class="att-hero" id="top">
      <!-- Ambient background layers -->
      <div class="att-hero-grid" aria-hidden="true"></div>
      <div class="att-hero-glow att-hero-glow--gold" aria-hidden="true"></div>
      <div class="att-hero-glow att-hero-glow--blue" aria-hidden="true"></div>
      <canvas class="att-hero-canvas" id="attHeroCanvas" aria-hidden="true"></canvas>

      <div class="att-hero-wrap">
        <!-- ── Left: Copy column ── -->
        <div class="att-hero-copy">

          <!-- Eyebrow badge -->
          <div class="att-hero-eyebrow">
            <span class="att-hero-eyebrow-dot" aria-hidden="true"></span>
            <span class="att-hero-eyebrow-text">Strategy</span>
            <span class="att-hero-eyebrow-sep" aria-hidden="true">·</span>
            <span class="att-hero-eyebrow-text">Design</span>
            <span class="att-hero-eyebrow-sep" aria-hidden="true">·</span>
            <span class="att-hero-eyebrow-text">Development</span>
            <span class="att-hero-eyebrow-sep" aria-hidden="true">·</span>
            <span class="att-hero-eyebrow-text">Growth</span>
          </div>

          <!-- Headline -->
          <h1 class="att-hero-title">
            <span class="att-hero-title-line att-line-solid">Websites That</span>
            <span class="att-hero-title-line att-line-solid">Build Trust.</span>
            <span class="att-hero-title-line att-line-accent">Generate Leads.</span>
            <span class="att-hero-title-line att-line-outline">Drive Growth.</span>
          </h1>

          <!-- Subtitle -->
          <p class="att-hero-sub">
            Your website shouldn't just exist-it should generate qualified enquiries, build credibility, and support your sales team every day.
            <!-- We combine strategy, UX, development, SEO, and AI-ready optimization to create websites that become your highest-performing business asset. -->
          </p>

          <!-- Positioning line -->
          <p class="att-hero-position">
            Designed for businesses that are ready to grow - not just go online.
          </p>

          <!-- CTAs -->
          <div class="att-hero-ctas">
            <a class="att-hero-btn att-btn-primary"
              href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call.">
              Book Your Free Strategy Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="/projects" class="att-hero-btn att-btn-ghost">
              See Client Results
            </a>
          </div>

          <!-- Trust strip -->
          <div class="att-hero-trust">
            <span>🔒 Only 5 new businesses onboarded each month</span>
            <span aria-hidden="true">·</span>
            <span>Senior team execution</span>
            <span aria-hidden="true">·</span>
            <span>No outsourcing</span>
          </div>
        </div>

        <!-- ── Right: Live proof panel ── -->
        <div class="att-hero-panel">

          <AuditWidget />
        </div>
      </div>

      <!-- ── Metrics rail (full-width bottom strip) ── -->
      <div class="att-hero-metrics-rail">
        <div class="att-hero-metric">
          <span class="att-hero-metric-num gradient-text blue-light">30+</span>
          <span class="att-hero-metric-label">Projects Delivered</span>
        </div>
        <div class="att-hero-metric-divider" aria-hidden="true"></div>
        <div class="att-hero-metric">
          <span class="att-hero-metric-num gradient-text yellow-light">10+</span>
          <span class="att-hero-metric-label">Business Industries</span>
        </div>
        <div class="att-hero-metric-divider" aria-hidden="true"></div>
        <div class="att-hero-metric">
          <span class="att-hero-metric-num gradient-text green-light">98%</span>
          <span class="att-hero-metric-label">Client Satisfaction</span>
        </div>
        <div class="att-hero-metric-divider" aria-hidden="true"></div>
        <div class="att-hero-metric">
          <span class="att-hero-metric-num gradient-text text-lr">100%</span>
          <span class="att-hero-metric-label">Custom Strategy</span>
        </div>
      </div>

      <!-- Shapes (kept for existing CSS compatibility) -->
      <ul class="list-unstyled shape-group-banner" aria-hidden="true">
        <li class="shape shape-1"><img src="../assets/img/shapes/bubble-39.png" alt="" width="501" height="212" /></li>
        <li class="shape shape-2"><img src="../assets/img/shapes/bubble-38.png" alt="" width="339" height="370" /></li>
        <li class="shape shape-6"><img src="../assets/img/shapes/bubble-40.png" alt="" width="25" height="27" /></li>
        <li class="shape shape-7"><img src="../assets/img/shapes/bubble-41.png" alt="" width="39" height="43" /></li>
      </ul>
    </div>

    <section class="att-audience-section" aria-labelledby="audience-title">
      <div class="att-audience-glow" aria-hidden="true"></div>
      <div class="att-audience-inner">
        <div class="att-audience-header">
          <div class="att-audience-intro">
            <span class="att-audience-kicker inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em]">
              <span class="text-ly">Who We Work With</span>
            </span>
            <h2 id="audience-title" class="att-audience-title font-display font-bold text-dark">
              Not Every Business Needs a Better Website.<br />
              <span class="text-ly">The Right Businesses Need a Better Growth Partner.</span>
            </h2>
          </div>
          <p class="att-audience-copy">
            We intentionally partner with a limited number of businesses each quarter, so every client gets the strategic attention to move forward with confidence.
          </p>
        </div>
        <div class="att-audience-grid">
          <article class="att-audience-card"><span class="att-audience-icon material-symbols-outlined" aria-hidden="true">terminal</span><div><h3>SaaS &amp; Technology</h3><p>For founders and product teams ready to turn a promising product into a clear, credible digital experience.</p></div></article>
          <article class="att-audience-card"><span class="att-audience-icon material-symbols-outlined" aria-hidden="true">apartment</span><div><h3>Real Estate</h3><p>For property teams who need to earn trust early and guide every visitor toward the right next step.</p></div></article>
          <article class="att-audience-card"><span class="att-audience-icon material-symbols-outlined" aria-hidden="true">medical_services</span><div><h3>Healthcare</h3><p>For providers who want to make care easier to understand, access, and trust online.</p></div></article>
          <article class="att-audience-card"><span class="att-audience-icon material-symbols-outlined" aria-hidden="true">precision_manufacturing</span><div><h3>Manufacturing &amp; Industrial</h3><p>For established operators whose digital presence should reflect the quality and precision of their work.</p></div></article>
          <article class="att-audience-card"><span class="att-audience-icon material-symbols-outlined" aria-hidden="true">handshake</span><div><h3>Professional Services</h3><p>For expert teams where credibility is essential and a website is often the first proof of it.</p></div></article>
          <article class="att-audience-card"><span class="att-audience-icon material-symbols-outlined" aria-hidden="true">rocket_launch</span><div><h3>Growth-Stage Startups</h3><p>For teams scaling beyond the MVP and building a brand and platform that can keep pace.</p></div></article>
        </div>
        <div class="att-audience-foot"><span>Built around your next stage</span><span>Strategy <i></i> Design <i></i> Growth</span></div>
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
         WHAT IT'S LIKE WORKING WITH AMORTREE - Before / After Wipe Grid
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
            <p class="att-why-sub text-slate-800 max-w-xs mb-0 text-sm leading-relaxed">
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
              <span class="att-label-dot att-label-dot--gold">
                <span class="material-icons-outlined" style="font-size: 11px">check</span>
              </span>
              <span>Amortree</span>
            </div>
          </div>

          <!-- Pair 1 -->
          <div class="att-why-pair">
            <div class="att-why-cell att-cell-before">
              <span class="att-cell-icon-badge att-cell-icon-badge--before">
                <span class="material-symbols-outlined att-cell-icon">bolt</span>
              </span>
              <p class="att-cell-label">Designs first, asks strategy questions later - if at all.</p>
            </div>
            <div class="att-why-cell att-cell-after">
              <span class="att-cell-icon-badge att-cell-icon-badge--after">
                <span class="material-symbols-outlined att-cell-icon">target</span>
              </span>
              <p class="att-cell-label"><strong>Strategy before screens.</strong> Every visual decision traces back to a defined conversion goal.</p>
            </div>
          </div>

          <!-- Pair 2 -->
          <div class="att-why-pair">
            <div class="att-why-cell att-cell-before">
              <span class="att-cell-icon-badge att-cell-icon-badge--before">
                <span class="material-symbols-outlined att-cell-icon">thumb_down</span>
              </span>
              <p class="att-cell-label">Measures success by deliverables shipped, not revenue moved.</p>
            </div>
            <div class="att-why-cell att-cell-after">
              <span class="att-cell-icon-badge att-cell-icon-badge--after">
                <span class="material-symbols-outlined att-cell-icon">trending_up</span>
              </span>
              <p class="att-cell-label"><strong>Measured against business results.</strong> We track conversion lift, pipeline velocity, and ROAS - not just task completion.</p>
            </div>
          </div>

          <!-- Pair 3 -->
          <div class="att-why-pair">
            <div class="att-why-cell att-cell-before">
              <span class="att-cell-icon-badge att-cell-icon-badge--before">
                <span class="material-symbols-outlined att-cell-icon">casino</span>
              </span>
              <p class="att-cell-label">Creative direction based on gut feel and trend-chasing.</p>
            </div>
            <div class="att-why-cell att-cell-after">
              <span class="att-cell-icon-badge att-cell-icon-badge--after">
                <span class="material-symbols-outlined att-cell-icon">analytics</span>
              </span>
              <p class="att-cell-label"><strong>Decisions backed by data.</strong> We audit your current metrics before recommending a single screen.</p>
            </div>
          </div>

          <!-- Pair 4 -->
          <div class="att-why-pair">
            <div class="att-why-cell att-cell-before">
              <span class="att-cell-icon-badge att-cell-icon-badge--before">
                <span class="material-symbols-outlined att-cell-icon">logout</span>
              </span>
              <p class="att-cell-label">Hands off the file and disappears after launch day.</p>
            </div>
            <div class="att-why-cell att-cell-after">
              <span class="att-cell-icon-badge att-cell-icon-badge--after">
                <span class="material-symbols-outlined att-cell-icon">handshake</span>
              </span>
              <p class="att-cell-label"><strong>A partner past launch day.</strong> We keep tuning against live data long after the site goes live.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="home-motion-section att-solutions-section" id="solutions">
      <div class="att-solutions-inner">
        <div class="att-solutions-heading">
          <div>
            <span class="att-solutions-kicker"><span></span> How we help</span>
            <h2>Choose the right <span>growth system</span><br class="att-solutions-break" /> for your business.</h2>
          </div>
          <p>We do not sell fixed packages. We build the right system around your business model, your customers, and the growth you want next.</p>
        </div>

        <div class="att-solutions-grid">
          <article class="motion-card att-solution-card">
            <div class="att-solution-card-top">
              <span class="att-solution-icon material-symbols-outlined" aria-hidden="true">conversion_path</span>
              <span class="att-solution-type">Lead generation</span>
            </div>
            <h3><a href="/lead-generation">Generate more qualified leads</a></h3>
            <p class="att-solution-desc">Turn your website into a dependable source of better-fit enquiries.</p>
            <div class="att-solution-fit"><span>Built for</span><div><i>Professional services</i><i>Healthcare</i><i>Real estate</i><i>B2B teams</i></div></div>
            <div class="att-solution-outcome"><span class="att-solution-label">The outcome</span><strong>A predictable lead pipeline</strong><span class="att-solution-time">Typical delivery · 4–8 weeks</span></div>
            <a class="att-solution-link" href="/lead-generation">Explore lead generation <span class="material-symbols-outlined" aria-hidden="true">arrow_outward</span></a>
          </article>

          <article class="motion-card att-solution-card att-solution-card--featured">
            <div class="att-solution-card-top">
              <span class="att-solution-icon material-symbols-outlined" aria-hidden="true">shopping_bag</span>
              <span class="att-solution-type">E-commerce growth</span>
            </div>
            <h3>Grow online sales</h3>
            <p class="att-solution-desc">Remove friction from your storefront so more of your traffic becomes revenue.</p>
            <div class="att-solution-fit"><span>Built for</span><div><i>Shopify stores</i><i>D2C brands</i><i>Retail businesses</i></div></div>
            <div class="att-solution-outcome"><span class="att-solution-label">The outcome</span><strong>More value from every visit</strong><span class="att-solution-time">Typical delivery · 3–6 weeks</span></div>
            <a class="att-solution-link" href="https://wa.me/917975859061/?text=I%27d%20like%20to%20grow%20my%20online%20store.">Talk about your store <span class="material-symbols-outlined" aria-hidden="true">arrow_outward</span></a>
          </article>

          <article class="motion-card att-solution-card">
            <div class="att-solution-card-top">
              <span class="att-solution-icon material-symbols-outlined" aria-hidden="true">rocket_launch</span>
              <span class="att-solution-type">Startup launch</span>
            </div>
            <h3>Launch with confidence</h3>
            <p class="att-solution-desc">Bring your product, brand, and website together for a credible first impression.</p>
            <div class="att-solution-fit"><span>Built for</span><div><i>SaaS</i><i>Technology teams</i><i>Founders</i><i>MVPs</i></div></div>
            <div class="att-solution-outcome"><span class="att-solution-label">The outcome</span><strong>A foundation ready to scale</strong><span class="att-solution-time">Typical delivery · 6–10 weeks</span></div>
            <a class="att-solution-link" href="https://wa.me/917975859061/?text=I%27d%20like%20to%20discuss%20a%20startup%20launch.">Plan your launch <span class="material-symbols-outlined" aria-hidden="true">arrow_outward</span></a>
          </article>
        </div>

        <div class="att-solutions-cta">
          <div><span>Not sure which path fits?</span><p>Tell us where you want to go. We’ll help you choose the right next step.</p></div>
          <a class="amor-btn btn-fill-primary btn-large" href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call.">Book a free strategy call <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>
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
              <img alt="Data analytics dashboard" loading="lazy" decoding="async" width="2408" height="1872"
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
                  <img alt="Client" class="w-14 h-14" src="../assets/img/project/c4/icon-sa.svg" width="56" height="56" loading="lazy" decoding="async" />
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
         HOW WE WORK - 4-step process grid (reference: Our Approach)
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
            Every engagement follows a proven framework that balances creative ambition with strategic execution. We don't just build websites - we engineer growth systems.
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
            <div class="att-ps-desc">Information architecture, user flow, and visual execution - built against the strategy, not a template. Every pixel earns its place with intention.</div>
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
            <div class="att-ps-desc">Ongoing analytics monitoring to iterate and compound results. We keep tuning against live data long after launch day - not just hand off and disappear.</div>
            <div class="att-ps-week">Ongoing</div>
          </div>
        </div>
      </div>
    </section>

    <div class="d-none section serviceSec pt-5 section-padding" id="whatWeDo">
      <!-- legacy services grid - kept hidden -->
    </div>

    <!-- ============================================================
         RECENT WORK - Numbered row list (reference: On Going Projects)
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
            <img src="../assets/img/project/c4/project-thum-sa.png" alt="SteadyAsset" width="1899" height="1165" loading="lazy" decoding="async" />
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
            <div class="att-cs-desc">Full redesign from wireframes to high-fidelity UI/UX - restructured IA, new design system, and a measurable lift in task-completion rate.</div>
            <div class="att-cs-metrics">
              <div class="att-cs-metric">
                <span class="att-cs-metric-val">0%</span>
                <span class="att-cs-metric-label">Training Needed</span>
              </div>
            </div>
            <a href="project/savedesk" class="att-cs-arrow" aria-label="View SaveDesk">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
          <div class="att-cs-preview">
            <img src="../assets/img/project/c7/project-thum-sd.png" alt="SaveDesk" width="1899" height="1165" loading="lazy" decoding="async" />
          </div>
        </div>
        <hr class="att-cs-divider" />

        <!-- Row 3 -->
        <div class="att-cs-item">
          <div class="att-cs-inner">
            <div class="att-cs-num">03</div>
            <div class="att-cs-info">
              <div class="att-cs-tag">Brand Identity · UI/UX · Website</div>
              <div class="att-cs-name">Solved Cube</div>
            </div>
            <div class="att-cs-desc">Brand identity, UI/UX, and full website for an IT solutions company. Service-first layout with inquiry flows built to qualify leads, not just showcase expertise.</div>
            <div class="att-cs-metrics">
              <div class="att-cs-metric">
                <span class="att-cs-metric-val">5K</span>
                <span class="att-cs-metric-label">Visitors</span>
              </div>
            </div>
            <a href="project/solved-cube-it-solutions" class="att-cs-arrow" aria-label="View Solved Cube IT Solutions">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
          <div class="att-cs-preview">
            <img src="../assets/img/project/c2/project-thum-sc.png" alt="Solved Cube IT Solutions" width="1898" height="1165" loading="lazy" decoding="async" />
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
            <img src="../assets/img/project/c1/project-thum-uaeLinks.png" alt="UAE Links" width="1898" height="1165" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <div class="d-lg-flex justify-content-center" style="padding: 3rem 0 0">
        <a class="amor-btn btn-borderd light" href="/projects">Explore Projects</a>
      </div>
    </section>

    <!-- ============================================================
         TESTIMONIALS - GSAP Carousel
         ============================================================ -->
    <section class="tc-section" id="reviews">
      <div class="tc-bg-glow" aria-hidden="true"></div>

      <div class="tc-shell">
        <!-- Header -->
        <div class="tc-header">
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
            <span class="text-ly">In Their Words</span>
          </div>
          <h2 class="tc-heading">
            What Clients Say About <span class="text-ly">Working With Us</span>
          </h2>
          <p class="tc-sub">Real feedback from real clients - across industries, project types, and team sizes.</p>
        </div>

        <!-- Carousel -->
        <div
          class="tc-carousel"
          @mouseenter="tcStopAuto"
          @mouseleave="tcStartAuto"
        >
          <!-- Track - single active card -->
          <div class="tc-track" ref="tcTrackRef">
            <div class="tc-card">
              <!-- Quote mark -->
              <div class="tc-quote-mark">
                <span class="material-symbols-outlined">format_quote</span>
              </div>

              <!-- Tag -->
              <div class="tc-tag">{{ testimonials[tcActiveIndex].tag }}</div>

              <!-- Stars -->
              <div class="tc-stars">
                <span
                  v-for="s in 5"
                  :key="s"
                  class="material-symbols-outlined tc-star"
                  :class="{ 'tc-star--lit': s <= testimonials[tcActiveIndex].stars }"
                >star</span>
              </div>

              <!-- Quote text -->
              <blockquote class="tc-quote">
                "{{ testimonials[tcActiveIndex].quote }}"
              </blockquote>

              <!-- Author -->
              <div class="tc-author">
                <div class="tc-author-logo">
                  <img :src="testimonials[tcActiveIndex].logo" :alt="testimonials[tcActiveIndex].author" width="56" height="56" loading="lazy" decoding="async" />
                </div>
                <div class="tc-author-info">
                  <strong>{{ testimonials[tcActiveIndex].author }}</strong>
                  <span>{{ testimonials[tcActiveIndex].role }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Nav arrows -->
          <button class="tc-arrow tc-arrow--prev" @click="tcPrev" aria-label="Previous testimonial">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <button class="tc-arrow tc-arrow--next" @click="tcNext" aria-label="Next testimonial">
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <!-- Dot indicators + counter -->
        <div class="tc-footer">
          <div class="tc-dots">
            <button
              v-for="(t, i) in testimonials"
              :key="i"
              class="tc-dot"
              :class="{ 'tc-dot--active': i === tcActiveIndex }"
              @click="tcGoTo(i)"
              :aria-label="`Go to testimonial ${i + 1}`"
            ></button>
          </div>
          <div class="tc-counter">
            <span class="tc-counter-cur">{{ String(tcActiveIndex + 1).padStart(2, '0') }}</span>
            <span class="tc-counter-sep">/</span>
            <span class="tc-counter-tot">{{ String(tcTotal).padStart(2, '0') }}</span>
          </div>
        </div>

        <!-- Thumbnail strip -->
        <div class="tc-strip">
          <button
            v-for="(t, i) in testimonials"
            :key="'strip-' + i"
            class="tc-strip-item"
            :class="{ 'tc-strip-item--active': i === tcActiveIndex }"
            @click="tcGoTo(i); tcStopAuto(); tcStartAuto()"
          >
            <img :src="t.logo" :alt="t.author" width="56" height="56" loading="lazy" decoding="async" />
            <span>{{ t.author.split(',')[0] }}</span>
          </button>
        </div>
      </div>
    </section>




    <!-- ============================================================
         FAQ - Numbered Tab Rail + Expanding Stage
         ============================================================ -->
    <section class="att-faq-section py-28 px-6 bg-color-light overflow-hidden" id="faq">
      <div class="att-faq-inner">
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
              depending on scope - from a focused conversion-first landing page
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
              optimization continues after launch - we don't hand off and disappear.
            </p>
            <p class="att-answer-note">Timelines are defined upfront and updated at every milestone.</p>
          </div>
          <div class="att-faq-answer d-none" data-answer="2">
            <h3 class="att-answer-q">Do you only build websites, or do you handle marketing too?</h3>
            <p class="att-answer-body">
              We work across strategy, UX, development, SEO, and paid acquisition - because a website's performance
              depends on all of them working together, not just the design. A well-designed site sitting on a broken
              acquisition path still doesn't convert.
            </p>
            <p class="att-answer-note">The site is the system. We build the whole thing.</p>
          </div>
          <div class="att-faq-answer d-none" data-answer="3">
            <h3 class="att-answer-q">What industries do you work with?</h3>
            <p class="att-answer-body">
              Primarily real estate and professional service firms, SaaS and startup founders, and manufacturing
              and healthcare businesses. These are sectors where trust is earned before the first call - and the
              website is doing that work, or it isn't.
            </p>
            <a href="/projects" class="att-answer-link">See our Projects &rarr;</a>
          </div>
          <div class="att-faq-answer d-none" data-answer="4">
            <h3 class="att-answer-q">What happens after I book a strategy call?</h3>
            <p class="att-answer-body">
              We review your current site and metrics before the call, so the conversation starts with specific
              observations about your business - not a generic sales pitch. You'll leave with a clear picture of
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
            href="https://calendar.app.google/oxixnGZCQPPcqaWd6" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          <a href="/estimate" class="amor-btn btn-borderd light">Get a Project Estimate</a>
        </div>
        <p class="mt-5 text-center text-slate-500 text-xs mb-0">
          <small>No pressure, no obligation - just clarity on what your website should be doing for your business.</small>
        </p>
      </div>
    </section>

    <!-- Legacy sections - hidden, kept for reference -->
    <section class="d-none section section-padding-equal bg-color-white" id="about"></section>
    <section class="d-none section section-padding faqSec bg-color-light"></section>
  </main>
</template>

<style lang="scss" scoped>
// ── Core layout ──────────────────────────────────────────────────
.att-hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
}

// ── Ambient layers ────────────────────────────────────────────────
.att-hero-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url(../assets/img/banner-bg.svg);
  background-attachment: fixed;
  background-position: center -8.625rem;
  background-size: cover;
  background-repeat: no-repeat;
  pointer-events: none;

  &:after {
    content: "";
    height: 100%;
    left: 0;
    opacity: 0.8;
    background: linear-gradient(180deg, var(--color-light) 25%, var(--color-light) 100%);
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -2;
  }
}

.att-hero-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.att-hero-glow--gold {
  width: 700px;
  height: 700px;
  top: -15%;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(250,204,21,0.09) 0%, rgba(250,204,21,0.04) 40%, transparent 70%);
  filter: blur(60px);
}

.att-hero-glow--blue {
  width: 500px;
  height: 500px;
  top: 10%;
  right: -8%;
  background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%);
  filter: blur(70px);
}

.att-hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.4;
}

.att-audience-section {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: clamp(5rem, 9vw, 8.5rem) 1.5rem clamp(8rem, 12vw, 11rem);
  color: #22252a;
  background: #fff;
}

.att-audience-glow {
  position: absolute;
  z-index: -1;
  top: 5%;
  right: -14rem;
  width: 38rem;
  height: 38rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(229, 197, 53, .09), rgba(229, 197, 53, 0) 68%);
  pointer-events: none;
}

.att-audience-inner { max-width: 1320px; margin: 0 auto; }
.att-audience-header { display: grid; grid-template-columns: minmax(0, 1fr) minmax(240px, .36fr); gap: clamp(2rem, 6vw, 6rem); align-items: end; margin-bottom: clamp(2.5rem, 5vw, 4.5rem); }
.att-audience-kicker { margin-bottom: 1rem; }
.att-audience-title { max-width: 900px; margin: 0; color: #202124; font-size: clamp(2rem, 4.5vw, 4.25rem); font-weight: 600; letter-spacing: -.045em; line-height: 1.08; }
.att-audience-copy { max-width: 350px; margin: 0 0 .35rem auto; color: #555b64; font-size: clamp(.98rem, 1.2vw, 1.1rem); line-height: 1.8; }
.att-audience-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid #e4e5e2; }
.att-audience-card { position: relative; display: grid; grid-template-columns: 3rem minmax(0, 1fr); gap: 1.15rem; align-items: start; min-height: 190px; padding: 2rem 1.5rem 1.8rem 0; border-bottom: 1px solid #e4e5e2; }
.att-audience-card:not(:nth-child(3n + 1)) { padding-left: 1.5rem; border-left: 1px solid #e4e5e2; }
.att-audience-icon { color: #5cb04e; font-size: 2rem; line-height: 1; }
.att-audience-card h3 { margin: 0 0 .65rem; color: #202124; font-size: clamp(1.1rem, 1.55vw, 1.4rem); font-weight: 650; letter-spacing: -.025em; }
.att-audience-card p { max-width: 330px; margin: 0; color: #60656d; font-size: .94rem; line-height: 1.65; }
.att-audience-foot { display: flex; justify-content: space-between; gap: 1rem; padding-top: 1.3rem; color: #777b80; font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.att-audience-foot > span:last-child { display: inline-flex; align-items: center; gap: .7rem; }
.att-audience-foot i { width: 3px; height: 3px; border-radius: 50%; background: var(--color-primaryY, #e5c535); }

.att-solutions-section { position: relative; overflow: hidden; padding: clamp(5.5rem, 9vw, 8rem) 1.5rem; color: #fff; background: #101010; }
.att-solutions-inner { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; }
.att-solutions-heading { display: grid; grid-template-columns: minmax(0, 1fr) minmax(250px, .38fr); align-items: end; gap: clamp(2rem, 6vw, 6rem); margin-bottom: clamp(2.5rem, 5vw, 4rem); }
.att-solutions-kicker { display: inline-flex; align-items: center; gap: .65rem; margin-bottom: 1rem; color: #d8d8d8; font-size: .7rem; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; }
.att-solutions-kicker > span { width: 1.7rem; height: 2px; background: var(--color-primaryY, #e5c535); }
.att-solutions-heading h2 { max-width: 850px; margin: 0; color: #fff; font-family: var(--font-secondary, sans-serif); font-size: clamp(2.4rem, 5.2vw, 4.6rem); font-weight: 600; letter-spacing: -.05em; line-height: 1.06; }
.att-solutions-heading h2 > span { color: var(--color-primaryY, #e5c535); }
.att-solutions-heading > p { max-width: 360px; margin: 0 0 .4rem auto; color: #b7b7b7; font-size: 1rem; line-height: 1.8; }
.att-solutions-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.1rem; perspective: 1000px; }
.att-solution-card { position: relative; display: flex; flex-direction: column; min-height: 450px; padding: clamp(1.5rem, 2.5vw, 2.1rem); border: 1px solid #333; border-radius: 1.15rem; background: linear-gradient(155deg, #1b1b1b 0%, #151515 100%); transition: transform .35s ease, border-color .35s ease, background .35s ease, box-shadow .35s ease; }
.att-solution-card::before { position: absolute; top: -1px; right: 1.5rem; left: 1.5rem; height: 2px; border-radius: 0 0 3px 3px; background: linear-gradient(90deg, transparent, var(--color-primaryY, #e5c535), transparent); content: ""; opacity: 0; transition: opacity .3s ease; }
.att-solution-card:hover, .att-solution-card--featured { transform: translateY(-5px); border-color: rgba(229, 197, 53, .45); box-shadow: 0 24px 60px rgba(0, 0, 0, .2); }
.att-solution-card:hover::before, .att-solution-card--featured::before { opacity: 1; }
.att-solution-card-top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; }
.att-solution-icon { display: grid; width: 3.35rem; height: 3.35rem; place-items: center; border: 1px solid rgba(229, 197, 53, .32); border-radius: 1rem; background: rgba(229, 197, 53, .09); color: var(--color-primaryY, #e5c535); font-size: 1.7rem; }
.att-solution-type { color: #a9a9a9; font-size: .68rem; font-weight: 750; letter-spacing: .15em; text-transform: uppercase; }
.att-solution-card h3 { margin: 0 0 .8rem; color: #fff; font-size: clamp(1.45rem, 2vw, 1.85rem); font-weight: 650; letter-spacing: -.035em; line-height: 1.2; }
.att-solution-card h3 a { color: inherit; text-decoration: none; }
.att-solution-card h3 a:hover { color: var(--color-primaryY, #e5c535); }
.att-solution-desc { min-height: 3.3rem; margin: 0 0 1.65rem; color: #b8b8b8; font-size: .94rem; line-height: 1.7; }
.att-solution-fit { margin-bottom: 1.6rem; }
.att-solution-fit > span, .att-solution-label { display: block; margin-bottom: .7rem; color: #929292; font-size: .66rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
.att-solution-fit > div { display: flex; flex-wrap: wrap; gap: .45rem; }
.att-solution-fit i { padding: .4rem .65rem; border: 1px solid #373737; border-radius: 999px; color: #d2d2d2; font-size: .72rem; font-style: normal; line-height: 1; }
.att-solution-outcome { margin-top: auto; padding: 1.25rem 0 1.15rem; border-top: 1px solid #373737; }
.att-solution-outcome strong { display: block; margin-bottom: .35rem; color: #fff; font-size: 1.05rem; font-weight: 650; }
.att-solution-time { color: #939393; font-size: .78rem; }
.att-solution-link { display: inline-flex; align-items: center; gap: .45rem; align-self: flex-start; color: #e5c535; font-size: .83rem; font-weight: 700; text-decoration: none; }
.att-solution-link .material-symbols-outlined { font-size: 1rem; transition: transform .25s ease; }
.att-solution-link:hover { color: #f2d84f; }
.att-solution-link:hover .material-symbols-outlined { transform: translate(3px, -3px); }
.att-solutions-cta { display: flex; align-items: center; justify-content: space-between; gap: 2rem; margin-top: 1.5rem; padding: 1.75rem 2rem; border: 1px solid #303030; border-radius: 1rem; background: #171717; }
.att-solutions-cta > div > span { color: #fff; font-size: 1.1rem; font-weight: 650; }
.att-solutions-cta p { margin: .35rem 0 0; color: #aaa; font-size: .88rem; }
.att-solutions-cta .amor-btn { display: inline-flex; align-items: center; gap: .5rem; white-space: nowrap; text-decoration: none; }
.att-solutions-cta .material-symbols-outlined { font-size: 1.1rem; }

@media (max-width: 900px) {
  .att-solutions-heading { grid-template-columns: 1fr; gap: 1.25rem; }
  .att-solutions-heading > p { max-width: 560px; margin-left: 0; }
  .att-solutions-grid { grid-template-columns: 1fr; }
  .att-solution-card { min-height: 0; }
}
@media (max-width: 600px) {
  .att-solutions-section { padding-right: 1.15rem; padding-left: 1.15rem; }
  .att-solutions-break { display: none; }
  .att-solutions-cta { align-items: flex-start; flex-direction: column; padding: 1.4rem; }
  .att-solutions-cta .amor-btn { white-space: normal; }
}

@media (max-width: 900px) {
  .att-audience-header { grid-template-columns: 1fr; gap: 1.5rem; }
  .att-audience-copy { max-width: 560px; margin-left: 0; }
  .att-audience-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .att-audience-card:not(:nth-child(3n + 1)) { padding-left: 0; border-left: 0; }
  .att-audience-card:nth-child(2n) { padding-left: 1.5rem; border-left: 1px solid #e4e5e2; }
}

@media (max-width: 600px) {
  .att-audience-section { padding-right: 1.15rem; padding-left: 1.15rem; }
  .att-audience-title br { display: none; }
  .att-audience-grid { grid-template-columns: 1fr; }
  .att-audience-card, .att-audience-card:not(:nth-child(3n + 1)), .att-audience-card:nth-child(2n) { min-height: 0; grid-template-columns: 2.5rem minmax(0, 1fr); gap: 1rem; padding: 1.55rem 1.2rem; border-left: 0; }
  .att-audience-icon { font-size: 1.7rem; }
  .att-audience-foot { flex-direction: column; gap: .7rem; }
}

// ── Main two-column layout ─────────────────────────────────────────
.att-hero-wrap {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 9rem 4rem 2rem;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 5rem;
  align-items: center;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
    padding: 7rem 2rem 3rem;
  }

  @media (max-width: 768px) {
    padding: 7rem .45rem 2.5rem;
    width: 94%;
  }
}

// ── Copy column ───────────────────────────────────────────────────
.att-hero-copy {
  display: flex;
  flex-direction: column;
  gap: 0;
}

// Eyebrow
.att-hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1rem;
  border: 1px solid rgba(250,204,21,0.25);
  border-radius: 999px;
  background: rgba(250,204,21,0.06);
  width: fit-content;
  margin-bottom: 2rem;
  will-change: transform, opacity;
}

.att-hero-eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #facc15;
  flex-shrink: 0;
  animation: att-pulse-dot 2s ease-in-out infinite;
}

@keyframes att-pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(1.4); }
}

.att-hero-eyebrow-text {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #facc15;

  @media (max-width: 768px) {
    font-size: 0.625rem;
  }
}

.att-hero-eyebrow-sep {
  color: rgba(250,204,21,0.35);
  font-size: 0.75rem;
}

// Headline
.att-hero-title {
  font-size: clamp(2.8rem, 5.5vw, 4.125rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin: 0 0 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.08em;
}

.att-hero-title-line {
  display: block;
  will-change: transform, opacity;
}

.att-line-solid {
  color: #f8fafc;
}

// "Generate Leads." - yellow filled
.att-line-accent {
  color: #facc15;
}

// "Drive Growth." - outline text, the signature element
.att-line-outline {
  color: transparent;
  -webkit-text-stroke: 2px rgba(248,250,252,0.55);
  text-stroke: 2px rgba(248,250,252,0.55);
  transition: -webkit-text-stroke-color 0.3s ease;

  .att-hero:hover & {
    -webkit-text-stroke-color: rgba(250,204,21,0.7);
  }
}

// Subtitle
.att-hero-sub {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #94a3b8;
  max-width: 52ch;
  margin: 0 0 1rem;
  will-change: transform, opacity;
}

// Positioning line
.att-hero-position {
  font-size: 0.9rem;
  font-weight: 600;
  color: #facc15;
  margin: 0 0 2.25rem;
  will-change: transform, opacity;
}

// CTAs
.att-hero-ctas {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  will-change: transform, opacity;
}

.att-hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover { transform: translateY(-2px); }
}

.att-btn-primary {
  background: #facc15;
  color: #0f172a;

  &:hover {
    background: #f0b429;
    box-shadow: 0 12px 36px rgba(250,204,21,0.35);
  }
}

.att-btn-ghost {
  border-color: rgba(255,255,255,0.18);
  color: rgba(248,250,252,0.75);
  background: transparent;

  &:hover {
    border-color: rgba(255,255,255,0.4);
    color: #f8fafc;
    background: rgba(255,255,255,0.05);
  }
}

// Trust strip
.att-hero-trust {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: #7289aa;
  will-change: transform, opacity;

  span[aria-hidden] { color: #334155; }
}

// ── Right panel ───────────────────────────────────────────────────
.att-hero-panel {
  position: relative;
  will-change: transform, opacity;

  @media (max-width: 1024px) {
    max-width: 520px;
    margin: 0 auto;
    width: 100%;
  }
}

// Main card
.att-panel-card {
  background: linear-gradient(160deg, #121218 0%, #1a1a24 100%);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.5rem;
  padding: 1.75rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 32px;
    right: 32px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(250,204,21,0.4), transparent);
  }
}

.att-panel-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.att-panel-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4ade80;
  font-weight: 600;
}

.att-panel-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: att-pulse-dot 2s ease-in-out infinite;
}

.att-panel-score {
  font-size: 0.78rem;
  font-weight: 700;
  color: #facc15;
  border: 1px solid rgba(250,204,21,0.2);
  background: rgba(250,204,21,0.08);
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  letter-spacing: 0.04em;
}

// Metric bars
.att-panel-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.att-panel-metric {}

.att-panel-metric-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.35rem;
}

.att-panel-metric-label {
  font-size: 0.72rem;
  color: #64748b;
  letter-spacing: 0.04em;
}

.att-panel-metric-val {
  font-size: 0.78rem;
  font-weight: 700;
  color: #facc15;
  font-variant-numeric: tabular-nums;
}

.att-panel-bar {
  height: 5px;
  background: rgba(255,255,255,0.06);
  border-radius: 99px;
  overflow: hidden;
}

.att-panel-bar-fill {
  height: 100%;
  background: #facc15;
  border-radius: 99px;
  width: 0; // animated in by GSAP
  transition: width 1s ease;
  box-shadow: 0 0 8px rgba(250,204,21,0.3);
}

.att-bar-blue  { background: #60a5fa; box-shadow: 0 0 8px rgba(96,165,250,0.3); }
.att-bar-green { background: #4ade80; box-shadow: 0 0 8px rgba(74,222,128,0.3); }

// Floating ROAS card
.att-panel-roas {
  position: absolute;
  top: -1.25rem;
  right: -1rem;
  background: #0f172a;
  border: 1px solid rgba(250,204,21,0.2);
  border-radius: 1rem;
  padding: 0.85rem 1.15rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 16px 48px rgba(0,0,0,0.5);
  z-index: 2;
  animation: att-float-a 5s ease-in-out infinite;

  @media (max-width: 480px) { display: none; }
}

.att-panel-roas-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(250,204,21,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #facc15;

  .material-symbols-outlined { font-size: 1.1rem; }
}

.att-panel-roas-val {
  font-size: 1.35rem;
  font-weight: 900;
  color: #facc15;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.att-panel-roas-label {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #475569;
  margin-top: 0.15rem;
}

// Floating mini badges
.att-panel-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  z-index: 2;
  backdrop-filter: blur(8px);

  .material-symbols-outlined { font-size: 0.9rem; }
}

.att-badge-clients {
  bottom: -1rem;
  left: -1.5rem;
  background: rgba(96,165,250,0.12);
  border: 1px solid rgba(96,165,250,0.25);
  color: #93c5fd;
  animation: att-float-b 6s ease-in-out infinite;

  @media (max-width: 480px) { display: none; }
}

.att-badge-satisfaction {
  bottom: 2.5rem;
  left: -2rem;
  background: rgba(74,222,128,0.1);
  border: 1px solid rgba(74,222,128,0.2);
  color: #86efac;
  animation: att-float-c 7s ease-in-out infinite;

  @media (max-width: 480px) { display: none; }
}

@keyframes att-float-a {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
@keyframes att-float-b {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50%       { transform: translateY(-5px) translateX(4px); }
}
@keyframes att-float-c {
  0%, 100% { transform: translateY(0px); }
  40%       { transform: translateY(6px); }
}

// ── Metrics rail ──────────────────────────────────────────────────
.att-hero-metrics-rail {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  margin-top: auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.att-hero-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.75rem 1rem;
  gap: 0.35rem;
  border-right: 1px solid rgba(255,255,255,0.06);

  &:last-child { border-right: none; }

  @media (max-width: 768px) {
    &:nth-child(3) { border-right: none; } // 2-col: 3rd item no right border
    &:nth-child(2n) { border-right: none; }
    &:nth-child(3), &:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.06); }
  }
}

.att-hero-metric-divider { display: none; } // handled by grid border-right

.att-hero-metric-num {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.att-hero-metric-label {
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #475569;
  font-weight: 500;
  text-align: center;
}

// ── Responsive ────────────────────────────────────────────────────
@media (max-width: 640px) {
  .att-hero-title { font-size: clamp(3rem, 8vw, 3.2rem); }
  .att-hero-ctas  { 
    display: grid;
    justify-content: center; 
  }
  .att-hero-trust { flex-wrap: wrap; }
}
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
}

.att-why-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 50px 100px -40px rgba(15, 23, 42, 0.16);
}

.att-why-label-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #0f172a;

  .att-col-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.5rem;
    font-size: 0.65rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #64748b;

    &--before {
      background: rgba(239, 68, 68, 0.05);
      border-right: 1px solid rgba(255, 255, 255, 0.06);
    }
    &--after {
      background: rgba(228, 197, 53, 0.1);
      color: #f4de85;
    }
  }

  .att-label-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &--red  { background: rgba(239,68,68,0.15); color: #f87171; }
    &--gold {
      background: rgba(228, 197, 53, 0.18);
      color: #e4c535;
      box-shadow: 0 0 0 4px rgba(228, 197, 53, 0.1);
    }
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
  gap: 1.1rem;
  padding: 1.75rem 2rem;
  transition: background 0.3s ease;

  // Clip-path starts collapsed - GSAP animates it open
  clip-path: inset(0 0 0 0);

  &.att-cell-before {
    background: #fafafa;
    border-right: 1px solid #e2e8f0;

    .att-cell-label { color: #64748b; }
  }

  &.att-cell-after {
    background: linear-gradient(135deg, #fffefb 0%, #fffbeb 100%);
    box-shadow: inset 3px 0 0 0 rgba(228, 197, 53, 0.55);

    .att-cell-label {
      color: #1e293b;

      strong {
        color: #0f172a;
        background: linear-gradient(120deg, rgba(228, 197, 53, 0.28), rgba(228, 197, 53, 0.28)) no-repeat;
        background-size: 100% 40%;
        background-position: 0 88%;
        padding: 0 0.15rem;
      }
    }
  }

  &:hover.att-cell-after {
    background: linear-gradient(135deg, #fffdf5 0%, #fef7de 100%);
  }
}

.att-cell-icon-badge {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.05rem;

  &--before {
    background: rgba(239, 68, 68, 0.07);
  }
  &--after {
    background: rgba(228, 197, 53, 0.14);
    box-shadow: 0 0 0 1px rgba(228, 197, 53, 0.3) inset;
  }
}

.att-cell-icon {
  font-size: 1.35rem;
  will-change: transform, opacity;
}

.att-cell-icon-badge--before .att-cell-icon { color: #fca5a5; }
.att-cell-icon-badge--after .att-cell-icon { color: #c9a227; }

.att-cell-label {
  font-size: 0.9375rem;
  line-height: 1.65;
  margin: 0;
  padding-top: 0.35rem;
}

@media (max-width: 768px) {
  .att-why-pair { grid-template-columns: 1fr; }
  .att-why-label-row { grid-template-columns: 1fr; }
  .att-why-label-row .att-col-label--before { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .att-why-cell.att-cell-before { border-right: none; border-bottom: 1px solid #e2e8f0; }
}

// ─── FAQ - Tab Rail + Stage ───────────────────────────────────────────────────
.att-faq-section {
  background: var(--color-bg-light, #f8fafc);
}

.att-faq-inner {
  max-width: 860px;
  margin: 0 auto;
}

.att-faq-rail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 1px; // so ticker doesn't clip
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

// Sliding underline ticker - positioned by JS
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


// ─── Recent Work - Numbered Row List ─────────────────────────────────────────
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
  grid-template-columns: 80px 1fr 1fr 180px 80px;
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
  color: #32373d;
  line-height: 1.65;
  font-weight: 400;
  transition: color 0.3s ease;

  .att-cs-item:hover & { color: #475569; }
}

.att-cs-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-start;

  @media (max-width: 1100px) { display: none; }
}

.att-cs-metric {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  flex-direction: column;
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

// Hover preview - slides in from right
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

// ─── Process - 4-Step Grid ───────────────────────────────────────────────────
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

  // Ghost step number - decorative
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

// Bottom-border swipe line - injected by GSAP
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

// ─── Testimonials Carousel ────────────────────────────────────────
.tc-section {
  position: relative;
  background: #07080e;
  padding: clamp(4rem, 9vw, 7rem) 0;
  overflow: hidden;
}

.tc-bg-glow {
  position: absolute;
  top: -160px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 500px;
  background: radial-gradient(ellipse at 50% 30%, rgba(250, 204, 21, 0.07), transparent 65%);
  pointer-events: none;
}

.tc-shell {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 600px) { padding: 0 1.25rem; }
}

// Header
.tc-header {
  text-align: center;
  margin-bottom: 3rem;
}

.tc-heading {
  font-size: clamp(1.8rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 0.75rem;
}

.tc-sub {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.65;
}

// Carousel wrapper
.tc-carousel {
  position: relative;
  margin-bottom: 2rem;
}

// Track
.tc-track {
  min-height: 360px;
  display: flex;
  align-items: stretch;
}

// The single visible card
.tc-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 24px;
  padding: 2.75rem 3rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  will-change: opacity, transform;

  // top-left yellow accent line
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, #facc15, rgba(250, 204, 21, 0.12));
    border-radius: 0 0 3px 0;
  }

  // subtle inner glow
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 0% 0%, rgba(250, 204, 21, 0.05), transparent 55%);
    pointer-events: none;
  }

  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
  }
}

// Large quote mark
.tc-quote-mark {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  color: rgba(250, 204, 21, 0.12);

  .material-symbols-outlined {
    font-size: 5rem;
    line-height: 1;
    font-variation-settings: "FILL" 1;
  }
}

// Service tag
.tc-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.28rem 0.7rem;
  border-radius: 6px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.2);
  color: #facc15;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  width: fit-content;
}

// Stars
.tc-stars {
  display: flex;
  gap: 2px;
}

.tc-star {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.15);
  font-variation-settings: "FILL" 0;

  &--lit {
    color: #facc15;
    font-variation-settings: "FILL" 1;
  }
}

// Quote
.tc-quote {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-style: italic;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.8;
  font-weight: 300;
  margin: 0;
  flex: 1;
  position: relative;
  z-index: 1;
}

// Author
.tc-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  margin-top: auto;
  position: relative;
  z-index: 1;
}

.tc-author-logo {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.9;
  }
}

.tc-author-info {
  strong {
    display: block;
    font-size: 0.88rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
  }

  span {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
  }
}

// Nav arrows
.tc-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
  z-index: 4;

  .material-symbols-outlined { font-size: 1.2rem; }

  &:hover {
    background: #facc15;
    border-color: #facc15;
    color: #0f172a;
    transform: translateY(-50%) scale(1.08);
  }

  &--prev { left: -52px; }
  &--next { right: -52px; }

  @media (max-width: 600px) {
    &--prev { left: -12px; }
    &--next { right: -12px; }
  }
}

// Footer row
.tc-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

// Dots
.tc-dots {
  display: flex;
  gap: 0.45rem;
}

.tc-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, width 0.35s ease, border-radius 0.35s ease;

  &--active {
    width: 24px;
    border-radius: 3px;
    background: #facc15;
  }
}

// Counter
.tc-counter {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-variant-numeric: tabular-nums;
}

.tc-counter-cur {
  font-size: 1.1rem;
  font-weight: 900;
  color: #facc15;
}

.tc-counter-sep {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.25);
}

.tc-counter-tot {
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.35);
}

// Thumbnail strip
.tc-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.tc-strip-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem 0.4rem 0.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s, color 0.25s;

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.5;
    transition: opacity 0.25s;
  }

  &--active,
  &:hover {
    background: rgba(250, 204, 21, 0.1);
    border-color: rgba(250, 204, 21, 0.35);
    color: #facc15;

    img { opacity: 1; filter: brightness(0) saturate(100%) invert(86%) sepia(68%) saturate(500%) hue-rotate(0deg); }
  }
}

</style>
