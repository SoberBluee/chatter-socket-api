var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/api");

// Import the functions you need from the SDKs you need
var firebase = require("firebase/app");
// var analytics = require("firebase/analytics");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx0TaQHmWWUUtaw_Fba3b1btncXbHSkno",
  authDomain: "chatter-message-server.firebaseapp.com",
  databaseURL:
    "https://chatter-message-server-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatter-message-server",
  storageBucket: "chatter-message-server.appspot.com",
  messagingSenderId: "124089620228",
  appId: "1:124089620228:web:450c7d5615aab80e6b2251",
  measurementId: "G-FXZLRB2NPW",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseAnalytics = analytics.getAnalytics(firebaseApp);

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/1.0", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

/**
 * User logs onto their account
 * Goes to a user they want to talk to
 * All their messages are stored in the database so use will be able to see their messages
 * When user opens their chat log, first all messages are retrieved from the database
 * through the media server.
 * Once messages are returned and displayed to the user
 * Another request is made to establish a a socket connection with that user
 * In that request, it will contain
 *  sender userId
 *  recieved userId
 *  More information may be needed
 *
 */
