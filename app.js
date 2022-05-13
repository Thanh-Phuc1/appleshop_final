require("dotenv").config();
const express = require("express");
const cors = require("cookie-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoURI = process.env.MONGO_DEV_URI;
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");
const { sendResponse } = require("./helpers/utils");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

/* DB Connection */
mongoose
  .connect(mongoURI)
  .then(() => console.log(`Database connected`))
  .catch((err) => console.log(err));

app.use("/", indexRouter);

app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.statusCode = 404;
  next(err);
});

/* Initialize Error Handling */
app.use((err, req, res, next) => {
  console.log("ERROR", err);
  if (err.isOperational) {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      err.errorType
    );
  } else {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      "Internal Server Error"
    );
  }
});

module.exports = app;
