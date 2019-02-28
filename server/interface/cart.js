import Router from "koa-router";
import axios from "./utils/axios";
import md5 from "crypto-js/md5";
import Cart from "../dbs/modules/cart";

let router = new Router({
  prefix: "/cart"
});

// 创建购物车
router.post("/create", async ctx => {
  // 如果没有登录
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: "please login"
    };
  } else {
    // 数据库中使用String类型,否则需要考虑时区问题
    let time = Date();
    // 保证购物车id不一样
    // 这个购物车id不仅要存进数据库,并且要返回给用户,
    // 因为用户需要拿着这个数据来请求自己的购物车数据
    let cartNo = md5(Math.random() * 1000 + time).toString();
    // post请求使用的是 ctx.request.body
    // get请求使用的是 ctx.query.body
    let {
      params: { id, detail }
    } = ctx.request.body;
    // 创建一个购物车
    let cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    });
    // 入库操作
    let result = await cart.save();
    if (result) {
      //如果入库成功
      ctx.body = {
        code: 0,
        msg: "",
        // 使用购物车id去做支付信息!
        // 返回这个购物车id,下次要获取购物车信息的时候拿着这个id来核对
        id: cartNo
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "fail"
      };
    }
  }
});

// 获取购物车信息
router.post("/getCart", async ctx => {
  let { id } = ctx.request.body;
  try {
    let result = await Cart.findOne({ cartNo: id });
    // 美团的购物车是新买一个就新建一个购物车
    // 天猫淘宝的是全部商品都放在一个购物车
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    };
  }
});
export default router;
