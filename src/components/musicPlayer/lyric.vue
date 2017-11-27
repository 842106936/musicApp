<template>
  <div class="lyric" @click="closeLyric" v-cloak>
    <ul>
      <li v-for="(item, index) in afterLrc" :style="{'transform':' translate3d(0px,'+ lrcOffset +'px, 0px)'}">
        <p :id="'line-' + index"  :class="{'active':lrcIndex == index}" :key="index">
          {{item.txt}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default{
  data() {
    return {
      lyric: '',
      afterLrc: [],
      lrcIndex: 0
    }
  },
  created() {
    this.loadLrc(this.musicInfo.id);
  },
  computed:{
    ...mapState([
      "musicInfo","currentTime"
    ]),
    lrcOffset () {
      if (this.afterLrc) {
        // 1、根据时间获得歌词
        var current = Math.round(this.currentTime);
        // 2、根据时间得到歌词
        for (var i = 0; i < this.afterLrc.length; i++) {
          if (this.afterLrc[i].time === current) this.lrcIndex = i
        }
        return -(this.lrcIndex) * 60 + 60 * 3
      }
    }
  },
  watch: {
    musicInfo() {
      this.loadLrc(this.musicInfo.id);
    }
  },
  methods: {
    loadLrc(id) {
      this.afterLrc = [{'txt': '正在加载中...'}];
      let params = {
        id: this.musicInfo.id
      };
      let url = this.HOST + '/lyric';
      this.axios.get(url,{params}).then(res => {
        //判断是否有歌词
        if(res.data.lrc.lyric == null){
          this.afterLrc = [{'txt': '暂无歌词'}];
        }else{
          this.lyric = res.data.lrc.lyric;
          this.$nextTick(() => {
            if(this.lyric) {
              this.getLrc();
            }
          })
        }
      },res => {
        console.log("加载失败");
        this.afterLrc = [{'txt':'加载失败'}];
      })
      .catch(err => {
        console.log(err);
        this.afterLrc = [{'txt':'暂无歌词'}];
      })
    },
    getLrc() {
      var lyrics = this.lyric.split('\n'),
          lrcObj = [],
          timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      for(var i=0;i < lyrics.length; i++){
        //match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
        var timeRegExpArr = lyrics[i].match(timeReg);
        if(!timeRegExpArr) continue;
        var txt = lyrics[i].replace(timeReg, '');
        //处理时间
        for(var k=0;k<timeRegExpArr.length; k++){
          var arr = {},
              t = timeRegExpArr[k],
              min = Number(String(t.match(/\[\d*/i)).slice(1)),
              sec = Number(String(t.match(/\:\d*/i)).slice(1)),
              time = min*60 +sec;
          arr.time = time;
          arr.txt = txt;
          lrcObj.push(arr);
        }
      }
      this.afterLrc = lrcObj;
    },
    closeLyric() {
      this.$emit('closeLyric');
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';

.lyric{
  width:100%;
  height:100%;
  position: absolute;
  left:0;
  top:0;
  overflow: hidden;
  ul{
    width:100%;
    overflow: hidden;
    li{
      width:100%;
      transition: -webkit-transform 0.3s ease-out;
      transform-origin: 0px 0px 0px;
      overflow:hidden;
      p{
        text-align:center;
        font-size:14px;
        line-height:60px;
        height:60px;
        color:rgba(255,255,255,0.6);
        &.active{
          color:#fff;
        }
      }
    }
  }
}
</style>
