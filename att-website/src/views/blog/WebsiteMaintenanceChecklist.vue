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
      <div class="att-blog-hero-eyebrow"><span class="att-blog-hero-dot" aria-hidden="true"></span> Web Design</div>
      <h1 class="att-blog-title">A Practical Website <span class="att-blog-title-accent">Maintenance Checklist</span> for Small Businesses</h1>
      <p class="att-blog-dek">A simple routine for keeping your business website secure, accurate, fast, and ready to turn visits into enquiries.</p>
      <div class="att-blog-meta"><span>Amortree Tech</span><span class="att-blog-meta-sep" aria-hidden="true">Â·</span><span>Published <strong>Sep 29, 2026</strong></span><span class="att-blog-meta-sep" aria-hidden="true">Â·</span><span>7 min read</span></div>
    </div></div></div>

    <div class="att-blog-body"><div class="att-blog-layout">
      <nav class="att-blog-toc" aria-label="Article sections"><div class="att-blog-toc-label">On this page</div>
        <a href="#why-maintenance" class="att-blog-toc-item">Why maintenance matters</a><a href="#monthly" class="att-blog-toc-item">Your monthly check</a><a href="#quarterly" class="att-blog-toc-item">Quarterly review</a><a href="#security" class="att-blog-toc-item">Security &amp; backups</a><a href="#priority" class="att-blog-toc-item">What to fix first</a><a href="#maintenance-plan" class="att-blog-toc-item">Build a routine</a><a href="#faq" class="att-blog-toc-item">FAQ</a>
      </nav>
      <article class="att-blog-content">
        <div class="att-blog-intro att-blog-section"><p>A website can be online and still be out of date, difficult to use, or quietly failing at an important job. Forms stop sending, team details change, software gets old, and a link that worked last month suddenly does not. Most of these problems are easier to handle when someone checks regularly.</p><p>Maintenance does not mean changing the design every few weeks. It means keeping the site dependable for customers and protecting the time and money already invested in it. Here is a practical routine a small business can manage without turning website upkeep into a full-time job.</p></div>

        <section class="att-blog-section" id="why-maintenance"><div class="att-blog-section-num" aria-hidden="true">01</div><h2 class="att-blog-section-title">Why Website Maintenance Matters</h2><p>Your website is often the first place a potential customer checks before calling, booking, or asking for a quote. If the phone number is wrong, a service page promises something you no longer offer, or a form disappears into an unmonitored inbox, the site creates friction at the point where trust matters most.</p><p>There is also a technical side. Content management systems, extensions, and hosting environments change over time. Keeping them current, maintaining backups, and removing access that is no longer needed lowers the chance that a preventable issue turns into downtime or data loss. For ongoing support options, see our <a href="/website-maintenance" class="att-blog-inline-link">website maintenance service</a>.</p></section>

        <section class="att-blog-section" id="monthly"><div class="att-blog-section-num" aria-hidden="true">02</div><h2 class="att-blog-section-title">The 30-Minute Monthly Check</h2><p>Put one short review on the calendar each month. Use a phone as well as a laptop and follow the same path a customer would take:</p><ul class="att-blog-list"><li><strong>Test the main action.</strong> Send a real test enquiry, place a low-value test order if practical, or check the booking flow from start to finish.</li><li><strong>Check contact details.</strong> Tap the phone, email, map, and WhatsApp links. Confirm opening hours, service areas, and holiday notices.</li><li><strong>Review key pages.</strong> Look at the homepage, top service or product pages, and contact page. Remove expired offers and fix outdated prices or claims.</li><li><strong>Check forms and inboxes.</strong> Confirm messages arrive where expected and that the confirmation shown to the customer is still accurate.</li><li><strong>Look for visible errors.</strong> Check images, menus, buttons, links, and embedded maps on mobile and desktop.</li></ul><p>Keep the review focused on important customer journeys. You do not need to read every paragraph on the site every month; choose the pages that help people decide and get in touch.</p></section>

        <section class="att-blog-section" id="quarterly"><div class="att-blog-section-num" aria-hidden="true">03</div><h2 class="att-blog-section-title">What to Review Each Quarter</h2><p>Once every three months, spend a little longer on the health of the whole site. Check whether your services, team, pricing, testimonials, portfolio, and policies still reflect the business as it operates today. Review analytics for pages with unusual drops in visits or enquiries, and check Search Console for indexing issues or new warnings.</p><p>Test the site in current versions of the browsers your customers use. If performance has slipped, start by looking at large images, unnecessary scripts, and plugins or tools nobody uses. A quick speed score can point you toward a problem, but real device testing shows whether the page feels slow to a person on a mobile connection.</p><p>Review access too. Remove old staff and vendor accounts, check that administrator accounts use strong unique passwords, and verify who receives hosting and domain renewal notices. A domain that expires can take a working site and email offline at once.</p></section>

        <section class="att-blog-section" id="security"><div class="att-blog-section-num" aria-hidden="true">04</div><h2 class="att-blog-section-title">Updates, Security, and Backups</h2><p>Before applying software updates, make sure a recent backup exists and that you know how to restore it. A backup is only useful if it includes the parts you need: site files, the database where relevant, and uploaded media. Keep at least one copy separate from the live hosting account.</p><p>Apply updates through the supported process for your platform and check the important pages afterward. If the site has custom code or business-critical features, coordinate updates with the person responsible for maintaining them. Avoid installing an extension simply because it promises a quick fix; each addition creates another dependency to keep current.</p><p>If you see unexpected redirects, new administrator accounts, browser security warnings, or unfamiliar content, contact your hosting provider or developer promptly. Do not wait for the next monthly review to investigate a possible compromise.</p></section>

        <section class="att-blog-section" id="priority"><div class="att-blog-section-num" aria-hidden="true">05</div><h2 class="att-blog-section-title">What Should You Fix First?</h2><p>When you find several issues, prioritise by customer impact and urgency. A broken checkout, enquiry form, phone link, or security warning deserves attention before a small visual inconsistency. Inaccurate information that could lead a customer to make the wrong decision comes next. Cosmetic refinements can wait if the core journey is working.</p><div class="att-blog-table-wrap"><table class="att-blog-table"><thead><tr><th>Priority</th><th>Examples</th><th>First response</th></tr></thead><tbody><tr><td>Immediate</td><td>Site unavailable, payment failing, security warning, enquiries not arriving</td><td>Contact your host or developer; keep a record of when it started</td></tr><tr><td>High</td><td>Wrong phone number, broken booking link, expired offer, missing key page</td><td>Correct the content or restore the working customer path</td></tr><tr><td>Planned</td><td>Slow images, outdated team photos, minor layout inconsistency</td><td>Schedule a measured improvement and check the result</td></tr></tbody></table></div><p>If your site has several customer-facing problems at once, our article on <a href="/blog/website-losing-customers" class="att-blog-inline-link">signs your website may be losing customers</a> offers a useful way to assess what is affecting enquiries.</p></section>

        <section class="att-blog-section" id="maintenance-plan"><div class="att-blog-section-num" aria-hidden="true">06</div><h2 class="att-blog-section-title">Build a Routine That Actually Happens</h2><p>Assign one person to own the checklist, even if a developer handles the technical work. Record the date, what was checked, any issue found, who owns the fix, and when it was resolved. This makes repeat problems easier to spot and prevents small tasks from disappearing into chat messages.</p><p>For a small brochure site, a monthly customer-path check and quarterly technical review may be enough. A busy store or booking site needs more frequent checks around orders, payment, and inventory. Match the routine to the cost of a failure: the more revenue or customer activity depends on the site, the more closely it should be monitored.</p></section>

        <section class="att-blog-section" id="faq"><div class="att-blog-section-num" aria-hidden="true">07</div><h2 class="att-blog-section-title">Frequently Asked Questions</h2><div class="att-blog-faq-item"><h3 class="att-blog-faq-q">How often should a small business website be maintained?</h3><p>Check important customer journeys monthly and review technical health, access, and backups at least quarterly. Websites that process orders or bookings should be monitored more often.</p></div><div class="att-blog-faq-item"><h3 class="att-blog-faq-q">Can I update my website myself?</h3><p>Most owners can safely update approved text and images after learning the content system. Backups, software updates, and changes to custom features may need developer support.</p></div><div class="att-blog-faq-item"><h3 class="att-blog-faq-q">What should a website maintenance plan include?</h3><p>It should clearly state what is checked, how updates and backups are handled, how issues are reported, response expectations, and which work is included or billed separately.</p></div></section>

        <router-link to="/blog" class="att-blog-inline-link">â† Back to all articles</router-link>
      </article>
    </div></div>
    <div class="att-blog-cta"><div class="att-blog-cta-inner"><div class="att-blog-cta-text"><p class="att-blog-cta-title">Want your website to stay reliable?</p><p class="att-blog-cta-sub">Talk to us about practical maintenance for your business site.</p></div><a href="https://wa.me/917975859061/?text=I%27d%20like%20to%20talk%20about%20website%20maintenance." class="att-blog-cta-btn">Talk to Amortree <span aria-hidden="true">â†—</span></a></div></div>
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
