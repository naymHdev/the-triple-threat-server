import path from "path";
import express from "express";
import dbconfig from "./config/db.js";
import dotenv from "dotenv"; // Change to `import`
import route from "./routes/index.js"; // Adjust import to ES module style
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js"; // Ensure ES module path

dotenv.config(); // Initialize dotenv

const app = express();

dbconfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(route);

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
