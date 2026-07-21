<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


onMounted(() => {
    document.title = "SEO Basics Every Small Business in India Should Get Right | Amortree";

    const description = document.querySelector('meta[name="description"]');

    if (description) {
        description.setAttribute(
            "content",
            "You don't need a huge budget to rank locally. These are the fundamentals that move the needle before you spend a rupee on ads."
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

    // Animate the ranking-factors bar segments once in view
    gsap.utils.toArray(".att-chart-segment").forEach((seg) => {
        gsap.from(seg, {
            scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: seg, start: "top 90%", once: true },
        });
    });

    // Animate the results timeline nodes
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
                    SEO
                </div>
                <h1 class="att-blog-title">SEO Basics Every Small Business in India Should <span class="att-blog-title-accent">Get Right</span></h1>
                <p class="att-blog-dek">You don't need a huge budget to rank locally. These are the fundamentals that move the needle before you spend a rupee on ads.</p>
                <div class="att-blog-meta">
                    <span>Amortree Tech</span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>Published <strong>Apr 28, 2026</strong></span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>8 min read</span>
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
          <a href="#why-seo" class="att-blog-toc-item">Why local SEO matters</a>
          <a href="#ranking-factors" class="att-blog-toc-item">What drives local rankings</a>
          <a href="#gbp" class="att-blog-toc-item">Google Business Profile</a>
          <a href="#on-page" class="att-blog-toc-item">On-page basics</a>
          <a href="#keywords" class="att-blog-toc-item">Local keyword research</a>
          <a href="#speed" class="att-blog-toc-item">Site speed &amp; mobile</a>
          <a href="#content" class="att-blog-toc-item">Content that ranks</a>
          <a href="#reviews" class="att-blog-toc-item">Reviews &amp; citations</a>
          <a href="#timeline" class="att-blog-toc-item">How long until results</a>
          <a href="#mistakes" class="att-blog-toc-item">Common mistakes</a>
          <a href="#faq" class="att-blog-toc-item">FAQ</a>
        </nav>

        <!-- Main content -->
        <article class="att-blog-content">

          <div class="att-blog-intro att-blog-section">
            <p>SEO gets treated like a mysterious, expensive discipline reserved for big companies — but for a small business trying to show up when someone nearby searches "salon near me" or "best plumber in [city]," the fundamentals are neither expensive nor mysterious.</p>
            <p>Most small businesses in India lose local search visibility not because of some advanced technical gap, but because a handful of basics were never set up properly. This guide covers exactly those basics, in the order they actually matter.</p>
          </div>

          <section class="att-blog-section" id="why-seo">
            <div class="att-blog-section-num" aria-hidden="true">01</div>
            <h2 class="att-blog-section-title">Why Local SEO Matters More Than General SEO</h2>
            <p>For most small businesses — clinics, salons, contractors, restaurants, local service providers — the people who matter most are searching with location intent, whether or not they type the city name. Ranking for a broad, high-competition keyword nationally is a much harder and often pointless fight compared to owning your immediate area.</p>
            <p>Local SEO is also one of the few marketing channels where a well-optimized profile can outrank a competitor with a far bigger budget, simply because Google prioritizes relevance and proximity over ad spend for these results.</p>
          </section>

          <section class="att-blog-section" id="ranking-factors">
            <div class="att-blog-section-num" aria-hidden="true">02</div>
            <h2 class="att-blog-section-title">What Actually Drives Local Rankings</h2>
            <p>Not all SEO effort carries equal weight. For local search specifically, a few areas do most of the heavy lifting:</p>

            <figure class="att-chart-card">
              <figcaption class="att-chart-title">Where local ranking effort typically pays off</figcaption>
              <svg class="att-chart-svg" viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stacked bar chart showing local SEO ranking factor weight: Google Business Profile 30 percent, Reviews and reputation 25 percent, On-page and website signals 25 percent, Citations and backlinks 20 percent">
                <g font-family="inherit">
                  <!-- GBP 30% -->
                  <rect class="att-chart-segment" x="0" y="10" width="192" height="34" rx="6" fill="#facc15"/>
                  <text x="10" y="32" font-size="12" font-weight="700" fill="#0f172a">Google Business · 30%</text>

                  <!-- Reviews 25% -->
                  <rect class="att-chart-segment" x="196" y="10" width="160" height="34" rx="6" fill="#0f172a"/>
                  <text x="206" y="32" font-size="12" font-weight="700" fill="#f8fafc">Reviews · 25%</text>

                  <!-- On-page 25% -->
                  <rect class="att-chart-segment" x="360" y="10" width="160" height="34" rx="6" fill="#94a3b8"/>
                  <text x="370" y="32" font-size="11.5" font-weight="700" fill="#0f172a">On-page · 25%</text>

                  <!-- Citations 20% -->
                  <rect class="att-chart-segment" x="524" y="10" width="116" height="34" rx="6" fill="#e2e8f0"/>
                  <text x="534" y="32" font-size="11" font-weight="700" fill="#0f172a">Citations · 20%</text>
                </g>
                <text x="0" y="80" font-size="12" fill="#64748b">This is a general guideline, not a fixed algorithm — Google weighs these signals</text>
                <text x="0" y="98" font-size="12" fill="#64748b">differently by industry and location, but the relative order rarely flips.</text>
                <text x="0" y="130" font-size="11.5" font-weight="700" fill="#0f172a">Why this matters:</text>
                <text x="0" y="150" font-size="12" fill="#475569">If your Google Business Profile is incomplete or your reviews are thin,</text>
                <text x="0" y="168" font-size="12" fill="#475569">no amount of website tweaking will fully make up the gap.</text>
              </svg>
            </figure>
          </section>

          <section class="att-blog-section" id="gbp">
            <div class="att-blog-section-num" aria-hidden="true">03</div>
            <h2 class="att-blog-section-title">Google Business Profile: Your Highest-Leverage Asset</h2>
            <p>If you do nothing else from this guide, do this. A complete, active Google Business Profile is the single highest-leverage local SEO asset a small business has:</p>
            <ul class="att-blog-list">
              <li><strong>Claim and verify your listing</strong> — an unclaimed or unverified profile barely competes, no matter how good your website is.</li>
              <li><strong>Fill in every field</strong> — category, service area, hours, phone number, and a description using the terms customers actually search for.</li>
              <li><strong>Add photos regularly</strong> — listings with recent photos consistently get more clicks and calls than ones with a single old storefront shot.</li>
              <li><strong>Use posts and Q&amp;A</strong> — Google Business Profile supports short updates and a public Q&amp;A section; both are lightweight, free ranking signals.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="on-page">
            <div class="att-blog-section-num" aria-hidden="true">04</div>
            <h2 class="att-blog-section-title">On-Page Basics That Are Easy to Get Wrong</h2>
            <ul class="att-blog-list">
              <li><strong>Title tags and meta descriptions</strong> — every page needs a unique, descriptive title; "Home" or "Untitled" is a wasted opportunity on every single page.</li>
              <li><strong>One clear H1 per page</strong> — stating what the page is about in plain language, not just your business name.</li>
              <li><strong>City and service names in your actual copy</strong> — not stuffed unnaturally, but present in a natural sentence at least once per relevant page.</li>
              <li><strong>Image alt text</strong> — describes what's in the photo, which also helps with accessibility, not just search engines.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="keywords">
            <div class="att-blog-section-num" aria-hidden="true">05</div>
            <h2 class="att-blog-section-title">Local Keyword Research Without the Guesswork</h2>
            <p>You don't need paid keyword tools to get this right. Start with what customers actually say:</p>
            <ul class="att-blog-list">
              <li><strong>Type your service into Google</strong> and note the autocomplete suggestions — these are real, common phrasings.</li>
              <li><strong>Check "People also ask"</strong> on the results page for related questions worth answering on your site.</li>
              <li><strong>Listen to how customers describe what you do</strong> on calls or in messages — their words are often different from the industry terms you'd default to.</li>
              <li><strong>Include neighborhood-level terms</strong> where relevant, not just the city name, if you serve a specific area within a larger city.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="speed">
            <div class="att-blog-section-num" aria-hidden="true">06</div>
            <h2 class="att-blog-section-title">Site Speed &amp; Mobile Experience</h2>
            <p>Most local searches happen on a phone, often on a mobile connection that isn't always fast. A slow, non-responsive site loses visitors before they ever see your offer — and Google factors this into rankings directly.</p>
            <ul class="att-blog-list">
              <li><strong>Compress images</strong> before uploading — this is usually the single biggest speed win on a small business site.</li>
              <li><strong>Avoid heavy, unnecessary plugins or scripts</strong> that slow down page load for marginal visual benefit.</li>
              <li><strong>Test on an actual phone</strong>, not just a desktop browser resized smaller — the experience is genuinely different.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="content">
            <div class="att-blog-section-num" aria-hidden="true">07</div>
            <h2 class="att-blog-section-title">Content That Actually Ranks</h2>
            <p>You don't need a large blog to benefit from content — you need a small number of pages that genuinely answer what people are searching for. A dedicated page per core service, written in plain language with real details (pricing ranges, process, service area) tends to outperform a single generic "Services" page that tries to cover everything at once.</p>
          </section>

          <section class="att-blog-section" id="reviews">
            <div class="att-blog-section-num" aria-hidden="true">08</div>
            <h2 class="att-blog-section-title">Reviews &amp; Local Citations</h2>
            <p>Reviews aren't just a trust signal for customers — they're a ranking signal for Google. A steady trickle of recent, genuine reviews consistently outperforms a large batch collected once and never followed up on.</p>
            <p>Citations — your business name, address, and phone number listed consistently across directories like Justdial, Sulekha, or industry-specific listings — reinforce that your business is real and where you say it is. Consistency matters more than volume: the same details everywhere beats slightly different formatting across ten different sites.</p>
          </section>

          <section class="att-blog-section" id="timeline">
            <div class="att-blog-section-num" aria-hidden="true">09</div>
            <h2 class="att-blog-section-title">How Long Until You See Results</h2>
            <p>SEO is a compounding effort, not an instant switch. Here's a realistic shape of what to expect:</p>

            <div class="att-timeline">
              <div class="att-timeline-track" aria-hidden="true"></div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">1</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Setup</div>
                  <div class="att-timeline-days">Month 1</div>
                  <p>Google Business Profile claimed and completed, on-page basics fixed, citations cleaned up.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">2</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Early movement</div>
                  <div class="att-timeline-days">Month 2–3</div>
                  <p>Small ranking improvements for specific, less competitive local searches start to appear.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">3</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Steady growth</div>
                  <div class="att-timeline-days">Month 4–6</div>
                  <p>More consistent visibility across relevant searches as reviews and content accumulate.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">4</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Compounding</div>
                  <div class="att-timeline-days">6+ months</div>
                  <p>Rankings become harder for competitors to displace as your review count and content history grow.</p>
                </div>
              </div>
            </div>
          </section>

          <section class="att-blog-section" id="mistakes">
            <div class="att-blog-section-num" aria-hidden="true">10</div>
            <h2 class="att-blog-section-title">Common Mistakes to Avoid</h2>
            <ul class="att-blog-list">
              <li>Leaving your Google Business Profile unclaimed or half-filled</li>
              <li>Using inconsistent business name, address, or phone number across directories</li>
              <li>Stuffing city and keyword names unnaturally instead of writing for humans first</li>
              <li>Ignoring reviews — not asking for them, and not responding to the ones you get</li>
              <li>Chasing a national ranking when the customer base is entirely local</li>
            </ul>
          </section>

          <section class="att-blog-section" id="faq">
            <div class="att-blog-section-num" aria-hidden="true">11</div>
            <h2 class="att-blog-section-title">Frequently Asked Questions</h2>

            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Do I need to pay for SEO tools to get started?</h3>
              <p>No. Google Business Profile, Google Search Console, and manual competitor research cover the fundamentals. Paid tools become useful later, mainly for scaling content or tracking rankings at volume.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">How many reviews do I actually need?</h3>
              <p>There's no magic number, but a steady flow of recent reviews matters more than a large total collected long ago. Aim for a consistent, ongoing ask rather than a one-time push.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Should I run ads while working on SEO?</h3>
              <p>They're not mutually exclusive — ads can drive traffic while SEO builds up in the background. Just don't expect ads to substitute for the fundamentals; a weak Google Business Profile undermines both.</p>
            </div>
          </section>

        </article>
      </div>
    </div>

    <!-- CTA strip -->
    <div class="att-blog-cta">
      <div class="att-blog-cta-inner">
        <div class="att-blog-cta-text">
          <p class="att-blog-cta-title">Not sure where your local SEO stands?</p>
          <p class="att-blog-cta-sub">Get a free audit of your Google Business Profile and site fundamentals — no vague ranges, no pressure.</p>
        </div>
        <a href="https://wa.me/917975859061/?text=I%27d%20like%20to%20claim%20my%20free%20audit." class="att-blog-cta-btn">
          Claim Your Free Audit
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

// ── Content ──────────────────────────────────────────────────────────────────
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

// ── Ranking-factors chart card ──────────────────────────────────────────────
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

// ── Info cards (kept for structural consistency across blog pages) ─────────
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

// ── Results timeline ─────────────────────────────────────────────────────────
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