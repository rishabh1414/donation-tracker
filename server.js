const express = require("express");
const app = express();
const path = require("path");

const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

const homeRouter = require("./routes/homepage");
const userRouter = require("./routes/user");
require("./db");

require("dotenv").config();
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//*Session Config
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);
//*passport Config

const PassportInit = require("./config/passport");
PassportInit(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// * Global Middleware ----- --------_____----
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
// *Set Template Layout

app.set("view engine", "ejs");

// *Routes
app.use("/", homeRouter);
app.use("/", userRouter);
app.get("*", (req, res) => {
  res.redirect("/login");
});
// *Server

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
