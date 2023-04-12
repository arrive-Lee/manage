import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import registerUI from "./registerUI";
import router from "./router";
import store from "./store/index";
//引入mock
import "./mock/mock";
import "default-passive-events";

Vue.use(ElementUI);
Vue.use(registerUI);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  created() {
    //刷新页面的时候重新装载路由
    this.$store.dispatch("menu/addRoute", router);
  },
}).$mount("#app");
