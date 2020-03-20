<template>
  <div class="expense-category">
    <div class="header">
      <a href="javascript:;" @click="cancel">取消</a>
      <a href="javascript:;" @click="done">完成</a>
    </div>
    <div class="category-name">
      <span>名称</span>
      <input type="text" v-model.trim="cateName" placeholder="请输入分类名称" />
    </div>
    <div class="category-name category-color">
      <span>颜色</span>
      <colorPicker v-model="color" default-color="#9b59b6" />
      <span>
        <i class="fa fa-hand-o-left" aria-hidden="true"></i> 点它选择颜色
      </span>
    </div>
    <!-- {{color}} -->
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      name: 'expensesCategoryAdd',
      cateName: "",
      color: "#9b59b6"
    };
  },
  methods: {
    cancel() {
      this.$router.back();
    },
    done() {
      // console.log(this.getCategory);
      if(this.cateName==""){
        Toast({
          message: "类别名称不能为空",
          position: "bottom",
          duration: 3000
        });
        return;
      }
      if (this.getCategory.some(item => item.name == this.cateName)) {
        Toast({
          message: "该类别已存在",
          position: "bottom",
          duration: 3000
        });
        // this.$router.back();
        return;
      }
      let payload = {name:this.cateName,color:this.color}
      this.$store.commit("addCategory", payload);
      this.$store.dispatch("addOneCategory", payload);
      this.$router.back();
    }
  },
  computed: {
    getCategory() {
      return this.$store.getters.getCategory;
    }
  }
};
</script>

<style lang="less" scoped>
.expense-category {
  height: 100%;
  background: #eee;
  .header {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    background: #1e90ff;
    a {
      // display: block;
      flex: 1;
      color: #e8fbfe;

      text-align: center;
      padding: 0.8rem;
      font-size: 1.2rem;
      border-right: solid 1px #ccc;
      &:last-child {
        border-right: none;
        // background: red;
      }
    }
  }
  .category-name {
    margin-top: 1rem;
    background: #fff;
    color: #666;
    padding: 1rem 0.5rem;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    border-bottom: solid 1px #ddd;
    input {
      margin-left: 1.5rem;
      outline: none;
      border: none;
      font-size: 1.2rem;
    }
  }
  .category-color {
    span:nth-of-type(1) {
      margin-right: 1.5rem;
    }
    span:nth-of-type(2) {
      margin-left: 0.5rem;
      color: #999;
    }
  }
}
</style>