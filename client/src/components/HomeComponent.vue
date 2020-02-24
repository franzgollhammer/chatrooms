<template>
  <v-container light-green--text text--accent-2>
    <v-row justify-center>
        <v-col class="text-center pa-5 ma-4">
            <h1 class="font-italic display-3">CHATROOMS</h1>
            <br />
            <p class="pt-5">Enter a chatroom!</p>
            <v-form class>
              <v-text-field dark color="light-green accent-2" label="Username"></v-text-field>
              <v-text-field dark color="light-green accent-2" label="Chatroom"></v-text-field>
              <v-btn block type="submit" class="light-green accent-2 mt-5">Enter Chat</v-btn>
            </v-form>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>