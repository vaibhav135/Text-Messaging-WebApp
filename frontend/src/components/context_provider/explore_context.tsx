import React, { createContext } from "react";

const default_explore_value = {
  exploreState: false,
  setExploreState: (state: boolean) => {},
};
const ExploreContext = createContext(default_explore_value);

export default ExploreContext;
