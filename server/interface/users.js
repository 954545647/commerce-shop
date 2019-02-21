import Router from "koa-router";
// koa-redis可以关联短信和用户
import Redis from "koa-redis";
// 用自己的邮箱给别人的邮箱发邮件
import nodeMailer from "nodemailer";
import Email from "../dbs/config";
import User from "../dbs/modules/user";
import Passport from "./utils/passport";
import axios from "./utils/axios";
import passport from 'passport'
import AV from "leanengine";
// 设置users接口的路由前缀
let router = new Router({
  prefix: "/users"
});
// 设置本地的Redis客户端
let Store = new Redis().client;

// 注册接口
router.post('/signup', async (ctx) => {
  const {username, password, email, code} = ctx.request.body;

  if (code) {
    // 获取Redis中的session
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  // 判断是否存在相同用户
  let user = await User.find({username})
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  // 注册新用户
  let nuser = await User.create({username, password, email})
  if (nuser) {
    // 注册成功的话就调用登录接口
    let res = await axios.post('/users/signin', {username, password})
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

// 登录接口
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

// 确认接口
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  // 当我们第一次点击的时候,获取到的saveExpire是null
  // if语句不执行,然后到下面发送邮件,就会自动保存一个过期时间(当前时间+1分钟)
  // 为了防止用户多次点击: 如果当前时间在一分钟之内再次点击会提醒操作频繁
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  let transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '浩佳给您发邮件了',
    html: `您的验证码是${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
      // 进行批量写入 hmset
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})

router.post('/getNumber',async(ctx)=>{
  let number = ctx.request.body.phoneNumber
  if(number){
    AV.initialize("NyCI3quSNxN0p21GTFEkdvDM-gzGzoHsz","jAUiOs0p0c2gBVgTGf1hsX1D")
    AV.Cloud.requestSmsCode({
      mobilePhoneNumber:number,
      name:'傻猪猪',//应用名称
      op:'傻猪猪注册验证',//某种操作
      tt1:1//分钟计算的有效性
    })
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }else{
    ctx.body = {
      code: -1,
      msg: '请填写验证码1'
    }
  }
})

router.get('/exit', async (ctx, next) => {
  // 退出登录
  await ctx.logout()
  // 二次验证是否是登录状态
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户信息接口
router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {username, email} = ctx.session.passport.user
    ctx.body={
      user:username,
      email
    }
  }else{
    ctx.body={
      user:'',
      email:''
    }
  }
})



export default router;

// app.get('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });
