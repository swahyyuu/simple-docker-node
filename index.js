const express = require("express");
const mongoose = require("mongoose");
const { 
  MONGO_PORT,
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_USER,
  SESSION_SECRET,
  REDIS_URL,
  REDIS_PORT
 } = require("./config/config");
const session = require("express-session");
const redis = require("ioredis");
const app = express();
const cors = require("cors");

let RedisStore = require("connect-redis")(session);

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const postRouter = require("./routes/postRoutes");
const userRouter = require('./routes/userRoutes');

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Succesfully connected to DB"))
  .catch((e) => {
    console.log(e),
    setTimeout(connectWithRetry, 1000)
  });  
};
connectWithRetry();

app.enable("trust proxy");
app.use(cors());
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000
    }
  }));

app.use(express.json());
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.get ("/api/v1", (req, res) => {
  res.send("<h1>Hello everyone, from Node app using docker compose in production server</h1>");
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}`));