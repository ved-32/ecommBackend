import mongoose from "mongoose";

import { ILogin } from "../../interfaces/commonInterfaces";

const loginSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  
});
const loginModel = mongoose.model<ILogin>("user", loginSchema);

export default loginModel;