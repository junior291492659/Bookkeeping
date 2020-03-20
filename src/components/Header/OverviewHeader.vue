<template>
  <div class="header">
    <CommonHeader>
      <span slot="left" class="left" @click="menu">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </span>
      <span slot="title" class="title">支出</span>
      <span slot="right"  @click="addExpense">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </span>
    </CommonHeader>
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader";
export default {
  data(){
    return {
      name: "overviewHeader",
    }
  },
  components: { CommonHeader },
  methods: {
    addExpense() {
      this.$router.push({ name: "expensesAdd" });
    },
    menu(){
      this.$emit('menu');
    }
  }
};
</script>

<style lang="less" scoped>
span {
  font-size: 1.5rem;
}
span.left {
  padding-right: 1.5rem;
  //  color: #000;
}
span.title {
  //  color: #000;
  padding-left: 1.5rem;
  margin-right: auto;
  font-size: 1.5rem;
}
</style>