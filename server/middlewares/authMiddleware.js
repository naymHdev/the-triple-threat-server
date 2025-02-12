import status from "http-status";
import { JWT_ACCESS_TOKEN } from "../config/env.config.js";
import UserModel from "../models/user.model.js";
import AsyncHandler from "../utils/catchAsync.js";
import { ErrorApi } from "../utils/errorResponse.js";
import { verifyToken } from "../utils/jwtToken.js";

export const Protected = AsyncHandler(async (req, res, next) => {
  try {
    const cookie = req.cookies.accessToken;
    const bearer =
      req.headers.authorization?.replace(/^Bearer\s+/i, "") || null;

    const token = bearer || cookie;

    if (!token) {
      throw new ErrorApi(
        status.UNAUTHORIZED,
        "Unauthorized: No token provided"
      );
    }

    const decoded = verifyToken(token, JWT_ACCESS_TOKEN);

    if (!decoded || !decoded.userId) {
      throw new ErrorApi(status.UNAUTHORIZED, "Unauthorized: Invalid token");
    }

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      throw new ErrorApi(status.UNAUTHORIZED, "Unauthorized: User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
});
