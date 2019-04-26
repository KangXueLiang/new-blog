import http from '@/utils/request'

export function login(params) {
  return http.post('api/login', {
    email: params.email,
    password: params.password
  })
}

export function logout() {
  return http.get('user/logout')
}
