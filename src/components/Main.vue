<template>
  <div class="content">
    <header>
      <el-row>
        <el-col :span="4" class="nav-icon left">
          <a @click="loginControl">
            <el-badge :value="0">
              <i class="fa-navicon"></i>
            </el-badge>
          </a>
        </el-col>
        <el-col :span="16" class="nav-nav">
          <el-row>
            <el-col :span="8" v-for="(nav,index) in navList" :key="nav.Name">
              <router-link :to="nav.Link">{{nav.Name}}</router-link>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" class="nav-icon right">
          <router-link to="/Search">
            <i class="el-icon-search"></i>
          </router-link>
        </el-col>
      </el-row>
    </header>
    <user-info :showUserInfo="showUserInfo" @close="close"></user-info>
    <transition :name="direction">
      <router-view class="app-view"></router-view>
    </transition>
  </div>
</template>

<script>
import userInfo from './UserInfo.vue'

export default {
  data () {
    return {
      showUserInfo:false,
      navList:[
        {Name:'我的', Link:'/Mine'},
        {Name:'音乐', Link:'/Music'},
        {Name:'动态', Link:'/Dynamic'}
      ]
    }
  },
  computed: {
     direction() {
       const viewDir = this.$store.state.viewDirection
       let tranName = ''
       if (viewDir === 'left') {
         tranName = 'slide-left'
       } else if (viewDir === 'right') {
         tranName = 'slide-right'
       } else {
         tranName = 'fade'
       }
       return tranName
     }
   },
   components:{
     'user-info':userInfo
   },
   methods: {
     close() {
       this.showUserInfo=false;
     },
     loginControl() {
       let str = window.localStorage.getItem('userInfo');
       if(str != null){
         this.showUserInfo = true;
       }else{
         this.$router.push({path:'/Login'});
       }
     }
   }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../assets/css/public.less';
  @import '../assets/css/animate.less';
  .content{
    width:100%;
    overflow: hidden;
  }
  header{
    width:100%;
    height:@height;
    background:@bg-color;
    position:fixed;
    z-index:999;
    .el-row{
      height:@height;
      display:flex;
      align-items: center;
      justify-content: space-between;
      .nav-icon{
        padding:0 10px;
        &.left{
          text-align:left;
        }
        &.right{
          text-align:right;
        }
        a{
          color:@font-color;
        }
        i{
          color:@font-color;
          font-size:@font-size*1.4;
        }
      }
      .nav-nav{
        .el-col{
          text-align:center;
          a{
            color:#f5a0a0;
            &.active{
              color:@font-color;
            }
          }
        }
      }
    }
  }
</style>
