<template>
  <div>
    <v-card outlined width="50%">
      <v-card-title>Chatroom {{ this.roomName }}</v-card-title>
      <v-card-text>
        <div v-for="message in messages" :key="message.id">
          <Message :message="message" />
        </div>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <Input :roomName="roomName" />
      </v-card-actions>
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
