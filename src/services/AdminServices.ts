import {
  IAdminCategory,
  IAdminEditCategory,
  IAdminEditProduct,
  ResponseObject,
} from "../interfaces/commonInterfaces";

import adminCategoryModel from "../models/auth/adminCategorySchema";
import adminProductsModel from "../models/AdminProductsSchema";

class AdminServices {
  private response!: ResponseObject;

  async addAdminCategory(data: IAdminCategory) {
    let isCategoryExist = await adminCategoryModel.findOne({
      category: data.category,
    });
    if (!isCategoryExist) {
      const addCategory = new adminCategoryModel(data);
      const result = await addCategory.save();
      this.response = {
        success: true,
        message: "Categori added",
        data: result,
      };
    } else {
      this.response = {
        success: false,
        message: "Categori already available",
      };
    }

    return this.response;
  }



  async getAllCategory() {
    let isAllCategoryExist = await adminCategoryModel.find(
      {},
      { category: 1, slug: 1, _id: 1 }
    );
    if (isAllCategoryExist) {
      this.response = {
        success: true,
        message: "all category fetched successfully",
        data: isAllCategoryExist,
      };
    } else {
      this.response = {
        success: false,
        message: "no cTEGORY AVAILLABE",
      };
    }
    return this.response;
  }


  async editCategory(data: IAdminEditCategory) {
    // const ID: ObjectId = data.id;
    if (data.id) {
      let categoryEdited = await adminCategoryModel.findOneAndUpdate(
        { _id: data.id },
        { $set: { category: data.cate, slug: data.slug } },
        { new: true }
      );
      this.response = {
        success: true,
        message: "Category edited successfully",
        data: categoryEdited,
      };
    } else {
      this.response = {
        success: false,
        message: "id is not received",
      };
    }

    return this.response;
  }


  async addProduct(data: any) {

    if (data) {
      const isProductExist = await adminProductsModel.findOne({
        name: data.name,
      });
      if (isProductExist) {
        this.response = {
          success: false,
          message: "Product is Already exist",
        };
      } else {
        const addedProduct = new adminProductsModel(data);
        const result = await addedProduct.save();
        this.response = {
          success: true,
          message: "Product Added Successfully",
          data: result,
        };
      }
    } else {
      this.response = {
        success: false,
        message: "data was not received",
      };
    }
    return this.response;
  }


  async getAllProducts() {
    let isAllProductsExist = await adminProductsModel.find(
      {},
      {
        name: 1,
        category: 1,
        image: 1,
        price: 1,
        description: 1,
        categoryId: 1,
      }
    );
    if (isAllProductsExist) {
      this.response = {
        success: true,
        message: "Your all products",
        data: isAllProductsExist,
      };
    } else {
      this.response = {
        success: false,
        message: "No Products Available",
      };
    }

    return this.response;
  }



  async deleteProduct(id: string) {

    if (id) {
      // const ID: ObjectId = id;
      let deletedProduct = await adminProductsModel.findByIdAndDelete(id);

      this.response = {
        success: true,
        message: "product deleted",
        data: deletedProduct,
      };
    } else {
      this.response = {
        success: false,
        message: "Id is not received",
      };
    }

    return this.response;
  }

  
  async editProduct(data: IAdminEditProduct) {

    if (data) {
      const { name, price, category, categoryId, image, description } = data;
      let editedProduct = await adminProductsModel.findByIdAndUpdate(
        { _id: data._id },
        {
          $set: {
            name: name,
            price: price,
            category: category,
            categoryId: categoryId,
            image: image,
            description: description,
          },
        }
      );
      if (editedProduct) {
        this.response = {
          success: true,
          message: "product is updated",
          data: editedProduct,
        };
      } else {
        this.response = {
          success: false,
          message: "product is not updated",
        };
      }
    } else {
      this.response = {
        success: false,
        message: "data is not received",
      };
    }

    return this.response;
  }
}
export default new AdminServices();
