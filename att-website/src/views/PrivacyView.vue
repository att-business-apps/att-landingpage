<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.from(".att-legal-hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.6, ease: "power3.out", delay: 0.1 });
  gsap.from(".att-legal-title", { autoAlpha: 0, y: 28, duration: 0.75, ease: "power3.out", delay: 0.2 });
  gsap.from(".att-legal-meta", { autoAlpha: 0, y: 14, duration: 0.6, ease: "power2.out", delay: 0.35 });

  gsap.utils.toArray(".att-legal-section").forEach((section) => {
    gsap.from(section, {
      autoAlpha: 0, y: 24, duration: 0.65, ease: "power2.out",
      immediateRender: false,
      scrollTrigger: { trigger: section, start: "top 88%", once: true },
    });
  });
});
</script>

<template>
  <main class="att-legal-page">

    <!-- Hero strip -->
    <div class="breadcrum-area breadcrumb-banner">
      <div class="att-legal-hero">
        <div class="att-legal-hero-grid" aria-hidden="true"></div>
        <div class="att-legal-hero-glow" aria-hidden="true"></div>
        <div class="att-legal-hero-inner">
          <div class="att-legal-hero-eyebrow">
            <span class="att-legal-hero-dot" aria-hidden="true"></span>
            Legal Document
          </div>
          <h1 class="att-legal-title">Privacy <span class="att-legal-title-accent">Policy</span></h1>
          <div class="att-legal-meta">
            <span>Effective: <strong>May 2, 2024</strong></span>
            <span class="att-legal-meta-sep" aria-hidden="true">·</span>
            <span>Last updated: <strong>July 20, 2026</strong></span>
            <span class="att-legal-meta-sep" aria-hidden="true">·</span>
            <a href="mailto:hi@amortree.com" class="att-legal-meta-link">hi@amortree.com</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="att-legal-body">
      <div class="att-legal-layout">

        <!-- TOC sidebar -->
        <nav class="att-legal-toc" aria-label="Document sections">
          <div class="att-legal-toc-label">On this page</div>
          <a href="#scope" class="att-legal-toc-item">Who this applies to</a>
          <a href="#data-collected" class="att-legal-toc-item">What we collect</a>
          <a href="#how-used" class="att-legal-toc-item">How we use it</a>
          <a href="#sharing" class="att-legal-toc-item">Who we share it with</a>
          <a href="#cookies" class="att-legal-toc-item">Cookies</a>
          <a href="#retention" class="att-legal-toc-item">How long we keep it</a>
          <a href="#rights" class="att-legal-toc-item">Your rights</a>
          <a href="#security" class="att-legal-toc-item">Security</a>
          <a href="#children" class="att-legal-toc-item">Children</a>
          <a href="#changes" class="att-legal-toc-item">Policy changes</a>
          <a href="#contact-privacy" class="att-legal-toc-item">Contact us</a>
        </nav>

        <!-- Main content -->
        <div class="att-legal-content">

          <div class="att-legal-intro att-legal-section pt-0">
            <p>Amortree Tech ("we," "us," or "our") is a digital growth agency based in Bengaluru, Karnataka, India. This Privacy Policy explains what personal data we collect when you visit <strong>amortree.com</strong> or engage with our services, why we collect it, and the choices you have about it.</p>
            <p>By using our website or services, you agree to the practices described here. If you do not agree, please discontinue use of our site.</p>
          </div>

          <section class="att-legal-section" id="scope">
            <div class="att-legal-section-num" aria-hidden="true">01</div>
            <h2 class="att-legal-section-title">Who This Applies To</h2>
            <p>This policy applies to all visitors to our website, prospective clients who submit enquiry forms, current and past clients who share information with us in the course of an engagement, and any individual who contacts us by email, WhatsApp, or any other channel.</p>
          </section>

          <section class="att-legal-section" id="data-collected">
            <div class="att-legal-section-num" aria-hidden="true">02</div>
            <h2 class="att-legal-section-title">What We Collect</h2>
            <p>We collect only what we actually need to serve you well.</p>
            <div class="att-legal-table-wrap">
              <table class="att-legal-table">
                <thead>
                  <tr><th>Category</th><th>Examples</th><th>How collected</th></tr>
                </thead>
                <tbody>
                  <tr><td>Identity &amp; contact</td><td>Name, email address, phone number</td><td>Contact forms, email, WhatsApp</td></tr>
                  <tr><td>Business information</td><td>Company name, website URL, industry, project brief</td><td>Strategy call, email, forms</td></tr>
                  <tr><td>Usage data</td><td>Pages visited, time on site, browser type, referring URL</td><td>Google Analytics, cookies</td></tr>
                  <tr><td>Technical data</td><td>IP address, device type, operating system</td><td>Server logs, analytics</td></tr>
                  <tr><td>Communications</td><td>Emails, messages, call notes</td><td>Direct communication</td></tr>
                </tbody>
              </table>
            </div>
            <p>We do not collect sensitive personal data (health information, financial account details, government IDs) unless you voluntarily share it and it is strictly necessary for a project.</p>
          </section>

          <section class="att-legal-section" id="how-used">
            <div class="att-legal-section-num" aria-hidden="true">03</div>
            <h2 class="att-legal-section-title">How We Use It</h2>
            <ul class="att-legal-list">
              <li>To respond to enquiries and book strategy calls</li>
              <li>To scope, plan, and deliver the services you have engaged us for</li>
              <li>To send project updates, invoices, and delivery materials</li>
              <li>To improve our website, service quality, and client communication</li>
              <li>To fulfil legal and contractual obligations</li>
              <li>To send occasional updates about our work — only where you have given consent, and you can unsubscribe at any time</li>
            </ul>
            <p>We do not use your data for automated decision-making or profiling that produces legal or similarly significant effects.</p>
          </section>

          <section class="att-legal-section" id="sharing">
            <div class="att-legal-section-num" aria-hidden="true">04</div>
            <h2 class="att-legal-section-title">Who We Share It With</h2>
            <p>We do not sell, rent, or trade your personal data. We share information only where necessary:</p>
            <ul class="att-legal-list">
              <li><strong>Service providers</strong> — tools we use to run the business (Google Workspace, EmailJS, project management tools). Each provider is bound by its own privacy policy and our data processing agreements.</li>
              <li><strong>Analytics providers</strong> — Google Analytics, used in anonymised form to understand site performance.</li>
              <li><strong>Legal or regulatory authorities</strong> — only where required by applicable law.</li>
            </ul>
            <p>All third-party tools we use are listed below in the Cookies section.</p>
          </section>

          <section class="att-legal-section" id="cookies">
            <div class="att-legal-section-num" aria-hidden="true">05</div>
            <h2 class="att-legal-section-title">Cookies</h2>
            <p>We use a small number of cookies to keep our site functional and understand how visitors use it.</p>
            <div class="att-legal-table-wrap">
              <table class="att-legal-table">
                <thead>
                  <tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  <tr><td>_ga, _gid</td><td>Google Analytics — page views and session tracking</td><td>Up to 2 years</td></tr>
                  <tr><td>_gcl_au</td><td>Google Ads conversion tracking</td><td>90 days</td></tr>
                  <tr><td>GTM-*</td><td>Google Tag Manager — loads other tags</td><td>Session</td></tr>
                </tbody>
              </table>
            </div>
            <p>You can disable cookies in your browser settings at any time. Note that some site features may not work correctly without them.</p>
          </section>

          <section class="att-legal-section" id="retention">
            <div class="att-legal-section-num" aria-hidden="true">06</div>
            <h2 class="att-legal-section-title">How Long We Keep It</h2>
            <ul class="att-legal-list">
              <li><strong>Enquiry and pre-sales data</strong> — retained for 12 months after last contact, then deleted.</li>
              <li><strong>Client project data</strong> — retained for 3 years after project completion for contractual and warranty purposes, then deleted or anonymised.</li>
              <li><strong>Financial records</strong> — retained for 7 years as required by Indian tax law (GST Act).</li>
              <li><strong>Analytics data</strong> — aggregated and anonymised; no identifiable retention limit.</li>
            </ul>
          </section>

          <section class="att-legal-section" id="rights">
            <div class="att-legal-section-num" aria-hidden="true">07</div>
            <h2 class="att-legal-section-title">Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul class="att-legal-list">
              <li><strong>Access</strong> a copy of the personal data we hold about you</li>
              <li><strong>Correct</strong> any inaccurate or incomplete data</li>
              <li><strong>Delete</strong> your data (subject to our legal retention obligations)</li>
              <li><strong>Object</strong> to how we process your data for marketing purposes</li>
              <li><strong>Withdraw consent</strong> where processing is based on consent</li>
              <li><strong>Port</strong> your data to another service in a machine-readable format</li>
            </ul>
            <p>To exercise any of these rights, email us at <a href="mailto:hi@amortree.com" class="att-legal-inline-link">hi@amortree.com</a>. We will respond within 30 days.</p>
          </section>

          <section class="att-legal-section" id="security">
            <div class="att-legal-section-num" aria-hidden="true">08</div>
            <h2 class="att-legal-section-title">Security</h2>
            <p>We take reasonable technical and organisational measures to protect your data — including HTTPS encryption, access controls, and secure cloud storage. No method of transmission over the internet is completely secure, but we continuously review our practices.</p>
            <p>If you believe a security incident has occurred, email <a href="mailto:hi@amortree.com" class="att-legal-inline-link">hi@amortree.com</a> immediately.</p>
          </section>

          <section class="att-legal-section" id="children">
            <div class="att-legal-section-num" aria-hidden="true">09</div>
            <h2 class="att-legal-section-title">Children</h2>
            <p>Our website and services are not directed at individuals under the age of 18. We do not knowingly collect data from children. If you believe a child has submitted data to us, please contact us and we will delete it promptly.</p>
          </section>

          <section class="att-legal-section" id="changes">
            <div class="att-legal-section-num" aria-hidden="true">10</div>
            <h2 class="att-legal-section-title">Policy Changes</h2>
            <p>We may update this policy from time to time. When we do, we update the "Last updated" date at the top and post the revised version here. Significant changes will be communicated directly to active clients. Continued use of our site after any change constitutes your acceptance of the updated policy.</p>
          </section>

          <section class="att-legal-section" id="contact-privacy">
            <div class="att-legal-section-num" aria-hidden="true">11</div>
            <h2 class="att-legal-section-title">Contact Us</h2>
            <p>For any questions, requests, or concerns about this policy or how we handle your data:</p>
            <div class="att-legal-contact-card">
              <div class="att-legal-contact-logo">
                <img src="../assets/img/att-icon-light.svg" alt="Amortree Tech" />
              </div>
              <div class="att-legal-contact-details">
                <strong>Amortree Tech</strong>
                <span>Bengaluru, Karnataka, India</span>
                <a href="mailto:hi@amortree.com">hi@amortree.com</a>
                <a href="https://wa.me/917975859061">+91 79758 59061</a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>

    <!-- CTA strip -->
    <div class="att-legal-cta">
      <p>Have a question about your data?</p>
      <a href="mailto:hi@amortree.com" class="att-legal-cta-btn">
        Email us directly
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>

  </main>
</template>

<style lang="scss" scoped>
// ── Page shell ────────────────────────────────────────────────────────────────
.att-legal-page {
  background: #f8fafc;
  min-height: 100vh;
  font-family: var(--font-body, Inter, system-ui, sans-serif);
}

// ── Hero strip ────────────────────────────────────────────────────────────────
.breadcrum-area {
  padding-top: 10vh;
  background-color: #06060a;
}
.att-legal-hero {
  position: relative;
  overflow: hidden;
  padding: 9rem 4rem 5rem;
  isolation: isolate;

  @media (max-width: 768px) { padding: 7rem 1.5rem 4rem; }
}

.att-legal-hero-grid {
  position: absolute; inset: 0; z-index: 0;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.5) 80%, transparent 100%);
  pointer-events: none;
}

.att-legal-hero-glow {
  position: absolute; bottom: -100px; left: -100px;
  width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(250,204,21,0.07) 0%, transparent 65%);
  filter: blur(60px); z-index: 0; pointer-events: none;
}

.att-legal-hero-inner {
  position: relative; z-index: 1;
  max-width: 1024px; margin: 0 auto;
}

.att-legal-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em;
  text-transform: uppercase; color: #facc15;
  border: 1px solid rgba(250,204,21,0.22);
  background: rgba(250,204,21,0.06);
  padding: 0.4rem 0.9rem; border-radius: 999px;
  margin-bottom: 1.5rem;
  will-change: transform, opacity;
}

.att-legal-hero-dot {
  width: 5px; height: 5px; border-radius: 50%; background: #facc15; flex-shrink: 0;
  animation: att-pulse 2s ease-in-out infinite;
}
@keyframes att-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
}

.att-legal-title {
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 800; line-height: 0.95; letter-spacing: -0.03em;
  color: #f8fafc; margin: 0 0 1.5rem;
  will-change: transform, opacity;
}

.att-legal-title-accent {
  color: transparent;
  -webkit-text-stroke: 2px rgba(250,204,21,0.7);
}

.att-legal-meta {
  display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
  font-size: 0.8rem; color: #475569;
  will-change: transform, opacity;

  strong { color: #94a3b8; font-weight: 600; }
}

.att-legal-meta-sep { color: #1e293b; }

.att-legal-meta-link {
  color: #facc15; text-decoration: none; font-weight: 600;
  transition: color 0.2s;
  &:hover { color: #f0b429; }
}

// ── Body layout ───────────────────────────────────────────────────────────────
.att-legal-body {
  max-width: 1200px; margin: 0 auto;
  padding: 5rem 4rem;

  @media (max-width: 1024px) { padding: 4rem 2rem; }
  @media (max-width: 768px)  { padding: 2.5rem 1.25rem; }
}

.att-legal-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 2.5rem; }
}

// ── TOC sidebar ───────────────────────────────────────────────────────────────
.att-legal-toc {
  position: sticky;
  top: calc(var(--header-height, 96px) + 24px);
  display: flex; flex-direction: column; gap: 0.15rem;

  @media (max-width: 1024px) {
    position: static;
    display: flex; flex-direction: row; flex-wrap: wrap; gap: 0.5rem;
    border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 1rem;
  }
}

.att-legal-toc-label {
  font-size: 0.6rem; font-weight: 900; letter-spacing: 0.2em;
  text-transform: uppercase; color: #94a3b8;
  padding: 0 0.75rem; margin-bottom: 0.75rem;

  @media (max-width: 1024px) { width: 100%; }
}

.att-legal-toc-item {
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
.att-legal-content {
  display: flex; flex-direction: column; gap: 0;
}

.att-legal-intro {
  background: #fff; border-radius: 1rem;
  padding: 2rem 2.25rem; margin-bottom: 1rem;

  p { font-size: 0.95rem; line-height: 1.75; color: #475569; margin: 0 0 0.75rem;
    &:last-child { margin: 0; } }
  strong { color: #0f172a; }
}

.att-legal-section {
  scroll-margin-top: 120px; // add this line
  position: relative;
  padding: 2.5rem 0;
  border-top: 1px solid #e2e8f0;
  will-change: transform, opacity;

  &:first-of-type { border-top: none; }
  &:last-of-type { padding-bottom: 0; }
}

.att-legal-section-num {
  font-size: 0.62rem; font-weight: 900; letter-spacing: 0.22em;
  text-transform: uppercase; color: #facc15;
  margin-bottom: 0.5rem;
}

.att-legal-section-title {
  font-size: 1.5rem; font-weight: 700; color: #0f172a;
  letter-spacing: -0.01em; margin: 0 0 1.1rem; line-height: 1.25;
}

.att-legal-content p {
  font-size: 0.92rem; line-height: 1.8; color: #475569;
  margin: 0 0 0.85rem; max-width: 68ch;

  strong { color: #1e293b; font-weight: 600; }
}

.att-legal-list {
  padding: 0; margin: 0 0 0.85rem;
  list-style: none;
  display: flex; flex-direction: column; gap: 0.5rem;

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
.att-legal-table-wrap {
  overflow-x: auto; margin: 0.5rem 0 1rem;
  border: 1px solid #e2e8f0; border-radius: 0.75rem;
}

.att-legal-table {
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

.att-legal-inline-link {
  color: #facc15; text-decoration: none; font-weight: 600;
  border-bottom: 1px solid rgba(250,204,21,0.35);
  transition: border-color 0.2s, color 0.2s;
  &:hover { color: #f0b429; border-color: #f0b429; }
}

// Contact card
.att-legal-contact-card {
  display: flex; align-items: flex-start; gap: 1.25rem;
  background: #0f172a; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 1rem; padding: 1.5rem 1.75rem; margin-top: 1rem;
  width: fit-content; max-width: 100%;

  @media (max-width: 480px) { flex-direction: column; }
}

.att-legal-contact-logo {
  img { height: 90px; width: auto; }
}

.att-legal-contact-details {
  display: flex; flex-direction: column; gap: 0.25rem;

  strong { font-size: 0.88rem; font-weight: 700; color: #f8fafc; }
  span   { font-size: 0.78rem; color: #64748b; }
  a {
    font-size: 0.82rem; color: #facc15; text-decoration: none; font-weight: 600;
    transition: color 0.2s;
    &:hover { color: #f0b429; }
  }
}

// ── CTA strip ─────────────────────────────────────────────────────────────────
.att-legal-cta {
  background: #0f172a;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 2.5rem 4rem;
  display: flex; align-items: center; justify-content: center; gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 640px) { padding: 2rem 1.25rem; flex-direction: column; text-align: center; gap: 1rem; }

  p { font-size: 0.9rem; color: #64748b; margin: 0; }
}

.att-legal-cta-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: #facc15; color: #0f172a;
  font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em;
  padding: 0.65rem 1.35rem; border-radius: 999px;
  text-decoration: none; transition: background 0.2s, box-shadow 0.2s, transform 0.2s;

  &:hover {
    background: #f0b429;
    box-shadow: 0 8px 24px rgba(250,204,21,0.3);
    transform: translateY(-1px);
  }
}
</style>