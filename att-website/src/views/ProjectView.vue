<template>
  <!-- Breadcrumb hero — untouched -->
  <div class="breadcrum-area breadcrumb-banner">
    <div class="container">
      <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
        <ul class="list-unstyled">
          <li><a href="/">Home</a></li>
          <li class="active text-lg">Case Study</li>
        </ul>
        <div class="section-heading heading-left" ref="heroTitle">
          <h1 class="title h2 mb-3">Real Projects. <span class="text-ly">Real Business Results.</span></h1>
          <p>
            Gain first-hand insight into how our processes come to life across
            every project we undertake.
          </p>
        </div>
      </div>
      <div class="banner-thumbnail">
        <div
          class="banner-motion-wrap"
          style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);"
        >
          <img
            ref="heroImage"
            src="../assets/img/amorboy/am-doing.png"
            class="w-75 animate__animated slideInRight"
            style="animation-duration: 3s"
            alt="Illustration"
          />
          <svg class="hero-svg-animation" viewBox="0 0 880 180" preserveAspectRatio="none" aria-hidden="true">
            <path
              ref="heroSvgPath"
              d="M10 140 C220 10 420 210 870 20"
              fill="none"
              stroke="rgba(255,255,255,0.34)"
              stroke-width="5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <ul class="shape-group-breadcrum-1 list-unstyled">
      <li class="shape shape-3 sal-animate" data-sal="slide-up" data-sal-duration="500" data-sal-delay="300">
        <img src="../assets/img/shapes/line-5.png" alt="" />
      </li>
    </ul>
  </div>

  <!-- Portfolio section -->
  <section class="pv-section">
    <div class="pv-container">

      <!-- Section header + filter -->
      <div class="pv-header" ref="sectionHeader">
        <div class="pv-header-left">
          <div class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
            <span class="text-ly">Our Work</span>
          </div>
          <h2 class="pv-header-title">
            Projects That <span class="text-ly">Shipped & Performed</span>
          </h2>
          <p class="pv-header-sub">
            <!-- {{ filteredProjects.length }} project{{ filteredProjects.length !== 1 ? 's' : '' }} — -->
            each one scoped, built, and measured against real business outcomes.
          </p>
        </div>

        <!-- Filter pills -->
        <div class="pv-filter" ref="filterBar">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="pv-filter-btn"
            :class="{ 'pv-filter-btn--active': activeCategory === cat }"
            @click="setCategory(cat)"
            @mouseenter="animateButton($event, 1.04)"
            @mouseleave="animateButton($event, 1)"
            ref="filterButtons"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Project cards -->
      <div class="pv-grid">
        <div
          class="pv-card"
          v-for="(item, index) in filteredProjects"
          :key="item.id"
          ref="projectCards"
        >
          <!-- Image -->
          <div class="pv-card-img-wrap">
            <div class="pv-card-glow"></div>
            <img :src="item.img" :alt="item.title" class="pv-card-img" />

            <!-- Number badge -->
            <div class="pv-card-num">{{ String(index + 1).padStart(2, '0') }}</div>

            <!-- Float info top-right -->
            <div class="pv-card-float">
              <!-- <div class="pv-card-float-title">{{ item.title }}</div> -->
              <!-- <div class="pv-card-float-sub">{{ item.subtitle }}</div> -->
              <a class="pv-card-float-cta" :href="item.href">
                View Case Study
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Glass content overlay bottom-left -->
          <div class="pv-card-content">
            <div class="pv-card-top">
              <span class="pv-card-label">{{ item.year }}</span>
              <span class="pv-card-role">{{ item.role }}</span>
            </div>

            <h3 class="pv-card-title">{{ item.title }}</h3>
            <p class="pv-card-desc">{{ item.subtitle }}</p>

            <div class="pv-card-chips">
              <span class="pv-chip" v-for="tag in item.categories" :key="tag">{{ tag }}</span>
            </div>

            <div class="pv-card-meta-row">
              <span class="pv-meta-pill">
                <span class="material-symbols-outlined">person</span>
                {{ item.client }}
              </span>
              <a :href="item.href" class="pv-meta-cta">
                Open project
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredProjects.length === 0" class="pv-empty">
        <span class="material-symbols-outlined pv-empty-icon">search_off</span>
        <p>No projects in this category yet.</p>
      </div>

    </div>

    <!-- CTA band -->
    <div class="pv-cta-band" ref="ctaBand">
      <div class="pv-cta-inner">
        <h2 class="pv-cta-title">
          Seen Enough to <span class="text-ly">Start a Conversation?</span>
        </h2>
        <p class="pv-cta-sub">
          A 20-minute call costs you nothing and tells you exactly what your project needs.
        </p>
        <div class="d-flex justify-content-center flex-wrap gap-3 mt-4">
          <a class="amor-btn btn-fill-primary btn-large"
            href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call.">
            Book Your Free Strategy Call
          </a>
          <a href="/estimate" class="amor-btn btn-borderd light">Get a Project Estimate</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Logo", "Branding", "UI/UX Design", "Website", "GMB"];
const activeCategory = ref("All");

const heroTitle    = ref(null);
const heroImage    = ref(null);
const heroSvgPath  = ref(null);
const sectionHeader = ref(null);
const filterBar    = ref(null);
const filterButtons = ref([]);
const projectCards  = ref([]);
const ctaBand       = ref(null);
let gsapContext;

const projects = ref([
  {
    id: "uae-links",
    title: "UAE Links",
    href: "project/uae-links",
    img: new URL("../assets/img/project/c1/project-thum-uaeLinks.png", import.meta.url).href,
    subtitle: "One Portal. Every UAE Government Service.",
    client: "Shajeer",
    year: "2024",
    role: "UI/UX Design & Web Strategy",
    categories: ["UI/UX Design", "Website Design", "Web Development"],
  },
  {
    id: "solved-cube",
    title: "SolvedCube IT Solutions",
    href: "project/solved-cube-it-solutions",
    img: new URL("../assets/img/project/c2/project-thum-sc.png", import.meta.url).href,
    subtitle: "Elevating an IT consulting brand with a modern digital presence.",
    client: "Sandeep",
    year: "2024",
    role: "Brand Identity, Web Strategy & Full-Stack Web Development",
    categories: ["Branding", "Logo", "UI/UX Design", "Website", "Web Development", "GMB"],
  },
  {
    id: "microrelic",
    title: "Microrelic Technologies",
    href: "project/microrelic",
    img: new URL("../assets/img/project/c3/project-thum-mr.png", import.meta.url).href,
    subtitle: "Transforming an IT consulting brand into a modern digital experience.",
    client: "Oruganti Sarma",
    year: "2023",
    role: "Brand Refresh, UI/UX & Web Strategy",
    categories: ["Branding", "Website", "Redesign", "GA", "UI/UX Design"],
  },
  {
    id: "steadyasset",
    title: "SteadyAsset",
    href: "project/steadyasset",
    img: new URL("../assets/img/project/c4/project-thum-sa.png", import.meta.url).href,
    subtitle: "Logo, Branding, UI/UX Design, Website, GMB, GA",
    client: "Menaka Reddy",
    year: "2024",
    role: "Design Systems & Growth",
    categories: ["Branding", "Logo", "UI/UX Design", "Website", "GMB"],
  },
  {
    id: "al-shamil",
    title: "Al-Shamil",
    href: "project/al-shamil-computers",
    img: new URL("../assets/img/project/c5/project-thum-als.png", import.meta.url).href,
    subtitle: "Empowering businesses with a modern digital presence for enterprise IT solutions.",
    client: "Shajeer",
    year: "2023",
    role: "Design Consultant, UI/UX Design, Web Development & Digital Strategy",
    categories: ["UI/UX Design", "Corporate Website", "Web Development", "Digital Strategy"],
  },
  {
    id: "savedesk",
    title: "SaveDesk",
    href: "project/savedesk",
    img: new URL("../assets/img/project/c7/project-thum-sd.png", import.meta.url).href,
    subtitle: "Designing a scalable customer support platform for modern enterprises.",
    client: "Kranthi Reddy",
    year: "2024",
    role: "Product Designer, Enterprise UI/UX Design & High-Fidelity Wireframing",
    categories: ["Product Design", "UI/UX Design", "SaaS Application", "Enterprise Dashboard"],
  },
  // {
  //   id: "visonverse",
  //   title: "VisonVerse Technology",
  //   href: "project/visonverse",
  //   img: new URL("../assets/img/project/c7/project-thum-vv.png", import.meta.url).href,
  //   subtitle: "Building a memorable technology brand from identity to local search visibility.",
  //   client: "Kavya",
  //   year: "2025",
  //   role: "Brand Identity Design & Google Business Profile Optimization",
  //   categories: ["Logo Design", "Brand Identity", "Google Business Profile","Local SEO"],
  // },
  {
    id: "samsiddhi-designs",
    title: "Samsiddhi Designs",
    href: "project/samsiddhi-designs",
    img: new URL("../assets/img/project/c9/project-thum-sd.png", import.meta.url).href,
    subtitle: "Logo, Branding, UI/UX Design, Website, GMB, GA",
    client: "Bharath Kumar",
    year: "2025",
    role: "Brand Experience",
    categories: ["Branding", "Logo", "UI/UX Design", "Website", "GMB"],
  },
  // {
  //   id: "al-shamil-dashboard",
  //   title: "Al-Shamil Dashboard",
  //   href: "project/al-shamil-dashboard",
  //   img: new URL("../assets/img/project/c9/project-thum-alsd.png", import.meta.url).href,
  //   subtitle: "Designing an enterprise dashboard that simplifies complex visa management workflows.",
  //   client: "Shajeer",
  //   year: "2025",
  //   role: "Brand Experience",
  //   categories: ["Dashboard Design", "Enterprise Application", "UI/UX Design", "Frontend Development"],
  // },
]);

const filteredProjects = computed(() => {
  if (activeCategory.value === "All") return projects.value;
  return projects.value.filter((p) => p.categories.includes(activeCategory.value));
});

const animateButton = (event, scale = 1.04) => {
  gsap.to(event.currentTarget, { scale, duration: 0.25, ease: "power2.out", overwrite: true });
};

const setCategory = (cat) => {
  activeCategory.value = cat;
};

const createScrollAnimations = () => {
  const cards = projectCards.value.filter(Boolean);
  cards.forEach((card) => {
    const img    = card.querySelector(".pv-card-img");
    const float  = card.querySelector(".pv-card-float");
    const content = card.querySelector(".pv-card-content");
    const glow   = card.querySelector(".pv-card-glow");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 88%", once: true },
    });

    tl.from(card, { y: 70, autoAlpha: 0, duration: 0.9, ease: "power3.out" })
      .from(img,    { scale: 1.06, autoAlpha: 0, duration: 1, ease: "power3.out" }, "-=0.75")
      .from(float,  { y: 20, autoAlpha: 0, duration: 0.85, ease: "power2.out" }, "-=0.75")
      .from(content,{ y: 16, autoAlpha: 0, duration: 0.8, ease: "power2.out" }, "-=0.7");

    // parallax
    // gsap.to(img, {
    //   yPercent: 10,
    //   ease: "none",
    //   scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.6 },
    // });

    // float bob
    if (float) {
      gsap.to(float, { y: -7, repeat: -1, yoyo: true, duration: 3.2, ease: "sine.inOut", delay: 1.5 });
    }

    // glow hover
    if (glow && !card.dataset.gsapHover) {
      card.dataset.gsapHover = "true";
      card.addEventListener("mouseenter", () => gsap.to(glow, { opacity: 1, duration: 0.4, ease: "power2.out" }));
      card.addEventListener("mouseleave", () => gsap.to(glow, { opacity: 0.7, duration: 0.55, ease: "power2.out" }));
    }
  });
};

const animatePage = async () => {
  await nextTick();
  gsapContext?.revert();
  gsapContext = gsap.context(() => {
    const heroH  = heroTitle.value?.querySelector("h1");
    const heroP  = heroTitle.value?.querySelector("p");
    const btns   = filterButtons.value.filter(Boolean);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (heroH)        tl.from(heroH, { y: 24, autoAlpha: 0, duration: 1 });
    if (heroP)        tl.from(heroP, { y: 16, autoAlpha: 0, duration: 0.9 }, "-=0.75");
    if (heroImage.value) tl.from(heroImage.value, { x: 60, y: 20, autoAlpha: 0, scale: 0.88, rotation: 3, duration: 1.1 }, "-=0.85");
    if (sectionHeader.value) tl.from(sectionHeader.value, { y: 24, autoAlpha: 0, duration: 0.85 }, "-=0.7");
    if (btns.length)  tl.from(btns, { y: 18, autoAlpha: 0, stagger: 0.07, duration: 0.75 }, "-=0.75");

    if (heroSvgPath.value) {
      gsap.fromTo(heroSvgPath.value,
        { strokeDasharray: 480, strokeDashoffset: 480 },
        { strokeDashoffset: 0, duration: 1.8, ease: "power1.out" }
      );
    }

    if (heroImage.value) {
      gsap.to(heroImage.value, {
        y: -18, ease: "none",
        scrollTrigger: { trigger: heroImage.value, start: "top bottom", end: "bottom top", scrub: 0.7 },
      });
    }

    if (ctaBand.value) {
      gsap.from(ctaBand.value, {
        y: 40, autoAlpha: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ctaBand.value, start: "top 82%", once: true },
      });
    }

    createScrollAnimations();
  });
};

onMounted(() => animatePage());

watch(activeCategory, async () => {
  await nextTick();
  animatePage();
  ScrollTrigger.refresh();
});

onBeforeUnmount(() => gsapContext?.revert());
</script>

<style lang="scss" scoped>

.text-ly {
      background: linear-gradient(270deg, var(--logo-light) 21.9%, var(--logo-green) 53.55%);
      background-size: 200% 200%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientShift 3s ease-in-out 2s;
    }

// ─── Section shell ────────────────────────────────────────────────────
.pv-section {
  background: #f8fafc;
  padding-bottom: 0;
}

.pv-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 5rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 3rem 1.25rem 2.5rem;
  }
}

// ─── Section header ───────────────────────────────────────────────────
.pv-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.pv-header-left {
  flex: 1;
  min-width: 280px;
}

.pv-header-title {
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 700;
  color: #0f172a;
  line-height: 1.15;
  margin-bottom: 0.6rem;
}

.pv-header-sub {
  font-size: 0.88rem;
  color: #64748b;
  margin: 0;
}

// ─── Filter pill bar ──────────────────────────────────────────────────
.pv-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 999px;
  padding: 0.4rem;

  @media (max-width: 768px) {
    border-radius: 16px;
    width: 100%;
  }
}

.pv-filter-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: none;
  cursor: pointer;
  background: transparent;
  color: #64748b;
  transition: background 0.25s ease, color 0.25s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(15, 23, 42, 0.05);
    color: #0f172a;
  }

  &--active {
    background: #0f172a;
    color: var(--logo-green);
    visibility: visible !important;
    opacity: 1 !important;
    transform: translate(0px, 0px) !important;

    &:hover {
      background: #0f172a;
      color: var(--logo-green);
    }
  }
}

// ─── Project grid ─────────────────────────────────────────────────────
.pv-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

// ─── Project card ─────────────────────────────────────────────────────
.pv-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 32px 80px rgba(8, 14, 30, 0.2);
  transition: box-shadow 0.4s ease;

  &:hover {
    box-shadow: 0 40px 100px rgba(8, 14, 30, 0.28);
  }
}

// ─── Image wrap ───────────────────────────────────────────────────────
.pv-card-img-wrap {
  position: relative;
  width: 100%;
  height: clamp(320px, 62vh, 680px);
  overflow: hidden;

  @media (max-width: 575px) {
    height: 250px;
  }
}

.pv-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.05) contrast(1.02);
  will-change: transform;
  transition: transform 0.6s ease;

  .pv-card:hover & {
    transform: scale(1.025);
  }
}

// dark vignette over image
.pv-card-img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(4,9,20,0.04) 0%, rgba(4,9,20,0.35) 100%),
    linear-gradient(90deg,  rgba(4,9,20,0.18) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

// ─── Glow overlay ─────────────────────────────────────────────────────
.pv-card-glow {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.7;
  mix-blend-mode: soft-light;
  filter: blur(1.5px);
  background:
    radial-gradient(circle at 16% 22%, rgba(92, 176, 77, 0.18), transparent 28%),
    radial-gradient(circle at 78% 60%, rgba(86, 189, 255, 0.14), transparent 26%);
}

// ─── Number badge ─────────────────────────────────────────────────────
.pv-card-num {
  position: absolute;
  top: 1.5rem;
  left: 1.75rem;
  z-index: 6;
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  backdrop-filter: blur(10px);
}

// ─── Float info card (top-right) ─────────────────────────────────────
.pv-card-float {
  position: absolute;
  top: 1.5rem;
  right: 1.75rem;
  z-index: 6;
  width: min(36%, 320px);
  padding: 1.35rem 1.5rem;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.14);
  box-shadow: 0 24px 60px rgba(0,0,0,0.28);
  backdrop-filter: blur(20px);

  @media (max-width: 768px) {
    display: none;
  }
}

.pv-card-float-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 0.45rem;
  line-height: 1.2;
}

.pv-card-float-sub {
  font-size: 0.8rem;
  color: rgba(226,232,255,0.7);
  line-height: 1.65;
  margin-bottom: 1rem;
}

.pv-card-float-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  width: 100%;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border-radius: 999px;
  background: var(--logo-green);
  color: #0f172a;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(92, 176, 77, 0.32);
    color: #0f172a;
  }

  svg {
    flex-shrink: 0;
  }
}

// ─── Glass content overlay (bottom-left) ─────────────────────────────
.pv-card-content {
  position: absolute;
  left: 1.75rem;
  bottom: 1.75rem;
  z-index: 6;
  width: min(56%, 660px);
  max-width: calc(100% - 3.5rem);
  padding: 1.5rem 1.75rem;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(10, 17, 34, 0.9), rgba(7, 12, 24, 0.82));
  border: 1px solid rgba(255,255,255,0.13);
  box-shadow: 0 20px 60px rgba(2,8,23,0.32);
  backdrop-filter: blur(18px);

  @media (max-width: 991px) {
    position: static;
    width: 100%;
    max-width: 100%;
    border-radius: 0 0 18px 18px;
    background: #0b1222;
    backdrop-filter: none;
    border: none;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
}

.pv-card-top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.pv-card-label {
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--logo-green);
  background: rgba(92, 176, 77, 0.12);
  border: 1px solid rgba(92, 176, 77, 0.22);
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
}

.pv-card-role {
  font-size: 0.78rem;
  color: rgba(226,232,255,0.65);
  font-weight: 500;
}

.pv-card-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.85rem;
}

.pv-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.28rem 0.65rem;
  border-radius: 7px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.16);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  backdrop-filter: blur(8px);

  &::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--logo-green);
    margin-right: 0.4rem;
    flex-shrink: 0;
  }
}

.pv-card-title {
  font-size: clamp(1.8rem, 2.8vw, 2.7rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin-bottom: 0.6rem;
}

.pv-card-desc {
  font-size: 0.85rem;
  color: rgba(220,228,255,0.8);
  line-height: 1.65;
  margin-bottom: 1rem;
  max-width: 86%;
}

.pv-card-meta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.pv-meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(220,228,255,0.75);
  font-size: 0.78rem;

  .material-symbols-outlined {
    font-size: 0.95rem;
  }
}

.pv-meta-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--logo-green);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: gap 0.25s ease;

  &:hover {
    gap: 0.6rem;
    color: var(--logo-green);
  }
}

// ─── Empty state ──────────────────────────────────────────────────────
.pv-empty {
  text-align: center;
  padding: 5rem 2rem;
  color: #94a3b8;

  .pv-empty-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
    color: #cbd5e1;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
}

// ─── CTA band ─────────────────────────────────────────────────────────
.pv-cta-band {
  margin-top: 5rem;
  padding: 6rem 2rem;
  background: #000000;
  text-align: center;
}

.pv-cta-inner {
  max-width: 680px;
  margin: 0 auto;
}

.pv-cta-title {
  font-size: clamp(1.9rem, 3.8vw, 2.9rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.pv-cta-sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.75;
}

// ─── Hero helpers (kept from original) ────────────────────────────────
.banner-motion-wrap {
  position: relative;
}

.hero-svg-animation {
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  height: 120px;
  pointer-events: none;
}
</style>