const app = require('express')();
const server = require('http').createServer(app);

// body中间件
const body = require("body-parser");
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

// 允许跨域请求
const cors = require('cors');
app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
  alloweHeaders:['Conten-Type', 'authorization']
}));

app.post('/login', (req, res) => {
  const loginForm = req.body
  console.log('登录成功')
  res.send({
    status: 200,
    message: '登录成功',
    success: true,
    data: {
      userInfo: {
        nickName: loginForm.nickName,
        phoneNumber: loginForm.phoneNumber,
      },
      token: '123456789',
    }
  })
})

server.listen(3000, '192.168.6.86', function() {
  console.log('服务器已启动');
})

const io = require('socket.io')(server);
const users = [];

io.on('connection', socket => {
  console.log(`knock! knock! 有人敲门~`)
  socket.on('user', user => {
    if (!user.userInfo) {
      io.to(socket.client.id).emit('unAuthority', '1232')
      return
    }

    const onLineFlag = users.some(item => item.clientId === socket.client.id)
    if (!onLineFlag) {
      users.push({
        nickName: user.userInfo.nickName,
        phoneNumber: user.userInfo.nickName,
        token: user.token,
        clientId: socket.client.id
      })
      io.to(socket.client.id).emit('message', {
        type: 'success',
        message: '连接成功'
      })

      socket.broadcast.emit('message', {
        type: 'info',
        message: `${user.userInfo.nickName}已上线`
      });

      console.log(`客户${user.userInfo.nickName}已连接`)
    }

    socket.join('Saloon', () => {
      let rooms = Object.keys(socket.rooms);
      socket.to('Saloon').emit('news', {
        room: 'Saloon',
        news: `${user.userInfo.nickName}进入大厅`,
        type: 'server'
      })
    });
  })
  
  socket.on('send', send => {
    console.log(send)
    socket.to(send.room).emit('news', send.news)
  })
})