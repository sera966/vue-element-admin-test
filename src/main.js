import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Element from "element-ui";
import "./styles/element-variables.scss";
import router from "./router";
import "./styles/index.scss";
import "./icons";
import "./permission";

Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount("#app");
