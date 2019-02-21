import mongoose from "mongoose";

let Province = new mongoose.Schema({
  id: {
    require: true,
    type: String
  },
  value: {
    require: true,
    type: Array
  }
});

export default mongoose.model('Province',Province)
