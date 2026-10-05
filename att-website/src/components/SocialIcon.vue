<script setup>
defineProps({ name: { type: String, required: true } });
</script>

<template>
  <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <template v-if="name === 'LinkedIn'">
      <path d="M5.2 8.4H2.1V22h3.1V8.4ZM3.65 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM22 14.2c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-4 2.2V8.4H9.8V22h3.1v-6.7c0-1.8.3-3.5 2.6-3.5s2.3 2 2.3 3.6V22H22v-7.8Z" />
    </template>
    <template v-else-if="name === 'Instagram'">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2" />
      <circle cx="17.5" cy="6.8" r="1.2" />
    </template>
    <template v-else-if="name === 'Facebook'">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.8-.1-1.7-.2-2.6-.2-2.7 0-4.5 1.6-4.5 4.6v1.9h-3v3.1h3v8h3.8Z" />
    </template>
    <template v-else-if="name === 'Dribbble'">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M5.5 5.5c4.4 3 7.2 7.6 8.5 13M3.5 10c5.5.4 10.8-1.1 14.7-4.2M5 18c3-4 7.5-6.2 15.3-5.8" fill="none" stroke="currentColor" stroke-width="1.6" />
    </template>
  </svg>
</template>

<style scoped>
.social-icon {
  display: block;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
