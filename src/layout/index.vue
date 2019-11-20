<template>
  <div class="app-wrapper">
    <!-- sidebar 侧边栏 -->
    <Sidebar class="sidebar-container" />
    <!-- 右侧内容区域 -->
    <div class="main-container">
      <div>
        <!-- 头部 -->
        <Navbar />
        <tags-view />
      </div>
      <router-view />
    </div>
  </div>
</template>
<script>
import { Navbar, Sidebar, TagsView } from "./components";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    TagsView
  }
};
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
