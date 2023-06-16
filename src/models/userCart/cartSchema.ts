import mongoose from "mongoose";

export interface ICartProduct{
   ProductId:string
   userId:string
   quantity:number

}
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  quantity: { type: Number, require: true },
  product_Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  
});
const userCartModel = mongoose.model<ICartProduct>("userCart", cartSchema);

export default userCartModel;