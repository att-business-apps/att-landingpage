<script setup>
import { onMounted, ref, computed } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ── Post data ────────────────────────────────────────────────────────────────
// Replace / extend this list as you publish. `link` should match your router path.
const posts = ref([
  {
    slug: "website-losing-customers",
    title: "7 Signs Your Website Is Losing You Customers",
    excerpt:
      "It's rarely just 'looking dated.' Seven concrete, checkable signs your website is actively costing you leads — and what to fix first.",
    category: "Strategy",
    date: "2026-07-20",
    dateLabel: "Jul 20, 2026",
    readTime: "8 min read",
    featured: true,
    link: "/blog/website-losing-customers",
  },
  {
    slug: "freelancer-vs-design-studio-vs-agency",
    title: "Freelancer vs. Design Studio vs. Agency: Who Should Build Your Website?",
    excerpt:
      "A practical guide to choosing between a freelancer, a boutique design studio, or a large agency for your business website — matched to budget, timeline, and what you actually need.",
    category: "Strategy",
    date: "2026-07-20",
    dateLabel: "Jul 2, 2026",
    readTime: "6 min read",
    featured: false,
    link: "/blog/freelancer-vs-design-studio-vs-agency",
  },
  {
    slug: "how-much-does-a-website-cost-in-india",
    title: "How Much Does a Website Really Cost in 2026?",
    excerpt:
      "A transparent, no-fluff pricing guide — what actually drives the cost, how the build process works, and how to budget without overpaying.",
    category: "Pricing",
    date: "2026-07-20",
    dateLabel: "Jun 20, 2026",
    readTime: "9 min read",
    featured: false,
    link: "/blog/how-much-does-a-website-cost-in-india",
  },
  {
    slug: "signs-you-need-a-website-redesign",
    title: "7 Signs Your Website Is Quietly Costing You Customers",
    excerpt:
      "Slow load times and confusing navigation don't just annoy visitors — they show up directly in your enquiry numbers. Here's what to check first.",
    category: "Strategy",
    date: "2026-06-12",
    dateLabel: "May 12, 2026",
    readTime: "6 min read",
    featured: false,
    link: "/blog/signs-you-need-a-website-redesign",
  },
  {
    slug: "seo-basics-small-business-india",
    title: "SEO Basics Every Small Business in India Should Get Right",
    excerpt:
      "You don't need a huge budget to rank locally. These are the fundamentals that move the needle before you spend a rupee on ads.",
    category: "SEO",
    date: "2026-05-28",
    dateLabel: "Apr 28, 2026",
    readTime: "8 min read",
    featured: false,
    link: "/blog/seo-basics-small-business-india",
  },
  {
    slug: "landing-page-vs-full-website",
    title: "Landing Page vs. Full Website: Which Do You Actually Need?",
    excerpt:
      "One converts a single offer. The other builds long-term authority. Picking the wrong one wastes both time and budget.",
    category: "Strategy",
    date: "2026-05-09",
    dateLabel: "Mar 9, 2026",
    readTime: "5 min read",
    featured: false,
    link: "/blog/landing-page-vs-full-website",
  },
  {
    slug: "whatsapp-lead-gen-for-local-business",
    title: "Turning WhatsApp Into Your Best Lead Gen Channel",
    excerpt:
      "For local and service businesses in India, a WhatsApp-first contact flow often outperforms a traditional contact form. Here's how to set it up right.",
    category: "Growth",
    date: "2026-04-22",
    dateLabel: "Feb 22, 2026",
    readTime: "7 min read",
    featured: false,
    link: "/blog/whatsapp-lead-gen-for-local-business",
  },
  {
    slug: "website-red-flags-before-hiring",
    title: "12 Website Red Flags to Check Before You Hire Anyone",
    excerpt:
      "Hiring a web designer or agency? Learn the 12 warning signs that can save you from costly mistakes, poor-quality websites, and disappointing results.",
    category: "Web Design",
    date: "2026-04-28",
    dateLabel: "Feb 4, 2026",
    readTime: "7 min read",
    featured: false,
    link: "/blog/website-red-flags-before-hiring",
  },
  {
    slug: "how-long-should-a-website-take-to-build",
    title: "How Long Should a Website Actually Take to Build?",
    excerpt:
      "Real timelines for landing pages, multi-page sites, and custom builds — what determines how long it takes, what slows projects down, and how to read a timeline quote.",
    category: "Pricing",
    date: "2026-04-03",
    dateLabel: "Jan 24, 2026",
    readTime: "7 min read",
    featured: false,
    link: "/blog/how-long-should-a-website-take-to-build",
  },
  {
    slug: "before-you-hire-a-web-designer",
    title: "12 Questions to Ask Before You Hire a Web Designer",
    excerpt:
      "The right questions upfront save you from vague quotes, missed deadlines, and a site you don't actually own.",
    category: "Pricing",
    date: "2026-04-03",
    dateLabel: "Jan 3, 2026",
    readTime: "6 min read",
    featured: false,
    link: "/blog/before-you-hire-a-web-designer",
  },
]);

const categories = computed(() => {
  const set = new Set(posts.value.map((p) => p.category));
  return ["All", ...set];
});

const activeCategory = ref("All");

const filteredPosts = computed(() => {
  const rest = posts.value.filter((p) => !p.featured);
  if (activeCategory.value === "All") return rest;
  return rest.filter((p) => p.category === activeCategory.value);
});

const featuredPost = computed(() => posts.value.find((p) => p.featured));

function setCategory(cat) {
  activeCategory.value = cat;
}

onMounted(() => {
  gsap.from(".att-blog-idx-eyebrow", { autoAlpha: 0, y: 16, duration: 0.6, ease: "power3.out", delay: 0.1 });
  gsap.from(".att-blog-idx-title", { autoAlpha: 0, y: 28, duration: 0.75, ease: "power3.out", delay: 0.2 });
  gsap.from(".att-blog-idx-dek", { autoAlpha: 0, y: 14, duration: 0.6, ease: "power2.out", delay: 0.35 });

  gsap.from(".att-blog-idx-featured", {
    autoAlpha: 0, y: 24, duration: 0.7, ease: "power2.out", delay: 0.15,
    scrollTrigger: { trigger: ".att-blog-idx-featured", start: "top 90%", once: true },
  });

  gsap.utils.toArray(".att-blog-idx-card").forEach((card, i) => {
    gsap.from(card, {
      autoAlpha: 0, y: 20, duration: 0.55, ease: "power2.out", delay: (i % 3) * 0.08,
      scrollTrigger: { trigger: card, start: "top 92%", once: true },
    });
  });
});
</script>

<template>
  <main class="att-blog-idx-page">

    <!-- Hero -->
    <div class="breadcrum-area breadcrumb-banner">
      <div class="att-blog-idx-hero">
        <div class="att-blog-idx-hero-grid" aria-hidden="true"></div>
        <div class="att-blog-idx-hero-glow" aria-hidden="true"></div>
        <div class="att-blog-idx-hero-inner">
          <div class="att-blog-idx-eyebrow">
            <span class="att-blog-idx-dot" aria-hidden="true"></span>
            Amortree Journal
          </div>
          <h1 class="att-blog-idx-title">Ideas on <span class="att-blog-idx-title-accent">design</span>, pricing &amp; growth</h1>
          <p class="att-blog-idx-dek">Straight-talking guides on web design, pricing, and digital growth — written for founders and small business owners, not other agencies.</p>
        </div>
      </div>
    </div>

    <div class="att-blog-idx-body">

      <!-- Featured post -->
      <router-link
        v-if="featuredPost"
        :to="featuredPost.link"
        class="att-blog-idx-featured"
      >
        <div class="att-blog-idx-featured-tag">Latest</div>
        <div class="att-blog-idx-featured-content">
          <span class="att-blog-idx-cat att-blog-idx-cat--onDark">{{ featuredPost.category }}</span>
          <h2 class="att-blog-idx-featured-title">{{ featuredPost.title }}</h2>
          <p class="att-blog-idx-featured-excerpt">{{ featuredPost.excerpt }}</p>
          <div class="att-blog-idx-meta att-blog-idx-meta--onDark">
            <span>{{ featuredPost.dateLabel }}</span>
            <span class="att-blog-idx-meta-sep" aria-hidden="true">·</span>
            <span>{{ featuredPost.readTime }}</span>
          </div>
        </div>
        <div class="att-blog-idx-featured-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </router-link>

      <!-- Category filter -->
      <div class="att-blog-idx-filters" role="tablist" aria-label="Filter posts by category">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="att-blog-idx-filter"
          :class="{ 'att-blog-idx-filter--active': activeCategory === cat }"
          role="tab"
          :aria-selected="activeCategory === cat"
          @click="setCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Post grid -->
      <div class="att-blog-idx-grid">
        <router-link
          v-for="post in filteredPosts"
          :key="post.slug"
          :to="post.link"
          class="att-blog-idx-card"
        >
          <div class="att-blog-idx-card-thumb" aria-hidden="true">
            <span class="att-blog-idx-card-initial">{{ post.category.charAt(0) }}</span>
          </div>
          <div class="att-blog-idx-card-body">
            <span class="att-blog-idx-cat">{{ post.category }}</span>
            <h3 class="att-blog-idx-card-title">{{ post.title }}</h3>
            <p class="att-blog-idx-card-excerpt">{{ post.excerpt }}</p>
            <div class="att-blog-idx-meta">
              <span>{{ post.dateLabel }}</span>
              <span class="att-blog-idx-meta-sep" aria-hidden="true">·</span>
              <span>{{ post.readTime }}</span>
            </div>
          </div>
        </router-link>

        <p v-if="!filteredPosts.length" class="att-blog-idx-empty">
          No posts in this category yet — check back soon.
        </p>
      </div>
    </div>

    <!-- CTA strip -->
    <div class="att-blog-idx-cta">
      <div class="att-blog-idx-cta-inner">
        <div class="att-blog-idx-cta-text">
          <p class="att-blog-idx-cta-title">Have a project in mind?</p>
          <p class="att-blog-idx-cta-sub">Get a free audit and a straight-up quote — no vague ranges, no pressure.</p>
        </div>
        <a href="/audit" class="att-blog-idx-cta-btn">
          Claim Your Free Audit
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>

  </main>
</template>

<style lang="scss" scoped>
// ── Page shell ────────────────────────────────────────────────────────────────
.att-blog-idx-page {
  background: #f8fafc;
  min-height: 100vh;
  font-family: var(--font-body, Inter, system-ui, sans-serif);
}
.breadcrum-area {
  padding-top: 10vh;
  background-color: #06060a;
}

// ── Hero ──────────────────────────────────────────────────────────────────────
.att-blog-idx-hero {
  position: relative;
  overflow: hidden;
  padding: 9rem 4rem 6rem;
  isolation: isolate;

  @media (max-width: 768px) { padding: 7rem 1.5rem 4.5rem; }
}

.att-blog-idx-hero-grid {
  position: absolute; inset: 0; z-index: 0;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.5) 80%, transparent 100%);
  pointer-events: none;
}

.att-blog-idx-hero-glow {
  position: absolute; top: -100px; right: -100px;
  width: 550px; height: 550px; border-radius: 50%;
  background: radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 65%);
  filter: blur(60px); z-index: 0; pointer-events: none;
}

.att-blog-idx-hero-inner {
  position: relative; z-index: 1;
  max-width: 760px; margin: 0 auto; text-align: center;
}

.att-blog-idx-eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em;
  text-transform: uppercase; color: #facc15;
  border: 1px solid rgba(250,204,21,0.22);
  background: rgba(250,204,21,0.06);
  padding: 0.4rem 0.9rem; border-radius: 999px;
  margin-bottom: 1.5rem;
}

.att-blog-idx-dot {
  width: 5px; height: 5px; border-radius: 50%; background: #facc15; flex-shrink: 0;
  animation: att-idx-pulse 2s ease-in-out infinite;
}
@keyframes att-idx-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
}

.att-blog-idx-title {
  font-size: clamp(2.2rem, 5.5vw, 3.6rem);
  font-weight: 800; line-height: 1.08; letter-spacing: -0.03em;
  color: #f8fafc; margin: 0 0 1.25rem;
}

.att-blog-idx-title-accent {
  color: transparent;
  -webkit-text-stroke: 2px rgba(250,204,21,0.7);
}

.att-blog-idx-dek {
  font-size: 1.02rem; line-height: 1.65; color: #94a3b8;
  max-width: 52ch; margin: 0 auto;
}

// ── Body ──────────────────────────────────────────────────────────────────────
.att-blog-idx-body {
  max-width: 1200px; margin: 0 auto;
  padding: 4rem 4rem 5rem;

  @media (max-width: 1024px) { padding: 3rem 2rem 4rem; }
  @media (max-width: 768px)  { padding: 2.5rem 1.25rem 3rem; }
}

// ── Featured post ─────────────────────────────────────────────────────────────
.att-blog-idx-featured {
  position: relative;
  display: flex; align-items: center; justify-content: space-between; gap: 2rem;
  background: #0f172a;
  border-radius: 1.25rem;
  padding: 2.5rem 2.75rem;
  margin-bottom: 2.5rem;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(15,23,42,0.25);

    .att-blog-idx-featured-arrow { transform: translate(3px, -3px); }
  }

  @media (max-width: 860px) { flex-direction: column; align-items: flex-start; padding: 2rem; }
}

.att-blog-idx-featured-tag {
  position: absolute; top: 1.5rem; right: 2rem;
  font-size: 0.62rem; font-weight: 800; letter-spacing: 0.14em;
  text-transform: uppercase; color: #facc15;

  @media (max-width: 860px) { position: static; margin-bottom: 1rem; }
}

.att-blog-idx-featured-content { max-width: 640px; }

.att-blog-idx-featured-title {
  font-size: 1.55rem; font-weight: 800; color: #f8fafc;
  line-height: 1.25; letter-spacing: -0.01em; margin: 0.9rem 0 0.6rem;

  @media (max-width: 768px) { font-size: 1.25rem; }
}

.att-blog-idx-featured-excerpt {
  font-size: 0.92rem; line-height: 1.65; color: #94a3b8; margin: 0 0 1rem;
}

.att-blog-idx-featured-arrow {
  flex-shrink: 0;
  width: 48px; height: 48px; border-radius: 50%;
  background: #facc15; color: #0f172a;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.25s ease;

  @media (max-width: 860px) { position: absolute; bottom: 2rem; right: 2rem; }
}

// ── Category filters ─────────────────────────────────────────────────────────
.att-blog-idx-filters {
  display: flex; flex-wrap: wrap; gap: 0.6rem;
  margin-bottom: 2rem;
}

.att-blog-idx-filter {
  font-family: inherit;
  font-size: 0.8rem; font-weight: 600; color: #64748b;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 999px;
  padding: 0.5rem 1.1rem; cursor: pointer;
  transition: background 0.18s, color 0.18s, border-color 0.18s;

  &:hover { border-color: rgba(250,204,21,0.5); color: #0f172a; }
}

.att-blog-idx-filter--active {
  background: #0f172a; border-color: #0f172a; color: #facc15;

  &:hover { color: #facc15; }
}

// ── Post grid ─────────────────────────────────────────────────────────────────
.att-blog-idx-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 980px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
}

.att-blog-idx-card {
  display: flex; flex-direction: column;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 1rem;
  overflow: hidden; text-decoration: none;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 32px rgba(15,23,42,0.08);
    border-color: rgba(250,204,21,0.4);

    .att-blog-idx-card-title { color: #0f172a; }
    .att-blog-idx-card-thumb { background: #0f172a; }
    .att-blog-idx-card-initial { color: #facc15; }
  }
}

.att-blog-idx-card-thumb {
  height: 120px;
  background: #f1f5f9;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.22s ease;
}

.att-blog-idx-card-initial {
  font-size: 2.4rem; font-weight: 800; color: #cbd5e1;
  transition: color 0.22s ease;
}

.att-blog-idx-card-body {
  padding: 1.5rem 1.5rem 1.75rem;
  display: flex; flex-direction: column; flex: 1;
}

.att-blog-idx-card-title {
  font-size: 1.02rem; font-weight: 700; color: #1e293b;
  line-height: 1.35; letter-spacing: -0.01em;
  margin: 0.7rem 0 0.55rem;
  transition: color 0.22s ease;
}

.att-blog-idx-card-excerpt {
  font-size: 0.85rem; line-height: 1.6; color: #64748b;
  margin: 0 0 1rem; flex: 1;
}

.att-blog-idx-empty {
  grid-column: 1 / -1;
  text-align: center; padding: 3rem 1rem;
  font-size: 0.9rem; color: #94a3b8;
}

// ── Shared: category pill + meta ─────────────────────────────────────────────
.att-blog-idx-cat {
  display: inline-block; align-self: flex-start;
  font-size: 0.65rem; font-weight: 800; letter-spacing: 0.08em;
  text-transform: uppercase; color: #0f172a;
  background: rgba(250,204,21,0.18);
  border: 1px solid rgba(250,204,21,0.35);
  padding: 0.22rem 0.65rem; border-radius: 999px;
}

.att-blog-idx-cat--onDark {
  color: #facc15;
  background: rgba(250,204,21,0.1);
  border-color: rgba(250,204,21,0.3);
}

.att-blog-idx-meta {
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.76rem; color: #94a3b8;
}

.att-blog-idx-meta--onDark { color: #64748b; }

.att-blog-idx-meta-sep { color: #cbd5e1; }
.att-blog-idx-meta--onDark .att-blog-idx-meta-sep { color: #334155; }

// ── CTA strip ─────────────────────────────────────────────────────────────────
.att-blog-idx-cta {
  background: #0f172a;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 3rem 4rem;

  @media (max-width: 640px) { padding: 2.5rem 1.25rem; }
}

.att-blog-idx-cta-inner {
  max-width: 1000px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 640px) { flex-direction: column; text-align: center; }
}

.att-blog-idx-cta-title {
  font-size: 1.15rem; font-weight: 700; color: #f8fafc; margin: 0 0 0.25rem;
}

.att-blog-idx-cta-sub {
  font-size: 0.85rem; color: #64748b; margin: 0;
}

.att-blog-idx-cta-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: #facc15; color: #0f172a;
  font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em;
  padding: 0.75rem 1.5rem; border-radius: 999px;
  text-decoration: none; transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  white-space: nowrap;

  &:hover {
    background: #f0b429;
    box-shadow: 0 8px 24px rgba(250,204,21,0.3);
    transform: translateY(-1px);
  }
}
</style>