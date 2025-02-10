const express = require("express")
const _ = express.Router()
const {login} = require("../../controllers/authController.js") 

_.post("/login", login)

module.exports = _