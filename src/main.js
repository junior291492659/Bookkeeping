// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import animated from "animate.css";
import "element-ui/lib/theme-chalk/index.css";
import "mint-ui/lib/style.css";

import Vue from "vue";
import App from "./App";
import store from "./store";
import vcolorpicker from "vcolorpicker";
import axios from "axios";
import moment from 'moment';


// import {Button} from 'mint-ui'

import {
  Form,
  FormItem,
  Button,
  Input,
  Row,
  Tooltip,
  Alert,
  Radio,
  RadioGroup,
  RadioButton,
  Drawer
} from "element-ui";

Vue.config.productionTip = false;

Vue.use(vcolorpicker);
Vue.use(animated);



Vue.component(Button.name, Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Row);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Alert);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Drawer);

import router from "./router";

moment.locale('zh-cn');
Vue.prototype.$moment = moment;
/* eslint-disable no-new */
Vue.prototype.$axios = axios;
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
