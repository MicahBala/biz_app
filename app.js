const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const path = require("path");

const app = express();

// implement cross origin resource sharing CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(helmet());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => res.send("Welcome"));
app.use("/", express.static(path.join(__dirname, "./docs")));
app.use(router);

app.use((req, res, next) => {
  const error = new Error("Route not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
