import express from "express";
import { userController } from "./user.contoller.js";

const router = express.Router();

router.post("/create-user", userController.createUserIntoDB);

export const userRoutes = router;
