import React, { useEffect, useState } from "react";
import axios from "axios";
import PS4Icon from "../../img/icon-ps4.png";
import XboxIcon from "../../img/icon-xbox.png";
import WiiIcon from "../../img/icon-wii.png";

const LatestReleasedGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `https://api.rawg.io/api/games?dates=2020-04-01,2020-05-31&&platforms=18,1,7`
      );
      const games = await res.data.results.map((game) => {
        const { id, name, platforms, released, background_image } = game;
        return { id, name, platforms, released, cover: background_image };
      });
      setGames(games);
    }
    fetchData();
  }, []);

  return (
    <section className="main-container">
      <div className="games-section" style={{ overflow: "auto" }}>
        <div id="allgames" className="games">
          {games.map((game) => (
            <div className="game" key={game.id}>
              <img className="cover-img" src={game.cover} alt="cover" />
              <div className="game-details">
                <span>{game.name}</span>
                {(game.platforms[0].platform.id === 18 ||
                  game.platforms[0].platform.id === 1 ||
                  game.platforms[0].platform.id === 7) && (
                  <img className="game-icon" src={PS4Icon} alt="icon" />
                )}
                {game.platforms[1] &&
                  (game.platforms[1].platform.id === 18 ||
                    game.platforms[1].platform.id === 1 ||
                    game.platforms[1].platform.id === 7) && (
                    <img className="game-icon" src={XboxIcon} alt="icon" />
                  )}
                {game.platforms[0].platform.id === 7 && (
                  <img className="game-icon" src={WiiIcon} alt="icon" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestReleasedGames;
