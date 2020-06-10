import React, { useContext, useState } from "react";
import moment from "moment";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { loadUserAction } from "../../context/actions";

const MessagesSection = () => {
  const { user, dispatch } = useContext(UserContext);
  const [message, setMessage] = useState({});
  const [replyMsg, setReplyMsg] = useState("");
  const [msgSent, setMsgSent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplyButton, setShowReplyButton] = useState(false);
  const [showMessageSection, setShowMessageSection] = useState(false);
  const { messages } = user;

  const handleMsgSelect = async (msg) => {
    const url = `/api/messages/open/${msg._id}`;
    const config = {
      headers: { "auth-token": localStorage.getItem("login-token") },
    };
    await axios.put(url, {}, config);
    loadUserAction(dispatch);
    setMessage(msg);
    setShowMessageSection(true);
    setShowReplyButton(true);
    setShowReplyForm(false);
    setMsgSent("");
  };

  const getDate = (date) => moment(date).format("MMMM Do, h:mm a");

  const onChangeHandler = (e) => setReplyMsg(e.target.value);

  const replyHandler = () => {
    setShowReplyButton(false);
    setShowReplyForm(true);
  };

  const sendMsgHangler = async (e) => {
    e.preventDefault();
    const url = `/api/messages/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("login-token"),
      },
    };
    const body = { recieverId: message.senderId, message: replyMsg };
    const res = await axios.post(url, body, config);
    console.log(res.data);
    setShowReplyForm(false);
    setMsgSent(res.data.message);
    // console.log(replyMsg);
  };

  return (
    <div className="row mt-4">
      <div className="col-6 overflow-section" style={{ height: "55vh" }}>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col-4">Sender</th>
              <th scope="col-6">Message</th>
            </tr>
          </thead>
          <tbody className="">
            {messages &&
              messages.map((msg) => (
                <tr
                  key={msg._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleMsgSelect(msg)}
                >
                  <td>
                    <i
                      className={
                        msg.opened ? "far fa-envelope-open" : "fas fa-envelope"
                      }
                    ></i>{" "}
                    {msg.sender}{" "}
                  </td>

                  <td>{msg.message}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="col-6">
        {showMessageSection && (
          <>
            <div className="row msg-section pl-5">
              <p className="text-left">
                From: <span className="sender-name">{message.sender}</span>{" "}
                <br />
                <span className="msg-date">{getDate(message.date)}</span>
                <br /> <br />
                {message.message}
              </p>{" "}
              <br />
              {showReplyButton && (
                <button onClick={replyHandler} className="btn reply-btn">
                  Reply
                </button>
              )}
            </div>
            {showReplyForm ? (
              <div className="row reply-section pl-5">
                <form>
                  <div>
                    <textarea
                      value={replyMsg}
                      onChange={onChangeHandler}
                      className="form-control text-area"
                      rows="3"
                      placeholder="write reply here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn send-msg-btn mt-2"
                    onClick={sendMsgHangler}
                  >
                    Send
                  </button>
                </form>
              </div>
            ) : (
              <div>{msgSent}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesSection;
