<template>
  <v-container justify-center white--text>
    <v-row>
      <v-col class="text-center">
        <!-- <p>Welcome <span class="light-green--text text--accent-2">{{ userData.username }}</span> to the chatroom <span class="light-green--text text--accent-2">{{ userData.chatroom }}</span></p> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <div :key="message.index" v-for="message in messages">
          <span class="light-green--text text--accent-2">{{message.user}}: </span>
          <span >{{message.message}}</span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-text-field v-model="message" @keyup.enter="sendMessage" dark label="Enter message ..." color="light-green accent-2 mt-5"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn
        class="light-green accent-2 mt-5" 
        @click="leaveChatroom"
        >Leave chatroom</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import io from 'socket.io-client'
const HOST = 'http://localhost:1337'
export default {
  data() {
    return {
      socket: io(HOST),
      userData: {
        username: this.$route.query.username,
        chatroom: this.$route.query.chatroom,
      },
      messages: [],
      message: '',
    }
  },
  methods: {
    joinChatroom() {
      this.socket.emit('join', this.userData, error => {
      console.log('error:', error)
      })
    },
    leaveChatroom() {
      this.socket.emit('disconnect')
      this.socket.off()
      this.$router.push({ name: 'Home' })
    },
    sendMessage() {      
      this.socket.emit('userMessage', this.message, () => this.message = '')
    }

  },
  mounted() {
    this.socket.on('connect', () => {
      this.joinChatroom()
    })
    
    this.socket.on('serverMessage', (message) => {
      this.messages.push(message)
      // console.log('message: ', message)
      console.log('messages :', this.messages)
    })
  },
  beforeDestroy() {
    // Send disconnect event to server and close socket
    this.socket.emit('disconnect')
    this.socket.off()
  },
}
</script>

<style>
</style>
