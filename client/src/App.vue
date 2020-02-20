<template>
  <div id="app">
    <h1>Client chat</h1>

    <div v-if="!connected">
      <form v-on:submit.prevent="connect">
        <input type="text" v-model="chatRoom" placeholder="chatroom name" />
      </form>
    </div>
    <div v-else>
      <MessagesList />
      <Input />
    </div>
    <div class="status">
      <b>socket connected :</b>
      {{ connected ? '✅' : '❌' }}
      <br />
      <b>room :</b>
      {{ chatRoomName }}
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
* {
  box-sizing: border-box;
}
body {
  background: #f0f0f0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  width: 400px;
  border: solid 1px #eee;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 10px;
  color: #2c3e50;
  margin-top: 60px;
  background: white;
}

input {
  height: 30px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 1px #ccc;
  padding: 0 5px;
  width: 100%;
}

.status {
  margin-top: 10px;
  padding-top: 10px;
  border-top: solid 1px #eee;
  font-size: 12px;
}
</style>
