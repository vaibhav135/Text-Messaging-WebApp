import React, { useContext, useEffect, useState } from "react";
import PopUpContext from "../../context_provider/popup_context";
import ExploreContext from "../../context_provider/explore_context";
import { ProfileContext } from "../../context_provider/profile_context";
import { useHistory } from "react-router-dom";

const TopNavigation = (props: any) => {
  const { popUpState, setPopUpState } = useContext(PopUpContext);
  const { setExploreState } = useContext(ExploreContext);
  const { userProfileHook, skip, setSkip } = useContext(ProfileContext);
  const [goToProfile, setGoToProfile] = useState(false);
  const [logoutState, setLogoutState] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (goToProfile) {
      history.push("/home/profile");
      console.log(skip);
      setGoToProfile(!goToProfile);
    }
    if (logoutState) {
      history.push("/auth");
      setSkip(false);
      setLogoutState(!logoutState);
    }
  }, [goToProfile, logoutState]);

  const logout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    setLogoutState(!logoutState);
  };

  const profile = () => {
    setSkip(true);
    setGoToProfile(!goToProfile);
  };

  return (
    <div className="top_navigation">
      <div className="userProfile">
        <img
          alt="nav_user_img"
          className="nav_user_img"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            userProfileHook.image
          )}`}
        />
        <div className="nav_user_heading">
          <h2 className="nav_profile_name">{userProfileHook.profile_name} </h2>
          <h3 className="nav_username">{userProfileHook.username} </h3>
        </div>
      </div>
      <button
        id="top_navigation_button"
        className="textFontButton"
        onClick={() => history.push("/home")}
      >
        {" "}
        Homepage
      </button>
      <button
        id="top_navigation_button"
        className="textFontButton"
        onClick={profile}
      >
        Profile
      </button>
      <button
        id="top_navigation_button"
        className="textFontButton"
        onClick={() => history.push("/home/explore")}
      >
        {" "}
        Explore
      </button>
      <button
        id="top_navigation_button"
        className="textFontButton"
        onClick={() => setPopUpState(!popUpState)}
      >
        {" "}
        Create Group{" "}
      </button>
      <button
        id="top_navigation_button"
        className="textFontButton logout_button"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default TopNavigation;
