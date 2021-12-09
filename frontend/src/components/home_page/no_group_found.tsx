import React, { useContext, useState } from "react";

import PopUpContext from "../context_provider/popup_context";
import ExploreContext from "../context_provider/explore_context";
import { useHistory } from "react-router-dom";

const NoGroupFound = (props: any) => {
  const { popUpState, setPopUpState } = useContext(PopUpContext);
  const { setExploreState } = useContext(ExploreContext);
  const history = useHistory();

  return (
    <div className="noGroupFound">
      <h1 className="textFont1 noGroupHeading">
        {" "}
        Look's like you haven't joined any of the groups yet{" "}
      </h1>{" "}
      <button
        className=".textFontButton buttonGroup"
        onClick={() => history.push("/home/explore")}
      >
        Explore
      </button>
      <h2 className="textFont2">or</h2>
      <button
        className=".textFontButton buttonGroup"
        onClick={() => setPopUpState(!popUpState)}
      >
        {" "}
        Create your own group{" "}
      </button>
    </div>
  );
};

export default NoGroupFound;
