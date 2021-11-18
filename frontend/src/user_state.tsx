import React, { useCallback, useMemo, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginContext from "./components/context_provider/login_context";
import LandingPage from "./components/login_page/landing_page";
import userData from "./interface/user_interface";

const UserState = () => {
  // initial data before the user is logged in
  const guestUser: userData = {
    username: "guest",
    password: "",
  };

  // info: userData is an object type which contains
  // username and password.
  const [userStateHook, setUserStateHook] = useState<userData>(guestUser);
  const [jwtToken, setJWTtoken] = useState("");

  const setLogoutState = useCallback(
    (state: boolean) => {
      // if state === false: meaning that we need to logout
      if (state) {
        setUserStateHook(guestUser);
      }
    },
    [guestUser]
  );

  //const value = useMemo(
  //() => ({
  //userStateHook,
  //setUserStateHook,
  //}),
  //[userStateHook, setUserStateHook ]
  //);
  const value = {
    userStateHook,
    setUserStateHook,
    jwtToken,
    setJWTtoken,
    setLogoutState,
  };

  return (
    <Router>
      <LoginContext.Provider value={value}>
        <LandingPage />
      </LoginContext.Provider>
    </Router>
  );
};

export default UserState;
