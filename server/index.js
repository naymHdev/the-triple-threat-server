const path = require("path");
const express = require('express');
const dbconfig = require("./config/dbconfig.js");
require('dotenv').config();

const router = require("./routes");

var cors = require('cors');
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();


dbconfig();


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use(cors());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(router);


app.use(errorHandler);


app.listen(8000, () => {
    console.log("Server running on port 8000");
});