<template>
  <div class="header">
    <CommonHeader>
      <span slot="left" class="left" @click="menu">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </span>
      <span slot="title" class="title">支出</span>

      <span slot="options" class="collapse-time" @click.stop="showCollapseTime">
        <i class="fa fa-caret-down" aria-hidden="true"></i>
        <div>
          <span class="cate">{{timeType}}</span>
          <ul class="cate-time-content" v-show="cateTimeCollapse">
            <li @click="changeTimeType('month')">
              <a href="javascript:;">按月</a>
            </li>
            <li @click="changeTimeType('year')">
              <a href="javascript:;">按年</a>
            </li>
            <li @click="changeTimeType('week')">
              <a href="javascript:;">按周</a>
            </li>
          </ul>
        </div>
      </span>
      <span slot="right" class="collapse-type" @click.stop="showCollapseType">
        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
        <div>
          <ul class="cate-type-content" v-show="cateTypeCollapse">
            <li @click="changeCateType('category')">
              <a href="javascript:;">按类型显示</a>
            </li>
            <li @click="changeCateType('date')">
              <a href="javascript:;">按日期显示</a>
            </li>
          </ul>
        </div>
        <!-- <span v-if="cateTypeCollapse">xxx</span> -->
      </span>
    </CommonHeader>
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader";
export default {
  data() {
    return {
      timeType: "按月",
      cateTimeCollapse: false,
      cateTypeCollapse: false,  
    };
  },
  components: { CommonHeader },
  methods: {
    menu() {
      this.$emit("menu");
    },
    showCollapseTime() {
      this.cateTimeCollapse = !this.cateTimeCollapse;
      this.cateTypeCollapse && (this.cateTypeCollapse = !this.cateTypeCollapse);
      //   let collapseTimeShow = () => {
      //     //改变数据 重要的是在body上绑定事件, 让数据变成false, 最重要的是阻止点击emoji标签时候禁止冒泡到body上,所以用stop,
      //     this.cateTimeCollapse = false;
      //     document.body.removeEventListener("click", collapseTimeShow); //消失后,为了性能,取消body这个事件就可以了
      //   };
      document.body.addEventListener("click", this.collapseTimeShow); ///这里还没有取消监听 请注意。。。。。。。。。。。。在changeTimeType里面也需要取消
    },
    showCollapseType(){
      this.cateTypeCollapse = !this.cateTypeCollapse;
      this.cateTimeCollapse && (this.cateTimeCollapse = !this.cateTimeCollapse);
      document.body.addEventListener("click", this.collapseTypeShow);
    },

    
    collapseTimeShow() {
      //改变数据 重要的是在body上绑定事件, 让数据变成false, 最重要的是阻止点击emoji标签时候禁止冒泡到body上,所以用stop,
      this.cateTimeCollapse = false;
      document.body.removeEventListener("click", this.collapseTimeShow); //消失后,为了性能,取消body这个事件就可以了
    },
    collapseTypeShow(){
        //改变数据 重要的是在body上绑定事件, 让数据变成false, 最重要的是阻止点击emoji标签时候禁止冒泡到body上,所以用stop,
        this.cateTypeCollapse = false;
        document.body.removeEventListener("click", this.collapseTypeShow); //消失后,为了性能,取消body这个事件就可以了
      },

      changeTimeType(type) {
    switch(type){
        case "month": this.timeType = "按月"; break;
        case "week": this.timeType = "按周"; break;
        default: this.timeType = "按年"; break;
    }
      this.$emit("changeTimeType", type);
      document.body.removeEventListener("click", this.collapseTimeShow);
    },
    changeCateType(cate){
      this.$emit("changeCateType", cate);
      document.body.removeEventListener("click", this.collapseTypeShow);
    }
  }
};
</script>

<style lang="less" scoped>
div.header {
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
    font-size: 1.5rem;
  }
  span.collapse-time {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-right: auto;
    position: relative;
    display: flex;
    align-items: center;
    div span.cate {
      font-size: 1rem;
      padding-left: 0.5rem;
    }
  }
  span.collapse-type {
    // padding-left: 1rem;
    // padding-right: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  //   span.collapse-type {
  //   font-size: 2rem;
  // }
  ul {
    list-style: none;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.2rem;
    padding: 1rem 0.5rem;
  }
  ul.cate-time-content {
    background: #303030;
    width: 3rem;
    left: 2.2rem;
    top: 0;
    li {
      font-size: 1rem;
      padding-bottom: 1rem;
      &:last-child {
        padding-bottom: 0;
      }
      a:hover {
        background: #ddd;
        color: #000;
      }
    }
  }

  ul.cate-type-content {
    background: #fff;
    width: 8rem;
    right: 0.5rem;
    top: 0;
    border-radius: 0.6rem;
    li {
      font-size: 1rem;
      margin-bottom: 1rem;
      padding: 0 1rem;
      &:last-child {
        margin-bottom: 0;
      }
      a {
        color: #666;
        
      }
      a:hover {
        background: #303030;
        color: #fff;
      }
    }
  }
}
</style>