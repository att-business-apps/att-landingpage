<template>
  <!-- ============================= -->
  <!-- CALL TO ACTION                -->
  <!-- ============================= -->
  <section class="amor-footer-cta">
    <div class="cta-aurora" aria-hidden="true"></div>
    <div class="cta-inner">
      <div class="cta-copy">
        <span class="cta-eyebrow">Let's Work Together</span>
        <h2 class="cta-title">
          Get Your Free Audit &amp;
          <span class="accent-italic">Growth Plan</span>
        </h2>
        <p class="cta-text">
          No pressure, no sales pitch. Just actionable insights on how to
          grow your business.
        </p>
        <a class="amor-btn btn-large btn-fill-white cta-btn" href="/audit">
          <span>Claim Audit</span>
          <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
        </a>
      </div>

      <div class="cta-visual" aria-hidden="true">
        <div class="cta-visual-ring"></div>
        <div class="cta-visual-ring cta-visual-ring--outer"></div>
        <img
          class="cta-visual-img"
          src="../assets/img/amorboy/laptop-poses-banner.png"
          alt=""
        />
      </div>
    </div>
  </section>

  <!-- ============================= -->
  <!-- MAIN FOOTER                   -->
  <!-- ============================= -->
  <footer class="amor-footer" id="contact">
    <span class="footer-watermark" aria-hidden="true">amortree</span>

    <div class="amor-footer-inner">
      <!-- Brand strip -->
      <div class="footer-top-row">
        <a href="/" class="footer-logo-link" aria-label="amortree Tech home">
          <img
            class="footer-logo"
            src="../assets/img/att-logo-light.svg"
            alt="amortree Tech"
          />
        </a>
        <p class="footer-lead">
          We design and build
          <span class="accent-italic">digital experiences</span>
          that grow ambitious brands.
        </p>
        <ul class="footer-social" aria-label="Social media links">
          <li v-for="social in socialLinks" :key="social.name">
            <a :href="social.url" target="_blank" rel="noopener" :aria-label="social.name">
              <i :class="social.icon" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>

      <!-- Services index + side column -->
      <div class="footer-main-row">
        <nav class="footer-services" aria-label="What we do">
          <h6 class="footer-eyebrow">What We Do</h6>

          <ul class="service-index">
            <li v-for="(link, i) in serviceLinks" :key="link.title">
              <a :href="link.href" class="service-row">
                <span class="service-index-num">{{ pad(i + 1) }}</span>
                <span class="service-icon">
                  <span class="material-symbols-outlined" aria-hidden="true">{{ link.icon }}</span>
                </span>
                <span class="service-text">
                  <span class="service-label">{{ link.title }}</span>
                  <span class="service-tag">{{ link.tag }}</span>
                </span>
                <span class="service-arrow">
                  <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="footer-side">
          <div class="footer-side-block">
            <h6 class="footer-eyebrow">Company</h6>
            <ul class="footer-links">
              <li v-for="link in companyLinks" :key="link.label">
                <a :href="link.href">{{ link.label }}</a>
              </li>
            </ul>
          </div>

          <div class="footer-side-block footer-contact-card">
            <h6 class="footer-eyebrow">Get in Touch</h6>

            <a class="footer-contact-item" href="tel:+917975859061">
              <span class="contact-icon"><span class="material-symbols-outlined" aria-hidden="true">call</span></span>
              <span class="contact-copy">
                <span class="contact-label">Call us</span>
                <span class="contact-value">+91 79758 59061</span>
              </span>
            </a>

            <a class="footer-contact-item" href="tel:+919916846647">
              <span class="contact-icon"><span class="material-symbols-outlined" aria-hidden="true">call</span></span>
              <span class="contact-copy">
                <span class="contact-label">Call us</span>
                <span class="contact-value">+91 99168 46647</span>
              </span>
            </a>

            <a class="footer-contact-item" href="mailto:hi@amortree.com">
              <span class="contact-icon"><span class="material-symbols-outlined" aria-hidden="true">mail</span></span>
              <span class="contact-copy">
                <span class="contact-label">Email us</span>
                <span class="contact-value">hi@amortree.com</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span class="footer-copy">Copyright &copy; {{ year }}. amortree Tech. All rights reserved.</span>
        <button
          class="footer-top-btn"
          type="button"
          @click="scrollTop"
          aria-label="Back to top"
        >
          <span class="material-symbols-outlined" aria-hidden="true">arrow_upward</span>
        </button>
      </div>
    </div>
  </footer>

  <!-- ============================= -->
  <!-- MOBILE TAB BAR                -->
  <!-- ============================= -->
  <nav class="amor-tabbar" aria-label="Mobile navigation">
    <ul>
      <li v-for="tab in tabs" :key="tab.path">
        <a :href="tab.path" :class="{ 'is-active': isActive(tab.path) }">
          <span class="tab-icon">
            <span class="material-symbols-outlined" aria-hidden="true">{{ tab.icon }}</span>
          </span>
          <span class="tab-label">{{ tab.label }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const year = new Date().getFullYear();

const socialLinks = [
  { name: "LinkedIn", url: "https://in.linkedin.com/company/amortree-tech", icon: "icofont-linkedin" },
  { name: "Instagram", url: "https://www.instagram.com/amortreetech/", icon: "icofont-instagram" },
  { name: "Facebook", url: "https://www.facebook.com/amortreetech/", icon: "icofont-facebook" },
  { name: "Dribbble", url: "https://dribbble.com/amortreetech", icon: "icofont-dribbble" },
];

// Mirrors the services list in ServicesView.vue — keep in sync if that changes.
const serviceLinks = [
  { title: "Website Design", tag: "Design", href: "/website-design", icon: "palette" },
  { title: "Web Development", tag: "Engineering", href: "/web-development", icon: "code" },
  { title: "UI/UX Design", tag: "Experience", href: "/ui-ux-design", icon: "design_services" },
  { title: "Branding", tag: "Identity", href: "/branding", icon: "auto_awesome" },
  { title: "Digital Marketing", tag: "Acquisition", href: "/digital-marketing", icon: "campaign" },
  { title: "Social Media Marketing", tag: "Social", href: "/social-media-marketing", icon: "groups" },
  { title: "Lead Generation", tag: "Growth", href: "/lead-generation", icon: "hub" },
  { title: "SEO", tag: "Visibility", href: "/seo", icon: "manage_search" },
  { title: "LinkedIn Marketing", tag: "Social", href: "/linkedin-marketing", icon: "work" },
  { title: "Ecommerce Development", tag: "Commerce", href: "/ecommerce-development", icon: "shopping_bag" },
  { title: "Shopify Development", tag: "Commerce", href: "/shopify-development", icon: "storefront" },
  { title: "Website Maintenance", tag: "Support", href: "/website-maintenance", icon: "build" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

const tabs = [
  { label: "Home", path: "/", icon: "home" },
  { label: "Services", path: "/services", icon: "apps" },
  { label: "Projects", path: "/projects", icon: "work" },
  { label: "About", path: "/about", icon: "groups" },
  // { label: "Pricing", path: "/pricing", icon: "sell" },
  { label: "Contact", path: "/contact", icon: "call" },
];

function pad(n) {
  return String(n).padStart(2, "0");
}

function isActive(path) {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style scoped lang="scss">
/* ==================================================
   Local design tokens (derived from the site theme)
   ================================================== */
.amor-footer-cta,
.amor-footer,
.amor-tabbar {
  --gold: var(--logo-yellow, #e4c535);
  --gold-soft: #f4de85;
  --surface-0: #030304;
  --surface-1: #0b0b0d;
  --surface-2: #131316;
  --line: rgba(255, 255, 255, 0.08);
  --line-strong: rgba(255, 255, 255, 0.14);
  --ink: #f5f5f7;
  --ink-muted: #9a9aa6;
  --ink-faint: #6c6c76;
  --ease: cubic-bezier(0.19, 1, 0.22, 1);
  --serif: var(--font-instrument, "Instrument Serif", serif);
}

.accent-italic {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  background: linear-gradient(100deg, var(--gold-soft), var(--gold) 65%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ==================================================
   CALL TO ACTION
   ================================================== */
.amor-footer-cta {
  position: relative;
  overflow: hidden;
  background: var(--surface-0);
  padding: 7rem 6vw 5.5rem;

  @media (max-width: 991px) {
    padding: 5rem 6vw 4rem;
  }
  @media (max-width: 575px) {
    padding: 3.75rem 1.5rem 3rem;
  }
}

.cta-aurora {
  position: absolute;
  inset: -20% -10% auto -10%;
  height: 620px;
  pointer-events: none;
  background:
    radial-gradient(480px 320px at 18% 20%, rgba(228, 197, 53, 0.16), transparent 70%),
    radial-gradient(420px 300px at 85% 10%, rgba(228, 197, 53, 0.08), transparent 70%);
  filter: blur(10px);
}

.cta-inner {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 3rem;
  border-bottom: 1px solid var(--line);
  padding-bottom: 4.5rem;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding-bottom: 3rem;
  }
}

.cta-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-soft);

  &::before {
    content: "";
    width: 22px;
    height: 1px;
    background: var(--gold);
  }
  @media (max-width: 991px) {
    &::before {
      display: none;
    }
  }
}

.cta-title {
  margin: 1.1rem 0 1.1rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.12;
  font-size: clamp(2.1rem, 4vw, 3.1rem);
  color: #ffffff;
  max-width: 32rem;

  .accent-italic {
    font-size: 1.08em;
  }

  @media (max-width: 991px) {
    max-width: none;
    margin-left: auto;
    margin-right: auto;
  }
}

.cta-text {
  max-width: 30rem;
  color: var(--ink-muted);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 2.25rem;

  @media (max-width: 991px) {
    max-width: none;
    margin-left: auto;
    margin-right: auto;
  }
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;

  .material-symbols-outlined {
    font-size: 1.15rem;
    transition: transform 0.35s var(--ease);
  }
  &:hover .material-symbols-outlined {
    transform: translateX(5px);
  }
}

.cta-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;

  @media (max-width: 575px) {
    min-height: 220px;
  }
}

.cta-visual-ring {
  position: absolute;
  inset: 8%;
  border-radius: 50%;
  border: 1px solid var(--line-strong);

  &--outer {
    inset: -6%;
    border-color: var(--line);
    animation: rotateSlow 30s linear infinite;
    border-style: dashed;
  }
}

.cta-visual-img {
  position: relative;
  z-index: 1;
  width: 100%;
  filter: drop-shadow(0 24px 48px rgba(0, 0, 0, 0.55));
}

@keyframes rotateSlow {
  to {
    transform: rotate(360deg);
  }
}

/* ==================================================
   MAIN FOOTER
   ================================================== */
.amor-footer {
  position: relative;
  overflow: hidden;
  background: var(--surface-1);
  border-top: 1px solid var(--line);
  padding: 5.5rem 6vw 10rem;

  @media (max-width: 575px) {
    padding: 3.5rem 1.5rem 5rem;
  }
}

.footer-watermark {
  position: absolute;
  left: 50%;
  bottom: 0vw;
  transform: translateX(-50%);
  font-size: clamp(4rem, 16vw, 13rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

.amor-footer-inner {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
}

/* --- Brand strip --- */
.footer-top-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2.5rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--line);

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
}

.footer-logo-link {
  display: inline-block;
  flex: none;
}

.footer-logo {
  width: 168px;
}

.footer-lead {
  flex: 1;
  min-width: 220px;
  font-size: clamp(1.1rem, 1.6vw, 1.35rem);
  line-height: 1.5;
  color: var(--ink);
  max-width: 26rem;
}

.footer-social {
  display: flex;
  gap: 0.6rem;
  list-style: none;
  padding: 0;
  margin: 0;
  flex: none;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid var(--line-strong);
    color: var(--ink);
    font-size: 1.05rem;
    transition: 0.3s var(--ease);

    &:hover {
      color: var(--surface-0);
      background: var(--gold);
      border-color: var(--gold);
      transform: translateY(-3px);
    }
  }
}

/* --- Eyebrow label (editorial, matches Instrument Serif accent) --- */
.footer-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: 1.15rem;
  color: var(--gold-soft);
  margin-bottom: 1.75rem;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--line);
  }
}

/* --- Services + side column --- */
.footer-main-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  padding: 3.5rem 0 2rem;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.footer-services {
  min-width: 0;
}

.service-index {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2.25rem;
  border-top: 1px solid var(--line);

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
}

.service-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 0.35rem;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(100deg, var(--gold-soft), var(--gold));
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.5s var(--ease);
    z-index: -1;
  }

  &:hover,
  &:focus-visible {
    color: var(--surface-0);
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    &::before {
      transform: scaleX(1);
    }

    .service-icon {
      background: var(--surface-0);
      color: var(--gold-soft);
      border-color: var(--surface-0);
    }

    .service-index-num {
      color: var(--surface-0);
      opacity: 0.55;
    }

    .service-tag {
      color: var(--surface-0);
      opacity: 0.6;
    }

    .service-arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

.service-index-num {
  flex: none;
  width: 1.75rem;
  font-family: var(--serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--ink-faint);
  transition: 0.35s var(--ease);
}

.service-icon {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  color: var(--ink-muted);
  transition: 0.35s var(--ease);

  .material-symbols-outlined {
    font-size: 1.05rem;
  }
}

.service-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.service-label {
  font-size: clamp(0.95rem, 1.3vw, 1.08rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.service-tag {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-faint);
  transition: 0.35s var(--ease);
}

.service-arrow {
  flex: none;
  opacity: 0;
  transform: translateX(-10px);
  transition: 0.35s var(--ease);

  .material-symbols-outlined {
    font-size: 1.1rem;
    display: block;
  }
}

.footer-side {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  a {
    position: relative;
    color: var(--ink-muted);
    font-size: 0.98rem;
    transition: 0.25s var(--ease);

    &:hover {
      color: var(--gold-soft);
      padding-left: 0.35rem;
    }
  }
}

.footer-contact-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: var(--surface-2);
  border: 1px solid var(--line);

  .footer-eyebrow {
    margin-bottom: 0.5rem;
  }
}

.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  color: var(--ink);
  padding: 0.4rem 0;
  transition: 0.25s var(--ease);

  &:hover {
    transform: translateX(4px);
    .contact-icon {
      background: var(--gold);
      color: var(--surface-0);
      border-color: var(--gold);
    }
  }
}

.contact-icon {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--line-strong);
  color: var(--gold-soft);
  transition: 0.25s var(--ease);

  .material-symbols-outlined {
    font-size: 1.1rem;
  }
}

.contact-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.35;
}

.contact-label {
  font-size: 0.78rem;
  color: var(--ink-faint);
}

.contact-value {
  font-size: 1rem;
  font-weight: 500;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid var(--line);
  padding: 1.75rem 0;

  @media (max-width: 575px) {
    flex-direction: column;
    text-align: center;
  }
}

.footer-copy {
  color: var(--ink-faint);
  font-size: 0.88rem;
}

.footer-top-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  transition: 0.3s var(--ease);

  &:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--surface-0);
    transform: translateY(-3px);
  }
}

/* ==================================================
   MOBILE TAB BAR
   ================================================== */
.amor-tabbar {
  display: none;
  position: fixed;
  left: 50%;
  bottom: 0.9rem;
  transform: translateX(-50%);
  width: min(94%, 460px);
  z-index: 999;
  padding-bottom: env(safe-area-inset-bottom, 0);

  border-radius: 1.4rem;
  background: rgba(10, 10, 12, 0.68);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow:
    0 -8px 40px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);

  @media (max-width: 991px) {
    display: block;
  }

  ul {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 0.4rem;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  li {
    flex: 1 0 auto;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    padding: 0.5rem 0.6rem;
    border-radius: 1rem;
    color: var(--ink);
    transition: 0.3s var(--ease);

    &:active {
      transform: scale(0.92);
    }
  }

  .tab-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 1.05rem;
    transition: 0.3s var(--ease);
  }

  .tab-label {
    font-size: 0.66rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  a.is-active {
    color: var(--surface-0);

    .tab-icon {
      background: linear-gradient(135deg, var(--gold-soft), var(--gold));
      color: var(--surface-0);
      box-shadow: 0 6px 16px rgba(228, 197, 53, 0.35);
    }

    .tab-label {
      color: var(--gold-soft);
      font-weight: 600;
    }
  }
}

/* ==================================================
   Reduced motion
   ================================================== */
@media (prefers-reduced-motion: reduce) {
  .cta-visual-ring--outer {
    animation: none;
  }
  .cta-btn .material-symbols-outlined,
  .footer-social a,
  .footer-contact-item,
  .footer-top-btn,
  .service-row,
  .service-row::before,
  .service-icon,
  .service-index-num,
  .service-tag,
  .service-arrow,
  .amor-tabbar a {
    transition: none;
  }
}
</style>