import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import GameImage from "./GameImage";

const ProfileSection = () => {
  const { user } = useContext(UserContext);
  const { email, messages, likedgames } = user;
  const [favGames, setFavGames] = useState([]);
  const [openedMessages, setOpenedMessages] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (messages) {
      let openedMsgs = messages.filter((msg) => msg.opened === true);
      setOpenedMessages(openedMsgs.length);
    }
    if (likedgames) {
      likedgames.forEach(async (game) => {
        const url = `/api/games/${game}`;
        const res = await axios.get(url);
        setFavGames((favGames) => [...favGames, res.data]);
      });
    }
  }, [messages, likedgames]);

  const editFormHandler = () => setShowEditForm(true);

  return (
    <div className="mt-4 row">
      <div className="col-10">
        <div className="text-left row mt-2">
          <div className="text-left col-2 font-weight-bold">
            <p>Email: </p>
            <p>Messages: </p>
            <p>Favourite games:</p>
          </div>
          <div className="text-left col-3 profile-text">
            <p>
              {email} {""}
              <i
                onClick={editFormHandler}
                className="edit-icon ml-2 fas fa-edit"
              ></i>
            </p>
            <p>
              <i className="far fa-envelope-open mr-1"></i>
              {messages ? openedMessages : "0"}

              <i className="fas fa-envelope ml-3  mr-1"></i>
              {messages ? messages.length - openedMessages : 0}
            </p>
          </div>

          <div className="form-group email-update col-3">
            {showEditForm && (
              <form>
                <div>
                  <label>Edit email address</label>
                  <input type="email" className="form-control"></input>
                </div>

                <button type="submit" className="btn btn-block update-btn mt-3">
                  Update
                </button>
              </form>
            )}
          </div>

          <div className="text-left row d-felx">
            {favGames.length !== 0 && (
              <div className="col-5 overflow-section">
                {favGames.map((game) => (
                  <GameImage key={game._id} game={game} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
