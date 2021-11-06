import React from "react";
import Explore from "../explore/explore";
import NoGroupFound from "./no_group_found";
import ChatArea from "../chat_area/chat_area";
import Groups from "../navigation/side_bar/groups";
import Members from "../navigation/side_bar/members";

const MidSection = (props: any) => {
  return (
    <>
      {props.exploreState ? (
        <div className="explore_section">
          {/*
					Explore section:
			   	*/}

          <Explore />
        </div>
      ) : (
        <div className="middle_section">
          {/*
				Groups will show the list of groups that the user have joined
			   */}
          <Groups />
          {props.joinedGroupsList.length > 0 ? (
            <div className="chatAreat">
              <ChatArea />{" "}
            </div>
          ) : (
            <NoGroupFound />
          )}
          {/*
				Members components lists total members that have joined the current group
				that the user have selected.
			  */}
          <Members />
        </div>
      )}
    </>
  );
};

export default MidSection;
