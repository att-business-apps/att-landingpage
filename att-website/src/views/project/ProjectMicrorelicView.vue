<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VueCompareImage } from "vue3-compare-image";
import CaseStudyWorkWithUs from "@/components/CaseStudyWorkWithUs.vue";

gsap.registerPlugin(ScrollTrigger);

// assets
const heroMockup = new URL("../../assets/img/project/c3/project-mr.png", import.meta.url).href;
const clientLogo = new URL("../../assets/img/project/c3/icon-mr.svg", import.meta.url).href;
const mobileMockup = new URL("../../assets/img/project/c3/peoject-mr-mob.png", import.meta.url).href;
const before = new URL("../../assets/img/project/c3/before.png", import.meta.url).href;
const after = new URL("../../assets/img/project/c3/peoject-mr-web.png", import.meta.url).href;

const metrics = [
  { value: "50+", label: "Projects delivered" },
  { value: "10+", label: "Clients served" },
  { value: "5+", label: "Years of experience" },
  { value: "6", label: "Core industries covered" },
];

const services = [
  { name: "Web Development", icon: "language" },
  { name: "Mobile Development", icon: "smartphone" },
  { name: "Progressive Web App", icon: "install_mobile" },
  { name: "Business Consultancy", icon: "handshake" },
  { name: "Digital Marketing", icon: "campaign" },
  { name: "Training", icon: "school" },
];

const industries = [
  { name: "Healthcare", icon: "monitor_heart" },
  { name: "Pharma / CRO", icon: "science" },
  { name: "Education", icon: "auto_stories" },
  { name: "Supply Chain", icon: "local_shipping" },
];

const challenges = [
  { num: "01", icon: "diversity_3", title: "Four very different industries", desc: "Healthcare, Pharma/CRO, Education, and Supply Chain buyers speak different languages and trust different signals. One site had to serve all four without diluting any of them." },
  { num: "02", icon: "widgets", title: "Six services, one story", desc: "Web, Mobile, PWA, Consultancy, Marketing, and Training needed to read as a single coherent product line, not six landing pages bolted together." },
  { num: "03", icon: "styler", title: "No distinctive visual language", desc: "Microrelic's existing presence didn't stand out in a market full of look-alike product-development studios." },
  { num: "04", icon: "verified_user", title: "Credibility without a legacy brand", desc: "500+ projects and 50+ clients had never been presented clearly enough to do their job as trust signals." },
  { num: "05", icon: "schedule", title: "A system built to scale", desc: "Whatever we designed had to support future service lines and content without needing a redesign every time the catalogue grows." },
];

const strategyPillars = [
  { t: "A design system before a design", d: "We established shared colour, type, and component rules first, so every screen that followed inherited consistency instead of reinventing it." },
  { t: "Segment by industry, not by service", d: "Navigation and proof points were structured around the four industries Microrelic serves, so each visitor feels relevance within seconds of landing." },
  { t: "Confidence through repetition", d: "The 500+ projects, 50+ clients, and 5+ years markers are repeated at key decision points across the site, rather than buried once on an About page." },
];

const techStack = [
  { name: "Figma", role: "UX & UI design", icon: "design_services" },
  { name: "PWA", role: "Progressive Web App build", icon: "install_mobile" },
  { name: "Responsive Frontend", role: "Cross-device build", icon: "devices" },
  { name: "Content Structure", role: "Information architecture", icon: "account_tree" },
  { name: "On-page SEO", role: "Search visibility optimization", icon: "travel_explore" },
  { name: "Google Analytics", role: "Behavioural tracking", icon: "query_stats" },
];

const timeline = [
  { step: "01", phase: "Brand Discovery", desc: "Deep-dive workshops to uncover Microrelic's core values and translate them into a distinctive visual identity." },
  { step: "02", phase: "Design System", desc: "A consistent, reusable design system spanning colour, type, and components — built to feel innovative while staying easy to use." },
  { step: "03", phase: "Product Showcase UX", desc: "Information architecture and page flows tailored to present Web, Mobile, PWA, Consultancy, Marketing, and Training services with clarity." },
  { step: "04", phase: "Responsive Build", desc: "A fully responsive website engineered to hold up the new visual language across desktop, tablet, and mobile." },
];

const outcomes = [
  { icon: "verified", title: "A distinctive identity", desc: "A visual language that helps Microrelic stand apart in a crowded product-development market." },
  { icon: "hub", title: "One system, six services", desc: "Web, Mobile, PWA, Consultancy, Marketing, and Training now share a single, coherent design language." },
  // { icon: "diversity_3", title: "Credibility at a glance", desc: "500+ projects, 50+ clients, and 5+ years of experience presented as clear, scannable social proof." },
  { icon: "auto_awesome", title: "Positive early signal", desc: "Prototypes of the site and design system have already drawn praise for their clarity and originality.", highlight: true },
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
        <a href="/projects">Case Study</a>
        <span>&#8226;</span>
        <span class="active">Microrelic</span>
      </nav>

      <div class="cs-hero-eyebrow">
        <span class="eyebrow-pill">IT Company</span>
        Digital Product Development
      </div>

      <h1 class="cs-hero-title">
        <span class="cs-line">A unified design system for a</span>
        <span class="cs-line cs-line-accent">multi-industry product brand.</span>
      </h1>

      <div class="cs-hero-split">
        <p class="cs-hero-sub">
          Microrelic builds digital products for Healthcare, Pharma/CRO, Education, and Supply
          Chain. Amortree crafted a distinctive brand identity, a scalable design system, and a
          responsive website that presents six service lines with a single, confident voice.
        </p>

        <div class="cs-hero-stats">
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">50+</span>
            <span class="cs-hero-stat-label">Projects</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">10+</span>
            <span class="cs-hero-stat-label">Clients</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">5+</span>
            <span class="cs-hero-stat-label">Years experience</span>
          </div>
        </div>
      </div>

      <div class="cs-hero-ctas">
        <a href="https://microrelic.com/" target="_blank" rel="noopener" class="cs-btn-primary">
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
          <img :src="heroMockup" alt="Microrelic website on desktop" loading="lazy" />
        </div>
        <div class="cs-hero-mockup-float">
          <span class="float-dot"></span>
          Design System Live
        </div>
        <div class="cs-hero-mockup-tags">
          <span>Brand Identity</span>
          <span>Design System</span>
          <span>UI/UX Design</span>
          <span>Responsive Web</span>
          <span>On-page SEO</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── META STRIP ─────────────────────────────────────────────── -->
  <section class="cs-meta-strip">
    <div class="cs-shell cs-meta-grid">
      <div class="cs-meta-item">
        <span class="cs-meta-label">Client</span>
        <span class="cs-meta-value">Microrelic Technologies Pvt Ltd</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Industry</span>
        <span class="cs-meta-value">Healthcare &middot; Pharma/CRO &middot; Education &middot; Supply Chain</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Services</span>
        <span class="cs-meta-value">Redesign &middot; UI/UX &middot; PWA &middot; SEO</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Live Website</span>
        <span class="cs-meta-value">
          <a href="https://microrelic.com/" target="_blank" rel="noopener">microrelic.com</a>
        </span>
      </div>
    </div>
  </section>

  <!-- ── CLIENT / OVERVIEW ─────────────────────────────────────────── -->
  <section class="cs-section">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">01</span>
        <div>
          <div class="cs-eyebrow">Client</div>
          <h2 class="cs-h2">Who is Microrelic?</h2>
        </div>
      </div>

      <div class="cs-client-grid cs-reveal">
        <div class="cs-client-copy">
          <p class="cs-lead-text">
            Microrelic is a digital products company delivering solutions across Healthcare,
            Pharma/CRO, Education, and Supply Chain — sectors where credibility has to be earned
            before a single feature is discussed.
          </p>
          <p>
            The brief was to present clear value propositions for six distinct service lines —
            Web Development, Mobile Development, Progressive Web App (PWA), Business Consultancy,
            Digital Marketing, and Training — all grounded in real social proof, without the site
            feeling scattered or generic.
          </p>

          <div class="cs-fact-list">
            <div class="cs-fact" v-for="s in industries" :key="s.name">
              <span class="material-symbols-outlined">{{ s.icon }}</span>
              <div><strong>{{ s.name }}</strong><span>Core industry served</span></div>
            </div>
          </div>
        </div>

        <aside class="cs-client-card">
          <img :src="clientLogo" alt="Microrelic Technologies logo" class="cs-client-logo" loading="lazy" />
          <span class="cs-quote-mark material-symbols-outlined">format_quote</span>
          <p class="cs-client-quote">
            We wanted a brand that could stand out through a unique style and design language —
            not just another product website.
          </p>
          <div class="cs-client-quote-attr">Microrelic Founding Team</div>
        </aside>
      </div>
    </div>
  </section>

  <!-- ── CHALLENGE ──────────────────────────────────────────────── -->
  <section class="cs-section cs-section--dark">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num cs-ghost-num--dark">02</span>
        <div>
          <div class="cs-eyebrow cs-eyebrow--light">Challenge</div>
          <h2 class="cs-h2 cs-h2--light">Standing out across four industries at once</h2>
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
          <h2 class="cs-h2">A system, not a set of screens</h2>
        </div>
      </div>

      <div class="cs-strategy-grid">
        <div class="cs-strategy-copy cs-reveal">
          <p class="cs-lead-text">
            For a company selling six services into four industries, design consistency isn't a
            nice-to-have — it's what makes the offer legible at all. Our strategy rested on three
            pillars.
          </p>

          <div class="cs-pillar" v-for="(p, i) in strategyPillars" :key="p.t">
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
            A multi-service, multi-industry brand doesn't earn trust by listing capabilities — it
            earns trust by making every visitor feel the site was built specifically for their
            industry.
          </p>
          <div class="cs-insight-divider"></div>
          <p class="cs-insight-action">
            So we designed the system to flex: the same visual DNA, with emphasis that shifts per
            industry entry point.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── SERVICES ───────────────────────────────────────────────── -->
  <section class="cs-section cs-section--muted">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">04</span>
        <div>
          <div class="cs-eyebrow">Scope</div>
          <h2 class="cs-h2">Six service lines, one coherent story</h2>
          <p class="cs-section-sub">Every offering needed to feel like part of the same product family, not a patchwork of features.</p>
        </div>
      </div>

      <div class="cs-tech-grid cs-stagger">
        <div v-for="s in services" :key="s.name" class="cs-tech-pill">
          <span class="material-symbols-outlined">{{ s.icon }}</span>
          <div><strong>{{ s.name }}</strong></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── PROCESS ────────────────────────────────────────────────── -->
  <section class="cs-section">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">05</span>
        <div>
          <div class="cs-eyebrow">Our Process</div>
          <h2 class="cs-h2">From brand discovery to a scalable system</h2>
          <p class="cs-section-sub">
            We collaborated with Microrelic, a product-based company with a vision to stand out
            through a unique style and design language, from first workshop to shipped interface.
          </p>
        </div>
      </div>

      <div class="cs-timeline">
        <div v-for="(item, i) in timeline" :key="item.step" class="timeline-row">
          <div class="timeline-week">{{ item.step }}</div>
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

  <!-- ── BEFORE / AFTER ─────────────────────────────────────────── -->
  <section class="cs-section cs-section--muted">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">06</span>
        <div>
          <div class="cs-eyebrow">Before / After</div>
          <h2 class="cs-h2">The transformation, side by side</h2>
        </div>
      </div>

      <div class="cs-compare-wrap cs-reveal">
        <VueCompareImage :left-image="before" :right-image="after" />
      </div>

      <div class="cs-mockup-wrap cs-reveal">
        <img :src="mobileMockup" alt="Microrelic Technologies mobile view" loading="lazy" />
      </div>
    </div>
  </section>

  <!-- ── METRICS ─────────────────────────────────────────────────── -->
  <section class="cs-metrics-strip">
    <div class="cs-shell">
      <div class="cs-metrics-head cs-reveal">
        <h2 class="cs-h2 cs-h2--light">Where the brand stands today</h2>
        <p class="cs-section-sub cs-section-sub--light">The social proof that now anchors Microrelic's story across the site.</p>
      </div>

      <div class="cs-metrics-grid">
        <div v-for="m in metrics" :key="m.label" class="cs-metric">
          <div class="cs-metric-num">{{ m.value }}</div>
          <div class="cs-metric-label">{{ m.label }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── DESIGN SYSTEM ──────────────────────────────────────────── -->
  <section class="cs-section">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">07</span>
        <div>
          <div class="cs-eyebrow">Design System</div>
          <h2 class="cs-h2">Colour, type &amp; components — built to scale</h2>
          <p class="cs-section-sub">
            A single design system now powers every page, so the brand reads consistently
            whether visitors land on Web, Mobile, PWA, Consultancy, Marketing, or Training.
          </p>
        </div>
      </div>

      <div class="cs-palette-row cs-reveal">
        <div class="cs-swatch">
          <div class="cs-swatch-chip" style="background: #2a55b0"></div>
          <div class="cs-swatch-info">
            <strong>Primary</strong>
            <code>#2a55b0</code>
            <span>CTAs &amp; key actions</span>
          </div>
        </div>
        <div class="cs-swatch">
          <div class="cs-swatch-chip" style="background: #4793ea"></div>
          <div class="cs-swatch-info">
            <strong>Primary 500</strong>
            <code>#4793ea</code>
            <span>Links &amp; highlights</span>
          </div>
        </div>
        <div class="cs-swatch">
          <div class="cs-swatch-chip" style="background: #474A90"></div>
          <div class="cs-swatch-info">
            <strong>Secondary</strong>
            <code>#474A90</code>
            <span>Headings &amp; depth</span>
          </div>
        </div>
        <div class="cs-swatch">
          <div class="cs-swatch-chip" style="background: #6C7DC5"></div>
          <div class="cs-swatch-info">
            <strong>Secondary 500</strong>
            <code>#6C7DC5</code>
            <span>Supporting UI</span>
          </div>
        </div>
        <div class="cs-swatch">
          <div class="cs-swatch-chip" style="background: linear-gradient(135deg, #60a5fa, #c084fc)"></div>
          <div class="cs-swatch-info">
            <strong>Gradient</strong>
            <code>#60a5fa &rarr; #c084fc</code>
            <span>Feature accents</span>
          </div>
        </div>
        <div class="cs-swatch">
          <div class="cs-swatch-chip" style="background: #00AA6D"></div>
          <div class="cs-swatch-info">
            <strong>Success</strong>
            <code>#00AA6D</code>
            <span>Status &amp; proof points</span>
          </div>
        </div>
      </div>

      <div class="cs-type-grid cs-reveal">
        <div class="cs-type-card">
          <div class="cs-type-eyebrow">Display / Headings</div>
          <div class="cs-type-sample-large">Microrelic</div>
          <div class="cs-type-sample-med">Digital Product Development</div>
          <div class="cs-type-sample-sm">Clarity &middot; Consistency &middot; Confidence</div>
          <div class="cs-type-meta">Inter &middot; Weights 500&ndash;700 &middot; Tight tracking</div>
        </div>
        <div class="cs-type-card cs-type-card--dark">
          <div class="cs-type-eyebrow">Body &amp; Interface</div>
          <p class="cs-type-body">
            A single typeface across every touchpoint keeps six service lines feeling like one
            product — legible at a glance, calm under detail, and easy to extend as the catalogue
            grows.
          </p>
          <div class="cs-type-meta">Base 16px &middot; Line height 1.7 &middot; Inter, sans-serif</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── TECHNOLOGY ─────────────────────────────────────────────── -->
  <section class="cs-section cs-section--muted">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">08</span>
        <div>
          <div class="cs-eyebrow">Technology</div>
          <h2 class="cs-h2">Stack &amp; tools</h2>
          <p class="cs-section-sub">Every tool was chosen to keep the design system consistent from Figma to production.</p>
        </div>
      </div>

      <div class="cs-tech-grid cs-stagger">
        <div v-for="t in techStack" :key="t.name" class="cs-tech-pill">
          <span class="material-symbols-outlined">{{ t.icon }}</span>
          <div><strong>{{ t.name }}</strong><span>{{ t.role }}</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── RESULT ─────────────────────────────────────────────────── -->
  <section class="cs-section cs-section--muted">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">09</span>
        <div>
          <div class="cs-eyebrow">Result</div>
          <h2 class="cs-h2">A foundation for a differentiated brand</h2>
        </div>
      </div>

      <div class="cs-reveal">
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
      </div>

      <div class="cs-nav-row cs-reveal">
        <a href="/project/solved-cube-it-solutions" class="cs-nav-link">
          <span class="material-symbols-outlined">arrow_back</span> Solved Cube
        </a>
        <a href="https://microrelic.com/" target="_blank" rel="noopener" class="cs-btn-primary">View Live Site</a>
        <a href="/project/steadyasset" class="cs-nav-link cs-nav-link--right">
          <span class="material-symbols-outlined">arrow_forward</span> SteadyAsset
        </a>
      </div>
    </div>
  </section>

  <CaseStudyWorkWithUs
    project="Microrelic"
    industry="Technology and training brand"
    accent="#4793ea"
    result="A sharper digital identity that communicates capability, credibility, and service depth for a growing tech brand."
    :services="['Brand direction', 'Design System', 'Website UI/UX', 'Responsive build']"
    :proof="['Trust-led service pages', 'Clear training and tech positioning', 'Conversion-ready contact path']"
  />
</template>

<style lang="scss" scoped>
.cs-hero, .cs-section, .cs-metrics-strip, .cs-meta-strip {
  --primary: #2a55b0;
  --primary-500: #4793ea;
  --primary-300: #9acdf6;
  --primary-900: #254583;
  --secondary: #474A90;
  --secondary-500: #6C7DC5;
  --secondary-900: #3A3E6E;
  --gradient1: #60a5fa;
  --gradient2: #c084fc;
  --frost: #f5f7fd;
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
  background: #05070d;
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
  filter: blur(90px);

  &--1 {
    width: 520px;
    height: 520px;
    top: -120px;
    left: -100px;
    background: radial-gradient(circle, rgba(71, 147, 234, 0.35), transparent 70%);
  }

  &--2 {
    width: 460px;
    height: 460px;
    bottom: -160px;
    right: -80px;
    background: radial-gradient(circle, rgba(192, 132, 252, 0.28), transparent 70%);
  }
}

.cs-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 2.5rem;

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover { color: #fff; }
  }

  .active { color: var(--primary-300); }
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

.eyebrow-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--primary-500);
  box-shadow: 0 0 12px var(--primary-500);
}

.cs-hero-title {
  font-size: clamp(2.2rem, 5vw, 3.75rem);
  font-weight: 800;
  line-height: 1.12;
  color: #fff;
  margin-bottom: 1.75rem;
  display: block;

  .cs-line { display: block; }

  .cs-line-accent {
    background: linear-gradient(135deg, var(--gradient1), var(--gradient2));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.cs-hero-split {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  padding-bottom: 2.5rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.cs-hero-sub {
  max-width: 620px;
  color: rgba(255, 255, 255, 0.68);
  font-size: 1.05rem;
  line-height: 1.75;
  margin: 0;
}

.cs-hero-stats {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.cs-hero-stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.cs-hero-stat-val {
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
}

.cs-hero-stat-label {
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.5);
}

.cs-hero-stat-divider {
  width: 1px;
  height: 34px;
  background: rgba(255, 255, 255, 0.15);
}

.cs-hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3.5rem;
}

.cs-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--primary), var(--primary-500));
  color: #fff;
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;
  box-shadow: 0 14px 30px rgba(42, 85, 176, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 38px rgba(42, 85, 176, 0.45);
  }
}

.cs-btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #fff;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
  transition: border-color 0.25s ease, background 0.25s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.06);
  }
}

.cs-hero-mockup-wrap {
  position: relative;
  padding-bottom: 4rem;
}

.cs-hero-mockup {
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.55);

  img { width: 100%; display: block; }
}

.cs-hero-mockup-float {
  position: absolute;
  top: -18px;
  right: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  background: rgba(10, 14, 22, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  backdrop-filter: blur(10px);
}

.float-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 10px #34d399;
}

.cs-hero-mockup-tags {
  position: absolute;
  bottom: 1.5rem;
  left: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    background: rgba(10, 14, 22, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.72rem;
    font-weight: 600;
    backdrop-filter: blur(10px);
  }
}

// ─── Meta strip ─────────────────────────────────────────────────────
.cs-meta-strip {
  background: #0a0e16;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.75rem 0;
}

.cs-meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 860px) { grid-template-columns: repeat(2, 1fr); }
}

.cs-meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.cs-meta-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}

.cs-meta-value {
  font-size: 0.92rem;
  font-weight: 600;
  color: #fff;

  a { color: var(--primary-300); text-decoration: none; }
  a:hover { text-decoration: underline; }
}

// ─── Section shell ───────────────────────────────────────────────────
.cs-section {
  padding: clamp(4rem, 8vw, 6.5rem) 0;
  background: #fff;

  &--muted { background: var(--frost); }
  &--dark { background: #05070d; }
}

.cs-section-head {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.cs-ghost-num {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  color: rgba(15, 23, 42, 0.08);
  font-variant-numeric: tabular-nums;

  &--dark { color: rgba(255, 255, 255, 0.06); }
}

.cs-eyebrow {
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 0.6rem;

  &--light { color: var(--primary-300); }
}

.cs-h2 {
  font-size: clamp(1.6rem, 2.6vw, 2.1rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.25;

  &--light { color: #fff; }
}

.cs-section-sub {
  margin-top: 0.75rem;
  color: #64748b;
  font-size: 0.98rem;
  max-width: 620px;

  &--light { color: rgba(255, 255, 255, 0.6); }
}

// ─── Client ────────────────────────────────────────────────────────
.cs-client-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
}

.cs-lead-text {
  font-size: 1rem;
  color: #1e293b;
  line-height: 1.8;
  margin-bottom: 1.25rem;
}

.cs-client-copy p {
  color: #475569;
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
}

.cs-fact-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
}

.cs-fact {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 14px;
  background: var(--frost);
  border: 1px solid rgba(15, 23, 42, 0.06);

  .material-symbols-outlined { color: var(--primary); font-size: 1.3rem; flex-shrink: 0; }

  strong { display: block; font-size: 0.88rem; font-weight: 700; color: #0f172a; }
  span { display: block; font-size: 0.8rem; color: #94a3b8; }
  a { color: var(--primary); font-size: 0.85rem; text-decoration: none; }
}

.cs-client-card {
  border-radius: 20px;
  padding: 2.25rem;
  background: linear-gradient(160deg, var(--secondary-900), #171a33);
  color: #fff;
  position: relative;
  overflow: hidden;
}

.cs-client-logo {
  height: 40px;
  margin-bottom: 1.5rem;
  filter: brightness(0) invert(1);
}

.cs-quote-mark {
  font-size: 2.2rem;
  color: var(--primary-500);
  opacity: 0.7;
  display: block;
  margin-bottom: 0.75rem;
}

.cs-client-quote {
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.92);
  margin-bottom: 1.25rem;
}

.cs-client-quote-attr {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}

// ─── Tech / service grid ──────────────────────────────────────────────
.cs-tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 860px) { grid-template-columns: repeat(2, 1fr); }
}

.cs-tech-pill {
  display: flex;
  gap: 0.85rem;
  align-items: center;
  padding: 1.5rem;
  background: #f5f7fd;

  .material-symbols-outlined { font-size: 1.3rem; color: var(--primary); flex-shrink: 0; }
  strong { display: block; font-size: 0.85rem; font-weight: 700; color: #0f172a; }
  span { display: block; font-size: 0.74rem; color: #94a3b8; margin-top: 0.15rem; }
}

// ─── Timeline ──────────────────────────────────────────────────────
.cs-timeline {
  display: flex;
  flex-direction: column;
}

.timeline-row {
  display: grid;
  grid-template-columns: 50px 40px 1fr;
  gap: 0.5rem;

  @media (max-width: 560px) { grid-template-columns: 34px 32px 1fr; }
}

.timeline-week {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary);
  padding-top: 0.2rem;
}

.timeline-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 0 4px rgba(42, 85, 176, 0.15);
  flex-shrink: 0;
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: rgba(42, 85, 176, 0.18);
  margin-top: 0.35rem;
}

.timeline-body {
  padding-bottom: 2.25rem;

  h4 { font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0 0 0.4rem; }
  p { color: #64748b; font-size: 0.9rem; line-height: 1.75; margin: 0; max-width: 560px; }
}

// ─── Challenges (asymmetric row list) ─────────────────────────────────
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
  color: var(--primary-300);
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

.eyebrow-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(42, 85, 176,0.14);
  border: 1px solid rgba(42, 85, 176,0.35);
  color: var(--primary-300);
  font-size: 0.72rem;
  font-weight: 800;
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
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(42, 85, 176, 0.1);
  border: 1px solid rgba(42, 85, 176, 0.25);
  color: var(--primary);
  font-weight: 800;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cs-insight {
  padding: 2.25rem 2rem;
  border-radius: 18px;
  background: linear-gradient(160deg, var(--secondary-900), #171a33);
  position: sticky;
  top: 2rem;

  h4 { font-size: 1rem; font-weight: 800; color: #fff; margin: 0.85rem 0 0.75rem; }
  p { font-size: 0.9rem; color: rgba(255, 255, 255, 0.62); line-height: 1.75; margin: 0; }
}

.cs-insight-icon { font-size: 1.7rem; color: var(--primary-300); }
.cs-insight-divider { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 1.25rem 0; }
.cs-insight-action { color: rgba(255, 255, 255, 0.85) !important; font-weight: 500 !important; }

// ─── Compare / mockup ────────────────────────────────────────────────
.cs-compare-wrap {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  margin-bottom: 2.5rem;
}

.cs-mockup-wrap {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(42, 85, 176, 0.15);

  img { width: 100%; display: block; }
}

// ─── Metrics strip ───────────────────────────────────────────────────
.cs-metrics-strip {
  background: linear-gradient(160deg, #060810, #101736 60%, #05070d);
  padding: clamp(4rem, 8vw, 6rem) 0;
}

.cs-metrics-head {
  text-align: center;
  margin-bottom: 3rem;
}

.cs-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 860px) { grid-template-columns: repeat(2, 1fr); }
}

.cs-metric {
  text-align: center;
  padding: 1.75rem 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.cs-metric-num {
  font-size: clamp(2rem, 3.5vw, 2.6rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--gradient1), var(--gradient2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.cs-metric-label {
  margin-top: 0.4rem;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.6);
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
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.25s ease;

  &:hover { transform: translateY(-3px); }
}

.cs-swatch-chip { height: 70px; }

.cs-swatch-info {
  padding: 0.75rem;
  background: #fff;

  strong { display: block; font-size: 0.74rem; font-weight: 700; color: #0f172a; }
  code { display: block; font-size: 0.68rem; color: var(--primary); font-family: monospace; margin: 0.1rem 0; }
  span { display: block; font-size: 0.66rem; color: #94a3b8; }
}

// ─── Typography ──────────────────────────────────────────────────────
.cs-type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 860px) { grid-template-columns: 1fr; }
}

.cs-type-card {
  padding: 2.25rem 2rem;
  border-radius: 18px;
  background: var(--frost);
  border: 1px solid rgba(15, 23, 42, 0.06);
  font-family: "Inter", sans-serif;

  &--dark {
    background: #0a0e16;

    .cs-type-eyebrow { color: var(--primary-300); }
    .cs-type-meta { color: rgba(255, 255, 255, 0.35); }
  }
}

.cs-type-eyebrow {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 1.25rem;
}

.cs-type-sample-large { font-size: 2.1rem; font-weight: 800; color: #0f172a; line-height: 1; margin-bottom: 0.5rem; }
.cs-type-sample-med { font-size: 1.15rem; font-weight: 600; color: var(--primary); margin-bottom: 0.5rem; }
.cs-type-sample-sm { font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem; }
.cs-type-body { color: rgba(255, 255, 255, 0.65); font-size: 0.92rem; line-height: 1.8; margin-bottom: 1rem; }
.cs-type-meta { font-size: 0.72rem; color: #94a3b8; }

// ─── Outcomes ────────────────────────────────────────────────────────
.cs-outcome-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.1rem;
}

.cs-outcome {
  padding: 1.5rem 1.4rem;
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover { transform: translateY(-4px); box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08); }

  &--highlight {
    background: linear-gradient(160deg, var(--secondary-900), #171a33);
    border-color: transparent;

    h4, p { color: #fff !important; }
    .material-symbols-outlined { color: var(--primary-300); }
    p { opacity: 0.75; }
  }

  .material-symbols-outlined { font-size: 1.5rem; color: var(--primary); }
  h4 { font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0.85rem 0 0.5rem; }
  p { font-size: 0.85rem; color: #64748b; line-height: 1.65; margin: 0; }
}

// ─── Nav row ─────────────────────────────────────────────────────────
.cs-nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 3.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(15, 23, 42, 0.08);

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