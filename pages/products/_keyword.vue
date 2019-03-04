<template>
  <div>
    <el-row class="page-product">
      <el-col :span="19">
        <Crumb/>
        <categroy :types="types" :areas="areas"/>
        <list :list="list" @currentPoint="currentPoint" @currentName="currentName"/>
      </el-col>
      <el-col :span="5" class="fix">
        <!-- <amap :point="point" :name="name" v-if="point.length" :width="230" :height="290"/> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumb from "@/components/products/crumb.vue";
import categroy from "@/components/products/categroy.vue";
import List from "@/components/products/list.vue";
import amap from "@/components/public/map.vue";
export default {
  components: {
    Crumb,
    categroy,
    List,
    amap
  },
  async mounted() {
    // 获取当前url地址
    let hre = window.location.href;
    // 获取关键词
    let a = decodeURIComponent(hre.split("products/")[1]).replace("市", "");
    // 通过vuex进行保存
    this.$store.dispatch("hotplace/setHotName", a);
    // console.log(this.$store.state.geo.position.city,'5555')
    // let b = {city:this.$store.state.geo.position.city}
    // this.$store.dispatch("geo/setPosition", b);
    // console.log(this.$store.state.geo.position.city,'66666')
  },
  data() {
    return {
      list: [],
      types: [],
      areas: [],
      keyword: "",
      point: [], //经纬度,
      name: "" //传递过来的名字
    };
  },
  methods: {
    currentPoint(location) {
      this.point = location.split(",");
    },
    currentName(name) {
      this.name = name;
    }
  },
  async asyncData(ctx) {
    let keyword = ctx.params.keyword;
    let city = ctx.store.state.geo.position.city;
    let {
      status,
      data: { count, pois }
    } = await ctx.$axios.get("/search/resultsByKeywords", {
      params: {
        keyword,
        city
      }
    });
    let {
      status: status2,
      data: { areas, types }
    } = await ctx.$axios.get("/categroy/crumbs", {
      params: {
        city
      }
    });

    if ((status === 200) & (count > 0) && status2 === 200) {
      return {
        // 把返回的数据中没有图片的过滤掉
        list: pois
          .filter(item => item.photos.length)
          // 然后把从后端得到的数据根据前端自己的需求改写
          .map(item => {
            return {
              // 键名是前端自己设置的需要
              // 键值是后端提供的数据
              type: item.type,
              img: item.photos[0].url,
              name: item.name,
              comment: Math.floor(Math.random() * 1000),
              rate: Number(item.biz_ext.rating),
              price: Number(item.biz_ext.cost),
              scence: item.tag,
              tel: item.tel,
              status: "明日可订",
              location: item.location,
              module: item.type.split(",")[0]
            };
          }),
        keyword,
        areas: areas.filter(item => item.type !== "").slice(0, 5),
        types: types.filter(item => item.type !== "").slice(0, 5),
        point: (pois.find(item => item.location).location || "").split(",")
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
