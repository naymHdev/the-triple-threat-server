import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema.js";
import AsyncHandler from "../utils/catchAsync.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwtToken.js";
import UserModel from "./../models/user.model.js";
import sendRespone from "./../utils/SendResponse.js";
import { ErrorApi } from "../utils/errorResponse.js";
import { JWT_REFRESH_TOKEN } from "../config/env.config.js";

const accessCookiesOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  maxAge: 15 * 1000, // 15min
};

const refreshCookiesOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const authRegister = AsyncHandler(async (req, res) => {
  try {
    const user = await UserModel.deleteMany()
    const { name, email, phoneNumber, password, role } = RegisterSchema.parse(
      req.body
    );

    const existingUser = await UserModel.findOne({
      $or: [
        { email },
        {
          phoneNumber,
        },
      ],
    });

    if (existingUser)
      return sendRespone(res, {
    statusCode: StatusCodes.CONFLICT,
    message: "Email or phone number already exists.",
  });
  
  const newUser = await UserModel.create({
    name,
    email,
    phoneNumber,
    password,
    role,
  });
  
    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    res.cookie("accessToken", accessToken, accessCookiesOption);

    res.cookie("refreshToken", refreshToken, refreshCookiesOption);

    return sendRespone(res, {
      message: "User registered successfully",
      statusCode: StatusCodes.OK,
      data: {
        id: newUser.id,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.phoneNumber,
        accessToken,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) throw new ErrorApi(StatusCodes.FORBIDDEN , error.message);
    throw error;
  }
});

export const authLogin = AsyncHandler(async (req, res) => {
  try {
    const { identifier, password } = LoginSchema.parse(req.body);
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });

    if (!user)
      return sendRespone(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "invalid credentials",
      });

    const isValidPassword = await user.matchPassword(password);
    if (!isValidPassword)
      return sendRespone(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "invalid credentials",
      });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("accessToken", accessToken);

    res.cookie("refreshToken", refreshToken);


    return sendRespone(res, {
      message: "User login successfully",
      statusCode: StatusCodes.OK,
      data: {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.phoneNumber,
        accessToken,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) throw new Error(error);
    throw error;
  }
});

export const authLogout = AsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const removeToken = await UserModel.findByIdAndUpdate(userId, {
      refreshToken: "",
    });

    if (!removeToken || !refreshToken._id)
      throw new ErrorApi(StatusCodes.FORBIDDEN, "Server side error");

    cookie.clearCookie("accessToken",accessCookiesOption);
    cookie.clearCookie("refreshToken", );

    return sendRespone(res, {
      message: "logout successfully",
    });
  } catch (error) {
    throw error;
  }
});

export const refreshToken = AsyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return sendRespone(res, {
        statusCode: StatusCodes.FORBIDDEN,
        message: "Refresh token is missing",
      });

    const decoded = verifyToken(refreshToken, JWT_REFRESH_TOKEN);

    const user = await UserModel.findById(decoded.id);
    if (!user)
      return sendRespone(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "User not found",
      });

    // Generate a new access token
    const newAccessToken = generateAccessToken(user.id);

    res.cookie("accessToken", newAccessToken, accessCookiesOption);

    return sendRespone(res, {
      message: "Access token refreshed successfully",
      statusCode: StatusCodes.OK,
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    return sendRespone(res, {
      statusCode: StatusCodes.FORBIDDEN,
      message: "Invalid or expired refresh token",
    });
  }
});