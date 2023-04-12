import http from "../util/request";

//获取首页data数据的api
export async function getTableData() {
  try {
    return await http.get("/home/tableData");
  } catch (err) {
    console.log(err.message);
  }
}

//获取首页订单数据的api
export async function getOrderData() {
  try {
    return await http.get("/home/orderData");
  } catch (err) {
    console.log(err.message);
  }
}

//获取chart的数据
export async function getChartData() {
  try {
    return await http.get("/home/chartData");
  } catch (err) {
    console.log(err.message);
  }
}
