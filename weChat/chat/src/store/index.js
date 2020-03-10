import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    socketUrl: 'http://192.168.6.86:3000',
    token: '',
    userInfo: {},
    userLoginMessage: {}
  },
  getters: {
    userToken(state) {
      return state.token
    },
    userInfo(state) {
      return state.userInfo
    },
    userLoginMessage(state) {
      return state.userLoginMessage
    }
  },
  mutations: {
    // 储存登录的用户信息
    saveLoginInfo(state, data) {
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('user', JSON.stringify(data.userInfo))
      state.token = data.token
      state.userInfo = data.userInfo
      state.userLoginMessage = data
    },
    // 从本地刷新登录信息
    refreshLoginMessage(state) {
      const token = sessionStorage.getItem('token')
      const userInfo = JSON.parse(sessionStorage.getItem('user'))

      state.token = token
      state.userInfo = userInfo
      state.userLoginMessage = {
        token,
        userInfo
      }
    },
    // 清除登录的用户信息
    clearCurrentUser(state) {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      state.token = ''
      state.userInfo = {}
      state.userLoginMessage = {}
    }
  }
})

export default store