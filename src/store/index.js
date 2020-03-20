import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const state = {
  cartList: [],
  token:"",
  username: "junior",
  date: getTodayFormat(),
  tab:"overview",
  category: [
    { name: "食物", color: "#5AACA0" },
    { name: "娱乐", color: "#B975DC" },
    { name: "交通", color: "#1C7DA8" },
    { name: "衣服", color: "#FF6B6B" },
    { name: "住房", color: "#F38631" },
    { name: "其他", color: "#3B5A5F" },
    { name: "超市", color: "#15A5D7" },
    { name: "水电", color: "#f1c40f" },
    { name: "+", color: "#566270" },
  ],
  expenses: [
    {
      date: "2020-3-2",
      // totalAmount: 50,
      list: [
        { id: 1, name: "衣服", color: "#FF6B6B", amount: 20, description: "素菜：20，电影60。素菜：20，电影60。素菜：20，电影60。" },
        { id: 2, name: "娱乐", color: "#B975DC", amount: 20, description: "素菜：20，电影60。" },
        { id: 3, name: "衣服", color: "#FF6B6B", amount: 10, description:"" }
      ]
      // category:["衣服","娱乐"]
    },
    {
      date: "2020-3-1",
      // totalAmount: 50,
      list: [
        { id: 11, name: "食物", color: "#5AACA0", amount: 60,description:"" },
        { id: 12, name: "娱乐", color: "#B975DC", amount: 20,description:"" },
        { id: 13, name: "衣服", color: "#FF6B6B", amount: 100,description:"" },
        { id: 14, name: "超市", color: "#15A5D7", amount: 80,description:"" }
      ]
      // category:["衣服","娱乐"]
    }
  ]
};

function getTodayFormat() {
  let time = new Date();
  // console.log(
  //   `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`
  // );
  return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`;
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
