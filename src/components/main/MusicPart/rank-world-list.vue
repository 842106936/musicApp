<template>
      <el-card :body-style="{ padding: '0px' }" :key="ranks.id">
        <div class="image">
          <div>
            <img v-lazy="ranks.coverImgUrl"/>
          </div>
        </div>
        <p class="name">{{ranks.name}}</p>
      </el-card>
</template>

<script>
export default {
  data() {
    return {
      ranks:[]
    }
  },
  created() {
    this.getRanks();
  },
  props:["idx"],
  methods: {
    getRanks() {
      var params = {
        idx: this.idx
      }
      var url = this.HOST + '/top/list';
      this.axios.get(url,{params}).then(res => {
        this.ranks = res.data.result;
      });
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/css/public.less';

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

</style>
