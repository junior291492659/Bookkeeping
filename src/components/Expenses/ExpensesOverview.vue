<template>
  <div class="overview">
    <nav class="navbar">
      <div class="date">
        <a href="javascript:;" @click="changeDate('back')">前一天</a>
        <a href="javascript:;">{{isToday? "今天" : showDate}}</a>
        <a href="javascript:;" :style="{visibility:forwardTrue}" @click="changeDate('forward')">后一天</a>
      </div>
      <div class="totalPrice">{{totalAmountByDate}}元</div>
    </nav>
    <ul class="overview-list" v-if="cateCombinedByDate">
      <li
        v-for="([name,value]) in cateCombinedByDate"
        :key="value.sublist[0].id"
        @click="toDetailExpenses(getDate,value.sublist[0].name)"
      >
        <span
          v-if="value.amount>0"
          :style="{color:value.sublist[0].color}"
        >{{name}}({{value.amount}}元)</span>
        <transition enter-class="animated bounce">
          <div
            v-if="value.amount>0"
            :style="{background:value.sublist[0].color, width:value.percentage}"
            class="percentage animated fadeInLeft"
          ></div>
        </transition>
      </li>
      <!-- <li  >
        <span>(30元)</span>
        <div  class="percentage"></div>
      </li>-->
    </ul>
    <span class="norecord" v-else>暂无记录</span>

    <!-- {{cateCombinedByDate}} -->
    <!-- {{forwardTrue}} -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import dateManager from "../../util.js/date";
export default {
  data() {
    return {
      name: "expensesOverview",
      date: this.$store.getters.getDate,
      overview: [],
      gapTimes: [] //防止重复增加数据
    };
  },
  created() {
    console.log("我被创建了");
    // this.date = dateManager.getTodayFormat();
  },
  computed: {
    ...mapGetters(["getDate"]),
    ...mapGetters(["totalAmountByDate"]),
    ...mapGetters(["cateCombinedByDate"]),
    forwardTrue() {
      // let date = new Date(this.getDate.replace("年","-").replace("月","-").replace("日",""));

      // console.log(dateManager.getTodayChinese());
      if (dateManager.getTodayChinese() == this.getDate) {
        return "hidden";
      } else return "visible";
    },
    isToday() {
      return this.getDate == dateManager.getTodayChinese() ? true : false;
    },
    showDate() {
      let date = this.getDate;
      if (date.slice(0, 4) == new Date().getFullYear() + "")
        return date.substring(5);
      else return date;
    }
  },
  watch: {
    date(newVal) {
      // console.log("*********date changed");
      let newDateTime = new Date(newVal).getTime();
      let toDayTime = new Date(dateManager.getTodayFormat()).getTime();
      let gap = toDayTime - newDateTime;
      if (gap != 0 && gap % (3600 * 1000 * 24 * 5) === 0) {
        console.log("到增加数据的时候了");
        let times = gap / (3600 * 1000 * 24 * 5);
        if (!this.gapTimes.includes(times)) {
          this.gapTimes.push(times);
          this.$store.dispatch("getMoreExpense", times);
        }
      }
    }
  },
  mounted() {},
  methods: {
    changeDate(direction) {
      // console.log(this.getDate);
      // console.log(direction);
      if (direction == "back") {
        this.date = dateManager.getBackDay(
          dateManager.chineseToFormat(this.date)
        );
      } else {
        this.date = dateManager.getForwardDay(
          dateManager.chineseToFormat(this.date)
        );
      }
      this.$store.commit("changeDate", {
        direction,
        date: dateManager.chineseToFormat(this.getDate)
      });
    },
    toDetailExpenses(date, cate) {
      // console.log("to Detail");
      // console.log(date);
      // console.log(list);
      this.$router.push({ name: "detailExpensesList", params: { date, cate } });
    }
  }
};
</script>

<style lang="less" scoped>
.overview {
  width: 100%;
  height: 100%;
  //   padding-top: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  .navbar {
    width: 100%;
    position: fixed;
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
        color: #767676;
        font-weight: 550;
      }
      > a:nth-child(1) {
        padding: 0.5rem 1rem 0.5rem 1rem;
        background: #e5e5e5;
        border-top-right-radius: 10%;
        border-bottom-right-radius: 10%;
      }

      > a:nth-child(2) {
        font-weight: 500;
        font-size: 1.5rem;
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
  ul.overview-list {
    padding: 8rem 0.5rem 0;
    //   background: red;
    // overflow: hidden;
    li {
      display: flex;
      flex-direction: column;
      color: #ff6b6b;
      margin-bottom: 1.5rem;
      &:last-child {
        margin-bottom: 0;
      }
      span {
        font-size: 1.5rem;
      }
      .percentage {
        height: 1rem;
        background: #ff6b6b;
        margin-top: 0.5rem;
      }
    }
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