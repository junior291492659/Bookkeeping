<template>
  <div class="edit" :style="{'background':cateMsg.color}">
    <div class="left">
      <span @click="back">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </span>
      <span v-if="getTodayChinese==dateMsg" >{{cateMsg.cate}}(今天)</span>
      <span v-else>{{cateMsg.cate}}({{dateMsg}})</span>
    </div>
  </div>
</template>

<script>
import dateManager from '../../util.js/date'
export default {
  data(){
    return {
      name: "detailHeader"
    }
  },
  props:["date-msg","cate-msg"],
  computed:{
    getTodayChinese(){
      return dateManager.getTodayChinese();
    }
  },
  methods:{
    back(){
      this.$emit("back");
    },
  }
};
</script>

<style lang="less" scoped>
.edit {
//   width: 100%;
  background: #008874;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  color: #fff;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  span {
    padding: 0.5rem;
  }
  span:nth-of-type(2) {
    margin-left: 2rem;
    font-size: 1.4rem;
  }
  .left {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span:nth-of-type(2) {
      margin-left: 0.5rem;
    }
  }
}
</style>