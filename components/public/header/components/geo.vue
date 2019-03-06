<template>
  <div class="m-geo">
    <i class="iconfont icon-location"/>
    {{currentCityName}}
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentCityName: "",
    };
  },
  async mounted() {
    let {
      status,
      data: { city }
    } = await axios.get("geo/getPosition");
    this.currentCityName = window.sessionStorage.getItem("currentCity")
      ? window.sessionStorage.getItem("currentCity")
      : city;
  }
};
</script>

<style lang="scss">
</style>

<!-- {{$store.state.geo.position.city}} -->
<!-- <a href="/changeCity" class="changeCity">切换城市</a>-->
// <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>

