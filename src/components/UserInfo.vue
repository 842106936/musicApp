<template>
  <div class="user">
    <transition name="fade">
      <div v-if="showUserInfo" class="black" @click="close"></div>
    </transition>
    <transition name="left">
    <div v-if="showUserInfo" class="userBox" :style="boxSize">
      <div class="user-info">
        <img class="background" :src="userInfo.profile.backgroundUrl">
        <img class="avatar" :src="userInfo.profile.avatarUrl">
        <div class="user-info-name">
          <p v-if="userInfo.profile.nickname">{{userInfo.profile.nickname}}<i>Lv.{{userInfo.level}}</i></p>
          <a @click="signin()"><i v-if="!issignin" class='fa-database'></i>{{!issignin ? "签到" : "已签到"}}</a>
        </div>
      </div>
       <div class="user-control">
         <ul>
           <li v-for="item in list">
             <a :href="item.link">
               <i :class="item.icon"></i>
               {{item.title}}
             </a>
           </li>
         </ul>
         <router-link class="login" to="/Login">
           {{isLogin ?　"登录" : "切换账号"}}
         </router-link>
       </div>
     </div>
     </transition>
  </div>
</template>

<script>
import {mapState , mapMutations , mapActions} from "vuex";

export default{
  data() {
    return {
      issignin: false, //是否签到
      list:[
        {icon: 'fa-github',title: 'github',link: 'https://github.com/842106936/musicApp'},
        {icon: 'fa-qq',title: '842106936',link: ''}
      ],
      boxSize:{
        width: document.body.clientWidth * 0.8 + 'px',
        height:  window.screen.availHeight + 'px'
      }
    }
  },
  props:["showUserInfo"],
  created() {
    this.signin();
  },
  computed: {
    ...mapState([
      "isLogin"
    ]),
    userInfo() {
      var str = window.localStorage.getItem('userInfo');
      return JSON.parse(str)
    }
  },
  methods:{
    close() {
      this.$emit('close');
    },
    signin() {
      let params = {
        type: 0
      }
      let url = this.HOST + '/daily_signin';
      this.axios.get(url,{params}).then(res => {
        this.issignin = true;
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../assets/css/public.less';
.user{
  width:100%;
  position: fixed;
  left:0px;
  top:0px;
  z-index:9999999;
  overflow:hidden;
  .black{
    .dialog
  }
  .userBox{
    position: relative;
    background:#FFF;
    z-index:999999;
    .user-info{
      width:calc(~"100% - 20px");
      padding:0 10px;
      height:25%;
      position:relative;
      .background{
        width:100%;
        height:100%;
        position: absolute;
        left:0;
        top:0;
      }
      .avatar{
        width:80px;
        height:80px;
        border-radius:50%;
        position: absolute;
        left:10px;
        bottom:50px;
      }
      .user-info-name{
        width:calc(~"100% - 20px");
        padding:10px;
        position: absolute;
        left:0;
        bottom:0;
        overflow:hidden;
        p{
          font-size:14px;
          display:inline-block;
          color:#FFF;
          i{
            font-size:10px;
            color:#FFF;
            margin-left:5px;
          }
        }
        a{
          padding:0px 10px;
          display:inline-block;
          float: right;
          font-size:12px;
          color:#FFF;
          line-height:20px;
          border:1px solid #FFF;
          border-radius:12px;
          i{
            font-size:12px;
            color:#FFF;
          }
        }
      }
    }
    .user-control{
      width:100%;
      height:75%;
      padding:10px 0;
      box-sizing: border-box;
      background:#FFF;
      position: relative;
      li{
        width:100%;
        padding:5px 10px;
        box-sizing: border-box;
        overflow: hidden;
        a{
          font-size:14px;
          color:#333;
          line-height:24px;
          i{
            font-size:16px;
            color:#333;
            line-height:24px;
          }
        }
      }
      .login{
        display:block;
        width:100%;
        font-size:14px;
        color:#fff;
        line-height:34px;
        text-align: center;
        background:@color-red;
        position: absolute;
        left:0;
        bottom:0;
      }
    }
  }
}
</style>
