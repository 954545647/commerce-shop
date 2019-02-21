<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu/>
      </el-col>
      <el-col :span="19">
        <life/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <artistic/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Emenu from "@/components/index/menu.vue";
import Life from "@/components/index/life.vue";
import artistic from "@/components/index/artistic.vue";
export default {
  components: {
    Emenu,
    Life,
    artistic
  },
  async mounted() {
    let self = this;
    let ses = window.sessionStorage;
    if (ses.getItem("currentCity") === "" || !ses.getItem("currentCity")) {
      const {
        status,
        data: { province, city }
      } = await self.$axios.get("/geo/getPosition");
      ses.setItem("currentCity", city);
      ses.setItem("currentPro", province);
    }
    if(ses.getItem('currentCity')){
      const {
        status,
        data:{result}
      } = await self.$axios.get('/search/hotPlace',{
        params:{
          city: ses.getItem('currentCity').replace('市', '')
        }
      })
      ses.setItem('result', JSON.stringify(result))
    }
    // 设置当前城市和省份
    self.$store.dispatch('geo/setPosition',{city:ses.getItem('currentCity'),province:ses.getItem('currentPro')})
    // 设置热门城市
    self.$store.dispatch('home/setHotPlace',JSON.parse(ses.getItem('result')))
    ses.setItem('currentCity','')
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>
