const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { v1: uuidV1 } = require("uuid");
const mime = require("mime-types");

const JWT = require("jsonwebtoken");
const { jwtSecret, port } = require("../config");

// ####################################################################

module.exports.gameValidatonFields = [
  check("name", "Name is required").not().isEmpty(),
  check("platform", "Name is required").not().isEmpty(),
];

module.exports.registerValidationFields = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please enter valid email").isEmail(),
  check(
    "password",
    "Please enter password with 4 or more charecters"
  ).isLength({ min: 4 }),
];

module.exports.loginValidationFields = [
  check("email", "Please enter valid email").isEmail(),
  check(
    "password",
    "Please enter password with 4 or more charecters"
  ).isLength({ min: 4 }),
];

module.exports.validateData = (data) => validationResult(data);

module.exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports.checkPassword = async (password, hashPassword) =>
  await bcrypt.compare(password, hashPassword);

module.exports.createJWT = async (userid) => {
  const payload = { id: userid };
  return await JWT.sign(payload, jwtSecret, { expiresIn: 360000 });
};

module.exports.getImageName = (image) => {
  const ext = mime.extension(image.mimetype);
  return uuidV1() + "." + ext;
};

module.exports.moveImage = (image, name) => {
  image.mv(__dirname + "/../uploads/gameCovers/" + name, (err) => {
    if (err) throw new Error(`Image cannot move. ${err}`);
  });
};

module.exports.createImageLink = (imagename) =>
  `http://localhost:${port}/${imagename}`;
