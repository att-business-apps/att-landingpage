<template>
  <div class="breadcrum-area breadcrumb-banner">
    <div class="container-fluid">
      <div
        class="breadcrumb animate__animated fadeInUp"
        style="animation-duration: 2s"
      >
        <ul class="list-unstyled">
          <li><a href="/">Home</a></li>
          <li class="active text-lg">Case Study</li>
        </ul>
        <div class="section-heading heading-left" ref="heroTitle">
          <h1 class="title h2">Creative courage drives our story</h1>
          <p>
            Gain first-hand insight into how our processes come to life across
            every project we undertake.
          </p>
        </div>
      </div>
      <div class="banner-thumbnail">
        <div
          class="banner-motion-wrap"
          style="
            position: relative;
            will-change: transform;
            transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg)
              scale3d(1, 1, 1);
          "
        >
          <img
            ref="heroImage"
            src="../assets/img/amorboy/am-doing.png"
            class="w-75 animate__animated slideInRight"
            style="animation-duration: 3s"
            alt="Illustration"
          />
          <svg
            class="hero-svg-animation"
            viewBox="0 0 880 180"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
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
      <li
        class="shape shape-3 sal-animate"
        data-sal="slide-up"
        data-sal-duration="500"
        data-sal-delay="300"
      >
        <img src="../assets/img/shapes/line-5.png" alt="circle" />
      </li>
    </ul>
  </div>

  <section class="section section-padding">
    <div class="">
      <div class="row align-items-center justify-content-center">
        <div class="col">
          <div class="my-lg-5 my-4">
            <div class="att-filter">
              <button
                v-for="cat in categories"
                :key="cat"
                type="button"
                class="amor-btn"
                :class="
                  activeCategory === cat
                    ? 'btn-fill-primary'
                    : 'btn-borderd light'
                "
                @click="activeCategory = cat"
                @mouseenter="animateButton($event, 1.05)"
                @mouseleave="animateButton($event, 1)"
                ref="filterButtons"
              >
                {{ cat }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center d-none">
        <div class="col-xl-10">
          <div class="case-study-panel" ref="caseStudyPanel">
            <div class="case-study-tag">Case Study</div>
            <div class="case-study-grid">
              <div class="case-study-copy">
                <h2>Journey from concept to conversion</h2>
                <p>
                  Layered motion, polished UI details, and scroll-driven storytelling
                  help visitors feel the strategy behind every project.
                </p>
                <div class="case-study-stat-grid">
                  <div>
                    <strong>34%</strong>
                    <span>More engagement</span>
                  </div>
                  <div>
                    <strong>92%</strong>
                    <span>Project clarity</span>
                  </div>
                  <div>
                    <strong>8</strong>
                    <span>Animated touchpoints</span>
                  </div>
                </div>
              </div>
              <div class="case-study-base">
                <div class="case-study-base-title">Project Base Details</div>
                <ul class="case-study-base-list">
                  <li class="case-study-detail-item">
                    <strong>Client</strong>
                    <span>Premium digital brands</span>
                  </li>
                  <li class="case-study-detail-item">
                    <strong>Scope</strong>
                    <span>Branding, UI/UX, Website & Growth</span>
                  </li>
                  <li class="case-study-detail-item">
                    <strong>Duration</strong>
                    <span>6–10 weeks per sprint</span>
                  </li>
                  <li class="case-study-detail-item">
                    <strong>Impact</strong>
                    <span>Higher conversions and stronger retention</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row gy-5">
        <div class="col-12" v-for="item in filteredProjects" :key="item.id">
          <div class="project-grid h-100 project-grid--full" ref="projectCards">
            <div class="thumbnail">
              <div class="project-glow"></div>
              <img :src="item.img" alt="project" />
              <div class="project-info-float">
                <div class="project-info-float-title">{{ item.title }}</div>
                <div class="project-info-float-work">Work done: {{ item.subtitle }}</div>
                <a class="project-info-cta" :href="item.href">View Case Study</a>
              </div>
              <div class="content">
                <div class="project-card-top">
                  <span class="project-card-label">Featured</span>
                  <div class="project-card-meta">
                    <span class="project-card-year">{{ item.year }}</span>
                    <span class="project-card-role">{{ item.role }}</span>
                  </div>
                </div>
                <div class="project-chip-grid">
                  <span
                    class="project-chip"
                    v-for="tag in item.categories"
                    :key="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
                <h4 class="title project-card-title">{{ item.title }}</h4>
                <p class="project-description">{{ item.subtitle }}</p>
                <div class="project-base-list">
                  <span class="project-base-pill">Client: {{ item.client }}</span>
                  <span class="project-base-pill">Year: {{ item.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="shape-group-services list-unstyled">
      <li class="shape shape-3">
        <img src="../assets/img/shapes/bubble-14.png" alt="circle" />
      </li>
      <li class="shape shape-2">
        <img src="../assets/img/shapes/line-9.png" alt="Line" />
      </li>
      <li class="shape shape-2">
        <img src="../assets/img/shapes/bubble-2.png" alt="Line" />
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "All",
  "Logo",
  "Branding",
  "UI/UX Design",
  "Website",
  "GMB",
];

const activeCategory = ref("All");
const heroTitle = ref(null);
const heroImage = ref(null);
const heroSvgPath = ref(null);
const caseStudyPanel = ref(null);
const filterButtons = ref([]);
const projectCards = ref([]);
let gsapContext;

const projects = ref([
  {
    id: "uae-links",
    title: "UAE Links",
    href: "project/uae-links",
    arial: "UAE Links",
    img: new URL(
      "../assets/img/project/c1/project-thum-uaeLinks.png",
      import.meta.url,
    ).href,
    subtitle: "UI/UX Design, Website, GA",
    client: "UAE Links",
    year: "2024",
    role: "UX & Web Strategy",
    categories: ["UI/UX Design", "Website"],
  },
  {
    id: "solved-cube",
    title: "Solved Cude",
    href: "project/solved-cube-it-solutions",
    arial: "Solved Cude",
    img: new URL(
      "../assets/img/project/c2/project-thum-sc.png",
      import.meta.url,
    ).href,
    subtitle: "Logo, Branding, UI/UX Design, Website, GMB, GA",
    client: "Solved Cude",
    year: "2024",
    role: "Brand Identity & Web",
    categories: ["Branding", "Logo", "UI/UX Design", "Website", "GMB"],
  },
  {
    id: "microrelic",
    title: "Microrelic",
    href: "project/microrelic",
    arial: "Microrelic",
    img: new URL(
      "../assets/img/project/c3/project-thum-mr.png",
      import.meta.url,
    ).href,
    subtitle: "Branding, UI/UX Design, Website, Redesign, GA",
    client: "Microrelic",
    year: "2023",
    role: "Brand Refresh & UX",
    categories: ["UI/UX Design", "Website"],
  },
  {
    id: "steadyasset",
    title: "SteadyAsset",
    href: "project/steadyasset",
    arial: "SteadyAsset",
    img: new URL(
      "../assets/img/project/c4/project-thum-sa.png",
      import.meta.url,
    ).href,
    subtitle: "Logo, Branding, UI/UX Design, Website, GMB, GA",
    client: "SteadyAsset",
    year: "2024",
    role: "Design Systems & Growth",
    categories: ["Branding", "Logo", "UI/UX Design", "Website", "GMB"],
  },
  {
    id: "al-shamil",
    title: "Al-Shamil",
    href: "project/al-shamil-computers",
    arial: "Al-Shamil",
    img: new URL(
      "../assets/img/project/c5/project-thum-als.png",
      import.meta.url,
    ).href,
    subtitle: "UI/UX Design, Website, GA",
    client: "Al-Shamil",
    year: "2023",
    role: "Experience Design",
    categories: ["UI/UX Design", "Website"],
  },
  {
    id: "savedesk",
    title: "SaveDesk",
    href: "project/savedesk",
    arial: "SaveDesk",
    img: new URL(
      "../assets/img/project/c7/project-thum-sd.png",
      import.meta.url,
    ).href,
    subtitle: "Redesign, UI/UX Design, Wireframing, High-Fidelity Prototype",
    client: "SaveDesk",
    year: "2024",
    role: "Redesign & Prototype",
    categories: ["UI/UX Design"],
  },
  {
    id: "samsiddhi-designs",
    title: "Samsiddhi Designs",
    href: "project/samsiddhi-designs",
    arial: "Samsiddhi Designs",
    img: new URL(
      "../assets/img/project/c9/project-thum-sd.png",
      import.meta.url,
    ).href,
    subtitle: "Logo, Branding, UI/UX Design, Website, GMB, GA",
    client: "Samsiddhi Designs",
    year: "2024",
    role: "Brand Experience",
    categories: ["Branding", "Logo", "UI/UX Design", "Website", "GMB"],
  },
]);

const filteredProjects = computed(() => {
  if (activeCategory.value === "All") return projects.value;
  return projects.value.filter((p) =>
    p.categories.includes(activeCategory.value),
  );
});

const animateButton = (event, scale = 1.03) => {
  gsap.to(event.currentTarget, {
    scale,
    duration: 0.28,
    ease: "power2.out",
    overwrite: true,
  });
};

const createScrollAnimations = () => {
  const cards = projectCards.value.filter(Boolean);

  if (cards.length) {
    cards.forEach((card) => {
      const image = card.querySelector("img");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      });

      const floatCard = card.querySelector(".project-info-float");
      const cta = card.querySelector(".project-info-cta");
      const glow = card.querySelector(".project-glow");

      tl.from(card, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
      });
      if (image) {
        tl.from(
          image,
          {
            scale: 1.08,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.85",
        );
      }

      if (floatCard) {
        tl.from(
          floatCard,
          {
            y: 22,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8",
        );
      }

      if (cta) {
        tl.from(
          cta,
          {
            y: 18,
            opacity: 0,
            duration: 0.85,
            ease: "power2.out",
          },
          "-=0.7",
        );
      }

      if (image) {
        gsap.to(image, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      }

      if (cta) {
        gsap.to(cta, {
          y: -10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 3.1,
          delay: 1.4,
        });
      }

      if (floatCard) {
        gsap.to(floatCard, {
          y: -6,
          repeat: -1,
          yoyo: true,
          duration: 3.2,
          ease: "sine.inOut",
          delay: 1.6,
        });
      }

      if (!card.dataset.gsapHover && glow) {
        card.dataset.gsapHover = "true";

        card.addEventListener("mouseenter", () => {
          gsap.to(glow, {
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(glow, {
            opacity: 0.82,
            duration: 0.55,
            ease: "power2.out",
          });
        });
      }
    });
  }

  if (caseStudyPanel.value) {
    gsap.from(caseStudyPanel.value, {
      scrollTrigger: {
        trigger: caseStudyPanel.value,
        start: "top 85%",
        toggleActions: "play none none reverse",
        markers: false,
      },
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
    });
  }
};

const animatePage = async () => {
  await nextTick();
  gsapContext?.revert();
  gsapContext = gsap.context(() => {
    const buttons = filterButtons.value.filter(Boolean);
    const detailItems = caseStudyPanel.value?.querySelectorAll(
      ".case-study-detail-item",
    );

    const heroHeading = heroTitle.value?.querySelector("h1");
    const heroCopy = heroTitle.value?.querySelector("p");

    const pageTimeline = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    if (heroHeading) {
      pageTimeline.from(heroHeading, {
        y: 24,
        opacity: 0,
        scale: 0.98,
        duration: 1.1,
        ease: "power2.out",
      });
    }

    if (heroCopy) {
      pageTimeline.from(
        heroCopy,
        { y: 18, opacity: 0, duration: 0.95, ease: "power2.out" },
        "-=0.8",
      );
    }

    if (heroImage.value) {
      pageTimeline.from(
        heroImage.value,
        { x: 70, y: 28, opacity: 0, scale: 0.86, rotation: 4, duration: 1.2, ease: "power3.out" },
        "-=0.95",
      );
    }

    if (caseStudyPanel.value) {
      pageTimeline.from(caseStudyPanel.value, { y: 8, opacity: 0, duration: 1.05 }, "-=0.9");
    }

    if (buttons.length) {
      pageTimeline.from(buttons, { y: 20, opacity: 0, stagger: 0.08, duration: 0.85 }, "-=0.95");
    }

    if (detailItems?.length) {
      gsap.from(detailItems, {
        y: 14,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.1,
      });
    }

    if (heroSvgPath.value) {
      gsap.fromTo(
        heroSvgPath.value,
        { strokeDasharray: 480, strokeDashoffset: 480 },
        { strokeDashoffset: 0, duration: 1.8, ease: "power1.out" },
      );
    }

    if (heroImage.value) {
      gsap.to(heroImage.value, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: heroImage.value,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    }

    createScrollAnimations();
  });
};

onMounted(() => {
  animatePage();
});

watch(activeCategory, async () => {
  await nextTick();
  animatePage();
  ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
  gsapContext?.revert();
});
</script>

<style scoped>
.att-filter .amor-btn {
  padding: 0.475rem 2rem !important;
}
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
.hero-amorboy-image {
  width: 25%;
  max-width: 280px;
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  will-change: transform, opacity;
}
.case-study-panel {
  position: relative;
  padding: 2rem 2.25rem;
  margin-bottom: 3rem;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(18, 24, 44, 0.98), rgba(14, 18, 33, 0.94));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 38px 120px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(20px);
  overflow: hidden;
}
.case-study-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(117, 158, 255, 0.14), transparent 30%),
    radial-gradient(circle at bottom left, rgba(67, 58, 255, 0.12), transparent 22%);
  pointer-events: none;
}
.case-study-panel::before {
  content: "";
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  top: -80px;
  right: -90px;
  background: rgba(69, 184, 255, 0.14);
  pointer-events: none;
}
.case-study-tag {
  display: inline-flex;
  margin-bottom: 1rem;
  color: #7dd3fc;
  letter-spacing: 0.18em;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 700;
}
.case-study-panel h2 {
  font-size: clamp(2.4rem, 3vw, 3.4rem);
  margin-bottom: 1rem;
  line-height: 1.05;
}
.case-study-panel p {
  max-width: 780px;
  line-height: 1.85;
  color: #d6d9e8;
}
.case-study-stat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.8rem;
}
.case-study-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.5rem;
  align-items: start;
}
.case-study-copy {
  z-index: 1;
}
.case-study-base {
  background: rgba(14, 20, 44, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  padding: 1.75rem 1.85rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(20px);
}
.case-study-base-title {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #a6c5ff;
  margin-bottom: 1rem;
}
.case-study-base-title {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #90b7ff;
  margin-bottom: 1rem;
  font-weight: 700;
}
.case-study-base-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}
.case-study-base-list li {
  display: grid;
  gap: 0.35rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 22px;
  padding: 1rem 1.2rem;
}
.case-study-base-list li strong {
  display: block;
  color: #d8e2ff;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
}
.case-study-base-list li span {
  color: #e6e9ff;
  font-size: 0.92rem;
  line-height: 1.5;
}
.case-study-stat-grid div {
  padding: 1.15rem 1.25rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
}
.case-study-stat-grid strong {
  display: block;
  font-size: 2rem;
  color: #ffffff;
}
.case-study-stat-grid span {
  display: block;
  margin-top: 0.35rem;
  color: #bbc1dc;
  font-size: 0.95rem;
}
.project-grid.project-grid--full {
  min-height: 66vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  transform-origin: center center;
}
.project-grid.project-grid--full .thumbnail {
  min-height: 66vh;
  max-height: 66vh;
  overflow: hidden;
  border-radius: 1.35rem;
  position: relative;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: #111827;
  box-shadow: 0 34px 90px rgba(8, 14, 30, 0.22);
  transform: none !important;
}
.project-grid.project-grid--full .thumbnail::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(4, 9, 20, 0.2) 0%, rgba(4, 9, 20, 0.08) 42%, rgba(4, 9, 20, 0.08) 100%),
    linear-gradient(180deg, rgba(4, 9, 20, 0.06) 0%, rgba(4, 9, 20, 0.22) 100%);
}
.project-grid.project-grid--full .thumbnail img {
  width: 100%;
  height: 66vh;
  object-fit: cover;
  display: block;
  border-radius: inherit;
  filter: saturate(1.04) contrast(1.02);
  transform: none;
}
.project-grid.project-grid--full {
  perspective: 1000px;
  transform-style: preserve-3d;
}
.project-grid.project-grid--full .thumbnail {
  transform-style: preserve-3d;
}
.project-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  background: radial-gradient(circle at 18% 24%, rgba(86, 189, 255, 0.22), transparent 30%),
    radial-gradient(circle at 75% 38%, rgba(255, 184, 108, 0.16), transparent 24%);
  opacity: 0.82;
  mix-blend-mode: soft-light;
  filter: blur(1.4px);
  transform: translate3d(0, 0, 0);
}
.project-grid.project-grid--full .thumbnail .content {
  position: absolute;
  left: clamp(1rem, 4vw, 3rem);
  top: auto;
  bottom: clamp(1rem, 4vw, 3rem);
  width: min(58%, 720px);
  max-width: calc(100% - 2rem);
  min-height: auto;
  padding: clamp(1.15rem, 2.4vw, 2rem);
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: #ffffff;
  text-align: left;
  overflow: visible;
  border-radius: 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: linear-gradient(180deg, rgba(11, 18, 34, 0.88), rgba(7, 12, 24, 0.78));
  box-shadow: 0 24px 70px rgba(2, 8, 23, 0.36);
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
  transform: translate3d(0, 0, 0);
  opacity: 1 !important;
}
.project-grid.project-grid--full .project-card-top,
.project-grid.project-grid--full .project-chip-grid,
.project-grid.project-grid--full .project-card-title,
.project-grid.project-grid--full .project-description,
.project-grid.project-grid--full .project-base-list {
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;
}
.project-grid.project-grid--full:hover .thumbnail {
  transform: none !important;
}
.project-grid.project-grid--full:hover .thumbnail img {
  transform: none !important;
}
.project-grid.project-grid--full:hover .thumbnail .content {
  transform: translate3d(0, 0, 0) !important;
}
.project-info-float {
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: min(38%, 340px);
  padding: 1.4rem 1.5rem;
  border-radius: 28px;
  background: rgba(8, 16, 36, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(20px);
  z-index: 6;
}
.project-info-float-title {
  font-size: 1.3rem;
  line-height: 1.1;
  color: #eef2ff;
  margin-bottom: 0.7rem;
  font-weight: 700;
}
.project-info-float-work {
  color: rgba(226, 232, 255, 0.88);
  font-size: 0.92rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}
.project-info-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.95rem 1.3rem;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(77, 139, 255, 0.98), rgba(148, 92, 255, 0.98));
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.01em;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.project-info-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(77, 139, 255, 0.28);
}
.project-card-top {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  margin-bottom: 0.85rem;
}
.project-card-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #d2e8ff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.project-card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  text-align: left;
}
.project-card-year,
.project-card-role {
  font-size: 0.9rem;
  color: rgba(226, 232, 255, 0.88);
}
.project-card-title {
  font-size: clamp(2.25rem, 3vw, 3rem);
  letter-spacing: 0;
  margin-bottom: 1rem;
  color: #ffffff;
  line-height: 1.06;
}
.project-description {
  margin-top: 0.55rem;
  margin-bottom: 1.05rem;
  color: rgba(236, 239, 255, 0.9);
  line-height: 1.7;
  max-width: 88%;
}
.project-base-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.15rem;
}
.project-base-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #d7e3ff;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}
.project-base-list span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.project-grid.project-grid--full .thumbnail .content .project-action {
  margin-top: 1.5rem;
}
.project-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.45rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.16);
  font-weight: 700;
  letter-spacing: 0.01em;
  transition: transform 0.28s ease, background 0.28s ease, box-shadow 0.28s ease;
}
.project-cta:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
}
.project-grid.project-grid--full .thumbnail img {
  will-change: transform, opacity;
}
.project-chip-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  width: 100%;
  margin: 0 0 1rem;
  position: relative;
  z-index: 7;
  opacity: 1;
  visibility: visible;
}
.project-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
  padding: 0.42rem 0.78rem;
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.project-grid {
  transition: box-shadow 0.35s ease;
}
.project-grid:hover {
  box-shadow: 0 30px 72px rgba(0, 0, 0, 0.18);
}
.att-filter button {
  transition: transform 0.24s ease, box-shadow 0.24s ease;
}
.att-filter button:hover,
.att-filter button:focus {
  transform: translateY(-2px);
}
@media (max-width: 991.98px) {
  .case-study-stat-grid {
    grid-template-columns: 1fr;
  }
  .project-grid.project-grid--full {
    min-height: auto;
  }
  .project-grid.project-grid--full .thumbnail {
    min-height: auto;
    max-height: none;
  }
  .project-grid.project-grid--full .thumbnail img {
    height: auto;
    max-height: 70vh;
  }
  .project-grid.project-grid--full .thumbnail .content {
    position: static;
    width: auto;
    max-width: 100%;
    margin: 0 auto;
    transform: none;
    padding: 1.5rem;
    border-radius: 0;
    background: #0b1222;
  }
  .case-study-grid {
    grid-template-columns: 1fr;
  }
  .case-study-base {
    margin-top: 1.75rem;
  }
  .project-info-float {
    position: static;
    width: 100%;
    right: auto;
    top: auto;
    margin-top: 1.5rem;
    background: rgba(8, 16, 36, 0.98);
  }
}
</style>
