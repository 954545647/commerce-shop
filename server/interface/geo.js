import Router from "koa-router";
import axios from "./utils/axios";
import Province from "./../dbs/modules/province";
import City from "./../dbs/modules/city";
let router = new Router({
  prefix: "/geo"
});

const sign = "7a865613ffa5b62b06cabdc11b30b121";

// 根据后端提供的接口,得到当前省份和城市
router.get("/getPosition", async ctx => {
  let {
    status,
    data: { province, city }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      province,
      city
    };
  } else {
    ctx.body = {
      province: "",
      city: ""
    };
  }
});

// 获取城市省份
router.get("/province", async ctx => {
  // 数据库操作
  // let province = await Province.find();
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     };
  //   })
  // };

  // 线上接口
  let {
    status,
    data: { province }
  } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      code: 0,
      province
    };
  } else {
    ctx.body = {
      code: -1,
      province: ""
    };
  }
});

// 菜单接口
router.get("/menu", async ctx => {
  let {
    status,
    data: { menu }
  } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      menu
    };
  } else {
    ctx.body = {
      menu: []
    };
  }
});

// 城市id接口
router.get("/province/:id", async ctx => {
  // 数据库方式
  // let city = await City.findOne({ id: ctx.params.id });
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return { province: item.province, id: item.id, name: item.name };
  //   })
  // };

  // 接口形式
  let {
    status,
    data: { city }
  } = await axios.get(
    `http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`
  );
  if (status === 200) {
    ctx.body = {
      city
    };
  } else {
    ctx.body = {
      city: []
    };
  }
});

// city接口
router.get("/city", async ctx => {
  // 数据库形式
  // let result = await City.find();
  // let city = [];
  // result.forEach(item => {
  //   city = city.concat(item.value);
  // });
  // ctx.body = {
  //   code: 0,
  //   data: city
  // };
  // ctx.body = {
  //   code: 0,
  //   city: city.map(item => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
  //         ? item.province
  //         : item.name
  //     }
  //   })
  // }

  // 接口形式
  let {
    status,
    data: { city }
  } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      city
    };
  } else {
    ctx.body = {
      city: []
    };
  }
});

// 热门城市接口
router.get("/hotCity", async ctx => {
  // 本地数据库形式
  // let list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // let result = await City.find()
  // let nList = []
  // hots.filters((item,index)=>{
  //   item.name = list[index]
  // })
  // result.forEach(item => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })

  // 接口形式
  let {
    status,
    data: { hots }
  } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      hots
    };
  } else {
    ctx.body = {
      hots: ""
    };
  }
});

export default router;
