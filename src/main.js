// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueDND from 'awe-dnd'
//引入歌曲导入插件
// import jsmediatags from 'jsmediatags';
// // 挂载到Vue的原型上，后面就能通过this直接调用
// Vue.prototype.jsmediatags = jsmediatags

Vue.use(ElementUI);
Vue.use(VueDND)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
