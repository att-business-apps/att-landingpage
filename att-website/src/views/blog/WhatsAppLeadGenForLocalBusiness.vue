<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


onMounted(() => {
    document.title = "Turning WhatsApp Into Your Best Lead Gen Channel | Amortree";

    const description = document.querySelector('meta[name="description"]');

    if (description) {
        description.setAttribute(
            "content",
            "For local and service businesses in India, a WhatsApp-first contact flow often outperforms a traditional contact form. Here's how to set it up right."
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

    // Animate the response-time chart bars once in view
    gsap.utils.toArray(".att-chart-segment").forEach((seg) => {
        gsap.from(seg, {
            scaleY: 0, transformOrigin: "bottom center", duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: seg, start: "top 90%", once: true },
        });
    });

    // Animate the contact-flow timeline nodes
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
                    Growth
                </div>
                <h1 class="att-blog-title">Turning <span class="att-blog-title-accent">WhatsApp</span> Into Your Best Lead Gen Channel</h1>
                <p class="att-blog-dek">For local and service businesses in India, a WhatsApp-first contact flow often outperforms a traditional contact form. Here's how to set it up right — from your business profile to the messages that actually convert.</p>
                <div class="att-blog-meta">
                    <span>Amortree Tech</span>
                    <span class="att-blog-meta-sep" aria-hidden="true">·</span>
                    <span>Published <strong>Feb 22, 2026</strong></span>
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
          <a href="#why-whatsapp" class="att-blog-toc-item">Why WhatsApp wins</a>
          <a href="#whatsapp-vs-forms" class="att-blog-toc-item">WhatsApp vs. contact forms</a>
          <a href="#building-blocks" class="att-blog-toc-item">Building blocks of a funnel</a>
          <a href="#setup" class="att-blog-toc-item">Setting up your profile</a>
          <a href="#flow" class="att-blog-toc-item">Designing the contact flow</a>
          <a href="#response-time" class="att-blog-toc-item">Why response time is everything</a>
          <a href="#templates" class="att-blog-toc-item">Message templates that convert</a>
          <a href="#mistakes" class="att-blog-toc-item">Common mistakes</a>
          <a href="#tools" class="att-blog-toc-item">Tools worth using</a>
          <a href="#faq" class="att-blog-toc-item">FAQ</a>
        </nav>

        <!-- Main content -->
        <article class="att-blog-content">

          <div class="att-blog-intro att-blog-section">
            <p>Most small business websites still lead with a contact form — name, email, message, submit, wait. For a shopper in India who already has WhatsApp open on their phone, that's friction they don't need to accept. A single tap into a chat feels faster, more personal, and far less likely to get abandoned halfway through.</p>
            <p>This guide walks through how to turn WhatsApp from an afterthought into the primary way people reach you — and how to structure that flow so it actually produces leads instead of just messages.</p>
          </div>

          <section class="att-blog-section" id="why-whatsapp">
            <div class="att-blog-section-num" aria-hidden="true">01</div>
            <h2 class="att-blog-section-title">Why WhatsApp Wins for Local Businesses</h2>
            <p>WhatsApp is already the default messaging app for the vast majority of smartphone users in India. That single fact changes the math on lead generation:</p>
            <ul class="att-blog-list">
              <li><strong>Zero new habit required</strong> — people don't need to learn a new tool or check a new inbox; they're already in the app multiple times a day.</li>
              <li><strong>Lower commitment to start a conversation</strong> — typing "Hi, is this available?" feels lighter than filling out a form with four required fields.</li>
              <li><strong>Two-way and real-time</strong> — you can ask a clarifying question back immediately instead of waiting for an email reply the next day.</li>
              <li><strong>Trust signals built in</strong> — a business profile with a photo, hours, and a catalog reads as more legitimate than an anonymous form submission.</li>
            </ul>
            <p>For local and service businesses in particular — clinics, salons, contractors, boutique studios — the sale often depends on a quick back-and-forth. WhatsApp is built for exactly that.</p>
          </section>

          <section class="att-blog-section" id="whatsapp-vs-forms">
            <div class="att-blog-section-num" aria-hidden="true">02</div>
            <h2 class="att-blog-section-title">WhatsApp vs. a Traditional Contact Form</h2>
            <p>Neither channel is universally better — but for most local and service businesses, the trade-offs favor WhatsApp:</p>
            <div class="att-blog-table-wrap">
              <table class="att-blog-table">
                <thead>
                  <tr><th>Factor</th><th>Contact form</th><th>WhatsApp</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Time to first response</td>
                    <td>Hours to days</td>
                    <td>Minutes, if staffed well</td>
                  </tr>
                  <tr>
                    <td>Abandonment risk</td>
                    <td>High — multiple fields, no immediate feedback</td>
                    <td>Low — one tap opens a familiar chat window</td>
                  </tr>
                  <tr>
                    <td>Follow-up questions</td>
                    <td>Requires a new email thread</td>
                    <td>Native to the conversation</td>
                  </tr>
                  <tr>
                    <td>Trust before contact</td>
                    <td>Depends entirely on site design</td>
                    <td>Business profile, photo, and reviews visible upfront</td>
                  </tr>
                  <tr>
                    <td>Best for</td>
                    <td>Detailed briefs, B2B enquiries, documentation</td>
                    <td>Quick questions, bookings, quotes, local services</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>The strongest setups don't choose one or the other — they lead with a WhatsApp click-to-chat button and keep a short form as a backup for people who prefer it.</p>
          </section>

          <section class="att-blog-section" id="building-blocks">
            <div class="att-blog-section-num" aria-hidden="true">03</div>
            <h2 class="att-blog-section-title">The Building Blocks of a WhatsApp Funnel</h2>
            <p>A WhatsApp lead flow that actually converts is made up of three parts working together:</p>
            <div class="att-info-grid">
              <div class="att-info-card">
                <div class="att-info-card-label">Instant reply</div>
                <p>An automated greeting that fires the moment someone messages, confirming you've received it and setting expectations for a human response.</p>
              </div>
              <div class="att-info-card">
                <div class="att-info-card-label">Qualifying question</div>
                <p>One short question that tells you what the person needs — service type, location, or timeline — so the human reply that follows is useful, not generic.</p>
              </div>
              <div class="att-info-card">
                <div class="att-info-card-label">Human handoff</div>
                <p>A real person picks up the thread quickly. Automation should open the door, not try to close the sale on its own.</p>
              </div>
            </div>
          </section>

          <section class="att-blog-section" id="setup">
            <div class="att-blog-section-num" aria-hidden="true">04</div>
            <h2 class="att-blog-section-title">Setting Up Your WhatsApp Business Profile</h2>
            <p>Before you put a chat link anywhere on your site, get the profile itself in order:</p>
            <ul class="att-blog-list">
              <li><strong>Switch to WhatsApp Business</strong> — it's free, and unlocks a proper profile, catalog, and automated messages that the personal app doesn't support.</li>
              <li><strong>Fill in business hours, address, and category</strong> — this is often the first thing a prospective customer checks before messaging.</li>
              <li><strong>Add a catalog</strong> — even a simple one with 5–10 items or services gives people something to browse before they ask a question.</li>
              <li><strong>Use a recognizable display photo</strong> — your logo or storefront, not a placeholder — since this is what builds trust before the first reply.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="flow">
            <div class="att-blog-section-num" aria-hidden="true">05</div>
            <h2 class="att-blog-section-title">Designing the Contact Flow</h2>
            <p>A well-designed flow guides someone from "curious visitor" to "qualified lead" in as few steps as possible:</p>

            <div class="att-timeline">
              <div class="att-timeline-track" aria-hidden="true"></div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">1</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Click-to-chat link</div>
                  <div class="att-timeline-days">On every page</div>
                  <p>A visible WhatsApp button in the header, hero, and footer — not buried in a "Contact" page three clicks deep.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">2</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Pre-filled message</div>
                  <div class="att-timeline-days">Instant</div>
                  <p>The link opens with a short pre-written message like "Hi, I'd like to know more about [service]" so the person doesn't face a blank text box.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">3</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Auto-greeting &amp; question</div>
                  <div class="att-timeline-days">Seconds</div>
                  <p>An automated reply confirms receipt and asks one qualifying question to understand what they need.</p>
                </div>
              </div>

              <div class="att-timeline-node">
                <div class="att-timeline-dot">4</div>
                <div class="att-timeline-body">
                  <div class="att-timeline-title">Human handoff</div>
                  <div class="att-timeline-days">Under 5 min</div>
                  <p>A team member takes over the conversation with context already in hand, ready to book, quote, or close.</p>
                </div>
              </div>
            </div>
          </section>

          <section class="att-blog-section" id="response-time">
            <div class="att-blog-section-num" aria-hidden="true">06</div>
            <h2 class="att-blog-section-title">Why Response Time Is Everything</h2>
            <p>The single biggest factor in whether a WhatsApp lead converts isn't the design of your profile — it's how quickly a real person replies:</p>

            <figure class="att-chart-card">
              <figcaption class="att-chart-title">Typical lead-to-conversation conversion by response time</figcaption>
              <svg class="att-chart-svg" viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart showing conversion rate drops sharply as response time increases: under 5 minutes 80 percent, 5 to 60 minutes 45 percent, 1 to 24 hours 20 percent, over 24 hours 8 percent">
                <g font-family="inherit">
                  <!-- Bars, baseline at y=170 -->
                  <rect class="att-chart-segment" x="30" y="10" width="110" height="160" rx="6" fill="#facc15"/>
                  <text x="38" y="30" font-size="12" font-weight="700" fill="#0f172a">80%</text>

                  <rect class="att-chart-segment" x="190" y="80" width="110" height="90" rx="6" fill="#0f172a"/>
                  <text x="200" y="98" font-size="12" font-weight="700" fill="#f8fafc">45%</text>

                  <rect class="att-chart-segment" x="350" y="130" width="110" height="40" rx="6" fill="#94a3b8"/>
                  <text x="360" y="148" font-size="12" font-weight="700" fill="#0f172a">20%</text>

                  <rect class="att-chart-segment" x="510" y="154" width="110" height="16" rx="4" fill="#e2e8f0"/>
                  <text x="518" y="150" font-size="12" font-weight="700" fill="#0f172a">8%</text>

                  <!-- Baseline -->
                  <line x1="20" y1="170" x2="630" y2="170" stroke="#e2e8f0" stroke-width="1"/>

                  <!-- Labels -->
                  <text x="30" y="188" font-size="11" font-weight="700" fill="#475569">Under 5 min</text>
                  <text x="190" y="188" font-size="11" font-weight="700" fill="#475569">5–60 min</text>
                  <text x="350" y="188" font-size="11" font-weight="700" fill="#475569">1–24 hours</text>
                  <text x="510" y="188" font-size="11" font-weight="700" fill="#475569">Over 24 hours</text>
                </g>
                <text x="0" y="212" font-size="12" fill="#64748b">Directional figures based on typical service-business response patterns —</text>
                <text x="0" y="228" font-size="12" fill="#64748b">the trend holds regardless of exact numbers: speed beats polish.</text>
              </svg>
            </figure>

            <p>This is why automation matters less for "sounding smart" and more for buying you time — a fast acknowledgment keeps the lead warm until a person can genuinely engage.</p>
          </section>

          <section class="att-blog-section" id="templates">
            <div class="att-blog-section-num" aria-hidden="true">07</div>
            <h2 class="att-blog-section-title">Message Templates That Convert</h2>
            <p>A few well-written templates remove the guesswork for whoever's replying, without making the conversation feel robotic:</p>
            <ul class="att-blog-list">
              <li><strong>Greeting message</strong> — confirms receipt, sets a response-time expectation, and asks one qualifying question in the same message.</li>
              <li><strong>Away message</strong> — used outside business hours, states when you'll reply and offers an alternative like a callback request.</li>
              <li><strong>Quick replies for common questions</strong> — pricing ranges, service areas, and availability, saved so staff aren't retyping the same answer all day.</li>
              <li><strong>Booking confirmation</strong> — a short, clear message once a slot or order is confirmed, reducing no-shows and follow-up questions.</li>
            </ul>
          </section>

          <section class="att-blog-section" id="mistakes">
            <div class="att-blog-section-num" aria-hidden="true">08</div>
            <h2 class="att-blog-section-title">Common Mistakes to Avoid</h2>
            <ul class="att-blog-list">
              <li>Using a personal WhatsApp number with no business profile, hours, or catalog</li>
              <li>Letting messages sit unanswered for hours during business hours</li>
              <li>Over-automating — a fully bot-driven conversation with no human handoff frustrates people who want a real answer</li>
              <li>Burying the WhatsApp link instead of placing it where the contact form used to live</li>
              <li>Not tracking which pages or campaigns actually drive chats, making it impossible to improve the flow over time</li>
            </ul>
          </section>

          <section class="att-blog-section" id="tools">
            <div class="att-blog-section-num" aria-hidden="true">09</div>
            <h2 class="att-blog-section-title">Tools Worth Using</h2>
            <div class="att-info-grid">
              <div class="att-info-card">
                <div class="att-info-card-label">WhatsApp Business App</div>
                <p>Free and sufficient for most single-location businesses — covers catalog, quick replies, and basic automated greetings.</p>
              </div>
              <div class="att-info-card">
                <div class="att-info-card-label">WhatsApp Business API tools</div>
                <p>Platforms like Interakt or WATI add team inboxes, broadcast messages, and chatbot flows once volume outgrows one phone.</p>
              </div>
              <div class="att-info-card">
                <div class="att-info-card-label">Click-to-chat widgets</div>
                <p>A floating chat button on your website that opens WhatsApp directly, with the pre-filled message already set up.</p>
              </div>
            </div>
          </section>

          <section class="att-blog-section" id="faq">
            <div class="att-blog-section-num" aria-hidden="true">10</div>
            <h2 class="att-blog-section-title">Frequently Asked Questions</h2>

            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Should I remove my contact form entirely?</h3>
              <p>No — keep a short form as a backup for people who prefer email or need to share detailed information. Just don't make it the primary path when WhatsApp converts better for most quick enquiries.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">Do I need the paid WhatsApp Business API?</h3>
              <p>Most single-location businesses do fine with the free WhatsApp Business app. The API makes sense once you have multiple staff replying, need broadcast messages, or want a proper chatbot flow.</p>
            </div>
            <div class="att-blog-faq-item">
              <h3 class="att-blog-faq-q">What if I can't respond quickly during the day?</h3>
              <p>An automated greeting with a clear response-time expectation ("we typically reply within 30 minutes") holds the lead's attention far better than silence — but it's a stopgap, not a substitute for a fast human reply.</p>
            </div>
          </section>

        </article>
      </div>
    </div>

    <!-- CTA strip -->
    <div class="att-blog-cta">
      <div class="att-blog-cta-inner">
        <div class="att-blog-cta-text">
          <p class="att-blog-cta-title">Want a WhatsApp-first site built right?</p>
          <p class="att-blog-cta-sub">Get a free audit of your current contact flow — no vague ranges, no pressure.</p>
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

// ── Response-time chart card ────────────────────────────────────────────────
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

// ── Building-block / tools info cards ───────────────────────────────────────
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

// ── Contact-flow timeline ───────────────────────────────────────────────────
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