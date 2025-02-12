import express from "express";
import {
  authLogin,
  authLogout,
  authRegister,
  refreshToken,
} from "../../controllers/auth.controller.js";
import { Protected } from "./../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(authRegister);
router.route("/login").post(authLogin);
router.route("/logout").get(Protected, authLogout);
router.route("/refresh-token").get(Protected, refreshToken);


export default router;
