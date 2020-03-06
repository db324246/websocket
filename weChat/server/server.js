const app = require('express')();
const server = require('http').createServer(app);

server.listen(3000, function() {
  console.log('服务器已启动');
})

const io = require('socket.io')(server);
const users = [];

io.on('connection', (socket) => {
  socket.on('user', user => {
    users.push({
      name: user.name,
      clientId: socket.client.id
    })
    // io.clients((error, clients) => {
    //   if (error) throw error;
    //   console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
    // });
    socket.broadcast.emit('news', 'user connected');

    console.log(`客户${user.name}已连接`)
    socket.emit('news', `${user.name}已进入大厅`)

    socket.join('Saloon', () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms); // [ <socket.id>, 'room 237' ]

      socket.to('Saloon').emit('news', `${user.name}已进入大厅`)
    });
  })
  
  socket.on('send', send => {
    console.log(send)

    socket.to('Saloon').emit('mssages', send)
  })

})
