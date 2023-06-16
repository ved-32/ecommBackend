import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IAddress {
  home: string;
  street: string;
  area: string;
  city: string;
  state: string;
  country: string;
  pin: string;
}

interface IUserAddress extends Document {
  _id: mongoose.Types.ObjectId;
  userId: ObjectId;
  address: IAddress[];
}

const addressSchema = new Schema<IAddress>({
  home: { type: String, required: true },
  street: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pin: { type: String, required: true },
});

const userAddressSchema = new Schema<IUserAddress>({
  _id: { type: Schema.Types.ObjectId },
  userId: {  type: Schema.Types.ObjectId,required:true},
  address:{type: [addressSchema]}
});

const UserAddressModel = mongoose.model<IUserAddress>("UserAddress", userAddressSchema);

export default UserAddressModel;
