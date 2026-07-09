import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/services",
      name: "services",
      component: () => import("../views/ServicesView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/careers",
      name: "careers",
      component: () => import("../views/CareersView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/projects",
      name: "case-studies",
      component: () => import("../views/ProjectView.vue"),
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("../views/PrivacyView.vue"),
    },
    {
      path: "/terms",
      name: "terms",
      component: () => import("../views/TermsView.vue"),
    },
    {
      path: "/pricing",
      name: "pricing",
      component: () => import("../views/PricingView.vue"),
    },
    {
      path: "/estimate",
      name: "estimate",
      component: () => import("../views/EstimateView.vue"),
    },
    {
      path: "/audit",
      name: "audit",
      component: () => import("../views/AuditView.vue"),
    },

    // Services
    {
      path: "/website-design",
      name: "website-design",
      component: () => import("../views/services/WebsiteDesignView.vue"),
    },
    {
      path: "/web-development",
      name: "web-development",
      component: () => import("../views/services/WebDevelopmentView.vue"),
    },
    {
      path: "/ui-ux-design",
      name: "ui-ux-design",
      component: () => import("../views/services/UIUXDesignView.vue"),
    },
    {
      path: "/ecommerce-development",
      name: "ecommerce-development",
      component: () => import("../views/services/EcommerceDevelopmentView.vue"),
    },
    {
      path: "/lead-generation",
      name: "lead-generation",
      component: () => import("../views/services/LeadGenerationView.vue"),
    },
    {
      path: "/shopify-development",
      name: "shopify-development",
      component: () => import("../views/services/ShopifyDevelopmentView.vue"),
    },
    {
      path: "/seo",
      name: "seo",
      component: () => import("../views/services/SEOView.vue"),
    },
    {
      path: "/digital-marketing",
      name: "digital-marketing",
      component: () => import("../views/services/DigitalMarketingView.vue"),
    },
    {
      path: "/social-media-marketing",
      name: "social-media-marketing",
      component: () => import("../views/services/SocialMediaMarketingView.vue"),
    },
    {
      path: "/linkedin-marketing",
      name: "linkedin-marketing",
      component: () => import("../views/services/LinkedInMarketingView.vue"),
    },
    {
      path: "/branding",
      name: "branding",
      component: () => import("../views/services/BrandingView.vue"),
    },
    {
      path: "/website-maintenance",
      name: "website-maintenance",
      component: () => import("../views/services/WebsiteMaintenanceView.vue"),
    },

    // Projects
    {
      path: "/project/uae-links",
      name: "uae-links",
      component: () => import("../views/project/ProjectUAELinksView.vue"),
    },
    {
      path: "/project/solved-cube-it-solutions",
      name: "solved-cube-it-solutions",
      component: () => import("../views/project/ProjectSolvedCubeView.vue"),
    },
    {
      path: "/project/microrelic",
      name: "microrelic",
      component: () => import("../views/project/ProjectMicrorelicView.vue"),
    },
    {
      path: "/project/steadyasset",
      name: "steadyasset",
      component: () => import("../views/project/ProjectSteadyAssetView.vue"),
    },
    {
      path: "/project/al-shamil-computers",
      name: "al-shamil",
      component: () => import("../views/project/ProjectAlShamilView.vue"),
    },
    {
      path: "/project/savedesk",
      name: "SaveDesk",
      component: () => import("../views/project/ProjectSaveDeskView.vue"),
    },
    {
      path: "/project/visonverse",
      name: "VisonVerse",
      component: () => import("../views/project/ProjectVisonVerseView.vue"),
    },
    {
      path: "/project/samsiddhi-designs",
      name: "samsiddhidesigns",
      component: () =>
        import("../views/project/ProjectSamsiddhiDesignsView.vue"),
    },
    {
      path: "/project/raksha-realty",
      name: "raksha-realty",
      component: () =>
        import("../views/project/ProjectRakshaRealtyView.vue"),
    },
    {
      path: "/project/alin-salon",
      name: "alin-salon",
      component: () =>
        import("../views/project/ProjectAlinSalonView.vue"),
    },
    {
      path: "/pageNotFound",
      name: "pageNotFound",
      component: () => import("../views/404.vue"),
    },
  ],
});

export default router;
