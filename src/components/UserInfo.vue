<template>
  <div class="user">
    <transition name="fade">
      <div v-if="showUserInfo" class="black" @click="close"></div>
    </transition>
    <transition name="left">
    <div v-if="showUserInfo" class="userBox" :style="boxSize">
      <div class="user-info">
        <img class="background" :src="userInfo.profile.backgroundUrl ? '' : userInfo.profile.backgroundUrl">
        <img class="avatar" :src="userInfo.profile.avatarUrl ? '' : userInfo.profile.avatarUrl">
        <div class="user-info-name">
          <p v-if="userInfo.profile.nickname">{{userInfo.profile.nickname}}<i>Lv.{{userInfo.level}}</i></p>
          <a @click="signin">{{issignin ? "<i class='fa-database'></i>签到" : "已签到"}}</a>
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
        {icon: 'fa-github',title: 'github',link: 'https://github.com/842106936/musicApp'}
        //{icon: '',title: '',link: ''}
      ],
      boxSize:{
        width: window.screen.availWidth * 0.8,
        height: window.screen.availHeight
      }
    }
  },
  props:["showUserInfo"],
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
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../assets/css/public.less';
.user{
  width:100%;
  overflow:hidden;
  .black{
    .dialog
  }
  .userBox{
    .user-info{
      width:calc(~"100% - 20px");
      padding:10px;
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
      }
      .user-info-name{
        width:100%;
        overflow:hidden;
        p{
          font-size:14px;
          color:#FFF;
          i{
            font-size:10px;
            color:#FFF;
          }
        }
        a{
          padding:0px 5px;
          display:block;
          font-size:12px;
          color:#FFF;
          line-height:24px;
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
      background:#FFF;
      position: relative;
      li{
        width:100%;
        padding:0 10px;
        box-sizing: border-box;
        overflow: hidden;
        a{
          font-size:14px;
          color:#333;
          line-height:34px;
          i{
            font-size:14px;
            color:#333;
            line-height:34px;
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
      }
    }
  }
}
</style>
