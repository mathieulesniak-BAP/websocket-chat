<template>
  <div>
    <span>{{ message.from }} : </span>
    <span>{{ message.content }}</span>
  </div>
</template>

<script>
export default {
  props: { message: Object }
};
</script>

<style></style>
