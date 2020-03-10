import axios from 'axios'

const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
  transformRequest: [function(data) {
    data = JSON.stringify(data)
    return data
  }],
  // 在传递给 then/catch 前，修改响应数据
  transformResponse: [function(data) {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }],
  headers: { // 配置请求头
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    post: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  },
})
http.interceptors.response.use(
  response => {
    if (response.data.status === 200) {
      const data = response.data
      return Promise.resolve(data);
    }
    errorHandle(response.data.status, response.data.message)
    return Promise.resolve(data)
  })
export default http
