import mongoose from "mongoose";

import adminProductsModel from "../models/AdminProductsSchema";
import signUpModel from "../models/auth/signUpSchema";
import userCartModel from "../models/userCart/cartSchema";
import userAddressModel from "../models/user-address/UserAddressSchema";

import { IAddToCart, IAllCartProducts, IUserAllProducts, IUserDetails, ResponseObject } from "../interfaces/commonInterfaces";








export interface IUserAddressFields {
  home: string;
  street: string;
  area: string;
  city: string;
  country: string;
  pin: number;
}
export interface IUserAddress {
  userId: string;
  userID?: string;
  address?: IUserAddressFields;
}

export interface IUserAddressDelete{
  addressId:string
  uid:string

}
class userServices {
  private response!: ResponseObject;

  async userAllProducts(data?: IUserAllProducts) {
    const { searchProduct, categoryId, page } : IUserAllProducts = data || {};
  
    if (
      typeof searchProduct !== "undefined" &&
      typeof categoryId !== "undefined"
    ) {
      const isProductFound = await adminProductsModel.find({
        categoryId: categoryId,
        name: searchProduct,
      });
      this.response = {
        success: true,
        message: "Products found",
        data: isProductFound,
      };
    } else if (
      typeof searchProduct !== "undefined" &&
      typeof categoryId === "undefined"
    ) {
      const isProductFound = await adminProductsModel.find({
        name: { $regex: searchProduct, $options: "i" },
      });

      this.response = {
        success: true,
        message: "Products found",
        data: isProductFound,
      };
    } else if (
      typeof categoryId !== "undefined" &&
      typeof searchProduct === "undefined"
    ) {
      const isProductFound = await adminProductsModel.find({
        categoryId: categoryId,
      });
      this.response = {
        success: true,
        message: "Products found filterd by",
        data: isProductFound,
      };
    } else {
      const Page:any = page || 1;
      const limit = 2;
      const offset = (Page - 1) * limit;
      const totalProducts = await adminProductsModel.find()
      const isProductFound = await adminProductsModel
        .find()
        .skip(offset)
        .limit(limit);

      this.response = {
        success: true,
        message: "Products found",
        data: isProductFound,
        totalProducts:totalProducts.length
      };
    }

    return this.response;
  }

  async addToCart(data:IAddToCart) {
    const { userId, product_Id, quantity } = data;
      try {
        const isUserAndProductExist = await userCartModel.findOne({ product_Id, userId })
        if (!isUserAndProductExist) {
          const data = await userCartModel.create({
            product_Id,
            userId,
            quantity,
          });
          this.response = {
            success: true,
            message: "added to cart created",
            data: data,
          };
        } 
        if(isUserAndProductExist){
            const data = await userCartModel.updateOne(
              { product_Id, userId },
              { $inc:{quantity:quantity} },
              { new:true }
            );
            this.response = {
              success: true,
              message: " cart updated",
              data: data,
            };
          }
        }
       catch (error) {
        this.response = {
          success: false,
          message: "cannot added to cart",
        };
        console.log(error);
      }

    return this.response;
  }

  async allCartProducts(data: IAllCartProducts) {
    const { userId, productId, quantity, removeId } = data;
    let ID = new mongoose.Types.ObjectId(userId);
    try {
      if (productId && quantity) {
        const updatedQuantityInCart = await userCartModel.updateOne(
          { product_Id: productId },
          { quantity: quantity}
        );
        this.response = {
          success: true,
          message: "quantity updated",
          data: updatedQuantityInCart,
        };
      }
      if (removeId) {
        const removedProduct = await userCartModel.deleteOne({
          product_Id: removeId,
          userId: userId,
        });
        if (removedProduct) {
          const removedProductfromCart = await adminProductsModel.findOne({
            product_Id: removeId,
          });

          this.response = {
            success: true,
            message: "Product removed successfully",
            data: removedProductfromCart,
          };
        }
      } else {
        this.response = {
          success: false,
          message: "Product not removed successfully",
        };
      }

      const products = await userCartModel.aggregate([
        {
          $match: {
            userId: ID,
          },
        },
        {
          $lookup: {
            from: "adminproducts",
            localField: "product_Id",
            foreignField: "_id",
            as: "item",
          },
        },
      ]);

      this.response = {
        success: true,
        message: "hello cart",
        data: products,
      };
    } catch (error) {
      throw new Error("Failed to aggregate products by user ID");
    }

    return this.response;
  }

  async userDetails(data: IUserDetails) {
    const { userId, userInfo } = data;
    if (userId) {
      const singleUser = await signUpModel.findOne({ _id: userId });
      if (singleUser) {
        this.response = {
          success: true,
          message: "Your your info",
          data: singleUser,
        };
      }
      if (userId && userInfo) {
        const { firstName, lastName, image, phone } = userInfo;
        const updatedProfile = await signUpModel.findOneAndUpdate(
          { _id: userId },
          {
            firstName: firstName,
            lastName: lastName,
            image: image,
            phone: phone,
          },
          { new: true }
        );
        if (updatedProfile) {
          this.response = {
            message: "userProfile Upadted successfully",
            success: true,
          };
        } else {
          this.response = {
            message: "userProfile not Upadted successfully",
            success: false,
          };
        }
      }
    } else {
      this.response = {
        success: false,
        message: "no user info",
      };
    }
    return this.response;
  }

  async userAddress(data: any) {
    const { userId, address, userID } = data;

    try {
      const ID = new mongoose.Types.ObjectId(userID);

      if (userID) {
        const isUserExist = await userAddressModel.findOne({ userId: ID });
        this.response = {
          success: true,
          message: "Found user address",
          data: isUserExist,
        };
      }
      const { home, street, area, city,state, country, pin } = address
      const id = new mongoose.Types.ObjectId(userId);

      const isUserExist = await userAddressModel.findOne({ userId: id });
      if (isUserExist) {
        const addAddressToSameUser = await userAddressModel.findOneAndUpdate(
          { userId },
          { $push: { address: { home, street, area, city,state, country, pin } } },
          { new: true }
        );
        this.response = {
          success: true,
          message: "address added successfully",
          data: addAddressToSameUser,
        };
      } else {
        const addAddress = await userAddressModel.create({
          userId,
          address: [{ home, street, area, city,state, country, pin }],
        });
        this.response = {
          success: false,
          message: "new address is added to new user",
          data: addAddress,
        };
      }
    } catch (err) {
      console.log(err);
    }

    return this.response;
  }

  async deleteUserAddress(params:any) {
  
    const { addressId, uid } = params
    const userID = uid;

    const isUserExist = await userAddressModel.findOne({ userId: userID });
   
    if (isUserExist) {
      const ID = new mongoose.Types.ObjectId(addressId);

      const remainingAddress = isUserExist.address.filter((ele: any) => {
        return !ele._id.equals(ID);
      });
   
      isUserExist.address = remainingAddress;

     await userAddressModel.findOneAndUpdate({ userId: userID },{$set: {address : remainingAddress}})
   
    }

    this.response = {
      success: true,
      message: "address deleted successfully",
    };

    return this.response;
  }
}
export default new userServices();
