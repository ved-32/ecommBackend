import mongoose from "mongoose";

import { IAdminCategory } from "../../interfaces/commonInterfaces";

const adminCategorySchema = new mongoose.Schema({
  category: { type: String, require: true },
  slug: { type: String, require: true },
  
});
const adminCategoryModel = mongoose.model<IAdminCategory>("adminCategory", adminCategorySchema);

export default adminCategoryModel;