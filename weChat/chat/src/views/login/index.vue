<template>
  <div class='page_container'>
    <div class="loginBox">
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input type="tel" v-model="loginForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input type="text" v-model="loginForm.nickName" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import IO from '@static/socket.io.js'
import { loginPlatform } from '@/api/login.js'
export default {
  data() {
    return {
      loginForm: {
        phoneNumber: undefined,
        nickName: undefined
      },
      socket: undefined,
      rules: {
        phoneNumber: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (sessionStorage.getItem('token')) this.$router.push('/home')
  },
  methods: {
    submitForm() {
      loginPlatform(this.loginForm).then(res => {
        if (res.success) {
          this.$store.commit('saveLoginInfo', res.data)
          this.$router.push('/home')
        }
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style lang='less' scoped>
.page_container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.loginBox {
  width: 450px;
  margin: 250px auto;
  padding: 90px 30px 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 15px #999;
}
</style>