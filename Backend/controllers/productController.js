const Product = require("../models/productModel");
const catchAsyncError = require("../middlewares/catchAsyncErrors");

const getProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).send({ data: products });
});

const getProductsByCategories = catchAsyncError(async (req, res, next) => {
  const products = await Product.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "$category",
        products: { $push: "$$ROOT" },
      },
    },
    { $project: { name: "$_id", products: 1, _id: 0 } },
  ]);
  return res.status(200).send({ data: products });
});

module.exports = { getProducts, getProductsByCategories };
