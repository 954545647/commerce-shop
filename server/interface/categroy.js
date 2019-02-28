import Router from "koa-router";
import axios from "./utils/axios";
import sign from "./utils/sign";
import Province from "../dbs/modules/province";
import Categroy from "../dbs/modules/categroy";

let router = new Router({
  prefix: "/categroy"
});

router.get("/crumbs", async ctx => {
  //数据库操作
  // let city = ctx.query.city
  // console.log(city)
  // let result = await Categroy.findOne({
  //   city: city || "北京"
  // });
  // let result = await Categroy.find();
  // if (result) {
  //   ctx.body = {
  //     areas: result.areas,
  //     types: result.types
  //   };
  // } else {
  //   ctx.body = {
  //     areas: [],
  //     types: []
  //   };
  // }

  // 接口请求
  let city = ctx.query.city;
  let {
    status,
    data: { areas, types }
  } = await axios.get(`http://cp-tools.cn/categroy/crumbs`, {
    params: {
      city: city || "广州",
      sign
    }
  });
  if (status === 200) {
    ctx.body = {
      areas: areas,
      types: types
    };
  } else {
    ctx.body = {
      areas: areas,
      types: types
    };
  }

});

export default router;
