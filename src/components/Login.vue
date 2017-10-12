<template>
<div class="login">
  <mt-header title="手机号登录">
    <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
  <div class="login-box">
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-button class="submit" size="large" @click="onSubmit">登录</mt-button>
  </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
import {mapState ,mapMutations ,mapActions} from 'vuex';

export default {
    data() {
      return {
        phone:'',
        password:''
      }
    },
    computed: {
      ...mapState([
        "id","userName"
      ])
    },
    methods: {
      onSubmit() {
        var params = {
          phone : this.phone,
          password : this.password
        }
        var url = this.HOST + '/login/cellphone';
        this.axios.get(url,{params}).then(res => {
          if(res.data.code == 200){
            this.$store.dispatch('id',res.data.account.id);
            this.$store.dispatch('userName',res.data.profile.nickname);
            if(window.localStorage){
                localStorage.setItem("id", res.data.account.id);
            }else{
                Cookie.write("id", res.data.account.id);
            }
            this.$router.push({ path: '/Main' });
          }else{
            Toast(res.data.msg);
          }
        });
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../assets/css/public.less';
  @import '../assets/css/animate.less';

  .mint-header{
    background:@bg-color;
  }
  .login-box{
    .submit{
      background:@bg-color;
      color:#FFF;
      font-size:@font-size*1.1;
    }
  }

</style>
