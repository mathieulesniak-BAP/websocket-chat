<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped></style>
<script>
export default {
  name: "AppContainer",
  components: {},

  methods: {},
  mounted() {
    this.$store.dispatch("app/setAppLoading", true);
  }
};
</script>
