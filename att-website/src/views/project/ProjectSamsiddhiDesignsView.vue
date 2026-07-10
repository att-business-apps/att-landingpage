<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CaseStudyWorkWithUs from "@/components/CaseStudyWorkWithUs.vue";

gsap.registerPlugin(ScrollTrigger);

const heroMockup = new URL("../../assets/img/project/c9/project-sd.png", import.meta.url).href;
const clientLogo = new URL("../../assets/img/project/c9/icon-sd.svg", import.meta.url).href;
const mobileMockup = new URL("../../assets/img/project/c9/sd-mockup.png", import.meta.url).href;
const profileDesign = new URL("../../assets/img/project/c9/sd-logo-p.png", import.meta.url).href;
const brochureDesign = new URL("../../assets/img/project/c9/sd-profile.png", import.meta.url).href;
const collateralCollage = new URL("../../assets/img/project/c9/project-sd-mob.png", import.meta.url).href;

const palette = [
  { hex: "#009490", name: "Primary", use: "Core actions & CTAs" },
  { hex: "#e99050", name: "Secondary", use: "Warm highlights & accents" },
  { hex: "#005e5e", name: "Accent", use: "Headings & hover depth" },
  { hex: "#040316", name: "Text", use: "Body copy" },
  { hex: "#f5f5f7", name: "Light Gray", use: "Section backgrounds" },
  { hex: "#e0e0e0", name: "Medium Gray", use: "Borders & dividers" },
  { hex: "#757575", name: "Dark Gray", use: "Muted text" },
  { hex: "#fbfbfe", name: "Background", use: "Page background" },
  { hex: "#2e7d32", name: "Success", use: "Confirmations & proof points" },
  { hex: "#ed6c02", name: "Warning", use: "Attention states" },
  { hex: "#d32f2f", name: "Error", use: "Validation & alerts" },
];

const metrics = [
  { value: "1", label: "Unified brand identity built from scratch" },
  { value: "4", label: "Physical collateral pieces designed" },
  { value: "GMB", label: "Google Business Profile optimised" },
  { value: "GA", label: "Analytics tracking live" },
  { value: "100%", label: "Responsive website build" },
  { value: "Live", label: "In production at samsiddhidesigns.com" },
];

const timeline = [
  { week: "01", phase: "Logo & Identity Design", desc: "A unique logo mark designed to reflect creativity and elegance — the foundation every other asset would extend." },
  { week: "02", phase: "Branding Assets", desc: "Business cards, letterheads, a company signboard, and a detailed portfolio, all built to carry the identity consistently." },
  { week: "03", phase: "Website Development", desc: "A complete website designed and built around the new identity, presenting Interior Design, Decor, Furniture, and Raw Materials clearly." },
  { week: "04", phase: "GMB Setup & Local SEO", desc: "Google My Business set up and optimised to strengthen local discoverability for nearby clients." },
  { week: "05", phase: "Analytics Integration", desc: "Google Analytics wired into the live site, enabling performance tracking and data-driven decisions going forward." },
];

const challenges = [
  { num: "01", icon: "design_services", title: "No existing brand identity", desc: "Samsiddhi Designs needed a logo and visual identity built from scratch — one that felt as considered as the interiors they design." },
  { num: "02", icon: "inventory_2", title: "Four adjacent categories", desc: "Interior Design, Decor, Furniture, and Raw Materials all needed to sit under one coherent brand without confusing visitors." },
  { num: "03", icon: "print", title: "Assets across physical and digital", desc: "Business cards, letterheads, a signboard, and a company portfolio all had to carry the same identity as the website." },
  { num: "04", icon: "location_on", title: "Local discoverability", desc: "Without an optimised Google Business Profile, the company was hard to find for nearby clients searching for interior designers." },
  { num: "05", icon: "monitoring", title: "No visibility into visitor behaviour", desc: "There was no analytics in place, so the team had no way to know what was actually working on the site." },
];

const outcomes = [
  { icon: "verified", title: "A brand that feels considered", desc: "The logo and identity read as intentional and elegant — a fitting first impression for an interior design company." },
  { icon: "print", title: "Consistency across every touchpoint", desc: "Business cards, letterheads, signboard, and portfolio all carry the same visual language as the website." },
  { icon: "location_on", title: "Easier to find locally", desc: "An optimised Google Business Profile improved visibility for nearby clients searching for interior designers." },
  { icon: "monitoring", title: "Visibility into real behaviour", desc: "Google Analytics now gives the team actionable insight into how visitors actually use the site." },
  { icon: "devices", title: "A complete digital presence", desc: "From logo to live website, Samsiddhi now has a cohesive presence across physical and digital platforms." },
  { icon: "forum", title: "A stronger foundation for growth", desc: "The identity system gives Samsiddhi room to add new collateral and pages without diluting the brand.", highlight: true },
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

    gsap.from(".cs-challenge-row", {
      scrollTrigger: { trigger: ".cs-challenge-list", start: "top 84%", once: true },
      x: -20, autoAlpha: 0, stagger: 0.08, duration: 0.5, ease: "power2.out",
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
        <span>&#8226;</span>
        <a href="/projects">Projects</a>
        <span>&#8226;</span>
        <span class="active">Samsiddhi Designs</span>
      </nav>

      <div class="cs-hero-eyebrow">
        <span class="eyebrow-pill">Interior Design</span>
        Interior Design, Decor, Furniture
      </div>

      <h1 class="cs-hero-title">
        <span class="cs-line">Samsiddhi Designs</span>
      </h1>

      <div class="cs-hero-split">
        <p class="cs-hero-sub">
          Samsiddhi Designs needed a complete digital transformation — brand identity, website,
          and analytics — for a business spanning Interior Design, Decor, Furniture, and Raw
          Materials. Amortree built a cohesive identity from the ground up and carried it across
          every physical and digital touchpoint.
        </p>

        <div class="cs-hero-stats">
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">4</span>
            <span class="cs-hero-stat-label">Brand touchpoints</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">100%</span>
            <span class="cs-hero-stat-label">Responsive</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">Live</span>
            <span class="cs-hero-stat-label">In production</span>
          </div>
        </div>
      </div>

      <div class="cs-hero-ctas">
        <a href="https://samsiddhidesigns.com/" target="_blank" rel="noopener" class="cs-btn-primary">
          Visit Live Site
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
        <a href="/projects" class="cs-btn-ghost">All Projects</a>
      </div>

      <!-- Mockup -->
      <div class="cs-hero-mockup-wrap">
        <div class="cs-hero-mockup">
          <img :src="heroMockup" alt="Samsiddhi Designs website on desktop" loading="lazy" />
        </div>
        <div class="cs-hero-mockup-float">
          <span class="float-dot"></span>
          Live &amp; In Production
        </div>
        <div class="cs-hero-mockup-tags">
          <span>Brand Identity</span>
          <span>Website Development</span>
          <span>Branding Assets</span>
          <span>GMB Setup</span>
          <span>Google Analytics</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── META STRIP ─────────────────────────────────────────────── -->
  <section class="cs-meta-strip">
    <div class="cs-shell cs-meta-grid">
      <div class="cs-meta-item">
        <span class="cs-meta-label">Client</span>
        <span class="cs-meta-value">Samsiddhi Designs</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Industry</span>
        <span class="cs-meta-value">Interior Design &middot; Decor &middot; Furniture &middot; Raw Materials</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Engagement</span>
        <span class="cs-meta-value">Brand Identity &middot; Website &middot; GMB &middot; GA</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Live Site</span>
        <span class="cs-meta-value">
          <a href="https://samsiddhidesigns.com/" target="_blank" rel="noopener" class="cs-meta-link">samsiddhidesigns.com</a>
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
          <h2 class="cs-h2">Who is Samsiddhi Designs?</h2>
        </div>
      </div>

      <div class="cs-client-grid cs-reveal">
        <div class="cs-client-copy">
          <p class="cs-lead-text">
            Samsiddhi Designs works across Interior Design, Decor, Furniture, and Raw Materials —
            a business where visual taste is the product, which meant its own brand had to prove
            that taste before a single project photo was shown.
          </p>
          <p>
            With no existing identity to build from, Amortree designed a complete brand system —
            logo, branding assets, website, and local presence — from a blank page.
          </p>

          <div class="cs-fact-list">
            <div class="cs-fact">
              <span class="material-symbols-outlined">chair</span>
              <div><strong>Sector</strong><span>Interior Design, Decor &amp; Furniture</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">group</span>
              <div><strong>Audience</strong><span>Homeowners &amp; businesses seeking design services</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">location_on</span>
              <div><strong>Presence</strong><span>Local, GMB-optimised</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">language</span>
              <div><strong>Website</strong><a href="https://samsiddhidesigns.com/" target="_blank" rel="noopener">samsiddhidesigns.com</a></div>
            </div>
          </div>
        </div>

        <aside class="cs-client-card">
          <img :src="clientLogo" alt="Samsiddhi Designs logo" class="cs-client-logo" loading="lazy" />
          <span class="cs-quote-mark material-symbols-outlined">format_quote</span>
          <p class="cs-client-quote">
            We design spaces for a living — our own brand needed to show that same care, from the
            logo to the business card someone takes home.
          </p>
          <div class="cs-client-quote-attr">Project Brief, Samsiddhi Designs</div>
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
          <h2 class="cs-h2 cs-h2--light">Building an identity that had to prove its own craft</h2>
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
          <h2 class="cs-h2">One mark, extended everywhere</h2>
        </div>
      </div>

      <div class="cs-strategy-grid">
        <div class="cs-strategy-copy cs-reveal">
          <p class="cs-lead-text">
            A design company's own brand is its first portfolio piece. Our approach was built on
            three pillars.
          </p>

          <div class="cs-pillar" v-for="(p, i) in [
            { t: 'A logo that carries the whole system', d: 'Every subsequent asset — website, business card, signboard, portfolio — was built to extend the same mark and colour language, not reinterpret it.' },
            { t: 'One identity, four categories', d: 'Interior Design, Decor, Furniture, and Raw Materials were treated as facets of one brand story rather than four separate offerings.' },
            { t: 'Local visibility as part of the brief', d: 'GMB optimisation and Analytics were treated as core deliverables, not afterthoughts bolted on after launch.' },
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
            A design company's own brand is its first portfolio piece — clients judge the taste
            behind it before they ever see a finished room.
          </p>
          <div class="cs-insight-divider"></div>
          <p class="cs-insight-action">
            So the identity itself had to demonstrate the same craft Samsiddhi promises its
            clients, on every card, sign, and page.
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
          <h2 class="cs-h2">From a blank page to a full identity system</h2>
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

      <div class="cs-mockup-wrap cs-reveal">
        <img :src="mobileMockup" alt="Samsiddhi Designs mobile view" loading="lazy" />
      </div>
    </div>
  </section>

  <!-- ── DESIGN SYSTEM ──────────────────────────────────────────── -->
  <section class="cs-section">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">05</span>
        <div>
          <div class="cs-eyebrow">Design System</div>
          <h2 class="cs-h2">Colour, type &amp; collateral — one language, every surface</h2>
          <p class="cs-section-sub">
            A documented palette and type system keep the logo, website, and printed collateral
            reading as one considered brand.
          </p>
        </div>
      </div>

      <div class="cs-palette-row cs-reveal">
        <div v-for="p in palette" :key="p.hex" class="cs-swatch">
          <div class="cs-swatch-chip" :style="{ background: p.hex }"></div>
          <div class="cs-swatch-info">
            <strong>{{ p.name }}</strong>
            <code>{{ p.hex }}</code>
            <span>{{ p.use }}</span>
          </div>
        </div>
      </div>

      <div class="cs-type-grid cs-reveal">
        <div class="cs-type-card">
          <div class="cs-type-eyebrow">Display / Headings</div>
          <div class="cs-type-sample-large">Samsiddhi Designs</div>
          <div class="cs-type-sample-med">Interior Design Studio</div>
          <div class="cs-type-sample-sm">Creativity &middot; Elegance &middot; Consistency</div>
          <div class="cs-type-meta">Poppins &middot; Weights 500&ndash;700 &middot; Confident tracking</div>
        </div>
        <div class="cs-type-card cs-type-card--dark">
          <div class="cs-type-eyebrow">Body &amp; Interface</div>
          <p class="cs-type-body">
            A lighter companion typeface keeps long-form copy legible and calm, so the Poppins
            display type stays the star on every page and every printed piece.
          </p>
          <div class="cs-type-meta">Roboto &middot; Weights 300&ndash;500 &middot; Line height 1.7</div>
        </div>
      </div>

      <div class="cs-gallery-card cs-reveal">
        <span class="cs-gallery-label">Business Card, Letterhead, Signboard &amp; Portfolio</span>
        <img :src="collateralCollage" alt="Samsiddhi Designs signboard, business card, letterhead and portfolio" loading="lazy" />
      </div>

      <div class="cs-collateral-grid cs-reveal">
        <div class="cs-gallery-card">
          <span class="cs-gallery-label">Company Profile Design</span>
          <img :src="profileDesign" alt="Samsiddhi Designs company profile design" loading="lazy" />
        </div>
        <div class="cs-gallery-card">
          <span class="cs-gallery-label">Brochure Design</span>
          <img :src="brochureDesign" alt="Samsiddhi Designs brochure design" loading="lazy" />
        </div>
      </div>
    </div>
  </section>

  <!-- ── TESTIMONIAL ────────────────────────────────────────────── -->
  <section class="cs-section cs-section--accent-deep">
    <div class="cs-shell">
      <div class="cs-testimonial cs-reveal">
        <span class="material-symbols-outlined cs-testimonial-mark">format_quote</span>
        <blockquote>
          Amortree Tech is a pleasure to work with. They're responsive, professional, and always willing to go the extra mile. I highly recommend their services.
        </blockquote>
        <div class="cs-testimonial-attr">
          <div class="cs-testimonial-avatar">BK</div>
          <div class="cs-testimonial-text">
            <strong>Bharath Kumar MS</strong>
            <span>Manager, Samsiddhi Designs</span>
          </div>
          <div class="cs-testimonial-stars" aria-label="5 out of 5 stars">
            <span class="material-symbols-outlined" v-for="n in 5" :key="n">star</span>
          </div>
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
          <h2 class="cs-h2 cs-h2--light">What the rebrand delivers</h2>
          <p class="cs-section-sub cs-section-sub--light">The structural and credibility wins from building Samsiddhi's identity from scratch.</p>
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

  <!-- ── RESULT ─────────────────────────────────────────────────── -->
  <section class="cs-section cs-section--muted">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">07</span>
        <div>
          <div class="cs-eyebrow">Result</div>
          <h2 class="cs-h2">What this built for Samsiddhi Designs</h2>
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
        <a href="/project/savedesk" class="cs-nav-link">
          <span class="material-symbols-outlined">arrow_back</span> SaveDesk
        </a>
        <a href="https://samsiddhidesigns.com/" target="_blank" rel="noopener" class="cs-btn-primary">View Live Site</a>
        <a href="/project/raksha-realty" class="cs-nav-link cs-nav-link--right">
          <span class="material-symbols-outlined">arrow_forward</span> Raksha Realty
        </a>
      </div>
    </div>
  </section>

  <CaseStudyWorkWithUs
    project="Samsiddhi Designs"
    industry="Interior design company"
    accent="#009490"
    result="A polished design-business identity that helps visitors feel the craft, trust the process, and enquire faster."
    :services="['Brand identity', 'Website development', 'Branding assets', 'GMB & Analytics setup']"
    :proof="['Visual-first project storytelling', 'Professional brand assets', 'Clear enquiry path']"
  />
</template>

<style lang="scss" scoped>
.cs-hero, .cs-section, .cs-metrics-strip, .cs-meta-strip {
  --accent: #009490;
  --accent-deep: #005e5e;
  --secondary: #e99050;
  --gold: #e99050;
  --midnight: #04302e;
  --frost: #f5f5f7;
  font-family: 'Poppins', sans-serif;
}

// ─── Testimonial ─────────────────────────────────────────────────────
.cs-testimonial {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}

.cs-testimonial-mark { font-size: 3.5rem; color: var(--accent); opacity: 0.7; display: block; margin-bottom: 1rem; }

.cs-testimonial blockquote {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: rgba(255,255,255,0.92);
  line-height: 1.75;
  margin: 0 0 2.25rem;
}

.cs-testimonial-attr {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cs-testimonial-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--gold);
  color: #0f172a;
  font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.cs-testimonial-text {
  text-align: left;
  strong { display: block; color: #fff; font-weight: 700; }
  span { display: block; color: rgba(255,255,255,0.5); font-size: 0.82rem; }
}

.cs-testimonial-stars {
  display: flex; gap: 1px; color: var(--accent);
  .material-symbols-outlined { font-size: 1rem; font-variation-settings: "FILL" 1; }
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
  background: #000000;
  overflow: hidden;
  padding: clamp(8rem, 13vh, 10rem) 0 0;
  background-image: url(../../assets/img/lite-line.svg);
  background-attachment: fixed;
  background-position: center -8.625rem;
  background-size: cover;
  background-repeat: no-repeat;
}

.cs-hero-noise {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px);
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
    background: radial-gradient(circle, rgba(0, 148, 144, 0.28), transparent 70%);
  }
  &--2 {
    bottom: -200px; left: -160px;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(233, 144, 80, 0.14), transparent 70%);
  }
}

.cs-breadcrumb {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 2.5rem;

  a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    &:hover { color: var(--accent); }
  }

  span.active { color: var(--accent) !important; }
}

.cs-hero-eyebrow {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 1.5rem;
}

.eyebrow-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(0, 148, 144, 0.18);
  border: 1px solid rgba(0, 148, 144, 0.4);
  color: #4fd1cd;
  font-size: 0.72rem;
  font-weight: 800;
}

.cs-hero-title {
  position: relative;
  z-index: 2;
  display: block;
  font-size: clamp(2.6rem, 7vw, 5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 2.5rem;
  max-width: 920px;
}

.cs-line { display: block; }

.cs-hero-split {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: end;
  padding-bottom: 2.5rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.cs-hero-sub {
  color: rgba(255, 255, 255, 0.62);
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
  font-weight: 700;
  color: #4fd1cd;
  line-height: 1;
}

.cs-hero-stat-label {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 0.4rem;
}

.cs-hero-stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.12);
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
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(0, 148, 144, 0.32);
    color: #fff;
  }
}

.cs-btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  font-weight: 600;
  font-size: 0.88rem;
  text-decoration: none;
  transition: border-color 0.25s ease, background 0.25s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.05);
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
  border: 1px solid rgba(0, 148, 144, 0.3);
  border-bottom: none;
  box-shadow: 0 -20px 100px rgba(0, 148, 144, 0.1), 0 40px 120px rgba(0, 0, 0, 0.6);

  img { width: 100%; display: block; }
}

.cs-hero-mockup-float {
  position: absolute;
  top: 1.5rem;
  right: calc(2rem + 1.5rem);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 148, 144, 0.45);
  backdrop-filter: blur(12px);
  border-radius: 999px;
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.9);
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
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.76rem;
    font-weight: 700;
  }
}

// ─── Meta strip ─────────────────────────────────────────────────────
.cs-meta-strip {
  background: #06100f;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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
  color: rgba(255, 255, 255, 0.35);
}

.cs-meta-value {
  font-size: 0.92rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
}

.cs-meta-link {
  color: #4fd1cd;
  text-decoration: none;
  &:hover { text-decoration: underline; }
}

// ─── Section shells ──────────────────────────────────────────────────
.cs-section {
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: #fbfbfe;

  &--dark { background: #06100f; }
  &--muted { background: var(--frost); }
  &--accent-deep { background: var(--accent-deep); }
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
  color: rgba(4, 3, 22, 0.06);
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;

  &--accent { color: rgba(255, 255, 255, 0.05); }
}

.cs-eyebrow {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-deep);
  margin-bottom: 0.6rem;

  &--accent { color: #4fd1cd; }
}

.cs-h2 {
  font-size: clamp(1.7rem, 3.2vw, 2.5rem);
  font-weight: 700;
  color: #040316;
  line-height: 1.15;
  margin: 0;

  &--light { color: #fff; }
}

.cs-section-sub {
  margin-top: 0.75rem;
  color: #757575;
  font-size: 0.95rem;
  line-height: 1.7;

  &--light { color: rgba(255, 255, 255, 0.55); }
}

.cs-lead-text {
  font-size: 1.08rem;
  color: #040316;
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
  color: #404040;
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
  span, a { font-size: 0.86rem; color: #040316; text-decoration: none; }
  a:hover { color: var(--accent); }
}

.cs-client-card {
  position: relative;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  background: #06100f;
  text-align: left;
}

.cs-client-logo { height: 40px; margin-bottom: 1.75rem; filter: brightness(0) invert(1); }

.cs-quote-mark {
  font-size: 2.2rem;
  color: var(--accent);
  opacity: 0.7;
  display: block;
  margin-bottom: 0.5rem;
}

.cs-client-quote {
  font-size: 0.95rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.82);
  margin-bottom: 1rem;
}

.cs-client-quote-attr {
  font-size: 0.76rem;
  color: #4fd1cd;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  &:last-child { border-bottom: none; }

  @media (max-width: 600px) {
    grid-template-columns: 36px 36px 1fr;
    gap: 0.85rem;
  }
}

.cs-challenge-num {
  font-size: 0.78rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.25);
  padding-top: 0.2rem;
  font-variant-numeric: tabular-nums;
}

.cs-challenge-icon {
  font-size: 1.5rem;
  color: #4fd1cd;
}

.cs-challenge-body {
  h3 { color: #fff; font-size: 1.05rem; font-weight: 700; margin: 0 0 0.4rem; }
  p { color: rgba(255, 255, 255, 0.55); font-size: 0.9rem; line-height: 1.7; margin: 0; max-width: 640px; }
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

  h4 { font-size: 1rem; font-weight: 700; color: #040316; margin: 0 0 0.35rem; }
  p { font-size: 0.9rem; color: #757575; line-height: 1.75; margin: 0; }
}

.cs-pillar-num {
  flex-shrink: 0;
  width: 38px; height: 38px;
  border-radius: 10px;
  background: rgba(0, 148, 144, 0.1);
  border: 1px solid rgba(0, 148, 144, 0.25);
  color: var(--accent-deep);
  font-weight: 800;
  font-size: 0.78rem;
  display: flex; align-items: center; justify-content: center;
}

.cs-insight {
  padding: 2.25rem 2rem;
  border-radius: 18px;
  background: linear-gradient(160deg, #06100f, #04302e);
  position: sticky;
  top: 2rem;

  h4 { font-size: 1rem; font-weight: 800; color: #fff; margin: 0.85rem 0 0.75rem; }
  p { font-size: 0.9rem; color: rgba(255, 255, 255, 0.62); line-height: 1.75; margin: 0; }
}

.cs-insight-icon { font-size: 1.7rem; color: var(--secondary); }
.cs-insight-divider { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 1.25rem 0; }
.cs-insight-action { color: rgba(255, 255, 255, 0.85) !important; font-weight: 500 !important; }

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
  color: rgba(4, 3, 22, 0.18);
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
  background: linear-gradient(180deg, var(--accent), rgba(0, 148, 144, 0.15));
  margin-top: 0.25rem;
}

.timeline-body {
  padding-bottom: 2.25rem;
  h4 { font-size: 1rem; font-weight: 700; color: #040316; margin: 0 0 0.4rem; }
  p { font-size: 0.9rem; color: #757575; line-height: 1.75; margin: 0; }
}

// ─── Gallery / collateral / mockup ────────────────────────────────────
.cs-gallery-card {
  margin-bottom: 2.5rem;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(4, 3, 22, 0.07);
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
  border-bottom: 1px solid rgba(4, 3, 22, 0.06);
}

.cs-collateral-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 860px) { grid-template-columns: 1fr; }

  .cs-gallery-card { margin-bottom: 0; }
}

.cs-mockup-wrap {
  margin-top: 2.5rem;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(0, 148, 144, 0.15);

  img { width: 100%; display: block; }
}

// ─── Palette ─────────────────────────────────────────────────────────
.cs-palette-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  margin-bottom: 3.5rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); }
}

.cs-swatch {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(4, 3, 22, 0.07);
  transition: transform 0.25s ease;

  &:hover { transform: translateY(-3px); }
}

.cs-swatch-chip { height: 70px; }

.cs-swatch-info {
  padding: 0.75rem;
  background: #fff;

  strong { display: block; font-size: 0.74rem; font-weight: 700; color: #040316; }
  code { display: block; font-size: 0.68rem; color: var(--accent-deep); font-family: monospace; margin: 0.1rem 0; }
  span { display: block; font-size: 0.66rem; color: #757575; }
}

// ─── Typography ──────────────────────────────────────────────────────
.cs-type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3.5rem;

  @media (max-width: 860px) { grid-template-columns: 1fr; }
}

.cs-type-card {
  padding: 2.25rem 2rem;
  border-radius: 18px;
  background: var(--frost);
  border: 1px solid rgba(4, 3, 22, 0.06);

  &--dark {
    background: #06100f;

    .cs-type-eyebrow { color: #4fd1cd; }
    .cs-type-meta { color: rgba(255, 255, 255, 0.35); }
  }
}

.cs-type-eyebrow {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent-deep);
  margin-bottom: 1.25rem;
}

.cs-type-sample-large { font-size: 2.1rem; font-weight: 700; color: #040316; line-height: 1; margin-bottom: 0.5rem; }
.cs-type-sample-med { font-size: 1.15rem; font-weight: 600; color: var(--accent-deep); margin-bottom: 0.5rem; }
.cs-type-sample-sm { font-size: 0.85rem; color: #757575; margin-bottom: 1rem; }
.cs-type-body { color: rgba(255, 255, 255, 0.65); font-size: 0.92rem; line-height: 1.8; margin-bottom: 1rem; font-family: 'Roboto', sans-serif; }
.cs-type-meta { font-size: 0.72rem; color: #757575; }

// ─── Metrics strip ─────────────────────────────────────────────────────
.cs-metrics-strip {
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: #04100e;
}

.cs-metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 860px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
}

.cs-metric {
  padding: 2.5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);

  &:nth-child(3n) { border-right: none; }
  @media (max-width: 860px) {
    &:nth-child(2n) { border-right: none; }
    &:nth-child(3n) { border-right: 1px solid rgba(255, 255, 255, 0.08); }
    &:nth-child(2n):not(:nth-child(3n)) { border-right: none; }
  }
}

.cs-metric-num {
  font-size: clamp(1.6rem, 3.6vw, 2.6rem);
  font-weight: 700;
  color: var(--secondary);
  line-height: 1;
  margin-bottom: 0.6rem;
  font-variant-numeric: tabular-nums;
}

.cs-metric-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
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
  border: 1px solid rgba(4, 3, 22, 0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover { transform: translateY(-4px); box-shadow: 0 18px 48px rgba(4, 3, 22, 0.08); }
  &--highlight {
    background: linear-gradient(160deg, #06100f, #04302e);
    border-color: transparent;
    h4, p { color: #fff !important; }
    .material-symbols-outlined { color: var(--secondary); }
  }

  .material-symbols-outlined { font-size: 1.5rem; color: var(--accent-deep); }
  h4 { font-size: 0.95rem; font-weight: 700; color: #040316; margin: 0.85rem 0 0.5rem; }
  p { font-size: 0.85rem; color: #757575; line-height: 1.65; margin: 0; }
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
  border-top: 1px solid rgba(4, 3, 22, 0.08);

  @media (max-width: 600px) { flex-direction: column; }
}

.cs-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #404040;
  text-decoration: none;
  transition: color 0.25s ease;

  &:hover { color: #040316; }
  &--right { flex-direction: row-reverse; }

  .material-symbols-outlined { font-size: 1.1rem; }
}
</style>