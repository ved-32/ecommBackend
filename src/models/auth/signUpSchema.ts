import mongoose from "mongoose";

import { ISignUp } from "../../interfaces/commonInterfaces";

const SignUpSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  phone: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, default: false },
  cnfrm_password: { type: String},
  image:{ type: String},
});
const signUpModel = mongoose.model<ISignUp>("signup", SignUpSchema);

export default signUpModel;
