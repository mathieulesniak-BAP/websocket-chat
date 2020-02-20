<template>
  <div
    class="message"
    v-bind:class="{sender: message.from === 'admin', receiver: message.from !== 'admin'}"
  >
    <div class="sender">{{ message.from }}</div>
    <div class="content">{{ message.content }}</div>
  </div>
</template>

<script>
export default {
  props: { message: Object }
};
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: row;
  flex: 0 0 100%;
  margin-bottom: 15px;

  .sender {
    margin: 0 10px;
    align-self: flex-end;
    font-weight: bold;
  }
  .content {
    border-radius: 5px;
    padding: 5px;
    border: solid 1px #ccc;
    width: 100%;
    background: rgba(0, 0, 255, 0.2);
  }

  &.receiver {
    flex-direction: row-reverse;
    .content {
      background-color: rgba(0, 255, 0, 0.2);
    }
  }
}
</style>
