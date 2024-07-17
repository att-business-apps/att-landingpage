<script setup>
import { RouterView } from 'vue-router'
import HeaderSec from './components/Header.vue'
import FooterSec from './components/Footer.vue'
</script>

<template>
  <HeaderSec />
  <RouterView />
  <FooterSec />
</template>

<style scoped>

</style>
