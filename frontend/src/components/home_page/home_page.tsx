import React from "react";
import NoGroupFound from "./no_group_found";
import Members from "../side_bar/members";
import Groups from "../side_bar/groups";
import "./../side_bar/side_bar.css";
import "./home_page.css";

const HomePage = () => {
  const tempTotalGroups: number = 0;

  return (
    <>
      {" "}
      <Groups />
      {tempTotalGroups > 0 ? <> </> : <NoGroupFound />}
      <Members />
    </>
  );
};

export default HomePage;
