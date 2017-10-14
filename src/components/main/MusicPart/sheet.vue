<template>
<div class="sheet">
  <div class="part-swipe">
    <img class="bg-img" :src="banner.coverImgUrl"/>
    <div class="swipe-box">
      <mt-swipe :auto="0" :show-indicators="false">
        <mt-swipe-item>
          <img class="swipe-img" :src="banner.coverImgUrl"/>
          <p>
            <b class="t1"><i class="fa-adn"></i>精品歌单</b>
            <b class="t2">{{banner.name}}</b>
            <b class="t3">{{banner.copywriter}}</b>
          </p>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>

  <div class="title">
    <button @click="getSheets('全部')">
      全部歌单
      <i slot="icon" class="fa-angle-right"></i>
    </button>
    <div class="category">
      <a @click="getSheets('华语')">华语</a>
      <a @click="getSheets('古风')">古风</a>
      <a @click="getSheets('欧美')">欧美</a>
      <a @click="getSheets('流行')">流行</a>
    </div>
  </div>

  <div class="part-sheet">
    <el-row :gutter="5" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0">
      <el-col :xs="12" :sm="12" :md="8" :lg="6" v-for="(item, index) in allSheets" :key="item.id">
        <router-link :to="{ name: 'PlayList', params: { id: item.id }}">
          <el-card :body-style="{ padding: '0px' }">
            <div class="image">
              <div>
                <img v-lazy="item.coverImgUrl"/>
              </div>
              <p class="palyCount"><i class="fa-headphones"></i>{{item.playCount < 10000 ? item.playCount : parseInt(item.playCount/10000) + '万'}}</p>
              <p class="author"><i class="fa-user"></i>{{item.creator.nickname}}</p>
            </div>
            <p class="name">{{item.name}}</p>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>

</div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';

export default{
  name:'sheet',
  data() {
    return {
      banner:[],
      loading:false,
      cat:'全部',
      limit:10
    }
  },
  created() {
    if(this.allSheets.length == 0){
      this.getallSheets('全部');
    }else{
      this.banner= this.allSheets[0];
    }
  },
  computed: {
    ...mapState([
      "allSheets"
    ])
  },
  methods: {
    getallSheets() {
      let params = {
        cat : this.cat,
        limit : this.limit
      }
      let url = this.HOST + '/top/playlist/highquality';
      this.axios.get(url,{params}).then(res => {
        this.$store.dispatch('allSheets',res.data.playlists);
        this.banner= res.data.playlists[0];
      });
    },
    getSheets(val) {
      this.cat = val;
      this.getallSheets();
    },
    loadMore() {
      this.loading = true;
      this.limit += 10;
      this.getallSheets();
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../../assets/css/public.less';

.sheet{
  .part-swipe{
    width:100%;
    padding-bottom:40%;
    position:relative;
    overflow:hidden;
    .bg-img{
      width:100%;
      height:100%;
      position: absolute;
      left:0px;
      top:0px;
      -o-filter:blur(25px);-moz-filter:blur(25px);-webkit-filter:blur(25px);-ms-filter:blur(25px);filter:blur(25px);
    }
    .swipe-box{
      width:100%;
      height:100%;
      position:absolute;
      left:0px;
      top:0px;
      .mint-swipe-item{
        width: calc(~"100% - 20px");
        padding:0 10px;
        display: flex;
        align-items: center;
        .swipe-img{
          width:100px;
          height:100px;
        }
        p{
          margin-left:20px;
          b{
            display: block;
            color:#fff;
            &.t1{
              font-size:@font-size*1.4;
              i{
                font-size:@font-size*1.4;
                color:#e2b472;
                margin-right:5px;
                font-weight: bold;
              }
            }
            &.t2{
              font-size:@font-size*1.2;
              margin-top:15px;
            }
            &.t3{
              font-size:@font-size;
              margin-top:15px;
              color:#c2c2c2;
            }
          }
        }
      }
    }
  }
  .title{
    padding:15px 10px;
    display: flex;
    justify-content: space-between;
    button{
      width:100px;
      height:30px;
      border-radius:15px;
      border:1px solid #e6eaeb;
      background:#FFF;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .category{
      a{
        font-size:@font-size;
        line-height: 30px;
        margin-left:15px;
        border-radius:5px;
        &:active{
          background:rgba(0,0,0,0.5);
          color:#FFF;
        }
      }
    }
  }

  .part-sheet{
    width:100%;
    .el-row{
      margin:0px !important;
      .el-col{
        margin-bottom:10px;
        .image{
          width:100%;
          height:0px;
          padding-bottom:100%*1;
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
          .palyCount{
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
          .author{
            width:100%;
            height:30px;
            position:absolute;
            left:0px;
            bottom:0px;
            font-size:@font-size;
            color:#FFF;
            text-align: left;
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
}
</style>
