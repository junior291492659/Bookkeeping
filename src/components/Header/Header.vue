<template>
  <div class="header">
    <span class="menu">
      <i class="fa fa-bars" aria-hidden="true"></i>
    </span>

    <span :class="[{'type':true}, {'overview':tab!='statistics'}]">支出</span>

    <div>
      <ul class="cate-time-content" v-show="cateTimeCollapse">
        <li>
          <a href="javascript:;">按月</a>
        </li>
        <li>
          <a href="javascript:;">按年</a>
        </li>
        <li>
          <a href="javascript:;">按周</a>
        </li>
      </ul>
    </div>
    <span class="cate" v-show="tab=='statistics'" @click.stop="showCollapseTime">按月</span>
    <span class="collapse-time" v-show="tab=='statistics'" @click.stop="showCollapseTime">
      <i class="fa fa-caret-down" aria-hidden="true"></i>
    </span>

    <!--添加支出 -->
    <span class="add-expenses" v-show="tab=='overview'"  @click="addExpense">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </span>

    <span class="collapse-type" v-show="tab=='statistics'" @click.stop="showCollapseType">
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    </span>
    <div>
      <ul class="cate-type-content" v-show="cateTypeCollapse">
        <li>
          <a href="javascript:;">按类型</a>
        </li>
        <li>
          <a href="javascript:;">按日期</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "font-awesome/css/font-awesome.css";
export default {
  data() {
    return {
      name: 'header',
      tab: "overview",
      cateTimeCollapse: false,
      cateTypeCollapse: false
    };
  },
  methods: {
    addExpense(){
      this.$router.push({name:"expensesAdd"});
    },
    showCollapseTime() {
      this.cateTimeCollapse = !this.cateTimeCollapse;
      this.cateTypeCollapse && (this.cateTypeCollapse = !this.cateTypeCollapse);
      let collapseTimeShow = () => {
        //改变数据 重要的是在body上绑定事件, 让数据变成false, 最重要的是阻止点击emoji标签时候禁止冒泡到body上,所以用stop,
        this.cateTimeCollapse = false;
        document.body.removeEventListener("click", collapseTimeShow); //消失后,为了性能,取消body这个事件就可以了
      };
      document.body.addEventListener("click", collapseTimeShow); ///这里还没有取消监听 请注意。。。。。。。。。。。。
    },
    showCollapseType() {
      this.cateTypeCollapse = !this.cateTypeCollapse;
      this.cateTimeCollapse && (this.cateTimeCollapse = !this.cateTimeCollapse);
      let collapseTypeShow = () => {
        //改变数据 重要的是在body上绑定事件, 让数据变成false, 最重要的是阻止点击emoji标签时候禁止冒泡到body上,所以用stop,
        this.cateTypeCollapse = false;
        document.body.removeEventListener("click", collapseTypeShow); //消失后,为了性能,取消body这个事件就可以了
      };
      document.body.addEventListener("click", collapseTypeShow);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  background: #1e90ff;
  padding: 1rem 1.5rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  & span {
    font-size: 1.5rem;
    color: #fff;
    padding-right: 1.5rem;
  }
  & > span.type {
    padding-left: 1.5rem;
  }
  & > span.cate {
    font-size: 1rem;
  }
  & > span.collapse-time {
    margin-right: auto;
    font-size: 1rem;
  }
  & > span.collapse-type {
    // padding: 0 3rem 0 0;
    margin-right: 2rem;
  }
  & > span.add-expenses {
    padding: 0 3rem 0 0;
  }
  a {
    text-decoration: none;
    color: #fff;
    font-size: 1rem;
    padding: 0.5rem;
    // padding: 0.5rem 2rem
  }
  > div {
    position: relative;
  }
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
    left: -1rem;
    top: -1.5rem;
    li {
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
    width: 5rem;
    right: 5rem;
    top: -1rem;
    li {
      margin-bottom: 1rem;
      &:last-child {
        margin-bottom: 0;
      }
      a {
        color: #333;
        padding-left: 1rem;
        padding-right: 1rem;
      }
      a:hover {
        background: #303030;
        color: #fff;
      }
    }
  }
  .overview {
    margin-right: auto;
  }
}
</style>