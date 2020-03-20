<template>
  <div class="expenses">
    <div class="header" v-show="tab=='overview'">
      <OverviewHeader @menu="menu"></OverviewHeader>
    </div>
    <div class="header" v-show="tab=='statistics'">
      <StatisticsHeader @menu="menu" @changeTimeType="changeTimeType" @changeCateType="changeCateType"></StatisticsHeader>
    </div>
    <div class="header" v-show="tab=='category'">
      <CategoryHeader @menu="menu"></CategoryHeader>
    </div>

    <div>
      <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        :with-header="false"
        class="drawer"
        :size="size"
        :modal-append-to-body="false"
        ref="drawer"
      >
        <div class="container-expenses">
          <div class="logo">
            <span>
              <i class="fa fa-usd fa-2x" aria-hidden="true"></i>
            </span>
            <span>爱记账</span>
          </div>
          <span class="login-option" @click="login" v-if="getToken">
            登录
            <span class="hint">(您已登录)</span>
          </span>
          <span class="login-option" @click="login" v-else>登录</span>
          <span class="expenses-option" @click="expenses">支出</span>
          <span>收入</span>
        </div>
      </el-drawer>
    </div>
    <main>
      <div v-if="tab=='overview'">
        <ExpensesOverview></ExpensesOverview>
      </div>
      <div v-else-if="tab=='statistics'">
        <ExpensesStatistics :timeType="timeType" :type="type"></ExpensesStatistics>
      </div>
      <div v-else>
        <ExpenseCategoryList></ExpenseCategoryList>
      </div>
      <!-- <router-view /> -->
    </main>

    <div class="footer" :tab="tab">
      <Footer @changeTab="changeTab"></Footer>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ExpensesOverview from "../components/Expenses/ExpensesOverview";
import ExpensesStatistics from "../components/Expenses/ExpensesStatistics";
import OverviewHeader from "../components/Header/OverviewHeader";
import StatisticsHeader from "../components/Header/StatisticsHeader";
import CategoryHeader from "../components/Header/CategoryHeader";
import ExpenseCategoryList from "../components/category/ExpenseCategoryList";
import { Toast } from "mint-ui";

export default {
  name: "expenses",
  data() {
    return {
      name: "expenses",
      tab: "overview",
      drawer: false,
      direction: "ltr",
      size: "70%",
      timeType: "month",
      type: "category"
    };
  },
  components: {
    Header,
    Footer,
    ExpensesOverview,
    ExpensesStatistics,
    ExpenseCategoryList,
    OverviewHeader,
    StatisticsHeader,
    CategoryHeader
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
      // this.$store.commit("changeTab", tab);
    },
    menu() {
      this.drawer = true;
    },
    handleClose(done) {
      done();
    },
    login() {
      if (this.getToken) {
        this.$refs.drawer.handleClose();
        Toast({
          message: "您已登录",
          position: "bottom",
          duration: 3000
        });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    expenses() {
      if (this.$route.name != "expenses") {
        this.$router.push({ name: "expenses" });
      } else {
        this.$refs.drawer.handleClose();
      }
    },
    changeTimeType(type) {
      this.timeType = this.timeType != type ? type : this.timeType;
    },
    changeCateType(cate) {
      this.type = this.type != cate ? cate : this.type;
    }
  },
  computed: {
    currentComponent() {
      if (this.tab == "overview") return "ExpensesOverview";
    },
    getToken() {
      return this.$store.getters.getToken;
    }
  }
};
</script>
<style lang="less" scoped>
.expenses {
  width: 100%;
  height: 100%;
  position: relative;
  // display: flex;
  // flex-direction: column;

  // justify-content: space-between;
  main {
    padding-top: 4rem;
    padding-bottom: 4rem;
    min-width: 350px;
    // height: 100%;
    // div{height: 100%;}
  }
  .drawer {
    margin-top: 4rem;
    .container-expenses {
      height: 100%;
      background: #eee;
      display: flex;
      flex-direction: column;
      // align-items: center;
      padding: 1rem;
      div.logo {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          border: none;
          color: #000;
        }
        span:nth-child(1) {
          font-size: 2rem;
          padding-right: 1rem;
        }
        span:nth-child(2) {
          font-size: 1.5rem;
        }
      }
      span {
        font-size: 1.2rem;
        color: #333;
        padding: 1rem;
        border-bottom: solid 1px #ddd;
        .hint {
          font: 0.8rem;
          color: #aaa;
        }
      }
    }
  }
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>