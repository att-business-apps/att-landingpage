<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VueCompareImage } from "vue3-compare-image";
import CaseStudyWorkWithUs from "@/components/CaseStudyWorkWithUs.vue";

gsap.registerPlugin(ScrollTrigger);

const heroMockup = new URL("../../assets/img/project/c7/project-sd.png", import.meta.url).href;
const clientLogo = new URL("../../assets/img/project/c7/logo-sd.png", import.meta.url).href;
const before = new URL("../../assets/img/project/c7/before.png", import.meta.url).href;
const after = new URL("../../assets/img/project/c7/after.png", import.meta.url).href;
const dashLight = new URL("../../assets/img/project/c7/sd-db-li.png", import.meta.url).href;
const dashDark = new URL("../../assets/img/project/c7/sd-db-dr.png", import.meta.url).href;
const colorPlates = new URL("../../assets/img/project/c7/color-plates.png", import.meta.url).href;
const widgets = new URL("../../assets/img/project/c7/project-sd-widgets.png", import.meta.url).href;
const fullScreen = new URL("../../assets/img/project/c7/project-sd-screen.png", import.meta.url).href;

const metrics = [
  { value: "2", label: "Full redesign iterations shipped" },
  { value: "100%", label: "Workflows re-mapped for clarity" },
  { value: "Light/Dark", label: "Dual-theme dashboard delivered" },
  { value: "0", label: "Training needed for existing users" },
  { value: "Figma", label: "Reusable design system handed off" },
  { value: "Live", label: "In production at live.savedesk.co" },
];

const timeline = [
  { week: "01", phase: "Stakeholder & User Research", desc: "Discussions with the SaveDesk team and dashboard users to understand where navigation and data interpretation were breaking down." },
  { week: "02", phase: "Information Architecture", desc: "Restructured the dashboard's IA around financial insights and ease of access, instead of the existing feature-first layout." },
  { week: "03", phase: "Wireframes & Flows", desc: "Low-fidelity wireframes mapped the new navigation and data hierarchy before any visual design began." },
  { week: "04", phase: "High-Fidelity Prototype", desc: "A complete Figma prototype, including light and dark dashboard modes, reviewed against real user workflows." },
  { week: "05", phase: "Design System & Handoff", desc: "A reusable component and colour system documented and handed off, so future screens stay consistent without a full redesign each time." },
  { week: "06", phase: "Launch & Iteration", desc: "Shipped to production with ongoing feedback loops to refine workflows based on real usage." },
];

const challenges = [
  { num: "01", icon: "dashboard", title: "Functional but unintuitive", desc: "The existing dashboard worked, but navigation required learning rather than feeling obvious — a real cost for a tool meant to save users time." },
  { num: "02", icon: "query_stats", title: "Dense financial data", desc: "Banking cost data is inherently complex. Presenting it clearly, without oversimplifying, was the core design challenge." },
  { num: "03", icon: "account_tree", title: "Inconsistent component patterns", desc: "Without a defined design system, screens had drifted into inconsistent spacing, colour use, and interaction patterns over time." },
  { num: "04", icon: "groups", title: "Active user base mid-migration", desc: "The redesign had to roll out without disrupting existing users actively managing their banking costs through the platform." },
  { num: "05", icon: "dark_mode", title: "Dual-theme requirement", desc: "The dashboard needed to work equally well in light and dark mode — not as an afterthought toggle, but as two fully considered states." },
  { num: "06", icon: "speed", title: "Speed of iteration", desc: "As a fast-moving fintech team, SaveDesk needed a process that produced usable feedback quickly, not a slow waterfall handoff." },
];

const outcomes = [
  { icon: "explore", title: "Navigation that doesn't need a manual", desc: "Users move through the dashboard intuitively, without the learning curve the old interface required." },
  { icon: "insights", title: "Financial data, actually clear", desc: "Complex banking cost data is now presented in a way that supports faster, more confident decisions." },
  { icon: "palette", title: "A real design system", desc: "Documented components and patterns mean new screens stay consistent without rebuilding the visual language each time." },
  { icon: "dark_mode", title: "Considered light & dark modes", desc: "Both themes were designed as first-class experiences, not a quick CSS inversion of one mode." },
  { icon: "trending_up", title: "Stronger product confidence", desc: "The modern interface reinforces SaveDesk's positioning as a serious, modern fintech platform." },
  { icon: "forum", title: "A foundation for what's next", desc: "The design system and IA give SaveDesk a base to extend the product without another ground-up redesign.", highlight: true },
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
        <span class="active">SaveDesk</span>
      </nav>

      <div class="cs-hero-eyebrow">
        <span class="eyebrow-pill">2024</span>
        Dashboard Redesign &amp; UI/UX
      </div>

      <h1 class="cs-hero-title">
        <span class="cs-line">SaveDesk</span>
      </h1>

      <div class="cs-hero-split">
        <p class="cs-hero-sub">
          A Bangalore-based fintech helping businesses reduce banking costs through smarter
          financial management. We rebuilt their dashboard from the ground up — turning a
          functional but confusing interface into one that makes complex banking data effortless
          to read and act on.
        </p>

        <div class="cs-hero-stats">
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">2</span>
            <span class="cs-hero-stat-label">Theme modes</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">100%</span>
            <span class="cs-hero-stat-label">IA re-mapped</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">Live</span>
            <span class="cs-hero-stat-label">In production</span>
          </div>
        </div>
      </div>

      <div class="cs-hero-ctas">
        <a href="https://live.savedesk.co/pages/login" target="_blank" rel="noopener" class="cs-btn-primary">
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
          <img :src="heroMockup" alt="SaveDesk dashboard on desktop" loading="lazy" />
        </div>
        <div class="cs-hero-mockup-float">
          <span class="float-dot"></span>
          Live &amp; In Production
        </div>
        <div class="cs-hero-mockup-tags">
          <span>Dashboard Redesign</span>
          <span>UI/UX Design</span>
          <span>Design System</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── META STRIP ─────────────────────────────────────────────── -->
  <section class="cs-meta-strip">
    <div class="cs-shell cs-meta-grid">
      <div class="cs-meta-item">
        <span class="cs-meta-label">Client</span>
        <span class="cs-meta-value">SaveDesk Analytics India Pvt Ltd</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Industry</span>
        <span class="cs-meta-value">FinTech / Banking Cost Optimisation</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Engagement</span>
        <span class="cs-meta-value">UX Research &middot; Redesign &middot; Design System</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Live Site</span>
        <span class="cs-meta-value">
          <a href="https://live.savedesk.co/pages/login" target="_blank" rel="noopener" class="cs-meta-link">live.savedesk.co</a>
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
          <h2 class="cs-h2">Who is SaveDesk?</h2>
        </div>
      </div>

      <div class="cs-client-grid cs-reveal">
        <div class="cs-client-copy">
          <p class="cs-lead-text">
            SaveDesk is a Bangalore-based fintech company that helps businesses reduce banking
            costs through smarter financial management. As the product grew, the existing
            dashboard — functional but unintuitive — needed a complete UX rethink to keep pace
            with a more demanding user base.
          </p>
          <p>
            Amortree stepped in to reimagine the dashboard with a user-centric approach,
            focused on clarity, streamlined workflows, and a visual language that could scale
            as the product evolved.
          </p>

          <div class="cs-fact-list">
            <div class="cs-fact">
              <span class="material-symbols-outlined">savings</span>
              <div><strong>Sector</strong><span>FinTech / Banking Cost Optimisation</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">group</span>
              <div><strong>Audience</strong><span>Business finance & operations teams</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">location_on</span>
              <div><strong>Location</strong><span>Bangalore, India</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">language</span>
              <div><strong>Website</strong><a href="https://live.savedesk.co/pages/login" target="_blank" rel="noopener">live.savedesk.co</a></div>
            </div>
          </div>
        </div>

        <aside class="cs-client-card">
          <img :src="clientLogo" alt="SaveDesk logo" class="cs-client-logo" loading="lazy" />
          <span class="cs-quote-mark material-symbols-outlined">format_quote</span>
          <p class="cs-client-quote">
            The dashboard was functional, but it shouldn't take a learning curve to find your
            own savings. We needed it to just make sense.
          </p>
          <div class="cs-client-quote-attr">Project Brief, SaveDesk</div>
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
          <h2 class="cs-h2 cs-h2--light">Why the existing dashboard fell short</h2>
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
          <h2 class="cs-h2">Clarity, system, then polish</h2>
        </div>
      </div>

      <div class="cs-strategy-grid">
        <div class="cs-strategy-copy cs-reveal">
          <p class="cs-lead-text">
            A dashboard redesign isn't about making things prettier — it's about making complex
            data faster to act on. Our approach was built on three pillars.
          </p>

          <div class="cs-pillar" v-for="(p, i) in [
            { t: 'Information architecture before visuals', d: 'We restructured the dashboard around financial insights and ease of access first, then layered the visual design on top of a structure that already made sense.' },
            { t: 'A real, documented design system', d: 'Components, spacing, and colour usage were standardised and documented — not just designed once and left to drift inconsistently over time.' },
            { t: 'Light and dark as equal citizens', d: 'Both theme modes were designed in parallel as full experiences, not a default mode plus an inverted afterthought.' },
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
            A fintech dashboard's job isn't to look impressive — it's to make a stressed-out
            finance lead trust a number on screen enough to act on it in the next five minutes.
          </p>
          <div class="cs-insight-divider"></div>
          <p class="cs-insight-action">
            So every design decision was tested against legibility and trust first, visual
            flourish second.
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
          <h2 class="cs-h2">From research to a live redesign</h2>
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
          <p class="cs-section-sub">Drag to compare the original dashboard against the redesign.</p>
        </div>
      </div>

      <div class="cs-compare-wrap cs-reveal">
        <VueCompareImage :left-image="before" :right-image="after" />
      </div>
    </div>
  </section>

  <!-- ── DESIGN SYSTEM ──────────────────────────────────────────── -->
  <section class="cs-section cs-section--muted">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">06</span>
        <div>
          <div class="cs-eyebrow">Design System</div>
          <h2 class="cs-h2">Colour, components &amp; light/dark modes</h2>
          <p class="cs-section-sub">A documented system built to stay consistent as the product grows.</p>
        </div>
      </div>

      <div class="cs-gallery-card cs-reveal">
        <span class="cs-gallery-label">Colour Plates</span>
        <img :src="colorPlates" alt="SaveDesk colour palette" loading="lazy" />
      </div>

      <div class="cs-gallery-card cs-reveal">
        <span class="cs-gallery-label">Component Widgets</span>
        <img :src="widgets" alt="SaveDesk dashboard widgets" loading="lazy" />
      </div>

      <div class="cs-section-head cs-reveal" style="margin-top: 3.5rem;">
        <div>
          <div class="cs-eyebrow">Light / Dark Mode</div>
          <h3 class="cs-h2" style="font-size: 1.5rem;">Two fully considered theme states</h3>
          <p class="cs-section-sub">Drag to compare the light and dark dashboard experiences.</p>
        </div>
      </div>

      <div class="cs-compare-wrap cs-reveal">
        <VueCompareImage :left-image="dashLight" :right-image="dashDark" />
      </div>

      <div class="cs-gallery-card cs-reveal" style="margin-top: 2.5rem;">
        <span class="cs-gallery-label">Full Dashboard View</span>
        <img :src="fullScreen" alt="SaveDesk full dashboard screen" loading="lazy" />
      </div>
    </div>
  </section>

  <!-- ── METRICS ────────────────────────────────────────────────── -->
  <section class="cs-metrics-strip">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num cs-ghost-num--accent">07</span>
        <div>
          <div class="cs-eyebrow cs-eyebrow--accent">Snapshot</div>
          <h2 class="cs-h2 cs-h2--light">What the redesign delivers</h2>
          <p class="cs-section-sub cs-section-sub--light">The structural and experience wins from rebuilding the dashboard.</p>
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
        <span class="cs-ghost-num">08</span>
        <div>
          <div class="cs-eyebrow">Result</div>
          <h2 class="cs-h2">What this built for SaveDesk</h2>
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
        <a href="/project/al-shamil-computers" class="cs-nav-link">
          <span class="material-symbols-outlined">arrow_back</span> Al-Shamil
        </a>
        <a href="https://live.savedesk.co/pages/login" target="_blank" rel="noopener" class="cs-btn-primary">View Live Site</a>
        <a href="/project/samsiddhi-designs" class="cs-nav-link cs-nav-link--right">
          Samsiddhi Designs <span class="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </div>
  </section>

  <CaseStudyWorkWithUs
    project="SaveDesk"
    industry="FinTech dashboard redesign"
    accent="#2071B7"
    result="A clearer dashboard experience that makes complex banking data easier to understand and act on."
    :services="['UX Audit', 'Dashboard Redesign', 'Design System', 'Prototype Handoff']"
    :proof="['Simplified financial workflows', 'Improved data clarity', 'Modern product confidence']"
  />
</template>

<style lang="scss" scoped>
.cs-hero, .cs-section, .cs-metrics-strip, .cs-meta-strip {
  --accent: #2071B7;
  --accent-deep: #185a92;
  --gold: #facc15;
  --midnight: #0a1d2e;
  --frost: #f4f8fb;
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
    background: radial-gradient(circle, rgba(32,113,183,0.24), transparent 70%);
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
  background: rgba(32,113,183,0.16);
  border: 1px solid rgba(32,113,183,0.4);
  color: #6fb1ed;
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
  color: #6fb1ed;
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
    box-shadow: 0 16px 36px rgba(32,113,183,0.32);
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
  border: 1px solid rgba(32,113,183,0.3);
  border-bottom: none;
  box-shadow: 0 -20px 100px rgba(32,113,183,0.1), 0 40px 120px rgba(0,0,0,0.6);

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
  border: 1px solid rgba(32,113,183,0.45);
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
  color: #6fb1ed;
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

  &--accent { color: #6fb1ed; }
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

.cs-client-logo { height: 40px; margin-bottom: 1.75rem; filter: brightness(0) invert(1); }

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
  color: #6fb1ed;
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
  color: #6fb1ed;
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
  background: rgba(32,113,183,0.1);
  border: 1px solid rgba(32,113,183,0.25);
  color: var(--accent-deep);
  font-weight: 800;
  font-size: 0.78rem;
  display: flex; align-items: center; justify-content: center;
}

.cs-insight {
  padding: 2.25rem 2rem;
  border-radius: 18px;
  background: linear-gradient(160deg, #070a0e, #0c1d30);
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
  background: linear-gradient(180deg, var(--accent), rgba(32,113,183,0.15));
  margin-top: 0.25rem;
}

.timeline-body {
  padding-bottom: 2.25rem;
  h4 { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 0.4rem; }
  p { font-size: 0.9rem; color: #64748b; line-height: 1.75; margin: 0; }
}

// ─── Compare & gallery ─────────────────────────────────────────────────
.cs-compare-wrap {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(32,113,183,0.18);
}

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

// ─── Metrics strip ─────────────────────────────────────────────────────
.cs-metrics-strip {
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: #050810;
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
  font-size: clamp(1.6rem, 3.6vw, 2.6rem);
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
    background: linear-gradient(160deg, #070a0e, #0c1d30);
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