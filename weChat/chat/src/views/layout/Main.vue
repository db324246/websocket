<template>
  <div class="mainBox">
    <div class="chatWindow">
      <div class="windowMsg">
        <span>{{roomName === 'Saloon' ? '大厅' : roomName}}</span>
      </div>
      <ul class="chatRecord">
        <template v-for="(item, index) in chatRecord" >
          <li :key="index" v-if="item.type='user'">
            <img class="messageAvatar" 
              :style="{'float': item.from.nickName === $store.getters.userInfo.nickName ? 'right' : 'left'}" 
              :src="avatar" alt="" 
              @click="checkUser(item.from)">
            <div :class="item.from.nickName === $store.getters.userInfo.nickName ? 'messageBox_right' : 'messageBox_left'">
              {{item.news}}
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="chattingBox">
      <div class="chattingInput" id="chatContentBox" contenteditable="true" @keydown.prevent.enter="sendMessage">
      </div>
      <div class="sendMessage">
        <el-button size="mini" @click="sendMessage">发送</el-button>
      </div>
    </div>

    <el-dialog
      title='用户信息'
      :visible.sync='dialogVisible'
      width='680px'>
      <el-form :model='userInfo' ref='userInfo' label-width='100px'>
        <el-form-item label='头像：' prop='avatar'>
          <img :src="avatar" class="userAvatar" alt="">
        </el-form-item>
        <el-form-item label='昵称：' prop='nickName'>
          {{userInfo.nickName}}
        </el-form-item>
        <el-form-item label='手机：' prop='phoneNumber'>
          {{userInfo.phoneNumber}}
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import avatar from '@/assets/avatar.jpeg'
export default {
  props: {
    chatRecord: {
      type: Array,
      default: []
    },
    roomName: {
      type: String,
      default: 'Saloon'
    }
  },
  data() {
    return{
      avatar: avatar,
      chatContentBox: undefined,
      userInfo: {},
      dialogVisible: false
    }
  },
  mounted() {
    this.chatContentBox = document.querySelector('#chatContentBox')
    console.log(this.chatContentBox)
  },
  methods: {
    sendMessage() {
      const value = this.chatContentBox.innerText
      this.chatContentBox.innerText = ''
      console.log(value)
      this.$emit('sendMessage', value)
    },
    checkUser(user) {
      this.userInfo = Object.assign({}, this.userInfo, user)
      this.dialogVisible = true
    }
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
.chatRecord {
  height: 100%;
  overflow-y: auto;
}
.chatRecord li {
  /* display: flex;
  align-items: center; */
  overflow: hidden;
  padding: 0 20px;
  margin: 15px 0;
}
.messageAvatar {
  width: 35px;
  height: 35px;
  vertical-align: middle;
  cursor: pointer;
}
.messageBox_right,
.messageBox_left {
  float: left;
  position: relative;
  max-width: 300px;
  min-height: 18px;
  margin-left: 15px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
}
.messageBox_left::before {
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
.messageBox_right {
  float: right;
  margin: 0;
  margin-right: 15px;
}
.messageBox_right::before {
  position: absolute;
  content: '';
  top: 0;
  right: -15px;
  width: 20px;
  height: 0px;
  border: 10px solid transparent;
  border-left-color: #fff;
  box-sizing: border-box;
}
.el-form {
  padding-left: 50px;
}
.userAvatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>