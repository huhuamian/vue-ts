import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入封装的 http 请求
import axios from "./utils/http";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
