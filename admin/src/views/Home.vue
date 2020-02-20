<template>
  <div>
    <v-navigation-drawer app permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Conversations</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item
        v-for="room in rooms"
        link
        v-bind:key="room.name"
        v-on:click="changeRoom(room.name)"
      >
        <v-list-item-content>
          <v-list-item-title
            class="title"
            v-bind:class="{bold: room.name === currentRoom}"
          >ROOM : {{ room.name }} ({{ room.messages.length }})</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <div class="container">
      <ChatRoom v-if="currentRoom != ''" :roomName="currentRoom" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  margin-left: 300px;
}
.bold {
  font-weight: bold;
}
</style>
<script>
// @ is an alias to /src
import ChatRoom from "@/components/ChatRoom.vue";

export default {
  name: "Home",
  components: { ChatRoom },
  data: () => {
    return { currentRoom: "" };
  },
  computed: {
    rooms() {
      return this.$store.state.socket.rooms;
    }
  },
  methods: {
    changeRoom(roomName) {
      console.log("should change room");
      this.currentRoom = roomName;
    }
  }
};
</script>
