<template>
  <dl class="m-sum-card">
    <dt>
      <h1>{{meta.name}}</h1>
      <!-- <el-rate v-model="rate" disabled/> -->
      <!-- <span>{{Number(meta.biz_ext.rating)||rate}}分</span> -->
      <!-- <span>人均￥{{ Number(meta.biz_ext.cost) }}</span> -->
      <ul>
        <li @click="openMap(meta.location)">地址：{{ meta.address }}</li>
        <li v-if="meta.tel">电话：{{ meta.tel.length? meta.tel : '暂无' }}</li>
        <li>营业时间：周一至周日 10:00-24:00</li>
        <li class="Pimg">
          <img src="http://p0.meituan.net/codeman/551290739062eda37e52999e2315f50c1887.png">
          提供wifi
        </li>
        <li class="Pimg">
          <img src="http://p1.meituan.net/codeman/4b1c5696fe5bf2c4d23fb01659b3e68b1960.png">
          停车位
        </li>
      </ul>
    </dt>
    <dd>
      <el-carousel indicator-position="none">
        <el-carousel-item v-for="(item,idx) in meta.photos" :key="idx">
          <h3>
            <img :src="item.url" :alt="item.title" width="383px" height="263px">
          </h3>
        </el-carousel-item>
      </el-carousel>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      rate: ""
    };
  },
  methods: {
    openMap(location) {}
  }
};
</script>


<style lang="scss">
.Pimg {
  margin-top: 10px;
  display: inline-block;
}
</style>
