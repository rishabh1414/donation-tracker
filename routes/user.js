const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const donationController = require("../controllers/donationController");

// * Routes

router.get("/user/all-donation", Auth, donationController.allOrder);
router.get("/user/donation/:id", Auth, donationController.donateScreen);
router.post("/user/donation/:id", Auth, donationController.postDonateScreen);

router.get("/user/donation/:id", Auth, donationController.postDonateScreen);
router.get(
  "/user/all-users-donation",
  Auth,
  donationController.allUserDonation
);
module.exports = router;
