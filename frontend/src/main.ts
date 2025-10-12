import {createApp} from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from './router'
import {createPinia} from "pinia";
import CKEditor from '@mayasabha/ckeditor4-vue3';
import Notifications from '@kyvg/vue3-notification'

const pinia = createPinia();

createApp(App)
    .use(pinia)
    .use(router)
    .use(CKEditor)
    .use(Notifications)
    .mount('#app')
