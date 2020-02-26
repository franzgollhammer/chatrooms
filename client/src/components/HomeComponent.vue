<template>
  <v-container light-green--text text--accent-2>
    <v-row justify-center>
      <v-col class="text-center pa-5 ma-4">
        <h1 class="bungee-shade">CHATROOMS</h1>
        <br />
        <p v-if="userExistsError" class="pt-5 red--text">Username is already taken!</p>
        <v-form class>
          <v-text-field v-model="username" dark color="light-green accent-2" label="Username"></v-text-field>
          <v-text-field v-model="chatroom" dark color="light-green accent-2" label="Chatroom"></v-text-field>
          <v-btn
            block
            type="submit"
            @click="joinChat"
            class="light-green accent-2 mt-5"
          >Enter Chatroom</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost:1337'
export default {
  data() {
    return {
      username: '',
      chatroom: 'General',
      userExistsError: false,
    }
  },
  methods: {
    // Join the chatroom
    joinChat: async function() {
      if (this.username && this.chatroom) {
        // Check if username already exists
        const userExists = await axios.get(`${SERVER_BASE_URL}/${this.chatroom}/${this.username}`)
        if (userExists.data) {
          this.userExistsError = true
        } else {
          this.$router.push({
            name: 'Chat',
            query: { username: this.username, chatroom: this.chatroom },
          })
        }
      }
    },
  },
}
</script>

<style scoped>
.bungee-shade {
  font-family: 'Bungee Shade';
  font-size: 2rem;
}
</style>