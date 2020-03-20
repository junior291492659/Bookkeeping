<template>
  <div class="category">
    <ul v-show="getCategory.length>0">
      <!-- <li>
        <span class="color"></span>
        <span class="name">食物</span>
        <span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>
      </li> -->
      <li v-for="value in getCategory" :key="value.name" @click="editExpenseCategory(value.name)">
          <span class="color" :style="{'background':value.color}"></span>
        <span class="name">{{value.name}}</span>
        <span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>
      </li>

    </ul>
    <!-- {{getCategory.length}} -->
  </div>
</template>

<script>
export default {
    data(){
        return {
            name: "expenseCategoryList",
            category: this.$store.getters.getCategoryWithoutPlus
        }
    },
    // created(){
    //     console.log("in categoryList");
    //     this.category = this.getCategory;
    //     console.log(this.category);
    //     this.category.splice(this.category.length-1, 1);
    // },
    methods: {
        editExpenseCategory(name){
            // console.log("跳转edit", name);
            this.$router.push({name:"expensesCategoryEdit", params:{name:name}});
        }
    },
    computed :{
        getCategory(){
            let cate = JSON.parse(JSON.stringify(this.$store.getters.getCategory));
            cate.splice(cate.length-1, 1);
            return cate;
        }
    }
};
</script>

<style lang="less" scoped>
    li {
        padding: 1.2rem;
        display: flex;
        align-items: center;
        border-bottom: solid 1px #ddd;
        span {
            color: #757575;
        }
        span:nth-child(1){
            width: 2rem;
            height: 2rem;
            background: turquoise;
        }
        span:nth-child(2) {
            padding-left: 1rem;
            font-size: 1.2rem;
            font-weight: 500;
            margin-right: auto;
        }
    }
</style>