<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import HeaderSec from './components/Header.vue'
import FooterSec from './components/Footer.vue'
import logoUrl from './assets/img/shapes/bubble-2.png'
import 'animate.css'

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

watch(isLoading, (loading) => {
  document.body.style.overflow = loading ? 'hidden' : ''
})
</script>

<template>
  <HeaderSec />
  <div v-if="isLoading" class="global-loader" role="status" aria-live="polite" aria-busy="true">
    <img :src="logoUrl" alt="Loading" class="loader-logo" />
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
  width: 100vw;
  height: 100vh;
  background: #23232a;
  z-index: 9999;
  transition: opacity 120ms ease-in-out;
}

.loader-logo {
  width: 160px;
  height: auto;
  opacity: 0.95;
  filter: drop-shadow(0 4px 18px rgba(0, 0, 0, 0.5));
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;
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
  animation: shine 1s infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
