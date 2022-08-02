import jwt from "jsonwebtoken";
import createError  from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("Token is",token)
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    // console.log(err)
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    console.log(user)
    next();
  });
};

export const verifyUser = (req, res, next) => {
    // console.log("enteing in verigy user")
  verifyToken(req, res,  () => {
    // console.log(req.user.id,"       ",req.params.id)
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
    // console.log("Entering in the check admin function")
  verifyToken(req, res,  () => {
    console.log(req.user.isAdmin)
    if (req.user.isAdmin) {
        
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};