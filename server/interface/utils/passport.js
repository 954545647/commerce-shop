import passport from 'koa-passport'        //passport基于koa封装的库
import LocalStrategy from 'passport-local' //引入本地策略

import UserModel from './../../dbs/modules/user'

// 设置本地策略
passport.use(new LocalStrategy(async function(username,password,done){
  let where = {
    username
  };
  // 使用模型进行查找 根据姓名到数据库查找到数据
  let result = await UserModel.findOne(where)
  if(result!=null){
    if(result.password === password){
      return done(null,result)
    }else{
      return done(null,false,'密码错误')
    }
  }else{
    return done(null,false,'用户不存在')
  }
}))

// 序列化
// 让用户每次进来自动通过session验证,并保存到session
// 将经过身份验证的用户序列化到会话中
passport.serializeUser(function(user,done){
  done(null,user)
})

// 反序列化
// 每次请求都会从session中读取用户数据
passport.deserializeUser(function(user,done){
  return done(null,user)
})

export default passport







// 本地身份验证的验证回调接受username和password 参数，这些参数通过登录表单提交给应用程序。

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }

// 登录表单通过该POST方法提交给服务器。使用 authenticate()与local战略将处理登录请求。
// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );


//Passport公开了一个login()函数req（也称为别名logIn()），可用于建立登录会话。

// req.login(user, function(err) {
//   if (err) { return next(err); }
//   return res.redirect('/users/' + req.user.username);
// });
// 登录操作完成后，user将分配给req.user。
