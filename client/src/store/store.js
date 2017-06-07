import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    sideBarState: false,
    headerTitle: '默认的头部标题'
  },
  mutations: {
    changeSideBarState (state, boolean) {
      state.sideBarState = boolean
    },
    changeHeaderTitle (state, str) {
      state.headerTitle = str
    }
  },
  actions: {
    // changeSideBarState (context, status) {
    //   context.commit('changeSideBarState', status)
    // }
    // es6解构写法
    changeSideBarState ({commit}, status) {
      commit('changeSideBarState', status)
    },
    changeHeaderTitle ({commit}, str) {
      commit('changeHeaderTitle', str)
    }
  },
  getters: {
    getSideBarState (state) {
      return state.sideBarState
    },
    getHeaderTitle (state) {
      return state.headerTitle
    }
  }
})
