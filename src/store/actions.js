import {
  initExpenseFromServer,
  getMoreExpenseFromServer,
  addOneExpenseToServer,
  changeOneExpenseToServer,
  removeOneExpenseToServer,
  changeOneCategoryToServer,
  addOneCategoryToServer,
  removeOneCategoryToServer,
  getStatisticsOfTypeByMonthFromServer,
  getStatisticsOfTypeByWeekFromServer,
  getStatisticsOfTypeByYearFromServer,
  getStatisticsOfDateByMonthFromServer,
  getStatisticsOfDateByWeekFromServer,
  getStatisticsOfDateByYearFromServer
} from "@/api/expense";
import { MessageBox } from "mint-ui";

const actions = {
  // addCart(context, payload) {
  //   return new Promise((resolve, reject) => {
  //     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

  //     //console.log(context);

  //     if (oldProduct) {
  //       //oldProduct.count += 1
  //       context.commit('addCounter', oldProduct);
  //       resolve('商品数量+1');
  //     } else {
  //       payload.count = 1
  //       context.commit('addToCart', payload)
  //       resolve('添加商品成功');
  //     }
  //   })

  // }

  //初始化数据
  loadStore(store) {
    // console.log("在App中初始化数据");
    initExpenseFromServer()
      .then(result => {
        // console.log(result.message);
        result.errCode === 0 &&
          store.commit("initStore", JSON.parse(result.record));
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  },

  //获得更多支出数据
  getMoreExpense(store, payload) {
    //payload: times
    getMoreExpenseFromServer({ times: payload })
      .then(result => {
        // console.log(result.message);
        result.errCode === 0 &&
          store.commit("getMoreExpense", JSON.parse(result.record));
      })
      .catch(error => {
        // console.log("in error");
        console.log(error);
        console.log(error.response.data.message);
      });
  },

  //添加一项支出
  addOneExpense(store, payload) {
    // console.log("准备添加数据了");
    addOneExpenseToServer({
      id: payload.expenseData.id,
      date: new Date(payload.date),
      name: payload.expenseData.name,
      color: payload.expenseData.color,
      amount: payload.expenseData.amount,
      description: payload.expenseData.description
    })
      .then(result => {
        // console.log("存储成功了");
      })
      .catch(error => {
        // console.log(error.response.data.message);
        let message = error.response.data.message
          ? err.response.data.message
          : "服务器错误,存储至服务器失败";
        MessageBox({
          title: "提示",
          message,
          showCancelButton: false
        });
      });
  },

  //修改一项支出
  changeOneExpense(store, payload) {
    changeOneExpenseToServer(payload)
      .then(result => {
        // console.log("修改成功了");
      })
      .catch(error => {
        // console.log(error.response.data.message);
        let message = error.response.data.message
          ? err.response.data.message
          : "服务器错误,更新至服务器失败";
        MessageBox({
          title: "提示",
          message,
          showCancelButton: false
        });
      });
  },

  //删除一项支出
  removeOneExpense(store, payload) {
    removeOneExpenseToServer(payload)
      .then(result => {
        // console.log("删除成功了");
      })
      .catch(error => {
        let message = error.response.data.message
          ? err.response.data.message
          : "服务器错误,从服务器删除失败";
        MessageBox({
          title: "提示",
          message,
          showCancelButton: false
        });
      });
  },

  //添加一项分类
  addOneCategory(store, payload) {
    addOneCategoryToServer(payload)
      .then(result => {
        // console.log("增加 类别成功了");
      })
      .catch(error => {
        // console.log(error.response.data.message);
        let message = error.response.data.message
          ? err.response.data.message
          : "服务器错误,增加至服务器失败";
        MessageBox({
          title: "提示",
          message,
          showCancelButton: false
        });
      });
  },

  //删除一项分类
  removeOneCategory(store, payload) {
    removeOneCategoryToServer(payload)
      .then(result => {
        // console.log("删除 类别成功了");
      })
      .catch(error => {
        // console.log(error.response.data.message);
        let message = error.response.data.message
          ? err.response.data.message
          : "服务器错误,从服务器删除失败";
        MessageBox({
          title: "提示",
          message,
          showCancelButton: false
        });
      });
  },

  //修改一项分类
  changeOneCategory(store, payload) {
    changeOneCategoryToServer(payload)
      .then(result => {
        // console.log("修改 类别成功了");
      })
      .catch(error => {
        // console.log(error.response.data.message);
        let message = error.response.data.message
          ? err.response.data.message
          : "服务器错误,更新至服务器失败";
        MessageBox({
          title: "提示",
          message,
          showCancelButton: false
        });
      });
  },

  //根据 月份 获取 类型分类 数据
  getStatisticsOfTypeByMonth(store, payload) {
    return getStatisticsOfTypeByMonthFromServer(payload)
      .then(result => {
        // console.log("按照月份获取类型数据成功了");
        // console.log(result);
        return Promise.resolve(result);
      })
      .catch(error => {
        return Promise.reject(error);
        // console.log(error.response.data.message);
        // let message = error.response.data.message
        //   ? err.response.data.message
        //   : "服务器错误,获取失败";
        // MessageBox({
        //   title: "提示",
        //   message,
        //   showCancelButton: false
        // });
      });
  },

  // 根据 周数 获取 类型分类 数据
  getStatisticsOfTypeByWeek(store, payload) {
    return getStatisticsOfTypeByWeekFromServer(payload)
      .then(result => {
        // console.log("按照周数获取类型数据成功了");
        // console.log(result);
        return Promise.resolve(result);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },

  // 根据 年份 获取 类型分类 数据
  getStatisticsOfTypeByYear(store, payload) {
    return getStatisticsOfTypeByYearFromServer(payload)
      .then(result => {
        // console.log("按照年份获取类型数据成功了");
        // console.log(result);
        return Promise.resolve(result);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },

  getStatisticsOfDateByMonth(store, payload){
    return getStatisticsOfDateByMonthFromServer(payload)
        .then(result => {
          // console.log("按照月份获取日期数据成功了");
          // console.log(result);
          return Promise.resolve(result);
        })
        .catch(error => {
          return Promise.reject(error);
        });
  },

  getStatisticsOfDateByWeek(store, payload){
    return getStatisticsOfDateByWeekFromServer(payload)
    .then(result => {
      // console.log("按照周数获取日期数据成功了");
      // console.log(result);
      return Promise.resolve(result);
    })
    .catch(error => {
      return Promise.reject(error);
    });
  },

  getStatisticsOfDateByYear(store, payload){
    return getStatisticsOfDateByYearFromServer(payload)
    .then(result => {
      // console.log("按照年份获取日期数据成功了");
      // console.log(result);
      return Promise.resolve(result);
    })
    .catch(error => {
      return Promise.reject(error);
    });
  }
};



export default actions;
