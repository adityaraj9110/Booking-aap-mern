import express from "express"
import userController from "../controllers/userCon.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const route=express.Router();

route.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("Hello user you are logged in")
})
route.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("Hello user you are logged in and you can delete yyour accout")
})
route.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("Hello Admin you are logged in and you can delete all yyour accout")
})


route.put("/:id",verifyUser,userController.updateUser)
route.delete("/:id",verifyUser,userController.deleteUser)
route.get("/:id",verifyUser,userController.UserById)
route.get("/",verifyAdmin,userController.getAllUser)

export default route;