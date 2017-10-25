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
       "viewDirection"
     ]),
     paddingBottom() {
       if(this.viewDirection != "up"){
         return "50px"
       }else{
         return "0"
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

#app{

}

</style>
