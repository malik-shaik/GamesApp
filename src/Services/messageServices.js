const Query = require("../Database/queries");

// ##########################################################################
// Send Message Service
module.exports.sendMessageService = async (data) => {
  const { senderId, recieverId, message } = data;
  try {
    const { name } = await Query.getUserById(senderId);
    await Query.sendMessage({ recieverId, senderId, sender: name, message });
    return { message: "Message successfully sent." };
  } catch (error) {
    console.log("ErrorIn: sendMessageService :", error);
    throw new Error(error.message);
  }
};

// ##########################################################################
// Open Message Service
module.exports.openMessageService = async (data) => {
  const { userId, messageId } = data;
  try {
    await Query.openMessage({ userId, messageId });
    return { message: "Message successfully opened." };
  } catch (error) {
    console.log("ErrorIn: openMessageService :", error);
    throw new Error(error.message);
  }
};
