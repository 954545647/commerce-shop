import mongoose from "mongoose";

let currentCity = new mongoose.Schema({
  name: {
    require: true,
    type: String
  }
});

export default mongoose.model("currentCity", currentCity);
