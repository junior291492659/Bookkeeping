<template>
  <div class="container">
    <div class="logo">
      <span>
        <i class="fa fa-usd fa-2x" aria-hidden="true"></i> i记账
      </span>
    </div>

    <div  class="main login animated fadeInDown" v-show="type=='login'">
      <!-- 登录部分 -->
      <el-form
      id="ruleFormLogin"
        :model="ruleFormLogin"
        status-icon
        :rules="rulesLogin"
        ref="ruleFormLogin"
        label-width="5rem"
        class="demo-ruleForm login"
        label-position="left"
      >
        <el-form-item  label="用户名" prop="username">
          <el-input v-model="ruleFormLogin.username"></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="loginPass">
          <el-input type="password" v-model="ruleFormLogin.loginPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="submitForm('ruleFormLogin')">提交</el-button>
          <el-button @click="resetForm('ruleFormLogin')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div  class="main register animated fadeInDown" v-show="type == 'register'">
      <!-- 注册部分 -->
      <el-form
      id="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="5rem"
        class="demo-ruleForm register"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="submitForm2('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div v-else></div> -->

    <div class="options">
      <div
        class="login"
        @click="changeType('login')"
        :style="{'color': type == 'login' ? '#333' : '#999'}"
      >
        <span>
          <i class="fa fa-sign-in fa-3x" aria-hidden="true"></i>
        </span>
        <span>登录</span>
      </div>
      <div
        class="register"
        @click="changeType('register')"
        :style="{'color': type == 'register' ? '#333' : '#999'}"
      >
        <span>
          <i class="fa fa-registered fa-3x" aria-hidden="true"></i>
        </span>
        <span>注册</span>
      </div>
      <div
        class="home"
        @click="changeType('home')"
        :style="{'color': type == 'home' ? '#333' : '#999'}"
      >
        <span>
          <i class="fa fa-home fa-3x" aria-hidden="true"></i>
        </span>
        <span>主页</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { MessageBox } from "mint-ui";
import { register, login } from "@/api/login";

export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value.length < 5) {
          callback(new Error("用户名长度至少为5"));
        } else {
          callback();
        }
      }, 500);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkLoginPass = (rule, value, callback) => {
      console.log("in checkLoginPass");
      if (value === "") {
        return callback(new Error("请输入密码"));
      }else{
        callback();
      }
    };
    return {
      type: "login",
      ruleFormLogin: {
        // pass: "",
        // checkPass: "",
        username: "",
        loginPass: ""
      },
      rulesLogin: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        loginPass: [{validator: checkLoginPass, trigger: "blur"}]
      },
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleFormLogin.loginPass);
      console.log(formName);
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        console.log("在检查。。。");
        if (valid) {
          //提交的数据有效
          if (this.type == "login") {
            console.log("准备登录了");
            this.postLogin();
          } else {
            this.postRegister();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm2(formName) {
      console.log(this.ruleFormLogin.loginPass);
      console.log(formName);
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        console.log("在检查。。。");
        if (valid) {
          //提交的数据有效
          if (this.type == "login") {
            console.log("准备登录了");
            this.postLogin();
          } else {
            this.postRegister();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeType(type) {
      if (type != this.type) {
        if (type == "home") {
          this.$router.replace({ name: "expenses" });
        }
        this.type = type;
      }
    },
    postLogin() {
      let username = this.ruleFormLogin.username;
      let password = this.ruleFormLogin.loginPass;
      console.log(username, password);
      let loading = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      console.log("after start loading");
      login({
        username,
        password
      })
        .then(result => {
          loading.close();
          if (result.errCode === 0) {
            // console.log("跳转至主页面");
            this.$store.commit("setToken", result["Authentication-Token"]);
            this.$router.replace("/expenses");
            this.$store.dispatch("loadStore");
          } else {
            MessageBox({
              title: "提示", //用户名或密码错误
              message: result.message,
              showCancelButton: false
            });
          }
        })
        .catch(err => {
          loading.close();
          console.log(err.response);
          MessageBox({
            title: "提示",
            message: err.response.data.message,
            showCancelButton: false
          });
        });
    },
    postRegister() {
      let username = this.ruleForm.username;
      let password = this.ruleForm.pass;
      let createdTime = new Date();
      let lastModifiedTime = JSON.parse(JSON.stringify(createdTime));
      // console.log(username);
      // console.log(password);
      // console.log(createdTime);
      // console.log(lastModifiedTime);
      let loading = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      console.log("after start loading");
      register({
        username,
        password,
        createdTime,
        lastModifiedTime
      })
        .then(result => {
          loading.close();
          if (result.errCode === 0) {
            // console.log("跳转至主页面");
            this.$store.commit("setToken", result["Authentication-Token"]);
            this.$router.replace("/expenses");
            this.$store.dispatch("loadStore");
          } else {
            MessageBox({
              title: "提示",
              message: result.message,
              showCancelButton: true
            });
          }
        })
        .catch(err => {
          loading.close();
          console.log(err.response);
          MessageBox({
            title: "提示",
            message: err.response.data.message,
            showCancelButton: false
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  min-width: 300px;
  background: linear-gradient(to top, #ecf0f1, #95a5a6, #bdc3c7, #ecf0f1);
  // background: linear-gradient(to top, #3498db, #2980b9, #3498db);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: #333;
  }
  .main {
    width: 80%;
    height: 30%;
    min-width: 250px;
    padding-top: 5rem;
    margin: 0 auto;
  }
  .options {
    display: flex;
    flex-direction: row;
    justify-content: center;
    div {
      padding: 3rem 1rem;
      color: #999;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        padding-top: 0.5rem;
      }
    }
  }
}
</style>