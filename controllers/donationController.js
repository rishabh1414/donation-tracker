const express = require("express");
const router = express.Router();
const Creator = require("../models/creators");
const Donation = require("../models/donation");
const moment = require("moment");

module.exports = {
  async allOrder(req, res) {
    try {
      const donation = await Donation.find({ userId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      console.log(donation);
      res.render("user/all-donation", { donation: donation, moment: moment });
    } catch (err) {
      res.send(err);
    }
  },
  async donateScreen(req, res) {
    try {
      const creator = await Creator.findById(req.params.id);

      if (creator === null) res.redirect("/");

      res.render("user/donation", { creator: creator });
    } catch (err) {
      res.render("homepage");
    }
  },

  //* Post Dontion Details----------

  async postDonateScreen(req, res) {
    try {
      const { amount, inputUser, comment } = req.body;
      const creator = await Creator.findById(req.params.id);

      const donation = new Donation({
        userId: req.user._id,
        creatorId: creator._id,
        userName: req.user.username,
        creatorName: creator.userName,
        amount: amount,
        name: inputUser,
        comment: comment,
      });

      const donationData = await donation.save();
      res.redirect("/");
      // res.send("hello");
    } catch (err) {
      res.render(err);
    }
  },
  async allUserDonation(req, res) {
    try {
      Donation.find({}, null, {
        sort: { createdAt: -1 },
      })
        .populate("creatorId")
        .exec(function (err, data) {
          res.render("user/all-users-donation", { usersData: data, moment });
        });
    } catch (err) {
      res.send(err);
    }
  },
};
