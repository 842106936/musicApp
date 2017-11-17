<template>
  <div class="dj-list">
    <div class="dj-top">
      <img :src="djBackground"/>
      <span class="bg"></span>
      <div class="dj-head">
        <a><i class="fa-angle-left" @click="$router.back(-1)"></i></a>
        <p>电台</p>
        <a><i class="fa-share-alt"></i></a>
      </div>
      <div class="dj-info">
        <div class="dj-info-title">
          <p>{{djRadio.name}}</p>
          <p>{{djRadio.subCount < 10000 ? djRadio.subCount : parseInt(djRadio.subCount/10000) + '万'}}人订阅</p>
        </div>
        <a class="dj-info-subscribe">
          <i class="fa-star-o"></i>订阅
        </a>
      </div>
    </div>

    <div class="dj-content">
      <p :class="{'active':djShow == 0}" @click="djShow = 0">详情</p>
      <p :class="{'active':djShow == 1}" @click="djShow = 1">节目<i>{{djList.count}}</i></p>
    </div>
    <div class="dj-main">
      <transition name="left">
      <div v-if="djShow == 0" class="dj-brief">
        <div class="dj-author">
          <h4>主播</h4>
          <div class="dj-author-brief">
            <img :src="djRadio.dj.avatarUrl">
            <p>
              <b>{{djRadio.dj.nickname}}</b>
              <em>{{djRadio.dj.description}}</em>
            </p>
          </div>
        </div>
        <div class="dj-context">
          <h4>电台内容简介</h4>
          <div class="dj-context-brief">
            <p>分类：<i>{{djRadio.category}}</i></p>
            <p>{{djRadio.desc}}</p>
          </div>
        </div>
        <div class="dj-comment">
          <!-- <h4>精彩评论</h4>
           <div class="dj-comment-list">
            <ul>
              <li v-for="item in comment.hotComments">
                <div class="user">
                  <img :src="item.user.avatarUrl">
                  <p>
                    <b>{{item.user.nickname}}</b>
                    <em>{{item.time | dateType}}</em>
                  </p>
                  <span :class="{'liked':item.liked == true}" @click.stop="like(item)">
                    <b>{{item.likedCount}}</b>
                    <i class="fa-thumbs-up"></i>
                  </span>
                </div>
                <p class="txt">{{item.content}}</p>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
      </transition>
      <transition name="right">
      <div v-if="djShow == 1" class="dj-list">
        <div class="dj-list-title">
          <b>共{{djList.count}}期</b>
          <a @click="sortDJ()"><i :class="djSort ? 'fa-long-arrow-down' : 'fa-long-arrow-up'"></i>排序</a>
        </div>
        <ul class="dj-list-ul">
          <li v-for="(item,index) in djList.programs" :key="item.id" @click="MusicPlay(item)">
            <i class="icon fa-volume-up" v-if="item.id == musicInfo.id"></i>
            <p class="playlist-index" v-else>
              {{djSort ? djList.count-index : index+1}}
            </p>
            <div class="playlist-info">
              <p class="name">{{item.name}}</p>
              <p class="info"><em>{{item.createTime | dateType('data')}}</em><em><i class="fa-caret-right"></i>{{item.listenerCount}}</em><em><i class="fa-clock-o"></i>{{item.createTime | dateType('time')}}</em></p>
            </div>
            <i class="fa-ellipsis-v" @click.stop="djVisible = true"></i>
          </li>
        </ul>
      </div>
      </transition>
    </div>
    <mt-actionsheet :actions="actions" v-model="djVisible"></mt-actionsheet>
  </div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';
import { Actionsheet , Indicator} from 'mint-ui';

export default {
  data () {
    return {
      id:this.$route.params.id,
      djShow:1, //内容显示，0代表显示介绍，1代表显示列表
      djSort:true, //true列表降序,false列表升序
      actions:[
        {name:'下一首播放',method:''},
        {name:'收藏到歌单',method:''},
        {name:'下载',method:''}
      ],
      djVisible:false,
      List:[]
    }
  },
  created() {
      //所有数据在列表页点击电台时已获取
      this.djDetail();
  },
  filters: {
    dateType(value,model) {
      value= +(value.toString().substr(0,10));
      var result,
      d= new Date( value * 1000),
      Y = d.getFullYear(),
      M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1),
      D = d.getDate(),
      h = d.getHours()<10 ? '0'+ d.getHours() + ':' :  d.getHours() + ':' ,
      m = d.getMinutes()<10? '0'+d.getMinutes() + ':': d.getMinutes() + ':',
      s = d.getSeconds()<10 ? '0'+ d.getSeconds(): d.getSeconds();
      if(model == 'data'){
        result = Y + '-' + M + '-' + D;
      }else if(model == 'time'){
        result = h + m + s;
      }else{
        result = Y + '年' + M + '月' + D + '日';
      }
      return result;
    }
  },
  computed: {
    ...mapState([
      'musicInfo',"playerList","djInfo","commentType"
    ]),
    djID() {
      return this.djInfo.djID;
    },
    djRadio() {
      return this.djInfo.djRadio;
    },
    djList() {
      return this.djInfo.djList;
    },
    djBackground() {
      return this.djInfo.djRadio.picUrl;
    }
  },
  methods: {
    MusicPlay(item) {
      //评论类型dj
      this.$store.commit("commentType",'dj');
      //当前dj
      let arr = {
        title : item.name,
        author : item.dj.nickname,
        id : item.id,
        dj: item.mainSong.id,
        pic : item.coverUrl
      }
      this.$store.dispatch('musicInfo', arr);
      //如果该电台不在播放列表则将其加入
      if(this.playerList.id.indexOf(this.djID) == -1){
        for(var i = 0; i < this.djList.programs.length; i++){
          let obj = {
            title : this.djList.programs[i].name,
            author : this.djList.programs[i].dj.nickname,
            id : this.djList.programs[i].id,
            dj: this.djList.programs[i].mainSong.id,
            pic : this.djList.programs[i].coverUrl
          }
          this.List.push(obj);
        }
        this.$nextTick(() => {
          this.$store.commit('addListID', this.djID);
          this.$store.commit('addListToPlayerList', this.List);
        })
      }
    },
    sortDJ() {
      this.djList.programs.reverse();
      this.djSort == false ? this.djSort = true : this.djSort = false;
    },
    getDjDetail() {
      //获取电台节目详情
      let params = {
        rid: this.id
      };
      let url = this.HOST + '/dj/detail';
      return this.axios.get(url,{params});
    },
    getDjRadio() {
      //获取电台节目列表
      let params = {
        rid: this.id,
        limit: 1000
        //limit: res.data.djRadio.programCount
      };
      let url = this.HOST + '/dj/program';
      return this.axios.get(url,{params});
    },
    djDetail() {
      if(this.djInfo.djID != this.id){
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        this.axios.all([this.getDjDetail(),this.getDjRadio()]).then(this.axios.spread((res,red) => {
          let DJ = {
            'id': this.id,
            'djRadio': res.data.djRadio,
            'djList': red.data
          }
          this.$store.commit('setDJinfo',DJ);
          Indicator.close();
        })).catch(error => {
          console.log(error);
        })
      }
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../assets/css/animate.less';
  @import '../assets/css/public.less';
  .h4{
    width:100%;
    height:16px;
    border-left:3px solid @color-red;
    font-size:14px;
    text-indent:10px;
    line-height:100%;
    margin:10px 0;
  }

  .dj-list{
    width:100%;
    overflow:hidden;
    .dj-top{
      width:100%;
      padding-bottom:70%;
      position:relative;
      overflow:hidden;
      &>img{
        width:100%;
        height:100%;
        position: absolute;
        left:0;
        top:0;
      }
      &>.bg{
        width:100%;
        height:100%;
        display: block;
        position: absolute;
        left:0;
        top:0;
        box-shadow:0px 0px 150px rgba(0,0,0,0.5) inset;
      }
      .dj-head{
        width:100%;
        height:60px;
        position: absolute;
        a{
          width:50px;
          height:100%;
          float:left;
          display: flex;
          justify-content: center;
          align-items: center;
          i{
            font-size:18px;
            color:#FFF;
          }
        }
        p{
          width:calc(~"100% - 100px");
          height:100%;
          float:left;
          display: flex;
          flex-direction:column;
          justify-content: center;
          white-space: nowrap;
          overflow: hidden;
          font-size:16px;
          color:#FFF;
        }
      }
      .dj-info{
        width:100%;
        height:60px;
        position:absolute;
        left:0;
        bottom:0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .dj-info-title{
          width:calc(~"100% - 110px");
          overflow:hidden;
          margin:0 10px;
          p{
            width:100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow:hidden;
            &:nth-child(1) {
              font-size:16px;
              line-height:22px;
              color:#FFF;
            }
            &:nth-child(2) {
              font-size:12px;
              color:#f2f2f2;
              line-height:18px;
            }
          }
        }
        .dj-info-subscribe{
          width:80px;
          height:24px;
          margin-right:10px;
          border:1px solid #FFF;
          border-radius:25px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size:12px;
          color:#FFF;
          i{
            font-size:14px;
            color:#FFF;
            padding-right:5px;
          }
        }
      }
    }
    .dj-content{
      width:100%;
      height:40px;
      background:#FFF;
      box-shadow:0px 0px 1px rgba(0,0,0,0.2);
      p{
        width:50%;
        height:100%;
        font-size:13px;
        line-height:40px;
        color:#666;
        text-align:center;
        float:left;
        border-bottom:2px solid transparent;
        box-sizing: border-box;
        &.active{
          color:@color-red;
          border-bottom:2px solid @color-red;
        }
        i{
          font-style:normal;
          font-size:12px;
          color:#999;
          margin-left:3px;
        }
      }
    }
    .dj-main{
      width:100%;
      overflow:hidden;
      background:#f3f4f6;
      .dj-author{
        width:100%;
        overflow:hidden;
        h4{
          .h4
        }
        .dj-author-brief{
          width:100%;
          height:80px;
          border-top:1px solid #ecedef;
          border-bottom:1px solid #ecedef;
          img{
            width:60px;
            height:60px;
            border-radius:50%;
            margin:10px;
            float:left;
          }
          p{
            width:calc(~"100% - 80px");
            height:100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            float:left;
            b{
              width:100%;
              display:block;
              font-size:15px;
              color:#333;
              line-height:20px;
            }
            em{
              width:100%;
              font-style: normal;
              display:block;
              font-size:12px;
              color:#666;
              line-height:14px;
            }
          }
        }
      }
      .dj-context{
        h4{
          .h4
        }
        .dj-context-brief{
          width:100%;
          overflow:hidden;
          padding-bottom:20px;
          p{
            font-size:@font-size;
            padding:0 10px;
            line-height:22px;
            &:nth-child(1){
              i{
                padding:1px 5px;
                font-size:10px;
                font-style: normal;
                color:@color-red;
                border:1px solid @color-red;
                position:relative;
                top:-1px;
              }
            }
          }
        }
      }
      .dj-comment{
        h4{
          .h4
        }
      }
      .dj-list{
        width:100%;
        overflow:hidden;
        .dj-list-title{
          width:calc(~"100% - 20px");
          padding:0 10px;
          height:28px;
          background:#e7e9e8;
          display: flex;
          justify-content:space-between;
          align-items: center;
          b{
            font-style:normal;
            font-size:12px;
          }
          a{
            font-style:normal;
            font-size:12px;
            color:#333;
          }
        }
        li{
          width: calc(~"100% - 20px");
          overflow:hidden;
          padding:5px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom:1px solid #e7e9e8;
          .icon{
            font-size:16px;
            color:@color-red;
            font-weight: bold;
          }
          .playlist-index{
            font-size:14px;
            color:333@color-red;
          }
          .playlist-info{
            width:calc(~"100% - 60px");
            overflow:hidden;
            .name{
              font-size:14px;
              color:#333;
              line-height:20px;
            }
            .info{
              em{
                font-size:10px;
                font-style:normal;
                color:#999;
                & + em{
                  margin-left: 10px;
                }
                i{
                  font-size:10px;
                  color:#999;
                  margin-right:2px;
                }
              }

            }
          }
        }
      }
    }
  }
</style>
