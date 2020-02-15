<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <Message :message="message" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Message from "./Message.vue";

export default {
  components: { Message },
  computed: {
    ...mapGetters(["messages"])
  }
};
</script>

<style></style>
