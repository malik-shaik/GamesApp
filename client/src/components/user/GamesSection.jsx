import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { loadUserAction } from "../../context/actions";
import { UserContext } from "../../context/userContext";
import GameImage from "./GameImage";

const GamesSection = () => {
  const [games, setGames] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  const [image, setImages] = useState(undefined);
  const { user, dispatch } = useContext(UserContext);

  const onChange = (e) => setImages(e.target.files[0]);

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("name", data.title);
    formData.append("fees", data.fees);
    formData.append("platform", data.platform);
    formData.append("image", image);
    // images.map((image) => formData.append(`images`, image));

    const url = "api/games/";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": localStorage.getItem("login-token"),
      },
    };
    await axios.post(url, formData, config);
    loadUserAction(dispatch);
  };

  const fetchGames = async () => {
    const config = {
      headers: { "auth-token": localStorage.getItem("login-token") },
    };
    const res = await axios.get("/api/games/byuser", config);
    setGames(res.data);
  };

  useEffect(() => {
    fetchGames();
  }, [user]);

  return (
    <div className="row mt-4">
      <div className="col-6 overflow-section">
        {games.length ? (
          <>
            <h5>All games</h5>
            <div>
              {games.map((game) => (
                <GameImage key={game._id} game={game} />
              ))}
            </div>
          </>
        ) : (
          <p>You have no owned games. Please add games</p>
        )}
      </div>
      <div className="col-6 p-5">
        <h5 className="mb-4">Add Game</h5>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="text-left">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Game tiltle"
              ref={register({ required: true, minLength: 3, maxLength: 14 })}
            />
            {errors.title && (
              <small className=" err-msg">
                * Title must be min 3 and max 15 charecters
              </small>
            )}
            <div className="row mt-3">
              <div className="col">
                <input
                  name="fees"
                  type="text"
                  className="form-control border-none"
                  placeholder="Fees"
                  ref={register({
                    required: true,
                    minLength: 2,
                    pattern: { value: /^[0-9]*$/ },
                  })}
                />
                {errors.fees && (
                  <small className="err-msg">
                    * Rent must be minimum 3 degits.{" "}
                  </small>
                )}
              </div>
              <div className="col form-group ">
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="platform"
                  ref={register({ validate: (value) => value !== "notselect" })}
                >
                  <option value="notselect">Select Platform</option>
                  <option value="PS4">Playstation 4</option>
                  <option value="Xbox">Xbox ONE</option>
                  <option value="Wii">Wii</option>
                </select>
                {errors.platform && (
                  <small className="err-msg">
                    * Select platform of the game.{" "}
                  </small>
                )}
              </div>
            </div>
            <div className="custom-file">
              <input
                name="file"
                type="file"
                className="custom-file-input "
                ref={register({ required: true })}
                onChange={onChange}
              />
              <label className="custom-file-label">
                {image ? image.name : "Choose file"}
              </label>
              {errors.file && (
                <small className="err-msg">
                  * Game cover image file required.
                </small>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-block update-btn mt-3">
            Add Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default GamesSection;
