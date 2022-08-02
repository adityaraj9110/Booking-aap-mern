import express from "express"

import hotelController from "../controllers/hotelCon.js"
import { verifyAdmin } from "../utils/verifyToken.js"
const router =express.Router()

// create
router.post("/",verifyAdmin,hotelController.createHotel)

// update

router.put("/:id",verifyAdmin,hotelController.updateHotel)

// Deleting

router.delete("/:id",verifyAdmin,hotelController.deleteHotel)

// Get by id

router.get("/find/:id",hotelController.hotelById)
// get all hotels

router.get("/",hotelController.getAllHotel)
router.get("/countByCity",hotelController.countbyCity)
router.get("/countByType",hotelController.countByType)
router.get("/room/:id",hotelController.getHotelRooms)



    export default router