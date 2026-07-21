<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


onMounted(() => {
    document.title = "7 Signs Your Website Is Losing You Customers | Amortree";

    const description = document.querySelector('meta[name="description"]');

    if (description) {
        description.setAttribute(
            "content",
            "It's rarely just 'looking dated.' Seven concrete, checkable signs your website is actively costing you leads — and what to fix first."
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

    // Animate the bounce-risk bar segments once in view
    gsap.utils.toArray(".att-chart-segment").forEach((seg) => {
        gsap.from(seg, {
            scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: seg, start: "top 90%", once: true },
        });
    });

    // Animate the fix-priority timeline nodes
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
                <h1 class="att-blog-title">7 Signs Your Website Is <span class="att-blog-title-accent">Losing</span> You Customers</h1>
                <p class="att-blog-dek">Not just "looking dated" — these are concrete, checkable signs that your site is actively pushing potential customers away before they ever reach out.</p>
                <div class="att-blog-meta">
                    <span>Amortree Tech</span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>Published <strong>Jul 20, 2026</strong></span>
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
          <a href="#why-this-matters" class="att-blog-toc-item">Why this matters</a>
          <a href="#sign-slow-load" class="att-blog-toc-item">1. Slow load times</a>
          <a href="#sign-no-cta" class="att-blog-toc-item">2. No clear call to action</a>
          <a href="#sign-mobile" class="att-blog-toc-item">3. Broken mobile experience</a>
          <a href="#sign-outdated-design" class="att-blog-toc-item">4. Outdated visual design</a>
          <a href="#sign-contact-info" class="att-blog-toc-item">5. Buried contact info</a>
          <a href="#sign-navigation" class="att-blog-toc-item">6. Confusing navigation</a>
          <a href="#sign-social-proof" class="att-blog-toc-item">7. No social proof</a>
          <a href="#self-check" class="att-blog-toc-item">Score yourself</a>
          <a href="#fix-priority" class="att-blog-toc-item">What to fix first</a>
          <a href="#faq" class="att-blog-toc-item">FAQ</a>
        </nav>

        <!-- Main content -->
        <article class="att-blog-content">

          <div class="att-blog-intro att-blog-section">
            <p>Most business owners assume a website loses customers because it "looks old." Sometimes that's true — but far more often, the real damage comes from a handful of specific, fixable problems that have nothing to do with taste and everything to do with friction: the visitor wanted to do something, and the site made it harder than it needed to be.</p>
            <p>Here are seven signs to check on your own site right now, in order of how often they actually cost businesses leads.</p>
          </div>

          <section class="att-blog-section" id="why-this-matters">
            <div class="att-blog-section-num" aria-hidden="true">01</div>
            <h2 class="att-blog-section-title">Why This Matters More Than It Looks</h2>
            <p>A visitor who lands on your site has already done the hard part — they searched, clicked, and arrived with some intent to learn more or reach out. What happens in the next few seconds determines whether that intent turns into an enquiry or evaporates entirely.</p>
            <p>Unlike a shop with foot traffic, there's no second chance with a slow storefront. A frustrated visitor doesn't wait around — they hit back and click a competitor instead. That's what makes these seven signs worth taking seriously: each one is a specific point where visitors are quietly leaving.</p>
          </section>

          <section class="att-blog-section" id="sign-slow-load">
            <div class="att-blog-section-num" aria-hidden="true">02</div>
            <h2 class="att-blog-section-title">1. Slow Load Times</h2>
            <p>This is the single biggest silent killer of leads, because visitors never tell you they left — they just don't. Every extra second a page takes to load pushes more visitors to abandon it before they've even seen what you offer.</p>

            <figure class="att-chart-card">
              <figcaption class="att-chart-title">Illustrative — relative bounce risk by load time</figcaption>
              <svg class="att-chart-svg" viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart showing bounce risk increasing with page load time: 1 second low risk, 3 seconds moderate risk, 5 seconds high risk">
                <g font-family="inherit">
                  <!-- 1s -->
                  <rect class="att-chart-segment" x="0" y="10" width="120" height="34" rx="6" fill="#e2e8f0"/>
                  <text x="10" y="32" font-size="12" font-weight="700" fill="#0f172a">1s · Low risk</text>

                  <!-- 3s -->
                  <rect class="att-chart-segment" x="0" y="56" width="320" height="34" rx="6" fill="#facc15"/>
                  <text x="10" y="78" font-size="12" font-weight="700" fill="#0f172a">3s · Moderate risk</text>

                  <!-- 5s -->
                  <rect class="att-chart-segment" x="0" y="102" width="560" height="34" rx="6" fill="#0f172a"/>
                  <text x="10" y="124" font-size="12" font-weight="700" fill="#f8fafc">5s · High risk</text>
                </g>
                <text x="0" y="160" font-size="12" fill="#64748b">Every additional second of load time compounds visitor drop-off —</text>
                <text x="0" y="178" font-size="12" fill="#64748b">the gap between 1s and 5s is far larger than it feels while you're waiting.</text>
              </svg>
            </figure>

            <p><strong>Quick check:</strong> open your site on mobile data (not wifi) and time how long it takes to become usable. If it's more than 3–4 seconds, this is likely costing you leads right now.</p>
          </section>

          <section class="att-blog-section" id="sign-no-cta">
            <div class="att-blog-section-num" aria-hidden="true">03</div>
            <h2 class="att-blog-section-title">2. No Clear Call to Action</h2>
            <p>A surprising number of business websites describe what the company does in great detail — and never actually ask the visitor to do anything. No "Book a Call," no "Get a Quote," no phone number in sight. If a visitor has to hunt for how to contact you, most simply won't bother.</p>
            <p><strong>Quick check:</strong> look at your homepage without scrolling. Is there one obvious, unambiguous next step? If you can't answer instantly, neither can your visitors.</p>
          </section>

          <section class="att-blog-section" id="sign-mobile">
            <div class="att-blog-section-num" aria-hidden="true">04</div>
            <h2 class="att-blog-section-title">3. Broken Mobile Experience</h2>
            <p>Most traffic to a small business website today comes from a phone, not a laptop. A site that looks fine on a widescreen monitor but has cramped text, overlapping buttons, or a broken menu on mobile is turning away the majority of its visitors before they read a word.</p>
            <p><strong>Quick check:</strong> open your own site on your phone and try to complete the exact action you want a customer to take — call you, fill a form, view your services. If it's clunky for you, it's clunky for them.</p>
          </section>

          <section class="att-blog-section" id="sign-outdated-design">
            <div class="att-blog-section-num" aria-hidden="true">05</div>
            <h2 class="att-blog-section-title">4. Outdated Visual Design</h2>
            <p>This is the one people assume matters most, and it does matter — but mainly because of what it signals, not because of aesthetics alone. A dated design (small stretched images, default fonts, cluttered layouts) quietly tells a visitor "this business might not be actively run" — even if that's completely untrue.</p>
            <p><strong>Quick check:</strong> would you trust this site with your payment details or personal information if you'd never heard of the business before? If you hesitate, so will your visitors.</p>
          </section>

          <section class="att-blog-section" id="sign-contact-info">
            <div class="att-blog-section-num" aria-hidden="true">06</div>
            <h2 class="att-blog-section-title">5. Buried or Missing Contact Info</h2>
            <p>Some sites make visitors dig through a footer or a separate "Contact" page just to find a phone number. By the time a warm, ready-to-enquire visitor finds it, a chunk of that intent has already cooled off — or they've simply gone to find a competitor whose number was on the homepage.</p>
            <p><strong>Quick check:</strong> can a visitor call, WhatsApp, or email you within one click from your homepage, without scrolling or navigating away? If not, that's friction you're paying for.</p>
          </section>

          <section class="att-blog-section" id="sign-navigation">
            <div class="att-blog-section-num" aria-hidden="true">07</div>
            <h2 class="att-blog-section-title">6. Confusing Navigation</h2>
            <p>Too many menu items, unclear labels, or pages that don't match what a visitor expected all add up to the same result: the visitor gives up trying to find what they need. A confused visitor doesn't ask for help — they just leave.</p>
            <p><strong>Quick check:</strong> hand your phone to someone unfamiliar with your business and ask them to find your pricing or services. Watch where they hesitate — that's exactly where real customers are getting stuck too.</p>
          </section>

          <section class="att-blog-section" id="sign-social-proof">
            <div class="att-blog-section-num" aria-hidden="true">08</div>
            <h2 class="att-blog-section-title">7. No Social Proof</h2>
            <p>New visitors don't know you yet, and a website with zero testimonials, reviews, client logos, or before/after examples is asking them to take a leap of faith on trust alone. Social proof isn't decoration — it's often the deciding factor between "I'll enquire" and "I'll keep looking."</p>
            <p><strong>Quick check:</strong> can a first-time visitor find evidence that real people have used and liked your service, without leaving your site? If the answer is no, you're leaving trust-building — and conversions — on the table.</p>
          </section>

          <section class="att-blog-section" id="self-check">
            <div class="att-blog-section-num" aria-hidden="true">09</div>
            <h2 class="att-blog-section-title">Score Yourself</h2>
            <p>Count how many of the seven signs above apply to your current website, then use this as a rough guide:</p>
            <div class="att-info-grid">
              <div class="att-info-card">
                <div class="att-info-card-label">0–1 signs</div>
                <p>You're in reasonably good shape. Worth revisiting periodically, but no urgent action needed.</p>
              </div>
              <div class="att-info-card">
                <div class="att-info-card-label">2–3 signs</div>
                <p>Your site is likely leaking leads. A focused round of fixes — not necessarily a full rebuild — should recover meaningful ground.</p>
              </div>
              <div class="att-info-card">
                <div class="att-info-card-label">4+ signs</div>
                <p>The site is probably working against you more than for you. Worth a proper audit before spending more on ads or marketing that sends traffic to it.</p>
              </div>
            </div>
          </section>

          <section class="att-blog-section" id="fix-priority">
            <div class="att-blog-section-num" aria-hidden="true">10</div>
            <h2 class="att-blog-section-title">What to Fix First</h2>
            <p>Not everything needs to happen at once. Here's a sensible order of operations:</p>

            <div class="att-timeline">
              <div class="att-timeline-track" aria-hidden="true"></div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">1</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Quick fixes</div>
                  <div class="att-timeline-days">This week</div>
                  <p>Add a visible phone number and CTA button to the homepage. Cheapest fix, often the biggest immediate impact.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">2</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Trust &amp; content</div>
                  <div class="att-timeline-days">2–3 weeks</div>
                  <p>Add testimonials, reviews, or client examples. Tighten navigation labels based on real user testing.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">3</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Performance &amp; mobile</div>
                  <div class="att-timeline-days">4–6 weeks</div>
                  <p>Optimize images, fix mobile layout issues, and address load-time problems — usually needs a developer's help.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">4</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Full redesign</div>
                  <div class="att-timeline-days">If 4+ signs apply</div>
                  <p>If the foundation itself is outdated or technically limited, patching individual issues stops being worth it — a rebuild pays for itself faster.</p>
                </div>
              </div>
            </div>
          </section>

          <section class="att-blog-section" id="faq">
            <div class="att-blog-section-num" aria-hidden="true">11</div>
            <h2 class="att-blog-section-title">Frequently Asked Questions</h2>

            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">How do I know if it's my website or just low traffic?</h3>
              <p>Check your analytics: if you have healthy traffic but a high bounce rate and very few enquiries, the problem is almost always the site experience, not visibility. If traffic itself is low, that's a separate SEO or marketing issue.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Can I fix these issues myself, or do I need a professional?</h3>
              <p>Adding a visible phone number or testimonial is something most business owners can do directly. Load-time and mobile layout issues usually require a developer, since the fix is often in the underlying code, not just the content.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">How much does fixing these issues typically cost?</h3>
              <p>Quick fixes can often be done for a small fee or included in a maintenance retainer. A fuller refresh addressing performance and design typically falls in a similar range to <a href="/blog/how-much-does-a-website-cost-in-india" class="att-blog-inline-link">a new landing page build</a>, since it involves comparable design and development work.</p>
            </div>
          </section>

        </article>
      </div>
    </div>

    <!-- CTA strip -->
    <div class="att-blog-cta">
      <div class="att-blog-cta-inner">
        <div class="att-blog-cta-text">
          <p class="att-blog-cta-title">Wondering how many signs apply to your site?</p>
          <p class="att-blog-cta-sub">Get a free audit — we'll tell you exactly what's costing you leads.</p>
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

// ── Content ────────────────────────────────────────────────────────────────
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

// ── Cost/stat breakdown chart card ──────────────────────────────────────────
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

// ── Info cards (3-up grid) ──────────────────────────────────────────────────
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

// ── Process / priority timeline ─────────────────────────────────────────────
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