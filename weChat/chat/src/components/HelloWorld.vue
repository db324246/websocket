<template>
  <div class="hello">
    <input type="text" id="input">
    <button id="btn">发送</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function () {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://192.168.6.86:3000')

    // Connection opened
    socket.addEventListener('open', function (event) {
      document.querySelector('#btn').onclick = () => {
        socket.send(document.querySelector('#input').value)
      }
    })

    // Listen for messages
    socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
