// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@static/global.css'

// import VueSocketIO from 'vue-socket.io'
// import socketio from 'socket.io-client';

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: socketio('/socket.io'),
//   // options: {
//   //   autoConnect: false // 选择手动链接
//   // }
// }))

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
