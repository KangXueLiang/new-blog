// 把秒转为小时制, 样式1 eg. 10000002 => 2777小时46分42秒
export function formatSeconds1(value) {
  let secondTime = parseInt(value) // 秒
  let minuteTime = 0 // 分
  let hourTime = 0 // 小时
  if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
    // 获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60)
    // 获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60)
    // 如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      // 获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60)
      // 获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60)
    }
  }
  // 这里处理成两种格式
  let result = '' + parseInt(secondTime) + '秒'
  if (minuteTime > 0) {
    result = '' + parseInt(minuteTime) + '分' + result
  }
  if (hourTime > 0) {
    result = '' + parseInt(hourTime) + '时' + result
  }
  return result
}

// 把秒转为小时制,样式2 eg. 10000002 => 2777:04:42
export function formatSeconds2(value) {
  let secondTime = parseInt(value) // 秒
  let minuteTime = 0 // 分
  let hourTime = 0 // 小时
  if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
    // 获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60)
    // 获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60)
    // 如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      // 获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60)
      // 获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60)
    }
  }
  let result = ''
  if (secondTime < 10) {
    result = '0' + parseInt(secondTime)
  } else {
    result = parseInt(secondTime)
  }
  if (minuteTime < 10) {
    result = '0' + parseInt(minuteTime) + ':' + result
  } else {
    result = parseInt(minuteTime) + ':' + result
  }
  result = parseInt(hourTime) + ':' + result
  return result
}

// 把时间戳转为具体时间 eg. 1530179617000 => 2018-05-27 14:58:09
export function formatTimestamp(value, split) {
  if (value) {
    const date = new Date(Number(value))
    const Y = date.getFullYear() + '/'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
    const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
    const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    let t = Y + M + D + h + m + s
    if (typeof split !== 'undefined') {
      t = t.split(' ')[split]
    }
    return t
  } else {
    return '--'
  }
}

// 把时间戳转为具体时间(只取年月日) eg. 1530179617000 => 2018/5/27
export function formatTimestamp2(value, split) {
  if (value) {
    const date = new Date(Number(value))
    const Y = date.getFullYear() + '/'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
    const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
    let t = Y + M + D
    if (typeof split !== 'undefined') {
      t = t.split(' ')[split]
    }
    return t
  } else {
    return '--'
  }
}

// 把时间戳转为具体时间(只取年月日) eg. 1530179617000 => 2018-5-27
export function formatTimestamp3(value, split) {
  if (value) {
    const date = new Date(Number(value))
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
    let t = Y + M + D
    if (typeof split !== 'undefined') {
      t = t.split(' ')[split]
    }
    return t
  } else {
    return '--'
  }
}

// 把时间戳转为具体时间(只取年月日) eg. 1530179617000 => 2018-5
export function formatTimestamp4(value, split) {
  if (value) {
    const date = new Date(Number(value))
    const Y = date.getFullYear()
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    let t = Y + '年' + M + '月'
    if (typeof split !== 'undefined') {
      t = t.split(' ')[split]
    }
    return t
  } else {
    return '--'
  }
}