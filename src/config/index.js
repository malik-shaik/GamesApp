const dotEnv = require("dotenv");
dotEnv.config();

module.exports = {
  port: process.env.PORT,
  jwtSecret: process.env.JWTSECRET,
  mongoDbURL: process.env.MONGO_URI,
};
