import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import pinia from './pinia/index';
import Element3 from 'element3';
import 'element3/lib/theme-chalk/index.css';
createApp(App).use(store).use(pinia).use(router).use(Element3).mount('#app');

// import { createApp } from './utils/three-renderer';
// import App2 from './App2.vue';
// createApp(App2).mount('#app');

function delyError(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ message });
    }, 1000);
  });
}
async function test() {
  await delyError('ref is not defined');
}

test();
