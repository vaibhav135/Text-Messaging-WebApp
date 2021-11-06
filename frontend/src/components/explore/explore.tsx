import React, { useState } from "react";

import ExploreList from "./explore_list";
import FetchAllGroups from "../fetch_data/fetch_all_groups";

//css in homepage.css

const Explore = () => {
  const groups = FetchAllGroups().groups;

  // NOTE:- the copy variable is temporary right now
  const copy = groups[0];

  for (var i = 0; i < 20; i++) {
    groups.push(copy);
  }

  return (
    <div className="explore_div">
      <ul className="explore_ul">
        <h1 className="textFont1 explore_heading"> Community groups </h1>
        {groups.map((value: any, index: number) => (
          <ExploreList value={value} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Explore;
