<template>
  <Layout v-if="!isParent" />
  <ParentLayout v-if="isParent"/>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import Layout from './components/Layout/index.vue'
import ParentLayout from './parentLayout.vue'
const isParent  = computed(() => window.__POWERED_BY_WUJIE__)
</script>
<style lang="less">

</style>