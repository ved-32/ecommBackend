import express from "express";

import HandleErrors from "../middlewares/HandleErrors";
import { verifyUserToken } from "../middlewares/verifyTokenMiddleware";

import { AddToCart, AllProductsForUsers, CartProducts, DeleteUserAddress, UserAddress, UserDetails} from "../controllers/UsersController";
;


const userRoutes=express.Router()



userRoutes.post("/users-all-products",HandleErrors(AllProductsForUsers))
userRoutes.post("/add-to-cart",verifyUserToken,HandleErrors(AddToCart))
userRoutes.post("/cart-products",HandleErrors(CartProducts))
userRoutes.post("/user-details",verifyUserToken,HandleErrors(UserDetails))
userRoutes.post("/user-address",HandleErrors(UserAddress))
userRoutes.delete("/delete-address/:uid/:addressId",HandleErrors(DeleteUserAddress))

export default userRoutes