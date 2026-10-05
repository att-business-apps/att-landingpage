<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, defineAsyncComponent } from "vue";
import { RouterView, useRouter, useRoute } from "vue-router";
import HeaderSec from "./components/Header.vue";
import FooterSec from "./components/Footer.vue";
import SEOMeta from "./components/SEOMeta.vue";
import logoUrl from "./assets/img/shapes/bubble-2.png";
import "animate.css";

const isLoading = ref(true);
const isChatWidgetReady = ref(false);
const ChatWidget = defineAsyncComponent(() => import("./components/Chatwidget.vue"));
let chatIdleCallback;
let chatFallbackTimer;
const router = useRouter();
const route = useRoute();
const showSiteChrome = computed(() => !route.meta.hideSiteChrome);

const seoPages = {
  "/": ["Amortree Tech | Websites and Digital Marketing That Grow Your Business", "Amortree Tech helps ambitious businesses grow with strategic website design, web development, SEO, and digital marketing."],
  "/services": ["Digital Services | Amortree Tech", "Explore website design, development, SEO, ecommerce, branding, and digital marketing services from Amortree Tech."],
  "/about": ["About Amortree Tech | Digital Growth Studio", "Meet Amortree Tech, a digital studio helping businesses turn better websites and marketing into measurable growth."],
  "/careers": ["Careers | Amortree Tech", "Explore career opportunities at Amortree Tech and help build thoughtful digital experiences for growing businesses."],
  "/contact": ["Contact Amortree Tech | Start a Project", "Talk with Amortree Tech about your website, digital marketing, or growth project. Tell us what you want to build."],
  "/projects": ["Our Work | Amortree Tech Case Studies", "Explore website and digital projects by Amortree Tech, including the challenges, solutions, and results behind each case study."],
  "/blog": ["Digital Growth Articles | Amortree Tech Blog", "Practical guidance on websites, SEO, ecommerce, lead generation, and digital marketing for growing businesses."],
  "/privacy": ["Privacy Policy | Amortree Tech", "Read how Amortree Tech collects, uses, and protects information when you use our website or contact our team."],
  "/terms": ["Terms of Use | Amortree Tech", "Review the terms that apply to using the Amortree Tech website and its content."],
  "/pricing": ["Website Design Pricing | Amortree Tech", "Understand website project pricing and find the right scope for your business goals with Amortree Tech."],
  "/estimate": ["Request a Project Estimate | Amortree Tech", "Share your project goals and requirements to receive a tailored website or digital growth estimate from Amortree Tech."],
  "/audit": ["Free Website Audit | Amortree Tech", "Get a practical review of your website and discover opportunities to improve performance, search visibility, and enquiries."],
  "/website-design": ["Website Design Services | Amortree Tech", "Get a conversion-focused website designed around your customers, brand, and business goals."],
  "/web-development": ["Web Development Services | Amortree Tech", "Build a fast, secure, scalable website with custom web development from Amortree Tech."],
  "/ui-ux-design": ["UI/UX Design Services | Amortree Tech", "Create clear, intuitive digital experiences with user research, interface design, and thoughtful UX from Amortree Tech."],
  "/ecommerce-development": ["Ecommerce Development | Amortree Tech", "Launch or improve an online store with ecommerce strategy, development, and customer-friendly shopping experiences."],
  "/lead-generation": ["Lead Generation Services | Amortree Tech", "Attract qualified prospects and turn more website visits into enquiries with strategic lead generation."],
  "/shopify-development": ["Shopify Development Services | Amortree Tech", "Build and improve a Shopify store with tailored design, development, and ecommerce support."],
  "/seo": ["SEO Services | Amortree Tech", "Improve your search visibility and attract relevant organic traffic with practical SEO strategy and implementation."],
  "/digital-marketing": ["Digital Marketing Services | Amortree Tech", "Grow your reach and generate demand with coordinated digital marketing built around your business objectives."],
  "/social-media-marketing": ["Social Media Marketing | Amortree Tech", "Build a stronger social presence with content and campaigns tailored to your audience and business."],
  "/linkedin-marketing": ["LinkedIn Marketing Services | Amortree Tech", "Reach decision makers and build a stronger B2B pipeline with focused LinkedIn marketing."],
  "/branding": ["Branding Services | Amortree Tech", "Build a distinctive, consistent brand with strategic positioning and visual identity from Amortree Tech."],
  "/website-maintenance": ["Website Maintenance Services | Amortree Tech", "Keep your website secure, current, and performing well with ongoing website maintenance and support."],
  "/blog/how-much-does-a-website-cost-in-india": ["How Much Does a Website Cost in India? [2026 Pricing Guide] | Amortree", "Understand website design and development costs in India, what affects a project budget, and how to plan your investment."],
  "/blog/before-you-hire-a-web-designer": ["12 Questions to Ask Before You Hire a Web Designer | Amortree", "Use these practical questions to compare web designers, understand their process, and choose the right partner for your project."],
  "/blog/whatsapp-lead-gen-for-local-business": ["Turning WhatsApp Into Your Best Lead Gen Channel | Amortree", "Learn how local businesses can use WhatsApp to respond to prospects, qualify leads, and create a smoother path to enquiry."],
  "/blog/landing-page-vs-full-website": ["Landing Page vs. Full Website: Which Do You Actually Need? | Amortree", "Compare landing pages and full websites to choose the right option for your campaign, audience, and business goals."],
  "/blog/seo-basics-small-business-india": ["SEO Basics Every Small Business in India Should Get Right | Amortree", "A straightforward guide to local SEO, useful content, and on-page basics for small businesses in India."],
  "/blog/signs-you-need-a-website-redesign": ["7 Signs Your Website Is Quietly Costing You Customers | Amortree", "Spot the signs that an outdated or confusing website may be losing customers and learn what to improve first."],
  "/blog/freelancer-vs-design-studio-vs-agency": ["Freelancer vs. Design Studio vs. Agency: Who Should Build Your Website? | Amortree", "Compare freelancers, design studios, and agencies to find the right team for your website scope, budget, and support needs."],
  "/blog/website-losing-customers": ["7 Signs Your Website Is Losing You Customers | Amortree", "Learn how slow pages, unclear messaging, and poor mobile experiences can cost your business customers."],
  "/blog/how-long-should-a-website-take-to-build": ["How Long Should a Website Actually Take to Build? | Amortree", "See what shapes a website project timeline, from discovery and content to design, development, and launch."],
  "/blog/website-red-flags-before-hiring": ["12 Website Red Flags to Check Before You Hire Anyone | Amortree", "Know the warning signs to look for when evaluating a website provider, proposal, or project process."],
  "/blog/website-maintenance-checklist": ["A Practical Website Maintenance Checklist for Small Businesses | Amortree", "A monthly and quarterly routine for keeping your small business website secure, accurate, fast, and ready to turn visits into enquiries."],
  "/blog/ecommerce-checkout-improvements": ["7 Checkout Improvements That Make Buying Easier | Amortree", "Reduce avoidable friction in your online store with clearer delivery details, simpler forms, trusted payment options, and a better mobile checkout."],
  "/blog/website-brief-checklist": ["How to Write a Website Brief Your Designer Can Actually Use | Amortree", "Gather the goals, audience details, content, and practical requirements that lead to clearer website proposals and a smoother project."],
  "/project/uae-links": ["UAE Links Website Case Study | Amortree Tech", "See how Amortree Tech approached the UAE Links website project, from its requirements to the delivered digital experience."],
  "/project/solved-cube-it-solutions": ["Solved Cube IT Solutions Case Study | Amortree Tech", "Explore the website project Amortree Tech delivered for Solved Cube IT Solutions."],
  "/project/microrelic": ["Microrelic Website Case Study | Amortree Tech", "Explore the digital experience Amortree Tech created for Microrelic."],
  "/project/steadyasset": ["SteadyAsset Website Case Study | Amortree Tech", "Explore the website project and digital experience Amortree Tech created for SteadyAsset."],
  "/project/al-shamil-computers": ["Al Shamil Computers Case Study | Amortree Tech", "See the website project Amortree Tech delivered for Al Shamil Computers."],
  "/project/savedesk": ["SaveDesk Website Case Study | Amortree Tech", "Explore the website and digital project Amortree Tech delivered for SaveDesk."],
  "/project/visonverse": ["VisionVerse Technology Case Study | Amortree Tech", "Explore the website project Amortree Tech created for VisionVerse Technology."],
  "/project/samsiddhi-designs": ["Samsiddhi Designs Case Study | Amortree Tech", "See how Amortree Tech presented the work and digital experience for Samsiddhi Designs."],
  "/project/raksha-realty": ["Raksha Realty Website Case Study | Amortree Tech", "Explore the website experience Amortree Tech created for Raksha Realty."],
  "/project/alin-salon": ["Alin Salon Website Case Study | Amortree Tech", "Explore the website project Amortree Tech delivered for Alin Salon."],
  "/crm": ["Amortree CRM", "Internal Amortree workspace."],
  "/pageNotFound": ["Page Not Found | Amortree Tech", "The page you requested could not be found. Explore Amortree Tech services, projects, or contact us."]
};
const pageSeo = computed(() => {
  const [pageTitle, pageDescription] = seoPages[route.path] || ["Amortree Tech | Digital Experiences That Grow Your Business", "Amortree Tech helps businesses grow with website design, development, and digital marketing."];
  return { pageTitle, pageDescription, noIndex: route.path === "/crm" || route.path === "/pageNotFound" };
});

router.beforeEach((_to, _from, next) => {
  isLoading.value = true;
  next();
});

router.afterEach(() => {
  // Small delay to avoid flicker on super fast routes
  setTimeout(() => {
    isLoading.value = false;
  }, 150);
});

router.onError(() => {
  isLoading.value = false;
});

onMounted(() => {
  router.isReady().then(() => {
    isLoading.value = false;
  });

  if ("requestIdleCallback" in window) {
    chatIdleCallback = window.requestIdleCallback(() => {
      isChatWidgetReady.value = true;
    }, { timeout: 2500 });
  } else {
    chatFallbackTimer = window.setTimeout(() => {
      isChatWidgetReady.value = true;
    }, 1200);
  }
});

onBeforeUnmount(() => {
  if (chatIdleCallback !== undefined && "cancelIdleCallback" in window) {
    window.cancelIdleCallback(chatIdleCallback);
  }
  window.clearTimeout(chatFallbackTimer);
});

watch(isLoading, (loading) => {
  document.body.style.overflow = loading ? "hidden" : "";
});
</script>

<template>
  <SEOMeta v-bind="pageSeo" />
  <HeaderSec v-if="showSiteChrome" />
  <div
    v-if="isLoading"
    class="global-loader"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <img :src="logoUrl" alt="Loading" class="loader-logo" />
  </div>
  <RouterView />
  <ChatWidget v-if="showSiteChrome && isChatWidgetReady" />
  <FooterSec v-if="showSiteChrome" />
</template>

<style scoped>
.global-loader {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #23232a;
  z-index: 9999;
  transition: opacity 120ms ease-in-out;
}

.loader-logo {
  width: 160px;
  height: auto;
  opacity: 0.95;
  filter: drop-shadow(0 4px 18px rgba(0, 0, 0, 0.5));
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  animation: shine 1s infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
