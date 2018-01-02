<template>
  <div class="rank-box">
      <img :src="img"/>
      <div class="rank-list">
        <p v-if="index < 3" v-for="(item, index) in ranks" :key="item.id">
          {{index+1}}.{{item.name}}
        </p>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img:'',
      ranks:[]
    }
  },
  created() {
    this.getRanks();
  },
  props:["idx"],
  methods: {
    getRanks() {
      let params = {
        idx: this.idx
      }
      let url = this.HOST + '/top/list';
      this.axios.get(url,{params}).then(res => {
        this.img = res.data.result.coverImgUrl;
        this.ranks = res.data.result.tracks;
      });
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/css/public.less';
  .rank-box{
    width:100%;
    overflow:hidden;
    margin-bottom:5px;
    display: flex;
    align-items: center;
    img{
      width:33%;
      height:auto;
      float:left;
    }
    .rank-list{
      //width: calc(~"100% - 130px");
      width: calc(~"67% - 30px");
      height:100%;
      float:left;
      margin-left:15px;
      p{
        width:100%;
        font-size:14px;
        line-height:16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      p+p{
        margin-top:15px;
      }
    }
  }
</style>
