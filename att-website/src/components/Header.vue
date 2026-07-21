<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import { useRoute } from "vue-router";
import { gsap } from "gsap";

const route = useRoute();

// Services is active on /services and all 12 /service/* child routes
const servicesActive = computed(() =>
  route.path === "/services" || route.path.startsWith("/services/") ||
  [
    "/website-design", "/web-development", "/ui-ux-design",
    "/ecommerce-development", "/lead-generation", "/shopify-development",
    "/seo", "/digital-marketing", "/social-media-marketing",
    "/linkedin-marketing", "/branding", "/website-maintenance",
  ].includes(route.path)
);

// Portfolio active on /projects and /project/*
const portfolioActive = computed(() =>
  route.path === "/projects" || route.path.startsWith("/project/")
);

const aboutActive    = computed(() => route.path === "/about");
const careersActive  = computed(() => route.path === "/careers");
const contactActive  = computed(() => route.path === "/contact");

/* ------------------------------------------------------------------
   Full-screen menu
   ------------------------------------------------------------------ */
const isMenuOpen = ref(false);
let menuTimeline;

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const designLinks = [
  { label: "Website Design", href: "/website-design" },
  { label: "Web Development", href: "/web-development" },
  { label: "UI/UX Design", href: "/ui-ux-design" },
  { label: "Branding", href: "/branding" },
  { label: "Ecommerce Development", href: "/ecommerce-development" },
  { label: "Shopify Development", href: "/shopify-development" },
];

const growthLinks = [
  { label: "SEO", href: "/seo" },
  { label: "Digital Marketing", href: "/digital-marketing" },
  { label: "Social Media Marketing", href: "/social-media-marketing" },
  { label: "LinkedIn Marketing", href: "/linkedin-marketing" },
  { label: "Lead Generation", href: "/lead-generation" },
  { label: "Website Maintenance", href: "/website-maintenance" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://in.linkedin.com/company/amortree-tech", icon: "icofont-linkedin" },
  { name: "Dribbble", href: "https://dribbble.com/amortreetech", icon: "icofont-dribbble" },
  { name: "Instagram", href: "https://www.instagram.com/amortreetech/", icon: "icofont-instagram" },
  { name: "Facebook", href: "https://www.facebook.com/amortreetech/", icon: "icofont-facebook" },
];

function playMenuIn() {
  menuTimeline && menuTimeline.kill();
  menuTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  menuTimeline
    .from(".amor-fsmenu-panel-left", { autoAlpha: 0, x: -24, duration: 0.5 })
    .from(".amor-fsmenu-panel-right", { autoAlpha: 0, x: 24, duration: 0.5 }, "<")
    .from(".amor-fsmenu-col", { autoAlpha: 0, y: 18, duration: 0.45, stagger: 0.07 }, "-=0.25")
    .from(".amor-fsmenu-cta-eyebrow, .amor-fsmenu-cta-title, .amor-fsmenu-cta-btn", {
      autoAlpha: 0, y: 16, duration: 0.45, stagger: 0.08,
    }, "-=0.3");
}

function openMenu() {
  isMenuOpen.value = true;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(playMenuIn);
}

function closeMenu() {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
}

function toggleMenu() {
  isMenuOpen.value ? closeMenu() : openMenu();
}

function onKeydown(e) {
  if (e.key === "Escape" && isMenuOpen.value) closeMenu();
}
window.addEventListener("keydown", onKeydown);

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
  menuTimeline && menuTimeline.kill();
});
</script>

<template>
  <div class="header amor-header header-style-3">
    <nav class="amor-mainmenu navbar navbar-fixed-top">
      <div class="" id="mobileMenu">
        <div class="header-navbar">
          <div class="header-logo">
            <a href="/">
              <img
                class="light-version-logo"
                style="width: 200px; margin: 0 auto"
                src="../assets/img/att-logo-light.svg"
                alt="amortree Tech logo"
              />
            </a>
          </div>
          <div class="header-main-nav m-0">
            <nav class="mainmenu-nav">
              <ul class="mainmenu">
                <li>
                  <a href="/services" :class="{ active: servicesActive }">
                    <span class="text-ll">Services</span>
                  </a>
                </li>
                <li>
                  <a href="/projects" :class="{ active: portfolioActive }">
                    <span class="text-ll">Projects</span>
                  </a>
                </li>
                <li>
                  <a href="/about" :class="{ active: aboutActive }">
                    <span class="text-ll">About</span>
                  </a>
                </li>
                <li>
                  <a href="/contact" :class="{ active: contactActive }">
                    <span class="text-ll">Let's Talk</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="header-action flex gap-3 items-center">
            <button
              type="button"
              class="amor-menu-trigger"
              :class="{ 'is-open': isMenuOpen }"
              :aria-expanded="isMenuOpen"
              aria-controls="amor-fsmenu"
              aria-label="Toggle menu"
              @click="toggleMenu"
            >
              <span class="material-symbols-outlined" aria-hidden="true">
                {{ isMenuOpen ? "close" : "menu" }}
              </span>
            </button>

            
            <a
              class="amor-btn btn-borderd light text-xs font-bold tracking-widest sm:p-0"
              href="/audit"
            >Claim Audit</a>
          </div>
        </div>
        <div class="scroll-progress"></div>
      </div>
    </nav>
  </div>

  <!-- ============================================================
       FULL-SCREEN MENU
       ============================================================ -->
  <teleport to="body">
    <transition name="amor-fsmenu-fade">
      <div v-if="isMenuOpen" id="amor-fsmenu" class="amor-fsmenu" role="dialog" aria-modal="true" aria-label="Site menu">
        <button type="button" class="amor-fsmenu-close" aria-label="Close menu" @click="closeMenu">
          <span class="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
        <div class="amor-fsmenu-panel amor-fsmenu-panel-left">
          <div class="amor-fsmenu-cols">
            <nav class="amor-fsmenu-col menu" aria-label="Main">
              <!-- <span class="amor-fsmenu-col-title">Menu</span> -->
              <a v-for="link in mainLinks" :key="link.href" :href="link.href" @click="closeMenu">{{ link.label }}</a>
            </nav>

            <nav class="amor-fsmenu-col" aria-label="Design and build services">
              <span class="amor-fsmenu-col-title">Design &amp; Build</span>
              <a v-for="link in designLinks" :key="link.href" :href="link.href" @click="closeMenu">{{ link.label }}</a>
            </nav>

            <nav class="amor-fsmenu-col" aria-label="Marketing and growth services">
              <span class="amor-fsmenu-col-title">Marketing &amp; Growth</span>
              <a v-for="link in growthLinks" :key="link.href" :href="link.href" @click="closeMenu">{{ link.label }}</a>
            </nav>
          </div>

          <div class="amor-fsmenu-bottom">
            <a href="/audit" class="amor-fsmenu-score" @click="closeMenu">
              Want to know your Growth Score?
              <strong>Check your website free <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></strong>
            </a>
            <div class="amor-fsmenu-socials">
              <a v-for="s in socialLinks" :key="s.name" :href="s.href" target="_blank" rel="noopener" :aria-label="s.name">
                <i :class="s.icon" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="amor-fsmenu-panel amor-fsmenu-panel-right">
          <div class="amor-fsmenu-cta">
            <span class="amor-fsmenu-cta-eyebrow">Got An Idea?</span>
            <h2 class="amor-fsmenu-cta-title">Let's build something <em>exceptional</em>.</h2>
            <a href="/contact" class="amor-fsmenu-cta-btn" @click="closeMenu">Get In Touch</a>
          </div>

          <div class="amor-fsmenu-location">Bengaluru, India</div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
/*
  Desktop active state — 50% bottom underline only.
  Overrides the global SCSS which sets both ::before (bottom) and ::after (top)
  to width:100% on .active. We suppress ::after and lock ::before to 50%.
*/
.mainmenu > li > a.active {
  color: var(--color-primary);
}

.mainmenu > li > a.active::before {
  width: 50% !important;
  opacity: 1 !important;
}

/* Kill the top line (::after) on active — only the bottom 50% shows */
.mainmenu > li > a.active::after {
  width: 0 !important;
  opacity: 0 !important;
}

/*
  Mobile active state.
  ::before is display:none on mobile (set in _header.scss), so we use
  a left-border accent on the <li> instead to give a clear visual indicator.
*/
@media (max-width: 991px) {
  .mainmenu > li > a.active {
    color: var(--color-primary);
    padding-left: 12px;
    border-left: 3px solid var(--color-primary);
  }
}

/* ── Hamburger trigger ─────────────────────────────────────────────── */
.amor-menu-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin-left: 14px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;

  .material-symbols-outlined {
    font-size: 22px;
  }

  &:hover {
    border-color: var(--logo-yellow, #e4c535);
    background: rgba(228, 197, 53, 0.08);
  }

  &.is-open {
    background: var(--logo-yellow, #e4c535);
    border-color: var(--logo-yellow, #e4c535);
    color: #000;
  }
}
</style>

<style scoped lang="scss">
/* ==================================================
   FULL-SCREEN MENU
   ================================================== */
.amor-fsmenu-fade-enter-active,
.amor-fsmenu-fade-leave-active {
  transition: opacity 0.3s ease;
}
.amor-fsmenu-fade-enter-from,
.amor-fsmenu-fade-leave-to {
  opacity: 0;
}

.amor-fsmenu {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  font-family: var(--font-secondary, "Google Sans Flex", sans-serif);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    overflow-y: auto;
  }
}

.amor-fsmenu-panel {
  position: relative;
  padding: 6.5rem 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: 900px) {
    padding: 5.5rem 1.75rem 3rem;
  }
}

/* ── Left panel — nav columns ───────────────────────────────────────── */
.amor-fsmenu-panel-left {
  background: #000000;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

.amor-fsmenu-cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem 1.5rem;
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
}

.amor-fsmenu-col {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  &.menu {
    a {
      font-size: 2rem;
      font-weight: 600;
      height: 48px;
      display: block;
      position: relative;
      transition: var(--transition);

      &::before {
        content: "";
        height: 2px;
        width: 0;
        background-color: var(--logo-yellow);
        position: absolute;
        bottom: 0px;
        left: 0;
        opacity: 0;
        transition: 0.5s;
      }

      &:hover {
        &::before {
          opacity: 1;
          width: 100%;
        }
      }
    }
  }

  a {
    color: rgba(255, 255, 255, 0.72);
    font-size: 1.25rem;
    font-weight: 400;
    text-decoration: none;
    transition: color 0.2s ease, transform 0.2s ease;
    width: fit-content;

    &:hover {
      color: var(--logo-yellow, #e4c535);
      transform: translateX(3px);
    }
  }
}

.amor-fsmenu-col-title {
  font-family: var(--font-instrument, "Instrument Serif", serif);
  font-style: italic;
  font-weight: 500;
  font-size: 1.1rem;
  color: var(--logo-yellow, #e4c535);
  margin-bottom: 0.4rem;
}

.amor-fsmenu-bottom {
  margin-top: 3.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;

  @media (max-width: 900px) {
    margin-top: 2.5rem;
  }
}

.amor-fsmenu-score {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.85rem;
  text-decoration: none;

  strong {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    transition: color 0.2s ease;

    .material-symbols-outlined {
      font-size: 18px;
      transition: transform 0.25s ease;
    }
  }

  &:hover strong {
    color: var(--logo-yellow, #e4c535);
    .material-symbols-outlined { transform: translateX(3px); }
  }
}

.amor-fsmenu-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;

  a {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover { color: var(--logo-yellow, #e4c535); }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: #f5f5f7;
    font-size: 1.05rem;
    transition: 0.3s cubic-bezier(0.19, 1, 0.22, 1);

    &:hover {
      color: #030304;
      background: #e4c535;
      border-color: #e4c535;
      transform: translateY(-3px);
    }
  }
}

/* ── Right panel — CTA ───────────────────────────────────────────────── */
.amor-fsmenu-panel-right {
  background: radial-gradient(120% 100% at 100% 0%, rgba(228, 197, 53, 0.14), transparent 60%), #0b0b0d;
}

.amor-fsmenu-close {
  position: absolute;
  top: 1.75rem;
  right: 1.75rem;
  z-index: 1;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: var(--logo-yellow, #e4c535);
    background: rgba(228, 197, 53, 0.1);
  }
}

.amor-fsmenu-cta {
  max-width: 26rem;
}

.amor-fsmenu-cta-eyebrow {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
}

.amor-fsmenu-cta-title {
  font-family: var(--font-primary, "Google Sans", sans-serif);
  font-size: clamp(2rem, 3.6vw, 2.9rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: #fff;
  margin: 0 0 2.25rem;

  em {
    font-family: var(--font-instrument, "Instrument Serif", serif);
    font-style: italic;
    font-weight: 500;
    background: linear-gradient(100deg, #f4de85, var(--logo-yellow, #e4c535) 70%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.amor-fsmenu-cta-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 1.9rem;
  border-radius: 999px;
  background: linear-gradient(100deg, #f4de85, var(--logo-yellow, #e4c535));
  color: #000;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: transform 0.25s ease, filter 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
  }
}

.amor-fsmenu-location {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.4);

  @media (max-width: 900px) {
    margin-top: 2.5rem;
  }
}
</style>