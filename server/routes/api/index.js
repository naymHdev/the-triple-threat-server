import express from 'express';
import authRouter from './authRoute.js';  // Ensure correct path for ES module

const router = express.Router();

router.use('/auth', authRouter);

export default router;
