import http from '@/utils/request'

export function login(params) {
  return http.post('user/login', {
    account: params.account,
    password: params.password,
    sys_code: 'tt_staff',
    extra: {
      appid: params.extra.appid,
      device: params.extra.device,
      logintype: params.extra.logintype
    }
  })
}

export function getInfo() {
  return http.get(`api/user/getCurrentUser`)
}

export function logout() {
  return http.get('user/logout')
}
