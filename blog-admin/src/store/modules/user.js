import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUserInfo, removeUserInfo } from '@/utils/auth'

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
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    Login({ commit }, loginInfo) {
      return new Promise((resolve, reject) => {
        login(loginInfo).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          setUserInfo(data)
          console.log('userinfo', data)
          commit('SET_NAME', data.name)
          commit('SET_USERINFO', data)
          resolve(response)
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
