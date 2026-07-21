<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


onMounted(() => {
    document.title = "12 Questions to Ask Before You Hire a Web Designer | Amortree";

    const description = document.querySelector('meta[name="description"]');

    if (description) {
        description.setAttribute(
            "content",
            "The right questions upfront save you from vague quotes, missed deadlines, and a site you don't actually own. Here are 12 to ask before you sign."
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

    // Animate the "questions asked" chart bars once in view
    gsap.utils.toArray(".att-chart-segment").forEach((seg) => {
        gsap.from(seg, {
            scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: seg, start: "top 90%", once: true },
        });
    });

    // Animate the hiring-conversation timeline nodes
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
                    Pricing
                </div>
                <h1 class="att-blog-title">12 Questions to Ask Before You Hire a <span class="att-blog-title-accent">Web Designer</span></h1>
                <p class="att-blog-dek">The right questions upfront save you from vague quotes, missed deadlines, and a site you don't actually own. Ask these before you sign anything.</p>
                <div class="att-blog-meta">
                    <span>Amortree Tech</span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>Published <strong>Jan 3, 2026</strong></span>
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
          <a href="#why-ask" class="att-blog-toc-item">Why these questions matter</a>
          <a href="#process" class="att-blog-toc-item">Process &amp; timeline</a>
          <a href="#ownership" class="att-blog-toc-item">Ownership &amp; rights</a>
          <a href="#cost" class="att-blog-toc-item">Cost &amp; payment</a>
          <a href="#support" class="att-blog-toc-item">Support &amp; maintenance</a>
          <a href="#red-flags" class="att-blog-toc-item">Answers that should worry you</a>
          <a href="#the-call" class="att-blog-toc-item">Running the conversation</a>
          <a href="#checklist" class="att-blog-toc-item">Quick reference checklist</a>
          <a href="#faq" class="att-blog-toc-item">FAQ</a>
        </nav>

        <!-- Main content -->
        <article class="att-blog-content">

          <div class="att-blog-intro att-blog-section">
            <p>Most bad website projects don't go wrong because of a bad designer — they go wrong because of questions that never got asked. A vague scope, an unclear ownership clause, or a payment schedule that front-loads all the risk onto you can turn a straightforward project into a months-long headache.</p>
            <p>Below are 12 questions worth asking before you hand anyone a deposit, grouped into the four areas that actually determine whether a project goes smoothly.</p>
          </div>

          <section class="att-blog-section" id="why-ask">
            <div class="att-blog-section-num" aria-hidden="true">01</div>
            <h2 class="att-blog-section-title">Why These Questions Matter</h2>
            <p>A quote is just a number until you know what's actually included. Two designers can give you the exact same price for very different scopes of work — one might include three rounds of revisions and full source files, the other might include one round and a platform you can never leave.</p>
            <p>Asking these questions isn't about being difficult. A designer who's run projects professionally will have clear, confident answers ready. Hesitation or vagueness on any of these is itself useful information.</p>
          </section>

          <section class="att-blog-section" id="process">
            <div class="att-blog-section-num" aria-hidden="true">02</div>
            <h2 class="att-blog-section-title">Process &amp; Timeline</h2>
            <ul class="att-blog-list">
              <li><strong>1. What does your process look like, start to finish?</strong> — a clear answer usually includes discovery, wireframes, design, development, and QA as distinct stages.</li>
              <li><strong>2. What's the realistic timeline, and what could delay it?</strong> — good designers will flag that late content or slow feedback from you is the most common cause of delays, not just their own workload.</li>
              <li><strong>3. How many revision rounds are included, and what happens beyond that?</strong> — unlimited revisions sounds generous but often signals a vague scope; two to three defined rounds is a healthier structure for both sides.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="ownership">
            <div class="att-blog-section-num" aria-hidden="true">03</div>
            <h2 class="att-blog-section-title">Ownership &amp; Rights</h2>
            <ul class="att-blog-list">
              <li><strong>4. Do I own the final files and code outright?</strong> — you should be able to walk away with everything, even if you never work with this person again.</li>
              <li><strong>5. Is the site built on a platform I control, or one that locks me to you?</strong> — a site built on a proprietary builder can mean every future change has to go through the original designer.</li>
              <li><strong>6. Who registers the domain and hosting, and whose name is it under?</strong> — always insist these are registered in your name, not the agency's, even if they manage it for you.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="cost">
            <div class="att-blog-section-num" aria-hidden="true">04</div>
            <h2 class="att-blog-section-title">Cost &amp; Payment</h2>
            <ul class="att-blog-list">
              <li><strong>7. What exactly is included in this price?</strong> — ask for a written breakdown, not just a total figure.</li>
              <li><strong>8. What's not included, and what would trigger an extra charge?</strong> — copywriting, stock photography, and extra pages are common add-ons that surprise people later.</li>
              <li><strong>9. What's the payment schedule?</strong> — a healthy structure splits payment across milestones (deposit, midpoint, delivery) rather than 100% upfront.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="support">
            <div class="att-blog-section-num" aria-hidden="true">05</div>
            <h2 class="att-blog-section-title">Support &amp; Maintenance</h2>
            <ul class="att-blog-list">
              <li><strong>10. What happens after launch if something breaks?</strong> — clarify whether a short post-launch support window is included, and what it costs after that.</li>
              <li><strong>11. Can I make small edits myself, or do I need to come back to you every time?</strong> — for many businesses, a site they can lightly self-edit is worth more than one that looks marginally sharper but requires a developer for every text change.</li>
              <li><strong>12. Do you offer ongoing plans for updates, SEO, or new pages?</strong> — not something you need to commit to now, but worth knowing if it's an option later.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="red-flags">
            <div class="att-blog-section-num" aria-hidden="true">06</div>
            <h2 class="att-blog-section-title">Answers That Should Worry You</h2>
            <p>Some answers are worse than others. Here's what a weak answer to each category tends to sound like — and what a stronger answer looks like instead:</p>
            <div class="att-blog-table-wrap">
              <table class="att-blog-table">
                <thead>
                  <tr><th>Question area</th><th>Weak answer</th><th>Strong answer</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Process</td>
                    <td>"We just get started and figure it out"</td>
                    <td>A named sequence of stages with rough durations for each</td>
                  </tr>
                  <tr>
                    <td>Ownership</td>
                    <td>"You'll always have access through us"</td>
                    <td>"You'll own the files/code outright, no matter what"</td>
                  </tr>
                  <tr>
                    <td>Cost</td>
                    <td>A single number with no breakdown</td>
                    <td>A line-itemed quote showing what each part covers</td>
                  </tr>
                  <tr>
                    <td>Payment</td>
                    <td>Full amount required upfront</td>
                    <td>Split across two or three milestones</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="att-blog-section" id="the-call">
            <div class="att-blog-section-num" aria-hidden="true">07</div>
            <h2 class="att-blog-section-title">Running the Conversation</h2>
            <p>You don't need to interrogate anyone — spreading these questions naturally across a first call or email thread works better than reading off a checklist:</p>

            <div class="att-timeline">
              <div class="att-timeline-track" aria-hidden="true"></div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">1</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Before the call</div>
                  <div class="att-timeline-days">Prep</div>
                  <p>Write down what the site needs to do — bookings, enquiries, credibility — so your questions have context.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">2</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">During the call</div>
                  <div class="att-timeline-days">Ask &amp; listen</div>
                  <p>Lead with process and timeline questions first — they're the easiest to ask naturally and reveal a lot about how organized the designer is.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">3</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Get it in writing</div>
                  <div class="att-timeline-days">After the call</div>
                  <p>Ask for the answers on ownership, cost, and payment to be reflected in the proposal or contract, not just said out loud.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">4</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Before you sign</div>
                  <div class="att-timeline-days">Final check</div>
                  <p>Re-read the scope, payment schedule, and ownership clause one more time — this is the cheapest moment to catch a problem.</p>
                </div>
              </div>
            </div>
          </section>

          <section class="att-blog-section" id="checklist">
            <div class="att-blog-section-num" aria-hidden="true">08</div>
            <h2 class="att-blog-section-title">Quick Reference Checklist</h2>
            <p>Save this list for your next call or email thread:</p>
            <ul class="att-blog-list">
              <li>What does your process look like, start to finish?</li>
              <li>What's the realistic timeline, and what could delay it?</li>
              <li>How many revision rounds are included?</li>
              <li>Do I own the final files and code outright?</li>
              <li>Is the site built on a platform I control?</li>
              <li>Who registers the domain and hosting, in whose name?</li>
              <li>What exactly is included in this price?</li>
              <li>What's not included, and what triggers extra charges?</li>
              <li>What's the payment schedule?</li>
              <li>What happens after launch if something breaks?</li>
              <li>Can I make small edits myself?</li>
              <li>Do you offer ongoing plans for updates or SEO?</li>
            </ul>
          </section>

          <section class="att-blog-section" id="faq">
            <div class="att-blog-section-num" aria-hidden="true">09</div>
            <h2 class="att-blog-section-title">Frequently Asked Questions</h2>

            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Is it rude to ask about ownership and contracts upfront?</h3>
              <p>No — any designer running a real business expects these questions and will have straightforward answers. Hesitation here is more telling than the question itself.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">What if a designer refuses to put answers in writing?</h3>
              <p>Treat that as a clear signal to keep looking. A written proposal or contract protects both sides, and a professional will want that clarity as much as you do.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Should I ask all 12 questions on the first call?</h3>
              <p>Not necessarily. Process and cost questions usually come up naturally on a first call; ownership and support details are often better confirmed in writing once you're seriously considering the project.</p>
            </div>
          </section>

        </article>
      </div>
    </div>

    <!-- CTA strip -->
    <div class="att-blog-cta">
      <div class="att-blog-cta-inner">
        <div class="att-blog-cta-text">
          <p class="att-blog-cta-title">Want a straight answer to all 12?</p>
          <p class="att-blog-cta-sub">Get a free audit and a clear, written quote — no vague ranges, no pressure.</p>
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

// ── Chart card (kept for structural consistency across blog pages) ─────────
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

// ── Info cards ───────────────────────────────────────────────────────────────
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

// ── Hiring-conversation timeline ────────────────────────────────────────────
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