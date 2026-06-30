<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
    {
        icon: "storefront",
        title: "Custom Theme Development",
        desc: "Shopify themes built or modified to match your brand exactly — not a stock theme with your logo swapped in.",
    },
    {
        icon: "shopping_cart",
        title: "Conversion-Optimised Checkout",
        desc: "Product pages, cart, and checkout flows structured to reduce drop-off and increase completed purchases.",
    },
    {
        icon: "inventory_2",
        title: "Product & Catalog Setup",
        desc: "Collections, variants, metafields, and filtering configured so customers find what they're looking for, fast.",
    },
    {
        icon: "extension",
        title: "App Integration & Custom Features",
        desc: "Shopify apps selected and integrated cleanly, with custom functionality built where no app does the job well enough.",
    },
    {
        icon: "speed",
        title: "Performance & SEO Optimisation",
        desc: "Stores optimised for fast load times and search visibility, so traffic from ads and organic search actually converts.",
    },
    {
        icon: "devices",
        title: "Mobile-First Responsive Design",
        desc: "Tested across real devices and browsers, because most Shopify orders are completed on a phone, not a desktop.",
    },
];

const steps = [
    {
        num: "01",
        icon: "manage_search",
        title: "Discovery & Scoping",
        desc: "We review your products, goals, and current store (or start fresh) before recommending a theme approach or custom build.",
        week: "Week 1",
    },
    {
        num: "02",
        icon: "design_services",
        title: "Design & Theme Setup",
        desc: "Custom theme design or licensed theme customisation built around your brand and conversion goals.",
        week: "Week 1–3",
    },
    {
        num: "03",
        icon: "storefront",
        title: "Build & Integrate",
        desc: "Products configured, apps integrated, and custom features built — with a staging store for review before go-live.",
        week: "Week 3–5",
    },
    {
        num: "04",
        icon: "task_alt",
        title: "QA & Launch",
        desc: "End-to-end checkout testing across devices, then a clean handoff with training so you can manage it confidently.",
        week: "Week 5–6",
    },
];

const work = [
    {
        name: "SteadyAsset",
        tag: "Brand Identity · UI/UX · Website",
        metricVal: "8.44x",
        metricLabel: "ROAS",
        img: new URL("../../assets/img/project/c4/project-thum-sa.png", import.meta.url).href,
        href: "/project/steadyasset",
    },
    {
        name: "SaveDesk",
        tag: "Full Redesign · UI/UX",
        metricVal: "+42%",
        metricLabel: "Conversion",
        img: new URL("../../assets/img/project/c7/project-thum-sd.png", import.meta.url).href,
        href: "/project/savedesk",
    },
    {
        name: "Samsiddhi Designs",
        tag: "Brand Identity · UI/UX · Website",
        metricVal: "3.5x",
        metricLabel: "Pipeline",
        img: new URL("../../assets/img/project/c9/project-thum-sd.png", import.meta.url).href,
        href: "/project/samsiddhi-designs",
    },
];

const faqs = [
    {
        q: "How much does a Shopify store cost?",
        body: "Most Shopify builds fall between ₹75,000 and ₹4,00,000, depending on whether it's a custom theme or licensed theme customisation, the number of products, and the integrations required. We scope exact pricing after understanding your catalogue and goals.",
        note: "No fixed packages. Scope drives price, not the other way round.",
    },
    {
        q: "Should I use a custom theme or a licensed Shopify theme?",
        body: "Licensed themes (like Prestige or Dawn) are faster to build on and cost less upfront — they're the right choice for most stores. Custom themes make sense when your brand or UX requirements can't be achieved within a licensed theme's constraints.",
        note: "We'll recommend the right approach after reviewing your goals.",
    },
    {
        q: "How long does a Shopify build take?",
        body: "Most builds run 5–6 weeks from discovery to launch. Design and theme setup take 1–3 weeks, build and integration 2–3 weeks, with QA and launch in the final stretch.",
        note: "Timelines are agreed upfront and tracked at every milestone.",
    },
    {
        q: "Can you migrate my existing store to Shopify?",
        body: "Yes. We handle product, customer, and order data migrations from WooCommerce, Wix, or custom platforms, with URL redirects set up to protect any existing SEO before launch.",
        link: "/ecommerce-development",
        linkText: "See our broader ecommerce development service",
    },
];

let gsapContext;

function initFaqTabs() {
    const rail = document.querySelector(".sh-faq-rail");
    if (!rail) return;

    const tabs = rail.querySelectorAll(".sh-faq-tab");
    const answers = document.querySelectorAll(".sh-faq-answer");
    const stage = document.querySelector(".sh-faq-stage");
    let active = 0;

    const ticker = document.createElement("div");
    ticker.className = "sh-tab-ticker";
    rail.appendChild(ticker);

    function positionTicker(tab) {
        const railRect = rail.getBoundingClientRect();
        const tabRect = tab.getBoundingClientRect();
        gsap.to(ticker, {
            x: tabRect.left - railRect.left,
            width: tabRect.width,
            duration: 0.38,
            ease: "power3.out",
        });
    }

    function showAnswer(index) {
        if (index === active) return;
        const outEl = answers[active];
        gsap.to(outEl, {
            y: -10, autoAlpha: 0, duration: 0.22, ease: "power2.in",
            onComplete: () => outEl.classList.add("d-none"),
        });
        const inEl = answers[index];
        inEl.classList.remove("d-none");
        gsap.fromTo(inEl,
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.38, ease: "power3.out" }
        );
        gsap.fromTo(stage,
            { scaleX: 0.995, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.35, ease: "power2.out" }
        );
        tabs[active].classList.remove("sh-tab-active");
        tabs[active].setAttribute("aria-selected", "false");
        tabs[index].classList.add("sh-tab-active");
        tabs[index].setAttribute("aria-selected", "true");
        positionTicker(tabs[index]);
        active = index;
    }

    tabs.forEach((tab, i) => tab.addEventListener("click", () => showAnswer(i)));
    requestAnimationFrame(() => positionTicker(tabs[0]));
    window.addEventListener("resize", () => positionTicker(tabs[active]), { passive: true });
}

onMounted(() => {
    gsapContext = gsap.context(() => {
        gsap.utils.toArray(".sh-include-card").forEach((card, i) => {
            gsap.from(card, {
                y: 40, autoAlpha: 0, duration: 0.6, delay: (i % 3) * 0.07,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 88%", once: true },
            });
        });
        gsap.utils.toArray(".sh-work-card").forEach((card, i) => {
            gsap.from(card, {
                y: 40, autoAlpha: 0, duration: 0.65, delay: i * 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 88%", once: true },
            });
        });
        gsap.from(".sh-process-step", {
            y: 50, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: ".sh-process-steps", start: "top 80%", once: true },
        });
        gsap.from(".sh-faq-rail, .sh-faq-stage", {
            y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: ".sh-faq-section", start: "top 78%", once: true },
        });
        gsap.from(".sh-cta-inner", {
            y: 30, autoAlpha: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: ".sh-cta-section", start: "top 80%", once: true },
        });
    });
    initFaqTabs();
});

onBeforeUnmount(() => {
    gsapContext && gsapContext.revert();
});
</script>

<template>
    <div class="breadcrum-area breadcrumb-banner">
        <div class="container">
            <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
                <ul class="list-unstyled">
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li class="active text-ly">Shopify Development</li>
                </ul>
                <div class="section-heading heading-left">
                    <h1 class="title h2 mb-0">
                        Shopify Stores Built to <span class="text-ly">Convert, Not Just Look Good.</span>
                    </h1>
                    <p>
                        From custom theme development to catalogue setup and checkout optimisation — we build Shopify
                        stores that turn traffic into revenue.
                    </p>
                </div>
            </div>
            <div class="banner-thumbnail " style="right: 250px;bottom: 40px;">
                <div class=""
                    style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../../assets/img/amorboy/am-work.png" class="w-100 animate__animated slideInRight"
                        style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
    </div>

    <!-- What's Included -->
    <section class="sh-include-section">
        <div class="sh-include-inner">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
                <div>
                    <div
                        class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                        <span class="text-ly">What's Included</span>
                    </div>
                    <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
                        Every Shopify Build <span class="text-ly">Covers This</span>
                    </h2>
                </div>
                <p class="text-slate-800 max-w-sm mb-0 text-sm">
                    Every store is built with the same focus on conversion, performance, and usability — nothing
                    important is treated as an add-on.
                </p>
            </div>
            <div class="sh-include-grid">
                <div v-for="item in includes" :key="item.title" class="sh-include-card">
                    <div class="sh-include-icon">
                        <span class="material-symbols-outlined">{{ item.icon }}</span>
                    </div>
                    <h3 class="sh-include-title">{{ item.title }}</h3>
                    <p class="sh-include-desc">{{ item.desc }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Recent Work -->
    <section class="sh-work-section">
        <div class="sh-work-inner">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
                <div>
                    <div
                        class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                        <span class="text-ly">Recent Work</span>
                    </div>
                    <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
                        Stores That <span class="text-ly">Shipped & Sold</span>
                    </h2>
                </div>
                <a href="/case-studies" class="sh-work-link">View all case studies →</a>
            </div>
            <div class="sh-work-grid">
                <a v-for="item in work" :key="item.name" :href="item.href" class="sh-work-card">
                    <div class="sh-work-thumb">
                        <img :src="item.img" :alt="item.name" />
                    </div>
                    <div class="sh-work-body">
                        <div class="sh-work-tag">{{ item.tag }}</div>
                        <div class="sh-work-name">{{ item.name }}</div>
                        <div class="sh-work-metric">
                            <span class="sh-work-metric-val">{{ item.metricVal }}</span>
                            <span class="sh-work-metric-label">{{ item.metricLabel }}</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <!-- Process -->
    <section class="sh-process-section" id="process">
        <div class="sh-process-inner">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
                <div>
                    <div
                        class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                        <span class="text-ly">Our Process</span>
                    </div>
                    <h2 class="font-bold text-dark mb-0" style="font-weight: 600">
                        From First Brief to <span class="text-ly">Live Store</span>
                    </h2>
                </div>
                <p class="text-slate-500 max-w-sm mb-0 text-sm">
                    A defined sequence, not an open-ended back-and-forth — so you always know what happens
                    next and when.
                </p>
            </div>
            <div class="sh-process-steps">
                <div v-for="step in steps" :key="step.num" class="sh-process-step" :data-step="step.num">
                    <div class="sh-ps-icon">
                        <span class="material-symbols-outlined">{{ step.icon }}</span>
                    </div>
                    <div class="sh-ps-title">{{ step.title }}</div>
                    <div class="sh-ps-desc">{{ step.desc }}</div>
                    <div class="sh-ps-week">{{ step.week }}</div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="sh-faq-section" id="faq">
        <div class="sh-faq-inner">
            <div class="sh-faq-header">
                <div
                    class="inline-block py-2 px-4 rounded bg-dark text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                    <span class="text-ly">Common Questions</span>
                </div>
                <h2 class="font-bold text-dark mb-3" style="font-weight: 600">
                    Questions We Hear <span class="text-ly">Before a Project Starts</span>
                </h2>
                <p class="text-slate-500 max-w-md mx-auto mb-0 text-sm">
                    What clients usually want to know before committing to a Shopify project.
                </p>
            </div>
            <div class="sh-faq-rail" role="tablist" aria-label="Shopify development FAQ topics">
                <button v-for="(faq, i) in faqs" :key="faq.q" class="sh-faq-tab" :class="{ 'sh-tab-active': i === 0 }"
                    :data-tab="i" role="tab" :aria-selected="i === 0 ? 'true' : 'false'" aria-controls="sh-faq-stage">
                    <span class="sh-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
                    <span class="sh-tab-q">{{ ['Pricing', 'Theme Choice', 'Timeline', 'Migrations'][i] }}</span>
                </button>
            </div>
            <div class="sh-faq-stage" id="sh-faq-stage" role="tabpanel">
                <div v-for="(faq, i) in faqs" :key="faq.q + '-answer'" class="sh-faq-answer"
                    :class="{ 'd-none': i !== 0 }" :data-answer="i">
                    <h3 class="sh-answer-q">{{ faq.q }}</h3>
                    <p class="sh-answer-body">{{ faq.body }}</p>
                    <p v-if="faq.note" class="sh-answer-note">{{ faq.note }}</p>
                    <a v-if="faq.link" :href="faq.link" class="sh-answer-link">{{ faq.linkText }} &rarr;</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Closing CTA -->
    <section class="sh-cta-section">
        <div class="sh-cta-inner">
            <h2 class="sh-cta-title">
                Ready to Launch a Store That <span class="text-ly">Actually Converts?</span>
            </h2>
            <p class="sh-cta-sub">
                A 20-minute call costs you nothing and tells you exactly what your store needs to
                turn more visitors into paying customers.
            </p>
            <div class="d-flex justify-content-center flex-wrap gap-3 mt-5">
                <a class="amor-btn btn-fill-primary btn-large"
                    href="https://wa.me/917975859061/?text=I%27d%20like%20to%20book%20a%20free%20strategy%20call.">Book
                    Your Free Strategy Call</a>
                <a href="/estimate" class="amor-btn btn-borderd light">Get a Project Estimate</a>
            </div>
        </div>
    </section>
</template>

<style scoped>
.sh-include-section {
    padding: 6rem 4rem;
    background: #fff;
}

@media (max-width: 1100px) {
    .sh-include-section {
        padding: 4rem 2rem;
    }
}

@media (max-width: 768px) {
    .sh-include-section {
        padding: 3rem 1.25rem;
    }
}

.sh-include-inner {
    max-width: 1280px;
    margin: 0 auto;
}

.sh-include-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}

@media (max-width: 1024px) {
    .sh-include-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .sh-include-grid {
        grid-template-columns: 1fr;
    }
}

.sh-include-card {
    background: #f8fafc;
    border: 1px solid rgba(15, 23, 42, 0.06);
    border-radius: 16px;
    padding: 2rem;
    transition: transform 0.35s ease, box-shadow 0.35s ease;

    &:hover {
        transform: translateY(-6px) !important;
        box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);

        .sh-include-icon {
            background: rgba(250, 204, 21, 0.55);
        }
    }
}

.sh-include-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(250, 204, 21, 0.1);
    border: 1px solid rgba(250, 204, 21, 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0f172a;
    margin-bottom: 1.25rem;
}

.sh-include-icon .material-symbols-outlined {
    font-size: 1.35rem;
}

.sh-include-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.6rem;
}

.sh-include-desc {
    font-size: 0.86rem;
    color: #64748b;
    line-height: 1.7;
    margin-bottom: 0;
}

.sh-work-section {
    padding: 6rem 4rem;
    background: #f8fafc;
    border-top: 1px solid rgba(15, 23, 42, 0.05);
}

@media (max-width: 1100px) {
    .sh-work-section {
        padding: 4rem 2rem;
    }
}

@media (max-width: 768px) {
    .sh-work-section {
        padding: 3rem 1.25rem;
    }
}

.sh-work-inner {
    max-width: 1280px;
    margin: 0 auto;
}

.sh-work-link {
    font-size: 0.85rem;
    font-weight: 600;
    color: #0f172a;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.25s ease;
}

.sh-work-link:hover {
    color: #b45309;
}

.sh-work-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}

@media (max-width: 1024px) {
    .sh-work-grid {
        grid-template-columns: 1fr;
    }
}

.sh-work-card {
    display: block;
    text-decoration: none;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(15, 23, 42, 0.07);
    transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.sh-work-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
}

.sh-work-thumb {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #f1f5f9;
}

.sh-work-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.sh-work-card:hover .sh-work-thumb img {
    transform: scale(1.05);
}

.sh-work-body {
    padding: 1.5rem;
    background: #fff;
}

.sh-work-tag {
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #94a3b8;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.sh-work-name {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.75rem;
}

.sh-work-metric {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
}

.sh-work-metric-val {
    font-size: 1.1rem;
    font-weight: 900;
    color: #facc15;
    font-variant-numeric: tabular-nums;
}

.sh-work-metric-label {
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #94a3b8;
    font-weight: 600;
}

.sh-process-section {
    padding: 6rem 4rem;
    background: #fff;
}

@media (max-width: 1100px) {
    .sh-process-section {
        padding: 4rem 2rem;
    }
}

@media (max-width: 768px) {
    .sh-process-section {
        padding: 3rem 1.25rem;
    }
}

.sh-process-inner {
    max-width: 1280px;
    margin: 0 auto;
}

.sh-process-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(15, 23, 42, 0.07);
    border-radius: 16px;
    overflow: hidden;
}

@media (max-width: 900px) {
    .sh-process-steps {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .sh-process-steps {
        grid-template-columns: 1fr;
    }
}

.sh-process-step {
    background: #f8fafc;
    padding: 2.25rem 1.75rem;
    position: relative;
    overflow: hidden;
}

.sh-process-step::before {
    content: attr(data-step);
    position: absolute;
    top: -1rem;
    right: 1.1rem;
    font-size: 6rem;
    font-weight: 900;
    color: rgba(15, 23, 42, 0.04);
    line-height: 1;
    pointer-events: none;
    font-variant-numeric: tabular-nums;
}

.sh-ps-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(250, 204, 21, 0.1);
    border: 1px solid rgba(250, 204, 21, 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.75rem;
    color: #facc15;
    position: relative;
    z-index: 1;
}

.sh-ps-icon .material-symbols-outlined {
    font-size: 1.2rem;
}

.sh-ps-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.55rem;
    position: relative;
    z-index: 1;
}

.sh-ps-desc {
    font-size: 0.8rem;
    color: #64748b;
    line-height: 1.65;
    margin-bottom: 0.9rem;
    position: relative;
    z-index: 1;
}

.sh-ps-week {
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #94a3b8;
    font-weight: 600;
    position: relative;
    z-index: 1;
}

.sh-faq-section {
    padding: 6rem 1.5rem;
    background: #f8fafc;
    overflow: hidden;
}

@media (max-width: 768px) {
    .sh-faq-section {
        padding: 4rem 1.25rem;
    }
}

.sh-faq-inner {
    max-width: 860px;
    margin: 0 auto;
}

.sh-faq-header {
    margin-bottom: 3rem;
    text-align: center;
}

.sh-faq-rail {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
    padding-bottom: 1px;
    margin-bottom: 2rem;
    border-bottom: 2px solid #e2e8f0;
}

.sh-tab-ticker {
    position: absolute;
    bottom: -2px;
    left: 0;
    height: 2px;
    background: #facc15;
    border-radius: 2px;
    pointer-events: none;
    will-change: transform, width;
}

.sh-faq-tab {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
    padding: 0.75rem 1.25rem 0.9rem;
    background: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    transition: background 0.2s ease;
    border-radius: 0.5rem 0.5rem 0 0;
}

.sh-faq-tab:hover {
    background: rgba(250, 204, 21, 0.06);
}

.sh-faq-tab:hover .sh-tab-num {
    color: #facc15;
}

.sh-faq-tab:hover .sh-tab-q {
    color: #0f172a;
}

.sh-faq-tab.sh-tab-active .sh-tab-num {
    color: #facc15;
}

.sh-faq-tab.sh-tab-active .sh-tab-q {
    color: #0f172a;
    font-weight: 700;
}

.sh-tab-num {
    font-size: 0.6rem;
    font-weight: 900;
    letter-spacing: 0.15em;
    color: #94a3b8;
    text-transform: uppercase;
    line-height: 1;
    transition: color 0.2s ease;
}

.sh-tab-q {
    font-size: 0.8rem;
    font-weight: 500;
    color: #64748b;
    white-space: nowrap;
    transition: color 0.2s ease, font-weight 0.2s ease;
}

.sh-faq-stage {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 1.25rem;
    padding: 2.5rem;
    min-height: 220px;
    position: relative;
}

@media (max-width: 640px) {
    .sh-faq-stage {
        padding: 1.75rem;
    }
}

.sh-answer-q {
    font-size: 1.2rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1rem;
    line-height: 1.35;
}

.sh-answer-body {
    font-size: 0.92rem;
    line-height: 1.75;
    color: #475569;
    margin-bottom: 1rem;
}

.sh-answer-note {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94a3b8;
    margin: 0;
    padding-top: 1rem;
    border-top: 1px solid #f1f5f9;
}

.sh-answer-link {
    font-size: 0.85rem;
    font-weight: 600;
    color: #b45309;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.5rem;
    transition: gap 0.2s ease;
}

.sh-answer-link:hover {
    gap: 0.5rem;
}

.sh-cta-section {
    padding: 7rem 4rem;
    text-align: center;
}

@media (max-width: 1100px) {
    .sh-cta-section {
        padding: 5rem 2rem;
    }
}

@media (max-width: 768px) {
    .sh-cta-section {
        padding: 4rem 1.25rem;
    }
}

.sh-cta-inner {
    max-width: 700px;
    margin: 0 auto;
}

.sh-cta-title {
    font-size: clamp(2rem, 4.2vw, 3rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1.25rem;
}

.sh-cta-sub {
    font-size: 1rem;
    color: #64748b;
    line-height: 1.75;
}
</style>