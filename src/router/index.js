import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "login",
      meta: {
        title: "登陆",
      },
      component: () => import("../Views/Login.vue"),
    },
    {
      //主路由
      path: "/",
      name: "index",
      component: () => import("../Views/Index.vue"),
      // home为默认子路由，通过redirect重定向到默认子路由上
      redirect: "/home",
      children: [
        //首页子路由
        {
          path: "/home",
          name: "home",
          meta: {
            title: "首页",
          },
          component: () => import("../Views/Home.vue"),
        },
      ],
    },
  ],
});

//验证登陆权限
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (token && to.name == "login") {
    next({
      name: "home",
    });
  } else if (!token && to.name != "login") {
    next({
      name: "login",
    });
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  document.title = to.meta.title;
});

export default router;
