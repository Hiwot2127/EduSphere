import config from "../config/config.js";
import express from "express";
import jwt from "jsonwebtoken";
import { BaseResponse } from '../helper/baseresponse.js';
import User from '../models/userModel.js';

const jwtSecret = config.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
  try{
    // console.log(req.headers)
    console.log(req.cookies)
    let token = req.cookies.jwt
    let baseResponse = new BaseResponse();
    console.log(token)
    if (token) {
      jwt.verify(token, jwtSecret, async (err, decodedToken) => {
        if (err) {
          baseResponse.success = false;
          baseResponse.message = 'User not authenticated. The token sent is expired.';
          baseResponse.errors.push("User not authenticated. The token sent is expired.")
          return res.status(401).json({ ...baseResponse}).end();
        } else {
          console.log(decodedToken,"decodedToken")
          let user = await User.findById(decodedToken.id);
          if(!user){
            baseResponse.success = false;
            baseResponse.message = 'User not Found';
            baseResponse.errors.push("User not authenticated. The token sent is bad.")
            return res.status(401).json({...baseResponse}).end();
          }
          req.body.user = user;
          next();
        }
      });
    } else {
        baseResponse.success = false;
        baseResponse.message = 'Token not Found';
        baseResponse.errors.push("User not authenticated. The token sent is bad.");
        return res.status(401).json({ ...baseResponse}).end();
    }
  }
  catch (error) {
    next(error);
  }

};
const isInstructor = (req,res,next) => {
  try{
    if (req.body.user.role === 'instructor' || req.body.user.role === 'admin') {
      next();
    }
    else {
      let baseResponse = new BaseResponse();
      baseResponse.success = false;
      baseResponse.message = 'User does not have privilege!';
      baseResponse.errors.push("User not authorized to perform this action.")
      return res.status(401).json({ ...baseResponse}).end();
    }
  }
  catch (error) {
    next(error);
  }
}

export default {isAuthenticated,isInstructor};

