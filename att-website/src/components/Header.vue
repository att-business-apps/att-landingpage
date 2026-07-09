<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

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
          <div class="header-main-nav">
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
          <div class="header-action">
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
</style>