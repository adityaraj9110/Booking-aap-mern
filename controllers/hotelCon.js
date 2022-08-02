import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

class hotelController{
    static createHotel=async(req,res)=>{
    
        const newHotel = new Hotel(req.body) 
        try {
            const savedHotel = await newHotel.save()
            res.status(200).json(savedHotel)
        } catch (error) {
            res.status(500).json(error)
        }
    
    }

    static updateHotel=async(req,res)=>{
        try {
            const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedHotel)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static deleteHotel=async(req,res)=>{
        try {
            await Hotel.findByIdAndDelete(req.params.id)
            res.status(200).json("Hotel has been Deleted")
        } catch (error) {
            res.status(500).json("Could'nt be update")
        }
    }

    static hotelById=async(req,res)=>{
        try {
            const hotel=await Hotel.findById(req.params.id)
            res.status(200).json(hotel)
        } catch (error) {
            console.log(error.messages)
            res.status(500).json("could'nt fetch data")
        }
    }

    static getAllHotel=async(req,res,next)=>{
    
        const {min,max,...others} = req.query
        try {
            const hotels=await Hotel.find({...others, cheapestPrice: {$gt:min ||1, $lt:max||5000} }).limit(req.query.limit)
            res.status(200).json(hotels)
        } catch (error) {
            next(error)
        }
        
    }
    static countbyCity=async(req,res,next)=>{
    
        const cities = req.query.cities.split(",")
    
        try {
            const list = await Promise.all(cities.map(city=>{
                return Hotel.countDocuments({city:city})
            }))
           
            res.status(200).json(list)
        } catch (error) {
            next(error)
        }
            
    }

    static countByType=async (req,res,next)=>{
    
        
        try {
            const hotelCount = await Hotel.countDocuments({ type: "hotel" });
            const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
            const resortCount = await Hotel.countDocuments({ type: "resorts" });
            const villaCount = await Hotel.countDocuments({ type: "villa" });
            const cabinCount = await Hotel.countDocuments({ type: "cabin" });
        
            res.status(200).json([
              { type: "hotel", count: hotelCount },
              { type: "apartments", count: apartmentCount },
              { type: "resorts", count: resortCount },
              { type: "villas", count: villaCount },
              { type: "cabins", count: cabinCount },
            ]);
          } catch (err) {
            next(err);
          }
        
        
    }

    static getHotelRooms= async (req,res,next)=>{
        try {
            const hotel =await Hotel.findById(req.params.id);
            console.log("Hotel is",hotel)
            const list =await Promise.all(hotel.rooms.map(room=>{
              return Room.findById(room)  
            }))
            res.status(200).json(list)
        } catch (error) {
            
        }
    }
}
export default hotelController;