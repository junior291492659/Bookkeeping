import dateManager from "../util.js/date";
import { Toast } from "mint-ui";


const mutations = {
  setToken(state, payload) {
    state.token = payload;
    sessionStorage.setItem("token", payload);
  },
  removeToken(state) {
    state.token = "";
    sessionStorage.removeItem("token");
  },
  initStore(state, payload) {
    // console.log("在 initStore中");
    // console.log(payload.category);
    state.category = payload.category;
    state.expenses = payload.expenses;
    state.username = payload.username;
    let plus = state.category.splice(
      state.category.findIndex(item => item.name == "+"),
      1
    );
    state.category.splice(state.category.length, 0, plus[0]);
  },
  getMoreExpense(state, payload) {
    // console.log("在 getMoreExpense");
    // console.log(payload);
    payload.expenses.forEach(item => {
      let index = state.expenses.findIndex(cur => cur.date == item.date);
      if(index != -1){
        // console.log("找到了重复的日期。。。。。。");
        state.expenses.splice(index, 1, item);
      }else{
        state.expenses.push(item);
      }
    });
  },
  changeDate(state, payload) {
    //date:String
    // state.date = "2020-3-1";
    // console.log("here...");
    if (payload.direction == "back") {
      // console.log("in back");
      // console.log(payload.date);
      // console.log(dateManager.getBackDay(payload.date));
      state.date = dateManager.getBackDay(payload.date);
    } else {
      state.date = dateManager.getForwardDay(payload.date);
    }
  },
  changeOneExpense(state, payload) {
    // console.log(payload.oldDate, payload.newDate);
    // console.log(payload.oldId);
    if (payload.oldDate == payload.newDate) {
      //没有修改日期的情况
      // console.log("没有修改日期");
      let dayExpenses = state.expenses.find(
        item => item.date == payload.oldDate
      );
      // console.log(dayExpenses);
      let index = dayExpenses.list.findIndex(item => item.id == payload.oldId);
      // console.log(index);
      dayExpenses.list.splice(index, 1, payload.oneExpenseData);
    } else {
      //修改了日期的情况
      // console.log("日期被修改了");
      let dayExpenses = state.expenses.find(
        item => item.date == payload.oldDate
      );
      // console.log(dayExpenses);
      // console.log("oldId");
      // console.log(payload.oldId);
      let index = dayExpenses.list.findIndex(item => item.id == payload.oldId);
      // console.log(index);
      dayExpenses.list.splice(index, 1); //先删除原来日期中的条目
      if (dayExpenses.list.length == 0) {
        // console.log("删除了一个");
        let index = state.expenses.findIndex(
          item => item.date == payload.oldDate
        );
        state.expenses.splice(index, 1);
      }
      // this.addOneExpense(state, {date:payload.newDate,oneExpense:payload.oneExpenseData})
      dayExpenses = state.expenses.find(item => item.date == payload.newDate);
      if (!dayExpenses) {
        //如果该日期原本就没有任何条目，新建一个
        // console.log("新建了一个");
        state.expenses.push({
          date: payload.newDate,
          list: [payload.oneExpenseData]
        });
      } else {
        dayExpenses.list.push(payload.oneExpenseData);
      }
    }
    Toast({
      message: "更新成功",
      position: "bottom",
      duration: 2000
    });
    // console.log("end of change");
    // console.dir(state.expenses);
  },

  removeOneExpense(state, payload) {
    // console.log(payload.date, payload.id);
    let dayExpenses = state.expenses.find(item => item.date == payload.date);
    let index = dayExpenses.list.findIndex(item => item.id == payload.id);
    // console.log(index);
    dayExpenses.list.splice(index, 1);

    if (dayExpenses.list.length == 0) {
      // console.log("删除了一个");
      let index = state.expenses.findIndex(item => item.date == payload.date);
      state.expenses.splice(index, 1);
    }
  },

  addCategory(state, payload) {
    state.category.splice(state.category.length - 1, 0, payload);
    Toast({
      message: "添加成功",
      position: "bottom",
      duration: 2000
    });
  },

  addOneExpense(state, payload) {
    let dayExpenses = state.expenses.find(item => item.date == payload.date); //返回的是元素 不是数组
    if (!dayExpenses) {
      //如果该日期原本就没有任何条目，新建一个
      state.expenses.push({ date: payload.date, list: [payload.expenseData] });
    } else {
      dayExpenses.list.push(payload.expenseData);
    }
    // console.log("end of add");
    Toast({
      message: "添加成功",
      position: "bottom",
      duration: 2000
    });

  },

  changeCategory(state, payload) {
    state.category.forEach(item => {
      if (item.name == payload.oldName) {
        item.name = payload.newName;
        item.color = payload.newColor;
      }
    });
    state.expenses.forEach(item => {
      item.list.forEach(listItem => {
        if (listItem.name == payload.oldName) {
          listItem.name = payload.newName;
          listItem.color = payload.newColor;
        }
      });
    });
  },

  removeCategory(state, payload) {
    //payload: name
    // console.log("in remove...", payload);
    state.category.splice(
      state.category.findIndex(item => item.name == payload),
      1
    );

    let toRemoveDate = []; //记录被删除玩记录后该天没有任何记录的日期再进行删除
    state.expenses.forEach(item => {
      let index = item.list.findIndex(listItem => listItem.name == payload);
      // console.log("before while", index);
      while (index !== -1) {
        // console.log("in while");
        // console.log(index);
        item.list.splice(index, 1);
        index = item.list.findIndex(listItem => listItem.name == payload);
      } //end of while

      if (item.list.length == 0) {
        toRemoveDate.push(item.date);
      }
    });

    toRemoveDate.forEach(item => {
      state.expenses.splice(
        state.expenses.findIndex(cur => cur.date == item),
        1
      );
    });
  },

  changeTab(state, payload) {
    state.tab = payload;
  }
};

export default mutations;
