import Router from "koa-router";
import axios from "./utils/axios";
import Cart from "../dbs/modules/cart";
import md5 from "crypto-js/md5";
import Order from "../dbs/modules/order";
import User from '../dbs/modules/user'
const router = new Router({
  prefix: "/order"
});

// 购物车页面提交订单/创建订单
router.post("/createOrder", async ctx => {
  let { id, price, count } = ctx.request.body;
  let time = Date();
  let orderId = md5(Math.random() * 1000 + time).toString();
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: "please login"
    };
  } else {
    // 通过购物车id去数据库查找订单数据
    let findCart = await Cart.findOne({ cartNo: id });
    let order = new Order({
      id: orderId, //订单id
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imgs: findCart.detail[0].imgs,
      status: 0
    });
    try {
      let result = await order.save();
      if (result) {
        // 创建订单的时候把购物车清空
        await findCart.remove();
        ctx.body = {
          code: 0,
          id: orderId //订单id,有区别于购物车id
        };
      } else {
        ctx.body = {
          code: -1
        };
      }
    } catch (e) {
      ctx.body = {
        code: -1
      };
    }
  }
});

// 用户点击提交订单,然后调用上面的'/createOrder'接口,去创建一个新的订单
// 然后会在数据库中保存一条订单信息,并且会返回一个订单id
// 点击完提交订单之后会跳转到我的订单页面,此时用户就可以根据这个订单id去获取数据
router.post("/getOrders", async ctx => {
  let {user} = ctx.request.body;
  // 查看我的订单必须要有登录
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: "please login"
    };
  } else {
    try {
      // 去查找全部数据,然后我们在前端再做数据筛选
      let userDate = await User.findOne({username:user})
      let userId = userDate._id
      let result = await Order.find({user:userId});
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        };
      } else {
        ctx.body = {
          code: -1,
          list: []
        };
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        list: []
      };
    }
  }
});
export default router;
