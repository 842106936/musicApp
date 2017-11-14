<template>
<div class="index" ref="partIndex">
  <div class="part-swipe">
    <div class="swipe-box">
      <mt-swipe :show-indicators="true">
        <mt-swipe-item v-for="item in banners" :key="item.targetId">
          <img class="swipe-img" :src="item.pic"/>
          <p class="swipe-title" :class="item.titleColor">{{item.typeTitle}}</p>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>

  <div class="part-nav">
    <el-row>
      <el-col :span="8">
        <a @click="goPersonFM">
          <p>
            <i class="iconfont icon-fm"></i>
          </p>
        </a>
        <b>私人FM</b>
      </el-col>
      <el-col :span="8">
        <router-link to="/List">
          <p>
            <i class="iconfont icon-rili"></i>
          </p>
        </router-link>
        <b>每日歌曲推荐</b>
      </el-col>
      <el-col :span="8">
        <router-link to="/RankList/1">
          <p>
            <i class="iconfont icon-paihangbang"></i>
          </p>
        </router-link>
        <b>云音乐热歌榜</b>
      </el-col>
    </el-row>
  </div>

  <div class="part-sheet">
    <mt-cell title="推荐歌单" to="/Mine" is-link>
    </mt-cell>
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
    <el-row :gutter="5">
      <el-col :xs="8" :sm="8" :md="6" :lg="4" v-for="(sheet, index) in sheets" :key="sheet.id">
        <router-link :to="{ name: 'PlayList', params: { id: sheet.id }}">
          <el-card :body-style="{ padding: '0px' }">
            <div class="image">
              <div>
                <img v-lazy="sheet.picUrl"/>
              </div>
              <p><i class="fa-headphones"></i>{{sheet.playCount < 10000 ? sheet.playCount : parseInt(sheet.playCount/10000) + '万'}}</p>
            </div>
            <p class="name">{{sheet.name}}</p>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
    <div slot="top" class="mint-loadmore-top">
      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
      <span v-show="topStatus === 'loading'">Loading...</span>
    </div>
    </mt-loadmore>
  </div>

  <div class="part-sole">
    <mt-cell title="独家放送" to="/Mine" is-link>
    </mt-cell>
    <el-row :gutter="5">
      <el-col v-for="(sole, index) in soles" :span="index==2 ? 24 : 12" :key="sole.id">
        <el-card :body-style="{ padding: '0px' }">
          <div class="image">
            <div>
              <img v-lazy="sole.picUrl"/>
            </div>
          </div>
          <p class="name">{{sole.name}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <div class="part-newmusic">
    <mt-cell title="最新音乐" to="/Mine" is-link>
    </mt-cell>
    <el-row :gutter="5">
      <el-col :xs="8" :sm="8" :md="6" :lg="4" v-for="(newmusic, index) in newmusics" :key="newmusic.id">
        <router-link :to="{ name: 'PlayList', params: { id: newmusic.id }}">
          <el-card :body-style="{ padding: '0px' }">
            <div class="image">
              <div>
                <img v-lazy="newmusic.picUrl"/>
              </div>
            </div>
            <p class="name">{{newmusic.name}}</p>
            <p class="author">{{newmusic.artists[0].name}}</p>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>

  <div class="part-mv">
    <mt-cell title="推荐MV" to="/Mine" is-link>
    </mt-cell>
    <el-row :gutter="5">
      <el-col :xs="12" :sm="12" :md="8" :lg="6" v-for="(mv, index) in mvs" :key="mv.id">
        <el-card :body-style="{ padding: '0px' }">
          <div class="image">
            <div>
              <img v-lazy="mv.picUrl"/>
            </div>
            <p><i class="fa-video-camera"></i>{{mv.playCount < 10000 ? mv.playCount : parseInt(mv.playCount/10000) + '万'}}</p>
          </div>
          <p class="name">{{mv.name}}</p>
          <p class="author">{{mv.artists[0].name}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <div class="part-column">
    <mt-cell title="精选专栏" to="/Mine" is-link>
    </mt-cell>
    <div class="column-list">
      <ul>
        <li v-for="(column, index) in columns" :key="column.id">
          <div class="info">
            <p><em>专栏</em>{{column.name}}</p>
            <b>阅读&nbsp;{{column.listenerCount}}</b>
          </div>
          <div class="image">
            <div>
              <img v-lazy="column.coverUrl"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="part-radio">
    <mt-cell title="主播电台" to="/Mine" is-link>
    </mt-cell>
    <el-row :gutter="5">
      <el-col :xs="8" :sm="8" :md="6" :lg="4" v-for="(radio, index) in radios" :key="radio.id">
        <el-card :body-style="{ padding: '0px' }">
          <div class="image">
            <div>
              <em>{{radio.copywriter}}</em>
              <img v-lazy="radio.picUrl"/>
            </div>
          </div>
          <p class="name">{{radio.name}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>

</div>
</template>

<script>
import { Indicator } from 'mint-ui';
// import BScroll from 'better-scroll';
import {mapState ,mapMutations ,mapActions} from 'vuex';

export default{
  name: 'recommend',
  data() {
    return {
      topStatus: ''
    }
  },
  created() {
      if(this.banners.length == 0){
        this.getBanners();
        this.getSheets();
        this.getSoles();
        this.getNewmusics();
        this.getMVs();
        this.getColumns();
        this.getRadios();
      }

    //集中发送请求
    // this.axios.all([this.getLists()]).then(this.axios.spread((res) => {
    //   this.lists = res.data.subjects;
    //   this.$nextTick(() => {
    //     this._initScroll();
    //   })
    // })).catch(error => {
    //   console.log(error);
    // })
  },
  computed: {
    ...mapState([
      "banners","sheets","soles","newmusics","mvs","columns","radios"
    ])
  },
  methods: {
    getBanners() {
      let url = this.HOST + '/banner';
      this.axios.get(url).then(res => {
        this.$store.commit('banners',res.data.banners);
      });
    },
    //私人FM
    goPersonFM() {
      let url = this.HOST + '/personal_fm';
      this.axios.get(url).then(res => {
        //this.$store.commit('personFM',res.data.data[0]);
        let dj = {
          id: res.data.data[0].id,
          title: res.data.data[0].name,
          author: res.data.data[0].artists[0].name,
          pic: res.data.data[0].artists[0].picUrl
        }
        this.$store.dispatch('musicInfo', dj);
        this.$router.push({ path:'/player' });
      })
    },
    // 格式化请求
    // qs.stringify(params)
    getSheets() {
      let url = this.HOST + '/personalized';
      this.axios.get(url).then(res => {
        this.$store.commit('sheets',res.data.result);
        // this.$nextTick(() => {
        //   this._initScroll();
        // })
      });
    },
    getSoles() {
      let url = this.HOST + '/personalized/privatecontent';
      this.axios.get(url).then(res => {
        this.$store.commit('soles',res.data.result);
      });
    },
    getNewmusics() {
      let params = {
        offset : 0,
        limit : 6
      }
      let url = this.HOST + '/top/album';
      this.axios.get(url,{params}).then(res => {
        this.$store.commit('newmusics',res.data.albums);
      });
    },
    getMVs() {
      let url = this.HOST + '/personalized/mv';
      this.axios.get(url).then(res => {
        this.$store.commit('mvs',res.data.result);
      });
    },
    getColumns() {
      let url = this.HOST + '/program/recommend';
      this.axios.get(url).then(res => {
        this.$store.commit('columns',res.data.programs);
      });
    },
    getRadios() {
      let url = this.HOST + '/personalized/djprogram';
      this.axios.get(url).then(res => {
        this.$store.commit('radios',res.data.result);
      });
    },
    loadTop() {
      this.getSheets();
      this.$refs.loadmore.onTopLoaded();
    },
    handleTopChange(status) {
      this.topStatus = status;
    }
    // _initScroll() {
    //   Indicator.close();
    //   if (!this.helloScroll) {
    //     this.helloScroll = new BScroll(this.$refs.partIndex, {
    //       click: true
    //     });
    //   } else {
    //     this.helloScroll.refresh();
    //   }
    // }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/css/public.less';
  @width:100%;
  @red:rgba(255,0,0,0.4);
  @blue:rgba(0,0,255,0.4);

  .index{
    width:@width;

    .part-swipe{
      width:@width;
      padding-bottom:30%;
      position:relative;
      .swipe-box{
        width:100%;
        height:100%;
        position:absolute;
        left:0px;
        top:0px;
        .swipe-img{
          width:100%;
          height:100%;
        }
        .swipe-title{
          width:60px;
          height:26px;
          border-radius:13px 0 0 13px ;
          position: absolute;
          right:0px;
          bottom:5px;
          font-size:@font-size*0.8;
          line-height:26px;
          text-align: center;
          color:#FFF;
          &.red{
            background:@red;
          }
          &.blue{
            background:@blue;
          }
        }
      }
    }
    .part-nav{
      width:@width;
      .el-row{
        margin:0px !important;
        .el-col{
            display:block;
            margin:10px 0;
            a{
              width:58%;
              padding-bottom:58%;
              display:block;
              height:0px;
              border:2px solid #d43c33;
              border-radius:50%;
              position:relative;
              margin:0 auto;
              p{
                width:100%;
                height:100%;
                position:absolute;
                display:flex;
                flex-direction:column;
                justify-content: center;
                align-items: center;
                i{
                  font-size:2rem;
                  color:@bg-color;
                }
              }
            }
            b{
              font-size:@font-size;
              margin-top:10px;
              color:#333;
              display: block;
              text-align: center;
            }
        }
      }
    }
    .part-sheet{
      width:@width;
      .el-row{
        margin:0px !important;
        .el-col{
          margin-bottom:10px;
          .image{
            width:@width;
            height:0px;
            padding-bottom:@width*1;
            overflow:hidden;
            position:relative;
            div{
              width:100%;
              height:100%;
              position:absolute;
              left:0px;
              top:0px;
              display:flex;
              justify-content: center;
              align-items: center;
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
          .name{
            margin:10px 5px 5px;
            font-size:@font-size;
            line-height:18px;
            height:36px;
            display:-webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }
    }
    .part-sole{
      .part-sheet;
      .el-col{
        &:nth-child(1),&:nth-child(2){
          .image{
            padding-bottom:@width*0.6;
          }
        }
        &:nth-child(3){
          .image{
            padding-bottom:@width*0.3;
          }
          .name{
            height:18px;
          }
        }
      }
    }

    .name{
      height:18px !important;
      display: block !important;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .author{
      font-size:@font-size;
      margin:0 5px 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color:#999;
    }

    .part-newmusic{
      .part-sheet;
      .name{
        .name;
      }
      .author{
        .author;
      }
    }
    .part-mv{
      .part-sheet;
      .image{
        padding-bottom:@width*0.6 !important;
      }
      .name{
        .name;
      }
      .author{
        .author;
      }
    }
    .part-column{
      width:@width;
      .column-list{
        width:100%;
        ul{
          width:100%;
          overflow:hidden;
          border-top:1px solid #e3e3e3;
          li{
            width:100%;
            height:0;
            padding-top:26%;
            margin-bottom:5px;
            border-bottom:1px solid #e3e3e3;
            position: relative;
            .info{
              width:70%;
              height:80%;
              position: absolute;
              left:0px;
              top:10%;
              float:left;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              p{
                width:calc(~"100% - 20px");
                padding:0 10px;
                font-size:@font-size*1.2;
                line-height:@font-size*1.8;
                em{
                  width:34px;
                  height:16px;
                  display:inline-block;
                  border:1px solid #d43c33;
                  font-size:@font-size*0.8;
                  font-style:normal;
                  line-height:16px;
                  text-align: center;
                  color:@color-red;
                  margin-right:5px;
                }
              }
              b{
                font-size:@font-size;
                line-height:@font-size*1.2;
                color:#999;
                padding:0 10px;
              }
            }
            .image{
                width:30%;
                height:100%;
                overflow:hidden;
                position:absolute;
                right:0px;
                top:0px;
                div{
                  width:100%;
                  height:100%;
                  position:absolute;
                  left:0px;
                  top:0px;
                  display:flex;
                  justify-content: center;
                  align-items: center;
                }
            }
          }
        }
      }
    }
    .part-radio{
      .part-sheet;
      em{
        width:90%;
        padding:0 5%;
        display: block;
        position: absolute;
        left:0px;
        bottom:10px;
        font-size:@font-size*0.8;
        font-style:normal;
        color:#FFF;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
      }
    }
  }
</style>
