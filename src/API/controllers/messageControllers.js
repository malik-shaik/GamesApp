const {
  sendMessageService,
  openMessageService,
} = require("../../Services/messageServices");

// ##########################################################################
// Send Message Controller
module.exports.sendMessageController = async (req, res) => {
  const { recieverId, message } = req.body;
  try {
    if (req.err) throw new Error(req.err);
    const senderId = req.userid;
    const result = await sendMessageService({ senderId, recieverId, message });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

// ##########################################################################
// Open Message Controller
module.exports.openMessageController = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);
    const userId = req.userid;
    const messageId = req.params.id;
    const result = await openMessageService({ userId, messageId });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
