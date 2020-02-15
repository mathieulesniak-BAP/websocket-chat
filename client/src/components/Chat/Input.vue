<template>
  <form v-on:submit.prevent="sendMessage">
    Your message :
    <input
      type="text"
      v-model="message"
      v-on:keydown="onKeyPress"
      placeholder="Type your message here"
    />
  </form>
</template>

<script>
export default {
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
      this.$store.dispatch("sendTextMessage", this.message);
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
      this.$store.dispatch("sendTypingNotification", flag);
    }
  }
};
</script>

<style></style>
