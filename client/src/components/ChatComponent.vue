<template>
  <v-container justify-center white--text>
    <v-row>
      <v-col cols="12" xl="8" lg="8" md="8" sm="8">
        <v-row>
          <v-col class="text-center chatbox">
            <div :key="message.index" v-for="message in messages">
              <span v-if="message.user !== 'admin'" class="light-green--text text--accent-2">{{message.user}}: </span>
              <span v-if="message.user === 'admin'" class="purple--text text--accent-2">{{message.user}}: </span>
              <span >{{message.message}}</span>
            </div>
          </v-col>
        </v-row>
        <v-row class="px-3">
          <v-col class="text-center">
            <v-text-field v-model="message" @keyup.enter.prevent="sendMessage" dark label="Press enter to send message" color="light-green accent-2 mt-5"></v-text-field>
          </v-col>
          <v-btn
                @click.prevent="sendMessage"
                class="light-green accent-2 mt-5"
              >Send</v-btn>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn
            class="purple darken-2 mt-5" 
            @click="leaveChatroom"
            >Leave chatroom</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xl="4" lg="4" md="4" sm="4" class="text-center">
        <p class="light-green--text text--accent-2">Users online</p>
        <ul class="text-left">
          <li :key="user.index" v-for="user in roomData.users">🟢 {{user.username}}</li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import io from 'socket.io-client'
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost:1337'
export default {
  data() {
    return {
      socket: io(SERVER_BASE_URL),
      userData: {
        username: this.$route.query.username,
        chatroom: this.$route.query.chatroom,
      },
      messages: [],
      message: '',
      roomData: {}
    }
  },
  methods: {
    joinChatroom() {
      this.socket.emit('join', this.userData, error => {
      if (error) {
        this.$router.push({
          name: 'Home',
          query: { error: 'userExists'}
        })
      }
      })
    },
    leaveChatroom() {
      this.socket.emit('leave')
      this.socket.close()
      this.$router.push({ name: 'Home' })
    },
    sendMessage() {
      if (this.message) {
        this.socket.emit('userMessage', this.message, () => this.message = '')
      }      
    }

  },
  mounted() {
    this.socket.on('connect', () => {
      this.joinChatroom()
    })
    
    this.socket.on('serverMessage', (message) => {
      this.messages.push(message)
    })
    this.socket.on('roomData', (roomData) => {
      this.roomData = roomData
      console.log(this.roomData)
    })
  },
  beforeDestroy() {
    this.socket.emit('leave')
    this.socket.close()
  },
}
</script>

<style>
.chatbox {
  max-height: 400px;
  overflow-y: scroll;
}
ul {
  list-style-type: none;
}
</style>
