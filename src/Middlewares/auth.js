const JWT = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  try {
    if (!token) throw new Error();
    const decode = JWT.verify(token, jwtSecret);
    req.userid = decode.id;
    next();
  } catch (err) {
    req.err = "Authorizaiton denied, please login and try again.";
    next();
  }
};

module.exports = auth;
