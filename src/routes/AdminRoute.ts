import express from "express";

import { addAdminCategory, addProduct, deleteProduct, editCategory, editProduct, getAllCategory, getAllProducts } from "../controllers/AdminController";

import HandleErrors from "../middlewares/HandleErrors";
import { verfyAdminToken } from "../middlewares/verifyTokenMiddleware";

import validateCategory from "../validation/validateCategory";




const adminRoutes=express.Router()



adminRoutes.post("/add-category",validateCategory,verfyAdminToken,HandleErrors(addAdminCategory))
adminRoutes.get("/get-all-category",HandleErrors(getAllCategory))
// adminRoutes.put("/edit-category",validateCategory,verfyAdminToken,HandleErrors(editCategory))
adminRoutes.put("/edit-category",HandleErrors(editCategory))
adminRoutes.post("/add-product",HandleErrors(addProduct))
// adminRoutes.post("/add-product",validateAdminAddProduct,verfyAdminToken,HandleErrors(addProduct))
adminRoutes.get("/get-all-products",verfyAdminToken,HandleErrors(getAllProducts))
adminRoutes.delete("/delete-product/:id",verfyAdminToken,HandleErrors(deleteProduct))
adminRoutes.put("/edit-product",verfyAdminToken,HandleErrors(editProduct))





export default adminRoutes