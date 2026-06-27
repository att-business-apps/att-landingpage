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

// ---------------------------------------------------------------
// Structured data: Organization, Services, Reviews, and FAQPage.
// Injected as a single JSON-LD <script> tag so search engines and
// AI answer engines can read Amortree's offerings, client reviews,
// and FAQ content as machine-readable facts, not just prose.
// Built only from content that's actually live on this page.
// ---------------------------------------------------------------
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
        name: "Lead Generation Systems",
        provider: { "@id": `${siteUrl}/#organization` },
        description:
          "Conversion-focused landing pages, paid campaign structure, and CRM integration built for B2B and service businesses that need a website to qualify leads, not just introduce the brand.",
        url: `${siteUrl}/lead-generation-systems`,
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-ecommerce`,
        name: "E-commerce Growth",
        provider: { "@id": `${siteUrl}/#organization` },
        description:
          "Checkout and product page optimization, performance creative, and retention flows for Shopify and custom stores where the storefront is the limiting factor on revenue.",
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-startup`,
        name: "Startup Launch Foundations",
        provider: { "@id": `${siteUrl}/#organization` },
        description:
          "Rapid product UI/UX prototyping, investor-ready pitch platforms, and a modern, scalable tech stack for founders launching a new product or business.",
      },
      {
        "@type": "Review",
        itemReviewed: { "@id": `${siteUrl}/#organization` },
        author: { "@type": "Person", name: "Menaka Krishna" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Amortree is a very professional and end-to-end service provider. They have good understanding of the clients needs and work in a timely and efficient manner.",
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
              text:
                "Most engagements fall between \u20b950,000 and \u20b95,00,000, depending on scope, from a focused conversion-first landing page to a full lead-generation system with CRM integration. Exact pricing is scoped after a strategy call.",
            },
          },
          {
            "@type": "Question",
            name: "How long does a project take?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Most projects run 4 to 10 weeks from strategy to launch, depending on scope: 1 to 2 weeks for audit and strategy, 2 to 6 weeks for design and build, then ongoing optimization after launch.",
            },
          },
          {
            "@type": "Question",
            name: "Do you only build websites, or do you handle marketing too?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Amortree works across strategy, UX, development, SEO, and paid acquisition, because a website's performance depends on all of them working together, not just the design.",
            },
          },
          {
            "@type": "Question",
            name: "What industries does Amortree work with?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Amortree works primarily with real estate and professional service firms, SaaS and startup founders, and manufacturing and healthcare businesses.",
            },
          },
          {
            "@type": "Question",
            name: "What happens after I book a strategy call with Amortree?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Amortree reviews the prospective client's current site and metrics before the call, so the conversation starts with specific observations about the business rather than a generic sales pitch.",
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

  if (!params.from_name) {
    alert("Please enter your name");
    return;
  }
  if (!params.email) {
    alert("Please enter your email");
    return;
  }
  if (!params.phoneNumber) {
    alert("Please enter your phone number");
    return;
  }
  if (!params.message) {
    alert("Please enter your requirement");
    return;
  }

  disableBtn.value = true;
  emailjs
    .send(serviceID, getTemplate("admin"), params)
    .then((res) => {
      from_name.value = "";
      email.value = "";
      phoneNumber.value = "";
      message.value = "";
      console.log(res);
      disableBtn.value = false;
    })
    .catch((err) => console.log(err));
  emailjs
    .send(serviceID, getTemplate("customer"), params)
    .then((res) => {
      from_name.value = "";
      email.value = "";
      phoneNumber.value = "";
      message.value = "";
      console.log(res);
      disableBtn.value = false;
    })
    .catch((err) => console.log(err));
}

function getTemplate(target) {
  if (target == "admin") return "template_tcauze5";
  if (target == "customer") return "template_svj7071";
}

function animateHomePage() {
  if (!homePage.value) return;

  pointerCleanup?.();
  pointerCleanup = undefined;
  gsapContext?.revert();
  gsapContext = gsap.context(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // All animatable elements across the page, reset to a clean default so
    // a reduced-motion visitor (or a failed animation) never sees broken layout.
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

    // ---------------------------------------------------------------
    // Hero: a single, orchestrated entrance. No scroll-scrubbed motion
    // here — the hero's job is to land cleanly and let the content read.
    // ---------------------------------------------------------------
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".home-banner .inline-flex", {
        y: 16,
        autoAlpha: 0,
        duration: 0.6,
      })
      .fromTo(
        ".hero-title-token",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          immediateRender: false,
        },
        "-=0.2",
      )
      .from(".home-banner .h5 span", {
        y: 14,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.5,
      }, "-=0.35")
      .from(".home-banner .subtitle", {
        y: 16,
        autoAlpha: 0,
        duration: 0.6,
      }, "-=0.3")
      .from(".home-banner .amor-btn", {
        y: 14,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.5,
      }, "-=0.25")
      .from(".home-metric", {
        y: 16,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 0.5,
      }, "-=0.2")
      .fromTo(
        ".banner-form",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          immediateRender: false,
          clearProps: "opacity,visibility",
        },
        "-=0.35",
      );

    // A restrained drift on the background shapes only — the one ambient
    // touch left in the hero. Foreground content stays put on scroll.
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

    // ---------------------------------------------------------------
    // Section reveals: one calm fade + rise per heading/card group,
    // played once on entry. No scrub, no rotation, no blur stacking.
    // ---------------------------------------------------------------
    const pageSections = [
      ...homePage.value.querySelectorAll(":scope > section:not(.d-none)"),
    ];

    pageSections.forEach((section) => {
      const headingItems = section.querySelectorAll("h2, h3, .section-heading, .motion-text");
      const cards = section.querySelectorAll(".motion-card, .review-card, .glass-card, .step-arrow, .project-grid, .why > div");

      if (headingItems.length) {
        gsap.from(headingItems, {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      if (cards.length) {
        gsap.from(cards, {
          y: 32,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    });

    // ---------------------------------------------------------------
    // Quiet hover lift for cards — the only motion that lives outside
    // scroll. Single property, fast, no shadow re-paints on every frame.
    // ---------------------------------------------------------------
    gsap.utils.toArray(".motion-card, .review-card, .glass-card, .project-grid")
      .forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -4, duration: 0.25, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        });
      });

    ScrollTrigger.refresh();
  }, homePage.value);
}

onMounted(async () => {
  injectStructuredData();
  await nextTick();
  animateHomePage();
});

onBeforeUnmount(() => {
  pointerCleanup?.();
  gsapContext?.revert();
  structuredDataScript?.remove();
});

// New Year
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
                    <span class="relative flex h-2 w-2">
                      <span
                        class="animate-ping absolute d-block justify-center items-center h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span class="relative d-block rounded-full h-2 w-2 bg-blue-600"></span>
                    </span>
                    Design
                    <span class="relative flex h-2 w-2">
                      <span
                        class="animate-ping absolute d-block justify-center items-center h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span class="relative d-block rounded-full h-2 w-2 bg-blue-600"></span>
                    </span>
                    Development
                    <span class="relative flex h-2 w-2">
                      <span
                        class="animate-ping absolute d-block justify-center items-center h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span class="relative d-block rounded-full h-2 w-2 bg-blue-600"></span>
                    </span>
                    Growth
                  </div>
                </div>
                <!-- <h1 class="title d-inline" ref="myElement">
                  Get 20-40
                  <span class="gradient-text-light">Qualified Leads</span>
                  Monthly with
                  <span class="gradient-text-light">Data-Driven Design</span>
                </h1> -->

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
                    <span class="text-3xl font-bold text-primary gradient-text yellow-light">20+</span>
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
                <h4 class="mb-2">
                  We’d love to know more about your project needs!
                </h4>
                <p class="mb-3">
                  Submit your query, and we’ll reach out to you shortly!
                </p>
                <div class="form-group mb--40">
                  <!-- <label>How can we help you?</label> -->
                  <textarea name="contact-message" id="message" class="form-control textarea" v-model="message"
                    cols="30" rows="2" placeholder="How can we help you?" required></textarea>
                </div>

                <h4 class="mt-3 mb-2">Your Contact Details</h4>
                <p class="mb-3">For project discussions only, thank you!</p>
                <div class="form-group">
                  <!-- <label>Name</label> -->
                  <input type="text" v-model="from_name" class="form-control" name="contact-name"
                    placeholder="Your Name" required="" />
                </div>
                <div class="form-group">
                  <!-- <label>Email</label> -->
                  <input type="email" v-model="email" class="form-control" name="contact-email" placeholder="Your Email"
                    required />
                </div>
                <div class="form-group mb--40">
                  <!-- <label>Phone</label> -->
                  <input type="tel" class="form-control" v-model="phoneNumber" name="contact-phone"
                    placeholder="Your Phone" required />
                </div>
                <div class="form-group">
                  <button @click="sendMail" type="button" class="amor-btn btn-borderd btn-fluid light" name="submit-btn"
                    :disabled="disableBtn">
                    Get My Free Audit
                  </button>
                  <p class="mt-4 text-center text-secondary text-xs">
                    <small>We value your privacy. Your data is safe with us.</small>
                  </p>
                </div>
                <div class="form-group"></div>
              </form>
            </div>
            <div class="banner-thumbnail d-none">
              <div class="animate__animated zoomIn" style="animation-duration: 2s">
                <div class="large-thumb">
                  <img src="../assets/img/window.png" alt="Laptop" />
                </div>
              </div>
              <div class="animate__animated slideInRight" style="animation-duration: 2s">
                <div class="large-thumb-2">
                  <img src="../assets/img/amorboy/laptop-poses-banner.png" alt="Laptop" />
                </div>
              </div>
              <ul class="list-unstyled shape-group">
                <li class="shape shape-1">
                  <div class="animate__animated slideInLeft" style="animation-duration: 1s">
                    <img src="../assets/img/chat-group-home.png" alt="chat" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ul class="list-unstyled shape-group-banner">
        <li class="shape shape-1">
          <img src="../assets/img/shapes/bubble-39.png" alt="Bubble" />
        </li>
        <li class="shape shape-2">
          <img src="../assets/img/shapes/bubble-38.png" alt="Bubble" />
        </li>
        <li class="shape shape-3">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-4">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-5">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-6">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
        <li class="shape shape-7">
          <img src="../assets/img/shapes/bubble-41.png" alt="Bubble" />
        </li>
        <li class="shape shape-8">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-9">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
      </ul>
    </div>

    <section class="home-motion-section bg-white py-24">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
          <div>
            <div
              class="inline-block py-2 px-4 rounded bg-dark text-brand-700 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <span class="text-ly">Who We Work With</span></div>
            <h2 class=" font-bold text-navy text-ly mb-0" style="font-weight: 600">
              Built for Businesses Ready to Scale
            </h2>
          </div>
          <p class="motion-text text-slate-800 max-w-sm mb-0">
            We take on a limited number of engagements each quarter so every
            client gets a strategist, not a queue.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            class="motion-card bg-dark p-10 rounded-2xl text-center hover:shadow-xl transition-shadow hover:scale-[1.02] transition-all">
            <div class="w-16 h-16 bg-blue-300 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="material-symbols-outlined text-3xl">apartment</span>
            </div>
            <h4 class="font-medium mb-3 d-block text-lg" style="font-weight: 500;">Real Estate &amp; Professional Services</h4>
            <p class="text-slate-300">
              Firms where trust is decided before the first call — and the
              website is doing that work, or isn't.
            </p>
          </div>
          <div
            class="motion-card bg-dark p-10 rounded-2xl text-center hover:shadow-xl transition-shadow hover:scale-[1.02] transition-all">
            <div
              class="w-16 h-16 bg-indigo-300 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="material-symbols-outlined text-3xl">monitoring</span>
            </div>
            <h4 class="font-medium mb-3 d-block medium text-lb" style="font-weight: 500;">SaaS &amp; Startups</h4>
            <p class="text-slate-300">
              Founders who need a site that holds up in front of investors,
              not just visitors.
            </p>
          </div>
          <div
            class="motion-card bg-dark p-10 rounded-2xl text-center hover:shadow-xl transition-shadow hover:scale-[1.02] transition-all">
            <div
              class="w-16 h-16 bg-purple-300 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="material-symbols-outlined text-3xl">precision_manufacturing</span>
            </div>
            <h4 class="font-medium mb-3 d-block medium text-lr" style="font-weight: 500;">Manufacturing &amp; Healthcare</h4>
            <p class="text-slate-300">
              Established operators whose digital presence still undersells
              what the business actually delivers.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="home-motion-section pb-24 px-4 bg-white">
      <div
        class="motion-card max-w-6xl mx-auto rounded-3xl p-20 border border-secondary shadow-sm relative overflow-hidden hover:scale-[1.02] transition-all">
        <div class="home-parallax absolute top-0 right-0 p-8 opacity-[0.06]">
          <span class="material-icons-outlined text-ly" style="font-size: 16rem">insights</span>
        </div>
        <div class="relative">
          <h2 class="text-2xl font-medium mb-5 flex items-center gap-3" style="font-weight: 600">
            <span class="p-2 w-10 h-10 d-flex relative bg-amber-100 rounded-lg">
              <span class="material-icons-outlined text-center text-lr">fact_check</span>
            </span>
            <span class="text-dark">
              What We Usually <span class="text-lr">Find First</span>
            </span>
          </h2>
          <p class="text-slate-600 mb-8 max-w-2xl">
            Before we propose anything, we look for where the business is
            already losing ground. These four patterns show up most often.
          </p>
          <div class="grid md:grid-cols-2 gap-y-6 gap-x-12">
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">trending_down</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">Traffic Without Action</p>
                <p class="text-sm text-slate-600 mb-2">
                  Visitors arrive, but the site gives them no reason to take
                  the next step.
                </p>
              </div>
            </div>
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">payments</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">Spend Outpacing Return</p>
                <p class="text-sm text-slate-600 mb-2">
                  Ad budgets are doing their job; the landing experience
                  isn't doing its.
                </p>
              </div>
            </div>
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">visibility</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">Visibility Without Revenue</p>
                <p class="text-sm text-slate-600 mb-2">
                  Attention is growing faster than the systems built to
                  capture it.
                </p>
              </div>
            </div>
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">explore_off</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">No Single Source of Strategy</p>
                <p class="text-sm text-slate-600 mb-2">
                  Design, dev, and marketing decisions are being made in
                  isolation from each other.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="home-motion-section py-24" id="solutions" style="background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%)">
      <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-display font-extrabold mb-4 text-lg" style="font-weight: 600">
            Three Ways We Engage
          </h2>
          <p class="motion-text text-slate-300 max-w-2xl mx-auto mt-3">
            Each engagement is built around one outcome. We scope the work to
            match it, not the other way around.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="motion-card group relative bg-background-light p-8 rounded-xl border border-dark transition-all hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full">
            <div class="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-6">
              <span class="material-icons-outlined text-3xl">hub</span>
            </div>
            <h4 class="text-2xl font-bolder mb-3" style="font-weight: 600">
              <a href="/lead-generation-systems" class="text-white text-decoration-none">Lead Generation Systems</a>
            </h4>
            <p class="text-slate-300 mb-6 flex-grow">
              For B2B and service businesses that need a website to do the
              qualifying, not just the introducing.
            </p>
            <ul class="space-y-3 mb-8 text-sm p-0">
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                Conversion-focused landing pages
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                Paid campaign structure (Google &amp; Meta)
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                CRM integration and lead routing
              </li>
            </ul>
            <div class="pt-6 border-t border-slate-200">
              <p class="text-xs uppercase font-bold text-slate-400 mb-2">
                <small>What This Builds</small>
              </p>
              <h5 class="text-lg font-bold text-primary mb-2" style="font-weight: 600">
                A Pipeline You Can Forecast
              </h5>
              <p class="text-xs text-slate-500 mb-0">Typical engagement: 4–8 weeks</p>
            </div>
          </div>
          <div
            class="motion-card group relative bg-dark p-8 rounded-xl border border-dark transition-all shadow-2xl flex flex-col h-full">
            <div class="w-14 h-14 bg-white/10 text-white rounded-lg flex items-center justify-center mb-6">
              <span class="material-icons-outlined text-3xl">shopping_bag</span>
            </div>
            <h4 class="text-2xl font-bold mb-3 text-white" style="font-weight: 600">
              E-commerce Growth
            </h4>
            <p class="text-slate-300 mb-6 flex-grow">
              For Shopify and custom stores where the storefront is the
              limiting factor on revenue, not traffic.
            </p>
            <ul class="space-y-3 mb-8 text-sm text-slate-200  font-medium p-0">
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-primary  text-sm">check_circle</span>
                Checkout and product page optimization
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-primary  text-sm">check_circle</span>
                Performance creative for paid channels
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-primary  text-sm">check_circle</span>
                Retention and repeat-purchase flows
              </li>
            </ul>
            <div class="pt-6 border-t border-white/20">
              <p class="text-xs uppercase font-bold text-slate-400 mb-2">
                <small>What This Builds</small>
              </p>
              <h5 class="text-lg font-bold text-white mb-2" style="font-weight: 600">
                Higher Return Per Visitor
              </h5>
              <p class="text-xs text-slate-400 mb-0">Typical engagement: 3–6 weeks</p>
            </div>
          </div>
          <div
            class="motion-card group relative bg-background-light p-8 rounded-xl border border-dark transition-all hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full">
            <div class="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center mb-6">
              <span class="material-icons-outlined text-3xl">rocket_launch</span>
            </div>
            <h4 class="text-2xl font-bold mb-3" style="font-weight: 600">
              Startup Launch Foundations
            </h4>
            <p class="text-slate-300 mb-6 flex-grow">
              For founders who need a product and site that hold up in
              front of investors and early customers alike.
            </p>
            <ul class="space-y-3 mb-8 text-sm p-0">
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                Rapid product UI/UX prototyping
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                Investor-ready pitch platforms
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                Modern, scalable tech stack
              </li>
            </ul>
            <div class="pt-6 border-t border-slate-200">
              <p class="text-xs uppercase font-bold text-slate-500 mb-2">
                <small>What This Builds</small>
              </p>
              <h5 class="text-lg font-bold text-primary mb-2" style="font-weight: 600">
                A Foundation That Scales With You
              </h5>
              <p class="text-xs text-slate-500 mb-0">Typical engagement: 6–10 weeks</p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center gap-3 mt-5">
          <a class="amor-btn btn-fill-primary btn-large"
            href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call.">Book Your Free Strategy Call</a>
        </div>
      </div>
    </section>


    <section class="py-40 bg-white" id="results">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div class="lg:col-span-6">
            <div
              class="inline-block py-2 px-4 rounded bg-dark text-brand-700 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <span class="text-ly">Results, Not Promises</span>
            </div>
            <h2 class="text-6xl lg:text-8xl font-display mb-12 text-dark" style="font-weight: 600">
              Hard Data. <br /><span class="text-gradient-brand text-ly">Zero Guesswork.</span>
            </h2>
            <div class="space-y-12 relative">
              <div class="group">
                <div class="flex justify-between items-center mb-0">
                  <div>
                    <h4 class="font-bold text-2xl text-dark mb-1">
                      Conversion Lift
                    </h4>
                    <p class="text-slate-600 font-medium mb-4">
                      Average across post-launch client sites
                    </p>
                  </div>
                  <span class="text-5xl font-black text-ly font-display">+42%</span>
                </div>
                <div class="h-4 w-full bg-dark rounded-full overflow-hidden p-1">
                  <div
                    class="h-full bg-warning rounded-full shadow-[0_0_10px_rgba(12,146,235,0.2)] transition-all duration-1000"
                    style="width: 88%"></div>
                </div>
              </div>
              <div class="group">
                <div class="flex justify-between items-center mb-0">
                  <div>
                    <h4 class="font-bold text-2xl text-dark mb-1">
                      Pipeline Velocity
                    </h4>
                    <p class="text-slate-600 font-medium mb-4">
                      Faster lead-to-close for B2B clients
                    </p>
                  </div>
                  <span class="text-5xl font-black text-ly font-display">3.5x</span>
                </div>
                <div class="h-4 w-full bg-dark rounded-full overflow-hidden p-1">
                  <div class="h-full bg-warning rounded-full shadow-[0_0_10px_rgba(12,146,235,0.2)]" style="width: 94%">
                  </div>
                </div>
              </div>
              <div class="group">
                <div class="flex justify-between items-center mb-0">
                  <div>
                    <h4 class="font-bold text-2xl text-dark mb-1">
                      Managed Ad Revenue
                    </h4>
                    <p class="text-slate-600 font-medium mb-4">
                      Tracked across active client accounts
                    </p>
                  </div>
                  <span class="text-5xl font-black text-ly font-display">$12M+</span>
                </div>
                <div class="h-4 w-full bg-dark rounded-full overflow-hidden p-1">
                  <div class="h-full bg-warning rounded-full shadow-[0_0_10px_rgba(12,146,235,0.2)]" style="width: 76%">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-6 relative">
            <div
              class="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-charcoal-200/50 group border border-charcoal-100">
              <img alt="Data analytics dashboard"
                class="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-1000"
                src="../assets/img/project/c4/sa-ad.png" />
              <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              <div
                class="absolute bottom-8 left-8 right-8 p-10 bg-white/95 backdrop-blur-xl rounded-3xl border border-charcoal-100 shadow-xl">
                <div class="flex gap-1 text-brand-600 mb-3">
                  <span class="material-symbols-outlined fill-1 text-ly">star</span>
                  <span class="material-symbols-outlined fill-1 text-ly">star</span>
                  <span class="material-symbols-outlined fill-1 text-ly">star</span>
                  <span class="material-symbols-outlined fill-1 text-ly">star</span>
                  <span class="material-symbols-outlined fill-1 text-ly">star</span>
                </div>
                <p class="text-dark font-bold text-xl leading-relaxed mb-6 italic">
                  "Amortree is a very professional and end-to-end service
                  provider. They have good understanding of the clients needs
                  and work in a timely and efficient manner."
                </p>
                <div class="flex items-center gap-4">
                  <img alt="Client" class="w-14 h-14" src="../assets/img/project/c4/icon-sa.svg" />
                  <div>
                    <h5 class="text-base font-black text-secondary mb-0">
                      Menaka Krishna
                    </h5>
                    <small class="text-xs text-secondary mb-0">
                      CEO @ SteadyAsset
                    </small>
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
                  <p class="text-xs font-black text-white uppercase tracking-[0.2em] mb-1">
                    Live ROAS
                  </p>
                  <p class="text-4xl font-black text-ly mb-0">8.44x</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-24 px-6 bg-white" id="process">
      <div class="container mx-auto">
        <h2 class="text-3xl font-display font-medium text-center text-dark mb-16" style="font-weight: 600">
          How We <span class="text-ly">Work</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-0">
          <div class="step-arrow bg-slate-900 text-white p-8 mb-4 md:mb-0 hover:scale-[1.02] transition-all">
            <div class="text-4xl font-black mb-4 opacity-50">01</div>
            <h5 class="font-bold text-lg mb-2 d-block">Audit &amp; Strategy</h5>
            <small class="text-sm text-slate-300">
              We study your metrics, your market, and your current site
              before recommending anything.
            </small>
            <p class="text-xs uppercase tracking-wider text-slate-500 mt-3 mb-0">Week 1–2</p>
          </div>
          <div class="step-arrow bg-slate-800 text-white p-8 mb-4 md:mb-0 hover:scale-[1.02] transition-all">
            <div class="text-4xl font-black mb-4 opacity-80">02</div>
            <h5 class="font-bold text-lr mb-2 d-block">Design &amp; Build</h5>
            <small class="text-sm text-slate-300">
              Every screen is built against the strategy, not a template.
            </small>
            <p class="text-xs uppercase tracking-wider text-slate-500 mt-3 mb-0">Weeks 2–6</p>
          </div>
          <div class="step-arrow bg-slate-700 text-white p-8 mb-4 md:mb-0 hover:scale-[1.02] transition-all">
            <div class="text-4xl font-black mb-4 opacity-80">03</div>
            <h5 class="font-bold text-ly mb-2 d-block">Launch</h5>
            <small class="text-sm text-slate-100">
              We deploy carefully and watch real performance from day one.
            </small>
            <p class="text-xs uppercase tracking-wider text-slate-300 mt-3 mb-0">Week 6–7</p>
          </div>
          <div class="step-arrow bg-slate-600 text-slate-900 p-8 mb-4 md:mb-0 hover:scale-[1.02] transition-all">
            <div class="text-4xl font-black mb-4 opacity-80">04</div>
            <h5 class="font-bold text-lb mb-2 d-block">Optimize &amp; Scale</h5>
            <small class="text-sm text-slate-300">
              We keep tuning against live data long after launch day.
            </small>
            <p class="text-xs uppercase tracking-wider text-slate-700 mt-3 mb-0">Ongoing</p>
          </div>
        </div>
      </div>
    </section>

    <div class="d-none section serviceSec pt-5 section-padding" id="whatWeDo">
      <div class="container-fluid">
        <div class="section-heading heading-left mb--20 mb_md--70">
          <div class="subtitle">Our Services</div>
          <h2 class="title">
            <span class="gradient-text blue-light">Top IT Services</span> for
            Digital Transformation
          </h2>
          <p>
            Unlock your business's full potential with amortree Tech. Our
            comprehensive range of <strong>IT consulting services</strong>,
            including <strong>custom website development</strong>,
            <strong>UI/UX design</strong>,
            <strong>mobile app UI/UX Design</strong>, and
            <strong>DevOps solutions</strong>, are designed to drive innovation
            and growth. Experience the power of
            <strong>technology-driven transformation</strong> with our expert
            team.
          </p>
        </div>
        <div class="row">
          <div class="col-lg-4 mt--200 mt_md--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/research-1.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title">
                  <a href="services">Research & Strategy</a>
                </h3>
                <p>
                  <strong>Market research</strong> and
                  <strong>strategic planning</strong> are the foundation for
                  informed decision-making, helping amortree Tech deliver
                  tailored <strong>IT solutions</strong> that drive business
                  success and digital transformation.
                </p>
                <a class="more-btn" href="services">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/brand-2.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title">
                  <a href="services">Brand Identity Design</a>
                </h3>
                <p>
                  <strong>Professional branding services</strong> shape your
                  business identity, connect with audiences, and tell your
                  story. Let amortree Tech help you create a
                  <strong>memorable brand identity</strong> that stands out in
                  the market!
                </p>
                <a class="more-btn" href="services">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt--200 mt_md--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/logo-1.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title"><a href="services">Custom Logo Design</a></h3>
                <p>
                  A <strong>professional logo</strong> is more than just a
                  symbol; it's the face of your brand. amortree Tech creates
                  impactful <strong>custom logo designs</strong>
                  that define brand identities and make lasting impressions.
                </p>
                <a class="more-btn" href="services">Find out more</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 mt--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/web-2.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title">
                  <a href="services">Website Development</a>
                </h3>
                <p>
                  amortree Tech delivers intuitive
                  <strong>web UI/UX design</strong> and seamless
                  <strong>website development</strong>, ensuring user-friendly,
                  responsive, and engaging
                  <strong>digital experiences</strong> for your brand and
                  business growth.
                </p>
                <a class="more-btn" href="services">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt--200 mt_md--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/mob-7.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title">
                  <a href="services">Mobile App UI/UX Design</a>
                </h3>
                <p>
                  <strong>Mobile app UI/UX design</strong> focuses on creating
                  intuitive, user-friendly interfaces that enhance engagement,
                  ensuring seamless navigation and functionality for
                  <strong>mobile applications</strong>.
                </p>
                <a class="more-btn" href="services">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/devops-1.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title"><a href="services">DevOps Consulting</a></h3>
                <p>
                  <strong>DevOps consulting services</strong> streamline
                  collaboration between development and operations teams,
                  ensuring efficient software delivery, automation, and
                  continuous integration for seamless performance and
                  <strong>cloud infrastructure management</strong>.
                </p>
                <a class="more-btn" href="services">Find out more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="shape-group-services list-unstyled">
        <li class="shape shape-1 d-lg-block d-none">
          <img src="../assets/img/shapes/circle-1.png" alt="Line" />
        </li>
        <li class="shape shape-3 d-lg-block d-none">
          <img src="../assets/img/shapes/bubble-1.png" alt="Line" />
        </li>
        <li class="shape shape-4">
          <img src="../assets/img/amorboy/we-do.png" alt="Line" />
        </li>
        <li class="shape shape-5">
          <img src="../assets/img/shapes/bubble-15.png" alt="Line" />
        </li>
        <li class="shape shape-2">
          <img src="../assets/img/shapes/bubble-2.png" alt="Line" />
        </li>
        <li class="shape shape-5 d-lg-block d-none">
          <img src="../assets/img/shapes/bubble-2.png" alt="Line" />
        </li>
        <li class="shape shape-3 d-lg-block d-none">
          <img src="../assets/img/shapes/bubble-1.png" alt="Line" />
        </li>
        <li class="shape shape-4">
          <img src="../assets/img/amorboy/we-do.png" alt="Line" />
        </li>
      </ul>
    </div>

    <section class="section section-padding-2 bg-color-white">
      <div class="container-fluid">
        <div class="section-heading heading-left">
          <span class="subtitle">Recent Work</span>
          <h2 class="title">
            <span class="gradient-text yellow-light">Real Projects.</span>
            Real Outcomes.
          </h2>
        </div>

        <div class="">
          <div class="row">
            <div class="col-md-10 mx-md-auto col-lg-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="project/steadyasset" aria-label="SteadyAsset">
                    <img src="../assets/img/project/c4/project-thum-sa.png" alt="project" />
                    <div class="content">
                      <h3 class="title">
                        <a href="project/steadyasset">SteadyAsset</a>
                      </h3>
                      <span class="subtitle">Brand identity, UI/UX, and website for an investment platform</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-10 mx-md-auto col-lg-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="project/savedesk" aria-label="SaveDesk">
                    <img src="../assets/img/project/c7/project-thum-sd.png" alt="project" />
                    <div class="content">
                      <h3 class="title">
                        <a href="project/savedesk">SaveDesk</a>
                      </h3>
                      <span class="subtitle">Full redesign, from wireframes to high-fidelity UI/UX</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-10 mx-md-auto col-lg-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="project/samsiddhi-designs" aria-label="Samsiddhi Designs">
                    <img src="../assets/img/project/c9/project-thum-sd.png" alt="project" />
                    <div class="content">
                      <h3 class="title">
                        <a href="project/samsiddhi-designs">Samsiddhi Designs</a>
                      </h3>
                      <span class="subtitle">Brand identity, UI/UX, and website for an interior design firm</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-10 mx-md-auto col-lg-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="project/uae-links" aria-label="UAE Links">
                    <img src="../assets/img/project/c1/project-thum-uaeLinks.png" alt="project" />
                    <div class="content">
                      <h3 class="title">
                        <a href="project/uae-links">UAE Links</a>
                      </h3>
                      <span class="subtitle">UI/UX design and website build, with analytics in place</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="d-lg-flex justify-content-center">
            <a class="amor-btn btn-borderd light" href="/case-studies">Explore Case Studies</a>
          </div>
        </div>
      </div>
      <ul class="shape-group-services list-unstyled">
        <li class="shape shape-3">
          <img src="../assets/img/shapes/bubble-14.png" alt="circle" />
        </li>
        <li class="shape shape-2">
          <img src="../assets/img/shapes/line-9.png" alt="Line" />
        </li>
        <li class="shape shape-2">
          <img src="../assets/img/shapes/bubble-2.png" alt="Line" />
        </li>
      </ul>
    </section>

    <section class="section section-padding bg-color-light" id="reviews">
      <div class="container-fluid">
        <div class="section-heading heading-center">
          <span class="subtitle">In Their Words</span>
          <h2 class="title">
            <span class="gradient-text yellow-dark">What Clients</span>
            Say About Working With Us
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="glass-card p-10 rounded-3xl relative overflow-hidden group">
            <div
              class="absolute top-0 left-0 w-2 h-full bg-warning group-hover:w-full group-hover:opacity-5 transition-all duration-700">
            </div>
            <div class="flex gap-1 text-ly mb-6">
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
            </div>
            <p class="text-xl text-white italic mb-10 leading-relaxed font-light">
              "Amortree is a very professional and end-to-end service provider.
              They have good understanding of the clients needs and work in a
              timely and efficient manner."
            </p>
            <div class="flex items-center gap-4">
              <img src="../assets/img/project/c4/icon-sa.svg" class="m-0" style="height: 40px" alt="SteadyAsset Logo" />
              <div>
                <p class="font-bold text-white uppercase text-sm tracking-widest mb-1">
                  Menaka Krishna
                </p>
                <small class="text-xs text-ll font-bold mb-0">CEO, SteadyAsset</small>
              </div>
            </div>
          </div>
          <div class="glass-card p-10 rounded-3xl relative overflow-hidden group">
            <div
              class="absolute top-0 left-0 w-2 h-full bg-warning group-hover:w-full group-hover:opacity-5 transition-all duration-700">
            </div>
            <div class="flex gap-1 text-ly mb-6">
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
            </div>
            <p class="text-xl text-white italic mb-10 leading-relaxed font-light">
              "Hi, I just wanted to take a moment to express my sincere
              appreciation for the outstanding work you've done. Completing it
              on time and to such a high standard is a testament to your
              dedication and expertise. Your efforts have not gone unnoticed and
              I'm grateful for your contributions. Thank you again for a job
              well done!"
            </p>
            <div class="flex items-center gap-4">
              <img src="../assets/img/project/c2/icon-sc.svg" class="m-0" style="height: 40px" alt="SteadyAsset Logo" />
              <div>
                <p class="font-bold text-white uppercase text-sm tracking-widest mb-1">
                  Sandeep L
                </p>
                <small class="text-xs text-ll font-bold mb-0">Co-Founder, Solved Cube IT Solution</small>
              </div>
            </div>
          </div>
          <div class="glass-card p-10 rounded-3xl relative overflow-hidden group">
            <div
              class="absolute top-0 left-0 w-2 h-full bg-warning group-hover:w-full group-hover:opacity-5 transition-all duration-700">
            </div>
            <div class="flex gap-1 text-ly mb-6">
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
            </div>
            <p class="text-xl text-white italic mb-10 leading-relaxed font-light">
              "Amortree Tech is a pleasure to work with. They're responsive,
              professional, and always willing to go the extra mile. I highly
              recommend their services."
            </p>
            <div class="flex items-center gap-4">
              <img src="../assets/img/project/c9/icon-sd.svg" class="m-0" style="height: 40px" alt="SteadyAsset Logo" />
              <div>
                <p class="font-bold text-white uppercase text-sm tracking-widest mb-1">
                  Bharathkumar MS
                </p>
                <small class="text-xs text-ll font-bold mb-0">Founder, Samsiddhi Designs</small>
              </div>
            </div>
          </div>
          <div class="glass-card p-10 rounded-3xl relative overflow-hidden group">
            <div
              class="absolute top-0 left-0 w-2 h-full bg-warning group-hover:w-full group-hover:opacity-5 transition-all duration-700">
            </div>
            <div class="flex gap-1 text-ly mb-6">
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
              <span class="material-symbols-outlined">star</span>
            </div>
            <p class="text-xl text-white italic mb-10 leading-relaxed font-light">
              "Good understanding of our needs from the start. A genuinely
              professional service provider, and a job well done."
            </p>
            <div class="flex items-center gap-4">
              <img src="../assets/img/project/c6/spr-logo.svg" class="m-0" style="height: 40px"
                alt="SteadyAsset Logo" />
              <div>
                <p class="font-bold text-white uppercase text-sm tracking-widest mb-1">
                  Suresh Babu
                </p>
                <small class="text-xs text-ll font-bold mb-0">CEO, SPR Real Estate</small>
              </div>
            </div>
          </div>
        </div>

        <div class="d-none row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="review-card p-4 h-100">
              <div class="d-flex justify-content-between">
                <div class="stars mb-2">
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                </div>
                <a class="small text-success mb-2" href="https://share.google/VbfvZxWgqZZY3wKnD" target="_blank">Google
                  Review <i class="icofont-link"></i></a>
              </div>
              <p class="mb-3">
                "Amortree is a very professional and end-to-end service
                provider. They have good understanding of the clients needs and
                work in a timely and efficient manner."
              </p>
              <div class="d-flex">
                <img src="../assets/img/project/c4/icon-sa.svg" class="m-0" style="height: 40px"
                  alt="SteadyAsset Logo" />
                <div class="ms-2">
                  <div class="small">Client – SteadyAsset</div>
                  <div class="fw-bold">Menaka Reddy</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="review-card p-4 h-100">
              <div class="d-flex justify-content-between">
                <div class="stars mb-2">
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                </div>
                <a class="small text-success mb-2" href="https://share.google/8H1Msp6toe6G2KbDN" target="_blank">Google
                  Review <i class="icofont-link"></i></a>
              </div>
              <p class="mb-3">
                "Hi, I just wanted to take a moment to express my sincere
                appreciation for the outstanding work you've done. Completing it
                on time and to such a high standard is a testament to your
                dedication and expertise. Your efforts have not gone unnoticed
                and I'm grateful for your contributions. Thank you again for a
                job well done!"
              </p>
              <div class="d-flex">
                <img src="../assets/img/project/c2/icon-sc.svg" class="m-0" style="height: 40px"
                  alt="SteadyAsset Logo" />
                <div class="ms-2">
                  <div class="small">Client – Solved Cube IT Solution</div>
                  <div class="fw-bold">Sandeep L</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="review-card p-4 h-100">
              <div class="d-flex justify-content-between">
                <div class="stars mb-2">
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                </div>
                <a class="small text-success mb-2" href="https://share.google/NG4IIyDdLP6yMJ5tN" target="_blank">Google
                  Review <i class="icofont-link"></i></a>
              </div>
              <p class="mb-3">
                "Amortree Tech is a pleasure to work with. They're responsive,
                professional, and always willing to go the extra mile. I highly
                recommend their services."
              </p>
              <div class="d-flex">
                <img src="../assets/img/project/c9/icon-sd.svg" class="m-0" style="height: 40px"
                  alt="SteadyAsset Logo" />
                <div class="ms-2">
                  <div class="small">Client – Samsiddhi Designs</div>
                  <div class="fw-bold">Bharathkumar MS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="list-unstyled shape-group-banner">
        <li class="shape shape-3">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-4">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-5">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-6">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
        <li class="shape shape-7">
          <img src="../assets/img/shapes/bubble-41.png" alt="Bubble" />
        </li>
        <li class="shape shape-8">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-9">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
      </ul>
    </section>

    <section class="py-24 px-6 bg-white">
      <div class="container mx-auto max-w-4xl">
        <h2 class="text-3xl font-display font-bold text-center mb-16 text-ly" style="font-weight: 600">
          Why Businesses Choose Amortree
        </h2>
        <div class="space-y-4 why mx-auto" style="max-width: 720px;">
          <div
            class="group bg-dark p-6 rounded-2xl border border-dark flex items-center justify-between hover:border-primary transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 text-ly flex items-center justify-center">
                <span class="material-symbols-outlined">target</span>
              </div>
              <span class="text-xl font-semibold">Strategy Before Screens</span>
            </div>
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">arrow_forward</span>
          </div>
          <div
            class="group bg-dark p-6 rounded-2xl border border-dark flex items-center justify-between hover:border-primary transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 text-ly flex items-center justify-center">
                <span class="material-symbols-outlined">trending_up</span>
              </div>
              <span class="text-xl font-semibold">Measured Against Business Results</span>
            </div>
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">arrow_forward</span>
          </div>
          <div
            class="group bg-dark p-6 rounded-2xl border border-dark flex items-center justify-between hover:border-primary transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 text-ly flex items-center justify-center">
                <span class="material-symbols-outlined">analytics</span>
              </div>
              <span class="text-xl font-semibold">Decisions Backed by Data</span>
            </div>
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">arrow_forward</span>
          </div>
          <div
            class="group bg-dark p-6 rounded-2xl border border-dark flex items-center justify-between hover:border-primary transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 text-ly flex items-center justify-center">
                <span class="material-symbols-outlined">handshake</span>
              </div>
              <span class="text-xl font-semibold">A Partner Past Launch Day</span>
            </div>
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">arrow_forward</span>
          </div>
        </div>
      </div>
    </section>

    <section class="d-none home-motion-section py-24 px-6 bg-color-light" id="faq">
      <div class="container mx-auto max-w-3xl">
        <div class="text-center mb-12">
          <div
            class="inline-block py-2 px-4 rounded bg-dark text-brand-700 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
            <span class="text-ly">Common Questions</span>
          </div>
          <h2 class="text-3xl font-display font-bold text-dark mb-4" style="font-weight: 600">
            Before You Book the Call
          </h2>
          <p class="motion-text text-slate-600 max-w-xl mx-auto mb-0">
            The questions most founders and business owners ask before
            starting a project with us.
          </p>
        </div>
        <div class="accordion" id="homeFaqAccordion">
          <div class="accordion-item">
            <h3 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#homeFaq1">
                How much does a website cost at Amortree?
              </button>
            </h3>
            <div id="homeFaq1" class="accordion-collapse collapse show" data-bs-parent="#homeFaqAccordion">
              <div class="accordion-body">
                Most engagements fall between &#8377;50,000 and &#8377;5,00,000,
                depending on scope &mdash; from a focused conversion-first
                landing page to a full lead-generation system with CRM
                integration. We scope exact pricing after the strategy call,
                once we understand what the site needs to do for your
                business.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h3 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#homeFaq2">
                How long does a project take?
              </button>
            </h3>
            <div id="homeFaq2" class="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
              <div class="accordion-body">
                Most projects run 4&ndash;10 weeks from strategy to launch,
                depending on scope. Audit and strategy typically take 1&ndash;2
                weeks, design and build 2&ndash;6 weeks, with ongoing
                optimization after launch.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h3 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#homeFaq3">
                Do you only build websites, or do you handle marketing too?
              </button>
            </h3>
            <div id="homeFaq3" class="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
              <div class="accordion-body">
                We work across strategy, UX, development, SEO, and paid
                acquisition &mdash; because a website's performance depends on
                all of them working together, not just the design.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h3 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#homeFaq4">
                What industries do you work with?
              </button>
            </h3>
            <div id="homeFaq4" class="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
              <div class="accordion-body">
                We work primarily with real estate and professional service
                firms, SaaS and startup founders, and manufacturing and
                healthcare businesses. See
                <a href="/case-studies" class="text-decoration-underline">our case studies</a>
                for examples across each.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h3 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#homeFaq5">
                What happens after I book a strategy call?
              </button>
            </h3>
            <div id="homeFaq5" class="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
              <div class="accordion-body">
                We review your current site and metrics before the call, so
                the conversation starts with specific observations about your
                business &mdash; not a generic sales pitch.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="home-motion-section py-24 px-6 bg-dark" style="background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%)">
      <div class="container mx-auto max-w-3xl text-center">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4 text-white" style="font-weight: 600">
          Still Deciding?
        </h2>
        <p class="motion-text text-slate-300 max-w-xl mx-auto mb-10">
          A 20-minute call costs you nothing and tells you exactly where your
          site is leaving leads on the table.
        </p>
        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <a class="amor-btn btn-fill-primary btn-large"
            href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call.">Book Your Free Strategy Call</a>
          <a href="/estimate" class="amor-btn btn-borderd light">Get a Project Estimate</a>
        </div>
        <p class="mt-5 text-center text-slate-500 text-xs mb-0">
          <small>No pressure, no obligation &mdash; just clarity on what your website should be doing for your business.</small>
        </p>
      </div>
    </section>

    <section class="d-none section section-padding-equal bg-color-white" id="about">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="about-us">
              <div class="section-heading heading-left mb-0">
                <span class="subtitle">Who we are</span>
                <h2 class="title mb--40">
                  Your
                  <span class="gradient-text-light text-lg">Digital Growth</span>
                  Partner
                </h2>
                <p>
                  At amortree Tech, we're more than just an
                  <strong>IT consulting company</strong>; we're your strategic
                  partner in leveraging cutting-edge technologies to drive
                  innovation and transformation. Specializing in
                  <strong>custom website development</strong>,
                  <strong>UI/UX design</strong>, and
                  <strong>mobile app UI/UX Design</strong>, we're dedicated to
                  empowering businesses to thrive in the digital age.
                </p>
                <p>
                  Our team of <strong>expert developers</strong> and
                  <strong>designers</strong> is dedicated to delivering
                  customized <strong>IT solutions</strong> that align with your
                  unique needs and objectives. Whether you're focused on
                  enhancing your digital platforms, creating seamless user
                  experiences, or crafting innovative technology solutions, we
                  have the skills and expertise to bring your vision to life.
                </p>
                <p>
                  With a blend of creativity, technical expertise, and a
                  customer-centric approach, we strive to exceed expectations
                  and deliver measurable results. Partner with amortree Tech,
                  and let's embark on a journey of
                  <strong>digital transformation</strong> and success together.
                </p>
                <div class="d-flex justify-content-start gap-3 mt-5">
                  <a href="about" class="amor-btn btn-borderd light" tabindex="0">Know more</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-5 col-lg-6 offset-xl-1">
            <img src="../assets/img/amorboy/am-home-abt.png"
              alt="Professional Web Development Team - Custom Website Design Services" />
          </div>
        </div>
      </div>
      <ul class="shape-group-service list-unstyled">
        <li class="shape shape-2">
          <img src="../assets/img/shapes/line-6.png" alt="line" />
        </li>
        <li class="shape shape-3">
          <img src="../assets/img/shapes/line-5.png" alt="line" />
        </li>
      </ul>
    </section>

    <!-- SEO-Enhanced FAQ Section -->
    <section class="d-none section section-padding faqSec bg-color-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 offset-lg-2">
            <div class="section-heading heading-center faq-style">
              <span class="subtitle">Frequently Asked Questions</span>
              <h2 class="title">
                Need
                <span class="gradient-text blue-light">Clarity?</span> We’ve Got
                You
              </h2>
              <p class="px-lg-5">
                Get answers to common questions about our professional web
                development, UI/UX design, and DevOps consulting services.
              </p>
            </div>
            <div class="accordion" id="faqAccordion">
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    What services do you provide?
                  </button>
                </h3>
                <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    We offer <b>end-to-end digital solutions</b>, including:

                    <ul class="mt-2">
                      <li>
                        <b>UI/UX Design</b> – wireframes, prototypes, and
                        user-friendly interfaces
                      </li>
                      <li>
                        <b>Website Design & Development</b> – responsive,
                        SEO-ready websites
                      </li>
                      <li>
                        <b>E-commerce Solutions</b> – custom online stores with
                        secure payments
                      </li>
                      <li>
                        <b>Web & Mobile Apps</b> – scalable apps with modern
                        tech stacks
                      </li>
                      <li>
                        <b>IT Consulting & Cloud Services</b> – strategy,
                        hosting, and DevOps support
                      </li>
                      <li>
                        <b>Ongoing Maintenance & Support</b> – updates,
                        security, and performance optimization
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq2">
                    Do you provide UI/UX design services?
                  </button>
                </h3>
                <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Yes, we provide comprehensive
                    <strong>UI/UX design services</strong> including user
                    research, wireframing, prototyping, and visual design. Our
                    <strong>professional designers</strong> create intuitive and
                    engaging user experiences that improve conversion rates and
                    user satisfaction.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq3">
                    What is your experience with mobile app UI/UX Design?
                  </button>
                </h3>
                <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    We have extensive experience in
                    <strong>mobile app UI/UX Design</strong> for both iOS and
                    Android platforms. Our services include native app UI/UX
                    Design, cross-platform solutions, and mobile app UI/UX
                    design. We ensure your mobile applications are scalable,
                    secure, and user-friendly.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq4">
                    How much does a project cost?
                  </button>
                </h3>
                <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Costs vary based on features, design, and complexity. After
                    a free consultation, we provide a clear, tailored quote with
                    no hidden charges.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq5">
                    How long will my project take?
                  </button>
                </h3>
                <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    <p class="mb-2">Timelines depend on scope:</p>
                    <ul>
                      <li>
                        <b>UI/UX Design:</b> Typically 1–3 weeks, depending on
                        the number of screens and complexity of interactions.
                      </li>
                      <li>
                        <b>Website Design:</b> Usually 2–4 weeks for standard
                        corporate or portfolio sites.
                      </li>
                      <li>
                        <b>Website Development:</b> Around 4–8 weeks, depending
                        on features like e-commerce, integrations, or custom
                        functionality.
                      </li>
                      <li><b>Large applications:</b> 3+ months</li>
                    </ul>
                    <p class="mb-0">
                      We always define timelines upfront and keep you updated at
                      every stage with progress milestones.
                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq6">
                    Do you provide support after launch?
                  </button>
                </h3>
                <div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Yes, we offer
                    <b>maintenance, updates, security, and IT support
                      packages</b>
                    so your system stays reliable and up-to-date.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq7">
                    Will my website be mobile-friendly?
                  </button>
                </h3>
                <div id="faq7" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Absolutely. Every site we build is
                    <b>responsive, fast, and optimized for all devices</b>.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq8">
                    Do you work with international clients?
                  </button>
                </h3>
                <div id="faq8" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Yes! We collaborate with businesses across
                    <b>India and worldwide</b>, ensuring smooth communication
                    and delivery.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="shape-group-service list-unstyled">
        <li class="shape shape-1">
          <img src="../assets/img/shapes/line-2.png" alt="Bubble" />
        </li>
        <li class="shape shape-3">
          <img src="../assets/img/shapes/bubble-5.png" alt="line" />
        </li>
      </ul>
      <ul class="list-unstyled shape-group-banner">
        <li class="shape shape-2">
          <img src="../assets/img/shapes/bubble-38.png" alt="Bubble" />
        </li>
        <li class="shape shape-3">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-4">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-5">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-6">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
        <li class="shape shape-7">
          <img src="../assets/img/shapes/bubble-41.png" alt="Bubble" />
        </li>
        <li class="shape shape-8">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-9">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="scss" scoped>
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
.step-arrow,
.why > div {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.home-motion-page .amor-btn,
.home-motion-page input,
.home-motion-page textarea,
.home-motion-page .motion-card {
  transition:
    border-color 0.28s ease,
    background-color 0.28s ease,
    box-shadow 0.28s ease;
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
  will-change: transform, opacity, filter, text-shadow, background-position;
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

  img {
    width: 30%;
  }
}

.step-arrow {
  clip-path: polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%);
}

@media (max-width: 768px) {
  .step-arrow {
    clip-path: none;
  }
}
</style>