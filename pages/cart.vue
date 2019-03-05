<template>
  <div class="page-cart">
    <el-row>
      <!-- 要考虑购物车为空的时候,所以使用v-if和v-else -->
      <el-col class="m-cart" v-if="cart.length" :span="24">
        <!-- 由于在list组件中的data是 cartData -->
        <!-- 我们这里要把驼峰写法转成 - 写法 -->
        <list :cart-data="cart"/>
        <div class="cart-p">
          <span>
            应付金额:
            <em class="money">￥{{total}}</em>
          </span>
        </div>
        <div class="post">
          <el-button class="btn" type="primary" @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>


<script>
import list from "@/components/cart/list.vue";
export default {
  components: {
    list
  },
  data() {
    return {
      // 这里的数据通过 ssr 服务端获取
      // 然后通过父子组件传值传递给 list 组件
      cart: []
    };
  },
  computed: {
    total() {
      let total = 0;
      this.cart.forEach(item => {
        total += item.price * item.count;
      });
      return total;
    }
  },
  methods: {
    // 在购物车页面中点击提交订单按钮,在后台会偷偷创建一个订单
    // 创建订单后台会返回一个订单id,我们就可以把这个订单id通过url传参的形式传到订单页面
    // 接着在订单页面就可以从url中获取我们在这里创建订单并传递过去的订单id,然后去获取订单数据
    submit: async function(){
      let self = this;
      // 创建订单会返回订单id
      let {
        status,
        data: { code, id }
      } = await self.$axios.post("/order/createOrder", {
        count: this.cart[0].count,
          price: this.cart[0].price,
        // 把购物车id传递过去
          id: this.cartNo,
      });
      if (status === 200 && code === 0) {
        // 如果创建成功,数据库会有我们的订单数据,把订单通过url传出去
        this.$confirm(`订单创建成功, 订单号${id}`, "下单成功", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success",
          // callback:action=>{
          //   window.location.href = `/order/?id=${id}`;
          // }
        }).then(()=>{
          // 把订单订单id通过url的方式传递到我们的订单页面!!
          // 接着我们就可以在订单页面通过这个id去获取数据库中的值
          window.location.href =  `/order/?id=${id}`;
        }).catch(()=>{
          window.location.href =  '/order';
        })
      } else {
        console.log("error");
      }
    }
  },
  // 产品详情页面(item组件)通过在点击立即抢购创建购物车,调用'/cart/creat'接口
  // 然后服务端会返回一个购物车id(cartNo),接着我们就可以拿这个id去请求购物车数据
  // 这里请求购物车信息所需要的参数就是 cartNo
  // 服务端渲染ssr我们可以通过 return从服务端提前渲染的数据data和组件的数据融合
  async asyncData(ctx) {
    let {
      status,
      data: {
        code,
        data: { name, price }
      }
    } = await ctx.$axios.post("/cart/getCart", {
      id: ctx.query.id
    });
    if (status === 200 && code === 0 && name) {
      return {
        cart: [
          {
            name,
            price,
            count: 1
          }
        ],
        cartNo: ctx.query.id
      };
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/css/cart/index.scss";
.cart-p {
  text-align: right;
  padding: 12px;
  width: 980px;
  > span {
    font-size: 12px;
    font-weight: bolder;
    color: #666;
    line-height: 30px;
    margin-right: 20px;
    .money {
      font-size: 20px;
      color: #f76120;
    }
  }
}
.post {
  text-align: right;
  height: 36.4px;
  .btn {
    display: inline-block;
    padding: 5px 20px 4px;
    font-size: 20px;
    font-weight: 400;
    color: #fff;
    background-color: #2db3a6;
    background-image: linear-gradient(to bottom, #2ec3b4, #2db3a6);
    border-width: 0 0 1px;
    border-color: #008177;
    border-radius: 2px;
    user-select: none;
    cursor: pointer;
    letter-spacing: 2px;
    height: 100%;
  }
}
</style>
