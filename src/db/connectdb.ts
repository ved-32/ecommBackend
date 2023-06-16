import mongoose from "mongoose";

const connectDB=async (DATABASE_URL:string)=>{
    try{
 let res= await mongoose.connect(DATABASE_URL)
 console.log("connection successful")
    }
    catch(err){
    console.log(err)
    }

}
export default connectDB