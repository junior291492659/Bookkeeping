<template>
  <div id="app">
    <!-- <keep-alive exclude="detailExpensesList, expensesEdit, expensesAdd, expensesCategoryAdd, expensesCategoryEdit, login"> -->
    <keep-alive include="expenses">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { checkLogin } from "@/api/login";
import store from "@/store";
import { MessageBox } from "mint-ui";

export default {
  name: "App",
  created() {
    console.log("根组件被创建了");
    //检测token是否有效
    if (this.$route.path != "/login") {
      checkLogin()
        .then(result => {
          if (result.errCode === 0) {
            //将数据发送到store中
            // console.log("在根组件中存储token");
            // this.$store.commit('setToken', result["Authentication-Token"]);
            this.$store.dispatch("loadStore");
          }
        })
        .catch(err => {
          let message = err.response.data.message
            ? err.response.data.message
            : "服务器错误";
          MessageBox({
            title: "提示",
            message,
            showCancelButton: false
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
