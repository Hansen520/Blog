import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import Element3 from 'element3';
import 'element3/lib/theme-chalk/index.css';
createApp(App).use(store).use(router).use(Element3).mount('#app');

// import { createApp } from './utils/three-renderer';
// import App2 from './App2.vue';
// createApp(App2).mount('#app');
