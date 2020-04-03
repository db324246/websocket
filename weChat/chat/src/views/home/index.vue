<template>
  <div class='page_container'>
    <section class="el-container">
      <aside class="el-aside" style="width: 200px;">
        <dl-aside :roomList="roomList" @changeRoom="changeRoom"></dl-aside>
      </aside> 
      
      <main class="el-main">
        <dl-main :roomName="currentRoom.name" :chatRecord="chatRecord" @sendMessage="sendMessage"></dl-main>
      </main>
    </section>
  </div>
</template>

<script>
import IO from '@static/socket.io.js'
import DlAside from '@/views/layout/Aside.vue'
import DlMain from '@/views/layout/Main.vue'
export default {
  components: {
    DlAside,
    DlMain
  },
  data() {
    return{
      currentRoom: {
        name: 'Saloon',
        unread: 0
      },
      roomList: [{
        name: 'Saloon',
        unread: 0
      }],
      chatRecord: [],
      socket: null,
      socketId: null
    }
  },
  created() {
    if (!this.$store.state.token) {
      this.$store.commit('refreshLoginMessage')
    }
  },
  mounted() {
    this.connectSocket()
  },
  methods: {
    // socket链接
    connectSocket() {
      this.socket = IO.connect(this.$store.state.socketUrl)

      this.socket.on('connect', () => {
        this.socketId = this.socket.id
        this.socket.emit('user', this.$store.getters.userLoginMessage);

        this.socket.on('message', this.gettingMessage);

        this.socket.on('news', this.gettingNews);

        this.socket.on('unAuthority', this.unAuthority);
      });
    },
    // 切换聊天室
    changeRoom(room) {
      this.currentRoom = Object.assign(this.currentRoom, room)
      // 刷新房间聊天记录
      // 。。。。
    },
    // 发送信息
    sendMessage(news) {
      const send = {
        from: this.$store.getters.userInfo,
        room: this.currentRoom.name,
        news: news,
        type: 'user'
      }
      this.chatRecord.push(send)
      this.socket.emit('send', send)
    },
    // 接收服务端消息
    gettingMessage(data) {
      this.$message({
        type: data.type,
        message: data.message
      })
    },
    // 接收聊天消息
    gettingNews(data) {
      if (data.room === this.currentRoom.name) return this.chatRecord.push(data)
      this.roomList = this.roomList.map(item => {
        if (item.name === data.room) item.unread++
        return item
      })
    },
    // 未知身份，重新登陆
    unAuthority(flag) {
      if(flag) {
        this.$store.commit('clearCurrentUser')
        this.socket.disconnect()
        this.$message.error('未知身份，请重新登陆')
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
.page_container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #778594;
}
.el-container {
  width: 900px;
  height: 600px;
  padding-left: 10px;
  margin: 100px auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px #ccc;
  /* background-color: #fff; */
  background-color: #f3f3f3;
}
.el-main {
  padding: 0;
  border-left: 1px solid #ccc;
}
</style>