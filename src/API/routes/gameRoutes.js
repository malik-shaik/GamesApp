const router = require("express").Router();
const Authorization = require("../../Middlewares/auth");

const {
  getAllGamesController,
  getOneGameController,
  createGameController,
  likeGameController,
  getGamesByUserController,
  getFourRecentGamesController,
} = require("../controllers/gameControllers");

// ####################################################################

router.get("/recent", getFourRecentGamesController);

router.get("/byuser", Authorization, getGamesByUserController);

router.get("/:id", getOneGameController);

router.get("/", getAllGamesController);

router.post("/", Authorization, createGameController);

router.post("/likegame/:id", Authorization, likeGameController);

module.exports = router;
