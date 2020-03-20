import service from "./index";

//注册
export function register(data) {
  console.log("in register api");
  return service
    .request({
      method: "post",
      url: "/register",
      data
    })
    .then(res => res.data);
}

//登录
export function login(data) {
  console.log("in login api");
  return service.request({
      method:"post",
      url:"/login",
      data
  }).then(res => res.data);
}

//检测token是否有效
export function checkLogin() {
  console.log("in checkLogin api");
  return service
    .request({
      method: "get",
      url: "/checkLogin"
    })
    .then(res => res.data);
}
