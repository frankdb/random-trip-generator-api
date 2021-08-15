import express, { Application } from "express";
const cors = require("cors");
const db = require("./config/database");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
const cookieParser = require("cookie-parser");
const User = require("./components/user/User");
const Profile = require("./components/profile/Profile");
require("dotenv").config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require("./components/user/UserRoutes");
const profileRoutes = require("./components/profile/ProfileRoutes");

User.hasOne(Profile);
Profile.belongsTo(User);

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("error", function (err: any) {
  console.log("Could not establish a connection with redis. " + err);
});

redisClient.on("connect", function (err: any) {
  console.log("Connected to redis successfully");
});

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   // Pass to next layer of middleware
//   next();
// });

app.use(cookieParser());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 1, // session max age in miliseconds
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);

db.sync()
  // .sync({ force: true })
  .then((result: any) => {
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
