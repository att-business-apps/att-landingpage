<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CaseStudyWorkWithUs from "@/components/CaseStudyWorkWithUs.vue";

gsap.registerPlugin(ScrollTrigger);

const heroMockup = new URL("../../assets/img/project/c18/project-vc.png", import.meta.url).href;
const desktopShowcase = new URL("../../assets/img/project/c18/verde-store-preview.svg", import.meta.url).href;
const mobileHomeShowcase = new URL("../../assets/img/project/c18/project-vc-mob-1.png", import.meta.url).href;
const mobileProductShowcase = new URL("../../assets/img/project/c18/project-vc-mob-2.png", import.meta.url).href;

const challenges = [
  { num: "01", icon: "auto_awesome", title: "A feeling to capture", desc: "The store needed to express warmth and intentional living, while still helping new visitors understand what they could shop." },
  { num: "02", icon: "category", title: "Many ways to discover", desc: "Mirrors, wall art, candles, pottery, cushions, kitchen décor, vases, storage and seasonal pieces needed clear routes into the catalogue." },
  { num: "03", icon: "verified_user", title: "Confidence before purchase", desc: "Shoppers need useful product details and reassurance about packaging, shipping, returns and payment before placing an order." },
  { num: "04", icon: "inventory_2", title: "A store the team can manage", desc: "Products, options, stock, promotions, orders and returns all need practical controls behind the customer-facing experience." },
];

const approach = [
  { title: "Start with the brand mood", desc: "Lead with editorial copy and lifestyle imagery that establish a warm, considered home aesthetic." },
  { title: "Give browsing clear paths", desc: "Make collections and featured products easy to scan, so shoppers can follow their interest into the catalogue." },
  { title: "Answer the next question", desc: "Bring the brand story, customer stories, service promises, FAQs and policies into the shopping experience." },
  { title: "Keep checkout understandable", desc: "Show delivery charges, coupon savings, order details and payment choices as part of one clear purchase flow." },
];

const timeline = [
  { week: "01", phase: "Discover the brand", desc: "Set the tone around cozy living, curated finds and intentional home styling." },
  { week: "02", phase: "Explore the catalogue", desc: "Move from collections and featured products into clear product details and available options." },
  { week: "03", phase: "Build the purchase flow", desc: "Connect cart, delivery calculation, coupon entry, checkout and order confirmation." },
  { week: "04", phase: "Support store operations", desc: "Provide admin tools for products, stock, promotions, orders, homepage imagery and returns." },
];

const capabilities = [
  { icon: "grid_view", title: "Product catalogue", desc: "Manage products, categories, images, prices and options such as size, colour or fragrance." },
  { icon: "local_offer", title: "Promotions", desc: "Configure fixed or percentage coupons, date windows and minimum order conditions." },
  { icon: "inventory_2", title: "Inventory", desc: "Track low stock, sold-out states, stock deductions and stock activity." },
  { icon: "payments", title: "Checkout & payments", desc: "Support Razorpay and Cash on Delivery, with order totals and coupon eligibility rechecked server-side." },
  { icon: "account_circle", title: "Customer accounts", desc: "Provide email OTP sign-in, profiles, order lists and order details." },
  { icon: "assignment_return", title: "Returns & refunds", desc: "Route eligible return requests for admin review and refund recording." },
];

const outcomes = [
  { icon: "spa", title: "A more coherent brand experience", desc: "The store experience reflects The Verde Cozy Co’s cozy-living and intentional-home positioning." },
  { icon: "search", title: "More ways into the catalogue", desc: "Collections, featured products and product pages give shoppers multiple paths to discover items." },
  { icon: "shopping_bag", title: "A connected purchase journey", desc: "Product choices, cart, delivery, coupons, payment and order confirmation work together as one flow." },
  { icon: "tune", title: "Practical tools for the store team", desc: "Admin workflows support catalogue updates, stock, promotions, orders, customer communication and returns." },
  { icon: "speed", title: "Performance-conscious delivery", desc: "The supplied implementation notes describe lazy-loaded imagery and deferring the Razorpay script until checkout." },
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
  <main class="verde-case">
    <section class="cs-hero">
      <div class="cs-hero-noise" aria-hidden="true"></div>
      <div class="cs-hero-glow cs-hero-glow--1" aria-hidden="true"></div>
      <div class="cs-hero-glow cs-hero-glow--2" aria-hidden="true"></div>
      <div class="cs-shell">
        <nav class="cs-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span>&#8226;</span><a href="/projects">Projects</a><span>&#8226;</span><span class="active">The Verde Cozy Co</span>
        </nav>
        <div class="cs-hero-eyebrow"><span class="eyebrow-pill">Home &amp; Living</span>E-commerce Website &amp; Customer Experience</div>
        <h1 class="cs-hero-title"><span class="cs-line">The Verde Cozy Co</span></h1>
        <div class="cs-hero-split">
          <p class="cs-hero-sub">Curated for slow living. Designed for a smoother way to shop. We brought the feeling of a considered home into an online store with clear product discovery, a connected checkout and practical tools for the team behind the shop.</p>
          <div class="cs-hero-stats">
            <div class="cs-hero-stat"><span class="cs-hero-stat-val">Brand</span><span class="cs-hero-stat-label">Editorial storefront</span></div>
            <div class="cs-hero-stat-divider"></div>
            <div class="cs-hero-stat"><span class="cs-hero-stat-val">Shop</span><span class="cs-hero-stat-label">End-to-end commerce</span></div>
            <div class="cs-hero-stat-divider"></div>
            <div class="cs-hero-stat"><span class="cs-hero-stat-val">Ops</span><span class="cs-hero-stat-label">Store management</span></div>
          </div>
        </div>
        <div class="cs-hero-ctas">
          <a href="https://theverdecozyco.com/" target="_blank" rel="noopener noreferrer" class="cs-btn-primary">Visit Live Site <span aria-hidden="true">↗</span></a>
          <a href="/projects" class="cs-btn-ghost">All Projects</a>
        </div>
        <div class="cs-hero-mockup-wrap">
          <div class="cs-hero-mockup"><img :src="heroMockup" alt="The Verde Cozy Co website displayed with its home and product catalogue pages" /></div>
          <div class="cs-hero-mockup-float"><span class="float-dot"></span>Live store</div>
          <div class="cs-hero-mockup-tags"><span>Brand-led UX</span><span>E-commerce</span><span>Mobile-first</span><span>Store operations</span></div>
        </div>
      </div>
    </section>

    <section class="cs-meta-strip">
      <div class="cs-shell cs-meta-grid">
        <div class="cs-meta-item"><span class="cs-meta-label">Client</span><span class="cs-meta-value">The Verde Cozy Co</span></div>
        <div class="cs-meta-item"><span class="cs-meta-label">Industry</span><span class="cs-meta-value">Home décor &amp; lifestyle</span></div>
        <div class="cs-meta-item"><span class="cs-meta-label">Engagement</span><span class="cs-meta-value">E-commerce &middot; UI/UX &middot; Custom Development</span></div>
        <div class="cs-meta-item"><span class="cs-meta-label">Live Site</span><span class="cs-meta-value"><a href="https://theverdecozyco.com/" target="_blank" rel="noopener noreferrer" class="cs-meta-link">theverdecozyco.com ↗</a></span></div>
      </div>
    </section>

    <section class="cs-section">
      <div class="cs-shell">
        <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">business_center</span><div><div class="cs-eyebrow">The Brand</div><h2 class="cs-h2">A thoughtful online home for slow living</h2></div></div>
        <div class="cs-client-grid cs-reveal">
          <div class="cs-client-copy">
            <p class="cs-lead-text">The Verde Cozy Co is a home décor brand built around warmth, thoughtful details and intentional living. The store brings together curated pieces and cozy essentials for visitors looking to make a space feel like home.</p>
            <p>The experience begins with an editorial brand story, then gives shoppers practical ways to browse collections, review product details and complete an order with a clear view of delivery and payment.</p>
            <div class="cs-fact-list">
              <div class="cs-fact"><span class="material-symbols-outlined">chair</span><div><strong>Product world</strong><span>Mirrors, art, candles, pottery, textiles &amp; more</span></div></div>
              <div class="cs-fact"><span class="material-symbols-outlined">devices</span><div><strong>Experience</strong><span>Responsive shopping from discovery to checkout</span></div></div>
              <div class="cs-fact"><span class="material-symbols-outlined">payments</span><div><strong>Payments</strong><span>Razorpay and Cash on Delivery</span></div></div>
              <div class="cs-fact"><span class="material-symbols-outlined">language</span><div><strong>Live store</strong><a href="https://theverdecozyco.com/" target="_blank" rel="noopener noreferrer">theverdecozyco.com</a></div></div>
            </div>
          </div>
          <aside class="cs-client-card">
            <span class="cs-card-kicker">The homepage promise</span>
            <span class="cs-quote-mark material-symbols-outlined">format_quote</span>
            <p class="cs-client-quote">“Create a home you'll never want to leave.”</p>
            <div class="cs-client-quote-attr">A brand-led invitation to explore</div>
          </aside>
        </div>
      </div>
    </section>

    <section class="cs-section cs-section--dark">
      <div class="cs-shell">
        <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num cs-ghost-num--accent" aria-hidden="true">target</span><div><div class="cs-eyebrow cs-eyebrow--accent">The Opportunity</div><h2 class="cs-h2 cs-h2--light">Make the store as considered as the home</h2><p class="cs-section-sub cs-section-sub--light">The experience needed to balance an inviting brand mood with practical paths to purchase and manage the shop.</p></div></div>
        <div class="cs-challenge-list cs-stagger">
          <div v-for="item in challenges" :key="item.num" class="cs-challenge-row"><span class="material-symbols-outlined cs-challenge-icon">{{ item.icon }}</span><div class="cs-challenge-body"><h3>{{ item.title }}</h3><p>{{ item.desc }}</p></div></div>
        </div>
      </div>
    </section>

    <section class="cs-section">
      <div class="cs-shell">
        <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">lightbulb</span><div><div class="cs-eyebrow">Experience Strategy</div><h2 class="cs-h2">Warm storytelling. Clear next steps.</h2></div></div>
        <div class="cs-strategy-grid">
          <div class="cs-strategy-copy cs-reveal">
            <p class="cs-lead-text">For a home décor store, discovery is part of the pleasure. We shaped the path from first impression to checkout so the brand could set the mood while the shopping experience stayed easy to follow.</p>
            <div v-for="(item, i) in approach" :key="item.title" class="cs-pillar"><span class="material-symbols-outlined cs-pillar-num" aria-hidden="true">{{ getCaseIcon(item.title) }}</span><div><h4>{{ item.title }}</h4><p>{{ item.desc }}</p></div></div>
          </div>
          <aside class="cs-insight cs-reveal"><span class="material-symbols-outlined cs-insight-icon">lightbulb</span><h4>The idea behind the flow</h4><p>Let the feeling invite people in, then make the details easy to find: what the item is, what it costs, how it arrives and how to get help.</p><div class="cs-insight-divider"></div><p class="cs-insight-action">That means product discovery, trust content and checkout clarity work as one experience.</p></aside>
        </div>
      </div>
    </section>

    <section class="cs-section cs-section--muted">
      <div class="cs-shell">
        <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">conversion_path</span><div><div class="cs-eyebrow">Customer Journey</div><h2 class="cs-h2">From a little inspiration to order confirmation</h2><p class="cs-section-sub">The shopping flow pairs visual discovery with clear information at each decision point.</p></div></div>
        <div class="cs-timeline">
          <div v-for="(item, i) in timeline" :key="item.week" class="timeline-row"><span class="material-symbols-outlined timeline-week" aria-hidden="true">{{ getCaseIcon(item.phase || item.step) }}</span><div class="timeline-rail"><div class="timeline-dot"></div><div v-if="i < timeline.length - 1" class="timeline-line"></div></div><div class="timeline-body"><h4>{{ item.phase }}</h4><p>{{ item.desc }}</p></div></div>
        </div>
      </div>
    </section>

    <section class="cs-section verde-store-section">
      <div class="cs-shell">
        <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">web</span><div><div class="cs-eyebrow">The Storefront</div><h2 class="cs-h2">A calm canvas for the collection</h2><p class="cs-section-sub">Brand storytelling and clear category routes help shoppers move naturally into the product catalogue.</p></div></div>
        <div class="cs-mockup-wrap cs-reveal verde-desktop-showcase"><img :src="desktopShowcase" alt="Full-page storefront layout for The Verde Cozy Co, showing the homepage, brand story and product collections" loading="lazy" /></div>
      </div>
    </section>

    <section class="cs-section cs-section--muted verde-mobile-section">
      <div class="cs-shell">
        <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">settings</span><div><div class="cs-eyebrow">Mobile Shopping</div><h2 class="cs-h2">Designed for the small screen</h2><p class="cs-section-sub">The mobile storefront carries the same brand feeling into browsing, product selection and cart actions.</p></div></div>
        <div class="cs-mockup-wrap cs-reveal verde-mobile-showcase"><img :src="mobileHomeShowcase" alt="Mobile home page and collection browsing experience for The Verde Cozy Co" loading="lazy" /><img :src="mobileProductShowcase" alt="Mobile product listing and product detail experience for The Verde Cozy Co" loading="lazy" /></div>
      </div>
    </section>

    <section class="cs-section cs-section--dark verde-operations-section">
      <div class="cs-shell">
        <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num cs-ghost-num--accent" aria-hidden="true">verified</span><div><div class="cs-eyebrow cs-eyebrow--accent">Store Operations</div><h2 class="cs-h2 cs-h2--light">A useful system behind the shop</h2><p class="cs-section-sub cs-section-sub--light">The documented setup connects shopper-facing commerce to everyday catalogue and order management.</p></div></div>
        <div class="cs-outcome-grid cs-stagger verde-capability-grid">
          <article v-for="item in capabilities" :key="item.title" class="cs-outcome"><span class="material-symbols-outlined">{{ item.icon }}</span><h4>{{ item.title }}</h4><p>{{ item.desc }}</p></article>
        </div>
        <div class="verde-tech-note cs-reveal"><span class="material-symbols-outlined">database</span><p><strong>Implementation notes</strong>The supplied deployment guide describes Google Apps Script as the backend layer and Google Sheets as the operational data store for products, orders, coupons, stock logs and returns.</p></div>
      </div>
    </section>

    <section class="cs-metrics-strip verde-outcomes-strip">
      <div class="cs-shell">
        <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num cs-ghost-num--accent" aria-hidden="true">trending_up</span><div><div class="cs-eyebrow cs-eyebrow--accent">Outcome</div><h2 class="cs-h2 cs-h2--light">What the connected experience delivers</h2><p class="cs-section-sub cs-section-sub--light">These outcomes describe documented capabilities. Analytics and quantified business results were not supplied for this case study.</p></div></div>
        <div class="cs-outcome-grid cs-stagger verde-outcome-grid">
          <article v-for="item in outcomes" :key="item.title" class="cs-outcome"><span class="material-symbols-outlined">{{ item.icon }}</span><h4>{{ item.title }}</h4><p>{{ item.desc }}</p></article>
        </div>
      </div>
    </section>

    <section class="cs-section cs-section--muted">
      <div class="cs-shell">
        <div class="cs-section-head cs-reveal"><span class="material-symbols-outlined cs-ghost-num" aria-hidden="true">trending_up</span><div><div class="cs-eyebrow">Next Steps</div><h2 class="cs-h2">Keep learning from the way people shop</h2><p class="cs-section-sub">A measured next phase can connect experience improvements to real customer behaviour.</p></div></div>
        <div class="verde-next-grid cs-reveal"><p>Connect analytics and search reporting, then establish a baseline for product discovery, add-to-cart, checkout, purchase and return journeys. With that baseline, the team can prioritize improvements based on evidence.</p><a href="https://theverdecozyco.com/" target="_blank" rel="noopener noreferrer" class="cs-btn-primary">Visit The Verde Cozy Co <span aria-hidden="true">↗</span></a></div>
        <div class="cs-nav-row cs-reveal"><a href="/project/alin-salon" class="cs-nav-link"><span class="material-symbols-outlined">arrow_back</span> Previous Project</a><a href="/projects" class="cs-btn-ghost verde-nav-projects">All Projects</a><a href="/project/velourah" class="cs-nav-link cs-nav-link--right">Next Project <span class="material-symbols-outlined">arrow_forward</span></a></div>
      </div>
    </section>

    <CaseStudyWorkWithUs project="The Verde Cozy Co" industry="Home décor e-commerce" accent="#C67C5A" result="A warm, considered store experience that helps customers discover home décor and gives the team practical tools to run the shop." :services="['E-commerce UX', 'Custom development', 'Payments & checkout', 'Store operations']" :proof="['Brand-led product discovery', 'Clearer purchase journey', 'Connected catalogue and operations']" />
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


/* Verde-specific palette and showcase styles */

.verde-case {
  --accent: #C67C5A;
  --accent-deep: #A8623F;
  --gold: #C67C5A;
  --midnight: #2E2A27;
  --frost: #FAF8F4;
  --ivory: #FAF8F4;
  --sand: #F2EDE4;
  --linen: #D4C4B0;
  --sage: #A8B2A1;
  --sage-dark: #889280;
  --espresso: #3D2B1F;
  --espresso-dark: #2E2A27;
  --terracotta: #C67C5A;
  --terracotta-dark: #A8623F;
}

.cs-hero, .cs-section, .cs-metrics-strip, .cs-meta-strip { font-family: 'Poppins', sans-serif; }
.cs-hero { --accent: #C67C5A; --accent-deep: #A8623F; --gold: #C67C5A; --midnight: #2E2A27; --frost: #FAF8F4; }
.cs-section { --accent: #C67C5A; --accent-deep: #A8623F; --gold: #C67C5A; --midnight: #2E2A27; --frost: #FAF8F4; background: var(--ivory); }
.cs-section--dark, .cs-metrics-strip { background: var(--espresso); }
.cs-section--muted { background: var(--sand); }
.cs-section--accent-deep { background: var(--terracotta-dark); }
.cs-meta-strip { background: var(--espresso-dark); }
.cs-hero-glow--1 { background: radial-gradient(ellipse, rgba(198,124,90,.18), transparent 68%); }
.cs-hero-glow--2 { background: radial-gradient(ellipse, rgba(168,178,161,.1), transparent 68%); }
.cs-hero-title { color: var(--ivory); }
.cs-hero-sub { color: rgba(250,248,244,.73); }
.cs-hero-stat-val { color: var(--linen); }
.cs-hero-stat-label { color: rgba(250,248,244,.52); }
.cs-hero-stat-divider { background: rgba(212,196,176,.22); }
.cs-btn-primary { background: var(--terracotta); border-color: var(--terracotta); color: var(--espresso-dark); }
.cs-btn-primary:hover { background: var(--terracotta-dark); border-color: var(--terracotta-dark); color: var(--ivory); }
.cs-btn-ghost { border-color: rgba(250,248,244,.28); color: var(--ivory); }
.cs-btn-ghost:hover { background: rgba(250,248,244,.08); border-color: var(--linen); color: var(--ivory); }
.cs-hero-mockup { border-color: rgba(198,124,90,.32); box-shadow: 0 -20px 100px rgba(198,124,90,.09), 0 40px 100px rgba(0,0,0,.32); }
.cs-hero-mockup-float { border-color: rgba(198,124,90,.48); color: var(--ivory); }
.float-dot { background: var(--terracotta); box-shadow: 0 0 10px var(--terracotta); }
.cs-hero-mockup-tags span { border-color: rgba(212,196,176,.22); color: var(--ivory); }

.cs-meta-strip { border-color: rgba(212,196,176,.12); }
.cs-meta-label { color: rgba(212,196,176,.55); }
.cs-meta-value { color: var(--ivory); }
.cs-meta-link { color: var(--terracotta)!important; }
.cs-ghost-num { color: rgba(61,43,31,.09); }
.cs-ghost-num--accent { color: rgba(250,248,244,.1); }
.cs-eyebrow { color: var(--terracotta-dark); }
.cs-eyebrow--accent { color: var(--terracotta); }
.cs-h2 { color: var(--espresso); }
.cs-h2--light { color: var(--ivory); }
.cs-section-sub { color: var(--sage-dark); }
.cs-section-sub--light { color: rgba(250,248,244,.67); }
.cs-lead-text { color: var(--espresso); }
.cs-client-copy p { color: #685b50; }
.cs-fact { background: var(--sand); }
.cs-fact .material-symbols-outlined, .cs-fact strong { color: var(--terracotta-dark); }
.cs-fact span, .cs-fact a { color: var(--espresso); }
.cs-client-card { background: var(--espresso); border: 1px solid rgba(212,196,176,.2); }
.cs-card-kicker { color: var(--sage); font-size: .67rem; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.cs-quote-mark { color: var(--terracotta); }
.cs-client-quote { color: var(--ivory); font-family: Georgia, serif; font-size: 1.3rem; }
.cs-client-quote-attr { color: var(--linen); }
.cs-challenge-row { border-color: rgba(212,196,176,.15); }
.cs-challenge-num { color: rgba(212,196,176,.5); }
.cs-challenge-icon { color: var(--terracotta); }
.cs-challenge-body h3 { color: var(--ivory); }
.cs-challenge-body p { color: rgba(250,248,244,.67); }
.cs-pillar-num { background: rgba(198,124,90,.12); border-color: rgba(198,124,90,.32); color: var(--terracotta-dark); }
.cs-pillar h4, .timeline-body h4 { color: var(--espresso); }
.cs-pillar p, .timeline-body p { color: #74685d; }
.cs-insight { background: linear-gradient(155deg, var(--espresso), var(--espresso-dark)); border: 1px solid rgba(212,196,176,.15); }
.cs-insight-icon { color: var(--terracotta); }
.cs-insight h4 { color: var(--ivory); }
.cs-insight p { color: rgba(250,248,244,.7); }
.cs-insight-action { color: var(--linen)!important; }
.timeline-week { color: rgba(61,43,31,.35); }
.timeline-dot { background: var(--terracotta); box-shadow: 0 0 0 2px var(--terracotta); border-color: var(--sand); }
.timeline-line { background: linear-gradient(180deg, var(--terracotta), rgba(198,124,90,.2)); }
.cs-mockup-wrap img { border-color: rgba(61,43,31,.14); }
.verde-desktop-showcase { padding: 12px; background: var(--ivory); border: 1px solid var(--linen); border-radius: 15px; box-shadow: 0 24px 64px rgba(61,43,31,.1); }
.verde-desktop-showcase img { display: block; width: 100%; margin: 0; border-radius: 8px; }
.verde-mobile-showcase { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; }
.verde-mobile-showcase img { width: 100%; margin: 0; border-radius: 14px; border: 1px solid var(--linen); box-shadow: 0 16px 42px rgba(61,43,31,.11); }
.cs-outcome { background: var(--ivory); border-color: rgba(61,43,31,.12); }
.cs-outcome .material-symbols-outlined { color: var(--terracotta-dark); }
.cs-outcome h4 { color: var(--espresso); }
.cs-outcome p { color: #74685d; }
.verde-operations-section .cs-outcome { background: rgba(250,248,244,.06); border-color: rgba(212,196,176,.2); }
.verde-operations-section .cs-outcome .material-symbols-outlined { color: var(--terracotta); }
.verde-operations-section .cs-outcome h4 { color: var(--ivory); }
.verde-operations-section .cs-outcome p { color: rgba(250,248,244,.68); }
.verde-tech-note { display: flex; gap: 1rem; align-items: flex-start; padding: 1.2rem 1.4rem; border: 1px solid rgba(212,196,176,.19); border-radius: 12px; background: rgba(250,248,244,.045); }
.verde-tech-note .material-symbols-outlined { color: var(--sage); }
.verde-tech-note p { margin: 0; color: rgba(250,248,244,.66); font-size: .85rem; line-height: 1.7; }
.verde-tech-note strong { display: block; color: var(--linen); margin-bottom: .25rem; }
.verde-outcomes-strip { background: var(--espresso-dark); }
.verde-outcome-grid .cs-outcome { background: rgba(250,248,244,.055); border-color: rgba(212,196,176,.16); }
.verde-outcome-grid .cs-outcome h4 { color: var(--ivory); }
.verde-outcome-grid .cs-outcome p { color: rgba(250,248,244,.67); }
.verde-outcome-grid .cs-outcome .material-symbols-outlined { color: var(--terracotta); }
.verde-next-grid { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
.verde-next-grid p { max-width: 680px; color: #685b50; line-height: 1.8; }
.cs-nav-row { border-color: rgba(61,43,31,.16); }
.cs-nav-link { color: var(--espresso); }
.cs-nav-link:hover { color: var(--terracotta-dark); }
.verde-nav-projects { border-color: var(--linen); color: var(--espresso); }
.verde-nav-projects:hover { color: var(--espresso); background: var(--sand); }

@media (max-width: 768px) {
  .verde-mobile-showcase { grid-template-columns: 1fr; }
  .verde-next-grid { align-items: flex-start; flex-direction: column; gap: 1rem; }
  .cs-hero-mockup-tags { gap: .4rem; }
  .cs-hero-mockup-tags span { font-size: .68rem; }
}

@media (prefers-reduced-motion: reduce) {
  .verde-case *, .verde-case *::before, .verde-case *::after { scroll-behavior: auto!important; animation-duration: .01ms!important; animation-iteration-count: 1!important; }
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
