<template>
  <form v-on:submit.prevent="sendMessage">
    <div>Your message :</div>
    <div>
      <input
        type="text"
        v-model="message"
        v-on:keydown="onKeyPress"
        placeholder="Type your message here"
      />
    </div>
  </form>
</template>

<script>
export default {
  props: {
    roomName: String
  },
  data: function() {
    return {
      message: "",
      keypressed: false,
      timer: null
    };
  },
  methods: {
    sendMessage() {
      console.log("SENDING MESSAGE");
      this.$store.dispatch("sendTextMessage", {
        message: { from: "admin", content: this.message },
        roomName: this.roomName
      });
      this.message = "";
    },
    // FIXME: filter keys (alt+tab is considered as keypress)
    onKeyPress() {
      if (!this.keypressed) {
        this.keypressed = true;
        this.sendTypingNotification(true);
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.sendTypingNotification(false);
        this.keypressed = false;
      }, 2000);
    },
    sendTypingNotification(flag) {
      console.log(flag);
      // this.$store.dispatch("sendTypingNotification", flag);
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  width: 100%;

  div:first-child {
    width: 33%;
  }
  div:last-child {
    width: 67%;

    input {
      width: 100%;
    }
  }
}
</style>
