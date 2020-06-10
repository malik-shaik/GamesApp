const {
  likeGameService,
  createGameService,
  getOneGameService,
  getAllGamesService,
  getGamesByUserService,
  getFourRecentGamesService,
} = require("../../Services/gameServices");

// ####################################################################
// GET ONE GAME BY ID CONTROLLER
module.exports.getOneGameController = async (req, res) => {
  try {
    const results = await getOneGameService(req.params.id);
    res.status(200).send(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// ####################################################################
// GET FOUR RECENT GAMES CONTROLLER
module.exports.getFourRecentGamesController = async (req, res) => {
  try {
    const results = await getFourRecentGamesService();
    res.status(200).send(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// ####################################################################
// GET GAMES BY USER CONTROLLER
module.exports.getGamesByUserController = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);

    const results = await getGamesByUserService(req.userid);
    res.status(200).send(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// ####################################################################
// GET ALL GAMES CONTROLLER
module.exports.getAllGamesController = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const platform = req.query.platform;
  try {
    const results = await getAllGamesService(page, limit, platform);
    res.status(200).send(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// ####################################################################
// CREATE GAME CONTROLLER
module.exports.createGameController = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);
    const gameData = { ...req.body, owner: req.userid };
    const imageFile = req.files.image;

    const results = await createGameService(gameData, imageFile);
    res.status(200).send(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// ####################################################################
// LIKE GAME CONTROLLER
module.exports.likeGameController = async (req, res) => {
  const gameId = req.params.id;
  try {
    if (req.err) throw new Error(req.err);
    const userId = req.userid;

    const results = await likeGameService(gameId, userId);
    res.status(200).send(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
