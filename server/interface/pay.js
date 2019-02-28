const path = require("path");
const AlipaySdk = require("alipay-sdk").default;
const alipaySdk = new AlipaySdk({
  appId: "2016123456789012",
  privateKey: fs.readFileSync("./private-key.pem", "ascii"),
  alipayPublicKey: fs.readFileSync("./public-key.pem", "ascii")
});

var ali = new Alipay({
  appId: "2016092800615427",
  notifyUrl: "http://localhost:3000/pay",
  rsaPrivate: path.resolve("./private-key.pem"),
  rsaPublic: path.resolve("./public-key.pem"),
  sandbox: true,
  signType: "RSA"
});

// var params = ali.pagePay({
//   subject: "测试商品",
//   body: "测试商品描述",
//   outTradeId: 6666,
//   timeout: "10m", //支付超时时间
//   amount: "10.00",
//   goodsType: "0",
//   qrPayMode: 0
// });
// let ok = ali.signVerify(response);

// // 查询交易状态
// ali
//   .query({
//     outTradeId: outTradeId
//   })
//   .then(function(ret) {
//     console.log("***** ret.body=" + ret.body);

//     //签名校验
//     var ok = ali.signVerify(ret.json());
//   });

// // 查询对账账单下载地址
// ali
//   .billDownloadUrlQuery({
//     billType: "trade",
//     billDate: "2017-03"
//   })
//   .then(function(ret) {
//     console.log("***** ret.body=" + ret.body);
//   });

console.log(ali);
