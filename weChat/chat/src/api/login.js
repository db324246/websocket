import request from '@utils/request/index.js'

export function loginPlatform(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}