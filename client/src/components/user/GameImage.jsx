import React from "react";

const GameImage = ({ game }) => {
  return <img className="favorite-game p-2" src={game.cover} alt="" />;
};

export default GameImage;
