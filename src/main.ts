import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

declare global {
    interface Window {
        bootstrap: any;
    }
}

// Adding bootstrap
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

import './assets/scss/_custom_bootstrap.scss';
// importing Bootstrap Icons
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

createApp(App)
    .use(store)
    .use(router)
    .mount('#app');
