const Query = require("../Database/queries");
const helperMethods = require("../helpers");

// ####################################################################
// GET FOUR RECENT GAMES SERVICE
module.exports.getOneGameService = async (id) => {
  try {
    return await Query.getOneGameById(id);
  } catch (error) {
    console.log("ErrorIn: getOneGameService :", error);
    return error.message;
  }
};

// ####################################################################
// GET FOUR RECENT GAMES SERVICE
module.exports.getFourRecentGamesService = async () => {
  try {
    return await Query.getRecentGames();
  } catch (error) {
    console.log("ErrorIn: getFourRecentGamesService :", error);
    return error.message;
  }
};

// ####################################################################
// GET GAMES BY USER SERVICE
module.exports.getGamesByUserService = async (userId) => {
  try {
    return await Query.getGamesByUser(userId);
  } catch (error) {
    console.log("ErrorIn: getGamesByUserService :", error);
    return error.message;
  }
};

// ####################################################################
// GET ALL GAMES SERVICE
module.exports.getAllGamesService = async (page, limit, platform) => {
  const startIndex = (page - 1) * limit; // since results array index starts from 0
  const endIndex = page * limit;

  try {
    const games =
      platform !== "all"
        ? await Query.getGamesByPlatfrom(platform)
        : await Query.getAllGames();

    const totalGames = games.length;
    const results = {};
    if (endIndex < totalGames) results.nextPage = true;
    if (startIndex > 0) results.previousPage = true;

    results.totalGames = totalGames;
    results.games = games.slice(startIndex, endIndex);

    return results;
  } catch (error) {
    console.log("ErrorIn: getAllGamesService :", error);
    return error.message;
  }
};

// ####################################################################
// CREATE A GAME SERVICE
module.exports.createGameService = async (gameData, imageFile) => {
  try {
    const imageName = helperMethods.getImageName(imageFile);
    helperMethods.moveImage(imageFile, imageName);
    gameData.cover = helperMethods.createImageLink(imageName);

    const results = await Query.createGame(gameData);
    return results;
  } catch (error) {
    console.log("ErrorIn: createGameService :", error);
    return error.message;
  }
};

// ####################################################################
// LIKE A GAME SERVICE
module.exports.likeGameService = async (gameId, userId) => {
  try {
    await Query.likeGame(gameId, userId);
    return "your like updated";
  } catch (error) {
    console.log("ErrorIn: likeGameService :", error);
    return error.message;
  }
};
