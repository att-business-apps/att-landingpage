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
            <h1 class="att-legal-title">Terms <span class="att-legal-title-accent">of Use</span></h1>
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
          <a href="#about" class="att-legal-toc-item">About us</a>
          <a href="#acceptance" class="att-legal-toc-item">Acceptance of terms</a>
          <a href="#eligibility" class="att-legal-toc-item">Eligibility</a>
          <a href="#privacy" class="att-legal-toc-item">Privacy &amp; data protection</a>
          <a href="#fees" class="att-legal-toc-item">Fees</a>
          <a href="#limited-rights" class="att-legal-toc-item">Limited rights of use</a>
          <a href="#conduct" class="att-legal-toc-item">Your conduct</a>
          <a href="#disclaimer" class="att-legal-toc-item">Disclaimer of warranties</a>
          <a href="#liability" class="att-legal-toc-item">Limitation of liability</a>
          <a href="#indemnity" class="att-legal-toc-item">Indemnity</a>
          <a href="#communications" class="att-legal-toc-item">Communications</a>
          <a href="#force-majeure" class="att-legal-toc-item">Force majeure</a>
          <a href="#changes" class="att-legal-toc-item">Changes to terms</a>
          <a href="#governing-law" class="att-legal-toc-item">Governing law</a>
          <a href="#severability" class="att-legal-toc-item">Severability &amp; waiver</a>
          <a href="#contact-terms" class="att-legal-toc-item">Contact us</a>
        </nav>

        <!-- Main content -->
        <div class="att-legal-content">

          <div class="att-legal-intro att-legal-section pt-0">
            <p>These Terms of Use ("Terms") are published in compliance with Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011 and govern access to and use of <strong>amortree.com</strong> (the "Website"). By accessing or using the Website you agree to these Terms — please read them carefully.</p>
            <p>If you do not agree, please do not use the Website.</p>
          </div>

          <section class="att-legal-section" id="about">
            <div class="att-legal-section-num" aria-hidden="true">01</div>
            <h2 class="att-legal-section-title">About Us</h2>
            <p>The Website <strong>amortree.com</strong> is owned and operated by <strong>Amortree Tech Private Limited</strong>, a company incorporated in India under the Companies Act, 2013, with its registered office in Bangalore, Karnataka, India (the "Company"). Amortree Tech is a creative technology and design studio offering UI/UX, web and app design, branding, and related digital services.</p>
          </section>

          <section class="att-legal-section" id="acceptance">
            <div class="att-legal-section-num" aria-hidden="true">02</div>
            <h2 class="att-legal-section-title">Acceptance of Terms</h2>
            <p>By using the Website you enter into a binding agreement with Amortree Tech and agree to comply with these Terms and any policies referenced herein. These Terms apply to all visitors, users and others who access the Website. We may update these Terms from time to time by posting the revised version on the Website; it is your responsibility to review them periodically.</p>
          </section>

          <section class="att-legal-section" id="eligibility">
            <div class="att-legal-section-num" aria-hidden="true">03</div>
            <h2 class="att-legal-section-title">Eligibility</h2>
            <p>To use this Website you must have the capacity to enter into binding contracts under the Indian Contract Act, 1872. Persons who are legally incapable of contracting — such as minors or undischarged insolvents — are not permitted to use the Website. Minors (under 18) may use the Website only with the involvement of a parent or legal guardian. We reserve the right to refuse access if we reasonably believe you do not meet these requirements.</p>
          </section>

          <section class="att-legal-section" id="privacy">
            <div class="att-legal-section-num" aria-hidden="true">04</div>
            <h2 class="att-legal-section-title">Privacy &amp; Data Protection</h2>
            <p>Our <a href="/privacy" class="att-legal-inline-link">Privacy Policy</a> governs how we collect and use personal information. By using the Website you consent to our collection and processing of your information as described in that Policy. If you do not agree, please do not use the Website.</p>
          </section>

          <section class="att-legal-section" id="fees">
            <div class="att-legal-section-num" aria-hidden="true">05</div>
            <h2 class="att-legal-section-title">Fees</h2>
            <p>Browsing the Website is free. We may introduce or change fees for certain services at our discretion; any fee changes will be posted on the Website and will become effective as stated. All fees, where applicable, are quoted in Indian Rupees.</p>
          </section>

          <section class="att-legal-section" id="limited-rights">
            <div class="att-legal-section-num" aria-hidden="true">06</div>
            <h2 class="att-legal-section-title">Limited Rights of Use</h2>
            <p>We grant a limited, non-exclusive, non-transferable right to access and use the Website for personal, non-commercial purposes only. You may not download, copy, reproduce, modify, sell, or distribute content from the Website without prior written permission. Use of automated tools (such as bots or scrapers), data mining, or other extraction methods is prohibited unless expressly permitted.</p>
          </section>

          <section class="att-legal-section" id="conduct">
            <div class="att-legal-section-num" aria-hidden="true">07</div>
            <h2 class="att-legal-section-title">Your Conduct</h2>
            <p>You agree not to use the Website in a manner that harms, disrupts, or interferes with the Website or other users. Prohibited conduct includes, but is not limited to:</p>
            <ul class="att-legal-list">
              <li>Engaging in illegal, fraudulent, or harmful activities</li>
              <li>Uploading, transmitting, or sharing content that is offensive, defamatory, obscene, infringing, abusive, or illegal</li>
              <li>Impersonating others or misrepresenting your affiliation</li>
              <li>Introducing malware, spam, or other harmful code</li>
              <li>Attempting to reverse-engineer or circumvent security measures</li>
            </ul>
          </section>

          <section class="att-legal-section" id="disclaimer">
            <div class="att-legal-section-num" aria-hidden="true">08</div>
            <h2 class="att-legal-section-title">Disclaimer of Warranties</h2>
            <p>The Website and its content are provided "as is" and "as available" without warranties of any kind. We do not warrant the accuracy, completeness, reliability, or fitness for any particular purpose. To the fullest extent permitted by law, Amortree Tech disclaims all warranties, whether express or implied.</p>
          </section>

          <section class="att-legal-section" id="liability">
            <div class="att-legal-section-num" aria-hidden="true">09</div>
            <h2 class="att-legal-section-title">Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Amortree Tech and its affiliates will not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or in connection with your use of the Website, even if we have been advised of the possibility of such damages. This includes business losses, lost profits, data loss, and other similar losses.</p>
          </section>

          <section class="att-legal-section" id="indemnity">
            <div class="att-legal-section-num" aria-hidden="true">10</div>
            <h2 class="att-legal-section-title">Indemnity</h2>
            <p>You agree to indemnify and hold harmless Amortree Tech, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses (including reasonable legal fees) arising from your breach of these Terms or your violation of any law or the rights of a third party.</p>
          </section>

          <section class="att-legal-section" id="communications">
            <div class="att-legal-section-num" aria-hidden="true">11</div>
            <h2 class="att-legal-section-title">Communications</h2>
            <p>By using the Website or contacting us electronically, you consent to receive communications from us by email, SMS, phone, or notices posted on the Website for contractual and administrative purposes.</p>
          </section>

          <section class="att-legal-section" id="force-majeure">
            <div class="att-legal-section-num" aria-hidden="true">12</div>
            <h2 class="att-legal-section-title">Force Majeure</h2>
            <p>We are not liable for delays or failures caused by events beyond our reasonable control, including natural disasters, strikes, outages, governmental actions, or other force majeure events.</p>
          </section>

          <section class="att-legal-section" id="changes">
            <div class="att-legal-section-num" aria-hidden="true">13</div>
            <h2 class="att-legal-section-title">Changes to the Website or Terms</h2>
            <p>We may modify or discontinue any part of the Website or these Terms at any time. Changes take effect when posted. Continued use after changes are posted constitutes acceptance of the updated Terms.</p>
          </section>

          <section class="att-legal-section" id="governing-law">
            <div class="att-legal-section-num" aria-hidden="true">14</div>
            <h2 class="att-legal-section-title">Governing Law &amp; Jurisdiction</h2>
            <p>These Terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.</p>
          </section>

          <section class="att-legal-section" id="severability">
            <div class="att-legal-section-num" aria-hidden="true">15</div>
            <h2 class="att-legal-section-title">Severability &amp; Waiver</h2>
            <p>If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force. Failure to enforce any right or provision does not constitute a waiver of such right or provision.</p>
          </section>

          <section class="att-legal-section" id="contact-terms">
            <div class="att-legal-section-num" aria-hidden="true">16</div>
            <h2 class="att-legal-section-title">Contact Us</h2>
            <p>If you have any questions, concerns, or complaints about these Terms:</p>
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
      <p>Have a question about these terms?</p>
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
  scroll-margin-top: 120px;
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