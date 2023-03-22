const passport = require("passport");
const crypto = require("crypto");

const catchAsyncError = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");

passport.use(User.createStrategy());

passport.serializeUser(
  User.serializeUser(function (user, done) {
    done(null, user.id);
  })
);
passport.deserializeUser(
  User.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  })
);

const register = catchAsyncError(async (req, res, next) => {
  User.register(
    {
      username: req.body.username,
      email: req.body.email,
      avatar: {
        public_id: "this is sample id",
        url: "https://res.cloudinary.com/dlwq5rgeu/image/upload/v1672573314/food-ordering-app/user-icon_jxt1df.png",
      },
    },
    req.body.password,
    function (err, user) {
      if (err) {
        res.status(400).send({ error: err });
      } else {
        passport.authenticate("local")(req, res, function () {
          sendToken(user, 200, res);
        });
      }
    }
  );
});

const login = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  req.login(
    { user, password: req.body.password },
    { session: false },
    (err) => {
      if (err) {
        res.status(400).send({ error: err });
      } else {
        passport.authenticate("local")(req, res, function () {
          sendToken(user, 200, res);
        });
      }
    }
  );
});

const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).send({ success: true, message: "Logged out successfully" });
});

const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).send({ error: "User not found with this email" });
  }

  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Food Order Password Recovery",
      message,
    });

    res.status(200).send({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(400).send({ error: error });
  }
});

const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res
      .status(400)
      .send({ error: "Password reset token is invalid or has expired" });
  }

  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).send({ error: "Password does not match" });
  }

  await user.setPassword(req.body.password);

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).send({
    success: true,
    user,
  });
});

const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const isMatched = await user.authenticate(req.body.oldPassword);

  if (!isMatched) {
    res.status(400).send({ error: "Old password is incorrect" });
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    res.status(400).send({ error: "Password does not match" });
  }

  await user.setPassword(req.body.newPassword);
  await user.save();
  sendToken(user, 200, res);
});

const updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    username: req.body.username,
    email: req.body.email,
    avatar: req.body.avatar,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).send({
    success: true,
  });
});

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
};
