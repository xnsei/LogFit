import connectDB from "./dbConnection";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req: any, res: any) => {
  res.json({ message: "Hello World!!!" });
});

app.listen(8000, () => {
  console.log("server is running on port: 8000");
});
