import React, { useContext } from "react";
import PopUpContext from "../../context_provider/popup_context";
import ExploreContext from "../../context_provider/explore_context";
import { useHistory } from "react-router-dom";

const TopNavigation = (props: any) => {
  const { popUpState, setPopUpState } = useContext(PopUpContext);
  const { setExploreState } = useContext(ExploreContext);
  const history = useHistory();

  const logout = (e: any) => {
    e.preventDefault();
    history.push("/auth");
  };

  const explore = (e: any) => {
    setExploreState(e);
  };

  return (
    <div className="top_navigation">
      <button
        id="top_navigation_button"
        className="textFontButton"
        onClick={() => explore(false)}
      >
        {" "}
        Homepage
      </button>
      <button
        id="top_navigation_button"
        className="textFontButton"
        onClick={() => explore(true)}
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
