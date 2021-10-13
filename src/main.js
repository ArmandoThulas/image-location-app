import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/material-kit.css'
import '@/assets/css/site.css'
import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:44305/api/'

createApp(App).mount('#app')
