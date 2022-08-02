import User from "../models/User.js"

class userController{
   

    static updateUser=async(req,res)=>{
        try {
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json("Could'nt be update")
        }
    }

    static deleteUser=async(req,res)=>{
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been Deleted")
        } catch (error) {
            res.status(500).json("Could'nt be update")
        }
    }

    static UserById=async(req,res)=>{
        try {
            const User=await User.findById(req.params.id)
            res.status(200).json(User)
        } catch (error) {
            res.status(500).json("Could'nt be update")
        }
    }

    static getAllUser=async(req,res,next)=>{
    
    
        try {
            const Users=await User.find()
            res.status(200).json(Users)
        } catch (error) {
            next(error)
        }
        
    }
}
export default userController;