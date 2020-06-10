const Query = require("../Database/queries");
const helperMethods = require("../helpers");

// ##########################################################################
// Get One User Service
module.exports.getOneUserService = async (id) => {
  try {
    const user = await Query.getUserById(id);
    user.password = undefined;

    const token = await helperMethods.createJWT(id);
    return { user, token };
  } catch (error) {
    console.log("ErrorIn: getOneUserService :", error);
    throw new Error(error.message);
  }
};

// ##########################################################################
// Register Service
module.exports.registerService = async (data) => {
  try {
    const existingUser = await Query.getUserByEmail(data.email);
    if (existingUser) throw new Error("User already exist. Please login.");

    data.password = await helperMethods.hashPassword(data.password);

    const newUser = await Query.createUser(data);
    newUser.password = undefined;

    const token = await helperMethods.createJWT(newUser._id);
    return { user: newUser, token };
  } catch (error) {
    console.log("ErrorIn: RegisterService :", error);
    throw new Error(error.message);
  }
};

// ####################################################################
// LOGIN SERVICE
module.exports.loginService = async (data) => {
  try {
    const user = await Query.getUserByEmail(data.email);
    if (!user) throw new Error("User does not exist. Please register.");

    const isMatch = await helperMethods.checkPassword(
      data.password,
      user.password
    );
    if (!isMatch) throw new Error("Invalid credentials.");

    user.password = undefined;
    const token = await helperMethods.createJWT(user.id);

    return { user, token };
  } catch (error) {
    console.log("ErrorIn: RegisterService :", error);
    throw new Error(error.message);
  }
};
