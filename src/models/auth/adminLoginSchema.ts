import mongoose from "mongoose";

const adminLoginSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean,default:true},
});
const adminLoginModel = mongoose.model("admin", adminLoginSchema);

export default adminLoginModel;
