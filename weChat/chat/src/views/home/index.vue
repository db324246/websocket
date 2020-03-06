<template>
  <div class='page_container'>
    <section class="el-container">
      <aside class="el-aside" style="width: 200px;">
        <dl-aside></dl-aside>
      </aside> 
      
      <main class="el-main">
        <dl-main></dl-main>
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
      data: [1]
    }
  },
  mounted() {
    this.$socket.connect()
    // this.$socket.on('connect', () => {
    //   console.log('链接成功')
    //   this.$socket.emit('user', { name: '张三' })
    //   // this.$socket.emit("clientmessage", "发送内容") 
    // });
  },
  methods: {

  },
  sockets: {
    connect() {
      console.log('链接成功')
      this.$socket.emit('user', { name: '张三' })
    },
    news(val) {
      console.log(val)
    },
    mssages(val) {
      console.log(val)
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
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 0 0 10px #ccc;
  /* background-color: #fff; */
  background-color: #f3f3f3;
}
.el-main {
  padding: 0;
  border-left: 1px solid #ccc;
}
</style>