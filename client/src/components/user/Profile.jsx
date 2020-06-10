import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import MessagesSection from "./MessagesSection";
import ProfileSection from "./ProfileSection";
import GamesSection from "./GamesSection";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [className] = useState("shadow p-3  col-4");

  const tabClickHandler = (tab) => setActiveTab(tab);

  return (
    <div
      className="container text-center profile-container"
      style={{ height: "80vh" }}
    >
      <h1 className="pt-3 mb-3 name">{user.name}</h1>
      <div className="row profile-menu">
        <div
          onClick={() => tabClickHandler("profile")}
          className={
            activeTab === "profile" ? className + " tab-active" : className
          }
        >
          <h5>Profile</h5>
        </div>
        <div
          onClick={() => tabClickHandler("messages")}
          className={
            activeTab === "messages" ? className + " tab-active" : className
          }
        >
          <h5>Messages</h5>
        </div>
        <div
          onClick={() => tabClickHandler("games")}
          className={
            activeTab === "games" ? className + " tab-active" : className
          }
        >
          <h5>Games</h5>
        </div>
      </div>

      <div className="tab-content overflow-auto">
        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "messages" && <MessagesSection />}
        {activeTab === "games" && <GamesSection />}
      </div>
    </div>
  );
};

export default Profile;
