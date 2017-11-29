<template>
  <div class="mv-player">
    <div class="video">
      <a class="goback"><i class="fa-angle-left" @click="$router.back(-1)"></i></a>
      <video width="100%" :src="mv.brs[720] || mv.brs[480] || mv.brs[240]" controls autoplay>
      </video>
    </div>
    <div class="mv-info">
      <h4><i>MV</i>{{mv.name}}</h4>
      <p>歌手：{{mv.artistName}}</p>
      <p>发布：{{mv.publishTime}}<span>|</span>播放：{{mv.playCount < 10000 ? mv.playCount : parseInt(mv.playCount/10000) + '万'}}</p>
    </div>
    <el-row class="mv-btn">
      <el-col :span="6">
        <i class="fa-thumbs-up"></i>
        <p v-if="mv.likeCount != null">{{mv.likeCount < 10000 ? mv.likeCount : parseInt(mv.likeCount/10000) + '万'}}</p>
      </el-col>
      <el-col :span="6">
        <router-link :to="{ name: 'comment', params: {id: mvId, type: 'mv'}}">
          <i class="fa-calendar-plus-o"></i>
          <p v-if="mv.subCount != null">{{mv.subCount < 10000 ? mv.subCount : parseInt(mv.subCount/10000) + '万'}}</p>
        </router-link>
      </el-col>
      <el-col :span="6">
        <i class="fa-comments"></i>
        <p v-if="mv.commentCount != null">{{mv.commentCount < 10000 ? mv.commentCount : parseInt(mv.commentCount/10000) + '万'}}</p>
      </el-col>
      <el-col :span="6">
        <i class="fa-share-alt"></i>
        <p v-if="mv.shareCount != null">{{mv.shareCount < 10000 ? mv.shareCount : parseInt(mv.shareCount/10000) + '万'}}</p>
      </el-col>
    </el-row>
    <div class="mv-about">
      <h4>相关推荐</h4>
      <ul>
        <li v-for="item in mvAbout" :key="item.id" @click="mvPlay(item.id)">
          <div class="item-cover">
            <img :src="item.cover"/>
            <p><i class="fa-video-camera"></i>{{item.playCount < 10000 ? item.playCount : parseInt(item.playCount/10000) + '万'}}</p>
          </div>
          <div class="item-info">
            <h5><i>MV</i>{{item.name}}</h5>
            <p>{{item.artistName}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import {Indicator} from 'mint-ui';
export default{
  data() {
    return {
      mv:[],
      mvAbout:[]
    }
  },
  created() {
    Indicator.open({
      spinnerType: 'fading-circle'
    });
    this.getMV();
    this.getAboutMV();
  },
  watch: {
    mvId(){
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      this.getMV();
      this.getAboutMV();
    }
  },
  computed: {
    ...mapState([
      "mvId"
    ])
  },
  methods: {
    getMV() {
      let params = {
        mvid : this.mvId
      }
      let url = this.HOST + '/mv';
      this.axios.get(url,{params}).then(res => {
        this.mv = res.data.data;
        this.$nextTick(() => {
          // this.getMvUrl();
          Indicator.close();
        })
      })
    },
    // getMvUrl() {
    //   let params = {
    //     url : this.mv.brs[720]
    //   }
    //   let url = this.HOST + '/mv/url'
    //   this.axios.get(url,{params}).then(res => {
    //
    //   })
    // },
    getAboutMV() {
      let params = {
        mvid : this.mvId
      }
      let url = this.HOST + '/simi/mv';
      this.axios.get(url,{params}).then(res => {
        this.mvAbout = res.data.mvs
      })
    },
    mvPlay(id) {
      this.$store.commit("mvId",id);
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';

.mv-player{
  width:100%;
  overflow:hidden;
  .video{
    width:100%;
    padding-top:55%;
    height:0px;
    position: relative;
    .goback{
      width:50px;
      height:50px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left:0px;
      top:0px;
      z-index:99999;
      i{
        font-size:18px;
        color:#fff;
      }
    }
    video{
      width:100%;
      height:100%;
      position: absolute;
      left:0;
      top:0;
      z-index:99;
    }
  }
  .mv-info{
    width:100%;
    padding:10px;
    box-sizing: border-box;
    overflow:hidden;
    h4{
      display: flex;
      align-items: center;
      font-size:18px;
      color:#333;
      line-height:34px;
      i{
        width:20px;
        height:12px;
        margin-right:5px;
        display: block;
        font-style:normal;
        font-size:10px;
        line-height:13px;
        text-align: center;
        color:@color-red;
        border:1px solid @color-red;
      }
    }
    p{
      font-size:14px;
      color:#666;
      line-height:28px;
      span{
        font-size:14px;
        color:#666;
        margin:0 15px;
      }
    }
  }
  .mv-btn{
    width:100%;
    height:60px;
    display: flex;
    align-items: center;
    .el-col{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      a{
        display: block;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      i{
        font-size:@font-size*1.6;
        color:#333;
      }
      p{
        font-size:@font-size;
        color:#333;
        margin-top:5px;
      }
    }
  }
  .mv-about{
    width:100%;
    overflow:hidden;
    h4{
      font-size:14px;
      color:#333;
      background-color:#e6e9e8;
      line-height:28px;
      text-indent:10px;
    }
    ul{
      width:100%;
      overflow:hidden;
      li{
        width:calc(~"100% - 20px");
        height:0;
        margin:10px;
        padding-bottom:22%;
        position: relative;
        .item-cover{
          width:35%;
          height:100%;
          position: absolute;
          left:0;
          top:0;
          img{
            width:100%;
            height:100%;
          }
          p{
            width:100%;
            height:30px;
            position:absolute;
            left:0px;
            top:0px;
            font-size:@font-size;
            color:#FFF;
            text-align: right;
            line-height:30px;
            padding:0 10px;
            box-sizing: border-box;
            i{
              font-size:0.95rem;
              margin-right:5px;
            }
          }
        }
        .item-info{
          width:calc(~"65% - 20px");
          height:100%;
          padding:0 10px;
          position: absolute;
          right:0;
          top:0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          h5{
            display: flex;
            align-items: center;
            font-size:16px;
            color:#333;
            line-height:24px;
            i{
              width:20px;
              height:12px;
              margin-right:5px;
              display: block;
              font-style:normal;
              font-size:10px;
              line-height:13px;
              text-align: center;
              color:@color-red;
              border:1px solid @color-red;
            }
          }
          p{
            font-size:12px;
            line-height:20px;
            color:#666;
          }
        }
      }
    }
  }
}
</style>
