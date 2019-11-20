<template>
  <div :class="classObj" class="app-wrapper">
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
import { mapState } from "vuex";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    TagsView,
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
