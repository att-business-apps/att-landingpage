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

    if (prefersReducedMotion) {
      gsap.set(
        [
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
        ],
        { clearProps: "all" },
      );
      return;
    }

    const heroTimeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".banner-style-1",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".home-banner .inline-flex", {
        y: 18,
        autoAlpha: 0,
        duration: 0.75,
      })
      .fromTo(
        ".hero-title",
        {
          opacity: 0,
          scale: 0.98,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          immediateRender: false,
        },
        "-=0.2",
      )
      .fromTo(
        ".hero-title-token",
        {
          y: 70,
          opacity: 0,
          filter: "blur(16px)",
          rotateZ: -3,
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          rotateZ: 0,
          duration: 0.74,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
        },
        "-=0.1",
      )
      .to(
        ".hero-title-highlight",
        {
          backgroundPosition: "100% 50%",
          textShadow: "0 0 28px rgba(255, 214, 10, 0.32)",
          scale: 1.035,
          duration: 0.58,
          stagger: 0.14,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
        "-=0.18",
      )
      .from(".home-banner .h5 span", {
        y: 18,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.6,
      }, "-=0.55")
      .from(".home-banner .subtitle", {
        y: 22,
        autoAlpha: 0,
        duration: 0.7,
      }, "-=0.45")
      .from(".home-banner .amor-btn", {
        y: 18,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.55,
      }, "-=0.35")
      .from(".home-metric", {
        y: 24,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.62,
      }, "-=0.25")
      .fromTo(
        ".banner-form",
        {
          y: 46,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          immediateRender: false,
          clearProps: "opacity,visibility",
        },
        "-=0.5",
      );

    heroTimeline
      .to(".home-banner", { yPercent: -18, autoAlpha: 0.66, scale: 0.97 }, 0)
      .to(".banner-form", { yPercent: -12, rotateX: 4, autoAlpha: 0.86 }, 0)
      .to(".home-metric", {
        yPercent: (index) => -20 - index * 7,
        xPercent: (index) => (index % 2 ? 8 : -8),
        autoAlpha: 0.72,
        stagger: 0.03,
      }, 0)
      .to(".amorboy img:first-child", { yPercent: -34, xPercent: -7, rotate: -9, scale: 1.08 }, 0)
      .to(".amorboy img:last-child", { yPercent: -24, xPercent: 7, rotate: 7, scale: 1.04 }, 0)
      .to(".shape-group-banner .shape", {
        yPercent: (index) => (index % 2 ? -46 : -28),
        xPercent: (index) => (index % 3 ? 18 : -14),
        rotate: (index) => (index % 2 ? 20 : -18),
        stagger: 0.03,
      }, 0);

    const hero = homePage.value.querySelector(".banner-style-1");
    const tiltItems = homePage.value.querySelectorAll(".hero-title, .banner-form, .amorboy img");
    if (hero && tiltItems.length) {
      const tiltX = gsap.quickTo(tiltItems, "rotationY", { duration: 0.55, ease: "power3.out" });
      const tiltY = gsap.quickTo(tiltItems, "rotationX", { duration: 0.55, ease: "power3.out" });
      const parallaxX = gsap.quickTo(".shape-group-banner .shape", "x", { duration: 0.7, ease: "power3.out" });
      const parallaxY = gsap.quickTo(".shape-group-banner .shape", "y", { duration: 0.7, ease: "power3.out" });
      const handlePointerMove = (event) => {
        const bounds = hero.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        tiltX(x * 7);
        tiltY(y * -5);
        parallaxX(x * 22);
        parallaxY(y * 18);
      };
      const handlePointerLeave = () => {
        tiltX(0);
        tiltY(0);
        parallaxX(0);
        parallaxY(0);
      };
      hero.addEventListener("pointermove", handlePointerMove);
      hero.addEventListener("pointerleave", handlePointerLeave);
      pointerCleanup = () => {
        hero.removeEventListener("pointermove", handlePointerMove);
        hero.removeEventListener("pointerleave", handlePointerLeave);
      };
    }

    const pageSections = [
      ...homePage.value.querySelectorAll(":scope > section:not(.d-none)"),
    ];

    pageSections.forEach((section) => {
      const headingItems = section.querySelectorAll("h2, h3, .section-heading, .motion-text");
      const cardSelector = section.id === "solutions"
        ? ".review-card, .services-grid, .why > div"
        : ".motion-card, .review-card, .services-grid, .why > div";
      const cards = section.querySelectorAll(cardSelector);

      if (headingItems.length) {
        gsap.fromTo(
          headingItems,
          {
            y: 72,
            autoAlpha: 0,
            filter: "blur(12px)",
          },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            stagger: 0.1,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "center 56%",
              scrub: 0.75,
            },
          },
        );
      }

      if (cards.length) {
        gsap.fromTo(
          cards,
          {
            y: 96,
            autoAlpha: 0.2,
            scale: 0.9,
            rotateX: 11,
            rotateZ: (index) => (index % 2 ? 1.8 : -1.8),
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            rotateX: 0,
            rotateZ: 0,
            transformOrigin: "center bottom",
            stagger: 0.1,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "bottom 66%",
              scrub: 0.85,
            },
          },
        );
      }
    });

    const solutions = homePage.value.querySelector("#solutions");
    if (solutions) {
      const solutionCards = solutions.querySelectorAll(".motion-card");
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: solutions,
          start: "top 82%",
          end: "bottom 42%",
          scrub: 0.9,
        },
      })
        .fromTo(solutionCards, {
          yPercent: (index) => 22 + index * 8,
          scale: 0.92,
          rotateY: (index) => (index - 1) * 7,
          autoAlpha: 0.32,
        }, {
          yPercent: 0,
          scale: 1,
          rotateY: 0,
          autoAlpha: 1,
          stagger: 0.18,
        }, 0)
        .to(solutionCards, {
          yPercent: (index) => (index - 1) * -4,
          rotateZ: (index) => (index - 1) * 0.8,
          stagger: 0.08,
        }, 0.58);
    }

    const results = homePage.value.querySelector("#results");
    if (results) {
      gsap.fromTo(
        "#results .group",
        { xPercent: -10, autoAlpha: 0.28 },
        {
          xPercent: 0,
          autoAlpha: 1,
          stagger: 0.18,
          ease: "none",
          scrollTrigger: {
            trigger: results,
            start: "top 82%",
            end: "center 45%",
            scrub: 0.8,
          },
        },
      );

      gsap.to("#results img", {
        yPercent: -12,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: results,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.85,
        },
      });
    }

    gsap.utils.toArray(".process-step, .step-arrow").forEach((step, index) => {
      gsap.fromTo(
        step,
        {
          xPercent: index % 2 ? 8 : -8,
          y: 46,
          rotateX: 12,
          autoAlpha: 0.18,
        },
        {
          xPercent: 0,
          y: 0,
          rotateX: 0,
          autoAlpha: 1,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: step,
            start: "top 92%",
            end: "center 62%",
            scrub: 0.7,
          },
        },
      );
    });

    gsap.utils.toArray(".home-parallax").forEach((item) => {
      gsap.to(item, {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    });

    gsap.utils.toArray(".project-grid").forEach((project, index) => {
      gsap.fromTo(project, {
        yPercent: 18,
        autoAlpha: 0.3,
        scale: 0.96,
      }, {
        yPercent: index % 2 ? -7 : -3,
        autoAlpha: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: project,
          start: "top 90%",
          end: "center 58%",
          scrub: 0.75,
        },
      });
    });

    gsap.fromTo(
      "#reviews .glass-card",
      {
        y: 88,
        scale: 0.88,
        rotateX: 16,
        autoAlpha: 0.16,
      },
      {
        y: 0,
        scale: 1,
        rotateX: 0,
        autoAlpha: 1,
        stagger: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: "#reviews",
          start: "top 82%",
          end: "bottom 62%",
          scrub: 0.8,
        },
      },
    );

    gsap.utils.toArray(".motion-card, .review-card, .services-grid, .space-y-4 > div")
      .filter((card) => !card.closest("#solutions"))
      .forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          boxShadow: "0 28px 70px rgba(10, 16, 30, 0.22)",
          duration: 0.32,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          boxShadow: "0 10px 28px rgba(10, 16, 30, 0.08)",
          duration: 0.42,
          ease: "power2.out",
        });
      });
    });

    ScrollTrigger.refresh();
  }, homePage.value);
}

onMounted(async () => {
  await nextTick();
  animateHomePage();
});

onBeforeUnmount(() => {
  pointerCleanup?.();
  gsapContext?.revert();
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
                    <span class="relative flex h-2 w-2">
                      <span
                        class="animate-ping absolute d-block justify-center items-center h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span class="relative d-block rounded-full h-2 w-2 bg-blue-600"></span>
                    </span>
                    Tech-Driven Growth Strategy
                  </div>
                </div>
                <!-- <h1 class="title d-inline" ref="myElement">
                  Get 20-40
                  <span class="gradient-text-light">Qualified Leads</span>
                  Monthly with
                  <span class="gradient-text-light">Data-Driven Design</span>
                </h1> -->

                <h1 class="title hero-title d-inline" ref="myElement">
                  <span class="hero-title-token">We</span>
                  <span class="hero-title-token">Build</span>
                  <span class="hero-title-token hero-title-highlight text-ly">Digital Products</span>
                  <span class="hero-title-token">That</span>
                  <span class="hero-title-token">Drive</span>
                  <span class="hero-title-token hero-title-highlight gradient-text-light">Growth & Conversions</span>
                </h1>

                <h2 class="h5 mt-4 flex items-center justify-center gap-3">
                  <span class="gradient-text blue-dark">Sleek.</span>
                  <span class="gradient-text yellow-dark">Stylish.</span>
                  <span class="gradient-text blue-dark">Classy.</span>
                </h2>
                <p class="subtitle w-50 md:w-100 mt-4">
                  Helping <b class="text-ly">startups</b> and businesses <b class="text-lg">scale</b> with strategic <b
                    class="text-lb">design</b>, high-performance <b class="text-lr">websites</b>, and scalable tech
                  solutions.
                </p>
                <div class="d-flex justify-content-center gap-3 mt-5">
                  <a class="amor-btn btn-fill-primary btn-large"
                    href="https://wa.me/917975859061/?text=Get%20my%20free%20GROWTH%20Audit.">Get My Free Growth
                    Audit</a>
                  <a href="/case-studies" class="amor-btn btn-borderd light">Case Study</a>
                </div>
                <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
                  <div class="home-metric flex flex-col items-center justify-around">
                    <span class="text-3xl font-bold text-primary gradient-text blue-light">+140%</span>
                    <span class="text-xs uppercase tracking-widest text-slate-300">Avg. ROI</span>
                  </div>
                  <div class="home-metric flex flex-col items-center">
                    <span class="text-3xl font-bold text-primary gradient-text yellow-light">24/7</span>
                    <span class="text-xs uppercase tracking-widest text-slate-300">Lead Machine</span>
                  </div>
                  <div class="home-metric flex flex-col items-center">
                    <span class="text-3xl font-bold text-primary gradient-text green-light">12ms</span>
                    <span class="text-xs uppercase tracking-widest text-slate-300">Fast Performance</span>
                  </div>
                  <div class="home-metric flex flex-col items-center">
                    <span class="text-3xl font-bold text-primary gradient-text text-lr">Zero</span>
                    <span class="text-xs uppercase tracking-widest text-slate-300">Wasted Ad Spend</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row align-items-end align-items-xl-end">
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
              <span class="text-ly">Market Focus</span></div>
            <h2 class=" font-bold text-navy text-ly mb-0" style="font-weight: 600">
              Built for Scalable Ventures
            </h2>
          </div>
          <p class="motion-text text-slate-800 max-w-sm mb-0">
            We specialize in three core verticals where our growth frameworks
            deliver the highest impact.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            class="motion-card bg-dark p-10 rounded-2xl text-center hover:shadow-xl transition-shadow hover:scale-[1.04] transition-all">
            <div class="w-16 h-16 bg-blue-300 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="material-symbols-outlined text-3xl">storefront</span>
            </div>
            <h4 class="font-medium mb-3 d-block text-lg" style="font-weight: 500;">Local Services</h4>
            <p class="text-slate-300">
              Plumbers, HVAC, Lawyers, and local clinics looking for local
              dominance.
            </p>
          </div>
          <div
            class="motion-card bg-dark p-10 rounded-2xl text-center hover:shadow-xl transition-shadow hover:scale-[1.06] transition-all">
            <div
              class="w-16 h-16 bg-indigo-300 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="material-symbols-outlined text-3xl">shopping_cart</span>
            </div>
            <h4 class="font-medium mb-3 d-block medium text-lb" style="font-weight: 500;">E-Commerce Brands</h4>
            <p class="text-slate-300">
              Shopify &amp; WooCommerce stores looking to scale their monthly
              revenue.
            </p>
          </div>
          <div
            class="motion-card bg-dark p-10 rounded-2xl text-center hover:shadow-xl transition-shadow hover:scale-[1.04] transition-all">
            <div
              class="w-16 h-16 bg-purple-300 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="material-symbols-outlined text-3xl">rocket_launch</span>
            </div>
            <h4 class="font-medium mb-3 d-block medium text-lr" style="font-weight: 500;">Startups &amp; SaaS</h4>
            <p class="text-slate-300">
              Tech startups needing professional UI/UX and growth marketing.
            </p>
          </div>
        </div>
        <p class="text-center mt-5 text-slate-400 italic text-sm">
          – Not for one-time, low-budget projects –
        </p>
      </div>
    </section>

    <section class="home-motion-section pb-24 px-4 bg-white">
      <div
        class="motion-card max-w-6xl mx-auto rounded-3xl p-20 border border-secondary shadow-sm relative overflow-hidden hover:scale-[1.08] transition-all">
        <div class="home-parallax absolute top-0 right-0 p-8 opacity-10">
          <span class="material-icons-outlined text-ly" style="font-size: 16rem">report_problem</span>
        </div>
        <div class="relative">
          <h2 class="text-2xl font-medium mb-5 flex items-center gap-3" style="font-weight: 600">
            <span class="p-2 w-10 h-10 d-flex relative bg-amber-100 rounded-lg">
              <span class="material-icons-outlined text-center text-lr">warning</span>
            </span>
            <span class="text-dark">
              Common <span class="text-lr">Problems</span> We
              <span class="text-lr">Solve</span>
            </span>
          </h2>
          <div class="grid md:grid-cols-2 gap-y-6 gap-x-12">
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">cancel</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">Website Not Converting</p>
                <p class="text-sm text-slate-600 mb-2">
                  Traffic visits but never takes action.
                </p>
              </div>
            </div>
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">cancel</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">Ads Not Working</p>
                <p class="text-sm text-slate-600 mb-2">
                  Spending money on clicks with zero ROI.
                </p>
              </div>
            </div>
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">cancel</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">High Traffic, Low Sales</p>
                <p class="text-sm text-slate-600 mb-2">
                  You have eyes on you, but no revenue growth.
                </p>
              </div>
            </div>
            <div class="motion-card flex items-start gap-4">
              <span class="material-icons-outlined text-lr">cancel</span>
              <div>
                <p class="font-bold text-slate-900 mb-0">No Clear Strategy</p>
                <p class="text-sm text-slate-600 mb-2">
                  Random acts of marketing with no system.
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
            Outcome-Driven Solutions
          </h2>
          <p class="motion-text text-slate-300 max-w-2xl mx-auto mt-3">
            We don't just "build websites." We architect conversion systems
            designed to scale your specific business model.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="motion-card group relative bg-background-light p-8 rounded-xl border border-dark transition-all hover:scale-[1.05] hover:shadow-2xl flex flex-col h-full">
            <div
              class="absolute top-0 right-8 -translate-y-1/2 bg-primary text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Popular
            </div>
            <div class="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-6">
              <span class="material-icons-outlined text-3xl">hub</span>
            </div>
            <h4 class="text-2xl font-bolder mb-3" style="font-weight: 600">
              Lead Gen System
            </h4>
            <p class="text-slate-300 mb-6 flex-grow">
              A complete pipeline designed to capture, nurture, and convert
              high-intent B2B leads.
            </p>
            <ul class="space-y-3 mb-8 text-sm p-0">
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                Conversion-First Landing Pages
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                Targeted Ad Campaigns (GADS/Meta)
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                CRM Integration &amp; Automation
              </li>
            </ul>
            <div class="pt-6 border-t border-slate-200">
              <p class="text-xs uppercase font-bold text-slate-400 mb-2">
                <small>Primary Outcome</small>
              </p>
              <h5 class="text-lg font-bold text-primary" style="font-weight: 600">
                Predictable Sales Pipeline
              </h5>
            </div>
          </div>
          <div
            class="motion-card group relative bg-dark p-8 rounded-xl scale-[1.05] hover:scale-[1.08] border border-dark transition-all shadow-2xl flex flex-col h-full">
            <div
              class="absolute top-0 right-8 -translate-y-1/2 bg-primary text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Most Popular
            </div>
            <div class="w-14 h-14 bg-white/10 text-white rounded-lg flex items-center justify-center mb-6">
              <span class="material-icons-outlined text-3xl">shopping_bag</span>
            </div>
            <h4 class="text-2xl font-bold mb-3 text-white" style="font-weight: 600">
              E-commerce Growth
            </h4>
            <p class="text-slate-300 mb-6 flex-grow">
              Aggressive scaling strategies for Shopify &amp; custom stores
              focusing on AOV and LTV.
            </p>
            <ul class="space-y-3 mb-8 text-sm text-slate-200  font-medium p-0">
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-primary  text-sm">check_circle</span>
                High-Converting Checkout UI
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-primary  text-sm">check_circle</span>
                Performance Creative Production
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-primary  text-sm">check_circle</span>
                Advanced Retention Flows
              </li>
            </ul>
            <div class="pt-6 border-t border-white/20">
              <p class="text-xs uppercase font-bold text-slate-400 mb-2">
                <small>Primary Outcome</small>
              </p>
              <h5 class="text-lg font-bold text-white " style="font-weight: 600">
                Maximum ROAS Scaling
              </h5>
            </div>
          </div>
          <div
            class="motion-card group relative bg-background-light p-8 rounded-xl border border-dark transition-all hover:scale-[1.05] hover:shadow-2xl flex flex-col h-full">
            <div
              class="absolute top-0 right-8 -translate-y-1/2 bg-primary text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Popular
            </div>
            <div class="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center mb-6">
              <span class="material-icons-outlined text-3xl">rocket_launch</span>
            </div>
            <h4 class="text-2xl font-bold mb-3" style="font-weight: 600">
              Startup Launch Kit
            </h4>
            <p class="text-slate-300 mb-6 flex-grow">
              From MVP to Market Leader. We build the foundation your vision
              needs to secure funding.
            </p>
            <ul class="space-y-3 mb-8 text-sm p-0">
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                Rapid Product UI/UX Prototyping
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                Investor-Ready Pitch Platforms
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-green-500 text-sm">check_circle</span>
                Modern Tech-Stack Deployment
              </li>
            </ul>
            <div class="pt-6 border-t border-slate-200">
              <p class="text-xs uppercase font-bold text-slate-500 mb-2">
                <small>Primary Outcome</small>
              </p>
              <h5 class="text-lg font-bold text-primary" style="font-weight: 600">
                Market Dominance Ready
              </h5>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center gap-3 mt-5">
          <a class="amor-btn btn-fill-primary btn-large"
            href="https://wa.me/917975859061/?text=Get%20my%20free%20GROWTH%20Audit.">Get My Free Growth Audit</a>
        </div>
      </div>
    </section>

    <section class="py-40 bg-white" id="results">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div class="lg:col-span-6">
            <div
              class="inline-block py-2 px-4 rounded bg-dark text-brand-700 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <span class="text-ly">Performance Metrics</span>
            </div>
            <h2 class="text-6xl lg:text-8xl font-display mb-12 text-dark" style="font-weight: 600">
              Hard Data. <br /><span class="text-gradient-brand text-ly">Zero Guesswork.</span>
            </h2>
            <div class="space-y-12 relative">
              <div class="group">
                <div class="flex justify-between items-center mb-0">
                  <div>
                    <h4 class="font-bold text-2xl text-dark mb-1">
                      Conversion Efficiency
                    </h4>
                    <p class="text-slate-600 font-medium mb-4">
                      Post-optimization average
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
                      Average B2B acceleration
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
                      Cumulative yearly scaling
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
          Our Proven <span class="text-ly">4-Step Process</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-0">
          <div class="step-arrow bg-slate-900 text-white p-8 mb-4 md:mb-0 hover:scale-[1.04] transition-all">
            <div class="text-4xl font-black mb-4 opacity-50">01</div>
            <h5 class="font-bold text-lg mb-2 d-block">Audit &amp; Strategy</h5>
            <small class="text-sm text-slate-300">
              Deep dive into your metrics and map out the growth path.
            </small>
          </div>
          <div class="step-arrow bg-slate-800 text-white p-8 mb-4 md:mb-0 hover:scale-[1.06] transition-all">
            <div class="text-4xl font-black mb-4 opacity-80">02</div>
            <h5 class="font-bold text-lr mb-2 d-block">Design &amp; Build</h5>
            <small class="text-sm text-slate-300">
              Crafting your high-converting assets with precision.
            </small>
          </div>
          <div class="step-arrow bg-slate-700 text-white p-8 mb-4 md:mb-0 hover:scale-[1.08] transition-all">
            <div class="text-4xl font-black mb-4 opacity-80">03</div>
            <h5 class="font-bold text-ly mb-2 d-block">Launch</h5>
            <small class="text-sm text-slate-100">
              Deploying campaigns and monitoring live performance.
            </small>
          </div>
          <div class="step-arrow bg-slate-600 text-slate-900 p-8 mb-4 md:mb-0 hover:scale-[1.1] transition-all">
            <div class="text-4xl font-black mb-4 opacity-80">04</div>
            <h5 class="font-bold text-lb mb-2 d-block">Optimize &amp; Scale</h5>
            <small class="text-sm text-slate-300">
              Daily improvements to maximize your return on investment.
            </small>
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
          <span class="subtitle">Our Recent Clients</span>
          <h2 class="title">
            <span class="gradient-text yellow-light">Trusted </span> by
            <span class="gradient-text yellow-light">Leading</span> Businesses
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
                      <span class="subtitle">Logo, Branding, UI/UX Design, Website, GMB, GA</span>
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
                      <span class="subtitle">Redesign, UI/UX Design, Wireframing, High-Fidelity
                        Prototype</span>
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
                      <span class="subtitle">Logo, Branding, UI/UX Design, Website, GMB, GA</span>
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
                      <span class="subtitle">UI/UX Design, Website, GA</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="d-lg-flex justify-content-center">
            <a class="amor-btn btn-borderd light" href="/case-studies">Case Study</a>
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
          <span class="subtitle">What Clients Say</span>
          <h2 class="title">
            <span class="gradient-text yellow-dark">Feedback</span> That
            <span class="gradient-text yellow-dark">Inspires</span> Us
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
              "Good understanding of the client's need. Very good professional
              and service provider. you again for a job well done, All the best
              👍👍💐💐"
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
          Why Businesses Choose Us
        </h2>
        <div class="space-y-4 w-50 why mx-auto">
          <div
            class="group bg-dark p-6 rounded-2xl border border-dark flex items-center justify-between hover:border-primary transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 text-ly flex items-center justify-center">
                <span class="material-symbols-outlined">target</span>
              </div>
              <span class="text-xl font-semibold">Strategy-First Approach</span>
            </div>
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">arrow_forward</span>
          </div>
          <div
            class="group bg-dark p-6 rounded-2xl border border-dark flex items-center justify-between hover:border-primary transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 text-ly flex items-center justify-center">
                <span class="material-symbols-outlined">trending_up</span>
              </div>
              <span class="text-xl font-semibold">Business Results Focused</span>
            </div>
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">arrow_forward</span>
          </div>
          <div
            class="group bg-dark p-6 rounded-2xl border border-dark flex items-center justify-between hover:border-primary transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 text-ly flex items-center justify-center">
                <span class="material-symbols-outlined">analytics</span>
              </div>
              <span class="text-xl font-semibold">100% Data-Driven Decisions</span>
            </div>
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">arrow_forward</span>
          </div>
          <div
            class="group bg-dark p-6 rounded-2xl border border-dark flex items-center justify-between hover:border-primary transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 text-ly flex items-center justify-center">
                <span class="material-symbols-outlined">handshake</span>
              </div>
              <span class="text-xl font-semibold">True Growth Partners</span>
            </div>
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">arrow_forward</span>
          </div>
        </div>
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
