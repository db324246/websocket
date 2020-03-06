<template>
  <div class="mainBox">
    <div class="chatWindow">
      <div class="windowMsg">
        <span>李四</span>
      </div>
      <ul class="chatRecord">
        <li>
          <img class="messageAvatar" :src="avatar" alt="">
          <div class="messageBox">
            你好啊
          </div>
        </li>
      </ul>
    </div>
    <div class="chattingBox">
      <div class="chattingInput" contenteditable="true">

      </div>
      <div class="sendMessage">
        <el-button size="mini">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '@/assets/avatar.jpeg'
export default {
  data() {
    return{
      avatar: avatar
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style scoped>
.mainBox {
  height: 100%;
}
.chatWindow {
  position: relative;
  height: calc(100% - 140px);
  border-bottom: 1px solid #e8e1e1;
  padding: 65px 0 10px;
  box-sizing: border-box;
  overflow-y: auto;
}
.windowMsg {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-items: center;
  height: 50px;
  line-height: 50px;
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
  background-color: #c3ceda;
  color: #fff;
}
.chattingBox {
  height: 100px;
}
.chattingInput {
  height: 100px;
  box-sizing: border-box;
  padding: 5px 10px;
  outline: none;
  overflow-y: auto;
}
.sendMessage {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  height: 30px;
}
.chatRecord li {
  /* display: flex;
  align-items: center; */
  overflow: hidden;
  padding: 0 20px;
}
.messageAvatar {
  float: left;
  width: 35px;
  height: 35px;
  vertical-align: middle;
}
.messageBox {
  float: left;
  position: relative;
  max-width: 300px;
  margin-left: 15px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
}
.messageBox::before {
  position: absolute;
  content: '';
  top: 0;
  left: -15px;
  width: 20px;
  height: 0px;
  border: 10px solid transparent;
  border-right-color: #fff;
  box-sizing: border-box;
}


</style>