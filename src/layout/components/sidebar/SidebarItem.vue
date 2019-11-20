<template>
  <!-- 通过router中的hidden判断路由菜单的显示和隐藏 -->
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 没有子级菜单 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <!-- 没有子级的菜单展开收起 -->
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <!-- 有子级的菜单判断显示名字图标等 -->
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";
// import FixiOSBug from "./FixiOSBug";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  // mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true, // 对该属性需要做校验规则
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  created() {
    console.log(this.item, this.item.name);
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      // 通过遍历children的hidden判断哪些菜单需要展开和不展开
      console.log("children:", children, "parent:", parent);
      // showingChildren返回通过filter为true的router(都是子路由)
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      console.log("showingChildren:", showingChildren);

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      // 如果没有子级需要显示则显示父级
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        console.log(path);
        return true;
      }

      return false;
    },
    // 传的子路由的path
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      // path这个是引入进来的path模块, resolve是吧后面拼接成一个绝对路径的path
      console.log("this.basePath:", this.basePath);
      console.log("routePath:", routePath);
      console.log("path.resolve:", path.resolve(this.basePath, routePath));
      console.log("onlyOneChild:", this.onlyOneChild);
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
