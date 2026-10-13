<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CaseStudyWorkWithUs from "@/components/CaseStudyWorkWithUs.vue";

gsap.registerPlugin(ScrollTrigger);

const heroMockup = new URL("../../assets/img/project/c8/project-thum-vv.png", import.meta.url).href;
const fullPage = new URL("../../assets/img/project/c8/project-vv.png", import.meta.url).href;
const brandMockup = new URL("../../assets/img/project/c8/vv-mockup.png", import.meta.url).href;
const logoArtwork = new URL("../../assets/img/project/c8/project-logo.png", import.meta.url).href;

const challenges = [
  { num: "01", icon: "hub", title: "Bring three disciplines under one brand", desc: "Data annotation, software development and RCM each need a clear place within one confident technology partner identity." },
  { num: "02", icon: "alt_route", title: "Make the offer easier to understand", desc: "Visitors need to scan a broad service mix, find the right area and understand how the team can help." },
  { num: "03", icon: "contact_support", title: "Turn interest into a useful conversation", desc: "The enquiry journey should collect enough context for the team to respond with a relevant next step." },
  { num: "04", icon: "query_stats", title: "Keep incoming leads visible", desc: "The team needs a practical shared view of enquiries so follow-up does not disappear into an inbox." },
];

const approach = [
  { title: "Build recognition first", desc: "Use a distinctive logo and a consistent visual system across the website and supporting brand touchpoints." },
  { title: "Give each service a clear route", desc: "Organize the website around the three disciplines so visitors can move directly into relevant information." },
  { title: "Design for confident decisions", desc: "Pair concise service explanations with a visible enquiry route and useful company details." },
];

const journey = [
  { week: "01", phase: "Find VisonVerse", desc: "Discover the company through its website or Google Business Profile." },
  { week: "02", phase: "Explore a service", desc: "Understand data annotation, software development or RCM through a dedicated service path." },
  { week: "03", phase: "Share a requirement", desc: "Send contact details and project context through the website enquiry form." },
  { week: "04", phase: "Capture the lead", desc: "The Lead CRM organizes the enquiry and connects it to Google Sheets." },
  { week: "05", phase: "Follow up", desc: "The team uses the shared lead record to review and continue the conversation." },
];

const capabilities = [
  { icon: "draw", title: "Logo & identity", desc: "A clear visual signature that gives the technology brand a recognizable foundation." },
  { icon: "language", title: "Service-led website", desc: "A structured digital experience for the company story, service areas and enquiries." },
  { icon: "location_on", title: "Google Business Profile", desc: "A branded local presence that supports discovery and gives visitors a route to connect." },
  { icon: "table_view", title: "Lead CRM + Sheets", desc: "A practical lead workflow that keeps incoming enquiries organized and visible to the team." },
];

const outcomes = [
  { icon: "fingerprint", title: "Consistent brand presence", desc: "Logo and visual language carried into the customer-facing experience." },
  { icon: "account_tree", title: "Clearer service discovery", desc: "Three specialist service areas presented within one coherent website." },
  { icon: "location_on", title: "Connected local presence", desc: "Google Business Profile included in the wider brand experience." },
  { icon: "conversion_path", title: "Trackable enquiry workflow", desc: "Lead CRM connected with Google Sheets for shared lead visibility." },
];

const getCaseIcon = (label = "") => {
  const value = String(label).toLowerCase();
  if (/brand|identity|position|visual/.test(value)) return "palette";
  if (/discover|research|audit|find|search/.test(value)) return "travel_explore";
  if (/develop|build|implement|frontend/.test(value)) return "code";
  if (/launch|deliver|deploy/.test(value)) return "rocket_launch";
  if (/review|test|quality/.test(value)) return "fact_check";
  if (/content|copy|story/.test(value)) return "edit_note";
  if (/journey|customer|flow|follow|track|lead|crm|enquiry|conversion/.test(value)) return "conversion_path";
  if (/store|operation|manage|inventory|catalog|admin/.test(value)) return "settings";
  if (/website|mobile|digital|responsive|experience|web/.test(value)) return "web";
  if (/trust|review|quality|proof|safety/.test(value)) return "verified";
  if (/strategy|approach|plan|goal|direction/.test(value)) return "lightbulb";
  if (/service|category|product|collection/.test(value)) return "grid_view";
  if (/book|appointment|schedule/.test(value)) return "event_available";
  if (/payment|checkout|order|purchase|price|cost/.test(value)) return "shopping_bag";
  if (/next|growth|future|scale/.test(value)) return "trending_up";
  return "task_alt";
};
let ctx;
onMounted(() => {
  ctx = gsap.context(() => {
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .from(".cs-hero-eyebrow", { y: 18, autoAlpha: 0, duration: 0.6 })
      .from(".cs-hero-title .cs-line", { y: 36, autoAlpha: 0, duration: 0.8 }, "-=0.35")
      .from(".cs-hero-sub", { y: 18, autoAlpha: 0, duration: 0.55 }, "-=0.45")
      .from(".cs-hero-stat", { y: 14, autoAlpha: 0, stagger: 0.06, duration: 0.45 }, "-=0.3")
      .from(".cs-hero-ctas", { y: 14, autoAlpha: 0, duration: 0.5 }, "-=0.25")
      .from(".cs-hero-mockup-wrap", { y: 50, autoAlpha: 0, scale: 0.97, duration: 1 }, "-=0.4");

    gsap.utils.toArray(".cs-reveal").forEach((el) => {
      gsap.from(el, { scrollTrigger: { trigger: el, start: "top 86%", once: true }, y: 25, autoAlpha: 0, duration: 0.65, ease: "power3.out" });
    });
    gsap.utils.toArray(".cs-stagger").forEach((grid) => {
      gsap.from(grid.children, { scrollTrigger: { trigger: grid, start: "top 84%", once: true }, y: 22, autoAlpha: 0, stagger: 0.07, duration: 0.5, ease: "power2.out" });
    });
  });
});
onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <main class="visonverse-case">
    <section class="cs-hero">
      <div class="cs-hero-noise" aria-hidden="true"></div>
      <div class="cs-hero-glow cs-hero-glow--1" aria-hidden="true"></div>
      <div class="cs-hero-glow cs-hero-glow--2" aria-hidden="true"></div>
      <div class="cs-shell">
        <nav class="cs-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>•</span><a href="/projects">Projects</a><span>•</span><span class="active">VisonVerse Technology</span></nav>
        <div class="cs-hero-eyebrow"><span class="eyebrow-pill">Technology</span>Brand Identity · Website · GMB · Lead CRM</div>
        <h1 class="cs-hero-title"><span class="cs-line">VisonVerse Technology</span></h1>
        <div class="cs-hero-split">
          <p class="cs-hero-sub">One clear digital presence for data annotation, software development and healthcare revenue operations. We connected the brand, website and enquiry workflow so people can find the right service and the team can keep new leads in view.</p>
          <div class="cs-hero-stats"><div class="cs-hero-stat"><span class="cs-hero-stat-val">Brand</span><span class="cs-hero-stat-label">Logo &amp; identity</span></div><div class="cs-hero-stat-divider"></div><div class="cs-hero-stat"><span class="cs-hero-stat-val">Digital</span><span class="cs-hero-stat-label">Website &amp; GMB</span></div><div class="cs-hero-stat-divider"></div><div class="cs-hero-stat"><span class="cs-hero-stat-val">Leads</span><span class="cs-hero-stat-label">CRM + Google Sheets</span></div></div>
        </div>
        <div class="cs-hero-ctas"><a href="https://www.visonverse.com/" target="_blank" rel="noopener noreferrer" class="cs-btn-primary">Visit Live Site <span aria-hidden="true">↗</span></a><a href="/projects" class="cs-btn-ghost">All Projects</a></div>
        <div class="cs-hero-mockup-wrap"><div class="cs-hero-mockup"><img :src="heroMockup" alt="VisonVerse Technology brand and website showcase" /></div><div class="cs-hero-mockup-float"><span class="float-dot"></span>Brand to browser</div><div class="cs-hero-mockup-tags"><span>Logo</span><span>Website</span><span>Google Business Profile</span><span>Lead CRM</span></div></div>
      </div>
    </section>

    <section class="cs-meta-strip"><div class="cs-shell cs-meta-grid"><div class="cs-meta-item"><span class="cs-meta-label">Client</span><span class="cs-meta-value">VisonVerse Technology</span></div><div class="cs-meta-item"><span class="cs-meta-label">Industry</span><span class="cs-meta-value">Technology &amp; business services</span></div><div class="cs-meta-item"><span class="cs-meta-label">Engagement</span><span class="cs-meta-value">Logo · Website · GMB · Branding · Lead CRM</span></div><div class="cs-meta-item"><span class="cs-meta-label">Live Site</span><span class="cs-meta-value"><a href="https://www.visonverse.com/" target="_blank" rel="noopener noreferrer" class="cs-meta-link">visonverse.com ↗</a></span></div></div></section>

    <section class="cs-section"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">business_center</span><div><div class="cs-eyebrow">The Brand</div><h2 class="cs-h2">One identity for a multi-disciplinary technology partner</h2></div></div>
      <div class="cs-client-grid cs-reveal"><div class="cs-client-copy"><p class="cs-lead-text">VisonVerse Technology brings together data annotation, software development and revenue cycle management. The brand and website needed to present that range with clarity while making the next step—starting a conversation—easy to find.</p><p>The project connects a refreshed logo and supporting brand language with a service-led website, Google Business Profile and a Lead CRM workflow that records enquiries in Google Sheets.</p><div class="cs-fact-list"><div class="cs-fact"><span class="material-symbols-outlined">dataset</span><div><strong>Data</strong><span>Annotation &amp; labeling</span></div></div><div class="cs-fact"><span class="material-symbols-outlined">code</span><div><strong>Technology</strong><span>Software development</span></div></div><div class="cs-fact"><span class="material-symbols-outlined">medical_services</span><div><strong>Healthcare</strong><span>RCM &amp; medical billing</span></div></div><div class="cs-fact"><span class="material-symbols-outlined">language</span><div><strong>Live website</strong><a href="https://www.visonverse.com/" target="_blank" rel="noopener noreferrer">visonverse.com</a></div></div></div></div><aside class="cs-client-card"><img :src="logoArtwork" alt="VisonVerse Technology logo" class="vv-client-logo" /><span class="cs-card-kicker">The brand idea</span><span class="cs-quote-mark material-symbols-outlined">format_quote</span><p class="cs-client-quote">One partner across data, technology and healthcare operations.</p><div class="cs-client-quote-attr">A connected service proposition</div></aside></div>
    </div></section>

    <section class="cs-section cs-section--dark"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num cs-ghost-num--accent" aria-hidden="true">target</span><div><div class="cs-eyebrow cs-eyebrow--accent">The Opportunity</div><h2 class="cs-h2 cs-h2--light">Make a broad service offer feel straightforward</h2><p class="cs-section-sub cs-section-sub--light">The experience needed to balance a clear brand story with distinct paths into each specialist service.</p></div></div>
      <div class="cs-challenge-list cs-stagger"><div v-for="item in challenges" :key="item.num" class="cs-challenge-row"><span class="material-symbols-outlined cs-challenge-icon">{{ item.icon }}</span><div class="cs-challenge-body"><h3>{{ item.title }}</h3><p>{{ item.desc }}</p></div></div></div>
    </div></section>

    <section class="cs-section"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">lightbulb</span><div><div class="cs-eyebrow">Experience Strategy</div><h2 class="cs-h2">From service discovery to a useful enquiry</h2></div></div>
      <div class="cs-strategy-grid"><div class="cs-strategy-copy cs-reveal"><p class="cs-lead-text">A strong B2B website helps the right visitor recognize their need, understand the service and know how to begin. The structure gives each service a clear route while keeping VisonVerse’s wider expertise connected.</p><div v-for="(item, i) in approach" :key="item.title" class="cs-pillar"><span class="material-symbols-outlined cs-pillar-num" aria-hidden="true">{{ getCaseIcon(item.title) }}</span><div><h4>{{ item.title }}</h4><p>{{ item.desc }}</p></div></div></div><aside class="cs-insight cs-reveal"><span class="material-symbols-outlined cs-insight-icon">lightbulb</span><h4>A clear route through a complex offer</h4><p>Let visitors recognize their service need first, then provide the context and contact option to move forward.</p><div class="cs-insight-divider"></div><p class="cs-insight-action">The Lead CRM and Google Sheets connection carries the enquiry into the team’s follow-up workflow.</p></aside></div>
    </div></section>

    <section class="cs-section cs-section--muted"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">conversion_path</span><div><div class="cs-eyebrow">Customer Journey</div><h2 class="cs-h2">A considered path from discovery to follow-up</h2><p class="cs-section-sub">The visitor journey and the team’s lead workflow work as one connected experience.</p></div></div>
      <div class="cs-timeline"><div v-for="(item, i) in journey" :key="item.week" class="timeline-row"><span class="material-symbols-outlined timeline-week" aria-hidden="true">{{ getCaseIcon(item.phase || item.step) }}</span><div class="timeline-rail"><div class="timeline-dot"></div><div v-if="i < journey.length - 1" class="timeline-line"></div></div><div class="timeline-body"><h4>{{ item.phase }}</h4><p>{{ item.desc }}</p></div></div></div>
    </div></section>

    <section class="cs-section vv-website-section"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">web</span><div><div class="cs-eyebrow">The Website</div><h2 class="cs-h2">Three service paths. One confident brand.</h2><p class="cs-section-sub">A closer look at the website experience, from the opening message through service discovery and enquiry.</p></div></div>
      <div class="cs-mockup-wrap vv-desktop-showcase cs-reveal"><img :src="fullPage" alt="Full-page VisonVerse website showing its service areas, process, proof points and contact form" loading="lazy" /></div>
    </div></section>

    <section class="cs-section cs-section--dark vv-capabilities-section"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num cs-ghost-num--accent" aria-hidden="true">settings</span><div><div class="cs-eyebrow cs-eyebrow--accent">Connected Brand Touchpoints</div><h2 class="cs-h2 cs-h2--light">A consistent experience beyond the homepage</h2><p class="cs-section-sub cs-section-sub--light">The system connects brand identity, service discovery and lead handling across the touchpoints visitors use.</p></div></div>
      <div class="cs-outcome-grid cs-stagger vv-capability-grid"><article v-for="item in capabilities" :key="item.title" class="cs-outcome"><span class="material-symbols-outlined">{{ item.icon }}</span><h4>{{ item.title }}</h4><p>{{ item.desc }}</p></article></div>
      <div class="vv-brand-showcase cs-reveal"><img :src="brandMockup" alt="VisonVerse identity applied to an exterior brand sign" loading="lazy" /><div><span class="cs-card-kicker">Brand application</span><p>Carry the identity from the digital experience into the places people encounter the business.</p></div></div>
    </div></section>

    <section class="cs-metrics-strip vv-crm-section"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num cs-ghost-num--accent" aria-hidden="true">verified</span><div><div class="cs-eyebrow cs-eyebrow--accent">Lead Management</div><h2 class="cs-h2 cs-h2--light">A useful enquiry should not get lost</h2><p class="cs-section-sub cs-section-sub--light">Lead CRM and Google Sheets give the team an organized, shared view of incoming interest.</p></div></div>
      <div class="vv-lead-flow cs-reveal"><div class="vv-flow-step"><span class="material-symbols-outlined">contact_mail</span><strong>Website enquiry</strong><small>Visitor shares service and contact details</small></div><span class="material-symbols-outlined vv-flow-arrow">arrow_forward</span><div class="vv-flow-step vv-flow-step-primary"><span class="material-symbols-outlined">manage_accounts</span><strong>Lead CRM</strong><small>Enquiry captured and organized</small></div><span class="material-symbols-outlined vv-flow-arrow">arrow_forward</span><div class="vv-flow-step vv-flow-step-sheet"><span class="material-symbols-outlined">table_view</span><strong>Google Sheets</strong><small>Shared view for review and follow-up</small></div></div>
      <div class="cs-outcome-grid cs-stagger vv-outcome-grid"><article v-for="item in outcomes" :key="item.title" class="cs-outcome"><span class="material-symbols-outlined">{{ item.icon }}</span><h4>{{ item.title }}</h4><p>{{ item.desc }}</p></article></div>
      <p class="vv-measure-note"><span class="material-symbols-outlined">info</span>Outcomes describe the delivered brand, website and workflows; no verified business performance figures were provided.</p>
    </div></section>

    <section class="cs-section cs-section--muted"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">trending_up</span><div><div class="cs-eyebrow">Next Steps</div><h2 class="cs-h2">Let the lead journey improve with every conversation</h2><p class="cs-section-sub">As the enquiry pipeline grows, response ownership and reporting can evolve around the way the team works.</p></div></div>
      <div class="vv-next-grid cs-reveal"><p>Use the shared lead record to understand enquiry patterns, improve qualification and keep follow-up clear from the first message onward.</p><a href="https://www.visonverse.com/" target="_blank" rel="noopener noreferrer" class="cs-btn-primary">Visit VisonVerse <span aria-hidden="true">↗</span></a></div>
      <div class="cs-nav-row cs-reveal"><a href="/project/solved-cube-it-solutions" class="cs-nav-link"><span class="material-symbols-outlined">arrow_back</span> Previous Project</a><a href="/projects" class="cs-btn-ghost vv-nav-projects">All Projects</a><a href="/project/samsiddhi-designs" class="cs-nav-link cs-nav-link--right">Next Project <span class="material-symbols-outlined">arrow_forward</span></a></div>
    </div></section>

    <CaseStudyWorkWithUs project="VisonVerse Technology" industry="Technology & business services" accent="#4C5FF7" result="A connected brand and website experience with clear service discovery and a practical Lead CRM to Google Sheets workflow." :services="['Logo', 'Website', 'Google Business Profile', 'Branding', 'Lead CRM']" :proof="['Unified brand identity', 'Clear service discovery', 'Connected lead workflow']" />
  </main>
</template>

<style lang="scss" scoped>
.cs-hero, .cs-section, .cs-metrics-strip, .cs-meta-strip {
  --accent: #C67C5A;
  --accent-deep: #A8623F;
  --gold: #C67C5A;
  --midnight: #2E2A27;
  --frost: #FAF8F4;
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
  color: #3D2B1F;
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
  background: var(--espresso-dark);
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
    background: radial-gradient(circle, rgba(198,124,90,0.22), transparent 70%);
  }
  &--2 {
    bottom: -200px; left: -160px;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(159,18,57,0.1), transparent 70%);
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
  background: rgba(198,124,90,0.14);
  border: 1px solid rgba(198,124,90,0.35);
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
    box-shadow: 0 16px 36px rgba(198,124,90,0.32);
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
  border: 1px solid rgba(198,124,90,0.25);
  border-bottom: none;
  box-shadow: 0 -20px 100px rgba(198,124,90,0.08), 0 40px 120px rgba(0,0,0,0.6);

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
  border: 1px solid rgba(198,124,90,0.4);
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
  background: #C67C5A;
  box-shadow: 0 0 10px #C67C5A;
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
  background: #2E2A27;
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

  &--dark { background: #2E2A27; }
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
  color: rgba(61,43,31,0.06);
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
  color: #3D2B1F;
  line-height: 1.15;
  margin: 0;

  &--light { color: #fff; }
}

.cs-section-sub {
  margin-top: 0.75rem;
  color: #889280;
  font-size: 0.95rem;
  line-height: 1.7;

  &--light { color: rgba(255,255,255,0.55); }
}

.cs-lead-text {
  font-size: 1.08rem;
  color: #3D2B1F;
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
  color: #68594d;
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
  span, a { font-size: 0.86rem; color: #3D2B1F; text-decoration: none; }
  a:hover { color: var(--accent); }
}

.cs-client-card {
  position: relative;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  background: #2E2A27;
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

  h4 { font-size: 1rem; font-weight: 700; color: #3D2B1F; margin: 0 0 0.35rem; }
  p { font-size: 0.9rem; color: #889280; line-height: 1.75; margin: 0; }
}

.cs-pillar-num {
  flex-shrink: 0;
  width: 38px; height: 38px;
  border-radius: 10px;
  background: rgba(198,124,90,0.1);
  border: 1px solid rgba(198,124,90,0.25);
  color: var(--accent-deep);
  font-weight: 800;
  font-size: 0.78rem;
  display: flex; align-items: center; justify-content: center;
}

.cs-insight {
  padding: 2.25rem 2rem;
  border-radius: 18px;
  background: linear-gradient(160deg, #2E2A27, #3D2B1F);
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
  color: rgba(61,43,31,0.18);
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
  background: linear-gradient(180deg, var(--accent), rgba(198,124,90,0.15));
  margin-top: 0.25rem;
}

.timeline-body {
  padding-bottom: 2.25rem;
  h4 { font-size: 1rem; font-weight: 700; color: #3D2B1F; margin: 0 0 0.4rem; }
  p { font-size: 0.9rem; color: #889280; line-height: 1.75; margin: 0; }
}

// ─── Mockup wrap ──────────────────────────────────────────────────────
.cs-mockup-wrap {
  overflow: hidden;
  margin: 0 auto;
  max-width: 100%;

  img { 
    border-radius: 18px;
    width: 100%; 
    display: block;
    border: 1px solid rgba(198,124,90,0.15);
    margin-bottom: 2rem; 
  }
}

// ─── Metrics strip ─────────────────────────────────────────────────────
.cs-metrics-strip {
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: #2E2A27;
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
  border: 1px solid rgba(61,43,31,0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover { transform: translateY(-4px); box-shadow: 0 18px 48px rgba(61,43,31,0.08); }
  &--highlight {
    background: linear-gradient(160deg, #2E2A27, #3D2B1F);
    border-color: transparent;
    h4, p { color: #fff !important; }
    .material-symbols-outlined { color: var(--gold); }
  }

  .material-symbols-outlined { font-size: 1.5rem; color: var(--accent-deep); }
  h4 { font-size: 0.95rem; font-weight: 700; color: #3D2B1F; margin: 0.85rem 0 0.5rem; }
  p { font-size: 0.85rem; color: #889280; line-height: 1.65; margin: 0; }
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
  border-top: 1px solid rgba(61,43,31,0.08);

  @media (max-width: 600px) { flex-direction: column; }
}

.cs-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #68594d;
  text-decoration: none;
  transition: color 0.25s ease;

  &:hover { color: #3D2B1F; }
  &--right { flex-direction: row; }

  .material-symbols-outlined { font-size: 1.1rem; }
}



.visonverse-case {
  --accent:#4C5FF7; --accent-deep:#3B49D6; --gold:#FF6B57; --midnight:#10141F;
  --frost:#F7F5EF; --paper:#F7F5EF; --paper-soft:#fff; --paper-line:#E7E3D8;
  --ink:#10141F; --ink-soft:#161D2E; --ink-line:#252D42;
  --ivory:#F7F5EF; --sand:#fff; --linen:#E7E3D8; --sage:#FF6B57; --sage-dark:#71798a;
  --espresso:#10141F; --espresso-dark:#10141F; --terracotta:#4C5FF7; --terracotta-dark:#3B49D6;
}
.cs-hero,.cs-section,.cs-metrics-strip,.cs-meta-strip { font-family:'Poppins',sans-serif; }
.cs-hero { --accent:#4C5FF7;--accent-deep:#3B49D6;--gold:#FF6B57;--midnight:#10141F;--frost:#F7F5EF; }
.cs-section { --accent:#4C5FF7;--accent-deep:#3B49D6;--gold:#FF6B57;--midnight:#10141F;--frost:#F7F5EF;background:#F7F5EF; }
.cs-section--dark,.cs-metrics-strip { background:#10141F; }
.cs-section--muted { background:#eeedf5; }
.cs-meta-strip { background:#161D2E; }
.cs-hero-glow--1 { background:radial-gradient(ellipse,rgba(76,95,247,.23),transparent 68%); }
.cs-hero-glow--2 { background:radial-gradient(ellipse,rgba(255,107,87,.12),transparent 68%); }
.cs-hero-title { color:#F7F5EF; }
.cs-hero-sub { color:rgba(247,245,239,.76); }
.cs-hero-stat-val { color:#8995ff; }
.cs-hero-stat-label { color:rgba(247,245,239,.57); }
.cs-hero-stat-divider { background:rgba(231,227,216,.22); }
.eyebrow-pill { color:#bfc6ff;background:rgba(76,95,247,.15);border-color:rgba(76,95,247,.38); }
.cs-btn-primary { background:#4C5FF7;border-color:#4C5FF7;color:#fff; }
.cs-btn-primary:hover { background:#3B49D6;border-color:#3B49D6;color:#fff; }
.cs-btn-ghost { border-color:rgba(247,245,239,.3);color:#F7F5EF; }
.cs-btn-ghost:hover { background:rgba(247,245,239,.08);border-color:#8995ff;color:#fff; }
.cs-hero-mockup { border-color:rgba(76,95,247,.42);box-shadow:0 -20px 100px rgba(76,95,247,.12),0 40px 100px rgba(0,0,0,.32); }
.cs-hero-mockup-float { border-color:rgba(76,95,247,.55);color:#F7F5EF; }
.float-dot { background:#4C5FF7;box-shadow:0 0 10px #4C5FF7; }
.cs-hero-mockup-tags span { border-color:rgba(231,227,216,.23);color:#F7F5EF; }
.cs-meta-label { color:rgba(231,227,216,.58); }.cs-meta-value { color:#F7F5EF; }.cs-meta-link { color:#8995ff!important; }
.cs-ghost-num { color:rgba(16,20,31,.09); }.cs-ghost-num--accent { color:rgba(247,245,239,.1); }
.cs-eyebrow { color:#3B49D6; }.cs-eyebrow--accent { color:#8995ff; }
.cs-h2 { color:#10141F; }.cs-h2--light { color:#F7F5EF; }
.cs-section-sub { color:#626b7c; }.cs-section-sub--light { color:rgba(247,245,239,.7); }
.cs-lead-text { color:#10141F; }.cs-client-copy p { color:#5f6572; }
.cs-fact { background:#fff; }.cs-fact .material-symbols-outlined,.cs-fact strong { color:#3B49D6; }.cs-fact span,.cs-fact a { color:#10141F; }
.cs-client-card { background:#161D2E;border:1px solid rgba(231,227,216,.16); }.cs-card-kicker { color:#aab3ff;font-size:.67rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase; }
.cs-quote-mark { color:#FF6B57; }.cs-client-quote { color:#F7F5EF;font-family:Georgia,serif;font-size:1.3rem; }.cs-client-quote-attr { color:#c6c9d1; }
.vv-client-logo { display:block;width:min(100%,190px);height:auto;margin:0 0 1.3rem;border-radius:6px; }
.cs-challenge-row { border-color:rgba(231,227,216,.15); }.cs-challenge-num { color:rgba(231,227,216,.5); }.cs-challenge-icon { color:#8995ff; }.cs-challenge-body h3 { color:#F7F5EF; }.cs-challenge-body p { color:rgba(247,245,239,.68); }
.cs-pillar-num { background:rgba(76,95,247,.1);border-color:rgba(76,95,247,.27);color:#3B49D6; }
.cs-pillar h4,.timeline-body h4 { color:#10141F; }.cs-pillar p,.timeline-body p { color:#656b78; }
.cs-insight { background:linear-gradient(155deg,#161D2E,#10141F);border:1px solid rgba(231,227,216,.15); }.cs-insight-icon { color:#8995ff; }.cs-insight h4 { color:#F7F5EF; }.cs-insight p { color:rgba(247,245,239,.72); }.cs-insight-action { color:#aab3ff!important; }
.timeline-week { color:rgba(16,20,31,.35); }.timeline-dot { background:#4C5FF7;box-shadow:0 0 0 2px #4C5FF7;border-color:#eeedf5; }.timeline-line { background:linear-gradient(180deg,#4C5FF7,rgba(76,95,247,.2)); }
.vv-website-section { background:#fff; }.vv-desktop-showcase { padding:12px;background:#F7F5EF;border:1px solid #E7E3D8;border-radius:15px;box-shadow:0 24px 64px rgba(16,20,31,.1); }.vv-desktop-showcase img { display:block;width:100%;margin:0;border-radius:8px; }
.vv-capability-grid .cs-outcome { background:rgba(247,245,239,.055);border-color:rgba(231,227,216,.17); }.vv-capability-grid .cs-outcome .material-symbols-outlined { color:#8995ff; }.vv-capability-grid .cs-outcome h4 { color:#F7F5EF; }.vv-capability-grid .cs-outcome p { color:rgba(247,245,239,.68); }
.vv-brand-showcase { display:grid;grid-template-columns:1fr .48fr;gap:24px;align-items:center;margin-top:26px;padding:15px;background:rgba(247,245,239,.06);border:1px solid rgba(231,227,216,.17);border-radius:12px; }.vv-brand-showcase img { display:block;width:100%;border-radius:8px; }.vv-brand-showcase p { margin:.6rem 0 0;color:rgba(247,245,239,.68);font-size:.85rem;line-height:1.7; }
.vv-crm-section { background:#161D2E; }.vv-lead-flow { display:grid;grid-template-columns:1fr 32px 1fr 32px 1fr;align-items:center;gap:12px;margin:0 0 36px;padding:24px;border:1px solid rgba(231,227,216,.16);border-radius:14px;background:rgba(247,245,239,.045); }.vv-flow-step { display:flex;min-height:145px;flex-direction:column;align-items:flex-start;justify-content:center;padding:18px;border:1px solid rgba(231,227,216,.17);border-radius:10px;background:rgba(16,20,31,.72); }.vv-flow-step>.material-symbols-outlined { margin-bottom:14px;color:#8995ff;font-size:23px; }.vv-flow-step strong { color:#F7F5EF;font-size:.9rem; }.vv-flow-step small { margin-top:6px;color:rgba(247,245,239,.59);font-size:.72rem;line-height:1.55; }.vv-flow-step-primary { border-color:rgba(76,95,247,.65); }.vv-flow-step-sheet>.material-symbols-outlined { color:#76d4a0; }.vv-flow-arrow { justify-self:center;color:#8995ff;font-size:21px; }
.vv-outcome-grid .cs-outcome { background:rgba(247,245,239,.055);border-color:rgba(231,227,216,.16); }.vv-outcome-grid .cs-outcome h4 { color:#F7F5EF; }.vv-outcome-grid .cs-outcome p { color:rgba(247,245,239,.68); }.vv-outcome-grid .cs-outcome .material-symbols-outlined { color:#8995ff; }
.vv-measure-note { display:flex;gap:.6rem;align-items:flex-start;margin:22px 0 0;color:rgba(247,245,239,.53);font-size:.72rem;line-height:1.6; }.vv-measure-note .material-symbols-outlined { color:#8995ff;font-size:17px; }
.vv-next-grid { display:flex;align-items:center;justify-content:space-between;gap:2rem;margin-bottom:2.5rem; }.vv-next-grid p { max-width:680px;color:#5f6572;line-height:1.8; }.cs-nav-row { border-color:rgba(16,20,31,.16); }.cs-nav-link { color:#10141F; }.cs-nav-link:hover { color:#3B49D6; }.vv-nav-projects { border-color:#cbd0f5;color:#10141F; }.vv-nav-projects:hover { color:#10141F;background:#eeedf5; }
@media (max-width:768px) { .vv-brand-showcase { grid-template-columns:1fr; }.vv-lead-flow { grid-template-columns:1fr; }.vv-flow-arrow { transform:rotate(90deg); }.vv-next-grid { align-items:flex-start;flex-direction:column;gap:1rem; } }
@media (prefers-reduced-motion:reduce) { .visonverse-case *,.visonverse-case *::before,.visonverse-case *::after { scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important; } }
/* Replace repetitive section counters with semantic iconography. */
.cs-ghost-num { font-family:"Material Symbols Outlined";font-size:clamp(3rem,6vw,5.5rem);line-height:.8;font-weight:400;font-variant-numeric:normal;font-variation-settings:"FILL" 0,"wght" 400; }

.cs-challenge-row { grid-template-columns:50px minmax(0,1fr); }
.cs-pillar-num { font-family:"Material Symbols Outlined";font-size:1.2rem;font-weight:400; }
.timeline-week { display:flex;align-items:flex-start;justify-content:center;font-family:"Material Symbols Outlined";font-size:1.25rem;font-weight:400;line-height:1;color:var(--accent);padding-top:.05rem; }
@media (max-width:600px) { .cs-challenge-row { grid-template-columns:36px minmax(0,1fr); } }
@media (max-width:768px) {
  .cs-nav-row { display:grid;grid-template-columns:1fr 1fr;gap:1rem; }
  .cs-nav-row > .cs-btn-ghost { display:none!important; }
  .cs-nav-link--right { justify-self:end; }
}
</style>
