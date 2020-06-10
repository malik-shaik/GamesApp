import React, { useEffect, useState } from "react";
import axios from "axios";
import Games from "./Games";
import Pagination from "./Pagination";
import "./styles/games.css";

const AllGames = () => {
  const gamesData = {
    games: [],
    platform: "all",
    totalGames: 0,
    currentPage: 1,
    nextPage: false,
    previousPage: false,
  };
  const [allGames, setAllGames] = useState(gamesData);
  const {
    games,
    platform,
    totalGames,
    currentPage,
    nextPage,
    previousPage,
  } = allGames;

  const fetchGames = async (page) => {
    setAllGames({ ...allGames, currentPage: page });
    let gameslimit = 8;
    const url = `/api/games?page=${page}&limit=${gameslimit}&platform=${platform}`;
    const res = await axios.get(url);
    const { totalGames, games, nextPage, previousPage } = res.data;
    setAllGames({ ...allGames, games, totalGames, nextPage, previousPage });
  };

  useEffect(() => {
    fetchGames(currentPage); // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGames(currentPage);
  };

  const handleChange = (e) =>
    setAllGames({ ...allGames, platform: e.target.value });

  const numberOfPages = Math.floor(totalGames / 8);
  return (
    <section className="main-container">
      <div className="games-search-section">
        <form className="search-form">
          <input id="search-name" type="text" placeholder="game name" />
          <select
            className="games-platform"
            value={platform}
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value="PS4">PS4</option>
            <option value="Xbox">XBox</option>
            <option value="Wii">Wii</option>
          </select>
          <button type="submit" className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      <div className="games-section">
        <div id="allgames" className="games">
          <Games games={games} />
        </div>
        {totalGames > 4 ? (
          <Pagination
            pages={numberOfPages}
            fetchGames={fetchGames}
            currentPage={currentPage}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default AllGames;
