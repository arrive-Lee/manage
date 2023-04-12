import Mock from "mockjs";
import { nanoid } from "nanoid";
//生成首页随机的tableData数据
export const getTableData = () => {
  return Mock.mock({
    code: 2000,
    "data|6": [
      {
        "type|1": [
          "小米",
          "苹果",
          "华为",
          "魅族",
          "vivo",
          "oppo",
          "联想",
          "戴尔",
          "机械革命",
          "红米",
          "lv",
        ],
        "dayBuy|1000-5000": 1000,
        "monthBuy|100000-500000": 100000,
        "total|1000000-5000000": 1000000,
      },
    ],
  });
};

//生成首页随机的订单数据
export const getOrderData = () => {
  return Mock.mock({
    code: 2000,
    data: [
      {
        name: "今日支付订单总额",
        "value|10000-50000": 10000,
        icon: "success",
        color: "@Color()",
      },
      {
        name: "今日收藏订单总额",
        "value|10000-50000": 10000,
        icon: "star-on",
        color: "@Color()",
      },
      {
        name: "今日未支付订单总额",
        "value|10000-50000": 10000,
        icon: "s-goods",
        color: "@Color()",
      },
      {
        name: "本月支付订单总额",
        "value|100000-500000": 100000,
        icon: "success",
        color: "@Color()",
      },
      {
        name: "本月收藏订单总额",
        "value|100000-500000": 100000,
        icon: "star-on",
        color: "@Color()",
      },
      {
        name: "本月未支付订单总额",
        "value|100000-500000": 100000,
        icon: "s-goods",
        color: "@Color()",
      },
    ],
  });
};

//生成饼状数据
export const getChartData = () => {
  return Mock.mock({
    code: 2000,
    //折线图数据
    "lineChartData|6": [
      {
        苹果: "@integer(20000,200000)",
        小米: "@integer(20000,200000)",
        华为: "@integer(20000,200000)",
        vivo: "@integer(20000,200000)",
        oppo: "@integer(20000,200000)",
        联想: "@integer(20000,200000)",
      },
    ],
    //柱状图数据
    barChartData: [
      {
        date: "星期一",
        new: "@integer(100,1000)",
        active: "@integer(5000,10000)",
      },
      {
        date: "星期二",
        new: "@integer(100,1000)",
        active: "@integer(5000,10000)",
      },
      {
        date: "星期三",
        new: "@integer(100,1000)",
        active: "@integer(5000,10000)",
      },
      {
        date: "星期四",
        new: "@integer(100,1000)",
        active: "@integer(5000,10000)",
      },
      {
        date: "星期五",
        new: "@integer(100,1000)",
        active: "@integer(5000,10000)",
      },
      {
        date: "星期六",
        new: "@integer(100,1000)",
        active: "@integer(5000,10000)",
      },
      {
        date: "星期天",
        new: "@integer(100,1000)",
        active: "@integer(5000,10000)",
      },
    ],
    //饼图数据
    pieChartData: [
      {
        value: "@integer(20000,200000)",
        name: "苹果",
      },
      {
        value: "@integer(20000,200000)",
        name: "小米",
      },
      {
        value: "@integer(20000,200000)",
        name: "华为",
      },

      {
        value: "@integer(20000,200000)",
        name: "vivo",
      },
      {
        value: "@integer(20000,200000)",
        name: "oppo",
      },
      {
        value: "@integer(20000,200000)",
        name: "联想",
      },
    ],
  });
};

//生成用户列表
const userList = [];
const gender = ["男", "女"];
const count = 200;
for (let i = 0; i < count; i++) {
  const user = {
    id: nanoid(),
    name: Mock.Random.cname(),
    gender: gender[Mock.Random.integer(0, 1)],
    age: Mock.Random.integer(20, 50),
    birthday: Mock.Random.datetime("yyyy-MM-dd"),
    address: Mock.Random.county(true),
  };
  userList.push(user);
}

//处理get请求的url拿到参数
const handleUrl = (url) => {
  url = decodeURIComponent(url);
  const values = url.split("?")[1].split("&");
  const params = {};
  values.forEach((item) => {
    params[item.split("=")[0]] = item.split("=")[1];
  });
  return params;
};

//获取用户数据
export const getUserData = (option) => {
  let { pageSize, current, info } = handleUrl(option.url);
  pageSize = +pageSize;
  current = +current;
  if (info == "") {
    return {
      code: "2000",
      userList: userList.slice((current - 1) * pageSize, current * pageSize),
      count: userList.length,
    };
  } else {
    const filters = userList.filter((item) => item.name.includes(info));
    return {
      code: "2000",
      userList: filters.slice((current - 1) * pageSize, current * pageSize),
      count: filters.length,
    };
  }
};

//新增一名用户
export const creatUser = (option) => {
  userList.unshift(JSON.parse(option.body));
  return {
    code: "2000",
    isSuccess: true,
  };
};

//删除一名用户
export const deleteUser = (option) => {
  const { id } = JSON.parse(option.body);
  const index = userList.findIndex((item) => item.id != id);
  userList.splice(index, 1);
  return {
    code: "2000",
    isSuccess: true,
  };
};

//更新用户消息
export const update = (option) => {
  const user = JSON.parse(option.body);
  const { id } = user;
  const index = userList.findIndex((item) => item.id == id);
  userList[index] = user;
  return {
    code: "2000",
    isSuccess: true,
  };
};

//登陆
export const getLoginInfo = (option) => {
  console.log(option.url);
  const { account, password } = handleUrl(option.url);
  if (account == "admin" && password == "123456") {
    return {
      code: "2000",
      token: nanoid(),
      message: "登陆成功!",
      data: {
        menuData: [
          {
            path: "/home",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home.vue",
            meta: {
              title: "首页",
            },
          },
          {
            path: "/user",
            name: "user",
            label: "用户管理",
            icon: "user",
            url: "User.vue",
            meta: {
              title: "用户管理",
            },
          },
          {
            path: "/mall",
            name: "mall",
            label: "个人信息",
            icon: "video-play",
            url: "Mall.vue",
            meta: {
              title: "商品管理",
            },
          },

          {
            label: "其它",
            icon: "location",
            children: [
              {
                path: "/page1",
                name: "page1",
                label: "页面1",
                icon: "setting",
                url: "Page1.vue",
                meta: {
                  title: "其它",
                },
              },
              {
                path: "/page2",
                name: "page2",
                label: "页面2",
                icon: "setting",
                url: "Page2.vue",
                meta: {
                  title: "其它",
                },
              },
            ],
          },
        ],
        userInfo: {
          userName: Mock.Random.cname(),
          loginCity: Mock.Random.city(),
          loginTime: Mock.Random.datetime(),
          level: "超级管理员",
          headporit: Mock.Random.image(),
        },
      },
    };
  } else if (account == "2429162154" && password == "123456") {
    return {
      code: "2000",
      token: nanoid(),
      message: "登陆成功!",
      data: {
        menuData: [
          {
            path: "/home",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home.vue",
            meta: {
              title: "首页",
            },
          },
          {
            path: "/user",
            name: "user",
            label: "用户管理",
            icon: "user",
            url: "User.vue",
            meta: {
              title: "用户管理",
            },
          },
        ],
        userInfo: {
          userName: Mock.Random.cname(),
          loginCity: Mock.Random.city(),
          loginTime: Mock.Random.datetime(),
          level: "普通用户",
          headporit: Mock.Random.image(),
        },
      },
    };
  } else {
    return {
      code: "4000",
      token: nanoid(),
      message: "账号或密码错误，请重新输入",
    };
  }
};
