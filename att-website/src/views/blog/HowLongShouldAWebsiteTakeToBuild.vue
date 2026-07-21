<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


onMounted(() => {
    document.title = "How Long Should a Website Actually Take to Build? | Amortree";

    const description = document.querySelector('meta[name="description"]');

    if (description) {
        description.setAttribute(
            "content",
            "Real timelines for landing pages, multi-page sites, and custom builds — what determines how long it takes, what slows projects down, and how to read a timeline quote."
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

    // Animate the timeline-by-project-type bar segments once in view
    gsap.utils.toArray(".att-chart-segment").forEach((seg) => {
        gsap.from(seg, {
            scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: seg, start: "top 90%", once: true },
        });
    });

    // Animate the week-by-week timeline nodes
    gsap.utils.toArray(".att-timeline-node").forEach((node, i) => {
        gsap.from(node, {
            autoAlpha: 0, y: 18, duration: 0.5, ease: "power2.out", delay: i * 0.08,
            scrollTrigger: { trigger: ".att-timeline", start: "top 85%", once: true },
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
                <h1 class="att-blog-title">How Long Should a Website <span class="att-blog-title-accent">Actually</span> Take?</h1>
                <p class="att-blog-dek">Real timelines for landing pages, multi-page sites, and custom builds — what determines the timeline, what slows it down, and how to read a quote that promises the impossible.</p>
                <div class="att-blog-meta">
                    <span>Amortree Tech</span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>Published <strong>Jan 24, 2026</strong></span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>7 min read</span>
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
          <a href="#why-timelines-vary" class="att-blog-toc-item">Why timelines vary</a>
          <a href="#what-determines-it" class="att-blog-toc-item">What determines timeline</a>
          <a href="#by-project-type" class="att-blog-toc-item">Timeline by project type</a>
          <a href="#week-by-week" class="att-blog-toc-item">Week-by-week breakdown</a>
          <a href="#what-slows-it-down" class="att-blog-toc-item">What slows it down</a>
          <a href="#speed-it-up" class="att-blog-toc-item">How to speed it up</a>
          <a href="#reading-a-quote" class="att-blog-toc-item">Reading a timeline quote</a>
          <a href="#faq" class="att-blog-toc-item">FAQ</a>
        </nav>

        <!-- Main content -->
        <article class="att-blog-content">

          <div class="att-blog-intro att-blog-section">
            <p>"How long will it take?" is usually the second question business owners ask, right after <a href="/blog/how-much-does-a-website-cost-in-india" class="att-blog-inline-link">how much it costs</a>. And like cost, the honest answer is "it depends" — but the factors it depends on are specific and predictable, not mysterious.</p>
            <p>This guide gives you real timeline ranges, what actually drives them, and how to tell a realistic quote from one that's either padded or dangerously optimistic.</p>
          </div>

          <section class="att-blog-section" id="why-timelines-vary">
            <div class="att-blog-section-num" aria-hidden="true">01</div>
            <h2 class="att-blog-section-title">Why Timelines Vary So Much</h2>
            <p>Ask five people how long a website takes and you'll get five different answers — because "website" covers everything from a single-page brochure to a fully custom platform with integrations. The gap between a 1-week project and a 16-week project usually isn't about one team being faster than another. It's about scope, and how ready the content is before work even starts.</p>
          </section>

          <section class="att-blog-section" id="what-determines-it">
            <div class="att-blog-section-num" aria-hidden="true">02</div>
            <h2 class="att-blog-section-title">What Actually Determines Timeline</h2>
            <ul class="att-blog-list">
              <li><strong>Number of pages and depth</strong> — a single landing page and a 12-page multi-section site aren't the same order of magnitude, even at similar design quality.</li>
              <li><strong>Content readiness</strong> — this is the single biggest variable, and the one most within your control. If copy, photos, and brand assets are ready on day one, weeks get saved. If they need to be written or sourced mid-project, the timeline stretches to match.</li>
              <li><strong>Custom animation and interactivity</strong> — the same features that make a site feel premium (see <a href="/blog/how-much-does-a-website-cost-in-india" class="att-blog-inline-link">our pricing guide</a>) also add build time.</li>
              <li><strong>Number of revision rounds</strong> — each round of feedback and changes adds days, especially if feedback arrives in scattered batches instead of one consolidated pass.</li>
              <li><strong>Integrations</strong> — booking systems, payment gateways, or custom forms that connect to other tools typically add testing time beyond the visible design work.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="by-project-type">
            <div class="att-blog-section-num" aria-hidden="true">03</div>
            <h2 class="att-blog-section-title">Timeline by Project Type</h2>
            <p>Here's what realistic timelines actually look like, assuming content is ready when the project starts:</p>

            <figure class="att-chart-card">
              <figcaption class="att-chart-title">Typical timeline by project type</figcaption>
              <svg class="att-chart-svg" viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart showing typical build timelines: single landing page 1 to 2 weeks, multi-page business site 3 to 6 weeks, complex custom build 8 to 16 weeks">
                <g font-family="inherit">
                  <!-- Landing page 1-2wks -->
                  <rect class="att-chart-segment" x="0" y="10" width="110" height="34" rx="6" fill="#e2e8f0"/>
                  <text x="10" y="32" font-size="12" font-weight="700" fill="#0f172a">1–2 wks · Landing page</text>

                  <!-- Multi-page 3-6wks -->
                  <rect class="att-chart-segment" x="0" y="56" width="290" height="34" rx="6" fill="#facc15"/>
                  <text x="10" y="78" font-size="12" font-weight="700" fill="#0f172a">3–6 wks · Multi-page site</text>

                  <!-- Custom 8-16wks -->
                  <rect class="att-chart-segment" x="0" y="102" width="560" height="34" rx="6" fill="#0f172a"/>
                  <text x="10" y="124" font-size="12" font-weight="700" fill="#f8fafc">8–16 wks · Complex custom build</text>
                </g>
                <text x="0" y="160" font-size="12" fill="#64748b">Ranges assume content is ready at kickoff — missing copy or photos</text>
                <text x="0" y="178" font-size="12" fill="#64748b">typically adds 1–3 weeks regardless of project type.</text>
              </svg>
            </figure>
          </section>

          <section class="att-blog-section" id="week-by-week">
            <div class="att-blog-section-num" aria-hidden="true">04</div>
            <h2 class="att-blog-section-title">Week-by-Week: A Typical Multi-Page Build</h2>
            <p>To make "3–6 weeks" more concrete, here's what a mid-sized project usually looks like stage by stage:</p>

            <div class="att-timeline">
              <div class="att-timeline-track" aria-hidden="true"></div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">1</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Discovery &amp; planning</div>
                  <div class="att-timeline-days">Week 1</div>
                  <p>Defining pages, sitemap, and what each page needs to accomplish before any design starts.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">2</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Design</div>
                  <div class="att-timeline-days">Weeks 1–2</div>
                  <p>Wireframes and visual design, usually with one consolidated feedback round before moving to development.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">3</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Development</div>
                  <div class="att-timeline-days">Weeks 2–4</div>
                  <p>Building the approved design into a working, responsive site — animations, forms, and any integrations included.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">4</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">QA &amp; launch</div>
                  <div class="att-timeline-days">Weeks 5–6</div>
                  <p>Cross-browser and mobile testing, speed checks, and final review before the site goes live.</p>
                </div>
              </div>
            </div>
          </section>

          <section class="att-blog-section" id="what-slows-it-down">
            <div class="att-blog-section-num" aria-hidden="true">05</div>
            <h2 class="att-blog-section-title">What Slows It Down</h2>
            <p>In our experience, delays almost never come from the design or development work itself — they come from the gaps around it:</p>
            <ul class="att-blog-list">
              <li><strong>Content arriving late or in pieces</strong> — copy and images trickling in over weeks instead of arriving as a complete set at the start</li>
              <li><strong>Scattered feedback</strong> — comments arriving across five separate messages over two weeks instead of one consolidated review</li>
              <li><strong>Scope creep</strong> — new pages or features added mid-project without adjusting the timeline to match</li>
              <li><strong>Slow approval chains</strong> — if multiple stakeholders need to sign off and aren't aligned, each round of review can add days on its own</li>
            </ul>
          </section>

          <section class="att-blog-section" id="speed-it-up">
            <div class="att-blog-section-num" aria-hidden="true">06</div>
            <h2 class="att-blog-section-title">How to Speed It Up — Your Part</h2>
            <div class="att-info-grid">
              <div class="att-info-card">
                <div class="att-info-card-label">Prepare content early</div>
                <p>Have your copy, logo, and photos ready before the project starts, not gathered as you go. This alone is the biggest lever you control.</p>
              </div>
              <div class="att-info-card">
                <div class="att-info-card-label">Consolidate feedback</div>
                <p>Collect input from everyone who needs to weigh in, then send it as one clear round rather than a stream of individual messages.</p>
              </div>
              <div class="att-info-card">
                <div class="att-info-card-label">Lock scope upfront</div>
                <p>Decide what's in the first version before kickoff. New ideas can always become a fast follow-up phase after launch.</p>
              </div>
            </div>
          </section>

          <section class="att-blog-section" id="reading-a-quote">
            <div class="att-blog-section-num" aria-hidden="true">07</div>
            <h2 class="att-blog-section-title">Reading a Timeline Quote</h2>
            <p>Two red flags worth watching for, in opposite directions:</p>
            <ul class="att-blog-list">
              <li><strong>Suspiciously fast</strong> — a "custom" multi-page site promised in 3–4 days is almost always a template with your branding swapped in, not genuinely custom work.</li>
              <li><strong>Vague and open-ended</strong> — "it depends, we'll see" with no milestone structure at all makes it hard to know if a project is on track or quietly stalled.</li>
            </ul>
            <p>A trustworthy quote gives you a range tied to specific milestones — discovery, design approval, development, launch — not just a single end date pulled from thin air.</p>
          </section>

          <section class="att-blog-section" id="faq">
            <div class="att-blog-section-num" aria-hidden="true">08</div>
            <h2 class="att-blog-section-title">Frequently Asked Questions</h2>

            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Can a website be built faster if I pay more?</h3>
              <p>To an extent — a dedicated team working exclusively on your project can move faster than one juggling several clients. But content readiness and feedback speed still set the floor; no amount of budget skips those steps entirely.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Why do some agencies quote much longer timelines than others?</h3>
              <p>Larger agencies often have more approval layers and coordination overhead, which was covered in <a href="/blog/freelancer-vs-design-studio-vs-agency" class="att-blog-inline-link">our comparison of freelancers, studios, and agencies</a>. A longer timeline isn't automatically a red flag — it depends on what's driving it.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">What happens if my content isn't ready when the project starts?</h3>
              <p>Most studios will either pause the relevant stage until content arrives or run content creation in parallel with design — both work, but either way, the timeline shifts to reflect the delay rather than staying fixed.</p>
            </div>
          </section>

        </article>
      </div>
    </div>

    <!-- CTA strip -->
    <div class="att-blog-cta">
      <div class="att-blog-cta-inner">
        <div class="att-blog-cta-text">
          <p class="att-blog-cta-title">Want a realistic timeline for your project?</p>
          <p class="att-blog-cta-sub">Tell us what you're building — we'll give you a straight answer, milestones included.</p>
        </div>
        <a href="https://wa.me/917975859061/?text=I%27d%20like%20to%20get%20a%20timeline%20estimate%20for%20my%20project." class="att-blog-cta-btn">
          Get a Timeline Estimate
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