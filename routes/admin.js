const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const AdminController = require("../controllers/adminAllDonationController");

router.get("/user/all-users-donation", AdminController.allUserDonation);
