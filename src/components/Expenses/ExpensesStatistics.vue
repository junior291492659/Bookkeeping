<template>
  <div class="statistics">
    <nav class="navbar">
      <div class="date">
        <a href="javascript:;" @click.prevent.stop="changeDate('back')">{{backTag}}</a>
        <a href="javascript:;" class="month" v-if="timeType == 'month'">
          <span class="prefix">{{yearPrefix}}</span>
          {{month}}月
        </a>
        <a href="javascript:;" class="week" v-else-if="timeType == 'week'">
          {{weekAlias}}周
          <span class="postfix">{{weekPostfix}}</span>
        </a>
        <a href="javascript:;" class="year" v-else>
          <!-- <span class="prefix">{{yearPrefix}}</span> -->
          {{year}}年
        </a>
        <a
          href="javascript:;"
          :style="{visibility:forwardHidden}"
          @click.prevent.stop="changeDate('forward')"
        >{{forwardTag}}</a>
      </div>
      <div class="totalPrice">{{totalAmount}}元</div>
    </nav>
    <div class="chart-container" v-if="loaded">
      <!-- <div class="chart-container"> -->
      <DoughnutChart v-if="type == 'category'" :chartData="mydata" :options="options" />
      <LineChart :chartData="mydata" :options="options" v-else />
    </div>

    <div class="norecord" v-if="totalAmount === 0">暂无记录</div>
    <!-- {{year}} {{month}} {{date}} {{day}} {{week}} {{forwardHidden}} -->
  </div>
</template>

<script>
import DoughnutChart from "@/util.js/DoughnutChart.js";
import LineChart from "@/util.js/LineChart.js";
import { Loading } from "element-ui";
import { MessageBox } from "mint-ui";
import moment from "moment";
moment.locale("zh-cn");

export default {
  name: "expensesStatistics",
  components: { DoughnutChart, LineChart },
  props: ["timeType", "type"],
  data() {
    return {
      loaded: false,
      mydata: null,
      options: null,
      // timeType: "month",
      year: -1,
      month: -1,
      date: -1,
      day: -1,
      week: -1,
      backTag: "",
      forwardTag: "",
      yearPrefix: "",
      weekPostfix: "",
      weekAlias: "",
      totalAmount: 0,
      noRecord: false
    };
  },
  methods: {
    //初始化显示的时间信息
    initTime() {
      if (this.timeType == "month") {
        //按月份
        let tempDate = moment();
        this.year = tempDate.get("year");
        this.month = tempDate.get("month") + 1;
        this.date = tempDate.get("date");
        this.day = tempDate.get("day");
        this.backTag = ((this.month - 1 + 12) % 12) + "月";
        this.forwardTag = ((this.month + 1 + 12) % 12) + "月";
      } else if (this.timeType == "week") {
        //按周数
        let tempDate = moment();
        this.year = tempDate.get("year");
        this.month = tempDate.get("month") + 1;
        this.date = tempDate.get("date");
        this.day = tempDate.get("day");
        this.week = tempDate.isoWeek();
        this.backTag = ((this.week - 1 + 52) % 52) + "周";
        this.forwardTag = ((this.week + 1 + 52) % 52) + "周";
        let start = tempDate
          .isoWeeks(this.week)
          .startOf("isoWeek")
          .format("YYYY-M-D");
        let end = tempDate
          .isoWeeks(this.week)
          .endOf("isoWeek")
          .format("YYYY-M-D");
        this.weekPostfix = `${start}至${end}`;
        this.weekAlias = "本";
      } else {
        //按年份
        let tempDate = moment();
        this.year = tempDate.get("year");
        this.backTag = this.year - 1;
        this.forwardTag = this.year + 1;
      }
    },

    //获取该类型下时间段范围
    getStartEnd() {
      if (this.timeType == "month") {
        let start = `${this.year}-${this.month}-1`;
        let end = moment(start, "YYYY-M-D")
          .endOf("month")
          .format("YYYY-M-D");
        return [start, end];
      } else if (this.timeType == "week") {
        return this.weekPostfix.split("至");
      } else {
        return [this.year + "-1-1", this.year + "-12-31"];
      }
    },

    getEveryDay() {
      let startEnd = this.getStartEnd();
      let start = startEnd[0];
      let end = startEnd[1];
      let everyday = [];
      everyday.push(start);
      if (this.timeType == "month" || this.timeType == "week") {
        while (everyday[everyday.length - 1] != end) {
          let tempDate = moment(everyday[everyday.length - 1], "YYYY-M-D")
            .add(1, "days")
            .format("YYYY-M-D");
            everyday.push(tempDate);
        }
      } else {
        everyday.push(end);
      }
      return everyday;
    },

    //修改日期
    changeDate(direction) {
      // console.log(direction);
      if (direction == "back") {
        if (this.timeType == "month") {
          //按月份减一
          this.month -= 1;
          if (this.month < 1) {
            this.year -= 1;
            this.month = 12;
          }
          this.backTag = ((this.month - 1 + 12) % 12) + "月";
          this.forwardTag = ((this.month + 1 + 12) % 12) + "月";
        } else if (this.timeType == "week") {
          //按周数减一
          this.week -= 1;
          if (this.week < 1) {
            this.year -= 1;
            this.week = 52;
          }
          this.backTag = ((this.week - 1 + 52) % 52) + "周";
          this.forwardTag = ((this.week + 1 + 52) % 52) + "周";
          let tempDate = moment();
          if (this.week != tempDate.isoWeek()) {
            this.weekAlias = this.week;
          } else {
            this.weekAlias = "本";
          }
          tempDate = moment(this.year.toString(), "YYYY");
          let start = tempDate
            .isoWeeks(this.week)
            .startOf("isoWeek")
            .format("YYYY-M-D");
          let end = tempDate
            .isoWeeks(this.week)
            .endOf("isoWeek")
            .format("YYYY-M-D");
          this.weekPostfix = `${start}至${end}`;
          // console.log(this.week, tempDate.isoWeek());
        } else {
          //按年份减一
          this.year -= 1;
          this.backTag = this.year - 1;
          this.forwardTag = this.year + 1;
        }
      } else {
        //direction == "forward"
        if (this.timeType == "month") {
          //按月份加一
          this.month += 1;
          if (this.month > 12) {
            this.year += 1;
            this.month = 1;
          }
          this.backTag = ((this.month - 1 + 12) % 12) + "月";
          this.forwardTag = ((this.month + 1 + 12) % 12) + "月";
        } else if (this.timeType == "week") {
          //按周数加一
          this.week += 1;
          if (this.week > 52) {
            this.year += 1;
            this.week = 1;
          }
          this.backTag = ((this.week - 1 + 52) % 52) + "周";
          this.forwardTag = ((this.week + 1 + 52) % 52) + "周";
          let tempDate = moment();
          if (this.week != tempDate.isoWeek()) {
            this.weekAlias = this.week;
          } else {
            this.weekAlias = "本";
          }
          tempDate = moment(this.year.toString(), "YYYY");
          let start = tempDate
            .isoWeeks(this.week)
            .startOf("isoWeek")
            .format("YYYY-M-D");
          let end = tempDate
            .isoWeeks(this.week)
            .endOf("isoWeek")
            .format("YYYY-M-D");
          this.weekPostfix = `${start}至${end}`;
          // console.log(this.week, tempDate.isoWeek());
        } else {
          //按年份加一
          this.year += 1;
          this.backTag = this.year - 1;
          this.forwardTag = this.year + 1;
        }
      }

      // console.log("start-end", this.getStartEnd());
      switch (this.timeType) {
        case "month":
          this.type == "category" ? this.initDoughnutChart("getStatisticsOfTypeByMonth") : this.initLineChart("getStatisticsOfDateByMonth");
          break;
        case "week":
          this.type == "category" ? this.initDoughnutChart("getStatisticsOfTypeByWeek") : this.initLineChart("getStatisticsOfDateByWeek");
          break;
        case "year":
          this.type == "category" ? this.initDoughnutChart("getStatisticsOfTypeByYear") : this.initLineChart("getStatisticsOfDateByYear");
          break;
      }
    },

    initDoughnutChart(byWhat) {
      //byWhat: getStatisticsOfTypeByMonth || getStatisticsOfTypeByWeek || getStatisticsOfTypeByYear
      this.loaded = false;
      let loading = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      try {
        // console.log("in try", this.getStartEnd());
        this.$store
          .dispatch(byWhat, {
            startEnd: this.getStartEnd()
          })
          .then(result => {
            loading.close();
            if (result.errCode === 0) {
              let showData = result.category;
              this.totalAmount = result.totalAmount;
              this.mydata = JSON.parse(JSON.stringify(showData));
              this.options = {
                responsive: true,
                maintainAspectRatio: false
              };
              // console.log("在成功获取数据的时候了");
              this.loaded = true;
            } else {
              //errCode:400  没找到指定日期范围的记录
              this.totalAmount = 0;
            }
          })
          .catch(error => {
            loading.close();
            console.log(error);
            let message = error.response.data.message
              ? err.response.data.message
              : "服务器错误,获取失败";
            MessageBox({
              title: "提示",
              message,
              showCancelButton: false
            });
          });
      } catch (error) {
        // console.log("in chart error");
        console.log(error);
      }
    },

    initLineChart(byWhat) {
      this.loaded = false;
      let loading = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      try {
        // console.log("in try", this.getEveryDay());
        this.$store
          .dispatch(byWhat, {
            everyday: this.getEveryDay()
          })
          .then(result => {
            loading.close();
            if (result.errCode === 0) {
              let showData = result.everyday;
              this.totalAmount = result.totalAmount;
              this.mydata = JSON.parse(JSON.stringify(showData));
              // console.log(this.mydata);
              this.options = {
                responsive: true,
                maintainAspectRatio: false
              };
              // console.log("在成功获取数据的时候了");
              this.loaded = true;
            } else {
              //errCode:400  没找到指定日期范围的记录
              this.totalAmount = 0;
            }
          })
          .catch(error => {
            loading.close();
            console.log(error);
            let message = error.response.data.message
              ? err.response.data.message
              : "服务器错误,获取失败";
            MessageBox({
              title: "提示",
              message,
              showCancelButton: false
            });
          });
      } catch (error) {
        console.log("in chart error");
        console.log(error);
      }
    },

    initChartByType(type){
      switch (this.timeType) {
        case "month":
          type == "category" ? this.initDoughnutChart("getStatisticsOfTypeByMonth") : this.initLineChart("getStatisticsOfDateByMonth");
          break;
        case "week":
          type == "category" ? this.initDoughnutChart("getStatisticsOfTypeByWeek") : this.initLineChart("getStatisticsOfDateByWeek");
          break;
        case "year":
          type == "category" ? this.initDoughnutChart("getStatisticsOfTypeByYear") : this.initLineChart("getStatisticsOfDateByYear");
          break;
      }
    }
  },
  computed: {
    forwardHidden() {
      if (this.timeType == "month") {
        let tempDate = moment();
        return this.year == tempDate.get("year") &&
          this.month == tempDate.get("month") + 1
          ? "hidden"
          : "visible";
      } else if (this.timeType == "week") {
        let tempDate = moment();
        return this.year == tempDate.get("year") &&
          this.week == tempDate.isoWeek()
          ? "hidden"
          : "visible";
      } else {
        let tempDate = moment();
        return this.year == tempDate.get("year") ? "hidden" : "visible";
      }
    }
  },
  watch: {
    timeType(newVal) {
      // console.log("watch timetype", newVal);
      this.initTime();
      switch (newVal) {
        case "month":
          this.type == "category" ? this.initDoughnutChart("getStatisticsOfTypeByMonth") : this.initLineChart("getStatisticsOfDateByMonth");
          break;
        case "week":
          this.type == "category" ? this.initDoughnutChart("getStatisticsOfTypeByWeek") : this.initLineChart("getStatisticsOfDateByWeek");
          break;
        case "year":
          this.type == "category" ? this.initDoughnutChart("getStatisticsOfTypeByYear") : this.initLineChart("getStatisticsOfDateByYear");
          break;
      }
    },
    type(newVal) {
      // console.log("watch timetype", newVal);
      // console.log("watch type......");
      // console.log(this.type, newVal);
      // console.log(this.timeType);
      this.initTime();
      switch (newVal) {
        case "category":
          this.initChartByType("category");
          break;
        case "date":
          this.initChartByType("date");
          break;
      }
    },
    year(newVal) {
      if (this.timeType == "month") {
        let tempDate = moment();
        if (newVal != tempDate.get("year")) {
          this.yearPrefix = newVal + "年";
        } else {
          this.yearPrefix = "";
        }
      }
    },
    backTag(newVal) {
      if (this.timeType == "month") {
        if (newVal == "0月") {
          this.backTag = "12月";
        }
      } else if (this.timeType == "week") {
        if (newVal == "0周") {
          this.backTag = "52周";
        }
      }
    },
    forwardTag(newVal) {
      if (this.timeType == "month") {
        if (newVal == "0月") {
          this.forwardTag = "12月";
        }
      } else if (this.timeType == "week") {
        if (newVal == "0周") {
          this.forwardTag = "52周";
        }
      }
    }
  },
  mounted() {
    // console.log(
    //   moment("2020", "YYYY")
    //     .month(0)
    //     .endOf("month")
    //     .format("YYYY-M-D")
    // );
    this.initTime();

    this.type == "category"
      ? this.initDoughnutChart("getStatisticsOfTypeByMonth")
      : this.initLineChart("getStatisticsOfDateByMonth");
    // console.log(this.getStartEnd());
    // console.log("在mounted中8888888888888888");
    // if(this.timeType != "temp")
    //   this.initDoughnutChart("getStatisticsOfTypeByMonth");
    // // this.timeType = "xxx";
    // // this.timeType = "month";
    // console.log(this.loaded);
    // console.log(this.$refs["chart"]);
    // this.$nextTick(() => {
    //   console.log("在 nextTick中");
    //       console.log(this.$refs["chart"]);
    //     });
  }
  // created(){
  //   console.log("数据被创建了");
  //   this.initTime();
  //   this.initDoughnutChart("getStatisticsOfTypeByMonth");
  // }
};
</script>

<style lang="less" scoped>
.statistics {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .navbar {
    width: 100%;
    min-width: 350px;
    height: 6rem;
    background: #eee;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .date {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        // font-weight: bold;
        width: 3rem;
        color: #767676;
        font-weight: 550;
      }
      > a:nth-child(1) {
        padding: 0.5rem 1rem 0.5rem 1rem;
        background: #e5e5e5;
        border-top-right-radius: 10%;
        border-bottom-right-radius: 10%;
      }

      > a.month {
        height: 3.2rem;
        text-align: center;
        width: 10rem;
        font-weight: 500;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .prefix {
          font-size: 1rem;
        }
      }
      > a.week {
        height: 3.2rem;
        text-align: center;
        width: 10rem;
        font-weight: 500;
        font-size: 1.5rem;
        display: flex;
        flex-direction: column;
        .postfix {
          font-size: 0.8rem;
        }
      }

      > a.year {
        height: 3.2rem;
        text-align: center;
        width: 10rem;
        font-weight: 500;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      > a:nth-child(3) {
        padding: 0.5rem 1rem;
        background: #e5e5e5;
        border-top-left-radius: 10%;
        border-bottom-left-radius: 10%;
      }
    }
    .totalPrice {
      text-align: center;
      font-size: 2rem;
      color: #656565;
    }
  }
  .chart-container {
    width: 80%;
    height: 80%;
  }
  .norecord {
    position: fixed;
    color: #aaa;
    left: 50%;
    top: 45%;
    font-size: 1.2rem;
    transform: translate(-50%, -50%);
  }
}
</style>