import React, { useContext } from "react";
import LoginLayout from "./login_layout";
import HomePage from "../home_page/home_page";
import LoginContext from "../context_provider/login_context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./login_page.css";

const LandingPage = () => {
  // typeof contextValue => object
  const contextValue = useContext(LoginContext);

  console.log(contextValue.userStateHook.username);
  let login_check = contextValue.userStateHook.username === "guest";

  return (
    <Router>
      <Switch>
        {login_check ? (
          <Route path="/login">
            <div className="landing_page">
              <LoginLayout />{" "}
            </div>
          </Route>
        ) : (
          <Route path="/home">
            <HomePage />{" "}
          </Route>
        )}
        <Redirect to={login_check ? "/login" : "/home"} push />
      </Switch>
    </Router>
  );
};

export default LandingPage;
