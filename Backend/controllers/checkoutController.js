const catchAsyncError = require("../middlewares/catchAsyncErrors");

const makeCheckout = catchAsyncError(async (req, res, next) => {
  res.status(200).send({ success: true, message: "Checkout Successfully" });
});

module.exports = { makeCheckout };
