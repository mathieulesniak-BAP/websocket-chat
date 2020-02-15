<template>
  <div id="app">
    socket connected : {{ connected }} room :{{ chatRoomName }}
    <div v-if="!connected">
      <form v-on:submit.prevent="connect">
        <input type="text" v-model="chatRoom" placeholder="chatroom name" />
      </form>
    </div>
    <div v-else>
      <MessagesList />
      <Input />
    </div>
  </div>
</template>

<script>
import MessagesList from "./components/Chat/MessagesList.vue";
import Input from "./components/Chat/Input.vue";

export default {
  name: "App",
  methods: {
    connect() {
      this.$store.dispatch("setRoomName", this.chatRoom);
      this.$store.dispatch("doConnect");
    }
  },
  data: function() {
    return {
      chatRoom: ""
    };
  },
  computed: {
    connected() {
      return this.$store.state.socket.connected;
    },
    chatRoomName() {
      return this.$store.state.socket.roomName;
    }
  },
  components: {
    Input,
    MessagesList
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
