<template>
  <div class="footer">
    <ul>
      <li :class="[{'current':tab == 'overview'}]" @click="changeTab('overview')">
        <a href="javascript:;">概览</a>
      </li>
      <li :class="[{'current':tab == 'statistics'}]" @click="changeTab('statistics')">
        <a href="javascript:;">统计</a>
      </li>
      <li :class="[{'current':tab == 'category'}]" @click="changeTab('category')">
        <a href="javascript:;">类别</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    data(){
        return {
          name: 'footer',
            tab: "overview"
        }
    },
    // props: ['tab'],
    methods: {
      changeTab(tab){
        if (tab != this.tab){
          this.tab = tab;
          this.$emit("changeTab", tab);
        }
      }
    },
    created(){
      this.tab = this.$store.getters.getTab;
    }
};
</script>

<style lang="less" scoped>
    .footer{
      // margin-top: 1rem;
        border-top: solid 1px #eee;
        ul{
            list-style: none;
            display: flex;
        }
        a {
            text-decoration: none;
        }
        li{
            flex: 1;
            padding: 1rem 0;
            background: #F8F9FB;
            display: flex;
            justify-content: center;
            align-content: stretch;
            font-size: 1.2rem;
            a{
                width: 100%;
                text-align: center;
                color: #6F7072;
                border-right: solid 1px #ECEDEF; 
                box-sizing: border-box;
            }
        }
        li.current {
            background: #1e90ff;
            a {
                color: #F8F9FB;
                border: none;
            }
        }
    }
</style>