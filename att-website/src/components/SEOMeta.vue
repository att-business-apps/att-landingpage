<template>

    <Head>
        <title>{{ pageTitle }}</title>
        <meta name="description" :content="pageDescription" />
        <meta name="keywords" :content="pageKeywords" />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" :content="pageUrl" />
        <meta property="og:title" :content="pageTitle" />
        <meta property="og:description" :content="pageDescription" />
        <meta property="og:image" content="https://amortree.com/assets/favicon-D3F9Q0A6.png" />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="pageTitle" />
        <meta name="twitter:description" :content="pageDescription" />
        <meta name="twitter:image" content="https://amortree.com/assets/favicon-D3F9Q0A6.png" />

        <!-- Additional SEO Meta -->
        <meta name="robots" content="index, follow" />
        <meta name="author" content="amortree Tech" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
    </Head>
</template>

<script setup>
import { Head } from '@unhead/vue'

const props = defineProps({
    pageTitle: {
        type: String,
        required: true
    },
    pageDescription: {
        type: String,
        required: true
    },
    pageKeywords: {
        type: String,
        required: true
    },
    pageUrl: {
        type: String,
        required: true
    }
})
</script>
