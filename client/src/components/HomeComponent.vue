<template>
  <v-container light-green--text text--accent-2>
    <v-row justify-center>
      <v-col class="text-center pa-5 ma-4">
        <h1 class="font-italic display-3">CHATROOMS</h1>
        <br />
        <p class="pt-5">Enter a chatroom!</p>
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
import chatService from '@/services/ChatService'
export default {
  data() {
    return {
      username: '',
      chatroom: '',
    }
  },
  methods: {
    async joinChat() {
      try {
        await chatService.joinChat({
          username: this.username,
          chatroom: this.chatroom,
        })
        this.$router.push({
          name: 'Chat',
          query: { username: this.username, chatroom: this.chatroom },
        })
      } catch (err) {
        console.error(err)
        this.$router.push({
          name: 'Chat',
          query: { username: this.username, chatroom: this.chatroom },
        })
      }
    },
    navigateToChatroom() {},
  },
}
</script>

<style>
</style>