
export function getToken() {
  const token = JSON.parse(window.localStorage.getItem('token'))
  return token ? token : null
}

export function setToken(token) {
  window.localStorage.setItem('token', JSON.stringify(token))
}

export function removeToken() {
  window.localStorage.removeItem('token')
}

export function setUserInfo(userinfo) {
  window.localStorage.setItem('userinfo', JSON.stringify(userinfo))
}

export function getUserInfo() {
  return JSON.parse(window.localStorage.getItem('userinfo')) || null
}
export function removeUserInfo() {
  window.localStorage.removeItem('userinfo')
}
