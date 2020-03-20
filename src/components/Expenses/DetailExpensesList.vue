<template>
  <div class="detail">
    <div class="header">
      <DetailHeader v-if="getDetailList" :date-msg="this.$route.params.date" :cate-msg="{cate:this.$route.params.cate,color:getDetailList[0].color}" @back="back" ></DetailHeader>
      <DetailHeader v-else :date-msg="this.$route.params.date" cate-msg="#1e90ff" @back="back" ></DetailHeader>
    </div>
    <div class="list">
      <ul v-if="getDetailList">
        <!-- <li>
          <div class="left">
            <span>10元</span>
            <span class="description">&nbsp;素菜：20，电影60。素菜：20，电影60。素菜：20，电影60。素菜：20，电影60。素菜：20，电影60。素菜：20，电影60。素菜：20，电影60。</span>
          </div>
          <span>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </span>
        </li> -->

        <li v-for="(value, index) in getDetailList" :key="index" @click="toggleEdit(value.id)">
          <div class="left">
            <span>{{value.amount}}元</span>
            <span class="description" v-if="value.description">{{value.description}}</span>
            <span class="description" v-else>&nbsp;</span>
          </div>
          <span>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </span>
        </li>
      </ul>
      <div class="nodetail" v-else>不好意思，这天没有<span>{{this.$route.params.cate}}</span>类别的记录哦。</div>
    </div>
    <!-- {{this.$route.params}} -->
    <!-- {{getDetailList}} -->
  </div>
</template>

<script>
import DetailHeader from "..//Header/DetailHeader";
import { mapGetters } from "vuex";
import dateManager from "../../util.js/date";
export default {
  data(){
    return {
      name: 'detailExpensesList'
    }
  },
  components: { DetailHeader },
  computed: {
    getDetailList() {
      return this.$store.getters.getListByCategory(
        dateManager.chineseToFormat(this.$route.params.date),
        this.$route.params.cate
      );
    }
  },
  methods:{
    toggleEdit(id){
      // console.log("to Edit");
      // console.log(id);
      // console.log(this.$route.params.date);
      this.$router.push({name:"expensesEdit", params:{date:this.$route.params.date,id}})
    },
    back(){this.$router.push({name:"expenses"})}
  }
};
</script>

<style lang="less" scoped>
body{
      width: 100vw;
      height: 100vh;
      background:#eee;
      margin: 0;
      padding: 0;
    } 
.detail {
  height: 100%;
  width: 100%;
  background: #eee;
  display: flex;
  flex-direction: column;
  position: relative;
  .header{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .list {
    flex: 1;
    padding-top: 3rem;
    background: #eee;
    ul {
      list-style: none;
      margin: 0;
      padding: 1rem;
      li {
        padding: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2rem;
        color: #666;
        border-bottom: solid 1px #ddd;
        div {
          display: flex;
          flex-direction: column;
          .description{
            font-size: 0.8rem;
            display: block;
            width: 16rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    div.nodetail {
      // height: 100%;
      text-align: center;
      font-size: 1.2rem;
      padding-top: 5rem;
      color: #aaa;
      span{
        font-size: 2rem;
      }
    }
  }
}
</style>