const express = require("express");
const router = express.Router();
const bycrpt = require("bcrypt");
const passport = require("passport");
const homeController = require("./homeController");
const guest = require("../middlewares/guest");
const Creator = require("../models/creators");

const RegisterModel = require("../models/register");

module.exports = {
  async homepage(req, res) {
    try {
      const creator = await Creator.find();

      res.render("homepage", { creator: creator });
    } catch (err) {
      res.redirect("/homepage");
    }
  },
  login(req, res) {
    res.render("login");
  },
  register(req, res) {
    res.render("register");
  },
};
