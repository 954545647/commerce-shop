const AV=require("leanengine");
AV.initialize("NyCI3quSNxN0p21GTFEkdvDM-gzGzoHsz","jAUiOs0p0c2gBVgTGf1hsX1D")

app.get("/sendMesa.do",function(req,res){
  console.log(req.query);
 let phoneNumber=req.query.phoneNumber;
 AV.Cloud.requestSmsCode({
     mobilePhoneNumber:phoneNumber,
     name:'傻猪猪',//应用名称
     op:'傻猪猪注册验证',//某种操作
     tt1:1//分钟计算的有效性
 }).then(function(data){
     console.log("发送成功！");
     res.send("succeed!")
 },function(err){
     console.log(err);
     res.send("failed!")
 })
})
