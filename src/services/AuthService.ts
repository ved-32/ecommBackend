import signUpModel from "../models/auth/signUpSchema";

import {
  ILogin,
  ISignUp,
  ResponseObject,
} from "../interfaces/commonInterfaces";

var jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const Key = process.env.SECRET_KEY;

class AuthServices {
  private response!: ResponseObject;

  //login service
  async login(data: ILogin) {
    const { email, password } = data;
    let isEmailExist = await signUpModel.findOne({ email: email });
    let isAdmin = isEmailExist?.isAdmin;
    const decryptedPassword = await bcrypt.compare(
      password,
      isEmailExist?.password
    );
    if(!decryptedPassword){
      this.response = {
        success: false,
        message: "password not matched",
      };
    }
    if (isEmailExist && decryptedPassword) {
      let token = jwt.sign({ email, isAdmin }, Key, { expiresIn: "8h" });
      this.response = {
        success: true,
        message: "login successfully",
        token,
        isAdmin,
        data: isEmailExist._id,
        user: isEmailExist,
      };
    } 

    return this.response;
  }

  //signup service
  async signup(data: ISignUp) {
    const { email } = data;
    let isUserExist = await signUpModel.findOne({ email: email });
    if (!isUserExist) {
      const { password, email, isAdmin } = data;
      const hassedPassword = await bcrypt.hash(password, 10);

      const signup = new signUpModel({ ...data, password: hassedPassword });
      const result = await signup.save();
      jwt.sign({ user: { email, isAdmin } }, Key, { expiresIn: "1h" });

      this.response = {
        success: true,
        message: "new user added",
        data: result,
      };
    } else {
      this.response = {
        success: false,
        message: "user already registerd",
      };
    }
    return this.response;
  }
}

export default new AuthServices();
