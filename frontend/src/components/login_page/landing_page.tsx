import { useState } from "react";

import HomePage from "../home_page/home_page";
import LandingBasicLayout from "./landing_basic_layout";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginContext from "../context_provider/login_context";
import { ProfileContext } from "../context_provider/profile_context";
import "./login_page.css";

const LandingPage = () => {
  //userStateHook: { id: null, username: "guest" },
  //setUserStateHook: (userStateHook: userData) => {},
  const [userInfoHook, setUserInfoHook] = useState({
    id: "",
    username: "guest",
  });

  const [userProfileHook, setUserProfileHook] = useState<any>({
    userId: "",
    username: "",
    profile_name: "",
    description: "",
    gender: "",
    image: "",
    hobbies: [],
    social_media: {
      facebook: "",
      instagram: "",
      github: "",
    },
  });
  const [skip, setSkip] = useState<boolean>(false);

  const userInfoHookValue = { userInfoHook, setUserInfoHook };
  const userProfileHookValue = {
    userProfileHook,
    setUserProfileHook,
    skip,
    setSkip,
  };

  return (
    <LoginContext.Provider value={userInfoHookValue}>
      <ProfileContext.Provider value={userProfileHookValue}>
        <Switch>
          <Redirect exact from="/" to="/auth" />
          <Route path="/auth">
            <LandingBasicLayout />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
        </Switch>
      </ProfileContext.Provider>
    </LoginContext.Provider>
  );
};

export default LandingPage;
