<template>
  <div class="app-wrapper">
    <!-- sidebar 侧边栏 -->
    <sidebar class="sidebar-container" />
    <!-- 右侧内容区域 -->
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>
<script>
import sidebar from './components/sidebar';
export default {
  name: 'Layout',
  components: {
    sidebar
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
