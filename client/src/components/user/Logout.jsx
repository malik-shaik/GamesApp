import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logoutAction } from "../../context/actions";
import { UserContext } from "../../context/userContext";

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const handleLogout = () => logoutAction(dispatch);

  return (
    <section className="main-container">
      <div>Logout Page</div>
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </section>
  );
};

export default Logout;
