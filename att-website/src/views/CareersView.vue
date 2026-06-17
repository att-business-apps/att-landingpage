<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroImage from "../assets/img/amorboy/laptop-poses-banner.png";
import teamImage from "../assets/img/amorboy/am-work.png";
import buildImage from "../assets/img/project/c1/project-uaeLinks.png";
import designImage from "../assets/img/project/c3/peoject-mr-web.png";
import systemsImage from "../assets/img/project/c5/als-book.png";
import processOne from "../assets/img/amorboy/process-1.png";
import processTwo from "../assets/img/amorboy/process-2.png";
import processThree from "../assets/img/amorboy/process-3.png";
import processFour from "../assets/img/amorboy/process-4.png";

gsap.registerPlugin(ScrollTrigger);

const careersPage = ref(null);
let gsapContext;

const pillars = [
  {
    number: "01",
    title: "Build Extraordinary.",
    text: "Create useful digital products, automations, and growth systems for teams that need sharper outcomes, not louder dashboards.",
  },
  {
    number: "02",
    title: "Grow Extraordinary.",
    text: "Work close to strategy, design, engineering, and marketing so your learning compounds across disciplines.",
  },
  {
    number: "03",
    title: "Live Extraordinary.",
    text: "Move with ownership, candor, and curiosity in a small team where initiative is visible and craft still matters.",
  },
];

const stories = [
  {
    eyebrow: "How our teams build",
    title: "AI-assisted workflows for faster launches.",
    text: "We use automation, research loops, and reusable systems to shorten the path from idea to shipping while keeping the work human and precise.",
    image: buildImage,
  },
  {
    eyebrow: "Design and engineering",
    title: "Interfaces that feel calm under pressure.",
    text: "Product decisions are made around clarity, conversion, and maintainability, so launches can keep improving after they go live.",
    image: designImage,
  },
  {
    eyebrow: "Growth systems",
    title: "Every experiment feeds the next one.",
    text: "Campaigns, landing pages, analytics, and content work together as one operating rhythm instead of scattered deliverables.",
    image: systemsImage,
  },
];

const hiringSteps = [
  {
    icon: processOne,
    title: "Role Fit",
    text: "A practical conversation around your strengths, portfolio, and the problems you like solving.",
  },
  {
    icon: processTwo,
    title: "Craft Round",
    text: "A focused exercise or walkthrough that shows how you think, decide, and communicate tradeoffs.",
  },
  {
    icon: processThree,
    title: "Team Sync",
    text: "A working-style conversation about ownership, feedback, pace, and collaboration.",
  },
  {
    icon: processFour,
    title: "Offer",
    text: "Clear next steps, role expectations, and the first outcomes we will build toward together.",
  },
];

const marqueeText = computed(() =>
  Array.from({ length: 6 }, () => "Outgrow Ordinary").join(" / "),
);

const previousTitle = document.title;

function animateCareersPage() {
  if (!careersPage.value) return;

  gsapContext?.revert();
  gsapContext = gsap.context(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          ".careers-hero__copy",
          ".careers-collage__panel",
          ".careers-collage__metric",
          ".careers-manifesto h2",
          ".careers-pillar",
          ".careers-story",
          ".careers-step",
          ".careers-cta",
        ],
        { clearProps: "all" },
      );
      return;
    }

    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".careers-hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.9,
      },
    })
      .to(".careers-hero__copy", { yPercent: -18, autoAlpha: 0.64 }, 0)
      .to(".careers-collage__panel--large", { yPercent: -24, rotate: -2 }, 0)
      .to(".careers-collage__panel--small", { yPercent: -42, rotate: 3 }, 0)
      .to(".careers-collage__metric", { yPercent: -74, scale: 0.92 }, 0)
      .to(".careers-marquee span", { xPercent: -18 }, 0);

    gsap.fromTo(
      ".careers-manifesto h2",
      { y: 80, autoAlpha: 0, filter: "blur(12px)" },
      {
        y: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: ".careers-manifesto",
          start: "top 82%",
          end: "center 46%",
          scrub: 0.7,
        },
      },
    );

    gsap.fromTo(
      ".careers-pillar",
      { y: 90, autoAlpha: 0.2 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".careers-pillars",
          start: "top 88%",
          end: "bottom 62%",
          scrub: 0.8,
        },
      },
    );

    gsap.utils.toArray(".careers-story").forEach((story, index) => {
      gsap.fromTo(
        story,
        {
          xPercent: index % 2 === 0 ? -8 : 8,
          y: 54,
          autoAlpha: 0.35,
        },
        {
          xPercent: 0,
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: story,
            start: "top 90%",
            end: "center 56%",
            scrub: 0.75,
          },
        },
      );
    });

    gsap.fromTo(
      ".careers-step",
      { y: 76, scale: 0.94, autoAlpha: 0.3 },
      {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".careers-hiring",
          start: "top 82%",
          end: "bottom 70%",
          scrub: 0.8,
        },
      },
    );

    gsap.fromTo(
      ".careers-cta",
      { y: 80, autoAlpha: 0.35 },
      {
        y: 0,
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".careers-cta",
          start: "top 88%",
          end: "center 62%",
          scrub: 0.7,
        },
      },
    );

    ScrollTrigger.refresh();
  }, careersPage.value);
}

onMounted(() => {
  document.title = "Careers | Amortree Tech";
  nextTick(animateCareersPage);
});

onBeforeUnmount(() => {
  gsapContext?.revert();
  document.title = previousTitle;
});
</script>

<template>
  <main ref="careersPage" class="careers-page">
    <section class="careers-hero" aria-labelledby="careers-title">
      <div class="careers-hero__inner">
        <div class="careers-hero__copy">
          <p class="careers-kicker">/ Careers at Amortree</p>
          <h1 id="careers-title">
            <span>Outgrow</span>
            <span>Ordinary</span>
          </h1>
          <p class="careers-hero__lead">
            The ordinary is safe, predictable, and comfortable. We are building
            for people who would rather sharpen the work, ship better systems,
            and make their impact impossible to miss.
          </p>
          <div class="careers-actions">
            <a class="careers-btn careers-btn--primary" href="#open-roles">See open roles</a>
            <a class="careers-btn careers-btn--ghost" href="/contact">Start a conversation</a>
          </div>
        </div>

        <div class="careers-collage" aria-hidden="true">
          <div class="careers-collage__panel careers-collage__panel--large">
            <img :src="heroImage" alt="" />
          </div>
          <div class="careers-collage__panel careers-collage__panel--small">
            <img :src="teamImage" alt="" />
          </div>
          <div class="careers-collage__metric">
            <strong>4x</strong>
            <span>Faster idea-to-launch cycles</span>
          </div>
        </div>
      </div>
      <div class="careers-marquee" aria-hidden="true">
        <span>{{ marqueeText }}</span>
      </div>
    </section>

    <section class="careers-manifesto">
      <div class="careers-section-label">/ Outgrow Ordinary</div>
      <h2>
        We want people who can make the work more useful, more elegant, and
        more commercially alive.
      </h2>
    </section>

    <section class="careers-pillars" aria-label="Why join Amortree Tech">
      <article v-for="pillar in pillars" :key="pillar.number" class="careers-pillar">
        <span>({{ pillar.number }})</span>
        <h3>{{ pillar.title }}</h3>
        <p>{{ pillar.text }}</p>
      </article>
    </section>

    <section class="careers-stories" aria-labelledby="stories-title">
      <div class="careers-stories__heading">
        <p class="careers-section-label">/ How our teams build</p>
        <h2 id="stories-title">With systems, taste, and momentum.</h2>
      </div>

      <div class="careers-story-grid">
        <article v-for="story in stories" :key="story.title" class="careers-story">
          <img :src="story.image" :alt="story.title" />
          <div>
            <p>{{ story.eyebrow }}</p>
            <h3>{{ story.title }}</h3>
            <span>{{ story.text }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="careers-hiring" aria-labelledby="hiring-title">
      <div>
        <p class="careers-section-label">/ How we hire</p>
        <h2 id="hiring-title">Clear rounds. Real work. No mystery theater.</h2>
      </div>

      <div class="careers-hiring__steps">
        <article v-for="step in hiringSteps" :key="step.title" class="careers-step">
          <img :src="step.icon" :alt="step.title" />
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <section id="open-roles" class="careers-cta" aria-labelledby="roles-title">
      <p class="careers-section-label">/ Open roles</p>
      <h2 id="roles-title">Build. Grow. Live. Extraordinary.</h2>
      <p>
        We are always open to sharp designers, builders, marketers, and operators
        who can turn ambition into shipped work.
      </p>
      <a class="careers-btn careers-btn--primary" href="mailto:hello@amortree.com?subject=Careers%20at%20Amortree%20Tech">
        Share your profile
      </a>
    </section>
  </main>
</template>

<style scoped>
.careers-page {
  --careers-bg: #07080c;
  --careers-panel: #111520;
  --careers-text: #f8fbff;
  --careers-muted: #aeb7c9;
  --careers-blue: #2f6bff;
  --careers-green: #46e0a4;
  --careers-line: rgba(255, 255, 255, 0.12);
  background: var(--careers-bg);
  color: var(--careers-text);
  overflow: hidden;
}

.careers-page :where(h1, h2, h3, p) {
  margin: 0;
}

.careers-hero {
  position: relative;
  min-height: 92vh;
  padding: 150px 24px 0;
  background:
    radial-gradient(circle at 18% 18%, rgba(47, 107, 255, 0.22), transparent 28%),
    linear-gradient(135deg, #07080c 0%, #101522 54%, #07080c 100%);
}

.careers-hero__inner,
.careers-manifesto,
.careers-pillars,
.careers-stories,
.careers-hiring,
.careers-cta {
  width: min(1180px, 100%);
  margin: 0 auto;
}

.careers-hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  gap: 56px;
  align-items: center;
}

.careers-kicker,
.careers-section-label {
  color: var(--careers-green);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.careers-hero h1 {
  margin-top: 22px;
  font-size: clamp(72px, 11vw, 120px);
  font-weight: 950;
  line-height: 0.82;
  letter-spacing: 0;
  text-transform: uppercase;
}

.careers-hero h1 span {
  display: block;
}

.careers-hero__lead {
  max-width: 720px;
  margin-top: 34px;
  color: #d8dfec;
  font-size: clamp(18px, 2vw, 25px);
  line-height: 1.45;
}

.careers-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.careers-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 22px;
  border: 1px solid var(--careers-line);
  border-radius: 4px;
  color: var(--careers-text);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.careers-btn:hover {
  color: var(--careers-text);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.36);
}

.careers-btn--primary {
  border-color: var(--careers-blue);
  background: var(--careers-blue);
}

.careers-btn--ghost {
  background: rgba(255, 255, 255, 0.06);
}

.careers-collage {
  position: relative;
  min-height: 560px;
}

.careers-collage__panel {
  position: absolute;
  overflow: hidden;
  border: 1px solid var(--careers-line);
  border-radius: 6px;
  background: var(--careers-panel);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.35);
}

.careers-collage__panel img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 18px;
}

.careers-collage__panel--large {
  inset: 30px 28px 116px 0;
}

.careers-collage__panel--small {
  right: 0;
  bottom: 0;
  width: 58%;
  height: 238px;
  background: #eef3ff;
}

.careers-collage__metric {
  position: absolute;
  left: 24px;
  bottom: 42px;
  display: grid;
  gap: 4px;
  width: 190px;
  padding: 22px;
  border: 1px solid rgba(70, 224, 164, 0.34);
  border-radius: 6px;
  background: rgba(10, 16, 24, 0.88);
  backdrop-filter: blur(14px);
}

.careers-collage__metric strong {
  font-size: 48px;
  line-height: 1;
}

.careers-collage__metric span {
  color: var(--careers-muted);
  font-size: 13px;
  line-height: 1.35;
}

.careers-marquee {
  width: calc(100% + 48px);
  margin: 74px -24px 0;
  padding: 18px 0;
  border-top: 1px solid var(--careers-line);
  border-bottom: 1px solid var(--careers-line);
  color: rgba(255, 255, 255, 0.74);
  font-size: clamp(28px, 4vw, 58px);
  font-weight: 950;
  line-height: 1;
  white-space: nowrap;
  text-transform: uppercase;
}

.careers-marquee span {
  display: inline-block;
  min-width: max-content;
  animation: careers-marquee 28s linear infinite;
}

.careers-manifesto {
  padding: 118px 24px 72px;
}

.careers-manifesto h2 {
  max-width: 1040px;
  margin-top: 22px;
  font-size: clamp(40px, 6.4vw, 92px);
  font-weight: 950;
  line-height: 0.98;
  letter-spacing: 0;
}

.careers-pillars {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--careers-line);
  border-bottom: 1px solid var(--careers-line);
}

.careers-pillar {
  min-height: 330px;
  padding: 34px 30px;
  border-right: 1px solid var(--careers-line);
}

.careers-pillar:last-child {
  border-right: 0;
}

.careers-pillar span {
  color: var(--careers-green);
  font-weight: 900;
}

.careers-pillar h3 {
  margin-top: 72px;
  font-size: clamp(26px, 3vw, 40px);
  line-height: 1;
}

.careers-pillar p {
  margin-top: 18px;
  color: var(--careers-muted);
  font-size: 16px;
  line-height: 1.65;
}

.careers-stories,
.careers-hiring {
  padding: 116px 24px;
}

.careers-stories__heading,
.careers-hiring {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: 48px;
}

.careers-stories h2,
.careers-hiring h2,
.careers-cta h2 {
  margin-top: 18px;
  font-size: clamp(42px, 6vw, 86px);
  font-weight: 950;
  line-height: 0.96;
  letter-spacing: 0;
}

.careers-story-grid {
  display: grid;
  gap: 22px;
  margin-top: 44px;
}

.careers-story {
  display: grid;
  grid-template-columns: minmax(240px, 0.72fr) minmax(0, 1fr);
  gap: 28px;
  align-items: center;
  padding: 18px;
  border: 1px solid var(--careers-line);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.035);
}

.careers-story img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: contain;
  border-radius: 4px;
  background: #f3f6ff;
}

.careers-story p {
  color: var(--careers-green);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.careers-story h3 {
  margin-top: 14px;
  font-size: clamp(26px, 3.4vw, 48px);
  line-height: 1;
}

.careers-story span {
  display: block;
  max-width: 640px;
  margin-top: 18px;
  color: var(--careers-muted);
  font-size: 16px;
  line-height: 1.7;
}

.careers-hiring {
  border-top: 1px solid var(--careers-line);
}

.careers-hiring__steps {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.careers-step {
  display: flex;
  gap: 18px;
  min-height: 190px;
  padding: 24px;
  border: 1px solid var(--careers-line);
  border-radius: 6px;
  background: #0e121b;
}

.careers-step img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  flex: 0 0 auto;
}

.careers-step h3 {
  font-size: 25px;
}

.careers-step p {
  margin-top: 12px;
  color: var(--careers-muted);
  font-size: 15px;
  line-height: 1.6;
}

.careers-cta {
  padding: 112px 24px 126px;
  text-align: center;
}

.careers-cta .careers-section-label {
  justify-content: center;
}

.careers-cta h2 {
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
}

.careers-cta p {
  max-width: 640px;
  margin: 24px auto 34px;
  color: var(--careers-muted);
  font-size: 19px;
  line-height: 1.7;
}

@keyframes careers-marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .careers-marquee span {
    animation: none;
  }

  .careers-btn {
    transition: none;
  }
}

@media (max-width: 991px) {
  .careers-hero {
    padding-top: 128px;
  }

  .careers-hero__inner,
  .careers-stories__heading,
  .careers-hiring {
    grid-template-columns: 1fr;
  }

  .careers-collage {
    min-height: 470px;
  }

  .careers-pillars,
  .careers-hiring__steps {
    grid-template-columns: 1fr;
  }

  .careers-pillar {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--careers-line);
  }

  .careers-pillar:last-child {
    border-bottom: 0;
  }
}

@media (max-width: 680px) {
  .careers-hero {
    min-height: auto;
    padding: 116px 16px 0;
  }

  .careers-hero h1 {
    font-size: clamp(58px, 18vw, 86px);
  }

  .careers-actions,
  .careers-btn {
    width: 100%;
  }

  .careers-collage {
    min-height: 390px;
  }

  .careers-collage__panel--large {
    inset: 16px 0 120px;
  }

  .careers-collage__panel--small {
    width: 68%;
    height: 174px;
  }

  .careers-collage__metric {
    left: 0;
    bottom: 24px;
    width: 166px;
  }

  .careers-manifesto,
  .careers-stories,
  .careers-hiring,
  .careers-cta {
    padding-right: 16px;
    padding-left: 16px;
  }

  .careers-story {
    grid-template-columns: 1fr;
  }

  .careers-step {
    flex-direction: column;
  }
}
</style>
