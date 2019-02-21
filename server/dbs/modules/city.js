import mongoose from 'mongoose'

let City = new mongoose.Schema({
  id:{
    require: true,
    type: String
  },
  value:{
    require: true,
    type: Array
  }
})

export default mongoose.model('City',City)
