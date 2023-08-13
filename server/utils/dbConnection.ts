import dotenv from "dotenv";
const mongoose = require("mongoose");

dotenv.config();

export default async function connectDB() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Database connection successfully established!!");
  } catch (error) {
    console.log("Database connection failed : ", error);
  }
}
