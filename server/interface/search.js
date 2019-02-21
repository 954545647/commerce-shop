import Router from "koa-router";
import axios from "./utils/axios";
import Poi from './../dbs/modules/poi'
let router = new Router({
  prefix: "/search"
});
const sign = "7a865613ffa5b62b06cabdc11b30b121";

// 推荐接口
router.get("/top", async ctx => {
  // 接口的方式
  let {
    status,
    data: { top }
  } = await axios.get(`http://cp-tools.cn/search/top`, {
    // 参数可以使用?${params}也可以使用对象的形式
    params: {
      input: ctx.query.input, //用户搜索的内容
      city: ctx.query.city,
      sign
    }
  });
  if(status===200){
    ctx.body={
      top
    }
  }else{
    ctx.body={
      top:''
    }
  }
});


// 热门地点接口
router.get('/hotPlace', async ctx=>{
  // vuex是服务端和客户端共享的!!
  let city = ctx.store?ctx.store.state.geo.position.city:ctx.query.city
  let {status,data:{result}} = await axios.get(`http://cp-tools.cn/search/hotPlace`,{
    params:{
      city,
      sign
    }
  })
  ctx.body={
    result:status==200?result:[]
  }
})


// 有格调数据接口
router.get('/resultsByKeywords',async ctx=>{
  let {
    status,
    data:{count,pois}
  } = await axios.get('http://cp-tools.cn/search/resultsByKeywords',{
    params:{
      city: ctx.query.city,
      keyword: ctx.query.keyword,
      sign
    }
  })
  ctx.body= {
    count: status==200?count:'',
    pois: status==200?pois:[]
  }
})
export default router
