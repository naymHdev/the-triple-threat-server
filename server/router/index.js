import { Router } from "express";
import userRouter from './routes/user.router.js'
import adminRouter from "./routes/admin.router.js";
import commentRouter from "./routes/comment.router.js";
import crimeRouter from "./routes/crimeReport.router.js";
import mediaRouter from "./routes/media.router.js";
import voteRouter from "./routes/vote.router.js";

// Ensure extension matches the file type

const router = Router();

const moduleRotes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/admin",
    route: adminRouter,
  },
  {
    path: "/users",
    route: commentRouter,
  },
  {
    path: "/crime-report",
    route: crimeRouter,
  },
  {
    path: "/media",
    route: mediaRouter,
  },
  {
    path: "/vote",
    route: voteRouter,
  },
];

moduleRotes.forEach((routes) => {
  router.use(routes.path, routes.route);
});

export default router;
