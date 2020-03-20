<template>
  <div class="edit" :style="{'background':colorMsg}">
    <div class="left">
      <span @click="back">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </span>
      <span>编辑</span>
    </div>
    <div class="right">
      <span @click="remove">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </span>
      <span @click="done">
        <i class="fa fa-check" aria-hidden="true"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: "editHeader"
    }
  },
  props:["color-msg"],
  methods:{
    done(){
      this.$emit("done");
    },
    back(){
      this.$emit("back");
    },
    remove(){
      this.$emit("remove");
    }
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