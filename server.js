"use strict";

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const flash = require('connect-flash');
const flashMessages = require('./middleware/messaggi');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const PORT = 3000;
const app = express();

app.use(morgan("dev"));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "chiave-super-segreta",
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(flashMessages);
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
