import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { loadUserAction } from "../../context/actions";

const GamePage = () => {
  const [game, setGame] = useState({});
  const [gameLiked, setGameLiked] = useState(false);
  const [msgSent, setMsgSent] = useState(undefined);
  const [showMsgInputBox, setShowInputMsgBox] = useState(false);
  const { user, dispatch } = useContext(UserContext);
  const { isAuthenticated } = user;
  const [requestMsg, setRequestMsg] = useState(
    `Hi, 
  I am interested in this game. Please send me contact details.  
  Thank you,
  `
  );
  const { id } = useParams();
  const history = useHistory();

  const fetchGame = async (gameid) => {
    const url = `/api/games/${gameid}`;
    const res = await axios.get(url);
    setGame(res.data);
  };

  useEffect(() => {
    fetchGame(id);
    loadUserAction(dispatch);
    userChaged(); //eslint-disable-next-line
  }, [id]);

  const userChaged = () => {
    if (user.likedgames) {
      user.likedgames.forEach((gameid) => {
        if (gameid === id) setGameLiked(true);
      });
    }
  };

  const handleLikeAction = async (gameId) => {
    if (!isAuthenticated)
      history.push({ pathname: "/login", state: { from: `gamepage/${id}` } });
    else {
      const url = `/api/games/likegame/${gameId}`;
      const config = {
        headers: { "auth-token": localStorage.getItem("login-token") },
      };
      const res = await axios.post(url, {}, config);
      if (res.status === 200) setGameLiked(!gameLiked);
      loadUserAction(dispatch);
    }
  };

  const handleGameRequest = async () => {
    if (!isAuthenticated)
      history.push({ pathname: "/login", state: { from: `gamepage/${id}` } });
    else setShowInputMsgBox(true);
  };

  const handleSendGameRequest = async () => {
    const url = `/api/messages/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("login-token"),
      },
    };
    const body = { recieverId: game.owner, message: requestMsg };
    const res = await axios.post(url, body, config);
    if (res.status === 200) {
      setMsgSent(true);
      setShowInputMsgBox(false);
    }
  };

  const handleTextChange = (e) => setRequestMsg(e.target.value);

  return (
    <section className="main-container">
      <div className="game-page-wrapper">
        <div className="goback-link">
          <IoIosArrowRoundBack onClick={() => history.push("/games")} />
        </div>
        <div className="game-content">
          <div className="game-cover">
            <img className="game-cover-img" src={game.cover} alt="cover" />
          </div>
          <div className="game-info">
            <div className="game-title">
              <span>{game.name}</span>
            </div>

            <table>
              <tbody>
                <tr>
                  <td>Platform: </td>
                  <td id="game-platform">
                    {game.platform === "PS4" && "Playstation 4"}
                    {game.platform === "Xbox" && "XBOX ONE"}
                    {game.platform === "Wii" && "Wii"}
                  </td>
                </tr>
                <tr>
                  <td>Fee: </td>
                  <td id="game-fees">
                    {game.fees} <span style={{ fontSize: 13 }}>Krs</span>{" "}
                  </td>
                </tr>
                <tr>
                  <td>Available: </td>
                  <td id="game-availabilty">{game.available ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => handleLikeAction(game._id)}
              className="game-like"
            >
              {gameLiked ? (
                <>
                  <p>Liked</p>
                  <FaThumbsUp className="game-like-icon" />
                </>
              ) : (
                <>
                  <p>Like</p>
                  <FaRegThumbsUp className="game-like-icon" />
                </>
              )}
            </button>

            {showMsgInputBox ? (
              <div>
                <textarea
                  cols="50"
                  rows="7"
                  value={requestMsg}
                  onChange={handleTextChange}
                  placeholder={requestMsg}
                ></textarea>
                <button
                  onClick={handleSendGameRequest}
                  className="request-game"
                >
                  Send Request
                </button>
              </div>
            ) : (
              <button
                disabled={msgSent}
                onClick={handleGameRequest}
                className="request-game"
              >
                {msgSent ? "Game Requested" : "Request the Game"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamePage;
