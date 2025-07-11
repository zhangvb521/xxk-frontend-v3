<template>
  <n-layout class="parent-layout">
    <router-view />
  </n-layout>
</template>
<style lang="less">
.parent-layout{
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>