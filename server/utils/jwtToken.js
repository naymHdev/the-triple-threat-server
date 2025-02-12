import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN, JWT_ACCESS_TOKEN_EXPIRY, JWT_REFRESH_TOKEN_EXPIRY } from "../config/env.config.js";

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, JWT_ACCESS_TOKEN, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, JWT_REFRESH_TOKEN_EXPIRY, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRY
  });
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
