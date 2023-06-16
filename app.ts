require('dotenv').config()

import express,{Application} from "express";

import connectDB from "./src/db/connectdb";

import  authRoutes  from "./src/routes/AuthRoutes";
import adminRoutes from "./src/routes/AdminRoute";
import userRoutes from "./src/routes/userRoutes";

import "./src/models/auth/adminLoginSchema"
import "./src/models/auth/loginSchema"

var cors = require('cors')

const DATABASE_URL="mongodb+srv://ved:ved@cluster0.mdtcktr.mongodb.net/demo-project"
 const port =process.env.PORT ||5000

const app:Application=express()

app.use(cors())
app.use(express.json())
//db connection
connectDB(DATABASE_URL)


// auth routes
app.use("/api/v1/auth",authRoutes)

//admin routes
app.use("/api/v1/admin",adminRoutes)

//users routes
app.use("/api/v1/user",userRoutes)

app.listen(port,():void=>console.log(`server is running at ${port}`))
