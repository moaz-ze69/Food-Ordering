//  will not be required when use jwt token
const session = require("express-session");

const sessionMiddleware = () =>
  session({
    key: "userId",
    secret: "Our little secret that will make some tricks.",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
      httpOnly: false,
    },
  });

module.exports = sessionMiddleware;
