<template>
  <h2>this is index.vue  {{ appName }}</h2>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  const appName = ref('vue3.0')
</script>
<style lang="scss" scoped></style>
 