import cors from "cors";
import dotenv from "dotenv"; // Change to `import`
import express from "express";
import dbconfig from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import router from "./router/index.js";
// import errorHandler from "./middlewares/errorHandler.js"; // Ensure ES module path

dotenv.config(); // Initialize dotenv
const PORT = process.env.PORT | 8080; // Server port

const app = express();

dbconfig();

app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(express.json({ limit: "10mb" })); // app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); // body parser

app.use("/api/v1", router);

const GetAcontroller = (req, res) => {
  res.send("Crime Reporting and Community Verification Platform Server");
};
app.get("/", GetAcontroller);

app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
