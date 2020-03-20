import service from "./index";

export function addOneExpenseToServer(data) {
  // console.log("in addOneExpense api");
  return service
    .request({
      method: "post",
      url: "/addOneExpense",
      data
    })
    .then(res => res.data);
}

//初始化数据
export function initExpenseFromServer() {
  // console.log("in initExpenseFromServer api");
  return service
    .request({
      method: "get",
      url: "/initExpense",
    })
    .then(res => res.data);
}

//增加新数据
export function getMoreExpenseFromServer(data){
  // console.log(data);
  return service
  .request({
    method: "get",
    url: "/getMoreExpense",
    params:data
  })
  .then(res => res.data);
}

//修改一项数据
export function changeOneExpenseToServer(data){
  return service
    .request({
      method: "post",
      url: "/changeOneExpense",
      data
    })
    .then(res => res.data);
}

//删除一项数据
export function removeOneExpenseToServer(data){
  return service
    .request({
      method: "post",
      url: "/removeOneExpense",
      data
    })
    .then(res => res.data);
}

//增加一项类别
export function addOneCategoryToServer(data){
  return service
    .request({
      method: "post",
      url: "/addOneCategory",
      data
    })
    .then(res => res.data);
}

//删除一项分类
export function removeOneCategoryToServer(data){
  return service
    .request({
      method: "post",
      url: "/removeOneCategory",
      data
    })
    .then(res => res.data);
}

//修改一项类别
export function changeOneCategoryToServer(data){
  return service
    .request({
      method: "post",
      url: "/changeOneCategory",
      data
    })
    .then(res => res.data);
}

//根据 月份 获取 类型分类 数据
export function getStatisticsOfTypeByMonthFromServer(data){
  return service
    .request({
      method: "get",
      url: "/getStatisticsOfTypeByMonth",
      params: data
    })
    .then(res => res.data);
}

//根据 周数 获取 类型分类 数据
export function getStatisticsOfTypeByWeekFromServer(data){
  return service
    .request({
      method: "get",
      url: "/getStatisticsOfTypeByWeek",
      params: data
    })
    .then(res => res.data);
}

//根据 年份 获取 类型分类 数据
export function getStatisticsOfTypeByYearFromServer(data){
  return service
    .request({
      method: "get",
      url: "/getStatisticsOfTypeByYear",
      params: data
    })
    .then(res => res.data);
}

export function getStatisticsOfDateByMonthFromServer(data){
  return service
    .request({
      method: "get",
      url: "/getStatisticsOfDateByMonth",
      params: data
    })
    .then(res => res.data);
}

export function getStatisticsOfDateByWeekFromServer(data){
  return service
    .request({
      method: "get",
      url: "/getStatisticsOfDateByWeek",
      params: data
    })
    .then(res => res.data);
}

export function getStatisticsOfDateByYearFromServer(data){
  return service
    .request({
      method: "get",
      url: "/getStatisticsOfDateByYear",
      params: data
    })
    .then(res => res.data);
}