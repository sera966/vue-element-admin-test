<template>
  <div>
    <template v-if="hasOneShowingChild(item.children, item)">
      <app-link>
        <!-- 显示没有子级的菜单路由 -->
        <el-menu-item>
          <item :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else ref="subMenu">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta&&item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>
<script>
import AppLink from "./Link";
export default {
  name: "SidebarItem",
  components: { AppLink },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    this.onlyOneChild = null;
  },
  methods: {
    hasOneShowingChild() {
      //
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
