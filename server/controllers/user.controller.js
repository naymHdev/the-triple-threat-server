import { StatusCodes } from "http-status-codes";
import UserModel from "../models/user.model.js";
import { PasswordSchema } from "../schema/auth.schema.js";
import AsyncHandler from "../utils/catchAsync.js";
import sendRespone from "../utils/SendResponse.js";

export const userGet = AsyncHandler((req, res) => {
  try {
    const user = req.user;
    console.log(user);
    return sendRespone(res, {
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    throw error;
  }
});

export const changePassword = AsyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { password } = PasswordSchema.parse(req.body);
    const updateUser = await UserModel.findByIdAndUpdate(user.id, {
      password,
    });

    return sendRespone(res, {
      statusCode: StatusCodes.ok,
      message: "password changed succefully",
    });
  } catch (error) {
    throw error;
  }
});
