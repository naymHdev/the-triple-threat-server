import express from 'express';
import { Protected } from '../../middlewares/authMiddleware.js';
import { userGet } from '../../controllers/user.controller.js';

const router = express.Router()

router.route('/get').get(Protected, userGet)



export default router