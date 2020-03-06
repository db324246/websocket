<template>
  <div class="asideBox">
    <div class="userBox"></div>
    <div class="chatRooms">
      <el-scrollbar style="height: 100%;">
        <ul>
          <li :class="['chatRooms_item', currentRoom === 'Saloon' ? 'currentRoom' : '']">大厅</li>
          <li class="chatRooms_item">创建聊天室</li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentRoom: {
      type: String,
      default: 'Saloon'
    }
  },
  data() {
    return{

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>
.asideBox {
  height: 100%;
}
.userBox {
  height: 70px;
}
.chatRooms {
  height: calc(100% - 70px);
}
.chatRooms_item {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #eee;
}
.currentRoom {
  color: #fff;
  background-color: #a9bbce;
}
.chatRooms >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>