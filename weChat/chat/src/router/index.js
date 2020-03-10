import Vue from 'vue'
import Router from 'vue-router'
// import VueSocketIO from 'vue-socket.io'
// import socketio from 'socket.io-client';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   next()
//   if (to.path === '/home') {
//     // if (!this.$store.getters.token) return next('/')
//     Vue.use(new VueSocketIO({
//       debug: true,
//       connection: socketio('/socket.io'),
//       options: {
//         autoConnect: false // 选择手动链接
//       }
//     }))
//   }
// })

export default router

