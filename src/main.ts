import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

import '@egjs/vue3-flicking/dist/flicking.css';
import Flicking from '@egjs/vue3-flicking';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

// eslint-disable-next-line vue/multi-word-component-names
app.component('Flicking', Flicking);

app.mount('#app');
