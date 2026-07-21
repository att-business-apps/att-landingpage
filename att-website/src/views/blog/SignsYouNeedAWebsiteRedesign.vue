<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


onMounted(() => {
    document.title = "7 Signs Your Website Is Quietly Costing You Customers | Amortree";

    const description = document.querySelector('meta[name="description"]');

    if (description) {
        description.setAttribute(
            "content",
            "Slow load times and confusing navigation don't just annoy visitors — they show up directly in your enquiry numbers. Here's what to check first."
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

    // Animate the bounce-rate chart bars once in view
    gsap.utils.toArray(".att-chart-segment").forEach((seg) => {
        gsap.from(seg, {
            scaleY: 0, transformOrigin: "bottom center", duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: seg, start: "top 90%", once: true },
        });
    });

    // Animate the self-audit timeline nodes
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
                    Strategy
                </div>
                <h1 class="att-blog-title">7 Signs Your Website Is Quietly <span class="att-blog-title-accent">Costing</span> You Customers</h1>
                <p class="att-blog-dek">Slow load times and confusing navigation don't just annoy visitors — they show up directly in your enquiry numbers. Here's what to check first.</p>
                <div class="att-blog-meta">
                    <span>Amortree Tech</span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>Published <strong>May 12, 2026</strong></span>
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
          <a href="#short-answer" class="att-blog-toc-item">The short answer</a>
          <a href="#signs" class="att-blog-toc-item">The 7 signs</a>
          <a href="#load-time" class="att-blog-toc-item">Why load time matters most</a>
          <a href="#navigation" class="att-blog-toc-item">Fixing confusing navigation</a>
          <a href="#mobile" class="att-blog-toc-item">Mobile experience gaps</a>
          <a href="#cta" class="att-blog-toc-item">Weak calls-to-action</a>
          <a href="#stale-content" class="att-blog-toc-item">Outdated content &amp; design</a>
          <a href="#quick-audit" class="att-blog-toc-item">A 10-minute self-audit</a>
          <a href="#faq" class="att-blog-toc-item">FAQ</a>
        </nav>

        <!-- Main content -->
        <article class="att-blog-content">

          <div class="att-blog-intro att-blog-section">
            <p>Most businesses don't notice their website is underperforming — they just notice that enquiries have quietly dropped, or that the phone doesn't ring as much as it used to. The website rarely gets blamed, because it's still technically "up." But a site can be online and still be losing you customers every single day.</p>
            <p>Here are the seven most common culprits, roughly in order of how much damage they tend to do.</p>
          </div>

          <section class="att-blog-section" id="short-answer">
            <div class="att-blog-section-num" aria-hidden="true">01</div>
            <h2 class="att-blog-section-title">The Short Answer</h2>
            <p>If your site is slow to load, hard to navigate on a phone, or doesn't make it obvious what to do next, you're losing visitors before they ever become leads — and it's usually invisible in your analytics unless you're looking for it specifically.</p>
            <p>None of these issues require a full rebuild to fix. Most are fixable in days, not months, once you know what to look for.</p>
          </section>

          <section class="att-blog-section" id="signs">
            <div class="att-blog-section-num" aria-hidden="true">02</div>
            <h2 class="att-blog-section-title">The 7 Signs, at a Glance</h2>
            <div class="att-blog-table-wrap">
              <table class="att-blog-table">
                <thead>
                  <tr><th>Sign</th><th>What it looks like</th><th>What it costs you</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Slow load time</td>
                    <td>Pages take more than 3 seconds to load, especially on mobile</td>
                    <td>Visitors leave before the page even finishes loading</td>
                  </tr>
                  <tr>
                    <td>Confusing navigation</td>
                    <td>Unclear menu labels, too many options, no obvious path</td>
                    <td>People can't find what they came for and give up</td>
                  </tr>
                  <tr>
                    <td>Not mobile-friendly</td>
                    <td>Text too small, buttons hard to tap, layout breaks</td>
                    <td>The majority of your traffic has a broken experience</td>
                  </tr>
                  <tr>
                    <td>Outdated design</td>
                    <td>Looks like it hasn't changed in 5+ years</td>
                    <td>Visitors quietly question whether you're still active</td>
                  </tr>
                  <tr>
                    <td>Weak call-to-action</td>
                    <td>No clear next step, or the button is hard to find</td>
                    <td>Interested visitors leave without contacting you</td>
                  </tr>
                  <tr>
                    <td>Stale content</td>
                    <td>Old prices, discontinued services, last blog post from years ago</td>
                    <td>Damages trust right when someone's deciding to reach out</td>
                  </tr>
                  <tr>
                    <td>No analytics</td>
                    <td>No way to see where visitors come from or where they drop off</td>
                    <td>You can't fix what you can't measure</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="att-blog-section" id="load-time">
            <div class="att-blog-section-num" aria-hidden="true">03</div>
            <h2 class="att-blog-section-title">Why Load Time Matters Most</h2>
            <p>Of all seven signs, slow load time does the most damage, because it costs you the visitor before they've seen anything else on the page:</p>

            <figure class="att-chart-card">
              <figcaption class="att-chart-title">Typical bounce rate by page load time</figcaption>
              <svg class="att-chart-svg" viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart showing bounce rate rising sharply with page load time: 1 second 9 percent, 3 seconds 32 percent, 5 seconds 53 percent, 10 seconds 77 percent">
                <g font-family="inherit">
                  <rect class="att-chart-segment" x="30" y="152" width="110" height="18" rx="4" fill="#e2e8f0"/>
                  <text x="40" y="148" font-size="12" font-weight="700" fill="#0f172a">9%</text>

                  <rect class="att-chart-segment" x="190" y="115" width="110" height="55" rx="6" fill="#94a3b8"/>
                  <text x="200" y="133" font-size="12" font-weight="700" fill="#0f172a">32%</text>

                  <rect class="att-chart-segment" x="350" y="80" width="110" height="90" rx="6" fill="#0f172a"/>
                  <text x="360" y="98" font-size="12" font-weight="700" fill="#f8fafc">53%</text>

                  <rect class="att-chart-segment" x="510" y="35" width="110" height="135" rx="6" fill="#facc15"/>
                  <text x="518" y="55" font-size="12" font-weight="700" fill="#0f172a">77%</text>

                  <line x1="20" y1="170" x2="630" y2="170" stroke="#e2e8f0" stroke-width="1"/>

                  <text x="30" y="188" font-size="11" font-weight="700" fill="#475569">1 second</text>
                  <text x="190" y="188" font-size="11" font-weight="700" fill="#475569">3 seconds</text>
                  <text x="350" y="188" font-size="11" font-weight="700" fill="#475569">5 seconds</text>
                  <text x="510" y="188" font-size="11" font-weight="700" fill="#475569">10 seconds</text>
                </g>
                <text x="0" y="212" font-size="12" fill="#64748b">Directional figures based on typical mobile browsing behavior —</text>
                <text x="0" y="228" font-size="12" fill="#64748b">the pattern holds even if your exact numbers differ.</text>
              </svg>
            </figure>

            <p>The fix is usually simpler than people expect: compressing images, removing unused scripts and plugins, and choosing decent hosting account for most of the improvement without touching the design at all.</p>
          </section>

          <section class="att-blog-section" id="navigation">
            <div class="att-blog-section-num" aria-hidden="true">04</div>
            <h2 class="att-blog-section-title">Fixing Confusing Navigation</h2>
            <p>Navigation problems are sneaky because they feel obvious to you — you built the site, so you already know where everything is. A first-time visitor doesn't have that advantage.</p>
            <ul class="att-blog-list">
              <li><strong>Keep the main menu short</strong> — five to seven items is a reasonable ceiling before it starts overwhelming people.</li>
              <li><strong>Use labels people actually search for</strong> — "Services" beats a clever but unclear label like "What We Do."</li>
              <li><strong>Make the path to contact obvious from anywhere</strong> — a visitor shouldn't have to hunt for how to reach you.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="mobile">
            <div class="att-blog-section-num" aria-hidden="true">05</div>
            <h2 class="att-blog-section-title">Mobile Experience Gaps</h2>
            <p>For most local and service businesses, the majority of visitors are on a phone. A site that was only ever really tested on a laptop tends to have problems that don't show up until you check it on an actual device: text too small to read, buttons too close together to tap accurately, or forms that are painful to fill in on a small screen.</p>
            <p>This is worth checking directly on your own phone, not just by resizing a desktop browser window — the two experiences aren't the same.</p>
          </section>

          <section class="att-blog-section" id="cta">
            <div class="att-blog-section-num" aria-hidden="true">06</div>
            <h2 class="att-blog-section-title">Weak or Missing Calls-to-Action</h2>
            <p>A visitor who's interested but doesn't see an obvious next step will simply leave. Every page that matters should answer, at a glance, "what do I do now?" — whether that's calling, messaging on WhatsApp, booking a slot, or filling in a short form.</p>
            <p>If your call-to-action is buried below several paragraphs of text, or written in vague language like "Learn More" with no context, you're likely losing people who were genuinely ready to act.</p>
          </section>

          <section class="att-blog-section" id="stale-content">
            <div class="att-blog-section-num" aria-hidden="true">07</div>
            <h2 class="att-blog-section-title">Outdated Content &amp; Design</h2>
            <p>An outdated design signals something to visitors whether you intend it to or not — it quietly raises the question of whether the business itself is still active or keeping up. The same goes for content: old prices, services you no longer offer, or a "latest news" section frozen two years in the past all chip away at trust at exactly the moment someone's deciding whether to reach out.</p>
          </section>

          <section class="att-blog-section" id="quick-audit">
            <div class="att-blog-section-num" aria-hidden="true">08</div>
            <h2 class="att-blog-section-title">A 10-Minute Self-Audit</h2>
            <p>You can catch most of these issues yourself with a quick, honest walkthrough:</p>

            <div class="att-timeline">
              <div class="att-timeline-track" aria-hidden="true"></div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">1</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Load on mobile data</div>
                  <div class="att-timeline-days">2 min</div>
                  <p>Open your site on your phone with WiFi off and time how long it actually takes to load.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">2</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Find the contact path</div>
                  <div class="att-timeline-days">2 min</div>
                  <p>Pretend you're a first-time visitor — how many taps does it take to reach a way to contact you?</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">3</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Check the content dates</div>
                  <div class="att-timeline-days">3 min</div>
                  <p>Scan for old prices, discontinued services, or a blog/news section that hasn't moved in a while.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">4</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Ask someone outside the business</div>
                  <div class="att-timeline-days">3 min</div>
                  <p>Hand your phone to someone unfamiliar with the site and watch where they hesitate or get stuck.</p>
                </div>
              </div>
            </div>
          </section>

          <section class="att-blog-section" id="faq">
            <div class="att-blog-section-num" aria-hidden="true">09</div>
            <h2 class="att-blog-section-title">Frequently Asked Questions</h2>

            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Do I need a full redesign, or can I fix these one at a time?</h3>
              <p>Most of these issues — speed, navigation labels, weak calls-to-action, stale content — can be fixed individually without a full rebuild. A redesign becomes worth it when several of these compound together or the underlying platform itself is limiting you.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">How do I know if slow load time is actually costing me leads?</h3>
              <p>If you have analytics set up, a high bounce rate combined with a low average time on page is a strong signal. Without analytics, a manual load-time check on mobile data is a reasonable stand-in.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Which sign should I fix first?</h3>
              <p>Load time and the mobile experience tend to have the biggest impact, since they affect every visitor before anything else on the page is even seen. Start there, then work through the rest.</p>
            </div>
          </section>

        </article>
      </div>
    </div>

    <!-- CTA strip -->
    <div class="att-blog-cta">
      <div class="att-blog-cta-inner">
        <div class="att-blog-cta-text">
          <p class="att-blog-cta-title">Not sure which signs apply to your site?</p>
          <p class="att-blog-cta-sub">Get a free audit and a straight-up list of what's actually costing you leads.</p>
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

// ── Bounce-rate chart card ───────────────────────────────────────────────────
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

// ── Self-audit timeline ──────────────────────────────────────────────────────
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