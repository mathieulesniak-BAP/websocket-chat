<template>
  <div>
    <v-card>
      <v-card-title>Chatroom {{ this.roomName }}</v-card-title>
      <v-card-text>
        <div v-for="message in messages" :key="message.id">
          <Message :message="message" />
        </div>
        -----
        <Input :roomName="roomName" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";
import Input from "@/components/Input.vue";

export default {
  components: { Message, Input },
  props: { roomName: String },
  computed: {
    messages() {
      return this.$store.state.socket.rooms[this.roomName].messages;
    }
  }
};
</script>

<style></style>
