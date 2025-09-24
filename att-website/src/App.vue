<script setup>
import { ref, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import HeaderSec from './components/Header.vue'
import FooterSec from './components/Footer.vue'

const isLoading = ref(true)
const router = useRouter()

router.beforeEach((_to, _from, next) => {
  isLoading.value = true
  next()
})

router.afterEach(() => {
  // Small delay to avoid flicker on super fast routes
  setTimeout(() => {
    isLoading.value = false
  }, 150)
})

router.onError(() => {
  isLoading.value = false
})

onMounted(() => {
  router.isReady().then(() => {
    isLoading.value = false
  })
})
</script>

<template>
  <HeaderSec />
  <div v-if="isLoading" class="global-loader" role="status" aria-live="polite" aria-busy="true">
    <div class="loader-spinner"></div>
    <span class="visually-hidden">Loading</span>
  </div>
  <RouterView />
  <FooterSec />
</template>

<style scoped>
.global-loader {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  transition: opacity 120ms ease-in-out;
}

.loader-spinner {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.15);
  border-top-color: #0073AA;
  animation: spin 0.8s linear infinite;
  box-shadow: 0 0 12px rgba(0, 115, 170, 0.35);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
