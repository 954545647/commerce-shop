<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumb :type="type"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <summ :meta="product"/>
      </el-col>
    </el-row>
    <el-row class="m-title" v-if="canOrder || !login">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <!-- 商品详情是根据用户是否登录或者该商品有可购买的商品而来 -->
    <el-row v-if="canOrder || !login">
      <el-col :span="24">
        <!-- 如果用户有登录值显示 list 组件 -->
        <list v-if="login" :list="list"/>
        <!-- 用户没登录,就显示登录模块 -->
        <div v-else class="deal-need-login">
          <img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png" alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button type="primary" round>
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!--评论标题 -->
    <el-row class="m-title" v-if="canOrder || !login">
      <el-col :span="24">
        <h3>1431条网友点评</h3>
      </el-col>
    </el-row>
    <!-- 评论模块 -->
    <el-row class="m-title" v-if="canOrder || !login">
      <el-col :span="24">
        <comment />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crumb from "@/components/detail/crumb.vue";
import summ from "@/components/detail/summary.vue";
import List from "@/components/detail/list.vue";
import comment from '@/components/detail/comment.vue';
export default {
  components: {
    crumb,
    summ,
    List,
    comment
  },
  computed: {
    canOrder: function() {
      return this.list.filter(item => item.photos.length).length;
    }
  },
  // 如果在asyncData中返回了数据,那么data中就可以不用写了
  // data() {
  //   return {
  //     product: ""
  //   };
  // },
  async asyncData(ctx) {
    let { keyword, key:type } = ctx.params;
    let {
      status,
      data: { product, more: list, login }
    } = await ctx.$axios.get("/search/products", {
      params: {
        keyword,
        type,
        city: ctx.store.state.geo.position.city
      }
    });
    if (status === 200) {
      return {
        keyword,
        product,
        type,
        list,
        login
      };
    } else {
      return {
        keyword,
        product: {},
        type,
        list: [],
        login: false
      };
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/css/detail/index.scss";
</style>
