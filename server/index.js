import path from "path";
import express from "express";
import dbconfig from "./config/db.js";
import dotenv from "dotenv"; // Change to `import`
import route from "./routes/index.js"; // Adjust import to ES module style
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import router from "./routes/index.js";
// import errorHandler from "./middlewares/errorHandler.js"; // Ensure ES module path

dotenv.config(); // Initialize dotenv

const app = express();

dbconfig();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/v1', router);




const GetAcontroller = (req, res) => {
  res.send("Crime Reporting and Community Verification Platform Server");
};
app.get("/", GetAcontroller);

app.use(errorHandler);
app.use(notFound);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
