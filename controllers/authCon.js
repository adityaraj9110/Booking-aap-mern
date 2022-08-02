import User from "../models/User.js";
import bcrypt from "bcrypt";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";

class authController {
  static register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hashPass,
      isAdmin: req.body.isAdmin,
    });
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      next(error);
    }
  };

  static login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });

      console.log(user);
      if (!user) {
        return res.send(createError(404, "user or password is incorrect!"));

        // return res.status(404).json("user not found")
      }
      const isPassCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(isPassCorrect);

      if (!isPassCorrect) {
        console.log("Enter ispassIncrrot");
        return res.send(createError(404, "user or password is incorrect!"));
      }

      // using jwt for user Role authentication

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_TOKEN
      );

      // console.log(token)

      const { password, isAdmin, ...otherDetails } = user._doc;
      
      res.cookie("accessToken",token)
      res.status(200).json({ details: { ...otherDetails }, isAdmin });
      console.log(req.cookies.accessToken)
    } catch (error) {
      next(error);
    }
  };

  static logout = async (req,res)=>{
    
      // Set token to none and expire after 5 seconds
      // res.cookie('token', 'none', {
      //     expires: new Date(Date.now() + 5 * 1000),
      //     httpOnly: true,
      // })

      res.clearCookie("accessToken")
          .status(200)
          .json({ success: true, message: 'User logged out successfully' })
  
  }
}
export default authController;
