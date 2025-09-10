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
      path: "/whatWeDo",
      name: "services",
      component: () => import("../views/ServicesView.vue"),
    },
    {
      path: "/whoWeAre",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/portfolio",
      name: "portfolio",
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
      path: "/estimate",
      name: "estimate",
      component: () => import("../views/EstimateView.vue"),
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
      path: "/project/samsiddhidesigns",
      name: "samsiddhidesigns",
      component: () =>
        import("../views/project/ProjectSamsiddhiDesignsView.vue"),
    },
    {
      path: "/pageNotFound",
      name: "pageNotFound",
      component: () => import("../views/404.vue"),
    },
  ],
});

export default router;
