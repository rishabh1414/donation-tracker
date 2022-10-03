const express = require("express");
const router = express.Router();
//* Controllers
const homeController = require("../controllers/homeController");
const AuthController = require("../controllers/authController");
//*middlewares
const guest = require("../middlewares/guest");

// * Routes

router.get("/", homeController.homepage);
router.get("/login", guest, homeController.login);
router.get("/register", guest, homeController.register);
router.post("/register", AuthController.postRegister);
router.post("/login", AuthController.postLogin);
router.post("/logout", AuthController.logout);

module.exports = router;
