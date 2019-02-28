import mongoose from 'mongoose'
let Cart = new mongoose.Schema({
  id:{
    type:String,
    require:true
  },
  // 商品详情(名称,单价)
  detail:{
    type:Array,
    require: true
  },
  // 购物车id
  cartNo:{
    type:String,
    require: true,
  },
  // 用户和购物车关联
  user:{
    type: String,
    require: true
  },
  // 购物车创建时间
  time:{
    type: String,
    require: true
  }
})

export default mongoose.model('Cart',Cart)
