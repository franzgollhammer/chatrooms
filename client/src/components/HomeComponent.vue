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
export default {
  data() {
    return {
      username: '',
      chatroom: '',
    }
  },
  methods: {
    joinChat() {
      if (this.username && this.chatroom) {
        this.$router.push({
          name: 'Chat',
          query: { username: this.username, chatroom: this.chatroom },
        })
      } else {
        this.$router.push({ name: 'Home' })
      }
    },
  },
}
</script>

<style>
</style>