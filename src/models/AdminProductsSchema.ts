import mongoose from "mongoose";


export interface IAddProduct{
   category:string
   categoryId:string
   name:string
   price:number
   description:string 
}
const adminAddProductsSchema = new mongoose.Schema({
  category: { type: String, require: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: { type: String, require: true },
  image: { type: String, require: true },
  price: { type: Number, require: true },
  description: { type: String, require: true },
  
});
const adminProductsModel = mongoose.model<IAddProduct>("adminProducts", adminAddProductsSchema);

export default adminProductsModel;