const path = require("path");
import express, { Application, Request, Response, NextFunction } from "express";
const cors = require("cors");
const db = require("./config/database");
// const cookieParser = require("cookie-parser");
require("dotenv").config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

const User = require("./components/user/User");
const Profile = require("./components/profile/Profile");

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello");
});

const userRoutes = require("./components/user/UserRoutes");
const profileRoutes = require("./components/profile/ProfileRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);

db.sync({ force: true })
  .then((result: any) => {
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
