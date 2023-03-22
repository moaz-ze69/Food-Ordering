const express = require("express");
const {
  getProducts,
  getProductsByCategories,
} = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products-by-categories").get(getProductsByCategories);

module.exports = router;
