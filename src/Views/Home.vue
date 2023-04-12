<template>
  <div class="home-contianer">
    <el-row>
      <el-col :span="8">
        <!-- home组件左边部分内容 -->
        <div class="left-content">
          <!-- 左边上边部分 -->
          <!-- 用户头像卡片 -->
          <el-card class="user-card" shadow="hover">
            <!-- 分为上下两个部分,上部分用户信息 -->
            <div class="user" slot="header">
              <img src="../assets/images/picture.jpg" alt="0" />
              <div>
                <p>{{ userInfo.userName }}</p>
                <p>{{ userInfo.level }}</p>
              </div>
            </div>
            <!-- 下部分登陆信息 -->
            <div class="login-info">
              <p>
                上次登陆的时间：<span>{{ userInfo.loginTime }}</span>
              </p>
              <p>
                上次登陆的地点：<span>{{ userInfo.loginCity }}</span>
              </p>
            </div>
          </el-card>
          <el-card class="table-card">
            <!-- table数据展示 -->
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              class="table"
            >
              <el-table-column
                v-for="(item, index) in tableLabel"
                :key="index"
                :prop="index"
                :label="item"
              >
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <!-- home组件右边部分内容 -->
      <el-col :span="16">
        <div class="right-content">
          <!-- 头部订单卡片展示区 -->
          <div class="order-cards">
            <el-card
              class="order-card"
              v-for="item in orderData"
              :key="item.name"
              :body-style="{
                display: 'flex',
                padding: '0',
              }"
              shadow="hover"
            >
              <!-- 字体图标 -->
              <i
                :class="`el-icon-${item.icon}`"
                :style="{ backgroundColor: item.color }"
              ></i>
              <!-- 订单信息 -->
              <div class="order-info">
                <p>￥{{ item.value }}</p>
                <p>{{ item.name }}</p>
              </div>
            </el-card>
          </div>
          <!-- 折线图 -->
          <el-card class="chart-card">
            <div ref="line-chart"></div>
          </el-card>
          <div class="chart-card">
            <!-- 柱状图 -->
            <el-card class="histogram-chart">
              <div ref="histogram-charts"></div>
            </el-card>
            <!-- 饼状图 -->
            <el-card class="cirle-chart">
              <div ref="cirle-charts"></div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTableData, getOrderData, getChartData } from "../api/home";
import { mapState } from "vuex";
import echarts from "../registerCharts";
export default {
  name: "Home",
  data() {
    return {
      // table数据
      tableData: [],
      //订单数据
      orderData: [],
      // table表格字段以及对于数据的名字
      tableLabel: {
        type: "商品类别",
        dayBuy: "日销量",
        monthBuy: "月销量",
        total: "总销量",
      },
    };
  },
  created() {
    //获取表格数据
    getTableData().then((response) => {
      const {
        data: { data },
      } = response;
      this.tableData = data;
    });
    //获取订单数据
    getOrderData().then((response) => {
      const {
        data: { data },
      } = response;
      this.orderData = data;
    });
  },
  methods: {
    //绘画折线图
    drawLineChart() {
      //获取表格相关数据
      getChartData().then((response) => {
        const { data } = response;
        const { lineChartData } = data;
        //初始化echarts
        const chart = echarts.init(this.$refs["line-chart"], null, {
          height: 280,
        });
        //获取x轴数据
        const xAxis = Object.keys(lineChartData[0]);
        //获取图表数据组别
        const serise = [];
        xAxis.forEach((key) => {
          serise.push({
            //图标的名字
            name: key,
            //图标类型
            type: "line",
            //每一条折线的数据
            data: lineChartData.map((item) => item[key]),
          });
        });
        //初始化图表
        chart.setOption({
          title: {
            text: "销售总量图",
          },
          tooltip: {},
          xAxis: {
            data: xAxis,
          },
          yAxis: {},
          series: serise,
          legend: {
            data: xAxis,
          },
        });
      });
    },
    //绘画柱状图
    drawBarChart() {
      getChartData().then((response) => {
        const {
          data: { barChartData },
        } = response;
        //初始化柱状图
        const histogramChart = echarts.init(
          this.$refs["histogram-charts"],
          null,
          {
            height: 260,
          }
        );
        //x轴数据
        const xAxis = barChartData.map((key) => key.date);
        //多少个系列
        const series = [
          {
            type: "bar",
            data: barChartData.map((key) => key.active),
          },
          {
            type: "bar",
            data: barChartData.map((key) => key.new),
          },
        ];
        histogramChart.setOption({
          title: {
            text: "日均活跃对比图",
          },
          tooltip: {},
          legend: {},
          xAxis: {
            data: xAxis,
          },
          yAxis: {
            type: "value",
          },
          series: series,
          itemStyle: {
            barBorderRadius: 5,
            borderWidth: 1,
            borderType: "solid",
            borderColor: "#73c0de",
            shadowColor: "#5470c6",
            shadowBlur: 3,
          },
        });
      });
    },
    //绘画饼状图
    drawPieChart() {
      getChartData().then((response) => {
        const {
          data: { pieChartData },
        } = response;
        //初始化饼状图
        const pieChart = echarts.init(this.$refs["cirle-charts"], null, {
          height: 260,
        });
        pieChart.setOption({
          title: {
            text: "产品营销对比图",
          },
          series: {
            type: "pie",
            data: pieChartData,
          },
        });
      });
    },
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo"));
    },
  },
  mounted() {
    this.drawLineChart();
    this.drawBarChart();
    this.drawPieChart();
  },
};
</script>

<style lang="less" scoped>
//左部分
.el-col:first-child {
  padding-right: 15px;
  .user-card {
    .user {
      display: flex;
      align-items: center;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
        object-fit: cover;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
          rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
      }
      div {
        p:first-child {
          font-size: 32px;
        }
        p:last-child {
          color: #999999;
          margin-top: 10px;
        }
      }
    }
    .login-info {
      p {
        font-size: 14px;
        line-height: 28px;
        span {
          margin-left: 60px;
          color: #666666;
        }
      }
    }
  }
  .table-card {
    height: 460px;
    margin-top: 20px;
    .table {
      font-size: 12px;
    }
  }
}

//右部分
.el-col:last-child {
  padding-left: 10px;
  .order-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .order-card {
      width: 32%;
      margin-bottom: 10px;
      i {
        width: 80px;
        height: 80px;
        font-size: 30px;
        line-height: 80px;
        text-align: center;
        color: white;
      }
      .order-info {
        height: 80px;
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p:first-child {
          font-size: 30px;
          line-height: 30px;
          height: 30px;
        }
        p:last-child {
          margin-top: 10px;
          font-size: 14px;
          color: #999999;
          text-align: center;
        }
      }
    }
  }
  .chart-card:nth-child(2) {
    height: 280px;
    div {
      height: 100%;
    }
  }
  .chart-card:last-child {
    margin-top: 20px;
    height: 280px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
    }
  }
}
</style>
