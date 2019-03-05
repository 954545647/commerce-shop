<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市</dt>
      <dd
        v-for="item in list"
        :name = item.name
        :key="item.id"
        @click="changeCity"
        :class="{'hotClass':flag}"
      >{{item.name=="市辖区"?item.province:item.name}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      flag: true,
      hotClass: {}
    };
  },
  async mounted() {
    let {
      status,
      data: { hots }
    } = await this.$axios.get("/geo/hotCity");
    if (status === 200) {
      this.list = hots;
    }
  },
  methods: {
    changeCity(e) {
      console.log(e.target.innerText)
      window.sessionStorage.setItem('currentCity',e.target.innerText)
      window.location = '/'
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changecity/hot.scss";
.hotClass:hover {
  color: #13d1be;
  cursor: pointer;
}
</style>
