import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import NavBar from "./components/layout/Navbar";
import Signup from "./components/user/Signup";
import AllGames from "./components/games/AllGames";
import LandingPage from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Logout from "./components/user/Logout";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/user/Protected";
import GamePage from "./components/games/GamePage";
import "./App.css";
import LatestReleasedGames from "./components/games/LatestReleasedGames";

function App() {
  return (
    <Router>
      <Fragment>
        <UserProvider>
          <NavBar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/latest" component={LatestReleasedGames} />
            <Route exact path="/games" component={AllGames} />
            <Route exact path="/gamepage/:id" component={GamePage} />
            <ProtectedRoute path="/profile" component={Profile} />
          </Switch>
        </UserProvider>
        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
