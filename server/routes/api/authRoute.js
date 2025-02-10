import express from 'express';
import { login } from '../../controllers/authController.js';  // Add the .js extension
 // Ensure correct path for ES module

const _ = express.Router();

_.post('/login', login);

export default _;
