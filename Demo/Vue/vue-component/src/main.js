import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'simple-vue-tree/dist/lib/simple-tree.css';
import outline from 'vue-outline';
import axios from 'axios';

Vue.prototype.$axios = axios;

Vue.use(outline, {
  directiveName: 'custom-outline-name',
  treeName: 'custom-tree-name',
});

Vue.config.productionTip = false;
// Object.keys(directives).forEach((key) => {
//   Vue.directive(key, directives[key])
// })
// Vue.use(simple)
new Vue({
  router,
  // 通过render函数渲染app
  render: (h) => h(App),
}).$mount('#app');
