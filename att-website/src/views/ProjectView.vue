<template>

  <div class="breadcrum-area breadcrumb-banner">
    <div class="container-fluid">
      <div class="breadcrumb">
        <ul class="list-unstyled">
          <li><a href="/">Home</a></li>
          <li class="active">Portfolio</li>
        </ul>
        <div class="section-heading heading-left">
          <h1 class="title h2">Creative courage drives our story</h1>
          <p>Gain first-hand insight into how our processes come to life across every project we undertake.</p>
        </div>
      </div>
      <div class="banner-thumbnail">
        <div class=""
          style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
          <img src="../assets/img/amorboy/am-doing.png" class="w-75 animate__animated slideInRight"
            style="animation-duration: 3s" alt="Illustration" />
        </div>
      </div>
    </div>
    <ul class="shape-group-8 list-unstyled">
      <li class="shape shape-2 sal-animate" data-sal="slide-left" data-sal-duration="500" data-sal-delay="200">
        <img src="../assets/img/shapes/bubble-21.png" alt="circle">
      </li>
      <li class="shape shape-3 sal-animate" data-sal="slide-up" data-sal-duration="500" data-sal-delay="300">
        <img src="../assets/img/shapes/line-5.png" alt="circle">
      </li>
    </ul>
  </div>

  <section class="section section-padding">
    <div class="containe">
      <div class="row align-items-center justify-content-center">
        <div class="col">
          <div class="my-lg-5 my-4">
            <div class="att-filter">
              <button v-for="cat in categories" :key="cat" type="button" class="amor-btn"
                :class="activeCategory === cat ? 'btn-fill-primary' : 'btn-borderd light'"
                @click="activeCategory = cat">
                {{ cat }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6" v-for="item in filteredProjects" :key="item.id">
          <div class="project-grid h-100">
            <div class="thumbnail">
              <a :href="item.href">
                <img :src="item.img" alt="project">
              </a>
            </div>
            <div class="content">
              <h4 class="title"><a :href="item.href">{{ item.title }}</a></h4>
              <span class="subtitle">{{ item.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="shape-group-7 list-unstyled">
      <li class="shape shape-3"><img src="../assets/img/shapes/bubble-14.png" alt="circle"></li>
      <li class="shape shape-2"><img src="../assets/img/shapes/line-9.png" alt="Line"></li>
      <li class="shape shape-2"><img src="../assets/img/shapes/bubble-2.png" alt="Line"></li>
    </ul>
  </section>

</template>

<script setup>
import { ref, computed } from "vue";


const categories = [
  "All",
  "Logo",
  "Branding",
  "UI/UX Design",
  "Website",
  "GMB",
];

const activeCategory = ref("All");

const projects = ref([
  {
    id: "uae-links",
    title: "UAE Links",
    href: "project/uae-links",
    img: new URL("../assets/img/project/c1/project-thum-uaeLinks.png", import.meta.url).href,
    subtitle: "UI/UX Design, Website, Google Analytics Integration",
    categories: ["UI/UX Design", "Website"],
  },
  {
    id: "solved-cube",
    title: "Solved Cude",
    href: "project/solved-cube-it-solutions",
    img: new URL("../assets/img/project/c2/project-thum-sc.png", import.meta.url).href,
    subtitle: "Logo, Branding, UI/UX Design, Website, GMB",
    categories: ["Branding", "Logo", "UI/UX Design", "Website", "GMB"],
  },
  {
    id: "microrelic",
    title: "Microrelic",
    href: "project/microrelic",
    img: new URL("../assets/img/project/c3/project-thum-mr.png", import.meta.url).href,
    subtitle: "Branding, UI/UX Design, Website, GMB",
    categories: ["UI/UX Design", "Website", "GMB"],
  },
  {
    id: "steadyasset",
    title: "SteadyAsset",
    href: "project/steadyasset",
    img: new URL("../assets/img/project/c4/project-thum-sa.png", import.meta.url).href,
    subtitle: "Logo, Branding, UI/UX Design, Website, GMB",
    categories: ["Branding", "Logo", "UI/UX Design", "Website", "GMB"],
  },
  {
    id: "al-shamil",
    title: "Al-Shamil",
    href: "project/al-shamil-computers",
    img: new URL("../assets/img/project/c5/project-thum-als.png", import.meta.url).href,
    subtitle: "UI/UX Design, Website",
    categories: ["UI/UX Design", "Website"],
  },
  {
    id: "savedesk",
    title: "SaveDesk",
    href: "project/savedesk",
    img: new URL("../assets/img/project/c7/project-thum-sd.png", import.meta.url).href,
    subtitle: "UI/UX Design, Information Architecture, Wireframing, High-Fidelity Prototypes",
    categories: ["UI/UX Design"],
  },
  {
    id: "samsiddhi-designs",
    title: "Samsiddhi Designs",
    href: "project/samsiddhi-designs",
    img: new URL("../assets/img/project/c9/project-thum-sd.png", import.meta.url).href,
    subtitle: "Logo, Branding, UI/UX Design, Website, GMB",
    categories: ["Branding", "Logo", "UI/UX Design", "Website", "GMB"],
  },
]);

const filteredProjects = computed(() => {
  if (activeCategory.value === "All") return projects.value;
  return projects.value.filter((p) => p.categories.includes(activeCategory.value));
});
</script>
