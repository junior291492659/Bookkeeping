<template>
  <div class="expenseAdd">
    <div class="header">
      <a href="javascript:;" @click.stop="cancel">取消</a>
      <a href="javascript:;" @click.stop="done">完成</a>
    </div>
    <div class="expenses">
      <span>支出</span>
      <input placeholder="0.00" class="amount" v-model="amount" type="text" @keyup="checkNumber" />
      <span>元</span>
    </div>
    <div class="category">
      <div
        v-for="(value, index) in getCategory"
        :key="index"
        :name="value.name"
        :color="value.color"
        :style="{'background':value.color}"
        :class="{'current':value.name==category.name}"
        @click="changeCategory(value.name,value.color)"
      >{{value.name}}</div>
      <!-- <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>-->
    </div>
    <div class="date expenses">
      <span>日期</span>
      <span v-if="today">今天</span>
      <span v-else>&nbsp;</span>
      <date-picker v-model="pickedDate" valuetype="format" :shortcuts="dateShortcuts"></date-picker>
    </div>
    <div class="note">
      <span>备注</span>
      <textarea v-model="description" rows="3" cols="10" placeholder="请输入备注"></textarea>
    </div>
    <!-- {{category.name}} -->
    <!-- {{category.color}} -->
    <!-- {{getFirstCategory}} -->
    <!-- {{amount}} -->
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/zh-cn";
import dateManager from "../../util.js/date";
import md5 from "js-md5";
import { Toast } from "mint-ui";
import {checkLogin} from '@/api/login';

export default {
  data() {
    return {
      name: "expensesAdd",
      amount: "",
      category: this.$store.getters.getFirstCategory, //category默认选取第一个
      pickedDate: new Date(),
      description: "",
      tempAmount: "",
      today: true, //dateManager.getTodayChinese(new Date()),
      dateShortcuts: [
        { text: "今天", onClick: () => new Date() },
        {
          text: "昨天",
          onClick: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          }
        }
      ]
    };
  },
  components: { DatePicker },
  methods: {
    checkNumber() {
      // this.expenseData.amount = this.expenseData.amount + "";
      let priceReg = /(^[1-9]\d*(\.\d{0,2})?$)|(^0(\.\d{0,2})?$)/;
      if (this.amount != "" && !priceReg.test(this.amount)) {
          // alert("请输入正确的产品价格:整数或者保留两位小数");
          this.amount = this.tempAmount;
        }else {
          this.tempAmount = this.amount;
        }
      // console.log(this.expenseData.amount);
      // this.amount = this.amount.replace(/[^\d.]/g, "");
      // this.amount = this.amount.replace(/(\d+\.)(\.+)/g, (item, p1, p2) => {
      //   console.log("f2");
      //   return p1;
      // });
      // this.amount = this.amount.replace(
      //   /(\d+\.)([0-9][0-9])(.+)/i,
      //   (item, p1, p2, p3) => {
      //     console.log("f3");
      //     return [p1, p2].join("");
      //   }
      // );
      // this.expenseData.amount = this.amount * 1;
    },
    changeCategory(name, color) {
      console.log(name, color);
      if (name != "+") {
        this.category.name = name;
        this.category.color = color;
      } else {
        this.$router.push({ name: "expensesCategoryAdd" });
      }
    },
    cancel() {
      this.$router.back(-1);
    },
    done() {
      //先检测是否登录
      // checkLogin().then(result => {
      //   if (result.errCode === 0){
      //     console.log("在expensesAdd中检测到了登录，准备提交数据");
      //     this.postData();
      //   }
      // })
     console.log("in done", this.amount * 1);
      this.postData();
    console.log("in done");
      
    },
    postData(){
      if (this.amount == "" || parseInt(this.amount) == 0 || this.category.name == "") {
        //没有金额或者没有一个类别了，不允许添加
        Toast({
          message: "没有金额或类别，添加失败",
          position: "bottom",
          duration: 5000
        });
        this.$router.back(-1);
      } else {
        console.log(dateManager.getDayFormat(this.pickedDate));
        console.log("in else....");
        console.log(this.amount * 1);
        let expenseData = {
          id: this.createNewId(),
          amount: this.amount * 1,
          name: this.category.name,
          color: this.category.color,
          description: this.description
        };
        this.$store.commit('addOneExpense',{date:dateManager.getDayFormat(this.pickedDate),expenseData});
        // console.log("提交数据前...");
        this.$store.dispatch('addOneExpense', {date:dateManager.getDayFormat(this.pickedDate),expenseData});
        this.$router.back(-1);
      }
    },
    createNewId() {
      let date = new Date();
      return md5(this.getUserName + date.toString());
    }
  },
  computed: {
    getCategory() {
      return this.$store.getters.getCategory;
    },
    getUserName() {
      return this.$store.getters.getUserName;
    }
    // getFirstCategory(){
    //   return this.$store.getters.getFirstCategory;
    // }
  },
  watch: {
    pickedDate: function(newVal) {
      // if(dateManager.getDayChinese())
      // console.log(this.today);
      // console.log(newVal);
      this.today =
        dateManager.getDayChinese(newVal) == dateManager.getTodayChinese()
          ? true
          : false;
      // console.log(this.today);
    }
  }
};
</script>

<style lang="less" scoped>
.expenseAdd {
  height: 100%;
  background: #eee;
  .header {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    background: #1e90ff;
    a {
      // display: block;
      flex: 1;
      color: #e8fbfe;

      text-align: center;
      padding: 0.8rem;
      font-size: 1.2rem;
      border-right: solid 1px #ccc;
      &:last-child {
        border-right: none;
        // background: red;
      }
    }
  }
  .expenses {
    margin-top: 1.5rem;
    padding: 1rem 0.5rem;

    background: #fff;
    display: flex;
    align-items: center;
    span:nth-of-type(1) {
      flex: 1;
      color: #666;
    }
    span:nth-of-type(2) {
      text-align: right;
      padding-right: 1rem;
      color: #333;
      font-size: 1.5rem;
    }
    .amount {
      text-align: right;
      color: #333;
      font-size: 2rem;
      width: 50%;
      // vertical-align: middle;
      outline: none;
      border: none;
      padding-right: 0.5rem;
    }
  }
  .category {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #fff;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    div {
      position: relative;
      //   border: solid 1px red;
      border-radius: 0.2rem;
      padding: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div.current::after {
      content: "\2714";
      color: #fff;
      //   font-weight: bold;
      position: absolute;
      background: #1e90ff;
      border-radius: 50%;
      padding: 0 0.2rem;
      text-align: center;
      right: 0.1rem;
      top: 0.1rem;
    }
  }
  .date {
    padding: 0.5rem;

    span:nth-child(2) {
      font-size: 1.5rem;
    }
  }
  .note {
    margin-top: 1.5rem;
    padding: 1rem 0.5rem;

    background: #fff;
    display: flex;
    align-items: center;
    span {
      color: #666;
      flex: 1;
    }
    textarea {
      flex: 4;
      border: none;
      outline: none;
      font-size: 1.2rem;
      color: #666;
    }
  }
}
</style>