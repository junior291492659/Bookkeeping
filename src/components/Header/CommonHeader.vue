<template>
  <div class="header">
      <slot name="left"></slot>
      <slot name="title"></slot>
      <slot name="options"></slot>
      <slot></slot>
      <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: "commonHeader"
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 4rem;
  min-width: 16rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #1e90ff;
  padding: 1rem 1.5rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  color: #fff;
}
</style>