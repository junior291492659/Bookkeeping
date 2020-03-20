import dateManager from "../util.js/date";
import oneExpense from "../util.js/oneExpense";
const getters = {
  cartList(state) {
    return state.cartList;
  },
  cartCount(state, getters) {
    return getters.cartList.length;
  },
  getToken(state){
    return state.token;
  },
  getExpenses(state){
    return state.expenses;
  },
  getDate(state) {
    return dateManager.getDayChinese(state.date);
  },
  overviewByDate(state) {
    // console.log("overview");
    // console.log(state.date);
    // console.log(state.expenses);
    // console.log(state.expenses.filter((item)=>item["date"]==state.date));
    return state.expenses.filter(item => item["date"] == state.date);
  },
  totalAmountByDate(state, getters) {
    let res = getters.overviewByDate[0];
    // console.log(res);
    return res
      ? res.list.reduce((sum, cur) => {
          return sum + cur["amount"];
        }, 0)
      : "0.00";
  },
  cateCombinedByDate(state, getters) {
    let res = getters.overviewByDate[0];
    if (!res) return undefined;

    let combinedList = new Map();
    state.category.forEach(cate => {
      let temp = { amount: 0, sublist: [] };
      combinedList.set(cate["name"], temp);
      res.list.forEach(item => {
        if (
          combinedList.has(item["name"]) &&
          !combinedList.get(item["name"]).sublist.includes(item)
        ) {
          combinedList.get(item["name"]).amount += item.amount;
          combinedList.get(item["name"]).sublist.push(item);
        }
      });
    });

    for (let key of combinedList.keys()) {
      if (combinedList.get(key).amount == 0) {
        combinedList.delete(key);
      }
    }

    let tempArr = [...combinedList].sort((a, b) => {
      return b[1].amount - a[1].amount;
    });
    // console.log(tempArr);
    let maxAmount = tempArr[0][1].amount;
    combinedList = new Map(tempArr);
    for (let key of combinedList.keys()) {
      combinedList.get(key).percentage =
        (combinedList.get(key).amount / maxAmount).toFixed(2) * 100 + "%";
    }
    // console.log(combinedList);
    return combinedList;
  },

  //获取该日期的所有花费记录
  getListByDate: (state, getters) => date => {
    // console.log("here");
    // console.log(state.expenses);
    // console.log(date);
    return state.expenses.filter(item => item["date"] == date);
  },

  //获取该日期某一类别的所有花费记录
  getListByCategory: (state, getters) => (date, category) => {
    // console.log(date);
    // console.log(category);
    // console.log(date, category);
    let res = getters.getListByDate(date)[0];
    if (res){
      let list = res.list.filter(item => item.name == category);
      // console.log(list);
      return list.length>0 ? list : null;
    }else{return null}

    return res ? res.list.filter(item => item.name == category) : null;
  },

  getOneExpenseByDateId: (state, getters) => (date, id) => {
    let res = getters.getListByDate(date)[0];

    // return res ? res.list.filter(item => item.id == id)[0] : null;
    //深拷贝
    // console.log("深拷贝");
    if (res){
      let oneExpense = res.list.filter(item => item.id == id)[0];
      return oneExpense ? JSON.parse(JSON.stringify(oneExpense)) : {id:"temp",amount:0.00,name:"食物",color:"#5AACA0",description:""}
    }else{return {id:"temp",amount:0.00,name:"食物",color:"#5AACA0",description:""}}
    // return res ? JSON.parse(JSON.stringify(res.list.filter(item => item.id == id)[0])) : null;
    // return res ? getters.copyOneExpense(res.list.filter(item => item.id == id)[0]) : null;
  },

  // copyOneExpense(expense){
  //   let oneExpense = new oneExpense(expense.id,expense.name,expense.color,expense.description,expense.amout);
  //   return oneExpense;
  // },

  getCategory(state){
    return state.category;
  },
  getCategoryWithoutPlus(state){
    let category = JSON.parse(JSON.stringify(state.category));
    category.splice(category.length-1, 1);
    return category;
  },
  getFirstCategory(state,getters){
    if  (state.category.length==1){ //只剩下一个  +  类别了，表示没有类别了
        return {name:"",color:"#ffffff"}
    }else{
      return JSON.parse(JSON.stringify(getters.getCategory[0]));
    }
  },
  getCategoryByName: (state) => (name) => {
    let res = state.category.find((item) => item.name == name);
      // console.log(res);
    return res ? JSON.parse(JSON.stringify(res)) : {name:"",color:"-1"};
  },
  getUserName(state){
    return state.username;
  },
  getTab(state){
    return state.tab;
  }
};

export default getters;
