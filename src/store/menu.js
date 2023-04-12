// 菜单模块的数据
export default {
  namespaced: true,
  actions: {
    //添加菜单历史记录
    addMenuHistory(context, value) {
      //判断历史记录里面是否有此记录，有则不添加，没有则添加
      const isInclude = context.state.menuHistory.every(
        //路由相同就不添加
        (item) => item[1] != value[1]
      );
      if (isInclude) {
        context.commit("ADD_MENU_HISTORY", value);
      }
    },

    //动态添加子路由，给与路由权限
    addRoute(context, router) {
      const menu = JSON.parse(localStorage.getItem("menu"));
      if (!menu) return;
      else {
        menu.forEach((element) => {
          if (!element.children) {
            const { path, name, url, meta } = element;
            const route = {
              path,
              name,
              meta,
              component: () => import(`../Views/${url}`),
            };
            router.addRoute("index", route);
          } else {
            element.children.forEach((chlid) => {
              const { path, name, url, meta } = chlid;
              const route = {
                path,
                name,
                meta,
                component: () => import(`../Views/${url}`),
              };
              router.addRoute("index", route);
            });
          }
        });
      }
    },
  },
  mutations: {
    // 改变菜单折叠状态
    CHANGE_COLLAPSE_STATUS(state) {
      state.isCollapse = !state.isCollapse;
    },
    //添加菜单历史记录，与头部面包屑进行联动
    ADD_MENU_HISTORY(state, value) {
      state.menuHistory.push(value);
    },
    //点击tag关闭，删除对于的菜单历史
    REMOVE_HISTORY(state, value) {
      state.menuHistory.splice(value, 1);
    },
    //添加菜单
    ADD_MENU_DATA(state, value) {
      state.menu = value;
      //持久化菜单
      localStorage.setItem("menu", JSON.stringify(value));
    },
  },
  state: {
    //控制菜单是否折叠
    isCollapse: false,
    //四个字段分别代表菜单名字，路由路径，命名路由，tag是否可关闭
    menuHistory: [["首页", "/home", "home", false]],
    //每个用户的菜单数据
    menu: [],
  },

  getters: {},
};
