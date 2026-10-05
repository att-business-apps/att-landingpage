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
      <div class="att-blog-hero-eyebrow"><span class="att-blog-hero-dot" aria-hidden="true"></span> Growth</div>
      <h1 class="att-blog-title">7 Checkout Improvements That <span class="att-blog-title-accent">Make Buying Easier</span></h1>
      <p class="att-blog-dek">Reduce avoidable friction in your online store with clearer delivery details, simpler forms, trusted payment options, and a better mobile checkout.</p>
      <div class="att-blog-meta"><span>Amortree Tech</span><span class="att-blog-meta-sep" aria-hidden="true">Â·</span><span>Published <strong>Sep 9, 2026</strong></span><span class="att-blog-meta-sep" aria-hidden="true">Â·</span><span>6 min read</span></div>
    </div></div></div>
    <div class="att-blog-body"><div class="att-blog-layout">
      <nav class="att-blog-toc" aria-label="Article sections"><div class="att-blog-toc-label">On this page</div><a href="#start" class="att-blog-toc-item">Start with evidence</a><a href="#guest" class="att-blog-toc-item">Guest checkout</a><a href="#costs" class="att-blog-toc-item">Show the full cost</a><a href="#forms" class="att-blog-toc-item">Simplify the form</a><a href="#mobile" class="att-blog-toc-item">Design for mobile</a><a href="#payments" class="att-blog-toc-item">Payment &amp; trust</a><a href="#after-order" class="att-blog-toc-item">After the order</a><a href="#faq" class="att-blog-toc-item">FAQ</a></nav>
      <article class="att-blog-content">
        <div class="att-blog-intro att-blog-section"><p>A shopper has chosen a product and started checkout. Then the process asks them to create an account, hides delivery charges until the last step, or makes them pinch and zoom to fill in a form. Each extra question or surprise is a reason to stop.</p><p>There is no universal checkout layout that fits every store. The useful improvements come from finding where your own customers hesitate and making that moment clearer. These seven principles are a strong place to begin, especially if a large share of your visitors shop on a phone.</p></div>

        <section class="att-blog-section" id="start"><div class="att-blog-section-num" aria-hidden="true">01</div><h2 class="att-blog-section-title">Start With the Point Where People Leave</h2><p>Before changing fields or buttons, inspect the journey from product page to order confirmation. Look at analytics by device and checkout step, compare completed purchases with checkout starts, and read recent customer questions. If shoppers leave as soon as delivery appears, shortening the address form will not solve the main problem.</p><p>Test the flow yourself on a real phone, including a slower connection if you can. Note how much typing is required, when the total becomes clear, what happens after a declined payment, and whether an error tells you how to recover. Fix the biggest observed obstacle first, then watch the same measure after the change.</p><div class="att-info-card"><p><strong>Useful rule:</strong> Change one meaningful part of checkout at a time. If several things change together, it becomes difficult to tell what helped.</p></div></section>

        <section class="att-blog-section" id="guest"><div class="att-blog-section-num" aria-hidden="true">02</div><h2 class="att-blog-section-title">1. Offer Guest Checkout</h2><p>Account creation can be useful for repeat customers, but it should not block a first purchase. Let people place an order with the details needed to fulfil it, then offer account creation after the order is complete. Explain what an account adds, such as saved addresses or order history, instead of making it feel like a toll gate.</p><p>If you require an account for a genuine operational reason, say why before a shopper invests time in checkout. Avoid asking them to invent a password before they know whether the order can be delivered to their location.</p></section>

        <section class="att-blog-section" id="costs"><div class="att-blog-section-num" aria-hidden="true">03</div><h2 class="att-blog-section-title">2. Show the Total Cost Early</h2><p>Make product price, delivery charge, tax, and likely delivery timing easy to find before the final payment step. If delivery depends on a postcode or order value, explain that condition near the cart and make the estimate quick to check. A clear order summary should remain available while customers enter their details.</p><p>For free delivery thresholds, show how close the basket is without adding pressure or confusing the total. The amount due now should never be mistaken for a subtotal that excludes a mandatory fee.</p></section>

        <section class="att-blog-section" id="forms"><div class="att-blog-section-num" aria-hidden="true">04</div><h2 class="att-blog-section-title">3. Ask for Less and Explain Errors</h2><p>Every required field should help take payment, deliver the order, or meet a real business requirement. Remove questions that do not serve one of those jobs. Use clear labels, sensible field order, autofill-friendly names, and mark optional fields so shoppers do not wonder whether they can skip them.</p><p>When information is missing or invalid, show the message beside the field and preserve everything the customer already entered. A generic â€œSomething went wrongâ€ message forces them to guess. Tell them what needs attention and how to correct it.</p><ul class="att-blog-list"><li><strong>Use one field per piece of information</strong> where that makes the form easier to complete.</li><li><strong>Do not clear completed fields</strong> after a validation error or payment failure.</li><li><strong>Keep optional requests optional</strong> and explain why you ask for sensitive or unusual details.</li></ul></section>

        <section class="att-blog-section" id="mobile"><div class="att-blog-section-num" aria-hidden="true">05</div><h2 class="att-blog-section-title">4. Make the Mobile Flow Comfortable</h2><p>Open the checkout on a phone and complete it one-handed. Text should be readable without zooming, tap targets should have enough room, and the keyboard should not hide the next field or primary action. Use the correct keyboard for email, phone numbers, and postcodes, and let mobile browsers autofill where possible.</p><p>Keep the most important button visually clear and describe its action accurately: â€œContinue to paymentâ€ is more useful than an ambiguous â€œNext.â€ If a multi-step checkout is necessary, show where the customer is and what remains. Do not make them re-enter details as they move between steps.</p></section>

        <section class="att-blog-section" id="payments"><div class="att-blog-section-num" aria-hidden="true">06</div><h2 class="att-blog-section-title">5. Make Payment Choices and Trust Clear</h2><p>Offer payment methods that suit your customers and your storeâ€™s actual capabilities. State which options are available before customers reach the final step, and explain any payment flow that sends them to another site. Never display a payment logo or assurance that does not match the live setup.</p><p>Use the payment providerâ€™s supported integration and keep sensitive card handling within its secure flow. Explain how customers can get help if a payment fails or appears pending. Reassurance works best when it is specific: clear contact details, understandable policies, and a recognisable payment process all help reduce uncertainty.</p></section>

        <section class="att-blog-section" id="after-order"><div class="att-blog-section-num" aria-hidden="true">07</div><h2 class="att-blog-section-title">6. Set Delivery Expectations and 7. Confirm the Order</h2><p>State where you deliver, how long dispatch usually takes, and what happens if a parcel is delayed. Make returns and exchange terms easy to find before purchase, with a short plain-language summary near relevant products or the cart. Customers should not need to search through a long policy to learn whether a purchase is practical.</p><p>After payment, show a confirmation with the items ordered, amount charged, delivery address, expected next step, and support contact. Send the same details by email. Distinguish a completed payment from a pending or failed one so customers are not left wondering whether they should try again.</p><p>These checkout details sit alongside the broader store experience. For planning or improving the storefront itself, explore our <a href="/ecommerce-development" class="att-blog-inline-link">ecommerce development service</a>.</p></section>

        <section class="att-blog-section" id="faq"><div class="att-blog-section-num" aria-hidden="true">08</div><h2 class="att-blog-section-title">Frequently Asked Questions</h2><div class="att-blog-faq-item"><h3 class="att-blog-faq-q">Should I use a one-page or multi-step checkout?</h3><p>Use the format that is easiest to complete and understand on your device mix. A single page is not automatically simpler if it becomes long and crowded; a multi-step flow can work when progress and the order summary stay clear.</p></div><div class="att-blog-faq-item"><h3 class="att-blog-faq-q">Should I remove every optional field?</h3><p>Remove fields that do not help the customer or your fulfilment process. A useful optional delivery note can help, but an unexplained request for extra personal details can create doubt.</p></div><div class="att-blog-faq-item"><h3 class="att-blog-faq-q">How do I know if a checkout change worked?</h3><p>Compare completion rate at the affected step, completed orders, and support issues before and after the change. Account for promotions, traffic sources, and seasonal shifts that may also affect sales.</p></div></section>

        <router-link to="/blog" class="att-blog-inline-link">â† Back to all articles</router-link>
      </article>
    </div></div>
    <div class="att-blog-cta"><div class="att-blog-cta-inner"><div class="att-blog-cta-text"><p class="att-blog-cta-title">Planning an online store?</p><p class="att-blog-cta-sub">We can help you shape a store around how your customers shop.</p></div><a href="https://wa.me/917975859061/?text=I%27d%20like%20to%20discuss%20an%20ecommerce%20website." class="att-blog-cta-btn">Talk to Amortree <span aria-hidden="true">â†—</span></a></div></div>
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
