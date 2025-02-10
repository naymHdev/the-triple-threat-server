import express from 'express';
import api from './api/index.js';  // Ensure correct path for ES module

const _ = express.Router();
const baseUrl = process.env.BASEURL ||  '/api/v1/';

_.use(baseUrl, api);

export default _;
