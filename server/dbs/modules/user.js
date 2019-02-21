// 用户模型
import mongoose from 'mongoose'
const Schema = mongoose.Schema

// 创建 User模型
const UserSchema = new Schema({
  username:{
    type:String,
    unique:true,  //唯一的
    require:true
  },
  password:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  }
})

// 第一个参数是可以起的别名User
export default mongoose.model('User',UserSchema);
