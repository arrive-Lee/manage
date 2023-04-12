import Vue from "vue";
import Vuex from "vuex";
import menu from "./menu";
import home from "./home";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu,
    home,
  },
});
