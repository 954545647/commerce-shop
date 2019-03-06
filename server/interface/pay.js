const fs = require("fs");
const path = require("path");
const AlipaySdk = require("alipay-sdk").default;
const Orderform = require("./../dbs/modules/orderform");
const AlipayFormData = require("alipay-sdk/lib/form");
const Router = require("koa-router");
// const Order = require('../dbs/modules/order')
// const User = require('../dbs/modules/user')
import Order from "../dbs/modules/order";
import User from '../dbs/modules/user'
// let router = new Router({
//   prefix: "/order"
// });
const router = new Router()
const alipaySdk = new AlipaySdk({
  gateway: "https://openapi.alipaydev.com/gateway.do",
  appId: "2016092800615427",
  privateKey: fs.readFileSync(path.resolve(path.join(__dirname,'./private-key.pem')), "ascii"),
  alipayPublicKey: fs.readFileSync(path.resolve(path.join(__dirname,'./public-key.pem')), "ascii")
});
router.post("/pay", async (ctx, next) => {
  let req = ctx.request.body;
  const formData = new AlipayFormData();
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod("get");
  formData.addField("notifyUrl", "http://localhost:3000/pay-confirm");
  // // 支付完成跳转 returnUrl
  formData.addField("returnUrl", "http://localhost:3000/pay-confirm");
  formData.addField("bizContent", {
    // 最晚付款时限
    timeoutExpress: req.timeoutExpress,
    quitUrl: "http://localhost/pay-confirm",
    // 商户网站唯一订单号
    outTradeNo: req.orderId,
    // 销售产品码，商家和支付宝签约的产品码
    productCode: "FAST_INSTANT_TRADE_PAY",
    // 订单价格
    totalAmount: req.money.toString(),
    subject: "支付金额"
  });
  try {
    const result = await alipaySdk.exec(
      'alipay.trade.wap.pay', {}, {
        formData: formData
      },
    );
    ctx.body = result
  } catch (err) {
    console.log(err)
  }
});

router.get("/pay-confirm", async (ctx, next) => {
  // 对返回结果进行验签
  let payUp = alipaySdk.checkNotifySign(ctx.query);
  ctx.body = ctx.query
  let goodId = ctx.query.out_trade_no
  if(payUp){
    let userId =  ctx.session.passport.user
    let result = await Order.find({id: goodId})
    let data = await Order.where({
      id: goodId
    }).update({
      status: 1
    })
  }
  // if (payUp) {
  //   let result = await Orderform.updateOne(
  //     { $and: [{ orderid: ctx.query.out_trade_no }, { status: 1 }] },
  //     { status: 2 }
  //   );
  //   // 更新数据库失败
  //   if (!result.ok) {
  //     ctx.status = 500;
  //     return (ctx.body = "服务器错误");
  //   }
  //   支付完成重定向
  //   ctx.status = 301;
  //   return ctx.response.redirect("/");
  // }
  ctx.status = 301;
  return ctx.response.redirect("/order");
});

module.exports = router;
