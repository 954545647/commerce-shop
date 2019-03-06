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
    <el-row class="m-title">
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
    <!-- 评论标题 -->
    <el-row class="m-title" v-if="this.comment">
      <el-col :span="24">
        <h3 v-if="this.comment">热心网友点评</h3>
      </el-col>
    </el-row>
    <!-- 评论模块 -->
    <el-row class="m-title" v-if="this.comment">
      <el-col :span="24">
        <comment/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crumb from "@/components/detail/crumb.vue";
import summ from "@/components/detail/summary.vue";
import List from "@/components/detail/list.vue";
import comment from "@/components/detail/comment.vue";
export default {
  data() {
    return {
      keyword: "",
      type: "",
      login: "",
      product: {},
      list: [],
      comment: []
    };
  },
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
  async mounted() {
    let self = this;
    let hrefData = window.location.href.split("/");
    let number = window.location.href.split("/").length;
    let key = decodeURIComponent(hrefData[number - 1]); //类型
    let type = decodeURIComponent(hrefData[number - 2]); //商品名称
    let city = window.sessionStorage.getItem("currentCity");
    // console.log(type, "当前导航条商品名称");
    // console.log('父组件获取cookie的值为',document.cookie.split('=')[1])
    let {
      status,
      data: { product, more: list, login }
    } = await this.$axios.get("/search/products", {
      params: {
        keyword: key,
        type,
        city
      }
    });
    // console.log()
    if (status === 200) {
      self.keyword = key;
      self.product = product;
      self.type = type;
      self.list = list;
      self.login = login;
    }

    // 获取评论数据
    // let {
    //   stauts,
    //   data: { comment }
    // } = await self.$axios.get("/comment/getComment", {
    //   params: {
    //     GoodName: type
    //   }
    // });
    // this.comment = comment;
    // console.log(this.comment, "在detail详情页面获取评论数据");
  }
  // async asyncData(ctx) {
  //   let { keyword, key: type } = ctx.params;
  //   let {
  //     status,
  //     data: { product, more: list, login }
  //   } = await ctx.$axios.get("/search/products", {
  //     params: {
  //       keyword,
  //       type,
  //       city: ctx.store.state.geo.position.city
  //     }
  //   });
  //   if (status === 200) {
  //     return {
  //       keyword,
  //       product,
  //       type,
  //       list,
  //       login
  //     };
  //   } else {
  //     return {
  //       keyword,
  //       product: {},
  //       type,
  //       list: [],
  //       login: false
  //     };
  //   }
  // }
};
</script>


<style lang="scss">
@import "@/assets/css/detail/index.scss";
</style>
