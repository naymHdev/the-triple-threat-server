import { Router } from "express";
import { userRoutes } from "../models/User/user.route.js";
// Ensure extension matches the file type

const router = Router();

const moduleRotes = [
  {
    path: "/users",
    route: userRoutes,
  },
];

moduleRotes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
