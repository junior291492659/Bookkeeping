<template>
  <div class="expenses-edit">
    <div class="header">
      <EditHeader :color-msg="expenseData.color" @done="done" @back="back" @remove="remove"></EditHeader>
    </div>
    <div class="edit-container">
      <div class="expenses">
        <span>支出</span>
        <input
          placeholder="0.00"
          class="amount"
          v-model="expenseData.amount"
          type="text"
          @keyup="checkNumber"
        />
        <span>元</span>
      </div>
      <div class="category">
        <div
          v-for="(value, index) in getCategory"
          :key="index"
          :style="{'background': value.color}"
          :name="value.name"
          :color="value.color"
          :class="{'current':expenseData.name == value.name}"
          @click="changeCategory(value.name,value.color)"
        >{{value.name}}</div>
        <!-- <div :style="{'background':'#9b59b6'}" class="current">食物</div>
        <div>娱乐</div>
        <div>交通</div>
        <div>衣服</div>
        <div>住房</div>
        <div>其他</div>
        <div>超市</div>
        <div>水电</div>
        <div>+</div>-->
      </div>
      <div class="date expenses">
        <span>日期</span>
        <span v-if="this.$route.params.date==today">今天</span>
        <span v-else>&nbsp;</span>
        <date-picker v-model="pickedDate" valuetype="format" :shortcuts="dateShortcuts"></date-picker>
      </div>
      <div class="note">
        <span>备注</span>
        <textarea v-model="expenseData.description" rows="3" cols="10" placeholder="请输入备注"></textarea>
      </div>
    </div>
    <!-- {{getOneExpenseByDateId}} -->
    <!-- {{expenseData}} -->
    <!-- <br /> -->
    <!-- {{getOneExpenseByDateId.color}} -->
    <!-- {{expenseData.color}} -->
    <!-- {{pickedDate}} -->
    <!-- {{getCategory}} -->
  </div>
</template>

<script>
import EditHeader from "../Header/EditHeader";
import DetailHeader from "../Header/DetailHeader";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/zh-cn";
import dateManager from "../../util.js/date";
import md5 from "js-md5";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      name: "expensesEdit",
      expenseData: this.$store.getters.getOneExpenseByDateId(
        dateManager.chineseToFormat(this.$route.params.date),
        this.$route.params.id
      ),
      amount: "",
      pickedDate: dateManager.chineseToDate(this.$route.params.date),
      tempAmount: "",
      today: dateManager.getTodayChinese(new Date()),
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

  methods: {
    checkNumber() {
      this.expenseData.amount = this.expenseData.amount + "";
      let priceReg = /(^[1-9]\d*(\.\d{0,2})?$)|(^0(\.\d{1,2})?$)/;
      if (this.expenseData.amount != "" && !priceReg.test(this.expenseData.amount)) {
          // alert("请输入正确的产品价格:整数或者保留两位小数");
          this.expenseData.amount = this.tempAmount;
        }else {
          this.tempAmount = this.expenseData.amount;
        }
      // console.log(this.expenseData.amount);
      // this.expenseData.amount = this.expenseData.amount.replace(/[^\d.]/g, "");
      // this.expenseData.amount = this.expenseData.amount.replace(
      //   /(\d+\.)(\.+)/g,
      //   (item, p1, p2) => {
      //     console.log("f2");
      //     return p1;
      //   }
      // );
      // this.expenseData.amount = this.expenseData.amount.replace(
      //   /(\d+\.)([0-9][0-9])(.+)/i,
      //   (item, p1, p2, p3) => {
      //     console.log("f3");
      //     return [p1, p2].join("");
      //   }
      // );
    },
    changeCategory(name, color) {
      console.log(name, color);
      if (name != "+") {
        this.expenseData.name = name;
        this.expenseData.color = color;
      } else {
        this.$router.push({ name: "expensesCategoryAdd" });
      }
    },
    done() {
      // console.log("done");
      let oldId = this.$route.params.id;
      this.expenseData.id = this.createNewId();
      this.expenseData.amount *= 1;
      console.log(document.querySelector(".current"));
      let currentCate = document.querySelector(".current");
      this.expenseData.name = currentCate.getAttribute("name");
      this.expenseData.color = currentCate.getAttribute("color");
      let payload = {
        oldDate: dateManager.chineseToFormat(this.$route.params.date),
        newDate: dateManager.getDayFormat(this.pickedDate),
        oldId,
        oneExpenseData: this.expenseData
      };
      // console.log(this.pickedDate);
      this.$store.commit("changeOneExpense", payload);
      this.$store.dispatch("changeOneExpense", payload);
      // console.log(this.expenseData);
      this.toggleDetailExpense(
        dateManager.getDayChinese(this.pickedDate),
        this.expenseData.name
      );
    },
    toggleDetailExpense(date, cate) {
      this.$router.push({ name: "detailExpensesList", params: { date, cate } });
    },
    back() {
      // console.log("back in edit");
      // this.$router.go(-1);
      this.$router.back(-1);
    },
    remove() {
      console.log("remove in edit");
      MessageBox.confirm("您确定要删除？")
        .then(action => {
          let payload = {
            date: dateManager.chineseToFormat(this.$route.params.date),
            id: this.$route.params.id
          };
          this.$store.commit("removeOneExpense", payload);
          this.$store.dispatch("removeOneExpense", payload);
          console.log("before back");
          this.$router.go(-1);
        })
        .catch(cancel => {});
    },
    createNewId() {
      let date = new Date();
      return md5(this.getUserName + date.toString());
    }
  },
  components: { EditHeader, DatePicker, DetailHeader },
  computed: {
    getOneExpenseByDateId() {
      return this.$store.getters.getOneExpenseByDateId(
        dateManager.chineseToFormat(this.$route.params.date),
        this.$route.params.id
      );
    },
    getCategory() {
      return this.$store.getters.getCategory;
    },
    getListByDate() {
      return this.$store.getters.getListByDate(
        dateManager.chineseToFormat(this.$route.params.date)
      );
    },
    getUserName() {
      return this.$store.getters.getUserName;
    }
  }
};
</script>

<style lang="less" scoped>
.expenses-edit {
  height: 100%;
  width: 100%;
  position: relative;
  background: #eee;
  .header {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }

  .edit-container {
    .expenses {
      margin-top: 6rem;
      padding: 1rem 0.5rem;

      background: #fff;
      display: flex;
      //   justify-content: space-between;
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
      div.current {
        opacity: 0.8;
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
      margin-top: 1.5rem;
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
}
</style>