<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.from(".att-blog-hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.6, ease: "power3.out", delay: 0.1 });
  gsap.from(".att-blog-title", { autoAlpha: 0, y: 28, duration: 0.75, ease: "power3.out", delay: 0.2 });
  gsap.from(".att-blog-meta", { autoAlpha: 0, y: 14, duration: 0.6, ease: "power2.out", delay: 0.35 });
  gsap.utils.toArray(".att-blog-section").forEach((section) => gsap.from(section, { autoAlpha: 0, y: 22, duration: 0.6, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: section, start: "top 88%", once: true } }));
});
</script>

<template>
  <main class="att-blog-page">
    <div class="breadcrum-area breadcrumb-banner"><div class="att-blog-hero"><div class="att-blog-hero-grid" aria-hidden="true"></div><div class="att-blog-hero-glow" aria-hidden="true"></div><div class="att-blog-hero-inner">
      <div class="att-blog-hero-eyebrow"><span class="att-blog-hero-dot" aria-hidden="true"></span> Strategy</div>
      <h1 class="att-blog-title">How to Write a Website Brief <span class="att-blog-title-accent">Your Designer Can Actually Use</span></h1>
      <p class="att-blog-dek">Gather the goals, audience details, content, and practical requirements that lead to clearer proposals and a smoother project.</p>
      <div class="att-blog-meta"><span>Amortree Tech</span><span class="att-blog-meta-sep" aria-hidden="true">Â·</span><span>Published <strong>Aug 29, 2026</strong></span><span class="att-blog-meta-sep" aria-hidden="true">Â·</span><span>7 min read</span></div>
    </div></div></div>
    <div class="att-blog-body"><div class="att-blog-layout">
      <nav class="att-blog-toc" aria-label="Article sections"><div class="att-blog-toc-label">On this page</div><a href="#why-brief" class="att-blog-toc-item">Why a brief helps</a><a href="#goals" class="att-blog-toc-item">Business goals</a><a href="#audience" class="att-blog-toc-item">Audience &amp; offer</a><a href="#content" class="att-blog-toc-item">Content &amp; proof</a><a href="#requirements" class="att-blog-toc-item">Requirements</a><a href="#budget-timeline" class="att-blog-toc-item">Budget &amp; timing</a><a href="#evaluate" class="att-blog-toc-item">How to evaluate ideas</a><a href="#faq" class="att-blog-toc-item">FAQ</a></nav>
      <article class="att-blog-content">
        <div class="att-blog-intro att-blog-section"><p>â€œWe need a modern websiteâ€ is a reasonable starting thought, but it leaves a designer guessing about what the site must accomplish, who it needs to serve, and what â€œmodernâ€ means for your business. Those guesses often show up later as mismatched proposals, extra rounds of revision, or a schedule that slips while everyone waits for content.</p><p>A website brief does not need to be a formal document or contain every answer. Its job is to explain the business, the customer, the desired outcome, and the known constraints clearly enough that a designer can ask useful questions and recommend an appropriate solution.</p></div>

        <section class="att-blog-section" id="why-brief"><div class="att-blog-section-num" aria-hidden="true">01</div><h2 class="att-blog-section-title">Why a Brief Makes the Project Better</h2><p>A good brief gives every proposal the same starting point. It helps a designer separate necessary features from nice-to-have ideas, spot dependencies early, and explain the trade-offs between scope, budget, and timing. You get a more useful estimate because the work is described in business terms rather than a list of unexplained technical requests.</p><p>It also helps your own team agree on what success means. If one person expects a site to generate enquiries and another expects an online catalogue, that difference is better discovered before design begins. If you are comparing potential partners, our guide to <a href="/blog/before-you-hire-a-web-designer" class="att-blog-inline-link">questions to ask before hiring a web designer</a> can help you discuss the proposal.</p></section>

        <section class="att-blog-section" id="goals"><div class="att-blog-section-num" aria-hidden="true">02</div><h2 class="att-blog-section-title">Start With the Business Goal</h2><p>Write down the main job the website should do. Examples include generating qualified enquiries, helping customers understand a complex service, selling products, supporting bookings, or making existing customer information easier to find. Choose the primary outcome; the site can have secondary goals, but everything cannot be the top priority.</p><p>Describe how you would recognise progress. You may track completed enquiries, booked consultations, orders, or visits to a specific resource. You do not need to promise a particular growth number before the project starts. A clear measure simply gives the team something concrete to improve and review.</p><div class="att-info-card"><p><strong>Try this sentence:</strong> â€œThe website should help [audience] do [important task] so that [business outcome].â€ If the sentence is difficult to finish, the project goal may need more discussion.</p></div></section>

        <section class="att-blog-section" id="audience"><div class="att-blog-section-num" aria-hidden="true">03</div><h2 class="att-blog-section-title">Describe Your Audience and Your Offer</h2><p>Explain who you serve, where they are, what they are trying to solve, and what usually makes them hesitate before choosing a provider. Be specific enough to guide decisions: a business selling high-consideration services may need more education and proof than a shop where customers already know exactly what they want.</p><p>List your main services or product groups in priority order. Say which matter most to the business and which customers are the best fit. Include the questions prospects ask before they enquire, the alternatives they compare, and the facts that distinguish your offer. â€œHigh qualityâ€ is difficult to design around; a clear process, specialist expertise, local coverage, or documented results is much more useful.</p><p>Share competitors or reference sites only to explain what you like or want to avoid. Point to a specific detail-a clear comparison table, an easy booking flow, or a calm visual style-rather than asking for a copy of another companyâ€™s whole website.</p></section>

        <section class="att-blog-section" id="content"><div class="att-blog-section-num" aria-hidden="true">04</div><h2 class="att-blog-section-title">Inventory Content and Proof</h2><p>List the pages you think you need, but mark each as essential, optional, or still to be decided. Then take stock of what already exists: brand files, product data, photography, service descriptions, policies, case studies, and testimonials. Identify material that is current, material that needs editing, and material that must be created.</p><p>Proof makes a website more credible. Gather project examples, customer feedback, qualifications, awards, certifications, or process details that you have permission to publish. If a testimonial contains a customerâ€™s name, logo, or image, confirm you have permission before including it in the brief.</p><p>Assign an owner and target date for missing content. Design and development can move quickly, but a project may still stall if no one is responsible for writing the service pages or approving the product images.</p></section>

        <section class="att-blog-section" id="requirements"><div class="att-blog-section-num" aria-hidden="true">05</div><h2 class="att-blog-section-title">Separate Requirements From Ideas</h2><p>List functions the site needs to support, such as payments, booking, search, customer accounts, multilingual pages, a product catalogue, or a connection to a CRM. For each one, explain who uses it and what they need to accomplish. â€œConnect our CRMâ€ is a starting point; â€œsend qualified form enquiries into these fields so our team can follow upâ€ gives a designer something to scope.</p><div class="att-blog-table-wrap"><table class="att-blog-table"><thead><tr><th>Include in the brief</th><th>Example detail</th></tr></thead><tbody><tr><td>Essential functions</td><td>Online booking, product filters, payment, enquiry form, customer portal</td></tr><tr><td>Existing systems</td><td>CRM, inventory, email platform, payment provider, analytics</td></tr><tr><td>Operational needs</td><td>Who edits content, how orders are handled, who receives enquiries</td></tr><tr><td>Non-functional needs</td><td>Accessibility, privacy, languages, performance, security, support</td></tr><tr><td>Future ideas</td><td>Features that may be useful later but are not needed for launch</td></tr></tbody></table></div><p>Mark uncertain items as questions rather than promises. This lets your designer investigate options and explain the impact before you commit to an approach.</p></section>

        <section class="att-blog-section" id="budget-timeline"><div class="att-blog-section-num" aria-hidden="true">06</div><h2 class="att-blog-section-title">Be Direct About Budget, Timing, and Decisions</h2><p>Share a realistic budget range if you have one. Budget is not just a negotiation number; it helps determine which outcomes, content, and features are possible in the first release. If you are not sure what is realistic, say so and ask for options at different levels. Our overview of <a href="/blog/how-much-does-a-website-cost-in-india" class="att-blog-inline-link">website costs in India</a> explains the factors that commonly affect a quote.</p><p>Include fixed dates and the reason behind them: a campaign launch, seasonal demand, event, or internal handover. Mention dependencies such as product data, legal review, photography, or a system vendor. Name the person who can approve direction and how feedback will be collected. A single coordinated response is easier to use than conflicting comments from several reviewers.</p></section>

        <section class="att-blog-section" id="evaluate"><div class="att-blog-section-num" aria-hidden="true">07</div><h2 class="att-blog-section-title">Use the Brief to Evaluate Recommendations</h2><p>A brief should guide the conversation, not lock the designer into your first solution. A strong partner may recommend fewer pages, a simpler feature, or a different customer journey if the evidence suggests it will meet your goal more effectively. Ask them to explain the reasoning, cost, and trade-offs in language your team can evaluate.</p><p>Before the project starts, confirm what is included, what you will supply, who owns the domain and finished files, what ongoing support costs, and how changes are handled. For additional checks, see our <a href="/blog/website-red-flags-before-hiring" class="att-blog-inline-link">website red flags to check before hiring</a>.</p></section>

        <section class="att-blog-section" id="faq"><div class="att-blog-section-num" aria-hidden="true">08</div><h2 class="att-blog-section-title">Frequently Asked Questions</h2><div class="att-blog-faq-item"><h3 class="att-blog-faq-q">How long should a website brief be?</h3><p>Long enough to explain goals, audience, offer, content, requirements, timing, and open questions. A few well-organised pages are often sufficient; clarity matters more than length.</p></div><div class="att-blog-faq-item"><h3 class="att-blog-faq-q">Do I need to finalise every page before contacting a designer?</h3><p>No. Share your best current understanding and label uncertain decisions. A discovery conversation can help refine page structure and scope.</p></div><div class="att-blog-faq-item"><h3 class="att-blog-faq-q">What if I do not know my budget yet?</h3><p>Say that directly and ask for options with clear trade-offs. You can also share a maximum investment or the business result you need the project to support.</p></div></section>

        <router-link to="/blog" class="att-blog-inline-link">â† Back to all articles</router-link>
      </article>
    </div></div>
    <div class="att-blog-cta"><div class="att-blog-cta-inner"><div class="att-blog-cta-text"><p class="att-blog-cta-title">Have a project taking shape?</p><p class="att-blog-cta-sub">Bring us your goals and open questions. Weâ€™ll help map out the next step.</p></div><a href="https://wa.me/917975859061/?text=I%27d%20like%20to%20discuss%20a%20website%20project." class="att-blog-cta-btn">Talk to Amortree <span aria-hidden="true">â†-</span></a></div></div>
  </main>
</template>

<style lang="scss" scoped>
// â”€â”€ Page shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
.att-blog-page {
  background: #f8fafc;
  min-height: 100vh;
  font-family: var(--font-body, Inter, system-ui, sans-serif);
}
.breadcrum-area {
  padding-top: 10vh;
  background-color: #06060a;
}
// â”€â”€ Hero strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
.att-blog-hero {
  position: relative;
  overflow: hidden;
  padding: 9rem 4rem 5rem;
  isolation: isolate;

  @media (max-width: 768px) { padding: 7rem 1.5rem 4rem; }
}

.att-blog-hero-grid {
  position: absolute; inset: 0; z-index: 0;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.5) 80%, transparent 100%);
  pointer-events: none;
}

.att-blog-hero-glow {
  position: absolute; bottom: -100px; left: -100px;
  width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(250,204,21,0.07) 0%, transparent 65%);
  filter: blur(60px); z-index: 0; pointer-events: none;
}

.att-blog-hero-inner {
  position: relative; z-index: 1;
  max-width: 1024px; margin: 0 auto;
}

.att-blog-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em;
  text-transform: uppercase; color: #facc15;
  border: 1px solid rgba(250,204,21,0.22);
  background: rgba(250,204,21,0.06);
  padding: 0.4rem 0.9rem; border-radius: 999px;
  margin-bottom: 1.5rem;
}

.att-blog-hero-dot {
  width: 5px; height: 5px; border-radius: 50%; background: #facc15; flex-shrink: 0;
  animation: att-pulse 2s ease-in-out infinite;
}
@keyframes att-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
}

.att-blog-title {
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  font-weight: 800; line-height: 1.05; letter-spacing: -0.03em;
  color: #f8fafc; margin: 0 0 1.25rem;
}

.att-blog-title-accent {
  color: transparent;
  -webkit-text-stroke: 2px rgba(250,204,21,0.7);
}

.att-blog-dek {
  font-size: 1.05rem; line-height: 1.6; color: #94a3b8;
  max-width: 60ch; margin: 0 0 1.75rem;
}

.att-blog-meta {
  display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
  font-size: 0.8rem; color: #64748b;

  strong { color: #94a3b8; font-weight: 600; }
}

.att-blog-meta-sep { color: #1e293b; }

// â”€â”€ Body layout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
.att-blog-body {
  max-width: 1200px; margin: 0 auto;
  padding: 5rem 4rem;

  @media (max-width: 1024px) { padding: 4rem 2rem; }
  @media (max-width: 768px)  { padding: 2.5rem 1.25rem; }
}

.att-blog-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 2.5rem; }
}

// â”€â”€ TOC sidebar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
.att-blog-toc {
  position: sticky;
  top: calc(var(--header-height, 96px) + 24px);
  max-height: calc(100vh - var(--header-height, 96px) - 48px);
  overflow-y: auto;
  display: flex; flex-direction: column; gap: 0.15rem;

  @media (max-width: 1024px) {
    position: static;
    max-height: none;
    display: flex; flex-direction: row; flex-wrap: wrap; gap: 0.5rem;
    border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 1rem;
  }
}

.att-blog-toc-label {
  font-size: 0.6rem; font-weight: 900; letter-spacing: 0.2em;
  text-transform: uppercase; color: #94a3b8;
  padding: 0 0.75rem; margin-bottom: 0.75rem;

  @media (max-width: 1024px) { width: 100%; }
}

.att-blog-toc-item {
  font-size: 0.8rem; color: #64748b; text-decoration: none;
  padding: 0.4rem 0.75rem; border-radius: 6px;
  transition: background 0.18s, color 0.18s;
  font-weight: 500;

  &:hover { background: rgba(250,204,21,0.08); color: #0f172a; }

  @media (max-width: 1024px) {
    border: 1px solid #e2e8f0; padding: 0.3rem 0.65rem; font-size: 0.72rem;
  }
}

// â”€â”€ Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
.att-blog-content {
  display: flex; flex-direction: column; gap: 0;
}

.att-blog-intro {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 1rem;
  padding: 2rem 2.25rem !important; margin-bottom: 1rem;

  p { font-size: 0.95rem; line-height: 1.75; color: #475569; margin: 0 0 0.75rem;
    &:last-child { margin: 0; } }
}

.att-blog-section {
  scroll-margin-top: 120px;
  position: relative;
  padding: 2.5rem 0;
  border-top: 1px solid #e2e8f0;

  &:first-of-type { border-top: none; }
  &:last-of-type { padding-bottom: 0; }
}

.att-blog-section-num {
  font-size: 0.62rem; font-weight: 900; letter-spacing: 0.22em;
  text-transform: uppercase; color: #facc15;
  margin-bottom: 0.5rem;
}

.att-blog-section-title {
  font-size: 1.5rem; font-weight: 700; color: #0f172a;
  letter-spacing: -0.01em; margin: 0 0 1.1rem; line-height: 1.25;
}

.att-blog-content p {
  font-size: 0.92rem; line-height: 1.8; color: #475569;
  margin: 0 0 0.85rem; max-width: 68ch;

  strong { color: #1e293b; font-weight: 600; }
  em { color: #1e293b; font-style: italic; }
}

.att-blog-list {
  padding: 0; margin: 0 0 0.85rem;
  list-style: none;
  display: flex; flex-direction: column; gap: 0.6rem;

  li {
    font-size: 0.92rem; line-height: 1.7; color: #475569;
    padding-left: 1.25rem; position: relative; max-width: 68ch;

    &::before {
      content: '';
      position: absolute; left: 0; top: 0.6rem;
      width: 5px; height: 5px; border-radius: 50%;
      background: #facc15;
    }

    strong { color: #1e293b; font-weight: 600; }
  }
}

// Table
.att-blog-table-wrap {
  overflow-x: auto; margin: 0.5rem 0 1rem;
  border: 1px solid #e2e8f0; border-radius: 0.75rem;
}

.att-blog-table {
  width: 100%; border-collapse: collapse; font-size: 0.85rem;

  th {
    background: #f1f5f9; padding: 0.75rem 1rem;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: #64748b;
    text-align: left; border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 0.85rem 1rem; color: #475569; line-height: 1.55;
    border-bottom: 1px solid #f1f5f9; vertical-align: top;
  }

  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(250,204,21,0.03); }
}

.att-blog-table-sub {
  display: block; font-size: 0.72rem; color: #94a3b8; margin-top: 0.15rem;
}

.att-blog-inline-link {
  color: #facc15; text-decoration: none; font-weight: 600;
  border-bottom: 1px solid rgba(250,204,21,0.35);
  transition: border-color 0.2s, color 0.2s;
  &:hover { color: #f0b429; border-color: #f0b429; }
}

// FAQ
.att-blog-faq-item {
  margin-bottom: 1.5rem;
  &:last-child { margin-bottom: 0; }
}

.att-blog-faq-q {
  font-size: 1rem; font-weight: 700; color: #0f172a;
  margin: 0 0 0.4rem;
}

// â”€â”€ Cost/stat breakdown chart card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
.att-chart-card {
  margin: 1.5rem 0 0.5rem;
  padding: 1.5rem 1.75rem 1.25rem;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 1rem;
}

.att-chart-title {
  font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em;
  text-transform: uppercase; color: #64748b; margin-bottom: 0.9rem;
}

.att-chart-svg {
  width: 100%; height: auto; display: block;
}

// â”€â”€ Info cards (3-up grid) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
.att-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.25rem 0 0.5rem;

  @media (max-width: 700px) { grid-template-columns: 1fr; }
}

.att-info-card {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 0.9rem;
  padding: 1.25rem 1.35rem;

  p { font-size: 0.85rem; line-height: 1.65; color: #64748b; margin: 0; max-width: none; }
}

.att-info-card-label {
  display: inline-block;
  font-size: 0.68rem; font-weight: 800; letter-spacing: 0.06em;
  text-transform: uppercase; color: #0f172a;
  background: rgba(250,204,21,0.18);
  border: 1px solid rgba(250,204,21,0.35);
  padding: 0.2rem 0.6rem; border-radius: 999px;
  margin-bottom: 0.7rem;
}

// â”€â”€ Process / priority timeline â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
.att-timeline {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin: 1.75rem 0 1rem;

  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 0; }
}

.att-timeline-track {
  position: absolute;
  top: 17px; left: 5%; right: 5%; height: 2px;
  background: repeating-linear-gradient(to right, #e2e8f0 0, #e2e8f0 6px, transparent 6px, transparent 12px);
  z-index: 0;

  @media (max-width: 900px) { display: none; }
}

.att-timeline-node {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: row; align-items: flex-start; gap: 1rem;
    padding: 1rem 0;
    border-top: 1px solid #e2e8f0;
    &:first-child { border-top: none; }
  }
}

.att-timeline-dot {
  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
  background: #0f172a; color: #facc15;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem; font-weight: 800;
  border: 2px solid #facc15;
  margin-bottom: 0.75rem;

  @media (max-width: 900px) { margin-bottom: 0; }
}

.att-timeline-body {
  padding-right: 0.5rem;
}

.att-timeline-title {
  font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 0.15rem;
}

.att-timeline-days {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em;
  color: #b45309; margin-bottom: 0.5rem;
}

.att-timeline-body p {
  font-size: 0.82rem; line-height: 1.6; color: #64748b; margin: 0; max-width: none;
}

// â”€â”€ CTA strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
.att-blog-cta {
  background: #0f172a;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 3rem 4rem;

  @media (max-width: 640px) { padding: 2.5rem 1.25rem; }
}

.att-blog-cta-inner {
  max-width: 1000px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 640px) { flex-direction: column; text-align: center; }
}

.att-blog-cta-title {
  font-size: 1.15rem; font-weight: 700; color: #f8fafc; margin: 0 0 0.25rem;
}

.att-blog-cta-sub {
  font-size: 0.85rem; color: #64748b; margin: 0;
}

.att-blog-cta-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: #facc15; color: #0f172a;
  font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em;
  padding: 0.75rem 1.5rem; border-radius: 999px;
  text-decoration: none; transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  white-space: nowrap;

  &:hover {
    background: #f0b429;
    box-shadow: 0 8px 24px rgba(250,204,21,0.3);
    transform: translateY(-1px);
  }
}
</style>
