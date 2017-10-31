<template>
  <div id="app" :style="{'padding-bottom':paddingBottom}">
    <transition :name="viewDirection">
      <router-view></router-view>
    </transition>
    <music-player></music-player>
  </div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';
import musicPlayer from './components/musicPlayer/MusicPlayer.vue';

export default{
  data() {
    return {
    }
  },
  computed: {
     ...mapState([
       "viewDirection","musicInfo"
     ]),
     paddingBottom() {
       if(this.musicInfo == ''){
         return "0";
       }else{
         return "50px";
       }
     }
  },
  components: {
    'music-player' : musicPlayer
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import './assets/css/public.less';
@import './assets/css/animate.less';
#app{

}

</style>
