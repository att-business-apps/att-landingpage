import './assets/css/animate.css'
import './assets/css/magnific-popup.css'
import './assets/css/ionicons.min.css'
import './assets/css/icofont.css'
import './assets/css/style.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

