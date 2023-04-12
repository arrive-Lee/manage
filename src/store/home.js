// 主页模块的数据
export default {
  namespaced: true,
  actions: {},
  mutations: {
    //添加用户信息
    ADD_USER_INFO(state, value) {
      state.userInfo = value;
      localStorage.setItem("userInfo", JSON.stringify(value));
    },
    //打开drawer
    OPEN_DRAWER() {
      this.state.drawer = !this.state.drawer;
    },
  },
  state: {
    userInfo: [],
    drawer: false,
  },

  getters: {},
};
