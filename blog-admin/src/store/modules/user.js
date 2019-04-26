import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken, removeUserInfo } from '@/utils/auth'

const user = {
  state: {
    user_id: '',
    token: getToken(),
    name: '',
    roles: [],
    userInfo: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.user_id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, userInfo) => {
      console.log('set-userinfo', userInfo)
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    Login({ commit }, loginInfo) {
      return new Promise((resolve, reject) => {
        login(loginInfo).then(response => {
          const data = response.data
          console.log('这里看一下登录信息', data)
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          // commit('SET_USERINFO', data.userInfo)
          // commit('SET_NAME', data.userInfo.name)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_USERINFO', '')
          removeToken()
          removeUserInfo()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_USERINFO', '')
        removeToken()
        removeUserInfo()
        removeToken()
        resolve()
      })
    }
  }
}

export default user
