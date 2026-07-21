<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    document.title = "Freelancer vs. Design Studio vs. Agency: Who Should Build Your Website? | Amortree";

    const description = document.querySelector('meta[name="description"]');

    if (description) {
        description.setAttribute(
            "content",
            "A practical guide to choosing between a freelancer, a boutique design studio, or a large agency for your business website — matched to budget, timeline, and what you actually need."
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
                <h1 class="att-blog-title">Freelancer, Design Studio, or <span class="att-blog-title-accent">Agency?</span></h1>
                <p class="att-blog-dek">Three very different ways to get a website built — and the honest trade-offs of each, so you don't find out the hard way three months in.</p>
                <div class="att-blog-meta">
                    <span>Amortree Tech</span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>Published <strong>Jul 2, 2026</strong></span>
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
          <a href="#three-options" class="att-blog-toc-item">The three options</a>
          <a href="#freelancer" class="att-blog-toc-item">Hiring a freelancer</a>
          <a href="#studio" class="att-blog-toc-item">Hiring a design studio</a>
          <a href="#agency" class="att-blog-toc-item">Hiring an agency</a>
          <a href="#comparison" class="att-blog-toc-item">Side-by-side comparison</a>
          <a href="#how-to-decide" class="att-blog-toc-item">How to decide</a>
          <a href="#faq" class="att-blog-toc-item">FAQ</a>
        </nav>

        <!-- Main content -->
        <article class="att-blog-content">

          <div class="att-blog-intro att-blog-section">
            <p>Once you've figured out roughly <a href="/blog/how-much-does-a-website-cost-in-india" class="att-blog-inline-link">what a website should cost</a>, the next question is who should actually build it. This decision matters more than most business owners expect — it affects not just the price, but the timeline, the quality, and how much of a headache the process becomes.</p>
            <p>Here's an honest look at all three options, with no option positioned as universally "best" — because the right choice genuinely depends on what you need.</p>
          </div>

          <section class="att-blog-section" id="three-options">
            <div class="att-blog-section-num" aria-hidden="true">01</div>
            <h2 class="att-blog-section-title">The Three Options, In Short</h2>
            <ul class="att-blog-list">
              <li><strong>Freelancer</strong> — one person, wearing every hat. Fast to start, but limited in scope and availability.</li>
              <li><strong>Boutique design studio</strong> — a small, focused team that handles design, development, and strategy together.</li>
              <li><strong>Large agency</strong> — a full-service organization with dedicated departments, built for complex, high-budget projects.</li>
            </ul>
            <p>None of these is a scaled-down or scaled-up version of the others. They're structurally different ways of working, and that difference matters more than the price tag alone.</p>
          </section>

          <section class="att-blog-section" id="freelancer">
            <div class="att-blog-section-num" aria-hidden="true">02</div>
            <h2 class="att-blog-section-title">Hiring a Freelancer</h2>
            <p>A freelancer is usually the fastest and cheapest way to get something built. You're working directly with the person doing the work, with no layers in between — which can mean faster decisions and lower overhead.</p>
            <p>The trade-off is capacity and range. Most freelancers are strong in one or two areas — design <em>or</em> development, rarely both at a high level — and a single freelancer can only take on so much at once. If they get busy, sick, or move on to another project, your timeline moves with them. There's also rarely a strategic layer: a freelancer will usually build what you ask for, but won't always push back on whether what you're asking for is the right approach.</p>
            <p><strong>Best for:</strong> simple, well-defined projects where you already know exactly what you want, and timeline flexibility isn't a major concern.</p>
          </section>

          <section class="att-blog-section" id="studio">
            <div class="att-blog-section-num" aria-hidden="true">03</div>
            <h2 class="att-blog-section-title">Hiring a Design Studio</h2>
            <p>A boutique studio sits in the middle — small enough to stay personal and fast, but structured enough to bring design, development, and strategy together under one roof. You're not relying on a single person's bandwidth, and there's usually someone thinking about whether the website will actually convert visitors, not just look good.</p>
            <p>This is typically where you'll find the most attention paid to the details that separate an average site from one that performs — animation, information hierarchy, mobile experience, and conversion-focused layout. The cost sits above a freelancer but meaningfully below a large agency, because the overhead is lower and the team is lean by design.</p>
            <p><strong>Best for:</strong> businesses that want a site that looks distinctive and converts well, without agency-level pricing or process.</p>
          </section>

          <section class="att-blog-section" id="agency">
            <div class="att-blog-section-num" aria-hidden="true">04</div>
            <h2 class="att-blog-section-title">Hiring an Agency</h2>
            <p>Large agencies bring dedicated specialists for every part of the process — strategists, designers, developers, project managers, sometimes even legal and compliance support. This is the right structure for genuinely complex projects: multi-stakeholder approvals, enterprise integrations, or work that spans well beyond a single website.</p>
            <p>The trade-off is cost and speed. More people in the process means more coordination, more meetings, and longer timelines. For a straightforward business website, this level of process often works against you rather than for you.</p>
            <p><strong>Best for:</strong> large organizations with complex requirements, multiple decision-makers, or needs that extend beyond web design alone.</p>
          </section>

          <section class="att-blog-section" id="comparison">
            <div class="att-blog-section-num" aria-hidden="true">05</div>
            <h2 class="att-blog-section-title">Side-by-Side Comparison</h2>
            <div class="att-blog-table-wrap">
              <table class="att-blog-table">
                <thead>
                  <tr><th>Factor</th><th>Freelancer</th><th>Design studio</th><th>Agency</th></tr>
                </thead>
                <tbody>
                  <tr><td>Typical timeline</td><td>1–3 weeks</td><td>2–6 weeks</td><td>6–16+ weeks</td></tr>
                  <tr><td>Strategic input</td><td>Minimal</td><td>Built in</td><td>Extensive</td></tr>
                  <tr><td>Reliability if things go wrong</td><td>Low — single point of failure</td><td>Moderate to high</td><td>High</td></tr>
                  <tr><td>Best project size</td><td>Small, simple</td><td>Small to mid-sized</td><td>Large, complex</td></tr>
                  <tr><td>Cost efficiency for SMBs</td><td>High</td><td>High</td><td>Low</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="att-blog-section" id="how-to-decide">
            <div class="att-blog-section-num" aria-hidden="true">06</div>
            <h2 class="att-blog-section-title">How to Decide</h2>
            <p>Ask yourself three questions before you commit:</p>
            <ul class="att-blog-list">
              <li><strong>How well-defined is the project?</strong> If you can describe exactly what you want in a few sentences, a freelancer may be enough. If you need help figuring out what you actually need, look at a studio or agency.</li>
              <li><strong>What happens if it goes wrong?</strong> A single freelancer becoming unavailable can stall a project entirely. A studio or agency has more built-in redundancy.</li>
              <li><strong>Does this need to convert visitors into customers, or just exist?</strong> If the site is a critical part of how you get leads, the strategic thinking a studio or agency brings tends to pay for itself.</li>
            </ul>
            <p>Most small and growing businesses in India land in the studio range — enough structure to avoid the risks of a single freelancer, without the overhead and timeline of a large agency.</p>
          </section>

          <section class="att-blog-section" id="faq">
            <div class="att-blog-section-num" aria-hidden="true">07</div>
            <h2 class="att-blog-section-title">Frequently Asked Questions</h2>

            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Is it cheaper to hire a freelancer than a design studio?</h3>
              <p>Usually upfront, yes. But freelancers rarely offer strategy, ongoing support, or a backup if they become unavailable mid-project — costs that tend to surface later rather than disappear.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Can a freelancer and a studio work on the same project?</h3>
              <p>Sometimes — for example, a freelancer writing copy while a studio handles design and build. But mixing multiple freelancers across design, development, and strategy usually creates coordination gaps that a single studio avoids.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">When does it make sense to hire a large agency instead of a studio?</h3>
              <p>When the project involves multiple stakeholders, complex approvals, or needs that go beyond a website, such as large-scale marketing campaigns or enterprise systems.</p>
            </div>
          </section>

        </article>
      </div>
    </div>

    <!-- CTA strip -->
    <div class="att-blog-cta">
      <div class="att-blog-cta-inner">
        <div class="att-blog-cta-text">
          <p class="att-blog-cta-title">Not sure which route fits your project?</p>
          <p class="att-blog-cta-sub">Tell us what you're building — we'll give you a straight answer, even if it's not us.</p>
        </div>
        <a href="https://wa.me/917975859061/?text=I%27d%20like%20to%20talk%20to%20you%20about%20my%20project." class="att-blog-cta-btn">
          Talk to Us
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

// ── Content ───────────────────────────────────────────────────────────────────
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

.att-blog-inline-link {
  color: #facc15; text-decoration: none; font-weight: 600;
  border-bottom: 1px solid rgba(250,204,21,0.35);
  transition: border-color 0.2s, color 0.2s;
  &:hover { color: #f0b429; border-color: #f0b429; }
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

// FAQ
.att-blog-faq-item {
  margin-bottom: 1.5rem;
  &:last-child { margin-bottom: 0; }
}

.att-blog-faq-q {
  font-size: 1rem; font-weight: 700; color: #0f172a;
  margin: 0 0 0.4rem;
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