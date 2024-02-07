import './assets/main.scss';
import 'bootstrap-icons/font/bootstrap-icons.scss';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

//

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

//

import {

  Form, Field, ErrorMessage,
  defineRule, configure,

} from 'vee-validate';

import { required, email } from '@vee-validate/rules';

import { setLocale, localize } from '@vee-validate/i18n';

import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

//

import App from './App.vue';
import router from './router';

//

defineRule('required', required);
defineRule('email', email);

configure({

  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,

});

setLocale('zh_TW');

//

const pinia = createPinia();

const app = createApp(App);

app.use(router);

app.use(pinia);

pinia.use(({ store }) => {
  const newStore = store; newStore.router = markRaw(router);
});

app.component('LoadingOverlay', Loading);

app.component('VForm', Form);

app.component('VField', Field);

app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
