import axios from "axios";
import store from "@/store";
import { MessageBox } from 'mint-ui'
import router from "@/router";
// import { MessageBox } from 'element-ui';

let baseUrl = "http://localhost:3000/";

const service = axios.create();
service.defaults.baseURL = process.env.VUE_APP_BASE_API;


// console.log("token: " + store.state.token);
// service.defaults.headers.common['token'] = store.state.token;

service.interceptors.request.use(
  function(config) {
    //发送请求前做点什么
    // console.log("这是在发送请求之前");
    // console.log(config);
    config.headers.common["Authorization-Token"] = store.state.token;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function(response) {
    if (response.data && response.data.errCode) {
      if (response.data.errCode === 100) {
        //未登录 tonken无效了
        // console.log("在拦截器中检测到了未登录，跳转");
        store.commit("removeToken")  // 重置token
        // MessageBox({
        //     title: '提示',
        //     message: '您未登录或者登录已过期，请重新登录',
        //     showCancelButton: false
        //   });
        MessageBox.confirm("您未登录或者登录已过期，请重新登录,可点击确定进行登录").then(action => {
          // console.log(router);
          router.replace("/login");
        }).catch(cancel=>{})
        
      }
      return response;
    }
    return response;
  },
  function(error) {
    // console.dir(error);
    return Promise.reject(error);
  }
);

export default service;
