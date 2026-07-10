<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dineshImg from "../assets/img/team/dinesh.webp";
import sufiImg from "../assets/img/team/sufi.png";
import gouthamImg from "../assets/img/team/goutham.png";
import srilathaImg from "../assets/img/team/srilatha.png";
import lavanyaImg from "../assets/img/team/lavanya.png";

gsap.registerPlugin(ScrollTrigger);

const aboutPage = ref(null);

const team = [
  {
    name: "Dinesh",
    role: "UI/UX Strategist · Front-end Innovator",
    img: dineshImg,
    url: "https://dinesh.amortree.com/",
  },
  {
    name: "Sufiyan",
    role: "Full-Stack Developer · Frontend Specialist",
    img: sufiImg,
    url: "https://sufiyan.amortree.com/",
  },
  {
    name: "Goutham",
    role: "Business Analyst · Data Strategist",
    img: gouthamImg,
    url: "https://goutham.amortree.com/",
  },
  {
    name: "Srilatha",
    role: "Digital Marketing Strategist · Design-Driven Growth",
    img: srilathaImg,
    url: "https://srilatha.amortree.com/",
  },
  {
    name: "Lavanya",
    role: "Digital Marketing Strategist · Brand Consultant",
    img: lavanyaImg,
    url: "https://lavanya.amortree.com/",
  },
];

const values = [
  {
    icon: "bolt",
    num: "01",
    title: "Innovation",
    desc: "We embrace creativity and continuous improvement, always seeking new ways to solve challenges with cutting-edge solutions that drive progress.",
  },
  {
    icon: "verified",
    num: "02",
    title: "Integrity",
    desc: "Honesty and transparency are at the core of everything we do. We uphold the highest ethical standards, building trust through every interaction.",
  },
  {
    icon: "handshake",
    num: "03",
    title: "Collaboration",
    desc: "We believe in the power of teamwork. By working closely with clients and partners, we co-create solutions that deliver maximum impact.",
  },
  {
    icon: "workspace_premium",
    num: "04",
    title: "Excellence",
    desc: "We are committed to delivering exceptional quality in every project, ensuring our work meets the highest standards and exceeds expectations.",
  },
  {
    icon: "favorite",
    num: "05",
    title: "Customer-Centric",
    desc: "Our clients are at the heart of our work. We tailor every solution to their specific needs, fostering lasting relationships and satisfaction.",
  },
];

const process = [
  {
    icon: "travel_explore",
    step: "01",
    label: "Step One",
    title: "Insight Ignition",
    desc: "We begin with in-depth research to unveil market trends, understand your audience, and analyze competitors — laying the groundwork for informed decisions.",
    week: "Week 1",
  },
  {
    icon: "palette",
    step: "02",
    label: "Step Two",
    title: "Identity Alchemy",
    desc: "Insights become a compelling brand identity — logos, color palettes, and typography — forging a cohesive, memorable presence.",
    week: "Week 2",
  },
  {
    icon: "design_services",
    step: "03",
    label: "Step Three",
    title: "Experience Crafting",
    desc: "With identity in place, we design user-centric interfaces. Wireframes and prototypes ensure the UI/UX reflects your brand while staying seamless to use.",
    week: "Week 3–4",
  },
  {
    icon: "code",
    step: "04",
    label: "Step Four",
    title: "Digital Fabrication",
    desc: "Designs turn into reality through development. We build responsive, high-performing sites using modern technology and industry best practices.",
    week: "Week 5–7",
  },
  {
    icon: "autorenew",
    step: "05",
    label: "Step Five",
    title: "Continuous Evolution",
    desc: "We integrate DevOps practices and CI/CD pipelines to streamline updates, monitor performance, and adapt to feedback long after launch.",
    week: "Ongoing",
  },
];

let gsapContext;

function animateCounters() {
  gsap.utils.toArray(".att-stat-number").forEach((el) => {
    const target = Number(el.dataset.target || 0);
    const counter = { val: 0 };
    gsap.to(counter, {
      val: target,
      duration: 1.8,
      ease: "power2.out",
      snap: { val: 1 },
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => {
        el.textContent = Math.floor(counter.val);
      },
    });
  });
}

function addHoverLift(selector, distance = -6) {
  gsap.utils.toArray(selector).forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { y: distance, duration: 0.3, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { y: 0, duration: 0.35, ease: "power2.out" });
    });
  });
}

onMounted(() => {
  gsapContext = gsap.context(() => {
    // Story section
    gsap.from(".att-story-eyebrow, .att-story-heading, .att-story-copy", {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".att-story-section", start: "top 78%", once: true },
    });
    gsap.from(".att-story-media", {
      x: -40,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: ".att-story-section", start: "top 78%", once: true },
    });
    gsap.utils.toArray(".att-stat-card").forEach((card, i) => {
      gsap.from(card, {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".att-stats-grid", start: "top 85%", once: true },
      });
    });

    // Team section
    gsap.from(".att-team-eyebrow, .att-team-heading, .att-team-sub", {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".att-team-section", start: "top 78%", once: true },
    });
    gsap.utils.toArray(".att-team-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        delay: (i % 4) * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      });
    });

    // Values section
    gsap.from(".att-values-eyebrow, .att-values-heading, .att-values-sub", {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".att-values-section", start: "top 78%", once: true },
    });
    gsap.utils.toArray(".att-value-card").forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        delay: (i % 3) * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      });
    });

    // Process section
    gsap.from(".att-process-eyebrow, .att-process-heading, .att-process-sub", {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".att-about-process-section", start: "top 78%", once: true },
    });
    gsap.utils.toArray(".att-process-step").forEach((card, i) => {
      gsap.from(card, {
        y: 36,
        autoAlpha: 0,
        duration: 0.65,
        delay: (i % 3) * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      });
    });

    // CTA section
    gsap.from(".att-cta-inner", {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".att-about-cta-section", start: "top 82%", once: true },
    });

    addHoverLift(".att-value-card", -8);
    addHoverLift(".att-team-card", -8);
    addHoverLift(".att-process-step", -6);
    addHoverLift(".att-stat-card", -5);

    animateCounters();
    ScrollTrigger.refresh();
  }, aboutPage.value);
});

onBeforeUnmount(() => {
  gsapContext && gsapContext.revert();
});
</script>

<template>
  <main ref="aboutPage">
    <div class="breadcrum-area breadcrumb-banner">
      <div class="container">
        <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
          <ul class="list-unstyled">
            <li><a href="/">Home</a></li>
            <li class="active text-lr">About Us</li>
          </ul>
          <div class="section-heading heading-left">
            <h1 class="title h2 mb-4">
              More Than an Agency — <span class="text-lr">Your Growth Engineering Partner</span>
            </h1>
            <p>
              Amortree Tech is a Bengaluru-based digital growth agency built for founders and
              operators who need a website that performs, not just exists.
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
              src="../assets/img/amorboy/am-about.png"
              class="w-75 animate__animated slideInRight"
              style="animation-duration: 3s"
              alt="Amortree Tech illustration"
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
         STORY — Who We Are + Live Stats
         ============================================================ -->
    <section class="att-story-section">
      <div class="att-story-inner">
        <div class="att-story-media">
          <img src="../assets/img/amorboy/am-aboutatt.png" alt="Amortree Tech team at work" />
        </div>

        <div class="att-story-content">
          <div class="att-story-eyebrow att-section-label">Who We Are</div>
          <h2 class="att-story-heading">
            Built for Businesses That Refuse to <span class="text-lr">Blend In</span>
          </h2>
          <div class="att-story-copy">
            <p>
              At Amortree Tech, we specialize in <strong>custom web development</strong>,
              <strong>UI/UX design</strong>, and <strong>DevOps consulting</strong> to help
              businesses grow in the digital age — from responsive websites and mobile app design
              to branding and cloud infrastructure.
            </p>
            <p>
              Our team of expert developers and designers delivers customized IT solutions aligned
              with your unique goals — enhancing digital platforms, crafting seamless experiences,
              and building technology that scales with you.
            </p>
          </div>

          <div class="att-stats-grid">
            <div class="att-stat-card">
              <div class="att-stat-value">
                <span class="att-stat-number" data-target="10">0</span><span class="att-stat-suffix">+</span>
              </div>
              <span class="att-stat-label">Years of Experience</span>
            </div>
            <div class="att-stat-card">
              <div class="att-stat-value">
                <span class="att-stat-number" data-target="30">0</span><span class="att-stat-suffix">+</span>
              </div>
              <span class="att-stat-label">Businesses Empowered</span>
            </div>
            <div class="att-stat-card">
              <div class="att-stat-value">
                <span class="att-stat-number" data-target="10">0</span><span class="att-stat-suffix">+</span>
              </div>
              <span class="att-stat-label">Industries Served</span>
            </div>
            <div class="att-stat-card">
              <div class="att-stat-value">
                <span class="att-stat-number" data-target="98">0</span><span class="att-stat-suffix">%</span>
              </div>
              <span class="att-stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         LEADERSHIP TEAM — Premium 4-up profile grid
         ============================================================ -->
    <section class="att-team-section">
      <div class="att-team-inner">
        <div class="att-team-header">
          <div class="att-team-eyebrow att-section-label">Leadership Team</div>
          <h2 class="att-team-heading">
            The People Behind <span class="text-lr">Every Build</span>
          </h2>
          <p class="att-team-sub">
            A small, senior team — no account managers relaying messages, no juniors learning on
            your project. You work directly with the people doing the work.
          </p>
        </div>

        <div class="att-team-grid">
          <div v-for="(m, i) in team" :key="m.name" class="att-team-card">
            <div class="att-team-photo">
              <img :src="m.img" :alt="m.name" loading="lazy" />
              <!-- <span class="att-team-index">{{ String(i + 1).padStart(2, '0') }}</span> -->
            </div>
            <div class="att-team-body">
              <h3 class="att-team-name">{{ m.name }}</h3>
              <p class="att-team-role">{{ m.role }}</p>
              <a
                v-if="m.url"
                :href="m.url"
                target="_blank"
                rel="noopener"
                class="att-team-link"
              >
                View Profile
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
              <span v-else class="att-team-tag">Leadership Team</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         VALUES — Dark section, numbered grid
         ============================================================ -->
    <section class="att-values-section">
      <div class="att-values-inner">
        <div class="att-values-header">
          <div class="att-values-eyebrow att-section-label att-section-label--light">Our Values</div>
          <h2 class="att-values-heading">
            Why should you <span class="text-lr">work with us</span>?
          </h2>
          <p class="att-values-sub">
            With a passion for innovation and a dedication to excellence, Amortree Tech is
            committed to delivering high-quality solutions that drive your business forward.
          </p>
        </div>

        <div class="att-values-grid">
          <div v-for="v in values" :key="v.num" class="att-value-card">
            <div class="att-value-top">
              <div class="att-value-icon">
                <span class="material-symbols-outlined">{{ v.icon }}</span>
              </div>
              <span class="att-value-num">{{ v.num }}</span>
            </div>
            <h3 class="att-value-title">{{ v.title }}</h3>
            <p class="att-value-desc">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         PROCESS — Light section, 5-step grid
         ============================================================ -->
    <section class="att-about-process-section">
      <div class="att-process-inner">
        <div class="att-process-header">
          <div>
            <div class="att-process-eyebrow att-section-label">Structured Workflow</div>
            <h2 class="att-process-heading">Complete Brand Growth Process</h2>
          </div>
          <p class="att-process-sub">
            Our comprehensive brand development process combines research, branding, and design
            to create cohesive identities, engaging experiences, and continuous improvements.
          </p>
        </div>

        <div class="att-process-grid">
          <div v-for="p in process" :key="p.step" class="att-process-step" :data-step="p.step">
            <div class="att-ps-icon">
              <span class="material-symbols-outlined">{{ p.icon }}</span>
            </div>
            <span class="att-ps-label">{{ p.label }}</span>
            <h3 class="att-ps-title">{{ p.title }}</h3>
            <p class="att-ps-desc">{{ p.desc }}</p>
            <span class="att-ps-week">{{ p.week }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         CLOSING CTA
         ============================================================ -->
    <section class="att-about-cta-section">
      <div class="att-cta-inner">
        <div class="att-cta-eyebrow">
          <span class="text-ly">Ready to Build Something That Performs?</span>
        </div>
        <h2 class="att-cta-title">
          Let's Turn Your Website Into Your Best <span class="text-ly">Growth Asset</span>
        </h2>
        <p class="att-cta-sub">
          Tell us where your business is today — we'll show you the fastest path to a site that
          builds trust, generates leads, and drives growth.
        </p>
        <div class="d-flex justify-content-center flex-wrap gap-3 mt-5">
          <a
            class="amor-btn btn-fill-primary btn-large"
            href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call."
          >Book Your Free Strategy Call</a>
          <a href="/projects" class="amor-btn btn-borderd light">See Our Work</a>
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
    color: #db3c2d;
    &::before { background: #db3c2d; }
  }
}

// ─── Story Section ───────────────────────────────────────────────────────────
.att-story-section {
  padding: 7rem 4rem;
  background: #ffffff;

  @media (max-width: 1100px) { padding: 4.5rem 2rem; }
  @media (max-width: 768px)  { padding: 3.5rem 1.25rem; }
}

.att-story-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 4.5rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.att-story-media {
  border-radius: 24px;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 30px 60px -30px rgba(15, 23, 42, 0.25);

  img {
    width: 100%;
    display: block;
  }
}

.att-story-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  color: #0f172a;
  letter-spacing: -0.01em;
  margin-bottom: 1.5rem;
}

.att-story-copy {
  margin-bottom: 3rem;

  p {
    font-size: 0.98rem;
    line-height: 1.8;
    color: #475569;
    margin-bottom: 1.1rem;

    strong { color: #0f172a; font-weight: 600; }
  }
}

.att-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 640px) { grid-template-columns: repeat(2, 1fr); }
}

.att-stat-card {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.07);
  border-radius: 14px;
  padding: 1.5rem 1.1rem;
  text-align: left;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;

  &:hover {
    border-color: rgba(219, 60, 45, 0.45);
    box-shadow: 0 20px 40px -24px rgba(15, 23, 42, 0.2);
  }
}

.att-stat-value {
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
  font-family: var(--font-secondary, inherit);
  font-size: 2.1rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
  margin-bottom: 0.6rem;
  font-variant-numeric: tabular-nums;
}

.att-stat-suffix {
  font-size: 1.2rem;
  font-weight: 800;
  color: #db3c2d;
}

.att-stat-label {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: #64748b;
  font-weight: 600;
  line-height: 1.4;
}

// ─── Leadership Team Section ─────────────────────────────────────────────────
.att-team-section {
  padding: 7rem 4rem;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);

  @media (max-width: 1100px) { padding: 4.5rem 2rem; }
  @media (max-width: 768px)  { padding: 3.5rem 1.25rem; }
}

.att-team-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.att-team-header {
  max-width: 620px;
  margin-bottom: 3.5rem;
}

.att-team-heading {
  font-size: clamp(2.2rem, 4.2vw, 3.2rem);
  font-weight: 700;
  line-height: 1.15;
  color: #0f172a;
  letter-spacing: -0.01em;
  margin-bottom: 1.25rem;
}

.att-team-sub {
  font-size: 0.98rem;
  line-height: 1.8;
  color: #64748b;
}

.att-team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px)  { grid-template-columns: 1fr; max-width: 340px; margin: 0 auto; }
}

.att-team-card {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.07);
  border-radius: 20px;
  overflow: hidden;
  transition: border-color 0.35s ease, box-shadow 0.35s ease;
  will-change: transform;

  &:hover {
    border-color: rgba(219, 60, 45, 0.4);
    box-shadow: 0 24px 48px -24px rgba(15, 23, 42, 0.25);
  }
}

.att-team-photo {
  position: relative;
  aspect-ratio: 5 / 5;
  overflow: hidden;
  background: #e2e8f0;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: top center;
    filter: grayscale(1) contrast(1.02);
    transform: scale(1.02);
    transition: filter 0.55s ease, transform 0.65s ease;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(15, 23, 42, 0.55) 100%);
    pointer-events: none;
  }

  .att-team-card:hover & img {
    filter: grayscale(0) contrast(1);
    transform: scale(1.08);
  }
}

.att-team-index {
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  z-index: 1;
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #fff;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  font-variant-numeric: tabular-nums;
}

.att-team-body {
  padding: 1.4rem;
}

.att-team-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.005em;
  margin-bottom: 0.35rem;
}

.att-team-role {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.55;
  margin-bottom: 0;
  min-height: 2.4em;
}

.att-team-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #dc3c2d;
  text-decoration: none;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(15, 23, 42, 0.07);
  transition: gap 0.25s ease, color 0.25s ease;

  &:hover {
    gap: 0.65rem;
    color: #b42d20;
  }
}

.att-team-tag {
  display: flex;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(15, 23, 42, 0.07);
}

// ─── Values Section (dark) ───────────────────────────────────────────────────
.att-values-section {
  padding: 8rem 4rem;
  background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%);

  @media (max-width: 1100px) { padding: 5rem 2rem; }
  @media (max-width: 768px)  { padding: 4rem 1.25rem; }
}

.att-values-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.att-values-header {
  max-width: 620px;
  margin-bottom: 4.5rem;
}

.att-values-heading {
  font-size: clamp(2.2rem, 4.2vw, 3.2rem);
  font-weight: 700;
  line-height: 1.15;
  color: #ffffff;
  margin-bottom: 1.25rem;
}

.att-values-sub {
  font-size: 0.98rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
}

.att-values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px)  { grid-template-columns: 1fr; }
}

.att-value-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 2.25rem 2rem;
  transition: border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
  will-change: transform;

  &:hover {
    border-color: rgba(219, 60, 45, 0.4);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 24px 48px -20px rgba(0, 0, 0, 0.6);
  }
}

.att-value-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
}

.att-value-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(219, 60, 45, 0.1);
  border: 1px solid rgba(219, 60, 45, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #db3c2d;
  transition: background 0.35s ease, color 0.35s ease;

  .material-symbols-outlined { font-size: 1.4rem; }

  .att-value-card:hover & {
    background: #db3c2d;
    color: #0f172a;
  }
}

.att-value-num {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.25);
  font-variant-numeric: tabular-nums;
}

.att-value-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.7rem;
  letter-spacing: -0.01em;
}

.att-value-desc {
  font-size: 0.88rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.55);
}

// ─── Process Section (light grid) ────────────────────────────────────────────
.att-about-process-section {
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
  margin-bottom: 4.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
}

.att-process-heading {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 700;
  line-height: 1.1;
  color: #0f172a;
}

.att-process-sub {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.75;
}

.att-process-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 640px)  { grid-template-columns: 1fr; }
}

.att-process-step {
  background: #f8fafc;
  padding: 2.25rem 1.75rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: background 0.35s ease;
  will-change: transform;

  &:hover { background: #f1f5f9; }

  &::before {
    content: attr(data-step);
    position: absolute;
    top: -1rem;
    right: 1rem;
    font-size: 5.5rem;
    font-weight: 900;
    color: rgba(15, 23, 42, 0.045);
    line-height: 1;
    pointer-events: none;
    transition: color 0.35s ease;
    font-variant-numeric: tabular-nums;
  }

  &:hover::before { color: rgba(250, 204, 21, 0.09); }
}

.att-ps-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(219, 60, 45, 0.1);
  border: 1px solid rgba(219, 60, 45, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #92660a;

  .material-symbols-outlined { font-size: 1.15rem; }
}

.att-ps-label {
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #db3c2d;
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.att-ps-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.005em;
  margin-bottom: 0.6rem;
}

.att-ps-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.att-ps-week {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-top: auto;
}

// ─── Closing CTA ─────────────────────────────────────────────────────────────
.att-about-cta-section {
  padding: 7rem 4rem;
  text-align: center;
  background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%);

  @media (max-width: 1100px) { padding: 5rem 2rem; }
  @media (max-width: 768px)  { padding: 4rem 1.25rem; }
}

.att-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.att-cta-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.att-cta-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  margin-bottom: 1.25rem;
}

.att-cta-sub {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.75;
}
</style>