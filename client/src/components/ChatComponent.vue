<template>
  <v-container white--text>
    <v-row justify-center>
      <v-col class="text-center">
        <h1>{{`Welcome ${this.$route.query.username} to the chatroom ${this.$route.query.chatroom}`}}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import io from 'socket.io-client'
const HOST = 'http://localhost:1337/'
export default {
  data() {
    return {
      query: {
        username: this.$route.query.username,
        chatroom: this.$route.query.chatroom,
      },
      socket: io(HOST),
    }
  },
  mounted() {
    this.socket.emit('join', this.query, error => {
      console.log(error)
    })
  },
  beforeDestroy() {
    this.socket.emit('disconnect')
    this.socket.off()
  },
}
</script>

<style>
</style>
