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
export default {
  mounted() {
    console.log(this.$route)
  },
}
</script>

<style>
</style>
