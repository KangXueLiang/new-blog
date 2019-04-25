import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
// import store from '../store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import { handleResponseError } from './responseError'

console.log(process.env)
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    if (getToken()) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非0是抛错 可结合自己业务进行修改
     */
    const res = response.data
    
    if (res.code !== 0) {
      // 错误集中处理
      handleResponseError(res)
      return Promise.reject(res.msg)
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    // handleResponseError(error)
    console.log('err' + error.response.status) // for debug
    if (error.response.status == 504 || error.response.status == 404) {
      Message.error({message: '服务器被吃了⊙﹏⊙∥'});
    } else if (error.response.status == 403) {
      Message.error({message: '权限不足,请联系管理员!'});
    } else {
      Message.error({message: error.message || '未知错误!'});
    }
    return Promise.reject(error)
  }
)
// 这里封装一下get跟post方法
const http = {}
const BASE_URL = process.env.VUE_APP_BASE_API
// patch 请求
http.patch = (url = '/', data = {}, headers = {}) => {
  return service({
    url: `${BASE_URL}${url}`,
    method: 'patch',
    headers,
    data
  })
}
// put 请求
http.put = (url = '/', data = {}, headers = {}) => {
  return service({
    url: `${BASE_URL}${url}`,
    method: 'put',
    headers,
    data
  })
}
// delete请求
http.delete = (url = '/', data = {}, headers = {}) => {
  return service({
    url: `${BASE_URL}${url}`,
    method: 'delete',
    headers,
    data
  })
}
// post请求
http.post = (url = '/', data = {}, headers = {}) => {
  return service({
    url: `${BASE_URL}${url}`,
    method: 'post',
    headers,
    data
  })
}
// get请求
http.get = (url = '/', params = '', headers = {}) => {
  return service({
    method: 'get',
    url: `${BASE_URL}${url}`,
    headers,
    params
  })
}
// 导出方法类
export { service }
export default http
