import express from "express"

import roomController from "../controllers/roomCon.js"
import { verifyAdmin } from "../utils/verifyToken.js"


const route = express.Router()

route.post("/:hotelId",verifyAdmin,roomController.createRoom)
route.put("/:id",verifyAdmin,roomController.updateRoom)
route.put("/availability/:id",roomController.updateRoomAvailability)
route.delete("/:id/:hotelId",verifyAdmin,roomController.deleteRoom)
route.get("/:id",verifyAdmin,roomController.roomById)
route.get("/",verifyAdmin,roomController.getAllrooms)

export default route