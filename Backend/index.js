require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

const database = require("./database");
const productRouter = require("./routes/productRouter");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());

const userRouter = require("./routes/userRouter");
const checkoutRouter = require("./routes/checkoutRouter");

database.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) =>
  res.json({ message: "Welcome to food-ordering backend." })
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));

// app.use(express.json());

app.use("/api/", productRouter);
app.use("/api/", userRouter);
app.use("/api/", checkoutRouter);
