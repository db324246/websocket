const WebSocket = require('ws');

const option = {
  host: '192.168.6.86', // {String} 要绑定的服务器主机名
  port: 3000, // {Number} 要绑定的服务器端口
  // backlog {Number} 挂起连接队列的最大长度.
  // server {http.Server|https.Server} 一个预创建的HTTP/S服务器
  verifyClient(info, callback) { // {Function} 验证传入连接的函数。
    console.log('origin', info.origin)
    console.log('header', info.req.headers)
    callback(true)
  },
  handleProtocols(protocols, request) { // {Function} 处理子协议的函数。
    console.log(protocols)
    // console.log(request)
  },
  path: ['/room', '/sitting'], // {String} 只接受与此路径匹配的连接
  // noServer {Boolean} 启用无服务器模式
  clientTracking: true // {Boolean} 是否记录连接clients
  // perMessageDeflate {Boolean|Object} 开启关闭zlib压缩(配置)
  // maxPayload {Number} 最大消息载荷大小（bytes）
}
// 创建一个新的服务器实例。必须提供port、server或noServer中的一个，否则会引发错误。

// verifyClient {Function} (默认自动接受)，如果设置该函数则，则该函数会接受如下两个参数：
// info {Object}
//     origin {String} ```HTTP.request.header['Origin']```
//     req {http.IncomingMessage} GET```HTTP.request```
//     secure {Boolean} 如果设置了Req.Calnal.授权或Req.Calnal.加密，则为true。
// cb {Function} 当用户需要定制拒绝回调信息时使用，该回调可传如下参数：
//     result {Boolean} 是否接受握手
//     code {Number} 当```result```为```false```时，该值为指定返回的http错误状态码
//     name {String} 当```result```为```false```时，该值为指定返回的http错误信息
//     headers {Object} 当```result```为```false```时，该值可以设定附加的额外头部信息

const ws= new WebSocket.Server(option);

ws.on('connection', function connection(_ws) {
  console.log('有人来了')
  console.log('clients', Array.from(ws.clients) )
  _ws.on('message', function(message){
    console.log('已接受到信息' + message)
    // console.log(ws.clients)
    ws.clients.forEach(function(_ws){ // 看这里看这里  wss.clients 拿到所有的连接
      _ws.send(message) // 群发消息
    })
  })
});
