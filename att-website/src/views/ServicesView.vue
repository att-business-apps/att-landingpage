<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: "palette",
    tag: "Design",
    title: "Website Design",
    desc: "Build trust, strengthen credibility, and convert more visitors with strategic, conversion-focused website design.",
    bestFor: ["Startups", "Professional Services"],
    href: "/website-design",
  },
  {
    icon: "code",
    tag: "Engineering",
    title: "Web Development",
    desc: "Launch fast, scalable websites engineered to support long-term business growth.",
    bestFor: ["SaaS", "Growing Businesses"],
    href: "/web-development",
  },
  {
    icon: "design_services",
    tag: "Experience",
    title: "UI/UX Design",
    desc: "Deliver intuitive digital experiences that increase engagement and improve conversions.",
    bestFor: ["Product Teams", "Startups"],
    href: "/ui-ux-design",
  },
  {
    icon: "shopping_bag",
    tag: "Commerce",
    title: "Ecommerce Development",
    desc: "Increase online sales with ecommerce experiences optimized for conversions and customer retention.",
    bestFor: ["D2C Brands", "Retailers"],
    href: "/ecommerce-development",
  },
  {
    icon: "hub",
    tag: "Growth",
    title: "Lead Generation",
    desc: "Build a predictable pipeline of qualified leads—not just website traffic.",
    bestFor: ["B2B Companies", "Service Businesses"],
    href: "/lead-generation",
  },
  {
    icon: "storefront",
    tag: "Commerce",
    title: "Shopify Development",
    desc: "Grow revenue with Shopify stores optimized for conversions and repeat purchases.",
    bestFor: ["Shopify Stores", "D2C Brands"],
    href: "/shopify-development",
  },
  {
    icon: "manage_search",
    tag: "Visibility",
    title: "SEO",
    desc: "Get found by the right customers and generate sustainable organic growth.",
    bestFor: ["Local Businesses", "SaaS"],
    href: "/seo",
  },
  {
    icon: "campaign",
    tag: "Acquisition",
    title: "Digital Marketing",
    desc: "Generate qualified leads and maximize marketing ROI with measurable, performance-driven campaigns.",
    bestFor: ["Real Estate", "Healthcare"],
    href: "/digital-marketing",
  },
  {
    icon: "groups",
    tag: "Social",
    title: "Social Media Marketing",
    desc: "Build a stronger brand presence and convert engagement into business opportunities.",
    bestFor: ["Consumer Brands", "Startups"],
    href: "/social-media-marketing",
  },
  {
    icon: "work",
    tag: "Social",
    title: "LinkedIn Marketing",
    desc: "Connect with decision-makers and generate high-quality B2B opportunities.",
    bestFor: ["B2B Companies", "Founders"],
    href: "/linkedin-marketing",
  },
  {
    icon: "auto_awesome",
    tag: "Identity",
    title: "Branding",
    desc: "Create a memorable brand that earns trust, stands out, and supports long-term business growth.",
    bestFor: ["Startups", "New Businesses"],
    href: "/branding",
  },
  {
    icon: "build",
    tag: "Support",
    title: "Website Maintenance",
    desc: "Protect your investment with continuous improvements that keep your website secure, fast, and reliable.",
    bestFor: ["All Businesses", "Live Sites"],
    href: "/website-maintenance",
  },
];

let gsapContext;

onMounted(() => {
  gsapContext = gsap.context(() => {
    gsap.from(".svc-hero-eyebrow, .svc-hero-title, .svc-hero-sub", {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.utils.toArray(".svc-card").forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        autoAlpha: 0,
        duration: 0.7,
        delay: (i % 3) * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          once: true,
        },
      });
    });

    gsap.from(".svc-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".svc-cta-section",
        start: "top 80%",
        once: true,
      },
    });
  });
});

onBeforeUnmount(() => {
  gsapContext && gsapContext.revert();
});
</script>

<template>
  <div class="breadcrum-area breadcrumb-banner">
    <div class="container">
      <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
        <ul class="list-unstyled">
          <li><a href="/">Home</a></li>
          <li class="active">Services</li>
        </ul>
        <div class="section-heading heading-left">
          <h1 class="title h2 mb-0">Digital Services That Build Trust, Generate Leads & Drive Growth</h1>
          <p>Every service is built around one objective: helping your business attract better customers, convert more visitors, and grow with confidence.</p>
        </div>
      </div>
      <div class="banner-thumbnail ">
        <div class=""
          style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
          <img src="../assets/img/amorboy/am-service.png" class="w-75 animate__animated slideInRight"
            style="animation-duration: 3s" alt="Illustration">
        </div>
      </div>
    </div>
  </div>

  <!-- Services Grid -->
  <section class="svc-grid-section">
    <div class="svc-grid-inner">
      <div class="svc-grid">
        <a
          v-for="service in services"
          :key="service.href"
          :href="service.href"
          class="svc-card group"
        >
          <div class="svc-card-top">
            <div class="svc-card-icon">
              <span class="material-symbols-outlined">{{ service.icon }}</span>
            </div>
            <span class="svc-card-tag">{{ service.tag }}</span>
          </div>

          <h3 class="svc-card-title">{{ service.title }}</h3>
          <p class="svc-card-desc">{{ service.desc }}</p>

          <div class="svc-card-best-for">
            <span class="svc-card-best-for-label">Best for</span>
            <div class="svc-card-best-for-tags">
              <span v-for="tag in service.bestFor" :key="tag" class="svc-card-tag-pill">{{ tag }}</span>
            </div>
          </div>

          <div class="svc-card-cta">
            <span>Learn more</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 13L13 3M13 3H6M13 3V10"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="svc-cta-section">
    <div class="svc-cta-inner">
      <div class="svc-cta-eyebrow">
        <span class="text-ly">Not Sure Where to Start?</span>
      </div>
      <h2 class="svc-cta-title">
        Let's Map the Right <span class="text-ly">Service Mix</span> for Your Goals
      </h2>
      <p class="svc-cta-sub">
        Most projects combine two or three of the above. Tell us where you're stuck and we'll
        recommend a scope — no obligation.
      </p>
      <div class="d-flex justify-content-center flex-wrap gap-3 mt-5">
        <a
          class="amor-btn btn-fill-primary btn-large"
          href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call."
        >Book Your Free Strategy Call</a>
        <a href="/case-studies" class="amor-btn btn-borderd light">See Our Work</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── Grid Section ───────────────────────────────────────────────────── */
.svc-grid-section {
  padding: 6rem 4rem 8rem;
  background: #f8fafc;
}

@media (max-width: 1100px) {
  .svc-grid-section { padding: 4rem 2rem 5rem; }
}

@media (max-width: 768px) {
  .svc-grid-section { padding: 3rem 1.25rem 4rem; }
}

.svc-grid-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .svc-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .svc-grid { grid-template-columns: 1fr; }
}

.svc-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  padding: 2.25rem 2rem;
  text-decoration: none;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  will-change: transform;
}

.svc-card:hover {
  transform: translateY(-6px);
  border-color: rgba(250, 204, 21, 0.4);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.svc-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.svc-card-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  flex-shrink: 0;
  transition: background 0.35s ease, color 0.35s ease;
}

.svc-card-icon .material-symbols-outlined {
  font-size: 1.5rem;
}

.svc-card:hover .svc-card-icon {
  background: #facc15;
  color: #0f172a;
}

.svc-card-tag {
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

.svc-card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.01em;
  margin-bottom: 0.7rem;
}

.svc-card-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.7;
  flex-grow: 1;
  margin-bottom: 1.25rem;
}

.svc-card-best-for {
  margin-bottom: 1.5rem;
}

.svc-card-best-for-label {
  display: block;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 700;
  margin-bottom: 0.55rem;
}

.svc-card-best-for-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.svc-card-tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #475569;
  background: #eef2f6;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 7px;
  padding: 0.28rem 0.6rem 0.28rem 0.55rem;
  line-height: 1;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.svc-card-tag-pill::before {
  content: "";
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #94a3b8;
  flex-shrink: 0;
  transition: background 0.3s ease;
}

.svc-card:hover .svc-card-tag-pill {
  background: #fef9e7;
  border-color: rgba(250, 204, 21, 0.45);
  color: #92660a;
}

.svc-card:hover .svc-card-tag-pill::before {
  background: #eab308;
}

.svc-card-cta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #0f172a;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(15, 23, 42, 0.07);
  transition: color 0.3s ease, gap 0.3s ease;
}

.svc-card-cta svg {
  transition: transform 0.3s ease;
}

.svc-card:hover .svc-card-cta {
  color: var(--color-primaryR);
  gap: 0.7rem;
}

.svc-card:hover .svc-card-cta svg {
  transform: translate(2px, -2px);
}

/* ─── Closing CTA ────────────────────────────────────────────────────── */
.svc-cta-section {
  padding: 7rem 4rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .svc-cta-section { padding: 5rem 2rem; }
}

@media (max-width: 768px) {
  .svc-cta-section { padding: 4rem 1.25rem; }
}

.svc-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.svc-cta-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.svc-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  margin-bottom: 1.25rem;
}

.svc-cta-sub {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.75;
}
</style>