<template>
  <div class="mdui-card login-style mdui-p-a-3 mdui-container">
    <div class="mdui-card-primary">
      <div class="mdui-card-primary-title">图书馆信息一体化管理平台</div>
      <div class="mdui-card-primary-subtitle">使用您的账户进行登陆</div>
    </div>
    <div class="mdui-card-content">
      <form id="login_form" action="" method="post">
        <!--/*@thymesVar id="param" type="java.lang.String"*/-->
        <p>{{msg}}</p>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">用户名</label>
          <input name="username" v-model="username" class="mdui-textfield-input" type="text" maxlength="10"/>
          <div class="mdui-textfield-error">用户名不能为空</div>
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">密码</label>
          <input name="password" v-model="password" class="mdui-textfield-input" type="password" maxlength="10"/>
          <div class="mdui-textfield-error">密码不能为空</div>
        </div>
        <div class="mdui-card-actions" style="top: 20px;">
          <input type="button" v-on:click="login"
                 class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme mdui-btn-block" value="登陆">

        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
        msg: '',
        basePath: 'http://192.168.43.214:8080/'
      }
    },
    methods: {
      login() {
        this.$http.post(this.basePath + 'login', {
          "username": this.username,
          "password": this.password
        }, {emulateJSON: true, credentials: true}).then(response => {
          if (response.body.code === 200) {
            this.borrowFindAll();
            this.$router.push({path: '/'})
          } else {
            this.msg = response.body.msg;
          }
        }, response => {
          console.error(response);
        });
      },
      borrowFindAll() {
        this.$http.get(this.basePath + 'borrowFindAll', {credentials: true}).then(response => {
          if (response.body.code === 200) {
            console.log(response);
            sessionStorage.setItem('userId', response.body.list[0].userId.id);
          } else {
            mdui.alert(response.body.msg);
          }
        }, response => {
          console.error(response);
        });
      }
    }
  }
</script>

<style scoped>

</style>
