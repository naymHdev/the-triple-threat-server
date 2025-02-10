import express from "express";
import api from "./api/index.js"; // Ensure correct path for ES module

const apiRouter = express.Router();
const baseUrl = process.env.BASEURL || "/api/v1/";

apiRouter.use(baseUrl, api);

export default apiRouter;
