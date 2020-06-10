const router = require("express").Router();
const authorization = require("../../Middlewares/auth");
const {
  loginController,
  registerController,
  getOneUserController,
} = require("../controllers/userControllers");
const {
  registerValidationFields,
  loginValidationFields,
} = require("../../helpers");

// ####################################################################

router.get("/byId", authorization, getOneUserController);

router.post("/login", loginValidationFields, loginController);

router.post("/register", registerValidationFields, registerController);

module.exports = router;
