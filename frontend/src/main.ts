import {createApp} from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from './router'
import {createPinia} from "pinia";
import CKEditor from '@mayasabha/ckeditor4-vue3';

import Vue3Toastify, {toast, type ToastContainerOptions} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const pinia = createPinia();

createApp(App)
    .use(pinia)
    .use(router)
    .use(CKEditor)
    .use(
        Vue3Toastify,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            opacity: '1',
            userSelect: 'initial',
          },
          transition: "bounce",
          dangerouslyHTMLString: true,
        } as ToastContainerOptions,
    )
    .mount('#app')
