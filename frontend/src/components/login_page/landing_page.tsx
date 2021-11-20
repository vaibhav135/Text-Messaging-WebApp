import { useState } from "react";
import HomePage from "../home_page/home_page";
import LandingBasicLayout from "./landing_basic_layout";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginContext from "../context_provider/login_context";
import "./login_page.css";

const LandingPage = () => {
  //userStateHook: { id: null, username: "guest" },
  //setUserStateHook: (userStateHook: userData) => {},
  const [userInfoHook, setUserInfoHook] = useState({
    id: null,
    username: "guest",
  });

  const value = { userInfoHook, setUserInfoHook };

  return (
    <LoginContext.Provider value={value}>
      <Switch>
        <Redirect exact from="/" to="/auth" />
        <Route path="/auth">
          <LandingBasicLayout />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
      </Switch>
    </LoginContext.Provider>
  );
};

export default LandingPage;
