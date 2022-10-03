const bycrpt = require("bcrypt");
const passport = require("passport");
const homeController = require("./homeController");
const guest = require("../middlewares/guest");
const Creator = require("../models/creators");

const RegisterModel = require("../models/register");

module.exports = {
  postLogin(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      const { username } = req.body;

      if (err) {
        req.flash("error", info.message);
        req.flash("username", username);

        return next(err);
      }

      if (!user) {
        req.flash("error", info.message);
        req.flash("username", username);

        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          req.flash("error", info.message);
          req.flash("username", username);

          return next(err);
        }

        return res.redirect("/");
      });
    })(req, res, next);
  },
  async postRegister(req, res) {
    const { username, password, cpassword } = req.body;

    if (!username || !password || !cpassword) {
      req.flash("error", "All fields required");
      req.flash("username", username);
      return res.redirect("/register");
    }

    // * check username is exit

    RegisterModel.exists({ username: username }, (err, result) => {
      if (result) {
        req.flash("error", "Username already Exits !");
        req.flash("username", username);
        return res.redirect("/register");
      }
    });

    if (!(password === cpassword)) {
      req.flash("error", "password not match!");
      req.flash("username", username);
      return res.redirect("/register");
    }

    try {
      // * hash a password
      const hashedPassword = await bycrpt.hash(password, 10);

      // * Save a user to DataBase

      const register = new RegisterModel({
        username,
        password: hashedPassword,
        cpassword,
      });
      const registerData = await register.save();
      res.status(201).redirect("/login");
    } catch (err) {
      // res.status(401).json({ message: "Registration fail" });
      console.log(err);
    }
  },

  logout(req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  },
};
