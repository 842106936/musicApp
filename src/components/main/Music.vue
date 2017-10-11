<template>
<div class="Music">
  <div class="head">
    <el-row>
      <el-col :span="6" v-for="(nav,index) in navList" :key="nav.Name">
        <div @click="navActive(index)">
          <router-link :to="nav.Link">{{nav.Name}}</router-link>
        </div>
      </el-col>
    </el-row>
    <div class="bar" :class="'classmove' + navIndex"></div>
  </div>
  <transition>
    <router-view class="child-view" child-view="child-view"></router-view>
  </transition>
</div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';
export default {
  name: 'Music',
  data() {
    return {
      navList:[
        {Name:'个性推荐',  Link:'/Music/recommend'},
        {Name:'歌单', Link:'/Music/sheet'},
        {Name:'主播电台', Link:'/Music/radio'},
        {Name:'排行榜', Link:'/Music/rank'}
      ]
    }
  },
  computed: {
    ...mapState([
      "navIndex"
    ])
  },
  methods: {
    navActive(index) {
      this.$store.dispatch("navIndex", index);
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';

.child-view{
  margin-top:40px;
}
.head{
  width: 100%;
  height:@height;
  position:fixed;
  left:0px;
  top:40px;
  background: #f8f8f9;
  z-index:9999;
    .el-row{
      width:100%;
      display:flex;
      .el-col{
        width:25%;
        flex:1;
        display:inline-block;
        box-sizing: border-box;
        text-align: center;
        a{
          font-size:14px;
          display:block;
          line-height:40px;
          color:#333;
          &.active{
            color:@color-red;
          }
        }
      }
    }
    .bar{
      width: 25%;
      height: 2px;
      position:relative;
      bottom:2px;
      background: @color-red;
      transition: all 0.375s;
      &.classmove0{
        transform: translate3d(0,0,0);
      }
      &.classmove1{
        transform: translate3d(100%,0,0);
      }
      &.classmove2{
        transform: translate3d(200%,0,0);
      }
      &.classmove3{
        transform: translate3d(300%,0,0);
      }
  }
}

</style>
