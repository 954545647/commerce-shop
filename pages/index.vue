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
    if (ses.getItem("currentCity")) {
      const {
        status,
        data: { result }
      } = await self.$axios.get("/search/hotPlace", {
        params: {
          city: ses.getItem("currentCity")
            ? ses.getItem("currentCity").replace("市", "")
            : ses.getItem("currentCity")
        }
      });
      ses.setItem("result", JSON.stringify(result));
    }

    // 设置当前城市和省份
    await self.$store.dispatch(
      "geo/setPosition",
      {
        city: window.sessionStorage.getItem("currentCity").replace("市", ""),
        province: window.sessionStorage.getItem("currentPro")
      },
      { root: true }
    );
    // 设置热门城市
    self.$store.dispatch("home/setHotPlace", JSON.parse(ses.getItem("result")));
  },
};
</script>

<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>


