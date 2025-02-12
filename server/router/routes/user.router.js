import express from 'express';
import { Protected } from '../../middlewares/authMiddleware.js';
import { changePassword, userGet } from '../../controllers/user.controller.js';

const router = express.Router()

router.route('/get').get(Protected, userGet)
router.route('/change-password').get(Protected, changePassword)




export default router