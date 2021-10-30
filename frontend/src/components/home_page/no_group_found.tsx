import React from "react";

const NoGroupFound = () => {
  return (
    <div className="noGroupFound">
      <h1 className="textFont1 headingGroup">
        {" "}
        Look's like you haven't joined any of the groups yet{" "}
      </h1>{" "}
      <button className=".textFontButton buttonGroup">Explore</button>
      <h3 className="textFont2">or</h3>
      <button className=".textFontButton buttonGroup">
        {" "}
        Create your own group{" "}
      </button>
    </div>
  );
};

export default NoGroupFound;
