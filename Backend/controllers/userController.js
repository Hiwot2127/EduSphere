import configs from '../config/config.js';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import express from 'express';
import { BaseResponse } from '../helper/baseresponse.js';

const jwtSecret = configs.JWT_SECRET;
const maxAge = configs.AUTH_TOKEN_EXP_DAY ? parseInt(configs.AUTH_TOKEN_EXP_DAY) * 24 * 60 * 60 : 24 * 60 * 60;

export const createToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: maxAge
  });
};

const userAuthWithToken = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        const userByEmail = await User.findOne({ email }).lean().exec();
        if (userByEmail) {
            throw Error("That email is already registered");
        }

        const newUser = new User({ email, password, name });
        const user = await newUser.save();

        const cur_user = await User.findOne({ _id: user._id })
            .select('-__v -password -createdAt -updatedAt')
            .lean()
            .exec();

        let baseresponse = new BaseResponse();
        baseresponse.data = { data: cur_user };
        baseresponse.success = true;
        baseresponse.message = "User registration is successful";

        return res.status(201).json({ ...baseresponse }).end();
    } catch (error) {
        next(error);
    }
};

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
            .select('-__v -createdAt -updatedAt')
            .lean()
            .exec();

        if (!user) {
            throw Error("Invalid login credentials");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw Error("Invalid login credentials");
        }

        const token = createToken(user._id);

        let baseresponse = new BaseResponse();
        baseresponse.data = { data: { ...user } };
        baseresponse.success = true;
        baseresponse.message = "User login is successful";

        res.cookie('jwt', token, { sameSite: 'Lax', httpOnly: true, maxAge: maxAge * 1000, secure: false });

        res.status(200).json({ ...baseresponse, token });
    } catch (error) {
        next(error);
    }
};

export default { userAuthWithToken, loginUserController };
