<template>
  <li v-if="meta.photos.length" class="m-detail-item">
    <dl class="section">
      <dd>
        <img :src="meta.photos[0].url" :alt="meta.photos[0].title">
      </dd>
      <dd>
        <h4>{{meta.name}}</h4>
        <p>
          <span
            v-if="meta.biz_ext&&meta.biz_ext.ticket_ordering"
          >剩余：{{ Number(meta.biz_ext.ticket_ordering) }}</span>
          <span v-if="meta.deadline">截止日期：{{ meta.deadline }}</span>
        </p>
        <p>
          <span class="price">{{ Number(meta.biz_ext.cost) }}</span>
          <sub>门店价{{ Number(meta.biz_ext.cost) }}</sub>
        </p>
      </dd>
      <dd>
        <el-button type="warning" round @click="creatCart">立即抢购</el-button>
      </dd>
    </dl>
  </li>
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
  methods: {
    // 创建一个购物车
    creatCart: async function() {
      let self = this;
      let {
        status,
        data: { code, id }
        // 调用创建购物车接口
      } = await this.$axios.post("/cart/create", {
        params: {
          // 由于没有产品库,所以随意起了个id
          id: Math.random()
            .toString()
            .slice(3, 9),
          detail: {
            name: self.meta.name,
            price: self.meta.biz_ext.cost,
            imgs: self.meta.photos
          }
        }
      });
      // 如果购物车创建成功就跳转到订单页面
      // 创建购物车页面和订单页面就是通过 cartNo来维系
      // 我们在创建购物车的时候得到了这个id,此时我们就把这个id通过url传参传到订单页面
      // 在订单页面我们就可以通过在 url 中获取参数然后去请求数据
      if(status===200&&code===0){
        // window.location.href=`/cart/?id=${id}`
        this.$router.push({
          path: `/cart/?id=${id}`
        })
      }else{
        console.log('error')
      }
    }
  }
};
</script>

<style lang="scss">
</style>
