import status from "http-status";
import { JWT_ACCESS_TOKEN } from "../config/env.config.js";
import UserModel from "../models/user.model.js";
import AsyncHandler from "../utils/catchAsync.js";
import { ErrorApi } from "../utils/errorResponse.js";

import { verifyToken } from "../utils/jwtToken.js";


export const Protected = AsyncHandler(async (req, res, next) => {
  try {
    const cookie = req.cookies.accessToken;
    const bearer = req.header.authorization.replace("bearer_", "");

    if (!cookie && !bearer)
      throw new ErrorApi(status.UNAUTHORIZED, "Unauthorized user");

    const decoded = verifyToken(cookie, JWT_ACCESS_TOKEN);
    if (!decoded || !decoded._id)
      throw new ErrorApi(status.UNAUTHORIZED, "Unauthorized user");

    const user = await UserModel.findById(decoded.userId);
    if (!user || !user._id)
      throw new ErrorApi(status.UNAUTHORIZED, "Unauthorized user");

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
});
