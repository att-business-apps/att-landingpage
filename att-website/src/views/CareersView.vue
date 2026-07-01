<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroImage from "../assets/img/amorboy/laptop-poses-banner.png";
import buildImage from "../assets/img/project/c1/project-uaeLinks.png";
import designImage from "../assets/img/project/c3/peoject-mr-web.png";
import systemsImage from "../assets/img/project/c5/als-book.png";

gsap.registerPlugin(ScrollTrigger);

const careersPage = ref(null);
let gsapContext;

const pillars = [
  {
    number: "01",
    icon: "rocket_launch",
    title: "Build Extraordinary",
    text: "Create useful digital products, automations, and growth systems for teams that need sharper outcomes, not louder dashboards.",
  },
  {
    number: "02",
    icon: "trending_up",
    title: "Grow Extraordinary",
    text: "Work close to strategy, design, engineering, and marketing so your learning compounds across disciplines.",
  },
  {
    number: "03",
    icon: "emoji_events",
    title: "Live Extraordinary",
    text: "Move with ownership, candor, and curiosity in a small team where initiative is visible and craft still matters.",
  },
];

const stories = [
  {
    tag: "How Our Teams Build",
    title: "AI-Assisted Workflows",
    text: "We use automation, research loops, and reusable systems to shorten the path from idea to shipping while keeping the work human and precise.",
    image: buildImage,
  },
  {
    tag: "Design & Engineering",
    title: "Calm Under Pressure",
    text: "Product decisions are made around clarity, conversion, and maintainability, so launches can keep improving after they go live.",
    image: designImage,
  },
  {
    tag: "Growth Systems",
    title: "Every Experiment Compounds",
    text: "Campaigns, landing pages, analytics, and content work together as one operating rhythm instead of scattered deliverables.",
    image: systemsImage,
  },
];

const hiringSteps = [
  {
    step: "01",
    icon: "psychology",
    title: "Role Fit",
    text: "A practical conversation around your strengths, portfolio, and the problems you like solving.",
  },
  {
    step: "02",
    icon: "construction",
    title: "Craft Round",
    text: "A focused exercise or walkthrough that shows how you think, decide, and communicate tradeoffs.",
  },
  {
    step: "03",
    icon: "groups",
    title: "Team Sync",
    text: "A working-style conversation about ownership, feedback, pace, and collaboration.",
  },
  {
    step: "04",
    icon: "handshake",
    title: "Offer",
    text: "Clear next steps, role expectations, and the first outcomes we will build toward together.",
  },
];

const marqueeText = computed(() => Array.from({ length: 6 }, () => "Outgrow Ordinary").join(" / "));

const previousTitle = document.title;

onMounted(() => {
  document.title = "Careers | Amortree Tech";

  gsapContext = gsap.context(() => {
    // Manifesto
    gsap.from(".careers-manifesto-eyebrow, .careers-manifesto-heading", {
      y: 30,
      autoAlpha: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".careers-manifesto", start: "top 78%", once: true },
    });

    // Pillars
    gsap.utils.toArray(".careers-pillar").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    // Stories header + rows
    gsap.from(".careers-stories-eyebrow, .careers-stories-heading", {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".careers-stories", start: "top 78%", once: true },
    });
    gsap.utils.toArray(".careers-story").forEach((row, i) => {
      gsap.from(row, {
        x: -40,
        autoAlpha: 0,
        duration: 0.7,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 90%", once: true },
      });
    });

    // Hiring steps
    gsap.from(".careers-hiring-eyebrow, .careers-hiring-heading", {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".careers-hiring", start: "top 78%", once: true },
    });
    gsap.utils.toArray(".careers-step").forEach((card, i) => {
      gsap.from(card, {
        y: 36,
        autoAlpha: 0,
        duration: 0.65,
        delay: (i % 4) * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      });
    });

    // CTA
    gsap.from(".careers-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".careers-cta", start: "top 82%", once: true },
    });

    // Hover lifts
    gsap.utils.toArray(".careers-pillar, .careers-step").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.35, ease: "power2.out" });
      });
    });

    ScrollTrigger.refresh();
  }, careersPage.value);
});

onBeforeUnmount(() => {
  gsapContext?.revert();
  document.title = previousTitle;
});
</script>

<template>
  <main ref="careersPage">
    <div class="breadcrum-area breadcrumb-banner">
      <div class="container">
        <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
          <ul class="list-unstyled">
            <li><a href="/">Home</a></li>
            <li class="active text-ly">Careers</li>
          </ul>
          <div class="section-heading heading-left">
            <h1 class="title h2 mb-4">
              Outgrow <span class="text-ly">Ordinary.</span>
            </h1>
            <p>
              The ordinary is safe, predictable, and comfortable. We're building for people
              who would rather sharpen the work, ship better systems, and make their impact
              impossible to miss.
            </p>
          </div>
        </div>
        <div class="banner-thumbnail">
          <div
            style="
              position: relative;
              will-change: transform;
              transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);
            "
          >
            <img
              :src="heroImage"
              class="w-75 animate__animated slideInRight"
              style="animation-duration: 3s"
              alt="Amortree Tech team at work"
            />
          </div>
        </div>
      </div>
      <ul class="shape-group-breadcrum-1 list-unstyled">
        <li class="shape shape-3 sal-animate" data-sal="slide-up" data-sal-duration="500" data-sal-delay="300">
          <img src="../assets/img/shapes/line-5.png" alt="line" />
        </li>
      </ul>
    </div>

    <!-- ============================================================
         MARQUEE STRIP
         ============================================================ -->
    <div class="careers-marquee" aria-hidden="true">
      <span>{{ marqueeText }}</span>
    </div>

    <!-- ============================================================
         MANIFESTO + PILLARS — Dark section
         ============================================================ -->
    <section class="careers-manifesto">
      <div class="careers-manifesto-inner">
        <div class="careers-manifesto-eyebrow att-section-label att-section-label--light">Why Amortree</div>
        <h2 class="careers-manifesto-heading">
          We want people who can make the work more useful, more elegant, and
          <span class="text-ly">more commercially alive.</span>
        </h2>

        <div class="careers-pillars-grid">
          <article v-for="pillar in pillars" :key="pillar.number" class="careers-pillar">
            <div class="careers-pillar-top">
              <div class="careers-pillar-icon">
                <span class="material-symbols-outlined">{{ pillar.icon }}</span>
              </div>
              <span class="careers-pillar-num">{{ pillar.number }}</span>
            </div>
            <h3 class="careers-pillar-title">{{ pillar.title }}</h3>
            <p class="careers-pillar-text">{{ pillar.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================
         STORIES — Light numbered row list
         ============================================================ -->
    <section class="careers-stories">
      <div class="careers-stories-inner">
        <div class="careers-stories-header">
          <div>
            <div class="careers-stories-eyebrow att-section-label">How Our Teams Build</div>
            <h2 class="careers-stories-heading">With Systems, Taste &amp; Momentum</h2>
          </div>
        </div>

        <div class="careers-story-list">
          <article v-for="story in stories" :key="story.title" class="careers-story">
            <div class="careers-story-thumb">
              <img :src="story.image" :alt="story.title" />
            </div>
            <div class="careers-story-info">
              <span class="careers-story-tag">{{ story.tag }}</span>
              <h3 class="careers-story-title">{{ story.title }}</h3>
              <p class="careers-story-desc">{{ story.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================
         HIRING PROCESS — Light ghost-numbered grid
         ============================================================ -->
    <section class="careers-hiring">
      <div class="careers-hiring-inner">
        <div class="careers-hiring-header">
          <div>
            <div class="careers-hiring-eyebrow att-section-label">How We Hire</div>
            <h2 class="careers-hiring-heading">Clear Rounds. Real Work. No Mystery Theater.</h2>
          </div>
        </div>

        <div class="careers-hiring-grid">
          <article v-for="step in hiringSteps" :key="step.title" class="careers-step" :data-step="step.step">
            <div class="careers-step-icon">
              <span class="material-symbols-outlined">{{ step.icon }}</span>
            </div>
            <h3 class="careers-step-title">{{ step.title }}</h3>
            <p class="careers-step-text">{{ step.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================
         CLOSING CTA
         ============================================================ -->
    <section id="open-roles" class="careers-cta">
      <div class="careers-cta-inner">
        <div class="careers-cta-eyebrow">
          <span class="text-ly">Open Roles</span>
        </div>
        <h2 class="careers-cta-title">
          Build. Grow. Live. <span class="text-ly">Extraordinary.</span>
        </h2>
        <p class="careers-cta-sub">
          We're always open to sharp designers, builders, marketers, and operators who can
          turn ambition into shipped work.
        </p>
        <div class="d-flex justify-content-center flex-wrap gap-3 mt-5">
          <a
            class="amor-btn btn-fill-primary btn-large"
            href="mailto:hi@amortree.com?subject=Careers%20at%20Amortree%20Tech"
          >Share Your Profile</a>
          <a href="/contact" class="amor-btn btn-borderd light">Start a Conversation</a>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
// ─── Shared section label ───────────────────────────────────────────────────
.att-section-label {
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-primaryR, #dc3c2d);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;

  &::before {
    content: "";
    width: 28px;
    height: 1px;
    background: var(--color-primaryR, #dc3c2d);
    flex-shrink: 0;
  }

  &--light {
    color: #facc15;
    &::before { background: #facc15; }
  }
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
.careers-marquee {
  width: 100%;
  overflow: hidden;
  padding: 1.1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: #000000;
}

.careers-marquee span {
  display: inline-block;
  min-width: max-content;
  color: rgba(250, 204, 21, 0.85);
  font-size: clamp(1.4rem, 3.2vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  white-space: nowrap;
  animation: careers-marquee 26s linear infinite;
}

@keyframes careers-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .careers-marquee span { animation: none; }
}

// ─── Manifesto + Pillars (dark) ─────────────────────────────────────────────
.careers-manifesto {
  padding: 8rem 4rem;
  background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%);

  @media (max-width: 1100px) { padding: 5rem 2rem; }
  @media (max-width: 768px)  { padding: 4rem 1.25rem; }
}

.careers-manifesto-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.careers-manifesto-heading {
  max-width: 900px;
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  font-weight: 700;
  line-height: 1.12;
  color: #ffffff;
  margin-bottom: 5rem;
}

.careers-pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px)  { grid-template-columns: 1fr; }
}

.careers-pillar {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 2.25rem 2rem;
  transition: border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
  will-change: transform;

  &:hover {
    border-color: rgba(250, 204, 21, 0.4);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 24px 48px -20px rgba(0, 0, 0, 0.6);
  }
}

.careers-pillar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
}

.careers-pillar-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #facc15;
  transition: background 0.35s ease, color 0.35s ease;

  .material-symbols-outlined { font-size: 1.4rem; }

  .careers-pillar:hover & {
    background: #facc15;
    color: #0f172a;
  }
}

.careers-pillar-num {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.25);
  font-variant-numeric: tabular-nums;
}

.careers-pillar-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
}

.careers-pillar-text {
  font-size: 0.88rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.55);
}

// ─── Stories (light row list) ────────────────────────────────────────────────
.careers-stories {
  padding: 7rem 4rem;
  background: #ffffff;

  @media (max-width: 1100px) { padding: 4.5rem 2rem; }
  @media (max-width: 768px)  { padding: 3.5rem 1.25rem; }
}

.careers-stories-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.careers-stories-header {
  margin-bottom: 3.5rem;
}

.careers-stories-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  color: #0f172a;
}

.careers-story-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.careers-story {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2.25rem;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid rgba(15, 23, 42, 0.07);
  border-radius: 18px;
  transition: border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
  will-change: transform;

  &:hover {
    border-color: rgba(250, 204, 21, 0.4);
    box-shadow: 0 24px 48px -20px rgba(15, 23, 42, 0.2);
    background: #f8fafc;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.careers-story-thumb {
  width: 100%;
  aspect-ratio: 16 / 11;
  border-radius: 12px;
  overflow: hidden;
  background: #f8fafc;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.5rem;
  }
}

.careers-story-tag {
  display: block;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #facc15;
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.careers-story-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.01em;
  margin-bottom: 0.6rem;
}

.careers-story-desc {
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.72;
  max-width: 560px;
}

// ─── Hiring grid (light ghost-numbered) ──────────────────────────────────────
.careers-hiring {
  padding: 8rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);

  @media (max-width: 1100px) { padding: 5rem 2rem; }
  @media (max-width: 768px)  { padding: 4rem 1.25rem; }
}

.careers-hiring-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.careers-hiring-header {
  margin-bottom: 4rem;
}

.careers-hiring-heading {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 700;
  line-height: 1.1;
  color: #0f172a;
  max-width: 780px;
}

.careers-hiring-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px)  { grid-template-columns: 1fr; }
}

.careers-step {
  background: #f8fafc;
  padding: 2.5rem 2rem;
  position: relative;
  overflow: hidden;
  transition: background 0.35s ease;
  will-change: transform;

  &:hover { background: #f1f5f9; }

  &::before {
    content: attr(data-step);
    position: absolute;
    top: -1rem;
    right: 1.25rem;
    font-size: 6.5rem;
    font-weight: 900;
    color: rgba(15, 23, 42, 0.045);
    line-height: 1;
    pointer-events: none;
    transition: color 0.35s ease;
    font-variant-numeric: tabular-nums;
  }

  &:hover::before { color: rgba(250, 204, 21, 0.09); }
}

.careers-step-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: #92660a;

  .material-symbols-outlined { font-size: 1.25rem; }
}

.careers-step-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: 0.01em;
  margin-bottom: 0.6rem;
}

.careers-step-text {
  font-size: 0.83rem;
  color: #64748b;
  line-height: 1.72;
}

// ─── Closing CTA ─────────────────────────────────────────────────────────────
.careers-cta {
  padding: 7rem 4rem;
  text-align: center;
  background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%);

  @media (max-width: 1100px) { padding: 5rem 2rem; }
  @media (max-width: 768px)  { padding: 4rem 1.25rem; }
}

.careers-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.careers-cta-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.careers-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  margin-bottom: 1.25rem;
}

.careers-cta-sub {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.75;
}
</style>