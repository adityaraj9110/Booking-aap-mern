import express from "express"
import authController from "../controllers/authCon.js";
const router = express.Router();

router.post("/",authController.register)
router.post("/login",authController.login)
router.get("/logout",authController.logout)


export default router