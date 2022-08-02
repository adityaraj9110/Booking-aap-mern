import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import express from 'express'
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import cookieParser from "cookie-parser"
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import path from "path"



const app = express()


// const PORT=process.env.PORT || 8800
const DB_URL=process.env.DB_URL


// Middlewares

app.use(cookieParser())
app.use(express.json())
// database connection
const dbConnect= async()=>{
    try {
        await mongoose.connect(DB_URL)
        console.log("Database connected")
        
    } catch (error) {
        console.log(error)
    }
}

// mongoose.connection.on("disconnected",()=>{
//     console.log("databse disconnected")
// })
// mongoose.connection.on("connected",()=>{
//     console.log("Databse connected")
// })



// Route middleware
app.use("/api/auth",authRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/users",usersRoute)
app.use("/api/rooms",roomsRoute)

app.use((err,req,res,next)=>{
    const errStatus=err.status || 500;
    const errMessage=err.message || "something went wrong"
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
        stack:err.stack
    })
})

// app.use(express.static(path.join(__dirname,"/Frontend/build")))
// app.get("*",(req,res)=>{
//     res.sendFile(path.json(__dirname, "/Frontend/build", "index.html"))
// })



// ,
//   "proxy": "http://localhost:8800/api"

if ( process.env.NODE_ENV == "production"){

    app.use(express.static("client/build"));

    // const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })


}

// Listening app
app.listen(process.env.PORT,()=>{
    dbConnect();
    console.log(`server listening at http://localhost:${PORT}` )
})