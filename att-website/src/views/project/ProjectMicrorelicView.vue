<script setup>
import { VueCompareImage } from 'vue3-compare-image'

// cassets
import before from '@/assets/img/project/c3/before.png'
import after from '@/assets/img/project/c3/peoject-mr-web.png'
</script>

<template>
    <div class="breadcrum-area breadcrumb-banner">
        <div class="container-fluid">
            <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
                <ul class="list-unstyled">
                    <li><a href="/">Home</a></li>
                    <li><a href="/portfolio">Portfolio</a></li>
                    <li class="active text-ly">Microrelic Technologies</li>
                </ul>
                <div class="section-heading heading-left">
                    <div class="d-flex align-items-center">
                        <img src="../../assets/img/project/c3/icon-mr.svg" alt="Microrelic Technologies">
                        <h1 class="title h2 mb-0 ms-2">Microrelic </h1>
                    </div>
                    <h5 class="mb-1 mt-3">Digital Product Development</h5>
                </div>
            </div>
            <div class="banner-thumbnail ">
                <div class=""
                    style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../../assets/img/amorboy/am-doing-1.png" class="w-75 animate__animated slideInRight"
                        style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
        <ul class="shape-group-breadcrum-1 list-unstyled">
            <li class="shape shape-3 sal-animate" data-sal="slide-up" data-sal-duration="500" data-sal-delay="300">
                <img src="../../assets/img/shapes/line-5.png" alt="circle">
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
                        <p class="mb-4">
                            <strong>Microrelic</strong> is a digital products company delivering solutions across
                            Healthcare, Pharma/CRO, Education, and Supply Chain. The goal was to present clear value
                            propositions for services such as Web Development, Mobile Development, Progressive Web App
                            (PWA), Business Consultancy, Digital Marketing, and Training—grounded in social proof like
                            500+ projects, 50+ clients, and 5+ years of experience.
                        </p>
                        <div class="project-details">
                            <div class="detail-item mb-3">
                                <h5 class="title">Client</h5>
                                <p>Microrelic Technologies Pvt Ltd</p>
                            </div>
                            <div class="detail-item mb-3">
                                <h5 class="title">Services Provided</h5>
                                <p>Redesign, Website, UI/UX, Progressive Web App (PWA), Content Structure, On‑page SEO,
                                    GA</p>
                            </div>
                            <div class="detail-item mb-3">
                                <h5 class="title">Industry</h5>
                                <p>Healthcare, Pharma/CRO, Education, Supply Chain</p>
                            </div>
                            <div class="detail-item">
                                <h5 class="title">Live Website</h5>
                                <p><a href="https://microrelic.com/" target="_blank">microrelic.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="project-image">
                        <img src="../../assets/img/project/c3/project-mr.png" class="w-100 rounded"
                            alt="Microrelic Technologies - Complete Brand Identity and Web Development Project">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Our Process Section -->
    <section class="section section-padding bg-color-light">
        <div class="container">
            <div class="section-heading heading-center mb-5">
                <h2 class="title text-start">Our Process</h2>
                <p class="text-start">At Amortree Tech, we collaborated with Microrelic, a product-based company with a
                    vision to stand out through a unique style and design language. Our process began with brand
                    discovery, identifying core values and translating them into a distinctive visual identity. We then
                    worked on creating a consistent design system that reflects innovation while staying user-friendly.
                    For their product showcase, we developed a responsive website tailored to highlight features
                    elegantly. Each step—from branding to digital execution—focused on delivering originality,
                    scalability, and a memorable brand presence.</p>
            </div>

            <div class="row">
                <div class="col-12">
                    <h4 class="title text-start">Before & After</h4>
                    <div style="width: auto; height: auto;" class="mb-5">
                        <VueCompareImage :left-image="before" :right-image="after" />
                    </div>
                </div>
                <div class="col-12">
                    <img src="../../assets/img/project/c3/peoject-mr-mob.png" class="img-fluid"
                        alt="Microrelic Technologies Mobile View">
                </div>
            </div>
        </div>
    </section>

    <!-- Result Section -->
    <section class="section section-padding">
        <div class="container">
            <div class="section-heading heading-center mb-5">
                <h2 class="title text-start">Result</h2>
                <p class="text-start">The collaboration with Microrelic has already laid the foundation for a strong and
                    differentiated brand identity. The unique style developed through branding and design is helping the
                    company shape a memorable presence in the product-based market. Early prototypes of the website and
                    design system have received positive feedback for clarity and originality. With development and
                    refinements still in progress, the project is evolving toward a fully scalable platform that will
                    effectively showcase Microrelic’s products and strengthen its digital presence.</p>
            </div>
            <div class="cta-buttons mt-5">
                <a href="/project/solved-cube-it-solutions" class="amor-btn light"><i
                        class="icofont-rounded-double-left me-3"></i> Solved Cube</a>
                <a href="/project/steadyasset" class="amor-btn light">SteadyAsset <i
                        class="icofont-rounded-double-right ms-3"></i></a>
            </div>
        </div>
    </section>
</template>

<style scoped>
h2,
h4 {
    color: #9acdf6;
    font-weight: 500;
}

.project-details .detail-item {
    border-left: 3px solid #9acdf6;
    padding-left: 1rem;
}

.project-details .detail-item h5 {
    color: #9acdf6;
    margin-bottom: 0.5rem;
}

.section-padding p {
    width: 100%;
}
</style>
