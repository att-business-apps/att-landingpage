<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


onMounted(() => {
    document.title = "Landing Page vs. Full Website: Which Do You Actually Need? | Amortree";

    const description = document.querySelector('meta[name="description"]');

    if (description) {
        description.setAttribute(
            "content",
            "A landing page and a full website solve different problems. Here's how to tell which one your business actually needs — before you spend on the wrong one."
        );
    }

    gsap.from(".att-blog-hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.6, ease: "power3.out", delay: 0.1 });
    gsap.from(".att-blog-title", { autoAlpha: 0, y: 28, duration: 0.75, ease: "power3.out", delay: 0.2 });
    gsap.from(".att-blog-meta", { autoAlpha: 0, y: 14, duration: 0.6, ease: "power2.out", delay: 0.35 });

    gsap.utils.toArray(".att-blog-section").forEach((section) => {
        gsap.from(section, {
            autoAlpha: 0, y: 24, duration: 0.65, ease: "power2.out",
            immediateRender: false,
            scrollTrigger: { trigger: section, start: "top 88%", once: true },
        });
    });
});
</script>

<template>
  <main class="att-blog-page">

    <!-- Hero strip -->
    <div class="breadcrum-area breadcrumb-banner">
        <div class="att-blog-hero">
            <div class="att-blog-hero-grid" aria-hidden="true"></div>
            <div class="att-blog-hero-glow" aria-hidden="true"></div>
            <div class="att-blog-hero-inner">
                <div class="att-blog-hero-eyebrow">
                    <span class="att-blog-hero-dot" aria-hidden="true"></span>
                    Web Design &amp; Strategy
                </div>
                <h1 class="att-blog-title">Landing Page or <span class="att-blog-title-accent">Full Website?</span></h1>
                <p class="att-blog-dek">They solve different problems. Picking the wrong one means paying for pages nobody visits, or cramming everything onto one page that can't hold it.</p>
                <div class="att-blog-meta">
                    <span>Amortree Tech</span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>Published <strong>Mar 9, 2026</strong></span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>6 min read</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Body -->
    <div class="att-blog-body">
      <div class="att-blog-layout">

        <!-- TOC sidebar -->
        <nav class="att-blog-toc" aria-label="Article sections">
          <div class="att-blog-toc-label">On this page</div>
          <a href="#the-real-difference" class="att-blog-toc-item">The real difference</a>
          <a href="#when-landing-page" class="att-blog-toc-item">When a landing page wins</a>
          <a href="#when-full-site" class="att-blog-toc-item">When a full website wins</a>
          <a href="#side-by-side" class="att-blog-toc-item">Side-by-side comparison</a>
          <a href="#common-mistake" class="att-blog-toc-item">The most common mistake</a>
          <a href="#can-you-start-small" class="att-blog-toc-item">Can you start with one and grow?</a>
          <a href="#faq" class="att-blog-toc-item">FAQ</a>
        </nav>

        <!-- Main content -->
        <article class="att-blog-content">

          <div class="att-blog-intro att-blog-section">
            <p>Once you've settled on roughly <a href="/blog/website-cost-india-2026" class="att-blog-inline-link">what you'll spend</a> and <a href="/blog/how-long-website-takes" class="att-blog-inline-link">how long it'll take</a>, there's one decision that changes both numbers more than almost anything else: are you building a landing page, or a full website?</p>
            <p>People often use the terms interchangeably, but they're built for different jobs — and picking the wrong one is one of the most common (and expensive) mistakes we see.</p>
          </div>

          <section class="att-blog-section" id="the-real-difference">
            <div class="att-blog-section-num" aria-hidden="true">01</div>
            <h2 class="att-blog-section-title">The Real Difference</h2>
            <p>A <strong>landing page</strong> is a single page built around one goal — get a call, capture a booking, promote one offer. Everything on it points toward one action.</p>
            <p>A <strong>full website</strong> is a multi-page structure — home, about, services, portfolio, contact — built to represent a business as a whole, across many different reasons someone might visit.</p>
            <p>The difference isn't really about page count. It's about whether you're guiding one visitor toward one decision, or giving many different visitors room to explore at their own pace.</p>
          </section>

          <section class="att-blog-section" id="when-landing-page">
            <div class="att-blog-section-num" aria-hidden="true">02</div>
            <h2 class="att-blog-section-title">When a Landing Page Wins</h2>
            <ul class="att-blog-list">
              <li><strong>You're promoting one specific thing</strong> — a product launch, an event, a limited offer, a single service</li>
              <li><strong>You're running paid ads</strong> — sending ad traffic to a focused page converts far better than sending it to a general homepage where visitors have to hunt for what the ad promised</li>
              <li><strong>You need something live fast</strong> — a landing page can typically go live in 1–2 weeks, useful for time-sensitive launches</li>
              <li><strong>You're testing an idea</strong> — before investing in a full site, a landing page lets you validate demand with a smaller upfront cost</li>
            </ul>
          </section>

          <section class="att-blog-section" id="when-full-site">
            <div class="att-blog-section-num" aria-hidden="true">03</div>
            <h2 class="att-blog-section-title">When a Full Website Wins</h2>
            <ul class="att-blog-list">
              <li><strong>You offer multiple services or products</strong> — each deserves its own space to be explained properly, not squeezed under one headline</li>
              <li><strong>Visitors arrive with different intents</strong> — some want pricing, some want your portfolio, some just want to confirm you're legitimate before calling</li>
              <li><strong>You rely on organic search (SEO)</strong> — more pages means more opportunities to rank for different search terms your customers actually use</li>
              <li><strong>Credibility matters more than urgency</strong> — a fuller site with an About page, team info, and case studies builds trust over time rather than pushing for an immediate decision</li>
            </ul>
          </section>

          <section class="att-blog-section" id="side-by-side">
            <div class="att-blog-section-num" aria-hidden="true">04</div>
            <h2 class="att-blog-section-title">Side-by-Side Comparison</h2>
            <div class="att-blog-table-wrap">
              <table class="att-blog-table">
                <thead>
                  <tr><th>Factor</th><th>Landing page</th><th>Full website</th></tr>
                </thead>
                <tbody>
                  <tr><td>Typical cost</td><td>₹8,000 – ₹25,000</td><td>₹25,000 – ₹80,000+</td></tr>
                  <tr><td>Typical timeline</td><td>1–2 weeks</td><td>3–6 weeks</td></tr>
                  <tr><td>Best for</td><td>One offer, one goal, ad traffic</td><td>Multiple services, SEO, credibility</td></tr>
                  <tr><td>Structure</td><td>Single scrolling page</td><td>Multiple linked pages</td></tr>
                  <tr><td>SEO potential</td><td>Limited — one page to rank</td><td>Higher — many pages targeting different searches</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="att-blog-section" id="common-mistake">
            <div class="att-blog-section-num" aria-hidden="true">05</div>
            <h2 class="att-blog-section-title">The Most Common Mistake</h2>
            <p>The mistake we see most often isn't choosing the wrong format outright — it's trying to make one page do a full website's job. A single page gets stretched to cover five different services, a team bio, a blog, and a contact form, and the result is a page so long and unfocused that it loses the one advantage a landing page is supposed to have: a clear, single path to action.</p>
            <p>If you find yourself asking "should I add one more section to my landing page," that's usually the sign you actually need a proper multi-page site, not a longer single page.</p>
          </section>

          <section class="att-blog-section" id="can-you-start-small">
            <div class="att-blog-section-num" aria-hidden="true">06</div>
            <h2 class="att-blog-section-title">Can You Start With a Landing Page and Grow Into a Full Site?</h2>
            <p>Yes, and it's often a smart way to sequence spending — especially if you're validating a new offer or don't yet have the content ready for a full site. A well-structured landing page can later become the homepage of a fuller website, rather than being thrown away.</p>
            <p>The key is telling your designer upfront that growth is the plan, so the initial build uses a structure and design system that can expand cleanly — instead of one built as a dead end that needs to be redone from scratch later.</p>
          </section>

          <section class="att-blog-section" id="faq">
            <div class="att-blog-section-num" aria-hidden="true">07</div>
            <h2 class="att-blog-section-title">Frequently Asked Questions</h2>

            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Can a landing page rank on Google as well as a full website?</h3>
              <p>It can rank for a narrow set of terms tied to its specific offer, but a full website with multiple pages generally has far more opportunities to appear for the range of searches real customers use.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">I only offer one service — do I still need a full website?</h3>
              <p>Not necessarily. A single-service business is often the clearest case for a landing page, since there's naturally one goal for every visitor. A full site becomes more valuable once you have distinct services, locations, or audiences to speak to separately.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Is it cheaper long-term to start with a full website instead of upgrading later?</h3>
              <p>Not always — if you're not yet sure the offer will work, spending less upfront on a landing page and validating demand first can save money overall, even accounting for a later rebuild.</p>
            </div>
          </section>

        </article>
      </div>
    </div>

    <!-- CTA strip -->
    <div class="att-blog-cta">
      <div class="att-blog-cta-inner">
        <div class="att-blog-cta-text">
          <p class="att-blog-cta-title">Not sure which one fits your business?</p>
          <p class="att-blog-cta-sub">Tell us what you're promoting — we'll tell you honestly which format makes sense.</p>
        </div>
        <a href="https://wa.me/917975859061/?text=I%27d%20like%20to%20get%20your%20recommendation%20on%20which%20format%20would%20be%20best%20for%20my%20business." class="att-blog-cta-btn">
          Get Our Recommendation
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>

  </main>
</template>

<style lang="scss" scoped>
// ── Page shell ────────────────────────────────────────────────────────────────
.att-blog-page {
  background: #f8fafc;
  min-height: 100vh;
  font-family: var(--font-body, Inter, system-ui, sans-serif);
}
.breadcrum-area {
  padding-top: 10vh;
  background-color: #06060a;
}
// ── Hero strip ────────────────────────────────────────────────────────────────
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

// ── Body layout ───────────────────────────────────────────────────────────────
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

// ── TOC sidebar ───────────────────────────────────────────────────────────────
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

// ── Content ───────────────────────────────.att-blog-intro────────────────────────────────────
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

// FAQ
.att-blog-faq-item {
  margin-bottom: 1.5rem;
  &:last-child { margin-bottom: 0; }
}

.att-blog-faq-q {
  font-size: 1rem; font-weight: 700; color: #0f172a;
  margin: 0 0 0.4rem;
}

// ── Cost breakdown chart card ───────────────────────────────────────────────
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

// ── Pricing model info cards ────────────────────────────────────────────────
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

// ── Build process timeline ──────────────────────────────────────────────────
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

// ── CTA strip ─────────────────────────────────────────────────────────────────
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

.att-blog-inline-link {
  color: #facc15; text-decoration: none; font-weight: 600;
  border-bottom: 1px solid rgba(250,204,21,0.35);
  transition: border-color 0.2s, color 0.2s;
  &:hover { color: #f0b429; border-color: #f0b429; }
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