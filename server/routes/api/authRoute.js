import express from "express";
import { login } from "../../controllers/authController.js"; // Add the .js extension for ES module

const authRouter = express.Router();

authRouter.post("/login", login);

export default authRouter;
