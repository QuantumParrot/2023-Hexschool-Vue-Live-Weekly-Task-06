import './assets/main.scss';
import 'bootstrap-icons/font/bootstrap-icons.scss';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import App from './App.vue';
import router from './router';

const pinia = createPinia();

const app = createApp(App);

app.use(router);

app.use(pinia);

pinia.use(({ store }) => {
  const newStore = store; newStore.router = markRaw(router);
});

app.component('LoadingOverlay', Loading);

app.mount('#app');
