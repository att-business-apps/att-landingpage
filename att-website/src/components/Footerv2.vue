<template>
  <footer
    class="bg-dark dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 pt-32 pb-12"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="grid md:grid-cols-12 gap-16 mb-24">
        <div class="md:col-span-4 space-y-8">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-navy dark:bg-primary flex items-center justify-center rounded"
            >
              <span class="text-white font-bold text-lg">A</span>
            </div>
            <span
              class="text-xl font-bold tracking-tight text-navy dark:text-white uppercase"
              >Amortree</span
            >
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            A tech-forward growth agency bridging the gap between sophisticated
            engineering and high-performance marketing.
          </p>
          <div class="flex gap-4">
            <a
              class="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-navy dark:hover:text-primary transition-all"
              href="#"
            >
              <span class="material-symbols-outlined text-lg thin-stroke"
                >share</span
              >
            </a>
            <a
              class="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-navy dark:hover:text-primary transition-all"
              href="#"
            >
              <span class="material-symbols-outlined text-lg thin-stroke"
                >mail</span
              >
            </a>
          </div>
        </div>
        <div class="md:col-span-2 space-y-6">
          <h5
            class="text-xs font-bold uppercase tracking-widest text-navy dark:text-white"
          >
            Navigation
          </h5>
          <ul class="space-y-4 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <a
                class="hover:text-navy dark:hover:text-white transition-colors"
                href="#"
                >Solutions</a
              >
            </li>
            <li>
              <a
                class="hover:text-navy dark:hover:text-white transition-colors"
                href="#"
                >Expertise</a
              >
            </li>
            <li>
              <a
                class="hover:text-navy dark:hover:text-white transition-colors"
                href="#"
                >Case Studies</a
              >
            </li>
            <li>
              <a
                class="hover:text-navy dark:hover:text-white transition-colors"
                href="#"
                >About Us</a
              >
            </li>
          </ul>
        </div>
        <div class="md:col-span-6 space-y-6">
          <h5
            class="text-xs font-bold uppercase tracking-widest text-navy dark:text-white"
          >
            Initiate a Consultation
          </h5>
          <form class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <input
                class="w-full bg-background-light dark:bg-slate-900 border-transparent focus:ring-primary focus:bg-white dark:focus:bg-slate-800 text-sm p-4 rounded-lg transition-all"
                placeholder="First Name"
                type="text"
              />
              <input
                class="w-full bg-background-light dark:bg-slate-900 border-transparent focus:ring-primary focus:bg-white dark:focus:bg-slate-800 text-sm p-4 rounded-lg transition-all"
                placeholder="Work Email"
                type="email"
              />
            </div>
            <textarea
              class="w-full bg-background-light dark:bg-slate-900 border-transparent focus:ring-primary focus:bg-white dark:focus:bg-slate-800 text-sm p-4 rounded-lg transition-all"
              placeholder="Tell us about your growth goals"
              rows="3"
            ></textarea>
            <button
              class="w-full bg-navy dark:bg-primary text-white font-bold py-4 rounded-lg text-sm uppercase tracking-widest hover:shadow-lg transition-all"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
      <div
        class="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-slate-400"
      >
        <p>© 2024 Amortree Tech. All rights reserved.</p>
        <div class="flex gap-10">
          <a
            class="hover:text-navy dark:hover:text-white transition-colors"
            href="#"
            >Privacy Protocol</a
          >
          <a
            class="hover:text-navy dark:hover:text-white transition-colors"
            href="#"
            >Service Agreement</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const subscribeEmail = ref("");
const submitting = ref(false);

function isValidEmail(email) {
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
}

async function handleSubscribe() {
  if (!subscribeEmail.value || !isValidEmail(subscribeEmail.value)) {
    alert("Please enter a valid email address");
    return;
  }
  try {
    submitting.value = true;
    // Example: send to your backend or a service like EmailJS/Mailchimp endpoint
    // Replace this fetch with your actual subscription API endpoint
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: subscribeEmail.value }),
    });
    if (!res.ok) throw new Error("Subscription failed");
    alert("Thanks for subscribing!");
    subscribeEmail.value = "";
  } catch (e) {
    console.error(e);
    alert("Unable to subscribe right now. Please try again later.");
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped></style>
