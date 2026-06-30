<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CaseStudyWorkWithUs from "@/components/CaseStudyWorkWithUs.vue";

gsap.registerPlugin(ScrollTrigger);

const heroMockup = new URL("../../assets/img/project/c2/project-sc.png", import.meta.url).href;
const clientLogo = new URL("../../assets/img/project/c2/scit-logo.png", import.meta.url).href;
const mockup = new URL("../../assets/img/project/c2/mockup.png", import.meta.url).href;
const idCard = new URL("../../assets/img/project/c2/sc-id.png", import.meta.url).href;
const brochure = new URL("../../assets/img/project/c2/sc-broucher.png", import.meta.url).href;
const businessCard = new URL("../../assets/img/project/c2/sc-bc.png", import.meta.url).href;
const poster = new URL("../../assets/img/project/c2/sc-poster.png", import.meta.url).href;

const metrics = [
  { value: "4", label: "Core service lines unified" },
  { value: "6", label: "Brand touchpoints delivered" },
  { value: "GA4 + GMB", label: "Tracking & local visibility live" },
  { value: "DevOps", label: "Deployment framework established" },
  { value: "100%", label: "Responsive across devices" },
  { value: "Live", label: "In production at launch" },
];

const timeline = [
  { week: "01", phase: "Discovery & Brand Vision", desc: "Sessions to identify core service lines — web, mobile, game, and HRM solutions — and align on the brand vision before any design began." },
  { week: "02", phase: "Logo & Brand System", desc: "A modern logo and cohesive branding system designed to read as innovative and trustworthy, not generic IT-firm boilerplate." },
  { week: "03", phase: "Website UI/UX", desc: "A clean, responsive layout that presents complex service offerings with clarity, instead of burying them in dense text." },
  { week: "04", phase: "Collateral & Identity Rollout", desc: "Business cards, ID cards, brochures, and posters designed on the same system, so every touchpoint feels consistent." },
  { week: "05", phase: "Analytics & GMB Setup", desc: "Google Analytics integrated for visitor behaviour tracking, with the GMB profile optimised for local search visibility." },
  { week: "06", phase: "DevOps Framework", desc: "A deployment framework established to streamline releases, support continuous integration, and keep the site scalable." },
];

const challenges = [
  { num: "01", icon: "category", title: "Multiple service lines, no clear story", desc: "Web, mobile, game, and HRM solutions all lived under one brand without a clear way to present them as a coherent offering." },
  { num: "02", icon: "visibility_off", title: "No digital footprint", desc: "No website, no analytics, and no Google Business presence meant the consultancy was effectively invisible to local search." },
  { num: "03", icon: "style", title: "No visual identity", desc: "No logo, no brand system, no consistent collateral — every touchpoint looked like it came from a different company." },
  { num: "04", icon: "groups", title: "Competing in a crowded market", desc: "IT consultancies are everywhere. Standing out required more than a generic 'we do tech' positioning." },
  { num: "05", icon: "build_circle", title: "No deployment discipline", desc: "Without a defined DevOps framework, shipping updates was slower and riskier than it needed to be." },
  { num: "06", icon: "speed", title: "Credibility under time pressure", desc: "The business needed to look established quickly, while still being early-stage in its digital maturity." },
];

const outcomes = [
  { icon: "verified", title: "A credible, modern presence", desc: "The new identity and site position Solved Cube as a forward-looking IT provider, not a startup finding its feet." },
  { icon: "category", title: "Services presented clearly", desc: "Web, mobile, game, and HRM offerings are now structured so visitors immediately understand what's on offer." },
  { icon: "monitoring", title: "Data-driven decisions", desc: "GA4 gives the team visibility into visitor behaviour, top pages, and traffic sources — replacing guesswork." },
  { icon: "location_on", title: "Stronger local visibility", desc: "An optimised GMB profile improves discoverability for local and regional searches." },
  { icon: "deployed_code", title: "Faster, safer deployments", desc: "The DevOps framework supports continuous integration, so updates ship with less risk." },
  { icon: "forum", title: "A brand system built to extend", desc: "Every collateral piece — cards, brochures, posters — shares one system, so future materials stay consistent.", highlight: true },
];

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .from(".cs-hero-eyebrow", { y: 18, autoAlpha: 0, duration: 0.6 })
      .from(".cs-hero-title .cs-line", { y: 36, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, "-=0.35")
      .from(".cs-hero-sub", { y: 18, autoAlpha: 0, duration: 0.55 }, "-=0.45")
      .from(".cs-hero-stat", { y: 14, autoAlpha: 0, stagger: 0.06, duration: 0.45 }, "-=0.3")
      .from(".cs-hero-ctas", { y: 14, autoAlpha: 0, duration: 0.5 }, "-=0.25")
      .from(".cs-hero-mockup-wrap", { y: 50, autoAlpha: 0, scale: 0.97, duration: 1 }, "-=0.4");

    gsap.utils.toArray(".cs-reveal").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
        y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out",
      });
    });

    gsap.utils.toArray(".cs-stagger").forEach((grid) => {
      gsap.from(grid.children, {
        scrollTrigger: { trigger: grid, start: "top 84%", once: true },
        y: 26, autoAlpha: 0, stagger: 0.07, duration: 0.55, ease: "power2.out",
      });
    });

    gsap.from(".cs-metric-num", {
      scrollTrigger: { trigger: ".cs-metrics-strip", start: "top 80%", once: true },
      y: 24, autoAlpha: 0, stagger: 0.06, duration: 0.6, ease: "power3.out",
    });

    gsap.from(".timeline-row", {
      scrollTrigger: { trigger: ".cs-timeline", start: "top 84%", once: true },
      x: -24, autoAlpha: 0, stagger: 0.09, duration: 0.55, ease: "power2.out",
    });
  });
});

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <!-- ── HERO ───────────────────────────────────────────────────── -->
  <section class="cs-hero">
    <div class="cs-hero-noise" aria-hidden="true"></div>
    <div class="cs-hero-glow cs-hero-glow--1" aria-hidden="true"></div>
    <div class="cs-hero-glow cs-hero-glow--2" aria-hidden="true"></div>

    <div class="cs-shell">
      <nav class="cs-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/case-studies">Portfolio</a>
        <span>/</span>
        <span class="active">Solved Cube</span>
      </nav>

      <div class="cs-hero-eyebrow">
        <span class="eyebrow-pill">2024</span>
        Brand Identity &amp; Web Strategy
      </div>

      <h1 class="cs-hero-title">
        <span class="cs-line">Solved Cube</span>
        <span class="cs-line cs-line-sub">IT Solutions</span>
      </h1>

      <div class="cs-hero-split">
        <p class="cs-hero-sub">
          A Bangalore-based IT consultancy offering web, mobile, game, and HRM solutions. We
          built the complete brand identity, professional website, and digital presence needed
          to compete credibly in a crowded IT services market.
        </p>

        <div class="cs-hero-stats">
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">4</span>
            <span class="cs-hero-stat-label">Service lines</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">6</span>
            <span class="cs-hero-stat-label">Brand touchpoints</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">Live</span>
            <span class="cs-hero-stat-label">In production</span>
          </div>
        </div>
      </div>

      <div class="cs-hero-ctas">
        <a href="https://solvedcubeitsolutions.com" target="_blank" rel="noopener" class="cs-btn-primary">
          Visit Live Site
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
        <a href="/case-studies" class="cs-btn-ghost">All Case Studies</a>
      </div>

      <!-- Mockup -->
      <div class="cs-hero-mockup-wrap">
        <div class="cs-hero-mockup">
          <img :src="heroMockup" alt="Solved Cube IT Solutions website on desktop" loading="lazy" />
        </div>
        <div class="cs-hero-mockup-float">
          <span class="float-dot"></span>
          Live &amp; Serving Clients
        </div>
        <div class="cs-hero-mockup-tags">
          <span>Logo Design</span>
          <span>Branding</span>
          <span>UI/UX Design</span>
          <span>Web Development</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── META STRIP ─────────────────────────────────────────────── -->
  <section class="cs-meta-strip">
    <div class="cs-shell cs-meta-grid">
      <div class="cs-meta-item">
        <span class="cs-meta-label">Client</span>
        <span class="cs-meta-value">Solved Cube IT Solutions Pvt Ltd</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Industry</span>
        <span class="cs-meta-value">IT Solutions &amp; Software Development</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Engagement</span>
        <span class="cs-meta-value">Brand &middot; Web &middot; Analytics &middot; GMB</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Live Site</span>
        <span class="cs-meta-value">
          <a href="https://solvedcubeitsolutions.com" target="_blank" rel="noopener" class="cs-meta-link">solvedcubeitsolutions.com</a>
        </span>
      </div>
    </div>
  </section>

  <!-- ── CLIENT ────────────────────────────────────────────────── -->
  <section class="cs-section">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">01</span>
        <div>
          <div class="cs-eyebrow">Client</div>
          <h2 class="cs-h2">Who is Solved Cube?</h2>
        </div>
      </div>

      <div class="cs-client-grid cs-reveal">
        <div class="cs-client-copy">
          <p class="cs-lead-text">
            Solved Cube IT Solutions Private Limited is a Bangalore-based IT company offering
            web, mobile, game, and HRM development services. Despite a real and varied service
            offering, the business had no website, no brand identity, and no digital presence
            to back it up.
          </p>
          <p>
            Amortree was brought in to build the complete picture — a logo and brand system,
            a professional website, marketing collateral, and the analytics infrastructure to
            measure what was actually working.
          </p>

          <div class="cs-fact-list">
            <div class="cs-fact">
              <span class="material-symbols-outlined">terminal</span>
              <div><strong>Sector</strong><span>IT Solutions &amp; Software Development</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">group</span>
              <div><strong>Audience</strong><span>Businesses needing IT &amp; HRM services</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">location_on</span>
              <div><strong>Location</strong><span>Bengaluru, India</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">language</span>
              <div><strong>Website</strong><a href="https://solvedcubeitsolutions.com" target="_blank" rel="noopener">solvedcubeitsolutions.com</a></div>
            </div>
          </div>
        </div>

        <aside class="cs-client-card">
          <img :src="clientLogo" alt="Solved Cube IT Solutions logo" class="cs-client-logo" loading="lazy" />
          <span class="cs-quote-mark material-symbols-outlined">format_quote</span>
          <p class="cs-client-quote">
            We had the expertise across web, mobile, and HRM — we just didn't have a brand
            that made any of that obvious to a new client.
          </p>
          <div class="cs-client-quote-attr">Project Brief, Solved Cube</div>
        </aside>
      </div>
    </div>
  </section>

  <!-- ── CHALLENGE ─────────────────────────────────────────────── -->
  <section class="cs-section cs-section--dark">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num cs-ghost-num--accent">02</span>
        <div>
          <div class="cs-eyebrow cs-eyebrow--accent">Challenge</div>
          <h2 class="cs-h2 cs-h2--light">Real services, invisible business</h2>
        </div>
      </div>

      <div class="cs-challenge-list cs-stagger">
        <div class="cs-challenge-row" v-for="c in challenges" :key="c.num">
          <span class="cs-challenge-num">{{ c.num }}</span>
          <span class="material-symbols-outlined cs-challenge-icon">{{ c.icon }}</span>
          <div class="cs-challenge-body">
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── STRATEGY ───────────────────────────────────────────────── -->
  <section class="cs-section">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">03</span>
        <div>
          <div class="cs-eyebrow">Strategy</div>
          <h2 class="cs-h2">One system, every touchpoint</h2>
        </div>
      </div>

      <div class="cs-strategy-grid">
        <div class="cs-strategy-copy cs-reveal">
          <p class="cs-lead-text">
            For a consultancy spanning four distinct service lines, the goal wasn't to design
            four separate stories — it was to build one consistent system flexible enough to
            present all of them clearly.
          </p>

          <div class="cs-pillar" v-for="(p, i) in [
            { t: 'Modern, trust-signalling identity', d: 'A logo and brand system designed to read as innovative and established — the visual baseline every other touchpoint builds on.' },
            { t: 'Service-led website structure', d: 'Web, mobile, game, and HRM solutions each given clear, scannable space, instead of being flattened into one generic services page.' },
            { t: 'Consistent collateral, not one-offs', d: 'Business cards, ID cards, brochures, and posters were all designed on the same system, so every physical and digital touchpoint matches.' },
          ]" :key="p.t">
            <div class="cs-pillar-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div>
              <h4>{{ p.t }}</h4>
              <p>{{ p.d }}</p>
            </div>
          </div>
        </div>

        <div class="cs-insight cs-reveal">
          <span class="material-symbols-outlined cs-insight-icon">lightbulb</span>
          <h4>The insight that shaped everything</h4>
          <p>
            A consultancy with four service lines doesn't need four brands — it needs one
            brand confident enough to hold all four without diluting any of them.
          </p>
          <div class="cs-insight-divider"></div>
          <p class="cs-insight-action">
            So we built a single, flexible system and applied it everywhere — website, cards,
            brochures — rather than treating each touchpoint as a separate design project.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── PROCESS ────────────────────────────────────────────────── -->
  <section class="cs-section cs-section--muted">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">04</span>
        <div>
          <div class="cs-eyebrow">Process</div>
          <h2 class="cs-h2">From discovery to a deployed presence</h2>
        </div>
      </div>

      <div class="cs-timeline">
        <div v-for="(item, i) in timeline" :key="item.week" class="timeline-row">
          <div class="timeline-week">{{ item.week }}</div>
          <div class="timeline-rail">
            <div class="timeline-dot"></div>
            <div class="timeline-line" v-if="i < timeline.length - 1"></div>
          </div>
          <div class="timeline-body">
            <h4>{{ item.phase }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── BRAND SYSTEM GALLERY ──────────────────────────────────── -->
  <section class="cs-section">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">05</span>
        <div>
          <div class="cs-eyebrow">Design System</div>
          <h2 class="cs-h2">One identity, every touchpoint</h2>
          <p class="cs-section-sub">From the website mockup to physical collateral — every piece built on the same visual system.</p>
        </div>
      </div>

      <div class="cs-gallery-card cs-reveal">
        <span class="cs-gallery-label">Website Mockup</span>
        <img :src="mockup" alt="Solved Cube website mockup" loading="lazy" />
      </div>

      <div class="cs-gallery-grid cs-stagger">
        <div class="cs-gallery-card cs-gallery-card--half">
          <span class="cs-gallery-label">ID Card</span>
          <img :src="idCard" alt="Solved Cube ID card design" loading="lazy" />
        </div>
        <div class="cs-gallery-card cs-gallery-card--half">
          <span class="cs-gallery-label">Brochure</span>
          <img :src="brochure" alt="Solved Cube brochure design" loading="lazy" />
        </div>
        <div class="cs-gallery-card cs-gallery-card--half">
          <span class="cs-gallery-label">Business Card</span>
          <img :src="businessCard" alt="Solved Cube business card design" loading="lazy" />
        </div>
        <div class="cs-gallery-card cs-gallery-card--half">
          <span class="cs-gallery-label">Poster</span>
          <img :src="poster" alt="Solved Cube poster design" loading="lazy" />
        </div>
      </div>
    </div>
  </section>

  <!-- ── METRICS ────────────────────────────────────────────────── -->
  <section class="cs-metrics-strip">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num cs-ghost-num--accent">06</span>
        <div>
          <div class="cs-eyebrow cs-eyebrow--accent">Snapshot</div>
          <h2 class="cs-h2 cs-h2--light">What the rebuild delivers</h2>
          <p class="cs-section-sub cs-section-sub--light">The structural and brand wins from building Solved Cube's digital presence.</p>
        </div>
      </div>

      <div class="cs-metrics-grid">
        <div v-for="m in metrics" :key="m.label" class="cs-metric">
          <div class="cs-metric-num">{{ m.value }}</div>
          <div class="cs-metric-label">{{ m.label }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── OUTCOMES ───────────────────────────────────────────────── -->
  <section class="cs-section cs-section--muted">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">07</span>
        <div>
          <div class="cs-eyebrow">Result</div>
          <h2 class="cs-h2">What this built for Solved Cube</h2>
        </div>
      </div>

      <div class="cs-outcome-grid cs-stagger">
        <div
          v-for="o in outcomes"
          :key="o.title"
          class="cs-outcome"
          :class="{ 'cs-outcome--highlight': o.highlight }"
        >
          <span class="material-symbols-outlined">{{ o.icon }}</span>
          <h4>{{ o.title }}</h4>
          <p>{{ o.desc }}</p>
        </div>
      </div>

      <div class="cs-nav-row cs-reveal">
        <a href="/project/uae-links" class="cs-nav-link">
          <span class="material-symbols-outlined">arrow_back</span> UAE Links
        </a>
        <a href="https://solvedcubeitsolutions.com" target="_blank" rel="noopener" class="cs-btn-primary">View Live Site</a>
        <a href="/project/microrelic" class="cs-nav-link cs-nav-link--right">
          Microrelic <span class="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </div>
  </section>

  <CaseStudyWorkWithUs
    project="Solved Cube IT Solutions"
    industry="HR and IT consultancy"
    accent="#0ea5e9"
    result="A professional brand and website presence that makes the consultancy easier to understand, trust, and contact."
    :services="['Brand Identity', 'Website Design', 'Marketing Collateral', 'Responsive Build']"
    :proof="['Clear consultancy positioning', 'Service-led navigation', 'Complete brand touchpoints']"
  />
</template>

<style lang="scss" scoped>
.cs-hero, .cs-section, .cs-metrics-strip, .cs-meta-strip {
  --accent: #0ea5e9;
  --accent-deep: #0284c7;
  --gold: #facc15;
  --midnight: #082030;
  --frost: #f3f9fc;
}

// ─── Shell ──────────────────────────────────────────────────────────
.cs-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) { padding: 0 1.25rem; }
}

// ─── Hero ───────────────────────────────────────────────────────────
.cs-hero {
  position: relative;
  background: #0a0e14;
  overflow: hidden;
  padding: clamp(7rem, 13vh, 10rem) 0 0;
}

.cs-hero-noise {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 3px 3px;
  pointer-events: none;
}

.cs-hero-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);

  &--1 {
    top: -180px; right: -120px;
    width: 560px; height: 560px;
    background: radial-gradient(circle, rgba(14,165,233,0.24), transparent 70%);
  }
  &--2 {
    bottom: -200px; left: -160px;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(250,204,21,0.08), transparent 70%);
  }
}

.cs-breadcrumb {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 2.5rem;

  a { color: rgba(255,255,255,0.5); text-decoration: none; &:hover { color: var(--accent); } }
  .active { color: var(--accent); }
}

.cs-hero-eyebrow {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255,255,255,0.65);
  margin-bottom: 1.5rem;
}

.eyebrow-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(14,165,233,0.16);
  border: 1px solid rgba(14,165,233,0.4);
  color: #5ec8f5;
  font-size: 0.72rem;
  font-weight: 800;
}

.cs-hero-title {
  position: relative;
  z-index: 2;
  display: block;
  font-size: clamp(2.6rem, 7vw, 5.5rem);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 2.5rem;
  max-width: 920px;
}

.cs-line { display: block; }
.cs-line-sub { color: var(--accent); }

.cs-hero-split {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: end;
  padding-bottom: 2.5rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.cs-hero-sub {
  color: rgba(255,255,255,0.62);
  font-size: 1.05rem;
  line-height: 1.8;
  max-width: 620px;
  margin: 0;
}

.cs-hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;

  @media (max-width: 860px) { gap: 1.25rem; }
}

.cs-hero-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cs-hero-stat-val {
  font-size: 1.7rem;
  font-weight: 800;
  color: #5ec8f5;
  line-height: 1;
}

.cs-hero-stat-label {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 0.4rem;
}

.cs-hero-stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.12);
}

.cs-hero-ctas {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
}

.cs-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-weight: 800;
  font-size: 0.88rem;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(14,165,233,0.32);
    color: #fff;
  }
}

.cs-btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.18);
  color: #fff;
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  transition: border-color 0.25s ease, background 0.25s ease;

  &:hover {
    border-color: rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.05);
    color: #fff;
  }
}

// ─── Hero mockup ───────────────────────────────────────────────────
.cs-hero-mockup-wrap {
  position: relative;
  z-index: 2;
}

.cs-hero-mockup {
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  border: 1px solid rgba(14,165,233,0.3);
  border-bottom: none;
  box-shadow: 0 -20px 100px rgba(14,165,233,0.1), 0 40px 120px rgba(0,0,0,0.6);

  img { width: 100%; display: block; }
}

.cs-hero-mockup-float {
  position: absolute;
  top: 1.5rem;
  right: calc(2rem + 1.5rem);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0,0,0,0.7);
  border: 1px solid rgba(14,165,233,0.45);
  backdrop-filter: blur(12px);
  border-radius: 999px;
  padding: 0.5rem 1rem;
  color: rgba(255,255,255,0.9);
  font-size: 0.78rem;
  font-weight: 600;

  @media (max-width: 768px) { display: none; }
}

.float-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
  animation: pulse-dot 1.5s ease infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.cs-hero-mockup-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1.5rem 0;

  span {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.03);
    color: rgba(255,255,255,0.85);
    font-size: 0.76rem;
    font-weight: 700;
  }
}

// ─── Meta strip ─────────────────────────────────────────────────────
.cs-meta-strip {
  background: #070a0e;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 2rem 0;
}

.cs-meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
}

.cs-meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.cs-meta-label {
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}

.cs-meta-value {
  font-size: 0.92rem;
  font-weight: 600;
  color: rgba(255,255,255,0.88);
}

.cs-meta-link {
  color: #5ec8f5;
  text-decoration: none;
  &:hover { text-decoration: underline; }
}

// ─── Section shells ──────────────────────────────────────────────────
.cs-section {
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: #fff;

  &--dark { background: #070a0e; }
  &--muted { background: var(--frost); }
}

.cs-section-head {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
}

.cs-ghost-num {
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 900;
  line-height: 0.8;
  color: rgba(15,23,42,0.06);
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;

  &--accent { color: rgba(255,255,255,0.05); }
}

.cs-eyebrow {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-deep);
  margin-bottom: 0.6rem;

  &--accent { color: #5ec8f5; }
}

.cs-h2 {
  font-size: clamp(1.7rem, 3.2vw, 2.5rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.15;
  margin: 0;

  &--light { color: #fff; }
}

.cs-section-sub {
  margin-top: 0.75rem;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.7;

  &--light { color: rgba(255,255,255,0.55); }
}

.cs-lead-text {
  font-size: 1.08rem;
  color: #334155;
  line-height: 1.85;
  margin-bottom: 1.25rem;
}

// ─── Client ──────────────────────────────────────────────────────────
.cs-client-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 3.5rem;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
}

.cs-client-copy p {
  color: #475569;
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 1.1rem;
}

.cs-fact-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
  margin-top: 2rem;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.cs-fact {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 12px;
  background: var(--frost);

  .material-symbols-outlined { font-size: 1.2rem; color: var(--accent-deep); }
  strong { display: block; font-size: 0.66rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent-deep); margin-bottom: 0.15rem; }
  span, a { font-size: 0.86rem; color: #334155; text-decoration: none; }
  a:hover { color: var(--accent); }
}

.cs-client-card {
  position: relative;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  background: #070a0e;
  text-align: left;
}

.cs-client-logo { height: 44px; margin-bottom: 1.75rem; }

.cs-quote-mark {
  font-size: 2.2rem;
  color: var(--accent);
  opacity: 0.6;
  display: block;
  margin-bottom: 0.5rem;
}

.cs-client-quote {
  font-size: 0.95rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.82);
  margin-bottom: 1rem;
}

.cs-client-quote-attr {
  font-size: 0.76rem;
  color: #5ec8f5;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

// ─── Challenges ───────────────────────────────────────────────────────
.cs-challenge-list {
  display: flex;
  flex-direction: column;
}

.cs-challenge-row {
  display: grid;
  grid-template-columns: 50px 50px 1fr;
  gap: 1.25rem;
  align-items: flex-start;
  padding: 1.75rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.07);

  &:last-child { border-bottom: none; }

  @media (max-width: 600px) {
    grid-template-columns: 36px 36px 1fr;
    gap: 0.85rem;
  }
}

.cs-challenge-num {
  font-size: 0.78rem;
  font-weight: 800;
  color: rgba(255,255,255,0.25);
  padding-top: 0.2rem;
  font-variant-numeric: tabular-nums;
}

.cs-challenge-icon {
  font-size: 1.5rem;
  color: #5ec8f5;
}

.cs-challenge-body {
  h3 { color: #fff; font-size: 1.05rem; font-weight: 700; margin: 0 0 0.4rem; }
  p { color: rgba(255,255,255,0.55); font-size: 0.9rem; line-height: 1.7; margin: 0; max-width: 640px; }
}

// ─── Strategy ────────────────────────────────────────────────────────
.cs-strategy-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 3.5rem;
  align-items: start;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
}

.cs-pillar {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.75rem;

  h4 { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 0.35rem; }
  p { font-size: 0.9rem; color: #64748b; line-height: 1.75; margin: 0; }
}

.cs-pillar-num {
  flex-shrink: 0;
  width: 38px; height: 38px;
  border-radius: 10px;
  background: rgba(14,165,233,0.1);
  border: 1px solid rgba(14,165,233,0.25);
  color: var(--accent-deep);
  font-weight: 800;
  font-size: 0.78rem;
  display: flex; align-items: center; justify-content: center;
}

.cs-insight {
  padding: 2.25rem 2rem;
  border-radius: 18px;
  background: linear-gradient(160deg, #070a0e, #0c2434);
  position: sticky;
  top: 2rem;

  h4 { font-size: 1rem; font-weight: 800; color: #fff; margin: 0.85rem 0 0.75rem; }
  p { font-size: 0.9rem; color: rgba(255,255,255,0.62); line-height: 1.75; margin: 0; }
}

.cs-insight-icon { font-size: 1.7rem; color: var(--gold); }
.cs-insight-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 1.25rem 0; }
.cs-insight-action { color: rgba(255,255,255,0.85) !important; font-weight: 500 !important; }

// ─── Timeline ────────────────────────────────────────────────────────
.cs-timeline { display: flex; flex-direction: column; }

.timeline-row {
  display: grid;
  grid-template-columns: 56px 36px 1fr;
  gap: 0 1.25rem;
}

.timeline-week {
  font-size: 0.95rem;
  font-weight: 900;
  color: rgba(15,23,42,0.18);
  padding-top: 0.1rem;
}

.timeline-rail { display: flex; flex-direction: column; align-items: center; }

.timeline-dot {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid var(--frost);
  box-shadow: 0 0 0 2px var(--accent);
  margin-top: 0.3rem;
  flex-shrink: 0;
}

.timeline-line {
  flex: 1;
  width: 2px;
  min-height: 44px;
  background: linear-gradient(180deg, var(--accent), rgba(14,165,233,0.15));
  margin-top: 0.25rem;
}

.timeline-body {
  padding-bottom: 2.25rem;
  h4 { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 0.4rem; }
  p { font-size: 0.9rem; color: #64748b; line-height: 1.75; margin: 0; }
}

// ─── Gallery ─────────────────────────────────────────────────────────
.cs-gallery-card {
  margin-bottom: 2.5rem;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(15,23,42,0.07);
  background: #fff;

  &:last-child { margin-bottom: 0; }

  img { width: 100%; display: block; }
}

.cs-gallery-label {
  display: block;
  padding: 1rem 1.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-deep);
  background: var(--frost);
  border-bottom: 1px solid rgba(15,23,42,0.06);
}

.cs-gallery-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 700px) { grid-template-columns: 1fr; }
}

.cs-gallery-card--half { margin-bottom: 0; }

// ─── Metrics strip ─────────────────────────────────────────────────────
.cs-metrics-strip {
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: #050a10;
}

.cs-metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 860px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
}

.cs-metric {
  padding: 2.5rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  border-right: 1px solid rgba(255,255,255,0.08);

  &:nth-child(3n) { border-right: none; }
  @media (max-width: 860px) {
    &:nth-child(2n) { border-right: none; }
    &:nth-child(3n) { border-right: 1px solid rgba(255,255,255,0.08); }
    &:nth-child(2n):not(:nth-child(3n)) { border-right: none; }
  }
}

.cs-metric-num {
  font-size: clamp(1.5rem, 3.4vw, 2.4rem);
  font-weight: 900;
  color: var(--gold);
  line-height: 1;
  margin-bottom: 0.6rem;
  font-variant-numeric: tabular-nums;
}

.cs-metric-label {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.5;
}

// ─── Outcomes ────────────────────────────────────────────────────────
.cs-outcome-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 4rem;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.cs-outcome {
  padding: 1.75rem 1.5rem;
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(15,23,42,0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover { transform: translateY(-4px); box-shadow: 0 18px 48px rgba(15,23,42,0.08); }
  &--highlight {
    background: linear-gradient(160deg, #070a0e, #0c2434);
    border-color: transparent;
    h4, p { color: #fff !important; }
    .material-symbols-outlined { color: var(--gold); }
  }

  .material-symbols-outlined { font-size: 1.5rem; color: var(--accent-deep); }
  h4 { font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0.85rem 0 0.5rem; }
  p { font-size: 0.85rem; color: #64748b; line-height: 1.65; margin: 0; }
}

.cs-outcome--highlight p { opacity: 0.7; }

// ─── Nav row ─────────────────────────────────────────────────────────
.cs-nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(15,23,42,0.08);

  @media (max-width: 600px) { flex-direction: column; }
}

.cs-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #475569;
  text-decoration: none;
  transition: color 0.25s ease;

  &:hover { color: #0f172a; }
  &--right { flex-direction: row-reverse; }

  .material-symbols-outlined { font-size: 1.1rem; }
}
</style>