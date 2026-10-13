<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CaseStudyWorkWithUs from "@/components/CaseStudyWorkWithUs.vue";

gsap.registerPlugin(ScrollTrigger);

const heroMockup = new URL("../../assets/img/project/c17/project-vl.png", import.meta.url).href;

const challenges = [
  { num: "01", icon: "redeem", title: "Many occasions, one clear starting point", desc: "Flowers, hampers, cakes, home décor, corporate and personalized gifting each need a simple route into the right collection." },
  { num: "02", icon: "search", title: "Help people find the right gesture", desc: "Collection browsing and a guided gift finder help visitors narrow down ideas for the person and occasion." },
  { num: "03", icon: "chat", title: "Make conversations part of ordering", desc: "Personalized gifting can need a quick conversation. WhatsApp gives customers a direct way to enquire and place an order." },
  { num: "04", icon: "hub", title: "Keep enquiries and orders organized", desc: "Consultations and product enquiries need follow-up, while confirmed orders need a dedicated workflow for coordination." },
];

const strategy = [
  { title: "Lead with the feeling", desc: "Pair luxury gifting imagery with a warm, confident brand introduction and clear ways to shop or request a consultation." },
  { title: "Browse by collection or occasion", desc: "Use six gifting categories, occasion cues and a guided gift finder to help visitors find a thoughtful direction." },
  { title: "Offer a human route to order", desc: "Keep consultation and WhatsApp enquiry options close to the collections for customers who want help choosing or placing an order." },
];

const journey = [
  { week: "01", phase: "Discover Velourah", desc: "Meet the gifting house through its story, service promise and luxury visual language." },
  { week: "02", phase: "Browse collections", desc: "Explore flowers, hampers, cakes, home décor, corporate gifts or personalized pieces." },
  { week: "03", phase: "Find a thoughtful fit", desc: "Use occasion cues or the guided gift finder to shape an idea for the person and moment." },
  { week: "04", phase: "Enquire and place an order", desc: "Request a gifting consultation or continue the conversation through WhatsApp." },
  { week: "05", phase: "Follow through with care", desc: "The Lead CRM and Order CRM support the team as an enquiry becomes an order to coordinate." },
];

const systems = [
  { icon: "person_search", title: "Lead CRM", desc: "Capture and organize incoming enquiries, consultations and customer follow-up in one lead workflow." },
  { icon: "receipt_long", title: "Order CRM", desc: "Keep customer orders visible to the team for coordination and ongoing order management." },
  { icon: "forum", title: "WhatsApp ordering", desc: "Give customers a direct conversation-led route to ask about a gift and place an order." },
];

const collections = [
  { icon: "local_florist", title: "Flowers", desc: "Fresh. Elegant. Timeless." },
  { icon: "card_giftcard", title: "Hampers", desc: "Curated with love and luxury." },
  { icon: "cake", title: "Cakes", desc: "Made to celebrate beautiful moments." },
  { icon: "weekend", title: "Home décor", desc: "Add charm to every space." },
  { icon: "business_center", title: "Corporate gifts", desc: "Thoughtful gifting for every occasion." },
  { icon: "redeem", title: "Personalized gifts", desc: "Made personal. Made special." },
];

const outcomes = [
  { icon: "auto_awesome", title: "A distinctive luxury gifting presence", desc: "The visual experience supports Velourah’s promise of thoughtful gifts, timeless moments and attention to detail." },
  { icon: "category", title: "Clear ways to explore", desc: "Six collection routes, occasion cues and a guided gift finder help visitors find their way to a gift idea." },
  { icon: "chat", title: "A human way to order", desc: "Consultation and WhatsApp enquiry routes let customers talk through a gift before confirming it." },
  { icon: "manage_search", title: "Connected customer follow-up", desc: "Lead CRM and Order CRM give enquiries and orders dedicated workflows for the team." },
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
  <main class="velourah-case">
    <section class="cs-hero">
      <div class="cs-hero-noise" aria-hidden="true"></div>
      <div class="cs-hero-glow cs-hero-glow--1" aria-hidden="true"></div>
      <div class="cs-hero-glow cs-hero-glow--2" aria-hidden="true"></div>
      <div class="cs-shell">
        <nav class="cs-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>&#8226;</span><a href="/projects">Projects</a><span>&#8226;</span><span class="active">Velourah</span></nav>
        <div class="cs-hero-eyebrow"><span class="eyebrow-pill">Luxury Gifting</span>Digital Storefront · Lead CRM · Order CRM · WhatsApp Ordering</div>
        <h1 class="cs-hero-title"><span class="cs-line">Velourah</span></h1>
        <div class="cs-hero-split">
          <p class="cs-hero-sub">Thoughtfully curated gifts. Timeless moments. Made just for you. We shaped a polished gifting experience that helps customers discover something meaningful, get personal guidance and continue an order through WhatsApp, with connected CRM workflows behind the scenes.</p>
          <div class="cs-hero-stats">
            <div class="cs-hero-stat"><span class="cs-hero-stat-val">Discover</span><span class="cs-hero-stat-label">Gift collections</span></div>
            <div class="cs-hero-stat-divider"></div>
            <div class="cs-hero-stat"><span class="cs-hero-stat-val">Connect</span><span class="cs-hero-stat-label">WhatsApp ordering</span></div>
            <div class="cs-hero-stat-divider"></div>
            <div class="cs-hero-stat"><span class="cs-hero-stat-val">Manage</span><span class="cs-hero-stat-label">Lead &amp; order CRM</span></div>
          </div>
        </div>
        <div class="cs-hero-ctas"><a href="https://velourah.co.in/" target="_blank" rel="noopener noreferrer" class="cs-btn-primary">Visit Live Site <span aria-hidden="true">↗</span></a><a href="/projects" class="cs-btn-ghost">All Projects</a></div>
        <div class="cs-hero-mockup-wrap">
          <div class="cs-hero-mockup"><img :src="heroMockup" alt="Velourah luxury gifting website and collection catalogue design" /></div>
          <div class="cs-hero-mockup-float"><span class="float-dot"></span>Live gifting experience</div>
          <div class="cs-hero-mockup-tags"><span>E-commerce</span><span>Lead CRM</span><span>Order CRM</span><span>WhatsApp Ordering</span></div>
        </div>
      </div>
    </section>

    <section class="cs-meta-strip"><div class="cs-shell cs-meta-grid">
      <div class="cs-meta-item"><span class="cs-meta-label">Client</span><span class="cs-meta-value">Velourah</span></div>
      <div class="cs-meta-item"><span class="cs-meta-label">Industry</span><span class="cs-meta-value">Luxury gifting</span></div>
      <div class="cs-meta-item"><span class="cs-meta-label">Engagement</span><span class="cs-meta-value">Digital storefront &middot; Lead CRM &middot; Order CRM &middot; WhatsApp</span></div>
      <div class="cs-meta-item"><span class="cs-meta-label">Live Site</span><span class="cs-meta-value"><a href="https://velourah.co.in/" target="_blank" rel="noopener noreferrer" class="cs-meta-link">velourah.co.in ↗</a></span></div>
    </div></section>

    <section class="cs-section"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">business_center</span><div><div class="cs-eyebrow">The Brand</div><h2 class="cs-h2">A gifting house for moments that matter</h2></div></div>
      <div class="cs-client-grid cs-reveal"><div class="cs-client-copy">
        <p class="cs-lead-text">Velourah is a luxury gifting house in Bangalore, bringing together thoughtful gifts for celebrations, personal gestures and corporate occasions. The experience pairs refined presentation with six curated collections and a guided gift finder to help visitors find a meaningful place to start.</p>
        <p>Visitors can learn about the brand, browse gifting collections, request a consultation or continue an enquiry through WhatsApp. Behind the storefront, Lead CRM and Order CRM support customer follow-up and order coordination.</p>
        <div class="cs-fact-list">
          <div class="cs-fact"><span class="material-symbols-outlined">redeem</span><div><strong>Gift collections</strong><span>Flowers, hampers, cakes, home décor &amp; more</span></div></div>
          <div class="cs-fact"><span class="material-symbols-outlined">celebration</span><div><strong>For the occasion</strong><span>Celebrations, personal and corporate gifting</span></div></div>
          <div class="cs-fact"><span class="material-symbols-outlined">forum</span><div><strong>Order channel</strong><span>Direct WhatsApp ordering</span></div></div>
          <div class="cs-fact"><span class="material-symbols-outlined">language</span><div><strong>Live site</strong><a href="https://velourah.co.in/" target="_blank" rel="noopener noreferrer">velourah.co.in</a></div></div>
        </div>
      </div><aside class="cs-client-card"><span class="cs-card-kicker">The brand promise</span><span class="cs-quote-mark material-symbols-outlined">format_quote</span><p class="cs-client-quote">“Luxury in every detail.”</p><div class="cs-client-quote-attr">A considered gifting experience</div></aside></div>
    </div></section>

    <section class="cs-section cs-section--dark"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num cs-ghost-num--accent" aria-hidden="true">target</span><div><div class="cs-eyebrow cs-eyebrow--accent">The Opportunity</div><h2 class="cs-h2 cs-h2--light">Make thoughtful gifting easier to navigate</h2><p class="cs-section-sub cs-section-sub--light">A gifting store has to inspire customers and make the next step feel clear, even when the order calls for a conversation.</p></div></div>
      <div class="cs-challenge-list cs-stagger"><div v-for="item in challenges" :key="item.num" class="cs-challenge-row"><span class="material-symbols-outlined cs-challenge-icon">{{ item.icon }}</span><div class="cs-challenge-body"><h3>{{ item.title }}</h3><p>{{ item.desc }}</p></div></div></div>
    </div></section>

    <section class="cs-section"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">lightbulb</span><div><div class="cs-eyebrow">Experience Strategy</div><h2 class="cs-h2">A little discovery. A personal touch.</h2></div></div>
      <div class="cs-strategy-grid"><div class="cs-strategy-copy cs-reveal">
        <p class="cs-lead-text">Gifting is personal. The experience brings together the ease of browsing a curated collection with the reassurance of being able to talk to the team when a gift needs a little more thought.</p>
        <div v-for="(item, i) in strategy" :key="item.title" class="cs-pillar"><span class="material-symbols-outlined cs-pillar-num" aria-hidden="true">{{ getCaseIcon(item.title) }}</span><div><h4>{{ item.title }}</h4><p>{{ item.desc }}</p></div></div>
      </div><aside class="cs-insight cs-reveal"><span class="material-symbols-outlined cs-insight-icon">lightbulb</span><h4>Designed around the gifting moment</h4><p>Let visitors browse at their own pace, then make it easy to ask for guidance or place an order through WhatsApp.</p><div class="cs-insight-divider"></div><p class="cs-insight-action">The Lead CRM and Order CRM carry that customer journey into the team’s follow-up and order workflows.</p></aside></div>
    </div></section>

    <section class="cs-section cs-section--muted"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">conversion_path</span><div><div class="cs-eyebrow">Customer Journey</div><h2 class="cs-h2">From the first idea to a gift on its way</h2><p class="cs-section-sub">A clear route from discovery to a personal order conversation, supported by dedicated CRM workflows.</p></div></div>
      <div class="cs-timeline"><div v-for="(item, i) in journey" :key="item.week" class="timeline-row"><span class="material-symbols-outlined timeline-week" aria-hidden="true">{{ getCaseIcon(item.phase || item.step) }}</span><div class="timeline-rail"><div class="timeline-dot"></div><div v-if="i < journey.length - 1" class="timeline-line"></div></div><div class="timeline-body"><h4>{{ item.phase }}</h4><p>{{ item.desc }}</p></div></div></div>
    </div></section>

    <section class="cs-section velourah-showcase-section"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">web</span><div><div class="cs-eyebrow">The Collections</div><h2 class="cs-h2">Six ways to say something unforgettable</h2><p class="cs-section-sub">Distinct collection routes make it easier to find a gift that fits the occasion, the person and the feeling behind it.</p></div></div>
      <div class="cs-outcome-grid cs-stagger velourah-collection-grid"><article v-for="(item, i) in collections" :key="item.title" class="cs-outcome"><span class="material-symbols-outlined">{{ item.icon }}</span><h4>{{ item.title }}</h4><p>{{ item.desc }}</p></article></div>
    </div></section>

    <section class="cs-section cs-section--dark velourah-crm-section"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num cs-ghost-num--accent" aria-hidden="true">settings</span><div><div class="cs-eyebrow cs-eyebrow--accent">Connected Operations</div><h2 class="cs-h2 cs-h2--light">From customer conversation to team follow-through</h2><p class="cs-section-sub cs-section-sub--light">Lead and order workflows help the team manage incoming interest and the orders that follow.</p></div></div>
      <div class="cs-outcome-grid cs-stagger velourah-system-grid"><article v-for="item in systems" :key="item.title" class="cs-outcome"><span class="material-symbols-outlined">{{ item.icon }}</span><h4>{{ item.title }}</h4><p>{{ item.desc }}</p></article></div>
      <div class="velourah-flow-note cs-reveal"><span class="material-symbols-outlined">conversion_path</span><p><strong>A connected customer path</strong>Website discovery and WhatsApp ordering create ways for customers to engage; the Lead CRM and Order CRM help the team carry those conversations forward.</p></div>
    </div></section>

    <section class="cs-metrics-strip velourah-outcomes"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num cs-ghost-num--accent" aria-hidden="true">verified</span><div><div class="cs-eyebrow cs-eyebrow--accent">Outcome</div><h2 class="cs-h2 cs-h2--light">A more considered gifting experience</h2><p class="cs-section-sub cs-section-sub--light">The project connects brand presentation, product discovery and practical customer follow-through.</p></div></div>
      <div class="cs-outcome-grid cs-stagger velourah-outcome-grid"><article v-for="item in outcomes" :key="item.title" class="cs-outcome"><span class="material-symbols-outlined">{{ item.icon }}</span><h4>{{ item.title }}</h4><p>{{ item.desc }}</p></article></div>
      <p class="velourah-measure-note"><span class="material-symbols-outlined">info</span>No verified analytics or business performance figures were supplied, so outcomes describe the delivered experience and workflows rather than quantified growth.</p>
    </div></section>

    <section class="cs-section cs-section--muted"><div class="cs-shell">
      <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">trending_up</span><div><div class="cs-eyebrow">Next Steps</div><h2 class="cs-h2">Keep refining the gifting journey</h2><p class="cs-section-sub">Connect customer touchpoints to reporting, then use real enquiry and order patterns to guide what comes next.</p></div></div>
      <div class="velourah-next cs-reveal"><p>Track how visitors move from collection discovery to WhatsApp conversations and completed orders. That gives the team a baseline for improving product discovery, consultation handoffs and customer follow-up over time.</p><a href="https://velourah.co.in/" target="_blank" rel="noopener noreferrer" class="cs-btn-primary">Visit Velourah <span aria-hidden="true">↗</span></a></div>
      <div class="cs-nav-row cs-reveal"><a href="/project/the-verde-cozy-co" class="cs-nav-link"><span class="material-symbols-outlined">arrow_back</span> Previous Project</a><a href="/projects" class="cs-btn-ghost velourah-nav-projects">All Projects</a><a href="/project/microrelic" class="cs-nav-link cs-nav-link--right">Next Project <span class="material-symbols-outlined">arrow_forward</span></a></div>
    </div></section>

    <CaseStudyWorkWithUs project="Velourah" industry="Luxury gifting" accent="#D4AF37" result="A polished gifting storefront that makes it easy to explore collections, order through WhatsApp and manage customer follow-through." :services="['E-commerce experience', 'Lead CRM', 'Order CRM', 'WhatsApp ordering']" :proof="['Guided gift discovery', 'Conversation-led ordering', 'Connected lead and order workflows']" />
  </main>
</template>

<style lang="scss" scoped>
.cs-hero, .cs-section, .cs-metrics-strip, .cs-meta-strip {
  --accent: #4B2E4D;
  --accent-deep: #331f34;
  --gold: #D4AF37;
  --midnight: #331f34;
  --frost: #F7F1E8;
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
  color: #331f34;
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
  background: var(--plum-dark);
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
    background: radial-gradient(circle, rgba(75,46,77,0.22), transparent 70%);
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
  background: rgba(75,46,77,0.14);
  border: 1px solid rgba(75,46,77,0.35);
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
    box-shadow: 0 16px 36px rgba(75,46,77,0.32);
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
  border: 1px solid rgba(75,46,77,0.25);
  border-bottom: none;
  box-shadow: 0 -20px 100px rgba(75,46,77,0.08), 0 40px 120px rgba(0,0,0,0.6);

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
  border: 1px solid rgba(75,46,77,0.4);
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
  background: #4B2E4D;
  box-shadow: 0 0 10px #4B2E4D;
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
  background: #331f34;
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

  &--dark { background: #331f34; }
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
  color: rgba(51,31,52,0.06);
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
  color: #331f34;
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
  color: #4B2E4D;
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
  color: #6b4870;
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
  span, a { font-size: 0.86rem; color: #4B2E4D; text-decoration: none; }
  a:hover { color: var(--accent); }
}

.cs-client-card {
  position: relative;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  background: #331f34;
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

  h4 { font-size: 1rem; font-weight: 700; color: #331f34; margin: 0 0 0.35rem; }
  p { font-size: 0.9rem; color: #889280; line-height: 1.75; margin: 0; }
}

.cs-pillar-num {
  flex-shrink: 0;
  width: 38px; height: 38px;
  border-radius: 10px;
  background: rgba(75,46,77,0.1);
  border: 1px solid rgba(75,46,77,0.25);
  color: var(--accent-deep);
  font-weight: 800;
  font-size: 0.78rem;
  display: flex; align-items: center; justify-content: center;
}

.cs-insight {
  padding: 2.25rem 2rem;
  border-radius: 18px;
  background: linear-gradient(160deg, #331f34, #4B2E4D);
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
  color: rgba(51,31,52,0.18);
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
  background: linear-gradient(180deg, var(--accent), rgba(75,46,77,0.15));
  margin-top: 0.25rem;
}

.timeline-body {
  padding-bottom: 2.25rem;
  h4 { font-size: 1rem; font-weight: 700; color: #331f34; margin: 0 0 0.4rem; }
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
    border: 1px solid rgba(75,46,77,0.15);
    margin-bottom: 2rem; 
  }
}

// ─── Metrics strip ─────────────────────────────────────────────────────
.cs-metrics-strip {
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: #331f34;
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
  border: 1px solid rgba(51,31,52,0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover { transform: translateY(-4px); box-shadow: 0 18px 48px rgba(51,31,52,0.08); }
  &--highlight {
    background: linear-gradient(160deg, #331f34, #4B2E4D);
    border-color: transparent;
    h4, p { color: #fff !important; }
    .material-symbols-outlined { color: var(--gold); }
  }

  .material-symbols-outlined { font-size: 1.5rem; color: var(--accent-deep); }
  h4 { font-size: 0.95rem; font-weight: 700; color: #331f34; margin: 0.85rem 0 0.5rem; }
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
  border-top: 1px solid rgba(51,31,52,0.08);

  @media (max-width: 600px) { flex-direction: column; }
}

.cs-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #6b4870;
  text-decoration: none;
  transition: color 0.25s ease;

  &:hover { color: #331f34; }
  &--right { flex-direction: row; }

  .material-symbols-outlined { font-size: 1.1rem; }
}


/* Velourah palette and CRM showcase styles */

.velourah-case {
  --accent: #4B2E4D;
  --accent-deep: #331f34;
  --gold: #D4AF37;
  --midnight: #331f34;
  --frost: #F7F1E8;
  --plum: #4B2E4D;
  --plum-light: #6b4870;
  --plum-dark: #331f34;
  --lav: #A98BB7;
  --lav-light: #c4aed0;
  --lav-subtle: #c9b3d3;
  --blush: #F3D6D6;
  --cream: #F7F1E8;
  --gold-dark: #a9862a;
}

.cs-hero, .cs-section, .cs-metrics-strip, .cs-meta-strip { font-family: 'Poppins', sans-serif; }
.cs-hero { --accent: #D4AF37; --accent-deep: #A9862A; --gold: #D4AF37; --midnight: #331F34; --frost: #F7F1E8; }
.cs-section { --accent: #D4AF37; --accent-deep: #331F34; --gold: #D4AF37; --midnight: #331F34; --frost: #F7F1E8; background: var(--cream); }
.cs-section--dark, .cs-metrics-strip { background: var(--plum-dark); }
.cs-section--muted { background: var(--cream); }
.cs-section--accent-deep { background: var(--plum-light); }
.cs-meta-strip { background: var(--plum-dark); }
.cs-hero-glow--1 { background: radial-gradient(ellipse, rgba(169,139,183,.22), transparent 68%); }
.cs-hero-glow--2 { background: radial-gradient(ellipse, rgba(212,175,55,.12), transparent 68%); }
.cs-hero-title { color: var(--cream); }
.cs-hero-sub { color: rgba(247,241,232,.76); }
.cs-hero-stat-val { color: var(--gold); }
.cs-hero-stat-label { color: rgba(247,241,232,.62); }
.cs-hero-stat-divider { background: rgba(247,241,232,.22); }
.cs-btn-primary { background: var(--gold); border-color: var(--gold); color: var(--plum-dark); }
.cs-btn-primary:hover { background: var(--gold-dark); border-color: var(--gold-dark); color: var(--cream); }
.cs-btn-ghost { border-color: rgba(247,241,232,.35); color: var(--cream); }
.cs-btn-ghost:hover { background: rgba(247,241,232,.08); border-color: var(--lav-light); color: var(--cream); }
.cs-hero-mockup { border-color: rgba(169,139,183,.38); box-shadow: 0 -20px 100px rgba(169,139,183,.13), 0 40px 100px rgba(0,0,0,.35); }
.cs-hero-mockup-float { border-color: rgba(212,175,55,.48); color: var(--cream); }
.float-dot { background: var(--gold); box-shadow: 0 0 10px var(--gold); }
.cs-hero-mockup-tags span { border-color: rgba(201,179,211,.3); color: var(--cream); }
.cs-meta-strip { border-color: rgba(247,241,232,.12); }
.cs-meta-label { color: rgba(247,241,232,.55); }
.cs-meta-value { color: var(--cream); }
.cs-meta-link { color: var(--gold)!important; }
.cs-ghost-num { color: rgba(75,46,77,.1); }
.cs-ghost-num--accent { color: rgba(247,241,232,.1); }
.cs-eyebrow { color: var(--plum); }
.cs-eyebrow--accent { color: var(--gold); }
.cs-h2 { color: var(--plum-dark); }
.cs-h2--light { color: var(--cream); }
.cs-section-sub { color: #786b78; }
.cs-section-sub--light { color: rgba(247,241,232,.7); }
.cs-lead-text { color: var(--plum-dark); }
.cs-client-copy p { color: #655866; }
.cs-fact { background: var(--blush); }
.cs-fact .material-symbols-outlined, .cs-fact strong { color: var(--plum); }
.cs-fact span, .cs-fact a { color: var(--plum-dark); }
.cs-client-card { background: var(--plum); border: 1px solid rgba(196,174,208,.28); }
.cs-card-kicker { color: var(--lav-light); font-size: .67rem; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.cs-quote-mark { color: var(--gold); }
.cs-client-quote { color: var(--cream); font-family: Georgia, serif; font-size: 1.3rem; }
.cs-client-quote-attr { color: var(--lav-light); }
.cs-challenge-row { border-color: rgba(247,241,232,.16); }
.cs-challenge-num { color: rgba(247,241,232,.46); }
.cs-challenge-icon { color: var(--gold); }
.cs-challenge-body h3 { color: var(--cream); }
.cs-challenge-body p { color: rgba(247,241,232,.7); }
.cs-pillar-num { background: rgba(169,139,183,.15); border-color: rgba(169,139,183,.36); color: var(--plum); }
.cs-pillar h4, .timeline-body h4 { color: var(--plum-dark); }
.cs-pillar p, .timeline-body p { color: #786b78; }
.cs-insight { background: linear-gradient(155deg, var(--plum), var(--plum-dark)); border: 1px solid rgba(196,174,208,.2); }
.cs-insight-icon { color: var(--gold); }
.cs-insight h4 { color: var(--cream); }
.cs-insight p { color: rgba(247,241,232,.75); }
.cs-insight-action { color: var(--lav-light)!important; }
.timeline-week { color: rgba(75,46,77,.38); }
.timeline-dot { background: var(--gold); box-shadow: 0 0 0 2px var(--gold); border-color: var(--cream); }
.timeline-line { background: linear-gradient(180deg, var(--gold), rgba(212,175,55,.2)); }
.cs-mockup-wrap img { border-color: rgba(75,46,77,.15); }
.velourah-collection-grid .cs-outcome { position: relative; overflow: hidden; background: #fffaf4; border-color: var(--blush); }
.velourah-collection-grid .cs-outcome::after { position: absolute; content: ""; width: 120px; height: 120px; right: -66px; bottom: -67px; border: 1px solid rgba(169,139,183,.24); border-radius: 50%; box-shadow: 0 0 0 14px rgba(169,139,183,.06), 0 0 0 28px rgba(169,139,183,.04); }
.velourah-collection-num { display: block; color: var(--gold-dark); font-size: .65rem; font-weight: 800; letter-spacing: .12em; margin-bottom: .7rem; }
.cs-outcome { background: var(--cream); border-color: rgba(75,46,77,.13); }
.cs-outcome .material-symbols-outlined { color: var(--plum); }
.cs-outcome h4 { color: var(--plum-dark); }
.cs-outcome p { color: #786b78; }
.velourah-crm-section .cs-outcome { background: rgba(247,241,232,.07); border-color: rgba(196,174,208,.23); }
.velourah-crm-section .cs-outcome .material-symbols-outlined { color: var(--gold); }
.velourah-crm-section .cs-outcome h4 { color: var(--cream); }
.velourah-crm-section .cs-outcome p { color: rgba(247,241,232,.72); }
.velourah-flow-note { display: flex; gap: 1rem; align-items: flex-start; padding: 1.2rem 1.4rem; border: 1px solid rgba(196,174,208,.22); border-radius: 12px; background: rgba(247,241,232,.05); }
.velourah-flow-note .material-symbols-outlined { color: var(--gold); }
.velourah-flow-note p { margin: 0; color: rgba(247,241,232,.72); font-size: .85rem; line-height: 1.7; }
.velourah-flow-note strong { display: block; color: var(--lav-light); margin-bottom: .25rem; }
.velourah-outcomes { background: var(--plum-dark); }
.velourah-outcome-grid .cs-outcome { background: rgba(247,241,232,.065); border-color: rgba(196,174,208,.2); }
.velourah-outcome-grid .cs-outcome h4 { color: var(--cream); }
.velourah-outcome-grid .cs-outcome p { color: rgba(247,241,232,.72); }
.velourah-outcome-grid .cs-outcome .material-symbols-outlined { color: var(--gold); }
.velourah-measure-note { display: flex; align-items: flex-start; gap: .55rem; margin: 1.5rem 0 0; padding-top: 1rem; border-top: 1px solid rgba(247,241,232,.15); color: rgba(247,241,232,.63); font-size: .76rem; line-height: 1.65; }
.velourah-measure-note .material-symbols-outlined { font-size: 17px; color: var(--lav-light); }
.velourah-next { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
.velourah-next p { max-width: 700px; color: #655866; line-height: 1.8; }
.cs-nav-row { border-color: rgba(75,46,77,.16); }
.cs-nav-link { color: var(--plum-dark); }
.cs-nav-link:hover { color: var(--plum-light); }
.velourah-nav-projects { border-color: var(--lav); color: var(--plum); }
.velourah-nav-projects:hover { color: var(--plum-dark); background: var(--blush); }

@media (max-width: 768px) {
  .velourah-next { align-items: flex-start; flex-direction: column; gap: 1rem; }
  .cs-hero-mockup-tags { gap: .4rem; }
  .cs-hero-mockup-tags span { font-size: .68rem; }
}

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
