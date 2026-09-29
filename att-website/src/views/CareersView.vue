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
    tag: "AI & Automation",
    metric: "3x Faster Iteration",
    title: "AI-Assisted Workflows",
    text: "We use automation, research loops, and reusable systems to shorten the path from idea to shipping while keeping the work human and precise.",
    image: buildImage,
  },
  {
    tag: "Design & Engineering",
    metric: "Zero Dropped Handoffs",
    title: "Calm Under Pressure",
    text: "Product decisions are made around clarity, conversion, and maintainability, so launches can keep improving after they go live.",
    image: designImage,
  },
  {
    tag: "Growth Systems",
    metric: "One Operating Rhythm",
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

function addStoryHovers() {
  gsap.utils.toArray(".careers-story-card").forEach((card) => {
    const img = card.querySelector(".careers-story-media img");
    const overlay = card.querySelector(".careers-story-overlay");
    const arrow = card.querySelector(".careers-story-arrow");

    const tl = gsap.timeline({ paused: true });
    tl.to(img, { scale: 1.09, duration: 0.7, ease: "power2.out" }, 0)
      .to(overlay, { opacity: 0.62, duration: 0.5, ease: "power2.out" }, 0)
      .to(card, { y: -6, borderColor: "rgba(250, 204, 21, 0.55)", duration: 0.4, ease: "power2.out" }, 0)
      .to(arrow, { x: 4, y: -4, backgroundColor: "#facc15", color: "#0f172a", duration: 0.4, ease: "power2.out" }, 0);

    card.addEventListener("mouseenter", () => tl.play());
    card.addEventListener("mouseleave", () => tl.reverse());
  });
}

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

    // Stories header
    gsap.from(".careers-stories-eyebrow, .careers-stories-heading, .careers-stories-count", {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".careers-stories", start: "top 78%", once: true },
    });

    // Stories bento cards
    gsap.utils.toArray(".careers-story-card").forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        autoAlpha: 0,
        duration: 0.8,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".careers-story-bento", start: "top 82%", once: true },
      });
    });
    addStoryHovers();

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
         STORIES — Premium bento feature grid
         ============================================================ -->
    <section class="careers-stories">
      <div class="careers-stories-inner">
        <div class="careers-stories-header">
          <div>
            <div class="careers-stories-eyebrow att-section-label">How Our Teams Build</div>
            <h2 class="careers-stories-heading">With Systems, Taste &amp; Momentum</h2>
          </div>
          <span class="careers-stories-count">03 Practices</span>
        </div>

        <div class="careers-story-bento">
          <article
            v-for="(story, i) in stories"
            :key="story.title"
            class="careers-story-card"
            :class="{ 'careers-story-card--feature': i === 0 }"
          >
            <div class="careers-story-media">
              <img :src="story.image" :alt="story.title" loading="lazy" />
              <div class="careers-story-overlay"></div>
            </div>

            <div class="careers-story-top">
              <span class="careers-story-index">{{ String(i + 1).padStart(2, "0") }}</span>
              <span class="careers-story-tag">{{ story.tag }}</span>
            </div>

            <div class="careers-story-bottom">
              <div class="careers-story-bottom-text">
                <span class="careers-story-metric">
                  <span class="material-symbols-outlined">bolt</span>
                  {{ story.metric }}
                </span>
                <h3 class="careers-story-title">{{ story.title }}</h3>
                <p class="careers-story-desc">{{ story.text }}</p>
              </div>
              <span class="careers-story-arrow">
                <span class="material-symbols-outlined">arrow_outward</span>
              </span>
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

// ─── Stories (premium bento feature grid) ────────────────────────────────────
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
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

.careers-stories-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  color: #0f172a;
}

.careers-stories-count {
  flex-shrink: 0;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: #0f172a;
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  white-space: nowrap;
  margin-bottom: 0.4rem;
}

.careers-story-bento {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  grid-auto-rows: 260px;
  gap: 1.25rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
}

.careers-story-card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  will-change: transform;

  &--feature {
    grid-row: 1 / span 2;
    padding: 2.5rem;

    @media (max-width: 860px) {
      grid-row: auto;
      min-height: 380px;
    }
  }

  @media (max-width: 860px) {
    min-height: 300px;
  }
}

.careers-story-media {
  position: absolute;
  inset: 0;
  z-index: -2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    // Heavily muted + softened: source screenshots carry their own baked-in
    // text/UI, so we turn them into a quiet texture rather than a second,
    // competing layer of readable copy.
    filter: grayscale(0.85) contrast(0.92) brightness(0.42) blur(1.5px);
    transform: scale(1.03); // hides blur edge artifacts
    transform-origin: center;
  }
}

.careers-story-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  // Strong, near-uniform scrim (no light "window" in the middle) so every
  // zone of the card — not just the top/bottom — stays legible regardless
  // of how busy the underlying screenshot is.
  background: linear-gradient(
    195deg,
    rgba(10, 14, 26, 0.94) 0%,
    rgba(10, 14, 26, 0.82) 40%,
    rgba(10, 14, 26, 0.8) 60%,
    rgba(10, 14, 26, 0.96) 100%
  );
}

.careers-story-top {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.careers-story-index {
  flex-shrink: 0;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.55);
  font-variant-numeric: tabular-nums;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.careers-story-tag {
  min-width: 0;
  max-width: 78%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: #0f172a;
  background: #facc15;
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
}

.careers-story-bottom {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.careers-story-bottom-text {
  min-width: 0;
  flex: 1;
}

.careers-story-metric {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #facc15;
  margin-bottom: 0.75rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

  .material-symbols-outlined { font-size: 1rem; }
}

.careers-story-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
  margin-bottom: 0.6rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.55);

  .careers-story-card--feature & {
    font-size: 1.85rem;
  }
}

.careers-story-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.65;
  max-width: 42ch;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  .careers-story-card--feature & {
    font-size: 0.92rem;
    max-width: 34ch;
  }
}

.careers-story-arrow {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #ffffff;

  .material-symbols-outlined { font-size: 1.15rem; }

  .careers-story-card--feature & {
    width: 46px;
    height: 46px;

    .material-symbols-outlined { font-size: 1.3rem; }
  }
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