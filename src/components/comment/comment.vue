<template>
  <div class="comment">
    <div class="header">
      <a><i class="fa-angle-left" @click="$router.back(-1)"></i></a>
      <p>评论（{{comment.commentsTotal}}）</p>
    </div>
    <div class="musicInfo">
      <router-link to="/player">
        <img :src="musicInfo.pic"/>
        <p>
          <b>{{musicInfo.title}}</b>
          <em>{{musicInfo.author}}</em>
        </p>
        <i class="fa-angle-right"></i>
      </router-link>
    </div>
    <div class="comments">
      <h5>精彩评论</h5>
      <div class="comment-list">
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
            <p>{{item.content}}</p>
          </li>
        </ul>
      </div>
      <h5>最新评论{{comment.commentsTotal}}</h5>
      <div class="comment-list">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li v-for="item in comments">
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
            <p>{{item.content}}</p>
          </li>
        </ul>
        <p class="loadTips" v-if="loading">
          <i class="el-icon-loading"></i>加载中...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';
import { InfiniteScroll } from 'mint-ui';


export default{
  data() {
    return {
      loading:false,
      commentOffset:0
    }
  },
  filters: {
    dateType(value) {
      value= +(value.toString().substr(0,10));
      var result,
        d= new Date( value * 1000),
       Y = d.getFullYear()+ '年',
       M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '月',
       D = d.getDate() + '日 ',
       h = d.getHours()<10 ? '0'+ d.getHours() + ':' :  d.getHours() + ':' ,
       m = d.getMinutes()<10? '0'+d.getMinutes() + ':': d.getMinutes() + ':',
       s = d.getSeconds()<10 ? '0'+ d.getSeconds(): d.getSeconds();
     result = Y + M + D ;
     return result;
    }
  },
  computed: {
    ...mapState([
      "comment","musicInfo"
    ]),
    comments() {
      return this.comment.comments
    }
  },
  methods: {
    like(item) {
      let l = '';
      item.liked ? l = 0 : l = 1;
      // let params = {
      //   id: this.musicInfo.id,
      //   cid: item.commentId,
      //   t: l,
      //   type: 0
      // }
      // let url = this.HOST + '/comment/like'
      // this.axios.get(url, {params}).then(() => {
      if(l == 1){
        item.liked = true;
        item.likedCount += 1;
      }else{
        item.liked = false;
        item.likedCount += -1;
      }
      // })
    },
    loadMore() {
      this.loading = true;
      this.commentOffset += 1;
      let params = {
        id: this.musicInfo.id,
        limit: 20,
        offset: this.commentOffset
      }
      let url = this.HOST + '/comment/music'
      this.axios.get(url,{params}).then(res => {
        for(var i=0;i<res.data.comments.length;i++){
          this.comments.push(res.data.comments[i]);
        }
        this.loading = false;
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';

.comment{
  .header{
    width:100%;
    height:60px;
    background:@bg-color;
    a{
      width:50px;
      height:100%;
      float:left;
      display: flex;
      justify-content:center;
      align-items: center;
      i{
        font-size:18px;
        color:#FFF;
      }
    }
    p{
      width:calc(~"100% - 50px");
      height:100%;
      float:left;
      font:16px/60px '微软雅黑';
      color:#FFF;
    }
  }
  .musicInfo{
    a{
      width:100%;
      height:100px;
      display: flex;
      justify-content:space-between;
      align-items: center;
      img{
        width:80px;
        height:80px;
        margin:10px;
      }
      p{
        width:calc(~"100% - 140px");
        height:100%;
        display: flex;
        flex-direction:column;
        justify-content: center;
        b{
          width:100%;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          font-size:20px;
          color:#666;
          line-height:32px;
        }
        em{
          width:100%;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          font-size:16px;
          font-style: normal;
          color:#999;
          line-height:24px;
        }
      }
      i{
        width:40px;
        font-size:14px;
        color:#666;
        text-align:center;
      }
    }
  }
  .comments{
    width:100%;
    overflow:hidden;
    h5{
      width:100%;
      height:20px;
      background:#eee;
      font:12px/20px '微软雅黑';
      color:#666;
      text-indent:1em;
    }
    .comment-list{
      width:100%;
      overflow:hidden;
      li{
        width:100%;
        overflow:hidden;
        .user{
          width:100%;
          height:60px;
          display:flex;
          justify-content: space-between;
          align-items: center;
          img{
            width:40px;
            height:40px;
            margin:10px;
            border-radius:50%;
          }
          p{
            width:calc(~"100% - 140px");
            height:100%;
            display: flex;
            flex-direction:column;
            justify-content: center;
            b{
              width:100%;
              display: block;
              white-space: nowrap;
              overflow: hidden;
              font-size:@font-size;
              color:#666;
              line-height:24px;
            }
            em{
              width:100%;
              display: block;
              white-space: nowrap;
              overflow: hidden;
              font-size:@font-size - 2px;
              font-style: normal;
              color:#999;
              line-height:20px;
            }
          }
          span{
            width:80px;
            height:100%;
            display: flex;
            align-items: center;
            justify-content: center;
            b{
              font-size:12px;
              color:#666;
              margin-right:3px;
            }
            i{
              font-size:14px;
              color:#666;
            }
            &.liked{
              b{
                color:@color-red;
              }
              i{
                color:@color-red;
              }
            }
          }
        }
        p{
          width:calc(~'100% - 70px');
          float:right;
          font:14px/24px '微软雅黑';
          color:#333;
          padding:0 10px 5px 0;
          border-bottom:1px solid #f2f2f2;
        }
      }
      .loadTips{
        width:100%;
        font:14px/40px '微软雅黑';
        color:#333;
        text-align:center;
      }
    }
  }
}

</style>
