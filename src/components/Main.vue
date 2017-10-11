<template>
  <div class="content">
    <header>
      <el-row>
        <el-col :span="4" class="nav-icon left">
          <router-link to="/Login">
            <el-badge :value="12">
              <i class="el-icon-menu"></i>
            </el-badge>
          </router-link>
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
    <transition :name="direction">
      <router-view class="app-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
         tranName = 'slide-right'
       } else if (viewDir === 'right') {
         tranName = 'slide-left'
       } else {
         tranName = 'fade'
       }
       return tranName
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
