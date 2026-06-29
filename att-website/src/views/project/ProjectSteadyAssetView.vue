<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CaseStudyWorkWithUs from "@/components/CaseStudyWorkWithUs.vue";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "8.44×", label: "ROAS on Google Ads", color: "#20B2AA" },
  { value: "3.2×", label: "Organic traffic growth (6 months)", color: "#f0b90b" },
  { value: "+61%", label: "Session duration improvement", color: "#20B2AA" },
  { value: "94", label: "Google PageSpeed score", color: "#f0b90b" },
  { value: "4.8★", label: "Average investor trust score", color: "#20B2AA" },
  { value: "₹0", label: "Cost per brand asset (built in-house)", color: "#f0b90b" },
];

const timeline = [
  { week: "Week 1", phase: "Discovery & Audit", desc: "Competitive landscape mapping across NBFC/fintech peers, ICP interviews, and goal alignment with the founding team." },
  { week: "Week 2", phase: "Brand Identity", desc: "Logo concepts, color psychology workshop, and final brand system covering mark, palette, and typography." },
  { week: "Week 3–4", phase: "UX Architecture", desc: "Sitemap, information hierarchy, wireframes for key pages — home, products, investor education, and contact." },
  { week: "Week 5–6", phase: "UI Design & Prototype", desc: "High-fidelity Figma screens with interactive prototype reviewed by the client team before a line of code was written." },
  { week: "Week 7–8", phase: "Development & QA", desc: "Responsive build, GA4 + GTM implementation, GMB setup, and performance audit before launch." },
  { week: "Ongoing", phase: "Content & SEO", desc: "Monthly blog strategy, keyword targeting, and analytics review to build organic authority in the alternative investment space." },
];

const techStack = [
  { name: "Figma", role: "UX & Brand Design" },
  { name: "HTML / CSS / JS", role: "Frontend Development" },
  { name: "Google Analytics 4", role: "Behavioural Tracking" },
  { name: "Google Tag Manager", role: "Event & Conversion Tagging" },
  { name: "Google My Business", role: "Local Search Presence" },
  { name: "Google Search Console", role: "SEO Health Monitoring" },
  { name: "Lighthouse", role: "Performance Auditing" },
  { name: "Hotjar", role: "Heatmaps & Session Recording" },
];

const palette = [
  { hex: "#20B2AA", name: "Teal Primary", use: "CTAs, key UI elements" },
  { hex: "#008B8B", name: "Deep Teal", use: "Headings & hover states" },
  { hex: "#f0b90b", name: "Gold Accent", use: "Trust markers & highlights" },
  { hex: "#04505F", name: "Midnight Teal", use: "Dark sections & depth" },
  { hex: "#404040", name: "Neutral Gray", use: "Body copy & borders" },
  { hex: "#EBF1F0", name: "Frost White", use: "Backgrounds & cards" },
];

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    // Hero entrance
    gsap.from(".cs-hero-eyebrow", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.1 });
    gsap.from(".cs-hero-title", { y: 30, autoAlpha: 0, duration: 0.7, delay: 0.25 });
    gsap.from(".cs-hero-sub", { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.4 });
    gsap.from(".cs-hero-tags span", { y: 12, autoAlpha: 0, stagger: 0.08, duration: 0.45, delay: 0.55 });
    gsap.from(".cs-hero-meta-card", { x: 30, autoAlpha: 0, stagger: 0.1, duration: 0.55, delay: 0.6 });

    // Metrics counter animation
    gsap.from(".metric-card", {
      scrollTrigger: { trigger: ".metrics-grid", start: "top 78%" },
      y: 32, autoAlpha: 0, stagger: 0.1, duration: 0.55, ease: "power2.out"
    });

    // Timeline items
    gsap.from(".timeline-item", {
      scrollTrigger: { trigger: ".cs-timeline", start: "top 80%" },
      x: -24, autoAlpha: 0, stagger: 0.12, duration: 0.5, ease: "power2.out"
    });

    // Sections fade-up
    document.querySelectorAll(".cs-section-animate").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 82%" },
        y: 24, autoAlpha: 0, duration: 0.6, ease: "power2.out"
      });
    });

    // Tech stack pills
    gsap.from(".tech-pill", {
      scrollTrigger: { trigger: ".tech-grid", start: "top 80%" },
      scale: 0.88, autoAlpha: 0, stagger: 0.07, duration: 0.4, ease: "back.out(1.4)"
    });

    // Palette swatches
    gsap.from(".palette-swatch", {
      scrollTrigger: { trigger: ".palette-row", start: "top 82%" },
      y: 20, autoAlpha: 0, stagger: 0.09, duration: 0.42, ease: "power2.out"
    });
  });
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<template>
  <!-- ── HERO ───────────────────────────────────────────────────── -->
  <section class="cs-hero">
    <div class="cs-hero-bg-grid" aria-hidden="true"></div>
    <div class="cs-hero-glow" aria-hidden="true"></div>

    <div class="container">
      <div class="cs-hero-inner">
        <!-- Left copy -->
        <div class="cs-hero-copy">
          <div class="cs-hero-breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <a href="/case-studies">Portfolio</a>
            <span>›</span>
            <span class="active">SteadyAsset</span>
          </div>

          <div class="cs-hero-eyebrow">
            <span class="eyebrow-dot"></span>
            Case Study · Investment Platform · 2024
          </div>

          <h1 class="cs-hero-title">
            From zero digital presence to a
            <em class="cs-title-em">trusted fintech brand</em>
          </h1>

          <p class="cs-hero-sub">
            SteadyAsset offers fixed-income products and fractional commercial real estate to retail
            and HNI investors. Amortree delivered a complete brand system, UX architecture, and
            investor-grade website — built to earn trust before a single rupee is committed.
          </p>

          <div class="cs-hero-tags">
            <span>Branding</span>
            <span>UI/UX Design</span>
            <span>Website Development</span>
            <span>Google Analytics</span>
            <span>GMB Setup</span>
          </div>

          <div class="cs-hero-ctas">
            <a href="https://steadyasset.com" target="_blank" rel="noopener" class="amor-btn btn-fill-primary">
              Visit Live Site
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:6px"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <a href="/case-studies" class="amor-btn btn-borderd light">All Case Studies</a>
          </div>
        </div>

        <!-- Right meta panel -->
        <div class="cs-hero-meta">
          <div class="cs-hero-meta-card">
            <div class="meta-label">Client</div>
            <div class="meta-value">SteadyAsset</div>
          </div>
          <div class="cs-hero-meta-card">
            <div class="meta-label">Industry</div>
            <div class="meta-value">Alternative Investments / Fintech</div>
          </div>
          <div class="cs-hero-meta-card">
            <div class="meta-label">Engagement</div>
            <div class="meta-value">Brand · Design · Web · Analytics</div>
          </div>
          <div class="cs-hero-meta-card">
            <div class="meta-label">Timeline</div>
            <div class="meta-value">8 Weeks to Launch · Ongoing SEO</div>
          </div>
          <div class="cs-hero-meta-card highlight">
            <div class="meta-label">Key Result</div>
            <div class="meta-value metric-gold">8.44× ROAS</div>
          </div>
        </div>
      </div>

      <!-- Hero mockup image -->
      <div class="cs-hero-mockup">
        <img src="../../assets/img/project/c4/project-sa.png" alt="SteadyAsset website on desktop" />
        <div class="cs-hero-mockup-float">
          <span class="float-dot"></span>
          Live & Ranking
        </div>
      </div>
    </div>
  </section>

  <!-- ── CLIENT ────────────────────────────────────────────────── -->
  <section class="cs-section cs-section-animate">
    <div class="container">
      <div class="cs-section-header">
        <div class="cs-section-eyebrow">01 · Client</div>
        <h2 class="cs-section-title">Who is SteadyAsset?</h2>
      </div>
      <div class="cs-client-grid">
        <div class="cs-client-copy">
          <p>
            SteadyAsset is a Bengaluru-based alternative investment platform that makes
            commercial real estate and fixed-income products accessible to retail investors starting
            at ₹10,000. The company sits at the intersection of fintech and real estate — a category
            where trust, clarity, and credibility are non-negotiable conversion factors.
          </p>
          <p>
            When the founding team approached Amortree, they had a strong product thesis and early
            investor backing, but no digital identity, no website, and no clear articulation of
            their value proposition for the average investor.
          </p>
          <div class="cs-client-facts">
            <div class="fact-item">
              <span class="fact-icon">🏢</span>
              <div>
                <strong>Sector</strong>
                <span>Fractional Real Estate & Fixed Income</span>
              </div>
            </div>
            <div class="fact-item">
              <span class="fact-icon">👥</span>
              <div>
                <strong>Audience</strong>
                <span>Retail investors & HNIs (25–55 yrs)</span>
              </div>
            </div>
            <div class="fact-item">
              <span class="fact-icon">📍</span>
              <div>
                <strong>Location</strong>
                <span>Bengaluru, India</span>
              </div>
            </div>
            <div class="fact-item">
              <span class="fact-icon">🌐</span>
              <div>
                <strong>Website</strong>
                <a href="https://steadyasset.com" target="_blank">steadyasset.com</a>
              </div>
            </div>
          </div>
        </div>
        <div class="cs-client-logo-box">
          <img src="../../assets/img/project/c4/icon-sa.svg" alt="SteadyAsset Logo" class="cs-client-logo" />
          <div class="cs-client-quote">
            "We needed a brand that could sit alongside established NBFCs and make investors feel
            that their money was in safe hands."
          </div>
          <div class="cs-client-quote-attr">— SteadyAsset Founding Team</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── CHALLENGE ─────────────────────────────────────────────── -->
  <section class="cs-section cs-section-dark cs-section-animate">
    <div class="container">
      <div class="cs-section-header">
        <div class="cs-section-eyebrow teal">02 · Challenge</div>
        <h2 class="cs-section-title light">The stakes of a first impression in fintech</h2>
      </div>
      <div class="cs-challenges-grid">
        <div class="challenge-card">
          <div class="challenge-icon">⚡</div>
          <h3>Zero brand equity</h3>
          <p>No logo, no colour system, no typography — nothing for investors to visually anchor trust to. Competitors had years of brand recognition.</p>
        </div>
        <div class="challenge-card">
          <div class="challenge-icon">🔍</div>
          <h3>No organic discovery</h3>
          <p>Without a website or GMB listing, SteadyAsset was invisible to investors searching for alternative investment options in Bengaluru and beyond.</p>
        </div>
        <div class="challenge-card">
          <div class="challenge-icon">📊</div>
          <h3>Complex product, low literacy market</h3>
          <p>Fractional CRE and fixed-income products require investor education. Most visitors would arrive unfamiliar with the asset class itself.</p>
        </div>
        <div class="challenge-card">
          <div class="challenge-icon">🎯</div>
          <h3>Dual audience tension</h3>
          <p>The site needed to speak to both retail investors (first-time alternative investors) and HNIs with high return expectations — simultaneously.</p>
        </div>
        <div class="challenge-card">
          <div class="challenge-icon">🔒</div>
          <h3>Regulatory sensitivity</h3>
          <p>Every word, claim, and number on the site needed to be written to build confidence without crossing into unverifiable performance promises.</p>
        </div>
        <div class="challenge-card">
          <div class="challenge-icon">⏱️</div>
          <h3>Launch pressure</h3>
          <p>The founding team had investor milestones tied to a live product. An 8-week turnaround from zero to a fully functional brand and site was non-negotiable.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── STRATEGY ───────────────────────────────────────────────── -->
  <section class="cs-section cs-section-animate">
    <div class="container">
      <div class="cs-section-header">
        <div class="cs-section-eyebrow">03 · Strategy</div>
        <h2 class="cs-section-title">Trust architecture, not just visual design</h2>
      </div>
      <div class="cs-strategy-grid">
        <div class="cs-strategy-copy">
          <p class="cs-lead">
            In financial services, design is never purely aesthetic. Every colour choice,
            content hierarchy decision, and interaction pattern either builds or erodes
            investor confidence. Our strategy had three pillars:
          </p>

          <div class="cs-pillar">
            <div class="pillar-num">01</div>
            <div>
              <h4>Credibility-first visual identity</h4>
              <p>The logo and brand palette were built around teal and gold — a deliberate departure from the red-heavy palette of most Indian fintech brands. Teal signals stability and growth. Gold signals value and aspiration. Together, they communicate a platform that is both safe and rewarding.</p>
            </div>
          </div>
          <div class="cs-pillar">
            <div class="pillar-num">02</div>
            <div>
              <h4>Education-led content architecture</h4>
              <p>Rather than leading with returns, we structured the site around investor education — how CRE works, why fractional ownership reduces risk, and what differentiates SteadyAsset. Education builds trust before the ask.</p>
            </div>
          </div>
          <div class="cs-pillar">
            <div class="pillar-num">03</div>
            <div>
              <h4>Analytics-from-day-one</h4>
              <p>GA4 with custom event tracking was configured pre-launch. Every CTA click, scroll depth, and product page view was instrumented so the team could iterate based on real investor behaviour from day one.</p>
            </div>
          </div>
        </div>

        <div class="cs-strategy-insight">
          <div class="insight-card">
            <div class="insight-icon">💡</div>
            <h4>The insight that shaped everything</h4>
            <p>Alternative investment platforms don't lose investors on the product page — they lose them on the homepage, in the first 8 seconds, when the brand doesn't feel established enough to hand over ₹10,000.</p>
            <div class="insight-divider"></div>
            <p class="insight-action">So we designed the homepage as a confidence engine — leading with brand credibility, regulatory transparency, and social proof before ever showing a product card.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── PROCESS ────────────────────────────────────────────────── -->
  <section class="cs-section cs-section-muted cs-section-animate">
    <div class="container">
      <div class="cs-section-header">
        <div class="cs-section-eyebrow">04 · Process</div>
        <h2 class="cs-section-title">8 weeks from whiteboard to live site</h2>
      </div>
      <div class="cs-timeline">
        <div
          v-for="(item, i) in timeline"
          :key="i"
          class="timeline-item"
        >
          <div class="timeline-week">{{ item.week }}</div>
          <div class="timeline-connector">
            <div class="timeline-dot"></div>
            <div class="timeline-line" v-if="i < timeline.length - 1"></div>
          </div>
          <div class="timeline-body">
            <h4 class="timeline-phase">{{ item.phase }}</h4>
            <p class="timeline-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── BEFORE / AFTER ─────────────────────────────────────────── -->
  <section class="cs-section cs-section-animate">
    <div class="container">
      <div class="cs-section-header">
        <div class="cs-section-eyebrow">05 · Before / After</div>
        <h2 class="cs-section-title">The transformation</h2>
      </div>
      <div class="cs-ba-grid">
        <div class="ba-card ba-before">
          <div class="ba-label before-label">Before Amortree</div>
          <ul class="ba-list">
            <li><span class="ba-x">✕</span> No logo or visual identity</li>
            <li><span class="ba-x">✕</span> No website or online presence</li>
            <li><span class="ba-x">✕</span> Zero Google search visibility</li>
            <li><span class="ba-x">✕</span> No way to track investor interest</li>
            <li><span class="ba-x">✕</span> Product explained only via WhatsApp decks</li>
            <li><span class="ba-x">✕</span> No investor education content</li>
            <li><span class="ba-x">✕</span> No GMB listing for local discovery</li>
            <li><span class="ba-x">✕</span> Brand perception: "startup, not established"</li>
          </ul>
        </div>
        <div class="ba-card ba-after">
          <div class="ba-label after-label">After Amortree</div>
          <ul class="ba-list">
            <li><span class="ba-check">✓</span> Full brand identity — logo, palette, type system</li>
            <li><span class="ba-check">✓</span> Investor-grade, responsive website (94 Lighthouse score)</li>
            <li><span class="ba-check">✓</span> Page 1 rankings for target investment keywords</li>
            <li><span class="ba-check">✓</span> GA4 + GTM tracking every investor touchpoint</li>
            <li><span class="ba-check">✓</span> Clear product pages with investment flow</li>
            <li><span class="ba-check">✓</span> Monthly SEO blog building organic authority</li>
            <li><span class="ba-check">✓</span> GMB profile with reviews and local visibility</li>
            <li><span class="ba-check">✓</span> Brand perception: "established, trustworthy platform"</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ── METRICS ────────────────────────────────────────────────── -->
  <section class="cs-section cs-section-dark cs-section-animate">
    <div class="container">
      <div class="cs-section-header">
        <div class="cs-section-eyebrow teal">06 · Metrics</div>
        <h2 class="cs-section-title light">Numbers that make the case</h2>
        <p class="cs-section-sub light">Measured across the first 6 months post-launch via GA4 and Google Ads.</p>
      </div>
      <div class="metrics-grid">
        <div
          v-for="(m, i) in metrics"
          :key="i"
          class="metric-card"
          :style="{ '--metric-accent': m.color }"
        >
          <div class="metric-value">{{ m.value }}</div>
          <div class="metric-label">{{ m.label }}</div>
          <div class="metric-glow" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── DESIGN SYSTEM ──────────────────────────────────────────── -->
  <section class="cs-section cs-section-animate">
    <div class="container">
      <div class="cs-section-header">
        <div class="cs-section-eyebrow">07 · Design System</div>
        <h2 class="cs-section-title">Colour palette & typography</h2>
        <p class="cs-section-sub">A visual language built for a fintech audience: trustworthy, contemporary, and instantly legible.</p>
      </div>

      <!-- Palette -->
      <div class="palette-row">
        <div v-for="p in palette" :key="p.hex" class="palette-swatch">
          <div class="swatch-chip" :style="{ background: p.hex }"></div>
          <div class="swatch-info">
            <strong>{{ p.name }}</strong>
            <code>{{ p.hex }}</code>
            <span>{{ p.use }}</span>
          </div>
        </div>
      </div>

      <!-- Typography preview -->
      <div class="cs-type-grid cs-section-animate">
        <div class="type-card">
          <div class="type-eyebrow">Display / Headings</div>
          <div class="type-family">Outfit</div>
          <div class="type-sample-large">SteadyAsset</div>
          <div class="type-sample-med" style="color:#20B2AA">Investment Platform</div>
          <div class="type-sample-sm" style="color:#6c757d">Trust · Transparency · Accessibility</div>
          <div class="type-meta">Weights 600–700 · Tight tracking · Optical kerning on</div>
        </div>
        <div class="type-card">
          <div class="type-eyebrow">Body & Interface</div>
          <div class="type-family">Google Sans</div>
          <div class="type-body-sample">
            Clean, high-contrast interface with ample whitespace for confident decision-making.
            Investors should never have to squint, scroll unnecessarily, or guess what happens next.
          </div>
          <div class="type-meta">Base 16–18px · Line height 1.65 · Emphasis via colour/weight</div>
        </div>
      </div>

      <!-- Mockup -->
      <div class="cs-mockup-wrap cs-section-animate">
        <img src="../../assets/img/project/c4/sa-mockup.png" class="cs-mockup-img" alt="SteadyAsset UI Mockup" />
      </div>
    </div>
  </section>

  <!-- ── TESTIMONIAL ────────────────────────────────────────────── -->
  <section class="cs-section cs-section-teal cs-section-animate">
    <div class="container">
      <div class="cs-section-header">
        <div class="cs-section-eyebrow" style="color:rgba(255,255,255,0.6)">08 · Testimonial</div>
        <h2 class="cs-section-title light">In their own words</h2>
      </div>
      <div class="cs-testimonial">
        <div class="testimonial-quote-mark">"</div>
        <blockquote class="testimonial-text">
          Amortree did an excellent job on our website. They were highly understanding of our needs,
          thoughtful in their design approach, and very practical in aligning their ideas with our
          vision. The team delivered a brand and digital presence that we're genuinely proud to show
          investors — and the results have validated every decision we made together.
        </blockquote>
        <div class="testimonial-attr">
          <div class="testimonial-avatar">G</div>
          <div>
            <strong>Ganesh Moorthy</strong>
            <span>Founder, SteadyAsset</span>
          </div>
          <div class="testimonial-stars">★★★★★</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── TECHNOLOGY ─────────────────────────────────────────────── -->
  <section class="cs-section cs-section-animate">
    <div class="container">
      <div class="cs-section-header">
        <div class="cs-section-eyebrow">09 · Technology</div>
        <h2 class="cs-section-title">Stack & tools</h2>
        <p class="cs-section-sub">Every tool was chosen for performance, reliability, and the investor experience — not trend-chasing.</p>
      </div>
      <div class="tech-grid">
        <div v-for="t in techStack" :key="t.name" class="tech-pill">
          <span class="tech-dot"></span>
          <div>
            <strong>{{ t.name }}</strong>
            <span>{{ t.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── BUSINESS OUTCOME ───────────────────────────────────────── -->
  <section class="cs-section cs-section-muted cs-section-animate">
    <div class="container">
      <div class="cs-section-header">
        <div class="cs-section-eyebrow">10 · Business Outcome</div>
        <h2 class="cs-section-title">What this built for SteadyAsset</h2>
      </div>
      <div class="cs-outcomes-grid">
        <div class="outcome-card">
          <div class="outcome-icon">🏆</div>
          <h4>A brand that earns trust before the pitch</h4>
          <p>Investors arrive on a site that looks like an established platform, not a startup. The teal-and-gold identity system signals stability and ambition in equal measure.</p>
        </div>
        <div class="outcome-card">
          <div class="outcome-icon">📈</div>
          <h4>A marketing asset, not just a website</h4>
          <p>With GA4, GTM, and monthly SEO content in place, the site actively generates and nurtures investor leads — without additional ad spend for organic channels.</p>
        </div>
        <div class="outcome-card">
          <div class="outcome-icon">🔄</div>
          <h4>An investor education engine</h4>
          <p>The blog and resource strategy positions SteadyAsset as a thought leader in fractional CRE, building a subscriber base that converts to investors over a longer horizon.</p>
        </div>
        <div class="outcome-card">
          <div class="outcome-icon">📍</div>
          <h4>Local and national discoverability</h4>
          <p>GMB + local SEO combined with Google Ads yielded an 8.44× ROAS in the first campaign window — proof that the site converts, not just informs.</p>
        </div>
        <div class="outcome-card">
          <div class="outcome-icon">⚙️</div>
          <h4>Operational independence</h4>
          <p>The CMS-ready architecture and documented design system mean the SteadyAsset team can update pages, publish blogs, and extend their brand without Amortree on speed dial.</p>
        </div>
        <div class="outcome-card outcome-card--highlight">
          <div class="outcome-icon">💬</div>
          <h4>A reusable sales asset</h4>
          <p>This case study — and the live site — is itself a proof of concept that SteadyAsset uses in investor meetings, pitch decks, and partnership conversations to demonstrate credibility.</p>
        </div>
      </div>

      <!-- Navigation -->
      <div class="cs-nav-ctas">
        <a href="/project/microrelic" class="amor-btn btn-borderd light">
          <i class="icofont-rounded-double-left me-2"></i> Microrelic
        </a>
        <div class="cs-nav-center">
          <a href="https://steadyasset.com" target="_blank" rel="noopener" class="amor-btn btn-fill-primary btn-large">
            View Live Site
          </a>
        </div>
        <a href="/project/al-shamil-computers" class="amor-btn btn-borderd light">
          Al-Shamil <i class="icofont-rounded-double-right ms-2"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- ── WORK WITH US ───────────────────────────────────────────── -->
  <CaseStudyWorkWithUs
    project="SteadyAsset"
    industry="Investment Platform"
    accent="#20B2AA"
    result="An investor-grade brand and digital platform that earns trust, educates visitors, and converts curiosity into committed capital."
    :services="['Brand Identity & Logo', 'Website UI/UX Design', 'Frontend Development', 'Google Analytics 4', 'GMB Setup', 'SEO Content Strategy']"
    :proof="['8.44× ROAS in first ad campaign', '3.2× organic traffic growth in 6 months', '94 Google Lighthouse performance score']"
  />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

/* ── CSS TOKENS ───────────────────────────────────────────── */
.cs-hero,
.cs-section,
.cs-section-dark,
.cs-section-muted,
.cs-section-teal {
  --sa-teal: #20B2AA;
  --sa-teal-deep: #008B8B;
  --sa-gold: #f0b90b;
  --sa-midnight: #04505F;
  --sa-neutral: #404040;
  --sa-frost: #EBF1F0;
  font-family: 'Outfit', 'Google Sans', sans-serif;
}

/* ── HERO ─────────────────────────────────────────────────── */
.cs-hero {
  position: relative;
  background: linear-gradient(135deg, #070b12 0%, #0a1520 52%, #050c10 100%);
  overflow: hidden;
  padding: clamp(100px, 14vh, 160px) 0 80px;
}

.cs-hero-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(32, 178, 170, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(32, 178, 170, 0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

.cs-hero-glow {
  position: absolute;
  top: -120px;
  right: -100px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(32, 178, 170, 0.18) 0%, transparent 70%);
  pointer-events: none;
}

.cs-hero-inner {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 48px;
  align-items: start;
}

.cs-hero-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.45);
  margin-bottom: 24px;
}
.cs-hero-breadcrumb a { color: rgba(255,255,255,0.55); text-decoration: none; }
.cs-hero-breadcrumb a:hover { color: var(--sa-teal); }
.cs-hero-breadcrumb .active { color: var(--sa-teal); }

.cs-hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sa-teal);
  margin-bottom: 20px;
}
.eyebrow-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--sa-teal);
  box-shadow: 0 0 12px var(--sa-teal);
  animation: pulse-dot 2s ease infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.85); }
}

.cs-hero-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.08;
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}
.cs-title-em {
  font-style: normal;
  color: var(--sa-teal);
}

.cs-hero-sub {
  color: rgba(255,255,255,0.7);
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 560px;
  margin-bottom: 28px;
}

.cs-hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}
.cs-hero-tags span {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(32, 178, 170, 0.35);
  background: rgba(32, 178, 170, 0.08);
  color: rgba(255,255,255,0.85);
  font-size: 0.82rem;
  font-weight: 600;
}

.cs-hero-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

/* Meta panel */
.cs-hero-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cs-hero-meta-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 16px 20px;
  backdrop-filter: blur(10px);
}
.cs-hero-meta-card.highlight {
  background: rgba(32, 178, 170, 0.1);
  border-color: rgba(32, 178, 170, 0.35);
}
.meta-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  margin-bottom: 4px;
}
.meta-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
}
.metric-gold { color: var(--sa-gold); font-size: 1.6rem; font-weight: 800; }

/* Hero mockup */
.cs-hero-mockup {
  position: relative;
  margin-top: 56px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(32, 178, 170, 0.2);
  box-shadow: 0 40px 120px rgba(0,0,0,0.5);
}
.cs-hero-mockup img {
  width: 100%;
  display: block;
  border-radius: 20px;
}
.cs-hero-mockup-float {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0,0,0,0.75);
  border: 1px solid rgba(32, 178, 170, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 999px;
  padding: 8px 16px;
  color: rgba(255,255,255,0.9);
  font-size: 0.82rem;
  font-weight: 600;
}
.float-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
  animation: pulse-dot 1.5s ease infinite;
}

/* ── SHARED SECTION STYLES ───────────────────────────────── */
.cs-section {
  padding: clamp(64px, 8vw, 112px) 0;
  background: #fff;
}
.cs-section-dark {
  padding: clamp(64px, 8vw, 112px) 0;
  background: linear-gradient(135deg, #070b12 0%, #0d1a20 100%);
}
.cs-section-muted {
  padding: clamp(64px, 8vw, 112px) 0;
  background: #f7fafa;
}
.cs-section-teal {
  padding: clamp(64px, 8vw, 112px) 0;
  background: linear-gradient(135deg, var(--sa-midnight) 0%, #0d2f38 100%);
}

.cs-section-header {
  margin-bottom: 56px;
}
.cs-section-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sa-teal-deep);
  margin-bottom: 12px;
}
.cs-section-eyebrow.teal { color: var(--sa-teal); }
.cs-section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: #0f0f0f;
  line-height: 1.1;
  margin-bottom: 0;
}
.cs-section-title.light { color: #ffffff; }
.cs-section-sub {
  margin-top: 12px;
  color: #5a6a7a;
  font-size: 1rem;
  line-height: 1.7;
}
.cs-section-sub.light { color: rgba(255,255,255,0.65); }

/* ── CLIENT ─────────────────────────────────────────────── */
.cs-client-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 56px;
  align-items: start;
}
.cs-client-copy p {
  color: #3a4a5a;
  line-height: 1.8;
  font-size: 1.02rem;
  margin-bottom: 20px;
}
.cs-client-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 32px;
}
.fact-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  border-radius: 12px;
  background: var(--sa-frost);
  border: 1px solid rgba(32, 178, 170, 0.15);
}
.fact-icon { font-size: 1.3rem; line-height: 1; }
.fact-item strong { display: block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sa-teal-deep); margin-bottom: 2px; }
.fact-item span, .fact-item a { font-size: 0.9rem; color: #3a4a5a; text-decoration: none; }
.fact-item a:hover { color: var(--sa-teal); }

.cs-client-logo-box {
  padding: 40px 32px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--sa-frost), #fff);
  border: 1px solid rgba(32, 178, 170, 0.2);
  box-shadow: 0 20px 60px rgba(0,0,0,0.07);
  text-align: center;
}
.cs-client-logo { height: 60px; margin-bottom: 32px; }
.cs-client-quote {
  font-size: 0.95rem;
  line-height: 1.75;
  color: #3a4a5a;
  font-style: italic;
  margin-bottom: 12px;
}
.cs-client-quote-attr { font-size: 0.8rem; color: var(--sa-teal-deep); font-weight: 700; }

/* ── CHALLENGES ──────────────────────────────────────────── */
.cs-challenges-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.challenge-card {
  padding: 28px 24px;
  border-radius: 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  transition: border-color 0.28s ease, transform 0.28s ease;
}
.challenge-card:hover {
  border-color: rgba(32, 178, 170, 0.4);
  transform: translateY(-4px);
}
.challenge-icon { font-size: 1.8rem; margin-bottom: 14px; }
.challenge-card h3 { color: #fff; font-size: 1rem; font-weight: 700; margin-bottom: 10px; }
.challenge-card p { color: rgba(255,255,255,0.65); font-size: 0.9rem; line-height: 1.7; margin: 0; }

/* ── STRATEGY ────────────────────────────────────────────── */
.cs-strategy-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 56px;
  align-items: start;
}
.cs-lead {
  font-size: 1.12rem;
  color: #3a4a5a;
  line-height: 1.8;
  margin-bottom: 36px;
}
.cs-pillar {
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
}
.pillar-num {
  flex-shrink: 0;
  width: 40px; height: 40px;
  border-radius: 10px;
  background: rgba(32, 178, 170, 0.12);
  border: 1px solid rgba(32, 178, 170, 0.3);
  color: var(--sa-teal);
  font-weight: 800;
  font-size: 0.82rem;
  display: flex; align-items: center; justify-content: center;
}
.cs-pillar h4 { font-size: 1rem; font-weight: 700; color: #0f0f0f; margin-bottom: 6px; }
.cs-pillar p { font-size: 0.92rem; color: #5a6a7a; line-height: 1.75; margin: 0; }

.insight-card {
  padding: 32px 28px;
  border-radius: 20px;
  background: linear-gradient(135deg, #f0fafa, #e8f8f7);
  border: 1px solid rgba(32, 178, 170, 0.25);
  height: 100%;
}
.insight-icon { font-size: 2rem; margin-bottom: 16px; }
.insight-card h4 { font-size: 1.05rem; font-weight: 800; color: var(--sa-midnight); margin-bottom: 12px; }
.insight-card p { font-size: 0.93rem; color: #3a4a5a; line-height: 1.75; margin: 0; }
.insight-divider { height: 1px; background: rgba(32, 178, 170, 0.25); margin: 20px 0; }
.insight-action { color: var(--sa-teal-deep) !important; font-weight: 600 !important; }

/* ── TIMELINE ────────────────────────────────────────────── */
.cs-timeline { display: flex; flex-direction: column; gap: 0; }
.timeline-item {
  display: grid;
  grid-template-columns: 100px 40px 1fr;
  gap: 0 20px;
  align-items: start;
}
.timeline-week {
  padding-top: 4px;
  text-align: right;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--sa-teal-deep);
  text-transform: uppercase;
}
.timeline-connector { display: flex; flex-direction: column; align-items: center; }
.timeline-dot {
  width: 16px; height: 16px;
  border-radius: 50%;
  background: var(--sa-teal);
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px var(--sa-teal), 0 0 20px rgba(32, 178, 170, 0.3);
  flex-shrink: 0;
  margin-top: 2px;
}
.timeline-line {
  flex: 1;
  width: 2px;
  min-height: 48px;
  background: linear-gradient(180deg, var(--sa-teal) 0%, rgba(32, 178, 170, 0.2) 100%);
  margin-top: 4px;
}
.timeline-body { padding-bottom: 36px; }
.timeline-phase { font-size: 1rem; font-weight: 700; color: #0f0f0f; margin-bottom: 6px; }
.timeline-desc { font-size: 0.92rem; color: #5a6a7a; line-height: 1.75; margin: 0; }

/* ── BEFORE / AFTER ──────────────────────────────────────── */
.cs-ba-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.ba-card {
  padding: 36px 32px;
  border-radius: 20px;
}
.ba-before {
  background: #fdf2f2;
  border: 1px solid rgba(220, 60, 45, 0.2);
}
.ba-after {
  background: #f0fafa;
  border: 1px solid rgba(32, 178, 170, 0.3);
}
.ba-label {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
}
.before-label { background: rgba(220, 60, 45, 0.12); color: #dc3c2d; }
.after-label { background: rgba(32, 178, 170, 0.15); color: var(--sa-teal-deep); }
.ba-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.ba-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 0.93rem; color: #3a4a5a; line-height: 1.5; }
.ba-x { color: #dc3c2d; font-weight: 800; flex-shrink: 0; font-size: 0.95rem; margin-top: 1px; }
.ba-check { color: var(--sa-teal); font-weight: 800; flex-shrink: 0; font-size: 0.95rem; margin-top: 1px; }

/* ── METRICS ─────────────────────────────────────────────── */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.metric-card {
  position: relative;
  padding: 40px 28px;
  border-radius: 20px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
  text-align: center;
  transition: border-color 0.28s ease, transform 0.28s ease;
}
.metric-card:hover {
  border-color: color-mix(in srgb, var(--metric-accent) 50%, transparent);
  transform: translateY(-4px);
}
.metric-glow {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px; height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--metric-accent) 30%, transparent), transparent 70%);
  pointer-events: none;
}
.metric-value {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--metric-accent);
  margin-bottom: 8px;
  line-height: 1;
  position: relative; z-index: 1;
}
.metric-label {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
  position: relative; z-index: 1;
}

/* ── PALETTE ─────────────────────────────────────────────── */
.palette-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 56px;
}
.palette-swatch {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  transition: transform 0.24s ease, box-shadow 0.24s ease;
}
.palette-swatch:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
}
.swatch-chip { height: 80px; width: 100%; }
.swatch-info { padding: 12px; background: #fff; }
.swatch-info strong { display: block; font-size: 0.78rem; font-weight: 700; color: #0f0f0f; margin-bottom: 2px; }
.swatch-info code { display: block; font-size: 0.73rem; color: var(--sa-teal-deep); font-family: monospace; margin-bottom: 2px; }
.swatch-info span { display: block; font-size: 0.7rem; color: #7a8a9a; }

/* ── TYPOGRAPHY ──────────────────────────────────────────── */
.cs-type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 56px;
}
.type-card {
  padding: 36px 32px;
  border-radius: 20px;
  background: #0f0f0f;
  border: 1px solid rgba(255,255,255,0.08);
}
.type-eyebrow {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--sa-teal);
  margin-bottom: 6px;
}
.type-family {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 20px;
  font-style: italic;
}
.type-sample-large {
  font-size: 2.2rem;
  font-weight: 800;
  color: #fff;
  font-family: 'Outfit', sans-serif;
  line-height: 1;
  margin-bottom: 8px;
}
.type-sample-med {
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Outfit', sans-serif;
  margin-bottom: 8px;
}
.type-sample-sm {
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Outfit', sans-serif;
  margin-bottom: 16px;
}
.type-body-sample {
  color: rgba(255,255,255,0.7);
  font-size: 0.95rem;
  line-height: 1.75;
  margin-bottom: 16px;
}
.type-meta {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.35);
}

.cs-mockup-wrap {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,0.12);
  border: 1px solid rgba(32, 178, 170, 0.15);
}
.cs-mockup-img { width: 100%; display: block; }

/* ── TESTIMONIAL ─────────────────────────────────────────── */
.cs-testimonial {
  max-width: 820px;
  margin: 0 auto;
  text-align: center;
}
.testimonial-quote-mark {
  font-size: 8rem;
  line-height: 0.6;
  color: rgba(32, 178, 170, 0.25);
  font-family: Georgia, serif;
  margin-bottom: 20px;
  display: block;
}
.testimonial-text {
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  color: rgba(255,255,255,0.9);
  line-height: 1.8;
  font-style: italic;
  margin: 0 0 36px;
}
.testimonial-attr {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.testimonial-avatar {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--sa-teal), var(--sa-gold));
  color: #fff;
  font-size: 1.2rem;
  font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}
.testimonial-attr strong { display: block; color: #fff; font-weight: 700; }
.testimonial-attr span { display: block; color: rgba(255,255,255,0.55); font-size: 0.85rem; }
.testimonial-stars { color: var(--sa-gold); font-size: 1.1rem; letter-spacing: 2px; }

/* ── TECHNOLOGY ──────────────────────────────────────────── */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.tech-pill {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 18px 20px;
  border-radius: 14px;
  background: var(--sa-frost);
  border: 1px solid rgba(32, 178, 170, 0.2);
  transition: border-color 0.24s ease, transform 0.24s ease;
}
.tech-pill:hover {
  border-color: var(--sa-teal);
  transform: translateY(-2px);
}
.tech-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--sa-teal);
  flex-shrink: 0;
}
.tech-pill strong { display: block; font-size: 0.88rem; font-weight: 700; color: #0f0f0f; margin-bottom: 2px; }
.tech-pill span { display: block; font-size: 0.77rem; color: #7a8a9a; }

/* ── OUTCOMES ────────────────────────────────────────────── */
.cs-outcomes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 64px;
}
.outcome-card {
  padding: 32px 24px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(32, 178, 170, 0.15);
  box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  transition: border-color 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease;
}
.outcome-card:hover {
  border-color: var(--sa-teal);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(32, 178, 170, 0.12);
}
.outcome-card--highlight {
  background: linear-gradient(135deg, #f0fafa, #e8f8f7);
  border-color: rgba(32, 178, 170, 0.3);
}
.outcome-icon { font-size: 1.8rem; margin-bottom: 14px; }
.outcome-card h4 { font-size: 1rem; font-weight: 700; color: #0f0f0f; margin-bottom: 10px; }
.outcome-card p { font-size: 0.9rem; color: #5a6a7a; line-height: 1.75; margin: 0; }

/* ── NAV CTAS ────────────────────────────────────────────── */
.cs-nav-ctas {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.cs-nav-center { flex: 1; display: flex; justify-content: center; }

/* ── RESPONSIVE ──────────────────────────────────────────── */
@media (max-width: 1199px) {
  .cs-hero-inner { grid-template-columns: 1fr 280px; }
  .palette-row { grid-template-columns: repeat(3, 1fr); }
  .tech-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 991px) {
  .cs-hero-inner { grid-template-columns: 1fr; }
  .cs-hero-meta { flex-direction: row; flex-wrap: wrap; }
  .cs-hero-meta-card { flex: 1 1 calc(50% - 6px); }
  .cs-client-grid { grid-template-columns: 1fr; }
  .cs-challenges-grid { grid-template-columns: repeat(2, 1fr); }
  .cs-strategy-grid { grid-template-columns: 1fr; }
  .cs-ba-grid { grid-template-columns: 1fr; }
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .cs-type-grid { grid-template-columns: 1fr; }
  .cs-outcomes-grid { grid-template-columns: repeat(2, 1fr); }
  .timeline-item { grid-template-columns: 80px 32px 1fr; }
}

@media (max-width: 640px) {
  .cs-challenges-grid { grid-template-columns: 1fr; }
  .cs-client-facts { grid-template-columns: 1fr; }
  .cs-hero-meta-card { flex: 1 1 100%; }
  .metrics-grid { grid-template-columns: 1fr 1fr; }
  .tech-grid { grid-template-columns: 1fr 1fr; }
  .cs-outcomes-grid { grid-template-columns: 1fr; }
  .palette-row { grid-template-columns: repeat(2, 1fr); }
  .timeline-item { grid-template-columns: 72px 28px 1fr; gap: 0 12px; }
  .cs-nav-ctas { flex-direction: column; align-items: stretch; text-align: center; }
  .cs-nav-center { justify-content: stretch; }
}
</style>