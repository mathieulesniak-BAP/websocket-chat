<template>
  <div>
    <v-navigation-drawer app permanent>
      <v-list-item v-for="room in rooms" link v-bind:key="room.name">
        <v-list-item-content>
          <v-list-item-title class="title" v-on:click="changeRoom(room.name)">
            ROOM : {{ room.name }}
          </v-list-item-title>
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
