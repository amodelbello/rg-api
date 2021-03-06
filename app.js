require("dotenv").load();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hush = require("docker-hush-hush");
const responseMiddleware = require("./middleware/response");

// Add docker secrets to env
// process.env = { ...process.env, ...hush.getAllSecrets() };
// Annoying we can't use above code. It's due to istanbul not being updated in 2 years
const secrets = hush.getAllSecrets();
process.env.JWT_SECRET = secrets.JWT_SECRET;
process.env.CORS_WHITELIST = secrets.CORS_WHITELIST;

const passport = require("passport");

require("./models/db");
require("./config/passport");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("json spaces", 2);

app.use(
  logger("dev", {
    skip: function(req, res) {
      // Remove clutter when running unit tests (port: 3001)
      return req.connection.localPort !== 3001;
    }
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(responseMiddleware.addBodyPropertyToResponse());
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch unauthorized errors
// app.use((err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401);
//     res.json({ "message": err.name + ": " + err.message });
//   }
// });

// error handler
app.use((err, req, res, next) => {
  let output = {};
  output.status = err.status || /* istanbul ignore next */ 500;
  output.message = err.message;

  /* istanbul ignore if  */
  if (req.app.get("env") === "development") {
    console.trace(err.stack);
  }

  // render the error page
  res.status(err.status || /* istanbul ignore next */ 500);
  res.json(output);
});

module.exports = app;
