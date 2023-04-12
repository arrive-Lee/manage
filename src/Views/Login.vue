<template>
  <div class="login-container">
    <form class="login-form">
      <h3 class="title">用户登录</h3>
      <input
        type="text"
        class="account"
        v-model="user.account"
        placeholder="账号"
      />
      <input
        type="password"
        class="password"
        v-model="user.password"
        placeholder="密码"
      />
      <button class="login-btn" @click.prevent="login">登陆</button>
    </form>
  </div>
</template>

<script>
import { loginIn } from "../api/login";

export default {
  name: "Login",
  data() {
    return {
      user: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    //登陆
    login() {
      //发送登陆请求
      loginIn(this.user).then((response) => {
        // 获取code,token,message，menuData
        console.log(response);
        const {
          data: { code, token, message },
        } = response;
        // code为2000则登陆成功;
        if (code == "2000") {
          //储存token
          const {
            data: {
              data: { menuData, userInfo },
            },
          } = response;
          localStorage.setItem("token", token);
          //将用户菜单数据存取在store
          this.$store.commit("menu/ADD_MENU_DATA", menuData);
          //动态注册子路由，便于进行权限管理
          this.$store.dispatch("menu/addRoute", this.$router);
          //存储用户信息
          this.$store.commit("home/ADD_USER_INFO", userInfo);
          this.$message({
            message,
            type: "success",
          });
          //跳转路由
          setTimeout(() => {
            this.$router.push({
              name: "index",
            });
          }, 1000);
        } else {
          this.$message.error(message);
          (this.user.password = ""), (this.user.account = "");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  background: url("../assets/images/picture1.jpg") no-repeat;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 600px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    backdrop-filter: blur(15px) saturate(90%);
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    .title {
      font-size: 40px;
      margin-top: 80px;
      letter-spacing: 2px;
    }
    .account,
    .password {
      margin: 20px 0;
      width: 400px;
      height: 50px;
      border: none;
      background: none;
      border-bottom: 4px solid #845ec2;
      font-size: 25px;
      padding-left: 10px;
    }
    .account::placeholder {
      font-size: 30px;
    }
    .password::placeholder {
      font-size: 30px;
    }
    .login-btn {
      margin-top: 20px;
      width: 300px;
      height: 60px;
      font-size: 20px;
      border-radius: 30px;
      border: none;
      background: none;
      box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
        rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
      font-size: 25px;
      transition: all 0.5s ease;
    }
    .login-btn:hover {
      transform: scale(1.1);
    }
  }
}
</style>
>
