<script setup>
import { VueCompareImage } from "vue3-compare-image";
import CaseStudyWorkWithUs from "@/components/CaseStudyWorkWithUs.vue";

// cassets
import uaeLi from "@/assets/img/project/c1/uae-li.png";
import uaeDr from "@/assets/img/project/c1/uae-dr.png";
</script>

<template>
  <div class="breadcrum-area breadcrumb-banner">
    <div class="container-fluid">
      <div
        class="breadcrumb animate__animated fadeInUp"
        style="animation-duration: 2s"
      >
        <ul class="list-unstyled">
          <li><a href="/">Home</a></li>
          <li><a href="/case-studies">Case Study</a></li>
          <li class="active text-ly">VisionVerse Technology</li>
        </ul>
        <div class="section-heading heading-left">
          <div class="d-flex align-items-center">
            <img src="../../assets/img/project/c5/icon-als.svg" alt="circle" />
            <h1 class="title h2 mb-0 ms-2">VisionVerse Technology</h1>
          </div>
          <h5 class="mb-1 mt-3">IT Solutions & Services</h5>
        </div>
      </div>
      <div class="banner-thumbnail">
        <div
          class=""
          style="
            position: relative;
            will-change: transform;
            transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg)
              scale3d(1, 1, 1);
          "
        >
          <img
            src="../../assets/img/amorboy/am-doing-1.png"
            class="w-75 animate__animated slideInRight"
            style="animation-duration: 3s"
            alt="Illustration"
          />
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
        <img src="../../assets/img/shapes/line-5.png" alt="circle" />
      </li>
    </ul>
  </div>

  <!-- Project Overview Section -->
  <section class="section section-padding">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="project-overview">
            <h2 class="title mb-4">Project Overview</h2>
            <h4>Modern Brand Identity Design</h4>
            <p class="mb-4">
              Crafted a clean, modern, and memorable logo that reflects VisionVerse's technology-driven vision. The identity focuses on simplicity, scalability, and strong brand recognition across digital platforms, office branding, and marketing materials.
            </p>
            <div class="project-details">
              <div class="detail-item mb-3">
                <h5 class="title">Client</h5>
                <p>VisonVerse Technology</p>
              </div>
              <div class="detail-item mb-3">
                <h5 class="title">Services Provided</h5>
                <p>Logo & GMB</p>
              </div>
              <div class="detail-item mb-3">
                <h5 class="title">Technology</h5>
                <p>Adobe Illustration & GMB </p>
              </div>
              <div class="detail-item">
                <h5 class="title">Live Website</h5>
                <p>
                  <a
                    href="https://alshamil.it/"
                    target="_blank"
                    class="text-primary"
                    >alshamil.it</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="project-image">
            <img
              src="../../assets/img/project/c5/project-als.png"
              class="w-100 rounded"
              alt="Al‑Shamil Computers IT Services Website"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-padding bg-color-light">
    <div class="container">
      <div class="section-heading heading-center mb-5">
        <h2 class="title text-start">Our Process</h2>
        <p class="text-start">
          At Amortree Tech, we built UAE Links as a unified gateway to essential
          UAE government services. Our process began with research and
          requirement analysis, identifying user pain points and key categories
          like Labour, Visa, Pension, and Medical Fitness. We then designed a
          clean information architecture, wireframed navigation, and created a
          minimalist, responsive interface for quick access. Development focused
          on speed, security, and seamless linking to official portals. After
          rigorous usability testing, we launched the platform with GA, enabling
          data-driven enhancements. The result is a simple, reliable, and
          scalable digital hub.
        </p>
      </div>

      <div class="row">
        <div class="col">
          <div style="width: auto; height: auto">
            <VueCompareImage :left-image="uaeLi" :right-image="uaeDr" />
          </div>

          <img
            src="../../assets/img/project/c1/project-uae-mob.png"
            class="img-fluid rounded mt-5"
            alt="UAE Links Mobile View - Responsive Government Portal Design"
          />
        </div>
      </div>
    </div>
  </section>

  <CaseStudyWorkWithUs
    project="VisonVerse Technology"
    industry="IT solutions, AI/ML and services"
    accent="#f59e0b"
    result="A stronger service brand experience that presents IT capability with clarity, consistency, and sales confidence."
    :services="['Logo refresh', 'Website design', 'Brand collateral', 'Responsive UI']"
    :proof="['Modern IT service positioning', 'Consistent brand assets', 'Better enquiry journey']"
  />
</template>

<style scoped>
h2 {
  color: #0760CE;
  font-weight: 500;
}

.project-details .detail-item {
  border-left: 3px solid #0760CE;
  padding-left: 1rem;
}

.project-details .detail-item h5 {
  color: #0760CE;
  margin-bottom: 0.5rem;
}

.section-padding p {
  width: 100%;
}
</style>
