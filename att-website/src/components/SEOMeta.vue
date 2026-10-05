<template>

    <Head>
        <title>{{ pageTitle }}</title>
        <meta name="description" :content="pageDescription" />
        <meta name="keywords" :content="pageKeywords" />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" :content="pageUrl" />
        <link rel="canonical" :href="pageUrl" />
        <meta property="og:title" :content="pageTitle" />
        <meta property="og:description" :content="pageDescription" />
        <meta property="og:image" :content="socialImage" />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="pageTitle" />
        <meta name="twitter:description" :content="pageDescription" />
        <meta name="twitter:image" :content="socialImage" />

        <!-- Additional SEO Meta -->
        <meta name="robots" :content="noIndex ? 'noindex, nofollow' : 'index, follow'" />
        <meta name="author" content="amortree Tech" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
    </Head>
</template>

<script setup>
import { Head } from '@unhead/vue/components'
import { computed } from 'vue'

const props = defineProps({
    pageTitle: {
        type: String,
        default: 'Amortree Tech | Digital Experiences That Grow Your Business'
    },
    pageDescription: {
        type: String,
        default: 'Amortree Tech builds digital experiences that help businesses grow.'
    },
    pageKeywords: {
        type: String,
        default: 'Amortree Tech, web design, web development, digital marketing'
    },
    pageUrl: {
        type: String,
        default: ''
    },
    noIndex: { type: Boolean, default: false }
})

const pageUrl = computed(() => props.pageUrl || `https://amortree.com${window.location.pathname}`)
const socialImage = 'https://amortree.com/assets/img/og-image.png'
</script>
