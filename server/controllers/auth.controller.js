import { z } from "zod";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import AsyncHandler from "../utils/catchAsync";
import UserModel from "./../models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./../utils/generateToken";
import sendRespone from "./../utils/SendResponse.js";

export const authRegister = AsyncHandler(async (req, res) => {
  try {
    const { email, phoneNumber, password, role } = RegisterSchema.parse(
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
        message: "Email or phone number already exists.",
      });

    const newUser = await UserModel.create({
      email,
      phoneNumber,
      password,
      role,
    });

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return sendRespone(res, {
      message: "User registered successfully",
      data: {
        id: newUser.id,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.phoneNumber,
        accessToken,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) throw new Error(error);
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
        message: "invalid credentials",
      });

    const isValidPassword = await user.matchPassword(password);
    if (!isValidPassword)
      return sendRespone(res, {
        message: "invalid credentials",
      });

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return sendRespone(res, {
      message: "User registered successfully",
      data: {
        id: newUser.id,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.phoneNumber,
        accessToken,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) throw new Error(error);
    throw error;
  }
});

export const authLogout = AsyncHandler((req, res) => {
  try {
  } catch (error) {
    throw error;
  }
});


export const refreshToken = AsyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw error;
    }
})