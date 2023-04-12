//mock用于模拟数据,mock可以拦截指定接口并生成随机数据

import Mock from "mockjs";
import {
  getTableData,
  getOrderData,
  getChartData,
  getUserData,
  creatUser,
  deleteUser,
  update,
  getLoginInfo,
} from "./mockData";

//拦截/api/home/tableData接口并返回随机数据
Mock.mock("/api/home/tableData", getTableData);

//拦截/api/home/orderData接口并返回随机数据
Mock.mock("/api/home/orderData", getOrderData);

//拦截/api/home/chartData接口并返回随机数据
Mock.mock("/api/home/chartData", getChartData);

//拦截/api/user/getUserData接口并返回随机数据
Mock.mock(RegExp("/api/user/getUserData" + "*"), getUserData);

//拦截/api/user/createUser接口并完成新增
Mock.mock("/api/user/createUser", "post", creatUser);

//拦截/api/user/deleteUser接口并完成删除
Mock.mock("/api/user/deleteUser", "post", deleteUser);

//拦截/api/user/update接口并完成更新
Mock.mock("/api/user/update", "post", update);

//拦截/api/login/loginIn接口并完成更新
Mock.mock(RegExp("/api/login/loginIn*"), getLoginInfo);
