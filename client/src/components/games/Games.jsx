import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PS4Icon from "../../img/icon-ps4.png";
import XboxIcon from "../../img/icon-xbox.png";
import WiiIcon from "../../img/icon-wii.png";

const Games = ({ games }) => {
  return (
    <Fragment>
      {games.map((game) => (
        <Link
          style={{ textDecoration: "none" }}
          className="game"
          key={game._id}
          to={`/gamepage/${game._id}`}
        >
          <img className="cover-img" src={game.cover} alt="cover" />
          <div className="game-details">
            <span>{game.name}</span>
            {game.platform === "PS4" && (
              <img className="game-icon" src={PS4Icon} alt="icon" />
            )}
            {game.platform === "Xbox" && (
              <img className="game-icon" src={XboxIcon} alt="icon" />
            )}
            {game.platform === "Wii" && (
              <img className="game-icon" src={WiiIcon} alt="icon" />
            )}
          </div>
          <div className="game-fee">
            <span> {game.fees} krs</span>
          </div>
        </Link>
      ))}
    </Fragment>
  );
};

export default Games;
