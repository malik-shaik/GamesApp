const Games = require("./models/gamesModel");
const User = require("./models/userModel");

module.exports = {
  // GET 4 recent games query
  getRecentGames: async () => await Games.find().sort({ date: -1 }).limit(4),

  // GET all games query
  getAllGames: async () => await Games.find().sort({ date: -1 }),

  // GET one game by Id query
  getOneGameById: async (id) => await Games.findById(id),

  // GET one game by Id query
  getGamesByUser: async (userid) => await Games.find({ owner: userid }),

  // GET games by platform query
  getGamesByPlatfrom: async (platform) =>
    await Games.find({ platform }).sort({ date: -1 }),

  // GET user by Id query
  getUserById: async (id) => await User.findById(id),

  // GET user by email query
  getUserByEmail: async (email) => await User.findOne({ email }),

  // CREATE game query
  createGame: async (gamedata) => {
    const game = await new Games(gamedata);
    return await game.save();
  },

  // CREATE user query
  createUser: async (userdata) => {
    const user = await new User(userdata);
    return await user.save();
  },

  // LIKE a game query
  likeGame: async (gameId, userId) => {
    const user = await User.findById(userId);
    const gameIndex = user.likedgames.indexOf(gameId);
    gameIndex < 0
      ? user.likedgames.unshift(gameId)
      : user.likedgames.splice(gameIndex, 1);
    await user.save();
  },

  //SEND message query
  sendMessage: async ({ recieverId, senderId, sender, message }) => {
    const newMessage = { senderId, sender, message };
    const reciever = await User.findById(recieverId);
    const messages = reciever.messages;
    messages.unshift(newMessage);
    reciever.messages = messages;
    await reciever.save();
  },

  //OPEN message query
  openMessage: async ({ userId, messageId }) => {
    const user = await User.findById(userId);
    const message = user.messages.find(
      (msg) => msg._id.toString() === messageId
    );
    message.opened = true;
    await user.save();
  },
};
