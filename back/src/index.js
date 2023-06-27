const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const { apiRouter } = require("./messages/messages.router");
const { notFoundHandler } = require("./middleware/not-found.middleware");

dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
  console.log("Mongoose connected");
});
const app = express();

app.use(express.json());
app.set("json spaces", 2);

app.use((req, res, next) => {
  res.contentType("application/json; charset=utf-8");
  next();
});

app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
    maxAge: 86400,
  })
);

app.use("/", apiRouter);

app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
