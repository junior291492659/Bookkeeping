<template>
  <div>

    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">点我打开</el-button>

    <div>
        <el-drawer
      
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :with-header="false"
      class = "drawer"
      :size="size"
      :modal-append-to-body = "false"
    >
      <span>我来啦!</span>
    </el-drawer>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      drawer: false,
      direction: "ltr",
      size:'60%'
    };
  },
  methods: {
    handleClose(done) {
      done()
    }
  }
};
</script>

<style lang="less" scoped>
.drawer {
    margin-top: 5rem;
}
</style>