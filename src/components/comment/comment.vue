<template>
  <div class="comment">
    <div class="header">
      <a><i class="fa-angle-left" @click="$router.back(-1)"></i></a>
      <p>评论（{{comment.total}}）</p>
    </div>
    <div class="music">
      <router-link>
        <img :src="musicInfo.pic"/>
        <p>
          <b>{{music.title}}</b>
          <em>{{music.author}}</em>
        </p>
        <i class="fa-angle-right"></i>
      </router-link>
    </div>
    <div class="comment">
      <h5>精彩评论</h5>
      <div class="comment-list">
        <ul>
          <li v-for="item in hotComments">
            <div class="user">
              <img :src="item.user.avatarUrl">
              <p>
                <b>{{item.user.nickname}}</b>
                <em>{{item.time | dateType}}</em>
              </p>
              <a :class="{'liked':item.liked == 'true'}">
                {{item.likedCount}}
                <i class="fa-thumbs-up"></i>
              </a>
            </div>
            <p>{{item.content}}</p>
          </li>
        </ul>
      </div>
      <h5>最新评论{{comment.total}}</h5>
      <div class="comment-list">
        <ul>
          <li v-for="item in comments">
            <div class="user">
              <img :src="item.user.avatarUrl">
              <p>
                <b>{{item.user.nickname}}</b>
                <em>{{item.time | dateType}}</em>
              </p>
              <a :class="{'liked':item.liked == 'true'}">
                {{item.likedCount}}
                <i class="fa-thumbs-up"></i>
              </a>
            </div>
            <p>{{item.content}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';
export default{
  data() {
    return {

    }
  },
  filters: {
    dateType(val) {

    }
  },
  complate: {
    ...mapState([
      "comment","musicInfo"
    ]),
    hotComments() {
      return this.comment.hotComments
    },
    comments() {
      return this.comment.comments
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
</style>
