import Router from "koa-router";
import axios from "./utils/axios";
import md5 from "crypto-js/md5";
import Order from "../dbs/modules/order";
import User from "../dbs/modules/user";
import Comment from "../dbs/modules/comment";

let router = new Router({
  prefix: "/comment"
});

// 写评论
router.get("/writeComment", async ctx => {
  let res = ctx.query;
  let UserId = ctx.session.passport.user;
  let UserName = res.UserName;
  let GoodId = res.GoodId;
  let point = res.point;
  let detail = res.detail;
  let time = res.time;
  let GoodName = res.GoodName;
  let newComment = new Comment({
    UserId,
    UserName,
    GoodName,
    GoodId,
    point,
    detail,
    time
  });
  try {
    let result = await newComment.save();
    if (result) {
      ctx.body = {
        code: 0
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "can not comment"
      };
    }
  } catch (error) {
    ctx.body = {
      code: -1
    };
  }
  ctx.body = {
    code: 0
  };
});


// 获取评论
router.get('/getComment', async ctx=>{
  let GoodName = ctx.query.GoodName
  let result = await Comment.find({
    GoodName : GoodName
  })
  console.log(result,'这是在服务端打印的数据')
  if(result){
    ctx.body={
      comment: result
    }
  }
})
export default router;
