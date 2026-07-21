<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


onMounted(() => {
    document.title = "How Much Does a Website Cost in India? [2026 Pricing Guide] | Amortree";

    const description = document.querySelector('meta[name="description"]');

    if (description) {
        description.setAttribute(
            "content",
            "A transparent breakdown of website design costs in India for small businesses in 2026 — DIY vs freelancer vs agency, what drives the price, and how to budget without overpaying."
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

    // Animate the cost-breakdown bar segments once in view
    gsap.utils.toArray(".att-chart-segment").forEach((seg) => {
        gsap.from(seg, {
            scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: seg, start: "top 90%", once: true },
        });
    });

    // Animate the process timeline nodes
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
                <h1 class="att-blog-title">How Much Does a <span class="att-blog-title-accent">Website</span> Really Cost in 2026?</h1>
                <p class="att-blog-dek">A transparent, no-fluff pricing guide for small business owners in India — what actually drives the cost, how the build process works, and how to avoid overpaying (or underpaying).</p>
                <div class="att-blog-meta">
                    <span>Amortree Tech</span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>Published <strong>Jun 20, 2026</strong></span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>9 min read</span>
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
          <a href="#cost-drivers" class="att-blog-toc-item">What actually drives cost</a>
          <a href="#pricing-models" class="att-blog-toc-item">Fixed vs hourly vs retainer</a>
          <a href="#comparison" class="att-blog-toc-item">DIY vs freelancer vs agency</a>
          <a href="#by-business-type" class="att-blog-toc-item">Cost by business type</a>
          <a href="#build-process" class="att-blog-toc-item">How the build process works</a>
          <a href="#hidden-costs" class="att-blog-toc-item">Hidden costs to watch for</a>
          <a href="#budgeting" class="att-blog-toc-item">How to budget it right</a>
          <a href="#red-flags" class="att-blog-toc-item">Red flags to avoid</a>
          <a href="#faq" class="att-blog-toc-item">FAQ</a>
        </nav>

        <!-- Main content -->
        <article class="att-blog-content">

          <div class="att-blog-intro att-blog-section">
            <p>If you've asked three different people "how much should my website cost," you've probably gotten three wildly different answers — anywhere from ₹3,000 to ₹3,00,000. That's not because anyone's lying to you. It's because "website" means completely different things depending on who's building it and why.</p>
            <p>This guide breaks down real numbers so you can budget with confidence, whether you're a solo consultant who needs a single page or a growing business that needs a proper digital presence.</p>
          </div>

          <section class="att-blog-section" id="short-answer">
            <div class="att-blog-section-num" aria-hidden="true">01</div>
            <h2 class="att-blog-section-title">The Short Answer</h2>
            <p>For most small businesses in India in 2026, a professionally designed website falls into one of three brackets:</p>
            <ul class="att-blog-list">
              <li><strong>₹8,000 – ₹25,000</strong> — a single, well-designed landing page for a specific service or launch</li>
              <li><strong>₹25,000 – ₹80,000</strong> — a multi-page business website with custom design, animations, and SEO basics</li>
              <li><strong>₹80,000+</strong> — a full digital presence with custom functionality, integrations, or e-commerce</li>
            </ul>
            <p>The right number for you depends on what the website needs to <em>do</em> — not just what it needs to look like. That's what the rest of this guide is for.</p>
          </section>

          <section class="att-blog-section" id="cost-drivers">
            <div class="att-blog-section-num" aria-hidden="true">02</div>
            <h2 class="att-blog-section-title">What Actually Drives the Cost</h2>
            <p>Price differences between two websites rarely come down to how many pages they have. They come down to these five factors:</p>
            <ul class="att-blog-list">
              <li><strong>Custom design vs. template</strong> — a template is faster and cheaper, but it looks like a template. Custom design costs more because someone is solving your specific brand and layout problems, not filling in a theme.</li>
              <li><strong>Animation and interactivity</strong> — scroll animations, hover states, and micro-interactions (the things that make a site feel "premium") take real development time.</li>
              <li><strong>Content readiness</strong> — if you already have copy, photos, and brand assets ready, the build is faster. If someone has to write copy and source or shoot images, that's additional scope.</li>
              <li><strong>Technical complexity</strong> — booking systems, payment integration, multi-language support, or custom forms all add development hours.</li>
              <li><strong>Revisions and ownership</strong> — how many rounds of feedback are included, and do you own the final files outright, or are you locked into a platform?</li>
            </ul>

            <!-- Educational visual: where a typical budget goes -->
            <figure class="att-chart-card">
              <figcaption class="att-chart-title">Where a typical website budget goes</figcaption>
              <svg class="att-chart-svg" viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stacked bar chart showing website budget allocation: Design and UX 30 percent, Development 40 percent, Content and copy 15 percent, Testing and launch 15 percent">
                <g font-family="inherit">
                  <!-- Design 30% -->
                  <rect class="att-chart-segment" x="0" y="10" width="192" height="34" rx="6" fill="#facc15"/>
                  <text x="10" y="32" font-size="12" font-weight="700" fill="#0f172a">Design &amp; UX · 30%</text>

                  <!-- Development 40% -->
                  <rect class="att-chart-segment" x="196" y="10" width="256" height="34" rx="6" fill="#0f172a"/>
                  <text x="206" y="32" font-size="12" font-weight="700" fill="#f8fafc">Development · 40%</text>

                  <!-- Content 15% -->
                  <rect class="att-chart-segment" x="456" y="10" width="96" height="34" rx="6" fill="#94a3b8"/>
                  <text x="466" y="32" font-size="11.5" font-weight="700" fill="#0f172a">Content · 15%</text>

                  <!-- Testing/launch 15% -->
                  <rect class="att-chart-segment" x="556" y="10" width="84" height="34" rx="6" fill="#e2e8f0"/>
                  <text x="563" y="32" font-size="11" font-weight="700" fill="#0f172a">QA &amp; Launch · 15%</text>
                </g>
                <text x="0" y="80" font-size="12" fill="#64748b">This is a general guideline, not a formula — a content-heavy site shifts more budget</text>
                <text x="0" y="98" font-size="12" fill="#64748b">toward copywriting and photography; a highly custom UI shifts more toward design.</text>
                <text x="0" y="130" font-size="11.5" font-weight="700" fill="#0f172a">Why this matters:</text>
                <text x="0" y="150" font-size="12" fill="#475569">If a quote is 80% "development" with almost nothing allocated to design,</text>
                <text x="0" y="168" font-size="12" fill="#475569">you're likely getting a template dressed up as a custom site.</text>
              </svg>
            </figure>
          </section>

          <section class="att-blog-section" id="pricing-models">
            <div class="att-blog-section-num" aria-hidden="true">03</div>
            <h2 class="att-blog-section-title">Fixed Price, Hourly, or Retainer — What's the Difference?</h2>
            <p>Beyond <em>how much</em>, it helps to understand <em>how</em> you're being charged. The pricing model affects your risk, not just your total spend:</p>
            <div class="att-info-grid">
              <div class="att-info-card">
                <div class="att-info-card-label">Fixed price</div>
                <p>One agreed number for a defined scope. Best when you know exactly what you need. Predictable, but any added feature mid-project usually triggers a change order.</p>
              </div>
              <div class="att-info-card">
                <div class="att-info-card-label">Hourly</div>
                <p>You pay for time spent. Flexible for evolving projects, but harder to predict the final bill — always ask for a not-to-exceed estimate.</p>
              </div>
              <div class="att-info-card">
                <div class="att-info-card-label">Retainer</div>
                <p>A recurring monthly fee for ongoing work — updates, new pages, SEO, small fixes. Makes sense once the site is live and needs continuous care, not for the initial build.</p>
              </div>
            </div>
          </section>

          <section class="att-blog-section" id="comparison">
            <div class="att-blog-section-num" aria-hidden="true">04</div>
            <h2 class="att-blog-section-title">DIY vs. Freelancer vs. Agency</h2>
            <p>Each route makes sense for a different stage of business. Here's an honest comparison:</p>
            <div class="att-blog-table-wrap">
              <table class="att-blog-table">
                <thead>
                  <tr><th>Route</th><th>Typical cost</th><th>Best for</th><th>Trade-off</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DIY builder<br><span class="att-blog-table-sub">(Wix, Squarespace, etc.)</span></td>
                    <td>₹0 – ₹8,000/yr</td>
                    <td>Testing an idea before investing</td>
                    <td>Generic look, your own time cost, weak SEO foundation</td>
                  </tr>
                  <tr>
                    <td>Freelancer</td>
                    <td>₹10,000 – ₹50,000</td>
                    <td>Simple, well-defined projects</td>
                    <td>Quality varies widely; limited strategy or ongoing support</td>
                  </tr>
                  <tr>
                    <td>Boutique studio<br><span class="att-blog-table-sub">(like Amortree)</span></td>
                    <td>₹25,000 – ₹1,50,000</td>
                    <td>Businesses that need it to actually convert visitors into leads</td>
                    <td>Higher upfront cost, but design + strategy + build in one place</td>
                  </tr>
                  <tr>
                    <td>Large agency</td>
                    <td>₹2,00,000+</td>
                    <td>Enterprises with complex, multi-stakeholder needs</td>
                    <td>Slower timelines, more process overhead</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="att-blog-section" id="by-business-type">
            <div class="att-blog-section-num" aria-hidden="true">05</div>
            <h2 class="att-blog-section-title">Cost by Business Type</h2>
            <p>Different business types tend to need different things from a site, which shifts the budget:</p>
            <ul class="att-blog-list">
              <li><strong>Local service business</strong> (clinics, salons, contractors) — a strong single landing page with clear contact/booking flow usually covers it: ₹15,000–₹40,000.</li>
              <li><strong>Real estate / property listings</strong> — needs structured project pages, image galleries, and enquiry forms: ₹40,000–₹1,00,000.</li>
              <li><strong>Fintech / SaaS startups</strong> — needs to build trust fast, often with interactive product previews and compliance-related pages: ₹60,000–₹2,00,000+.</li>
              <li><strong>Personal brand / consultant</strong> — usually one polished page is enough: ₹8,000–₹25,000.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="build-process">
            <div class="att-blog-section-num" aria-hidden="true">06</div>
            <h2 class="att-blog-section-title">How the Build Process Actually Works</h2>
            <p>Understanding the stages behind the price tag makes it much easier to judge a quote. A properly run project moves through four stages:</p>

            <div class="att-timeline">
              <div class="att-timeline-track" aria-hidden="true"></div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">1</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Discovery</div>
                  <div class="att-timeline-days">1–3 days</div>
                  <p>Understanding your business, audience, and what the site needs to achieve — enquiries, bookings, credibility, or sales.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">2</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Design</div>
                  <div class="att-timeline-days">3–10 days</div>
                  <p>Wireframes, then visual design in tools like Figma. This is where layout, hierarchy, and brand feel get locked in before any code is written.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">3</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Development</div>
                  <div class="att-timeline-days">5–20 days</div>
                  <p>Turning the approved design into a working, responsive site — including animations, forms, and any integrations.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">4</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">QA &amp; Launch</div>
                  <div class="att-timeline-days">2–5 days</div>
                  <p>Cross-browser and mobile testing, speed checks, and a final review before the site goes live on your domain.</p>
                </div>
              </div>
            </div>

            <p>The bigger the gap between what's promised and this typical breakdown — for example, a "custom" site delivered in 2 days — the more likely it's a template with your logo swapped in.</p>
          </section>

          <section class="att-blog-section" id="hidden-costs">
            <div class="att-blog-section-num" aria-hidden="true">07</div>
            <h2 class="att-blog-section-title">Hidden Costs to Watch For</h2>
            <p>The quoted price is rarely the full picture. Ask about these before you sign anything:</p>
            <ul class="att-blog-list">
              <li><strong>Domain and hosting</strong> — usually ₹1,000–₹5,000/year, separate from the design cost</li>
              <li><strong>Stock photography or custom photography</strong> — can add ₹5,000–₹20,000 if you don't have your own assets</li>
              <li><strong>Post-launch changes</strong> — clarify how many free revision rounds are included, and what happens after</li>
              <li><strong>Platform lock-in</strong> — some cheap builds are only editable through the original provider, meaning you're stuck paying them forever for small changes</li>
            </ul>
          </section>

          <section class="att-blog-section" id="budgeting">
            <div class="att-blog-section-num" aria-hidden="true">08</div>
            <h2 class="att-blog-section-title">How to Budget It Right</h2>
            <p>A useful way to think about it: your website should cost roughly what one new customer is worth to you, not more than a few months of what you'd spend on ads to get the same result. If a single client or booking is worth ₹20,000 to your business, spending ₹30,000–₹50,000 on a site that reliably converts visitors into enquiries pays for itself within a couple of clients.</p>
            <p>Start by defining what the site needs to <em>do</em> — get phone calls, collect enquiry forms, showcase a portfolio — before asking anyone for a quote. A clear brief gets you a more accurate number and prevents scope creep later.</p>
          </section>

          <section class="att-blog-section" id="red-flags">
            <div class="att-blog-section-num" aria-hidden="true">09</div>
            <h2 class="att-blog-section-title">Red Flags to Avoid</h2>
            <ul class="att-blog-list">
              <li>Quotes with no breakdown — a serious studio can tell you what you're paying for</li>
              <li>No mention of who owns the final files or code</li>
              <li>Vague timelines with no milestones</li>
              <li>Pressure to decide immediately, especially paired with a steep "limited time" discount</li>
            </ul>
          </section>

          <section class="att-blog-section" id="faq">
            <div class="att-blog-section-num" aria-hidden="true">10</div>
            <h2 class="att-blog-section-title">Frequently Asked Questions</h2>

            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Is a ₹5,000 website actually worth it?</h3>
              <p>For a true one-page brochure with no ongoing changes, sometimes. But most businesses outgrow it within a year and end up paying twice — once for the cheap site, once to redo it properly.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">How long does a small business website take to build?</h3>
              <p>A single landing page typically takes 1 to 2 weeks. A multi-page business website with custom design usually takes 3 to 6 weeks, depending on content readiness and revision rounds.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Do I need to pay every month for my website?</h3>
              <p>Hosting and a domain are small recurring costs, usually a few thousand rupees a year. Beyond that, ongoing payments should only apply if you want continued design updates, SEO work, or a managed platform.</p>
            </div>
          </section>

        </article>
      </div>
    </div>

    <!-- CTA strip -->
    <div class="att-blog-cta">
      <div class="att-blog-cta-inner">
        <div class="att-blog-cta-text">
          <p class="att-blog-cta-title">Not sure what your website should cost?</p>
          <p class="att-blog-cta-sub">Get a free audit and a straight-up quote — no vague ranges, no pressure.</p>
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