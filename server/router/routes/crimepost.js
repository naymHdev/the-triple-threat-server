import express from "express";
import {
  getAllCrimes,
  getCrimeById,
  reportCrime,
} from "../../controllers/crimepost.controller.js";
import upload from "../../middlewares/multerMiddleware.js";

const router = express.Router();
router.post(
  "/report",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  reportCrime
);
router.get("/", getAllCrimes);
router.get("/:id", getCrimeById);
export default router;
