import mongoose from 'mongoose'

let Comment = new mongoose.Schema({
  // 评价人用户id
  UserId:{
    require: true,
    type: String
  },
  // 评价人姓名
  UserName:{
    require: true,
    type: String
  },
  // 商品id
  GoodId: {
    require: true,
    type: String
  },
  GoodName:{
    require: true,
    type: String
  },
  // 商品得分
  point:{
    require: true,
    type: Number
  },
  // 评价内容
  detail:{
    require: true,
    type: String
  },
  // 评价时间
  time:{
    require: true,
    type: String
  }
})

export default mongoose.model('Comment',Comment)
