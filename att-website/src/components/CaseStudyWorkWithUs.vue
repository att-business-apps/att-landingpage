<script setup>
const props = defineProps({
  project: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    default: "Digital product",
  },
  accent: {
    type: String,
    default: "#facc15",
  },
  result: {
    type: String,
    default: "A sharper brand experience, clearer user journeys, and a digital foundation built for growth.",
  },
  services: {
    type: Array,
    default: () => ["Strategy", "UI/UX", "Website", "Analytics"],
  },
  proof: {
    type: Array,
    default: () => ["Discovery-led planning", "Conversion-focused interface", "Responsive delivery"],
  },
});
</script>

<template>
  <section class="case-work section section-padding" :style="{ '--case-accent': props.accent }">
    <div class="container">
      <div class="case-work-shell">
        <div class="case-work-copy">
          <span class="case-eyebrow">How this helps your next project</span>
          <h2 class="case-title">
            Like {{ props.project }}, your case study can become a reason to trust you.
          </h2>
          <p>
            We do not just make screens look better. We clarify the offer, plan the user journey,
            design the experience, and ship a presence that makes new visitors feel confident
            enough to contact you.
          </p>
          <div class="case-services">
            <span v-for="service in props.services" :key="service">{{ service }}</span>
          </div>
        </div>

        <div class="case-work-panel">
          <div class="panel-label">{{ props.industry }}</div>
          <div class="panel-result">{{ props.result }}</div>
          <ul>
            <li v-for="item in props.proof" :key="item">{{ item }}</li>
          </ul>
          <div class="panel-actions">
            <a class="amor-btn btn-fill-primary btn-large" href="/contact">Start a Project</a>
            <a class="case-link" href="/case-studies">View More Work</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.case-work {
  background:
    radial-gradient(circle at 12% 18%, color-mix(in srgb, var(--case-accent) 26%, transparent), transparent 30%),
    linear-gradient(135deg, #070b12 0%, #000000 52%, #080a0f 100%);
  color: #f8fafc;
  overflow: hidden;
}

.case-work-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  gap: 32px;
  align-items: stretch;
}

.case-work-copy,
.case-work-panel {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(14px);
}

.case-work-copy {
  padding: clamp(28px, 5vw, 56px);
}

.case-eyebrow {
  display: inline-flex;
  color: var(--case-accent);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.case-title {
  color: #ffffff;
  font-size: clamp(2rem, 4.4vw, 3.65rem);
  line-height: 0.98;
  font-weight: 700;
  margin-bottom: 22px;
}

.case-work p {
  width: 100%;
  max-width: 780px;
  color: rgba(248, 250, 252, 0.78);
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 0;
}

.case-services {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.case-services span {
  border: 1px solid color-mix(in srgb, var(--case-accent) 48%, transparent);
  border-radius: 999px;
  color: #ffffff;
  padding: 9px 14px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.07);
}

.case-work-panel {
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
}

.panel-label {
  color: var(--case-accent);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.panel-result {
  color: #ffffff;
  font-size: clamp(1.35rem, 2.1vw, 2.1rem);
  line-height: 1.18;
  font-weight: 650;
  margin: 24px 0;
}

.case-work-panel ul {
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
}

.case-work-panel li {
  position: relative;
  color: rgba(248, 250, 252, 0.8);
  padding: 13px 0 13px 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.case-work-panel li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 19px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--case-accent);
  box-shadow: 0 0 20px color-mix(in srgb, var(--case-accent) 60%, transparent);
}

.panel-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.case-link {
  color: #ffffff;
  font-weight: 700;
  text-decoration: none;
}

.case-link:hover {
  color: var(--case-accent);
}

@media (max-width: 991px) {
  .case-work-shell {
    grid-template-columns: 1fr;
  }
}
</style>
