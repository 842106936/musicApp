<template>
<div class="part-radio">
  <mt-cell :title="title" :id="id">
    <i @click="showNum == true ? showNum= 3 : showNum =true" :class="showNum == true ? 'fa-angle-up' : 'fa-angle-down'"></i>
  </mt-cell>
  <el-row :gutter="5">
    <el-col v-if="index < showNum || showNum == true" :xs="8" :sm="8" :md="6" :lg="4" v-for="(item, index) in radioLists" :key="item.id">
      <router-link :to="{ name: 'DJList', params: {id: item.id} }">
        <el-card :body-style="{ padding: '0px' }">
          <div class="image">
            <div>
              <img v-lazy="item.picUrl"/>
            </div>
          </div>
          <p class="name">{{item.name}}</p>
        </el-card>
      </router-link>>
    </el-col>
  </el-row>
</div>
</div>
</template>

<script>
import { Actionsheet , Indicator} from 'mint-ui';
import {mapState ,mapMutations ,mapActions} from 'vuex';

export default{
  name: 'radios',
  data() {
    return {
      radioLists:[],
      showNum:3
    }
  },
  created() {
    this.getRadioLists();
  },
  props:['title','id'],
  methods: {
    getRadioLists() {
      let params = {
        type: this.id
      }
      let url = this.HOST + '/dj/recommend/type';
      this.axios.get(url,{params}).then(res => {
        this.radioLists = res.data.djRadios;
      });
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/css/public.less';
  .part-radio{
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
</style>
