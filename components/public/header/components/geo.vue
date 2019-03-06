<template>
  <div class="m-geo">
    <i class="iconfont icon-location"/>
    <!-- {{$store.state.geo.position.city}} -->
    {{currentCityName}}
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentCityName:''
    }
  },
  mounted() {
    let cityname = this.$store.state.geo.position.city;
    let Cityname = window.sessionStorage.getItem("currentCity").replace("市", "");
    if(cityname){
      this.currentCityName = cityname
    }else{
      this.currentCityName = Cityname
    }
  },
};
</script>

<style lang="scss">
</style>
