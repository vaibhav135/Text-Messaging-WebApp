import React, { useContext } from "react";
import LoginLayout from "./login_layout";
import HomePage from "../home_page/home_page";
import LoginContext from "../context_provider/login_context";
import { BsChatLeftDotsFill } from "react-icons/bs";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./login_page.css";

const LandingPage = () => {
  // typeof contextValue => object
  const contextValue = useContext(LoginContext);
  let currentPath = useHistory().location.pathname;

  let login_check = contextValue.userStateHook.username === "guest";
  const redirect_to = login_check ? "/login" : "/home";

  // Note:- ignore the comments below, for test purposes only
  //let currentLocation = useLocation();
  //console.log(redirect_to);
  //console.log(contextValue.userStateHook.username);
  //console.log("currentPath: " + currentPath);
  //console.log("currentLocation: " + currentLocation.pathname);

  return (
    <Router>
      <Redirect exact from={currentPath} to={redirect_to} />
      <Switch>
        <Route exact path={redirect_to}>
          {login_check ? (
            <div className="landing_page">
              <div className="welcome_div">
                <h1 className="welcome_heading">Welcome to chatter chatter </h1>

                {/* chat icon here */}
                <BsChatLeftDotsFill id="chat_icon" />
              </div>
              {/* login page */}
              <LoginLayout />{" "}
            </div>
          ) : (
            <HomePage />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default LandingPage;
