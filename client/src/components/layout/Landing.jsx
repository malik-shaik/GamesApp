import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Games from "../games/Games";
import "./styles/layout.css";

const LandingPage = () => {
  const [recentGames, setRecentGames] = useState([]);
  const history = useHistory();

  const exploreGamesHandler = () => history.push("/games");

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/games/recent"); // used proxy in package.json
      setRecentGames(res.data);
    }
    fetchData();
  }, []);

  return (
    <main className="main-tag ">
      <section className="presentation">
        <div className="intro-message text-center">
          <div className="gamers-quote">
            <h3>
              I am not a gamer because I have no life... <br />
              ...But because I choose to have many
            </h3>
          </div>
          <div className="message">
            <p>
              Share your game and earn gamers appriciation. <br />
              Or borrow one from our huge collection of games.
            </p>
          </div>

          <button
            onClick={exploreGamesHandler}
            className="btn explore-btn mb-3"
          >
            Explore games
          </button>
        </div>
      </section>
      <section className="content-section">
        <div className="recently-added">
          <div className="recently-added-title">
            <h3>Recently Added</h3>
          </div>
          <div className="games">
            <Games games={recentGames} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
