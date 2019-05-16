import { Message, MessageBox } from 'element-ui'
import store from '../store'

export function handleResponseError(res) {
  switch (res.code) {
    case -2: 
      Message({
        message: '系统错误，请稍后重试',
        type: 'error',
        duration: 5 * 1000
      })
      break
    case 1101:
      Message({
        message: '没有访问权限',
        type: 'error',
        duration: 5 * 1000
      })
      break
    case 1102:
      Message({
        message: '未登录',
        type: 'error',
        duration: 5 * 1000
      })
      store.dispatch('FedLogOut').then(() => {
        location.href = '/login' // 为了重新实例化vue-router对象 避免bug
      })
      break
      case 1103:
        Message({
          message: '禁止访问',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 1104:
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
        break
      case 1105:
        Message({
          message: '登录账号不存在',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 1106:
        Message({
          message: '账号或密码错误',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 1107:
        Message({
          message: '账号被禁用',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 1108:
        Message({
          message: '账号没有访问系统权限',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 1109:
        Message({
          message: '生成登录标识失败',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 1110:
        Message({
          message: '系统已经禁止访问',
          type: 'error',
          duration: 5 * 1000
        })
        break
      default:
        Message({
          message: res.msg,
          type: 'error',
          duration: 5 * 1000
        })
  }
}