import {
    User
} from "../models/user.js";
import bcrypt from "bcrypt";
import {
    sendCookie
} from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

// for login 

export const login = async (req, res) => {

    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new ErrorHandler("invalid Email or Password", 400));

        sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }

};

// for registering  

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;
        let user = await User.findOne({
            email
        });

        if (user) return next(new ErrorHandler("User Already Exist", 400));


        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        sendCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
};


// to get profile

export const getMyprofile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });
};


// to Logout

export const logout = (req, res) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        samesite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        user: req.user,
    });
};