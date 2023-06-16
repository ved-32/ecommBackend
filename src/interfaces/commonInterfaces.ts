export interface ISignUp {
  firstName: String;
  lastName: String;
  phone: { type: String; require: true };
  email: String;
  password: String;
  cnfrm_password: String;
  isAdmin: Boolean;
  image:string
}

export interface ILogin {
  email: String;
  password: String;
}

export interface IAdminCategory {
  category: String;
  slug: String;
}

export declare interface ResponseObject {
  success: boolean;
  message: string;
  followStatus?: string;
  data?: unknown;
  token?: string;
  type?: string;
  isAdmin?:Boolean
  userId?:string,
  user?:any
  totalProducts?:number
 
}

export interface IAdminEditCategory{
  id:string
  cate:string
  slug:string
 }

 export interface IAdminEditProduct{
  name:string
  price:string|number
  _id:string
  image:string
  description:string
  category:string
  categoryId:string
 }


 export interface IUserAllProducts {
  searchProduct?: string;
  categoryId?: string;
  page?: string;
}


export interface IAddToCart {
  userId: string;
  product_Id: string;
  quantity: string;
}


export interface IAllCartProducts {
  userId: string;
  productId: string;
  quantity: string;
  removeId?: string;
}


export interface IUserDetailsFields {
  firstName?: string;
  lastName?: string;
  image?: string;
  phone?: number;
}
export interface IUserDetails {
  userId: string;
  userInfo?: IUserDetailsFields;
}
