<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CaseStudyWorkWithUs from "@/components/CaseStudyWorkWithUs.vue";

gsap.registerPlugin(ScrollTrigger);

const heroMockup = new URL("../../assets/img/project/c4/project-sa.png", import.meta.url).href;
const clientLogo = new URL("../../assets/img/project/c4/icon-sa.svg", import.meta.url).href;
const designMockup = new URL("../../assets/img/project/c4/sa-mockup.png", import.meta.url).href;

const metrics = [
  { value: "3K", label: "Active Users" },
  { value: "2.9K", label: "New Users" },
  { value: "5.7K", label: "Views" },
  { value: "94", label: "Google PageSpeed score" },
  { value: "+61%", label: "Session duration improvement" },
  { value: "4.8★", label: "Average investor trust score" },
];

const timeline = [
  { week: "01", phase: "Discovery & Audit", desc: "Competitive landscape mapping across NBFC/fintech peers, ICP interviews, and goal alignment with the founding team." },
  { week: "02", phase: "Brand Identity", desc: "Logo concepts, colour psychology workshop, and final brand system covering mark, palette, and typography." },
  { week: "03", phase: "UX Architecture", desc: "Sitemap, information hierarchy, wireframes for key pages — home, products, investor education, and contact." },
  { week: "04", phase: "UI Design & Prototype", desc: "High-fidelity Figma screens with an interactive prototype reviewed by the client team before a line of code was written." },
  { week: "05", phase: "Development & QA", desc: "Responsive build, GA4 + GTM implementation, GMB setup, and a performance audit before launch." },
  { week: "06", phase: "Content & SEO", desc: "Monthly blog strategy, keyword targeting, and analytics review to build organic authority in the alternative investment space." },
];

const techStack = [
  { name: "Figma", role: "UX & brand design", icon: "design_services" },
  { name: "HTML / CSS / JS", role: "Frontend development", icon: "code" },
  { name: "Content", role: "SEO-focused content strategy", icon: "manage_search" },
  { name: "GitHub CI/CD", role: "Automated deployment pipeline", icon: "tag" },
  { name: "SEO", role: "Search visibility optimization", icon: "travel_explore" },
  { name: "Blog", role: "Educational content publishing", icon: "article" },
  { name: "Google Analytics 4", role: "Behavioural tracking", icon: "rocket_launch" },
  { name: "Google My Business", role: "Local search presence", icon: "storefront" },
];

const palette = [
  { hex: "#20B2AA", name: "Teal Primary", use: "CTAs & key UI elements" },
  { hex: "#008B8B", name: "Deep Teal", use: "Headings & hover states" },
  { hex: "#f0b90b", name: "Gold Accent", use: "Trust markers & highlights" },
  { hex: "#04505F", name: "Midnight Teal", use: "Dark sections & depth" },
  { hex: "#404040", name: "Neutral Gray", use: "Body copy & borders" },
  { hex: "#EBF1F0", name: "Frost White", use: "Backgrounds & cards" },
];

const challenges = [
  { num: "01", icon: "bolt", title: "Zero brand equity", desc: "No logo, colour system, or typography — nothing for investors to visually anchor trust to. Competitors had years of brand recognition." },
  { num: "02", icon: "manage_search", title: "No organic discovery", desc: "Without a website or GMB listing, SteadyAsset was invisible to investors searching for alternative investment options in Bengaluru and beyond." },
  { num: "03", icon: "query_stats", title: "Low-literacy market", desc: "Fractional CRE and fixed-income products require investor education. Most visitors arrive unfamiliar with the asset class itself." },
  { num: "04", icon: "groups", title: "Dual audience tension", desc: "The site had to speak to first-time retail investors and HNIs with high return expectations — at the same time." },
  { num: "05", icon: "gavel", title: "Regulatory sensitivity", desc: "Every claim and number needed to build confidence without crossing into unverifiable performance promises." },
  { num: "06", icon: "schedule", title: "Launch pressure", desc: "Investor milestones were tied to a live product. Eight weeks from zero to a functioning brand and site was non-negotiable." },
];

const outcomes = [
  { icon: "military_tech", title: "Trust before the pitch", desc: "Investors arrive on a site that looks like an established platform, not a startup." },
  { icon: "trending_up", title: "A marketing asset", desc: "GA4, GTM, and monthly SEO content actively generate and nurture investor leads." },
  { icon: "autorenew", title: "An education engine", desc: "The blog positions SteadyAsset as a thought leader in fractional CRE." },
  { icon: "location_on", title: "Local discoverability", desc: "GMB and local SEO combined with Google Ads to deliver an 8.44× ROAS." },
  { icon: "settings_suggest", title: "Operational independence", desc: "A documented system means the team can extend their brand without us on speed dial." },
  { icon: "forum", title: "A reusable sales asset", desc: "The live site is itself used in investor meetings and pitch decks to demonstrate credibility.", highlight: true },
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
        <span class="active">SteadyAsset</span>
      </nav>

      <div class="cs-hero-eyebrow">
        <span class="eyebrow-dot"></span>
        Case Study &middot; Investment Platform &middot; 2024
      </div>

      <h1 class="cs-hero-title">
        <span class="cs-line">From zero digital presence to a</span>
        <span class="cs-line cs-line-accent">trusted fintech brand.</span>
      </h1>

      <div class="cs-hero-split">
        <p class="cs-hero-sub">
          SteadyAsset offers fixed-income products and fractional commercial real estate to
          retail and HNI investors. Amortree delivered the complete brand system, UX
          architecture, and investor-grade website — built to earn trust before a single rupee
          is committed.
        </p>

        <div class="cs-hero-stats">
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">3K</span>
            <span class="cs-hero-stat-label">Organic traffic</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">4</span>
            <span class="cs-hero-stat-label">Weeks to launch</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">94</span>
            <span class="cs-hero-stat-label">PageSpeed</span>
          </div>
        </div>
      </div>

      <div class="cs-hero-ctas">
        <a href="https://steadyasset.com" target="_blank" rel="noopener" class="cs-btn-primary">
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
          <img :src="heroMockup" alt="SteadyAsset website on desktop" loading="lazy" />
        </div>
        <div class="cs-hero-mockup-float">
          <span class="float-dot"></span>
          Live &amp; Ranking
        </div>
        <div class="cs-hero-mockup-tags">
          <span>Branding</span>
          <span>UI/UX Design</span>
          <span>Website Development</span>
          <span>Google Analytics</span>
          <span>GMB Setup</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── META STRIP ─────────────────────────────────────────────── -->
  <section class="cs-meta-strip">
    <div class="cs-shell cs-meta-grid">
      <div class="cs-meta-item">
        <span class="cs-meta-label">Client</span>
        <span class="cs-meta-value">SteadyAsset</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Industry</span>
        <span class="cs-meta-value">Alternative Investments</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Engagement</span>
        <span class="cs-meta-value">Brand &middot; Design &middot; Web &middot; Analytics</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Timeline</span>
        <span class="cs-meta-value">4 Weeks &middot; Ongoing SEO</span>
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
          <h2 class="cs-h2">Who is SteadyAsset?</h2>
        </div>
      </div>

      <div class="cs-client-grid cs-reveal">
        <div class="cs-client-copy">
          <p class="cs-lead-text">
            SteadyAsset is a Bengaluru-based alternative investment platform that makes
            commercial real estate and fixed-income products accessible to retail investors
            starting at &#8377;10,000 — sitting at the intersection of fintech and real estate,
            where trust and credibility are non-negotiable.
          </p>
          <p>
            When the founding team approached Amortree, they had a strong product thesis and
            early investor backing, but no digital identity, no website, and no clear
            articulation of their value proposition for the average investor.
          </p>

          <div class="cs-fact-list">
            <div class="cs-fact">
              <span class="material-symbols-outlined">apartment</span>
              <div><strong>Sector</strong><span>Fractional Real Estate &amp; Fixed Income</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">group</span>
              <div><strong>Audience</strong><span>Retail investors &amp; HNIs, 25&ndash;55 yrs</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">location_on</span>
              <div><strong>Location</strong><span>Bengaluru, India</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">language</span>
              <div><strong>Website</strong><a href="https://steadyasset.com" target="_blank" rel="noopener">steadyasset.com</a></div>
            </div>
          </div>
        </div>

        <aside class="cs-client-card">
          <img :src="clientLogo" alt="SteadyAsset logo" class="cs-client-logo" loading="lazy" />
          <span class="cs-quote-mark material-symbols-outlined">format_quote</span>
          <p class="cs-client-quote">
            We needed a brand that could sit alongside established NBFCs and make investors feel
            that their money was in safe hands.
          </p>
          <div class="cs-client-quote-attr">SteadyAsset Founding Team</div>
        </aside>
      </div>
    </div>
  </section>

  <!-- ── CHALLENGE ─────────────────────────────────────────────── -->
  <section class="cs-section cs-section--dark">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num cs-ghost-num--teal">02</span>
        <div>
          <div class="cs-eyebrow cs-eyebrow--teal">Challenge</div>
          <h2 class="cs-h2 cs-h2--light">The stakes of a first impression in fintech</h2>
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
          <h2 class="cs-h2">Trust architecture, not just visual design</h2>
        </div>
      </div>

      <div class="cs-strategy-grid">
        <div class="cs-strategy-copy cs-reveal">
          <p class="cs-lead-text">
            In financial services, design is never purely aesthetic. Every colour choice and
            content decision either builds or erodes investor confidence. Our strategy had
            three pillars.
          </p>

          <div class="cs-pillar" v-for="(p, i) in [
            { t: 'Credibility-first visual identity', d: 'The palette was built around teal and gold — a deliberate departure from the red-heavy palette of most Indian fintech brands. Teal signals stability. Gold signals value.' },
            { t: 'Education-led content architecture', d: 'Rather than leading with returns, we structured the site around investor education — how CRE works, why fractional ownership reduces risk. Education builds trust before the ask.' },
            { t: 'Analytics from day one', d: 'GA4 with custom event tracking was configured pre-launch, so the team could iterate based on real investor behaviour from launch day, not three months in.' },
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
            Alternative investment platforms don't lose investors on the product page — they
            lose them on the homepage, in the first eight seconds, when the brand doesn't feel
            established enough to hand over &#8377;10,000.
          </p>
          <div class="cs-insight-divider"></div>
          <p class="cs-insight-action">
            So we designed the homepage as a confidence engine — leading with credibility and
            transparency before ever showing a product card.
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
          <h2 class="cs-h2">Eight weeks, whiteboard to live site</h2>
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

  <!-- ── BEFORE / AFTER ─────────────────────────────────────────── -->
  <section class="cs-section">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">05</span>
        <div>
          <div class="cs-eyebrow">Before / After</div>
          <h2 class="cs-h2">The transformation</h2>
        </div>
      </div>

      <div class="cs-ba-grid cs-reveal">
        <div class="cs-ba-card cs-ba-card--before">
          <span class="cs-ba-tag">Before</span>
          <ul>
            <li><span class="material-symbols-outlined">close</span>No logo or visual identity</li>
            <li><span class="material-symbols-outlined">close</span>No website or online presence</li>
            <li><span class="material-symbols-outlined">close</span>Zero Google search visibility</li>
            <li><span class="material-symbols-outlined">close</span>No way to track investor interest</li>
            <li><span class="material-symbols-outlined">close</span>Product explained via WhatsApp decks</li>
            <li><span class="material-symbols-outlined">close</span>No investor education content</li>
            <li><span class="material-symbols-outlined">close</span>No GMB listing for local discovery</li>
            <li><span class="material-symbols-outlined">close</span>"Startup, not established"</li>
          </ul>
        </div>
        <div class="cs-ba-card cs-ba-card--after">
          <span class="cs-ba-tag">After</span>
          <ul>
            <li><span class="material-symbols-outlined">check</span>Full identity — logo, palette, type system</li>
            <li><span class="material-symbols-outlined">check</span>Investor-grade site, 94 Lighthouse score</li>
            <li><span class="material-symbols-outlined">check</span>Page 1 rankings for target keywords</li>
            <li><span class="material-symbols-outlined">check</span>GA4 + GTM tracking every touchpoint</li>
            <li><span class="material-symbols-outlined">check</span>Clear product pages, investment flow</li>
            <li><span class="material-symbols-outlined">check</span>Monthly SEO blog building authority</li>
            <li><span class="material-symbols-outlined">check</span>GMB profile, reviews, local visibility</li>
            <li><span class="material-symbols-outlined">check</span>"Established, trustworthy platform"</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ── METRICS ────────────────────────────────────────────────── -->
  <section class="cs-metrics-strip">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num cs-ghost-num--teal">06</span>
        <div>
          <div class="cs-eyebrow cs-eyebrow--teal">Metrics</div>
          <h2 class="cs-h2 cs-h2--light">Numbers that make the case</h2>
          <p class="cs-section-sub cs-section-sub--light">Measured across the first 6 months post-launch via GA4 and Google Ads.</p>
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

  <!-- ── DESIGN SYSTEM ──────────────────────────────────────────── -->
  <section class="cs-section">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">07</span>
        <div>
          <div class="cs-eyebrow">Design System</div>
          <h2 class="cs-h2">Colour palette &amp; typography</h2>
          <p class="cs-section-sub">A visual language built for a fintech audience: trustworthy, contemporary, instantly legible.</p>
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
          <div class="cs-type-sample-large">SteadyAsset</div>
          <div class="cs-type-sample-med">Investment Platform</div>
          <div class="cs-type-sample-sm">Trust &middot; Transparency &middot; Accessibility</div>
          <div class="cs-type-meta">Google Sans &middot; Weights 600&ndash;700 &middot; Tight tracking</div>
        </div>
        <div class="cs-type-card cs-type-card--dark">
          <div class="cs-type-eyebrow">Body &amp; Interface</div>
          <p class="cs-type-body">
            Clean, high-contrast interface with ample whitespace for confident decision-making.
            Investors should never have to squint, scroll unnecessarily, or guess what happens next.
          </p>
          <div class="cs-type-meta">Base 16&ndash;18px &middot; Line height 1.65 &middot; Emphasis via colour/weight</div>
        </div>
      </div>

      <div class="cs-mockup-wrap cs-reveal">
        <img :src="designMockup" alt="SteadyAsset UI mockup" loading="lazy" />
      </div>
    </div>
  </section>

  <!-- ── TESTIMONIAL ────────────────────────────────────────────── -->
  <section class="cs-section cs-section--teal">
    <div class="cs-shell">
      <div class="cs-testimonial cs-reveal">
        <span class="material-symbols-outlined cs-testimonial-mark">format_quote</span>
        <blockquote>
          Amortree is a very professional and end-to-end service provider. They have good understanding of the clients needs and work in a timely and efficient manner.
        </blockquote>
        <div class="cs-testimonial-attr">
          <div class="cs-testimonial-avatar">G</div>
          <div class="cs-testimonial-text">
            <strong>Menaka Reddy</strong>
            <span>Founder, SteadyAsset</span>
          </div>
          <div class="cs-testimonial-stars" aria-label="5 out of 5 stars">
            <span class="material-symbols-outlined" v-for="n in 5" :key="n">star</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── TECHNOLOGY ─────────────────────────────────────────────── -->
  <section class="cs-section">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">08</span>
        <div>
          <div class="cs-eyebrow">Technology</div>
          <h2 class="cs-h2">Stack &amp; tools</h2>
          <p class="cs-section-sub">Every tool was chosen for performance and the investor experience — not trend-chasing.</p>
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

  <!-- ── OUTCOMES ───────────────────────────────────────────────── -->
  <section class="cs-section cs-section--muted">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">09</span>
        <div>
          <div class="cs-eyebrow">Business Outcome</div>
          <h2 class="cs-h2">What this built for SteadyAsset</h2>
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
        <a href="/project/microrelic" class="cs-nav-link">
          <span class="material-symbols-outlined">arrow_back</span> Microrelic
        </a>
        <a href="https://steadyasset.com" target="_blank" rel="noopener" class="cs-btn-primary">View Live Site</a>
        <a href="/project/al-shamil-computers" class="cs-nav-link cs-nav-link--right">
          <span class="material-symbols-outlined">arrow_forward</span> Al-Shamil
        </a>
      </div>
    </div>
  </section>

  <CaseStudyWorkWithUs
    project="SteadyAsset"
    industry="Investment Platform"
    accent="#facc15"
    result="An investor-grade brand and digital platform that earns trust, educates visitors, and converts curiosity into committed capital."
    :services="['Brand Identity & Logo', 'Website UI/UX Design', 'Frontend Development', 'Google Analytics 4', 'GMB Setup', 'SEO Content Strategy', 'Blog']"
    :proof="['5.7K Organic website visit', '3.2× organic traffic growth in 6 months', '94 Google Lighthouse performance score']"
  />
</template>

<style lang="scss" scoped>
.cs-hero, .cs-section, .cs-metrics-strip, .cs-meta-strip {
  --teal: #20B2AA;
  --teal-deep: #008B8B;
  --gold: #facc15;
  --midnight: #04505F;
  --frost: #f5f9f9;
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
  background-image: url(../../assets/img/banner-bg.svg);
  background-attachment: fixed;
  background-position: center -8.625rem;
  background-size: cover;
  background-repeat: no-repeat;
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
    background: radial-gradient(circle, rgba(32,178,170,0.22), transparent 70%);
  }
  &--2 {
    bottom: -200px; left: -160px;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(250,204,21,0.1), transparent 70%);
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

  a { color: rgba(255,255,255,0.5); text-decoration: none; &:hover { color: var(--teal); } }
  .active { color: var(--teal); }
}

.cs-hero-eyebrow {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 1.5rem;
}

.eyebrow-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--teal);
  box-shadow: 0 0 12px var(--teal);
  animation: pulse-dot 2s ease infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.cs-hero-title {
  position: relative;
  z-index: 2;
  display: block;
  font-size: clamp(2.4rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 2.5rem;
  max-width: 920px;
}

.cs-line { display: block; }
.cs-line-accent { color: var(--teal); }

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
  max-width: 600px;
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
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--gold);
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
  background: var(--gold);
  color: #0f172a;
  font-weight: 800;
  font-size: 0.88rem;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(250,204,21,0.28);
    color: #0f172a;
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
  padding-bottom: 0;
}

.cs-hero-mockup {
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  border: 1px solid rgba(32,178,170,0.25);
  border-bottom: none;
  box-shadow: 0 -20px 100px rgba(32,178,170,0.08), 0 40px 120px rgba(0,0,0,0.6);

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
  border: 1px solid rgba(32,178,170,0.4);
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

.cs-hero-mockup-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1.5rem 0;

  span {
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    border: 1px solid rgba(32,178,170,0.3);
    background: rgba(32,178,170,0.06);
    color: rgba(255,255,255,0.75);
    font-size: 0.76rem;
    font-weight: 600;
  }
}

// ─── Meta strip ─────────────────────────────────────────────────────
.cs-meta-strip {
  background: #0a1015;
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

// ─── Section shells ──────────────────────────────────────────────────
.cs-section {
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: #fff;

  &--dark { background: #0a1015; }
  &--muted { background: var(--frost); }
  &--teal { background: linear-gradient(135deg, var(--midnight), #0c2832); }
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

  &--teal { color: rgba(255,255,255,0.05); }
}

.cs-eyebrow {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--teal-deep);
  margin-bottom: 0.6rem;

  &--teal { color: var(--teal); }
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

  .material-symbols-outlined { font-size: 1.2rem; color: var(--teal-deep); }
  strong { display: block; font-size: 0.66rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--teal-deep); margin-bottom: 0.15rem; }
  span, a { font-size: 0.86rem; color: #334155; text-decoration: none; }
  a:hover { color: var(--teal); }
}

.cs-client-card {
  position: relative;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  background: #0a1015;
  text-align: left;
}

.cs-client-logo { height: 44px; margin-bottom: 1.75rem; filter: brightness(0) invert(1); }

.cs-quote-mark {
  font-size: 2.2rem;
  color: var(--teal);
  opacity: 0.5;
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
  color: var(--teal);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

// ─── Challenges (asymmetric row list, not card grid) ─────────────────
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
  color: var(--teal);
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
  background: rgba(32,178,170,0.1);
  border: 1px solid rgba(32,178,170,0.25);
  color: var(--teal-deep);
  font-weight: 800;
  font-size: 0.78rem;
  display: flex; align-items: center; justify-content: center;
}

.cs-insight {
  padding: 2.25rem 2rem;
  border-radius: 18px;
  background: linear-gradient(160deg, #0a1015, #0c2832);
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
  background: var(--teal);
  border: 3px solid var(--frost);
  box-shadow: 0 0 0 2px var(--teal);
  margin-top: 0.3rem;
  flex-shrink: 0;
}

.timeline-line {
  flex: 1;
  width: 2px;
  min-height: 44px;
  background: linear-gradient(180deg, var(--teal), rgba(32,178,170,0.15));
  margin-top: 0.25rem;
}

.timeline-body {
  padding-bottom: 2.25rem;
  h4 { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 0.4rem; }
  p { font-size: 0.9rem; color: #64748b; line-height: 1.75; margin: 0; }
}

// ─── Before / After ──────────────────────────────────────────────────
.cs-ba-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 860px) { grid-template-columns: 1fr; }
}

.cs-ba-card {
  padding: 2.25rem 2rem;
  border-radius: 18px;

  &--before { background: #0f172a; }
  &--after { background: linear-gradient(160deg, var(--midnight), #0c2832); }

  ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.85rem; }
  li {
    display: flex; gap: 0.65rem; align-items: flex-start;
    font-size: 0.88rem; color: rgba(255,255,255,0.75); line-height: 1.5;
    .material-symbols-outlined { font-size: 1.05rem; flex-shrink: 0; margin-top: 1px; }
  }
}

.cs-ba-card--before li .material-symbols-outlined { color: #f87171; }
.cs-ba-card--after li .material-symbols-outlined { color: var(--teal); }

.cs-ba-tag {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1.5rem;
}

// ─── Metrics strip (dominant moment) ──────────────────────────────────
.cs-metrics-strip {
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: #050a0d;
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
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
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
  border: 1px solid rgba(15,23,42,0.07);
  transition: transform 0.25s ease;
  &:hover { transform: translateY(-3px); }
}

.cs-swatch-chip { height: 70px; }

.cs-swatch-info {
  padding: 0.75rem;
  background: #fff;
  strong { display: block; font-size: 0.74rem; font-weight: 700; color: #0f172a; }
  code { display: block; font-size: 0.68rem; color: var(--teal-deep); font-family: monospace; margin: 0.1rem 0; }
  span { display: block; font-size: 0.66rem; color: #94a3b8; }
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
  border: 1px solid rgba(15,23,42,0.06);

  &--dark {
    background: #0a1015;
    .cs-type-eyebrow { color: var(--teal); }
    .cs-type-meta { color: rgba(255,255,255,0.35); }
  }
}

.cs-type-eyebrow {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--teal-deep);
  margin-bottom: 1.25rem;
}

.cs-type-sample-large { font-size: 2.1rem; font-weight: 800; color: #0f172a; line-height: 1; margin-bottom: 0.5rem; }
.cs-type-sample-med { font-size: 1.15rem; font-weight: 600; color: var(--teal-deep); margin-bottom: 0.5rem; }
.cs-type-sample-sm { font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem; }
.cs-type-body { color: rgba(255,255,255,0.65); font-size: 0.92rem; line-height: 1.8; margin-bottom: 1rem; }
.cs-type-meta { font-size: 0.72rem; color: #94a3b8; }

.cs-mockup-wrap {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(32,178,170,0.15);
  img { width: 100%; display: block; }
}

// ─── Testimonial ─────────────────────────────────────────────────────
.cs-testimonial {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}

.cs-testimonial-mark { font-size: 3.5rem; color: var(--gold); opacity: 0.7; display: block; margin-bottom: 1rem; }

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
  display: flex; gap: 1px; color: var(--gold);
  .material-symbols-outlined { font-size: 1rem; font-variation-settings: "FILL" 1; }
}

// ─── Tech grid ───────────────────────────────────────────────────────
.cs-tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(15,23,42,0.08);
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
}

.cs-tech-pill {
  display: flex;
  gap: 0.85rem;
  align-items: center;
  padding: 1.5rem;
  background: #fff;

  .material-symbols-outlined { font-size: 1.2rem; color: var(--teal-deep); flex-shrink: 0; }
  strong { display: block; font-size: 0.85rem; font-weight: 700; color: #0f172a; }
  span { display: block; font-size: 0.74rem; color: #94a3b8; }
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
  &--highlight { background: linear-gradient(160deg, #0a1015, #0c2832); border-color: transparent; h4, p { color: #fff !important; } .material-symbols-outlined { color: var(--gold); } }

  .material-symbols-outlined { font-size: 1.5rem; color: var(--teal-deep); }
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