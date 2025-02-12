import express from "express";
import {
  authLogin,
  authLogout,
  authRegister,
} from "../../controllers/auth.controller.js";
import { Protected } from "./../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(authRegister);
router.route("/login").post(authLogin);
router.route("logout").get(Protected, authLogout);

export default router;
