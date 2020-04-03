<template>
  <div class="asideBox">
    <div class="userBox">
      <img :src="avatar" alt="">
      <span>{{$store.state.userInfo.nickName}}</span>
    </div>
    <div class="chatRooms">
      <el-scrollbar style="height: 100%;">
        <ul>
          <li :key="index" 
          v-for="(item, index) in roomList" 
          :class="['chatRooms_item', currentRoom === item.name ? 'currentRoom' : '']"
          @click="changeRoom(item)">
            {{item.name === 'Saloon' ? '大厅' : item.name}}
          </li>
          <li class="chatRooms_item" @click="dialogVisible = true">创建聊天室</li>
        </ul>
      </el-scrollbar>
    </div>

    <el-dialog
      title='新建聊天室'
      :visible.sync='dialogVisible'
      width='680px'
      :before-close='handleClose'>
      <el-form :model='roomForm' :rules='rules' ref='roomForm' label-width='100px' style="padding: 0 100px 0 50px">
        <el-form-item label='名称' prop='name'>
          <el-input v-model='roomForm.name'></el-input>
        </el-form-item>
        <el-form-item label='成员' prop='test'>
          <el-select v-model="roomForm.member" style="width: 100%;" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible = false'>取 消</el-button>
        <el-button type='primary' @click='createRoom'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import avatar from '@/assets/avatar.jpeg'
export default {
  props: {
    roomList: Array,
    default: []
  },
  data() {
    return {
      avatar: avatar,
      currentRoom: 'Saloon', // 默认房间是大厅
      dialogVisible: false,
      options: [],
      roomForm: {
        name: '',
        member: []
      },
      rules: {
        name: [
          { reuqire: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    changeRoom(room) {
      this.currentRoom = room.name
      this.$emit('changeRoom', room)
    },
    handleClose() {
      this.dialogVisible = false
    },
    createRoom() {
      
    }
  }
}
</script>

<style lang='less' scoped>
.asideBox {
  height: 100%;
}
.userBox {
  display: flex;
  align-items: center;
  height: 70px;
  padding-left: 10px;
  img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 50%;
  }
}
.chatRooms {
  height: calc(100% - 70px);
}
.chatRooms_item {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.currentRoom {
  color: #fff;
  background-color: #a9bbce;
}
</style>
<style scoped> 
.chatRooms >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>