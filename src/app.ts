const path = require("path");
import express, { Application, Request, Response, NextFunction } from "express";
const cors = require("cors");
const db = require("./config/database");
require("dotenv").config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

const User = require("./components/user/User");

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello");
});

// const userRoutes = require("./components/user/UserRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/api/user", userRoutes);

db.sync({ force: true })
  .then((result: any) => {
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
