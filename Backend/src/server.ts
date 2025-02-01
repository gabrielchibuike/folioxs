import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userAuth from "./Routes/UserRoute";
import templates from "./Routes/TemplateRoutes";
import Templates from "./model/Templates";
import UserDetails from "./model/UserModel";
import { verifyToken } from "./utils/verifyJwt";

const app = express();

dotenv.config();

// connetion to database
mongoose
  .connect(
    (process.env.DB_CONNECTION as string) || "mongodb://localhost:27017/foliox"
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("src/uploads"));

app.use("/api", userAuth);
app.use("/api", templates);

app.listen(process.env.PORT || 5000, async () => {
  try {
    console.log("server is running on port " + process.env.PORT);
  } catch (err) {
    console.log(err);
  }
});
