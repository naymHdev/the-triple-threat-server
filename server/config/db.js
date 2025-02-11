import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const DB_NAME = process.env.DATABASE_NAME;

const databaseUrl = `mongodb+srv://${process.env.DATABASE_USER}:nEkGeTRFJerYY14c@cluster0.xm8ksdz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

async function dbconfig() {
  try {
    await mongoose.connect(databaseUrl);
    console.log("Database connected");
  } catch (err) {
    console.log("Error connecting to the database:", err);
  }
}

export default dbconfig;
