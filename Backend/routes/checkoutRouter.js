const express = require("express");

const { makeCheckout } = require("../controllers/checkoutController");

const router = express.Router();

const {isAuthenticated} = require("../middlewares/auth");

router.route("/checkout").get(isAuthenticated, makeCheckout);

module.exports = router;
