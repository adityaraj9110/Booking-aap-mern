import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import createError from "../utils/error.js";


class roomController{
    static createRoom=async(req,res,next)=>{
        const hotelId=req.params.hotelId;
        const newRoom=new Room(req.body)
        
        try {
            console.log(hotelId)
            const savedRoom = await newRoom.save()
            
            try {
                await Hotel.findByIdAndUpdate(hotelId,{
                    $push:{rooms: savedRoom._id},
                });
                res.status(200).json(savedRoom)
            } catch (error) {
              next(error)  
            }
        } catch (error) {
            next(error)
        }

        
    }

    static updateRoom=async(req,res)=>{
        try {
            const updatedRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedRoom)
        } catch (error) {
            res.send(500).json("Could'nt be update")
        }
    }
    static updateRoomAvailability=async(req,res)=>{
        try {
            await Room.updateOne({'roomNumbers._id':req.params.id},
            {
                $push:{
                    "roomNumbers.$.unavailableDates": req.body.dates
                }
            })
        } catch (error) {
            res.send(500).json("Could'nt be update")
        }
    }

    static deleteRoom=async(req,res)=>{
        const hotelId=req.params.hotelId;
        try {
            await Room.findByIdAndDelete(req.params.id)
            try {
                await Hotel.findByIdAndUpdate(hotelId,{
                    $pull:{rooms:req.params.id}
                })
            } catch (error) {
                
            }
            res.status(200).json("Room has been Deleted")
        } catch (error) {
            res.send(500).json("Could'nt be update")
        }
    }

    static roomById=async(req,res)=>{
        try {
            const room=await Room.findById(req.params.id)
            res.status(200).json(room)
        } catch (error) {
            res.send(500).json("Could'nt be update")
        }
    }

    static getAllrooms=async(req,res,next)=>{
    
    
        try {
            const rooms=await Room.find()
            res.status(200).json(rooms)
        } catch (error) {
            next(error)
        }
        
    }
}
export default roomController