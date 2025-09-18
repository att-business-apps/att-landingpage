<script setup>
import { VueCompareImage } from 'vue3-compare-image'

// cassets
import sdLi from '@/assets/img/project/c7/sd-db-li.png'
import sdDr from '@/assets/img/project/c7/sd-db-dr.png'
import before from '@/assets/img/project/c7/before.png'
import after from '@/assets/img/project/c7/after.png'
</script>

<template>
    <div class="breadcrum-area breadcrumb-banner">
        <div class="container-fluid">
            <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
                <ul class="list-unstyled">
                    <li><a href="/">Home</a></li>
                    <li><a href="/portfolio">Portfolio</a></li>
                    <li class="active text-ly">SaveDesk</li>
                </ul>
                <div class="section-heading heading-left">
                    <div class="d-flex align-items-center">
                        <img src="../../assets/img/project/c7/icon-sd.png" alt="SaveDesk">
                        <h1 class="title h2 mb-0 ms-2">SaveDesk</h1>
                    </div>
                    <h5 class="mb-1 mt-3">FinTech (Financial Technology)</h5>
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
        <ul class="shape-group-8 list-unstyled">
            <li class="shape shape-2 sal-animate" data-sal="slide-left" data-sal-duration="500" data-sal-delay="200">
                <img src="../../assets/img/shapes/bubble-21.png" alt="circle">
            </li>
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
                            <b>SaveDesk</b>, a Bangalore-based FinTech company, helps businesses reduce banking costs
                            through smarter financial management. As part of their growth, they required a complete
                            redesign of their dashboard UI/UX to improve usability, data clarity, and user engagement.
                            The existing dashboard was functional but lacked intuitive navigation and modern design
                            appeal. Amortree Tech stepped in to reimagine the dashboard with a user-centric
                            approach—focusing on clarity, streamlined workflows, and engaging visuals. The outcome was a
                            modern interface that simplifies complex financial data, making cost optimization effortless
                            for users.
                        </p>
                        <div class="project-details">
                            <div class="detail-item mb-3">
                                <h5 class="title">Client</h5>
                                <p>White Matter Advisory India Pvt Ltd</p>
                            </div>
                            <div class="detail-item mb-3">
                                <h5 class="title">Services Provided</h5>
                                <p>User Research & Requirement Analysis, Information Architecture, Wireframing &
                                    High-Fidelity Prototypes, UI/UX Design, Design Handoff & Support</p>
                            </div>
                            <div class="detail-item mb-3">
                                <h5 class="title">Industry</h5>
                                <p>FinTech (Financial Technology), Banking Cost Optimization, Financial Management
                                    Solutions</p>
                            </div>
                            <div class="detail-item">
                                <h5 class="title">Live Website</h5>
                                <p><a href="https://live.savedesk.co/pages/login" target="_blank">live.savedesk.co</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="project-image">
                        <img src="../../assets/img/project/c7/project-sd.png" class="w-100 rounded"
                            alt="SaveDesk - FinTech Dashboard Redesign Project">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Our Process Section -->
    <section class="section section-padding bg-color-light">
        <div class="container">
            <div class="section-heading heading-center mb-5">
                <h2 class="title text-start">Before & After</h2>
                <div class="row">
                    <div class="col-12">
                        <div style="width: auto; height: auto;" class="mb-5">
                            <VueCompareImage :left-image="before" :right-image="after" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-heading heading-center mb-5">
                <h2 class="title text-start">Our Process</h2>
                <p class="text-start">At Amortree Tech, we partnered with SaveDesk to enhance user engagement and
                    usability by redesigning their dashboard UI/UX. Our process began with stakeholder discussions and
                    user research to understand the pain points in navigation and data interpretation. We then
                    restructured the information architecture, prioritizing clarity, financial insights, and ease of
                    access. Through iterative wireframes, prototypes, and design reviews, we created a modern, intuitive
                    interface with streamlined workflows and visual consistency. The redesigned dashboard ensures that
                    complex banking data is presented simply, empowering users to make faster, data-driven financial
                    decisions.</p>
            </div>

            <div class="row">
                <div class="col-12">
                    <img src="../../assets/img/project/c7/project-sd-widgets.png" class="img-fluid"
                        alt="SaveDesk - FinTech Dashboard Redesign Project">
                </div>

                <div class="my-5">
                    <VueCompareImage :left-image="sdLi" :right-image="sdDr" />
                </div>

                <div class="col-12">
                    <img src="../../assets/img/project/c7/project-sd-screen.png" class="img-fluid"
                        alt="SaveDesk - FinTech Dashboard Redesign Project">
                </div>
            </div>
        </div>
    </section>

    <!-- Result Section -->
    <section class="section section-padding">
        <div class="container">
            <div class="section-heading heading-center mb-5">
                <h2 class="title text-start">Result</h2>
                <p class="text-start">The redesigned SaveDesk dashboard brought a significant improvement in usability
                    and customer satisfaction. Users now experience seamless navigation, clearer data visualization, and
                    more accessible insights into banking costs. The simplified workflows help businesses quickly
                    identify areas of potential savings, aligning with SaveDesk’s mission of financial fairness. The
                    modern interface not only improves the overall user experience but also strengthens trust and brand
                    perception. While ongoing feedback continues to guide refinements, the new dashboard has already
                    positioned SaveDesk as a cutting-edge FinTech platform delivering tangible value to its clients.</p>
            </div>
            <div class="cta-buttons mt-5">
                <a href="/project/al-shamil-computers" class="amor-btn light"><i
                        class="icofont-rounded-double-left me-3" alt="Previous Project"></i>
                    Al-Shamil</a>
                <a href="/project/samsiddhi-designs" class="amor-btn light">Samsiddhi Designs <i
                        class="icofont-rounded-double-right ms-3" alt="Next Project"></i></a>
            </div>
        </div>
    </section>
</template>

<style scoped>
h2 {
    color: #2071B7;
    font-weight: 500;
}

.project-details .detail-item {
    border-left: 3px solid #2071B7;
    padding-left: 1rem;
}

.project-details .detail-item h5 {
    color: #2071B7;
    margin-bottom: 0.5rem;
}

.section-padding p {
    width: 100%;
}
</style>
