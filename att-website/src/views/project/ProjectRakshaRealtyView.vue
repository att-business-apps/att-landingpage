<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VueCompareImage } from "vue3-compare-image";
import CaseStudyWorkWithUs from "@/components/CaseStudyWorkWithUs.vue";

gsap.registerPlugin(ScrollTrigger);

const heroMockup = new URL("../../assets/img/project/c12/project-rr.png", import.meta.url).href;
const clientLogo = new URL("../../assets/img/project/c12/logo.png", import.meta.url).href;
const tabMockup = new URL("../../assets/img/project/c12/project-rr-tab.png", import.meta.url).href;
const compareBefore = new URL("../../assets/img/project/c12/before.png", import.meta.url).href;
const compareAfter = new URL("../../assets/img/project/c12/after.png", import.meta.url).href;

const metrics = [
  { value: "3", label: "Distinct advisory tracks — Developers, Buyers & Investors" },
  { value: "100%", label: "Mobile-responsive advisory experience" },
  { value: "GA", label: "Analytics tracking live from launch day" },
  { value: "RERA", label: "Registration & credentials front and centre" },
  { value: "Figma", label: "Custom design system built for the brand" },
  { value: "Live", label: "raksharealty.in shipped end to end" },
];

const timeline = [
  { week: "01", phase: "Discovery & Positioning Audit", desc: "Reviewed the existing site to see where it still read like a typical brokerage instead of an independent, zero-commission advisory." },
  { week: "02", phase: "Identity & Website UX", desc: "Designed a credibility-first layout in Figma with distinct journeys for developers, buyers, and investors." },
  { week: "03", phase: "Frontend Development", desc: "Built the site to match the design system exactly, tuned for fast loading on the mobile connections most visitors use." },
  { week: "04", phase: "Analytics Setup", desc: "Instrumented Google Analytics so every enquiry can be traced back to its source and advisory track." },
  { week: "05", phase: "Pitch Deck Design", desc: "Delivered a matching pitch deck for developer and investor conversations, consistent with the website's identity." },
  { week: "06", phase: "Launch", desc: "Shipped raksharealty.in live, ready to support all three advisory tracks from day one." },
];

const challenges = [
  { num: "01", icon: "balance", title: "Advisory positioning got lost", desc: "An independent, zero-commission advisory is a different model from a typical broker, but the existing site didn't make that distinction clear at a glance." },
  { num: "02", icon: "call_split", title: "One website, three audiences", desc: "Developers, buyers, and investors each needed a distinct path in, without turning the homepage into three unrelated brochures." },
  { num: "03", icon: "search_off", title: "No visibility into what was working", desc: "Without analytics in place, there was no way to see which audience segment was engaging, or where enquiries were actually coming from." },
  { num: "04", icon: "slideshow", title: "Weak developer-facing materials", desc: "Presenting the advisory's track record to developers and investors relied on ad-hoc documents rather than a consistent, professional pitch deck." },
  { num: "05", icon: "devices", title: "Mobile experience gap", desc: "Most visitors were arriving on mobile, and the existing site wasn't built with that reality in mind." },
  { num: "06", icon: "diversity_3", title: "No clear differentiation", desc: "Amid commission-driven brokers and property portals, nothing in the brand signalled why this was an independent, structured advisory instead." },
];

const outcomes = [
  { icon: "verified", title: "Clearer independent positioning", desc: "The site now signals zero-commission, structured advisory before a single word is read." },
  { icon: "devices", title: "Consistent across every device", desc: "The mobile-first build means the experience holds up whether a visitor arrives on desktop or on the go." },
  { icon: "monitoring", title: "Measurable from day one", desc: "GA tracking shows exactly which advisory track — developer, buyer, or investor — is driving enquiries." },
  { icon: "slideshow", title: "Investor & developer-ready storytelling", desc: "A matching pitch deck gives the team a professional way to present the advisory's track record." },
  { icon: "call_split", title: "Three distinct advisory journeys", desc: "Developers, buyers, and investors each get a path built around their exact decision, not a generic funnel." },
  { icon: "forum", title: "A reference for advisory branding", desc: "Raksha Realty is now a live example of how an independent advisory can look as considered as the guidance it gives.", highlight: true },
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
        <span>&#8226;</span>
        <a href="/projects">Projects</a>
        <span>&#8226;</span>
        <span class="active">Raksha Realty</span>
      </nav>

      <div class="cs-hero-eyebrow">
        <span class="eyebrow-pill">Real Estate</span>
        Real Estate Advisory for Developers, Buyers &amp; Investors
      </div>

      <h1 class="cs-hero-title">
        <span class="cs-line">Raksha Realty</span>
      </h1>

      <div class="cs-hero-split">
        <p class="cs-hero-sub">
          Raksha Realty needed a website that matched its positioning: strategic real estate
          advisory for developers, buyers, and investors — built on structured thinking, not
          market noise. We redesigned the site end to end, plus a pitch deck and analytics to
          back it up.
        </p>

        <div class="cs-hero-stats">
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">5</span>
            <span class="cs-hero-stat-label">Deliverables</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">100%</span>
            <span class="cs-hero-stat-label">Mobile-ready</span>
          </div>
          <div class="cs-hero-stat-divider"></div>
          <div class="cs-hero-stat">
            <span class="cs-hero-stat-val">3</span>
            <span class="cs-hero-stat-label">Advisory tracks</span>
          </div>
        </div>
      </div>

      <div class="cs-hero-ctas">
        <a href="https://raksharealty.in/" target="_blank" rel="noopener" class="cs-btn-primary">
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
          <img :src="heroMockup" alt="Raksha Realty website on desktop" loading="lazy" />
        </div>
        <div class="cs-hero-mockup-float">
          <span class="float-dot"></span>
          Live &amp; Taking Enquiries
        </div>
        <div class="cs-hero-mockup-tags">
          <span>Website Redesign</span>
          <span>UI/UX Design</span>
          <span>Custom Development</span>
          <span>Pitch Deck</span>
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
        <span class="cs-meta-value">Raksha Realty</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Industry</span>
        <span class="cs-meta-value">Real Estate Advisory</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Engagement</span>
        <span class="cs-meta-value">Website Redesign &middot; UI/UX &middot; Custom Development &middot; Pitch Deck &middot; GA</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">Live Site</span>
        <span class="cs-meta-value">
          <a href="https://raksharealty.in/" target="_blank" rel="noopener" class="cs-meta-link">raksharealty.in</a>
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
          <h2 class="cs-h2">What is Raksha Realty?</h2>
        </div>
      </div>

      <div class="cs-client-grid cs-reveal">
        <div class="cs-client-copy">
          <p class="cs-lead-text">
            Raksha Realty is an independent, RERA-registered real estate advisory firm based in
            Coimbatore, guiding developers, buyers, and investors with structured, zero-commission
            advice instead of sales pressure.
          </p>
          <p>
            Before this project, the website didn't reflect that independence. It needed to speak
            to three very different audiences — developers, buyers, and investors — with the same
            clarity the advisory itself promises, without leaning on the sales tropes of a typical
            real estate brokerage.
          </p>

          <div class="cs-fact-list">
            <div class="cs-fact">
              <span class="material-symbols-outlined">apartment</span>
              <div><strong>Sector</strong><span>Independent Real Estate Advisory</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">group</span>
              <div><strong>Audience</strong><span>Developers, Buyers &amp; Investors</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">location_on</span>
              <div><strong>Region</strong><span>Coimbatore, Tamil Nadu, India</span></div>
            </div>
            <div class="cs-fact">
              <span class="material-symbols-outlined">language</span>
              <div><strong>Website</strong><a href="https://raksharealty.in/" target="_blank" rel="noopener">raksharealty.in</a></div>
            </div>
          </div>
        </div>

        <aside class="cs-client-card">
          <img :src="clientLogo" alt="Raksha Realty logo" class="cs-client-logo" loading="lazy" />
          <span class="cs-quote-mark material-symbols-outlined">format_quote</span>
          <p class="cs-client-quote">
            We don't sell inventory or earn commission — our only obligation is to help
            developers, buyers, and investors decide with clarity, not urgency.
          </p>
          <div class="cs-client-quote-attr">Project Brief, Raksha Realty</div>
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
          <h2 class="cs-h2 cs-h2--light">Why the site needed a rebuild</h2>
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
          <h2 class="cs-h2">Structured thinking, not market noise</h2>
        </div>
      </div>

      <div class="cs-strategy-grid">
        <div class="cs-strategy-copy cs-reveal">
          <p class="cs-lead-text">
            An independent advisory has to look like one. The brief wasn't to look trendy — it
            was to look neutral, considered, and different from every commission-driven broker
            competing for the same attention.
          </p>

          <div class="cs-pillar" v-for="(p, i) in [
            { t: 'A credibility-first identity', d: 'Clean, editorial design and confident typography that reads as independent expertise, not a typical real estate sales pitch.' },
            { t: 'Three clear entry points', d: 'Distinct paths for Developers, Buyers, and Investors, so each audience finds guidance built around their exact situation.' },
            { t: 'A measurable foundation', d: 'Analytics wired in from launch, so every enquiry can be traced back to which advisory track brought it in.' },
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
            Buyers and developers dealing with real estate professionals are trained to expect
            a pitch. For an advisory built on zero-commission independence, a site that still
            feels like every other brokerage undercuts the whole premise.
          </p>
          <div class="cs-insight-divider"></div>
          <p class="cs-insight-action">
            So we designed for restraint — structured layouts, confident typography, and copy
            that reads like counsel, not a sales script.
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
          <h2 class="cs-h2">Audit to launch</h2>
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

  <!-- ── BEFORE / AFTER ────────────────────────────────────────── -->
  <section class="cs-section">
    <div class="cs-shell">
      <div class="cs-section-head cs-reveal">
        <span class="cs-ghost-num">05</span>
        <div>
          <div class="cs-eyebrow">Transformation</div>
          <h2 class="cs-h2">The redesign, side by side</h2>
          <p class="cs-section-sub">Drag to compare the original site against the redesigned brand and website.</p>
        </div>
      </div>

      <div class="cs-compare-wrap cs-reveal">
        <VueCompareImage :left-image="compareBefore" :right-image="compareAfter" />
      </div>

      <div class="cs-mockup-wrap cs-reveal">
        <img :src="tabMockup" alt="Raksha Realty mobile view" loading="lazy" />
      </div>
    </div>
  </section>

  <!-- ── TESTIMONIAL ────────────────────────────────────────────── -->
  <section class="cs-section cs-section--accent-deep">
    <div class="cs-shell">
      <div class="cs-testimonial cs-reveal">
        <span class="material-symbols-outlined cs-testimonial-mark">format_quote</span>
        <blockquote>
          They did an excellent job on our website. They were highly understanding of our needs, thoughtful in their design approach, and very practical in aligning their ideas with our vision. Communication was clear and sensible throughout the process. I’d definitely recommend them.
        </blockquote>
        <div class="cs-testimonial-attr">
          <div class="cs-testimonial-avatar">GM</div>
          <div class="cs-testimonial-text">
            <strong>Ganesh Moorthy</strong>
            <span>Founder, Raksha Realty</span>
          </div>
          <div class="cs-testimonial-stars" aria-label="5 out of 5 stars">
            <span class="material-symbols-outlined" v-for="n in 4" :key="n">star</span>
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
          <h2 class="cs-h2 cs-h2--light">What the redesign delivers</h2>
          <p class="cs-section-sub cs-section-sub--light">The brand and structural wins that came out of the engagement.</p>
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
          <h2 class="cs-h2">What this built for Raksha Realty</h2>
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
        <a href="/project/samsiddhi-designs" class="cs-nav-link">
          <span class="material-symbols-outlined">arrow_back</span> Samsiddhi Designs
        </a>
        <a href="https://raksharealty.in/" target="_blank" rel="noopener" class="cs-btn-primary">View Live Site</a>
        <a href="/project/alin-salon" class="cs-nav-link cs-nav-link--right">
          <span class="material-symbols-outlined">arrow_forward</span> Alin Salon
        </a>
      </div>
    </div>
  </section>

  <CaseStudyWorkWithUs
    project="Raksha Realty"
    industry="Real Estate Advisory"
    accent="#226090"
    result="A credibility-first website and pitch deck that let Raksha Realty's independent, zero-commission advisory speak for itself online."
    :services="['Website Redesign', 'UI/UX Design', 'Custom Development', 'Pitch Deck', 'Google Analytics']"
    :proof="['Independent Advisory Positioning', 'Three-Track Website Structure', 'Analytics-Backed Visibility']"
  />
</template>

<style lang="scss" scoped>
.cs-hero, .cs-section, .cs-metrics-strip, .cs-meta-strip {
  --accent: #468FC7;
  --accent-deep: #226090;
  --gold: #facc15;
  --midnight: #2e1c05;
  --frost: #f9f7f5;
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
    background: radial-gradient(circle, rgba(70, 143, 199,0.22), transparent 70%);
  }
  &--2 {
    bottom: -200px; left: -160px;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(34,96,144,0.08), transparent 70%);
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
  span {
        color: var(--color-gray-2);

        &.active {
            color: var(--accent) !important;
        }
    }
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
  background: rgba(70, 143, 199,0.14);
  border: 1px solid rgba(70, 143, 199,0.35);
  color: var(--accent);
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
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--accent);
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
    box-shadow: 0 16px 36px rgba(70, 143, 199,0.32);
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
  border: 1px solid rgba(70, 143, 199,0.25);
  border-bottom: none;
  box-shadow: 0 -20px 100px rgba(70, 143, 199,0.08), 0 40px 120px rgba(0,0,0,0.6);

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
  border: 1px solid rgba(70, 143, 199,0.4);
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
  background: #226090;
  box-shadow: 0 0 10px #226090;
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
  background: #120c04;
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
  color: var(--accent);
  text-decoration: none;
  &:hover { text-decoration: underline; }
}

// ─── Section shells ──────────────────────────────────────────────────
.cs-section {
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: #fff;

  &--dark { background: #120c04; }
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

  &--accent { color: var(--accent); }
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
  background: #120c04;
  text-align: left;
}

.cs-client-logo { height: 44px; margin-bottom: 1.75rem; }

.cs-quote-mark {
  font-size: 2.2rem;
  color: var(--accent);
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
  color: var(--accent);
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
  color: var(--accent);
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
  background: rgba(70, 143, 199,0.1);
  border: 1px solid rgba(70, 143, 199,0.25);
  color: var(--accent-deep);
  font-weight: 800;
  font-size: 0.78rem;
  display: flex; align-items: center; justify-content: center;
}

.cs-insight {
  padding: 2.25rem 2rem;
  border-radius: 18px;
  background: linear-gradient(160deg, #120c04, #2e1c05);
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
  background: linear-gradient(180deg, var(--accent), rgba(70, 143, 199,0.15));
  margin-top: 0.25rem;
}

.timeline-body {
  padding-bottom: 2.25rem;
  h4 { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 0.4rem; }
  p { font-size: 0.9rem; color: #64748b; line-height: 1.75; margin: 0; }
}

// ─── Compare wrap ──────────────────────────────────────────────────────
.cs-compare-wrap {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(70, 143, 199,0.15);
  margin-bottom: 2.5rem;
}

.cs-mockup-wrap {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(70, 143, 199,0.15);
  margin: 0 auto;

  img { width: 100%; display: block; }
}

// ─── Metrics strip ─────────────────────────────────────────────────────
.cs-metrics-strip {
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: #0c0803;
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
    background: linear-gradient(160deg, #120c04, #2e1c05);
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