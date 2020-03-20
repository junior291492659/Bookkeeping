<template>
  <div class="category-edit">
    <div class="header">
      <EditHeader @back="back" @done="done" @remove="remove" :color-msg="category.color"></EditHeader>
    </div>
    <div v-if="category.color!='-1'">
      <div class="category-name">
        <span>名称</span>
        <input type="text" v-model.trim="category.name" placeholder="请输入分类名称" />
      </div>
      <div class="category-name category-color">
        <span>颜色</span>
        <colorPicker v-model="category.color" default-color="#9b59b6" />
        <span>
          <i class="fa fa-hand-o-left" aria-hidden="true"></i> 点它选择颜色
        </span>
      </div>
    </div>
    <div v-else class="norecord">
      <span>不好意思，没有该类别可编辑</span>
    </div>
    <!-- {{firstColor}} -->
  </div>
</template>

<script>
import EditHeader from "../Header/EditHeader";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      name: "expensesCategoryEdit",
      category: null,
      firstColor: ""
    };
  },
  created() {
    this.category = this.$store.getters.getCategoryByName(
      this.$route.params.name
    );
    // console.log("in edit");
    // console.log(this.category);
    this.firstColor = this.category.color;
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    done() {
      if (
        this.category.name != this.$route.params.name ||
        this.category.color != this.firstColor
      ) {
        let payload = {
          oldName: this.$route.params.name,
          newName: this.category.name,
          newColor: this.category.color
        };
        //说明已经修改了名称或者颜色
        this.$store.commit("changeCategory", payload);
        this.$store.dispatch("changeOneCategory", payload);
      }
      this.$router.back(-1);
    },

    remove() {
      MessageBox.confirm("删除该类别后所属记录均会丢失，确认要删除吗?").then(action => {
        // console.log("agree");
        this.$store.commit('removeCategory', this.$route.params.name);
        this.$store.dispatch('removeOneCategory', {name: this.$route.params.name});
        this.$router.back(-1);
      }).catch(cancel=>{
        console.log("cancel");
        // console.log(cancel);
        this.$router.back(-1);
      });
    }
  },
  components: { EditHeader }
};
</script>

<style lang="less" scoped>
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
.norecord {
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  padding-top: 2rem;
}
</style>