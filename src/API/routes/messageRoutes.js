const router = require("express").Router();
const authorization = require("../../Middlewares/auth");
const {
  sendMessageController,
  openMessageController,
} = require("../controllers/messageControllers");

// ####################################################################

router.post("/", authorization, sendMessageController);

router.put("/open/:id", authorization, openMessageController);

module.exports = router;
