const { validateData } = require("../../helpers");
const {
  loginService,
  registerService,
  getOneUserService,
} = require("../../Services/userServices");

// ##########################################################################
// Get One User Service
module.exports.getOneUserController = async (req, res) => {
  try {
    const result = await getOneUserService(req.userid);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

// ##########################################################################
// Register Controller
module.exports.registerController = async (req, res) => {
  try {
    const errors = validateData(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    const result = await registerService(req.body);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

// ##########################################################################
// Login Controller
module.exports.loginController = async (req, res) => {
  try {
    const errors = validateData(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    const result = await loginService(req.body);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
