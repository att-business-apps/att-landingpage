<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactPage = ref(null);

const disableBtn = ref(false);
const from_name = ref("");
const email = ref("");
const phoneNumber = ref("");
const message = ref("");
const formError = ref("");
const formSuccess = ref(false);

function sendMail() {
  formError.value = "";
  formSuccess.value = false;

  const params = {
    from_name: from_name.value,
    to_name: "Admin",
    email: email.value,
    phoneNumber: phoneNumber.value,
    message: message.value,
  };

  const serviceID = "service_77crg6o";

  if (!params.from_name) {
    formError.value = "Please enter your name.";
    return;
  }
  if (!params.email) {
    formError.value = "Please enter your email.";
    return;
  }
  if (!params.phoneNumber) {
    formError.value = "Please enter your phone number.";
    return;
  }
  if (!params.message) {
    formError.value = "Please enter your requirement.";
    return;
  }

  disableBtn.value = true;

  const resetForm = () => {
    from_name.value = "";
    email.value = "";
    phoneNumber.value = "";
    message.value = "";
    disableBtn.value = false;
    formSuccess.value = true;
  };

  emailjs
    .send(serviceID, getTemplate("admin"), params)
    .then(resetForm)
    .catch((err) => {
      console.log(err);
      disableBtn.value = false;
      formError.value = "Something went wrong. Please try again or WhatsApp us directly.";
    });

  emailjs
    .send(serviceID, getTemplate("customer"), params)
    .catch((err) => console.log(err));
}

function getTemplate(target) {
  if (target == "admin") return "template_tcauze5";
  if (target == "customer") return "template_svj7071";
}

let gsapContext;

onMounted(() => {
  gsapContext = gsap.context(() => {
    gsap.from(".att-contact-eyebrow, .att-contact-heading, .att-contact-sub, .att-contact-field", {
      y: 26,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: ".att-contact-form-card", start: "top 82%", once: true },
    });

    gsap.utils.toArray(".att-contact-info-card").forEach((card, i) => {
      gsap.from(card, {
        x: 30,
        autoAlpha: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".att-quickfact-item", {
      y: 20,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".att-quickfacts", start: "top 90%", once: true },
    });

    gsap.utils.toArray(".att-contact-info-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.35, ease: "power2.out" });
      });
    });

    ScrollTrigger.refresh();
  }, contactPage.value);
});

onBeforeUnmount(() => {
  gsapContext && gsapContext.revert();
});
</script>

<template>
  <main ref="contactPage">
    <div class="breadcrum-area breadcrumb-banner">
      <div class="container">
        <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
          <ul class="list-unstyled">
            <li><a href="/">Home</a></li>
            <li class="active text-ly">Contact</li>
          </ul>
          <div class="section-heading heading-left">
            <h1 class="title h2 mb-4">Start Your Next Growth Project <span class="text-ly">With Confidence</span>.</h1>
            <p>
              We help startups and growing businesses create strategic websites, exceptional
              digital experiences, and scalable solutions that build trust, generate qualified
              leads, and accelerate long-term growth.
            </p>
          </div>
        </div>
        <div class="banner-thumbnail" style="right: -200px">
          <div>
            <img
              src="../assets/img/amorboy/am-contact.png"
              class="w-75 animate__animated slideInRight"
              style="animation-duration: 3s"
              alt="Illustration"
            />
          </div>
        </div>
      </div>
      <ul class="shape-group-breadcrum-1 list-unstyled">
        <li class="shape shape-3 sal-animate" data-sal="slide-up" data-sal-duration="500" data-sal-delay="300">
          <img src="../assets/img/shapes/line-5.png" alt="circle" />
        </li>
      </ul>
    </div>

    <!-- ============================================================
         CONTACT — Glass form card + info rail
         ============================================================ -->
    <section class="att-contact-section">
      <div class="att-contact-inner">
        <div class="att-contact-grid">
          <!-- Form -->
          <div class="att-contact-form-card">
            <div class="att-contact-eyebrow att-section-label att-section-label--light">Get in Touch</div>
            <h2 class="att-contact-heading">Tell Us About Your Project</h2>
            <p class="att-contact-sub">
              Submit your requirements and our team will get back to you within one business day.
            </p>

            <form class="att-contact-form" @submit.prevent="sendMail">
              <div class="att-contact-field">
                <label for="message">How can we help you?</label>
                <textarea
                  id="message"
                  v-model="message"
                  rows="5"
                  placeholder="Tell us about your project, timeline, and goals…"
                  required
                ></textarea>
              </div>

              <div class="att-contact-row">
                <div class="att-contact-field">
                  <label for="contact-name">Your Name</label>
                  <input id="contact-name" v-model="from_name" type="text" placeholder="Jane Doe" required />
                </div>
                <div class="att-contact-field">
                  <label for="contact-email">Your Email</label>
                  <input id="contact-email" v-model="email" type="email" placeholder="jane@company.com" required />
                </div>
              </div>

              <div class="att-contact-field">
                <label for="contact-phone">Your Phone</label>
                <input id="contact-phone" v-model="phoneNumber" type="tel" placeholder="+91 00000 00000" required />
              </div>

              <p v-if="formError" class="att-form-message att-form-message--error">{{ formError }}</p>
              <p v-if="formSuccess" class="att-form-message att-form-message--success">
                Thanks — your message is in. We'll be in touch shortly.
              </p>

              <button type="submit" class="amor-btn btn-fill-primary btn-fluid" :disabled="disableBtn">
                {{ disableBtn ? "Sending…" : "Start Your Growth Journey" }}
              </button>
            </form>
          </div>

          <!-- Info rail -->
          <div class="att-contact-info-col">
            <div class="att-contact-info-card">
              <div class="att-info-icon">
                <span class="material-symbols-outlined">call</span>
              </div>
              <h4 class="att-info-title">Phone</h4>
              <p class="att-info-desc">
                Reach out for any queries; our experts are here to assist and resolve your
                concerns promptly.
              </p>
              <div class="att-info-links">
                <a href="tel:+917975859061">+91 79758 59061</a>
                <a href="tel:+919916846647">+91 99168 46647</a>
              </div>
            </div>

            <div class="att-contact-info-card">
              <div class="att-info-icon">
                <span class="material-symbols-outlined">mail</span>
              </div>
              <h4 class="att-info-title">Email</h4>
              <p class="att-info-desc">
                Our support team replies within 24 hours on standard business days (Mon–Sat).
              </p>
              <div class="att-info-links">
                <a href="mailto:hi@amortree.com">hi@amortree.com</a>
              </div>
            </div>

            <div class="att-contact-info-card att-contact-social-card">
              <h4 class="att-info-title">Connect With Us</h4>
              <div class="att-social-row">
                <a href="https://in.linkedin.com/company/amortree-tech" target="_blank" class="att-social-btn">
                  <img src="../assets/img/icon/sm-l.png" alt="Amortree LinkedIn" />
                </a>
                <a href="https://www.instagram.com/amortreetech/" target="_blank" class="att-social-btn">
                  <img src="../assets/img/icon/sm-i.png" alt="Amortree Instagram" />
                </a>
                <a href="https://www.facebook.com/amortreetech/" target="_blank" class="att-social-btn">
                  <img src="../assets/img/icon/sm-f.png" alt="Amortree Facebook" />
                </a>
                <a href="https://dribbble.com/amortreetech" target="_blank" class="att-social-btn">
                  <img src="../assets/img/icon/sm-d.png" alt="Amortree Dribbble" />
                </a>
              </div>
              <a
                href="https://wa.me/917975859061/?text=I%27m%20inquiring%20about%20the%20website%20service."
                target="_blank"
                class="att-whatsapp-cta"
              >
                <img src="../assets/img/icon/whatsapp.png" alt="Message us on WhatsApp" />
                <span>Message us on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div class="att-quickfacts">
          <div class="att-quickfact-item">
            <span class="material-symbols-outlined">schedule</span>
            <span>Replies within 24 hours</span>
          </div>
          <div class="att-quickfact-item">
            <span class="material-symbols-outlined">event_available</span>
            <span>Open Monday – Saturday</span>
          </div>
          <div class="att-quickfact-item">
            <span class="material-symbols-outlined">location_on</span>
            <span>Bengaluru, Karnataka, IN</span>
          </div>
        </div>
      </div>

      <ul class="list-unstyled att-contact-blobs">
        <li class="att-blob att-blob--yellow"></li>
        <li class="att-blob att-blob--red"></li>
      </ul>
    </section>
  </main>
</template>

<style lang="scss" scoped>
// ─── Shared section label ───────────────────────────────────────────────────
.att-section-label {
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-primaryR, #dc3c2d);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;

  &::before {
    content: "";
    width: 28px;
    height: 1px;
    background: var(--color-primaryR, #dc3c2d);
    flex-shrink: 0;
  }

  &--light {
    color: #facc15;
    &::before { background: #facc15; }
  }
}

// ─── Section shell ───────────────────────────────────────────────────────────
.att-contact-section {
  position: relative;
  padding: 7rem 4rem 8rem;
  overflow: hidden;

  @media (max-width: 1100px) { padding: 4.5rem 2rem 5rem; }
  @media (max-width: 768px)  { padding: 3.5rem 1.25rem 4rem; }
}

.att-contact-inner {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  z-index: 1;
}

.att-contact-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

// ─── Form card (glass) ───────────────────────────────────────────────────────
.att-contact-form-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 28px;
  padding: 3rem;

  @media (max-width: 640px) { padding: 2rem 1.5rem; }
}

.att-contact-heading {
  font-size: clamp(1.9rem, 3.2vw, 2.6rem);
  font-weight: 700;
  line-height: 1.15;
  color: #ffffff;
  margin-bottom: 0.75rem;
}

.att-contact-sub {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 2.5rem;
}

.att-contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.att-contact-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
}

.att-contact-field {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.45);
  }

  input,
  textarea {
    width: 100%;
    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    padding: 0.9rem 1.1rem;
    color: #ffffff;
    font-size: 0.92rem;
    font-family: inherit;
    resize: vertical;
    transition: border-color 0.3s ease, background 0.3s ease;

    &::placeholder { color: rgba(255, 255, 255, 0.32); }

    &:focus {
      outline: none;
      border-color: #facc15;
      background: rgba(255, 255, 255, 0.07);
    }
  }
}

.att-form-message {
  margin: -0.5rem 0 0;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 10px;
  padding: 0.75rem 1rem;

  &--error {
    color: #fca5a5;
    background: rgba(220, 60, 45, 0.12);
    border: 1px solid rgba(220, 60, 45, 0.3);
  }

  &--success {
    color: #86efac;
    background: rgba(92, 176, 78, 0.12);
    border: 1px solid rgba(92, 176, 78, 0.3);
  }
}

// ─── Info rail ───────────────────────────────────────────────────────────────
.att-contact-info-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.att-contact-info-card {
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem;
  transition: border-color 0.35s ease, background 0.35s ease;
  will-change: transform;

  &:hover {
    border-color: rgba(250, 204, 21, 0.35);
    background: rgba(255, 255, 255, 0.055);
  }
}

.att-info-icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #facc15;
  margin-bottom: 1.25rem;

  .material-symbols-outlined { font-size: 1.3rem; }
}

.att-info-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.6rem;
}

.att-info-desc {
  font-size: 0.85rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.1rem;
}

.att-info-links {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  a {
    font-size: 0.95rem;
    font-weight: 700;
    color: #facc15;
    text-decoration: none;
    transition: color 0.25s ease;

    &:hover { color: #ffffff; }
  }
}

.att-contact-social-card {
  .att-info-title { margin-bottom: 1.25rem; }
}

.att-social-row {
  display: flex;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
}

.att-social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;

  img { width: 16px; height: 16px; object-fit: contain; }

  &:hover {
    border-color: #facc15;
    background: rgba(250, 204, 21, 0.1);
    transform: translateY(-3px);
  }
}

.att-whatsapp-cta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  background: rgba(92, 176, 78, 0.12);
  border: 1px solid rgba(92, 176, 78, 0.3);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  color: #86efac;
  transition: background 0.3s ease, border-color 0.3s ease;

  img { width: 20px; height: 20px; }

  &:hover {
    background: rgba(92, 176, 78, 0.2);
    border-color: rgba(92, 176, 78, 0.5);
  }
}

// ─── Quick facts strip ────────────────────────────────────────────────────────
.att-quickfacts {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.att-quickfact-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.55);

  .material-symbols-outlined {
    font-size: 1.1rem;
    color: #facc15;
  }
}

// ─── Ambient blobs ────────────────────────────────────────────────────────────
.att-contact-blobs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.att-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.14;

  &--yellow {
    width: 420px;
    height: 420px;
    background: #facc15;
    top: -120px;
    right: -100px;
  }

  &--red {
    width: 380px;
    height: 380px;
    background: var(--color-primaryR, #dc3c2d);
    bottom: -140px;
    left: -100px;
  }
}
</style>