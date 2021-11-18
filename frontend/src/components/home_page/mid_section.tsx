import React, { useState } from "react";
import Explore from "../explore/explore";
import NoGroupFound from "./no_group_found";
import ChatArea from "../chat_area/chat_area";
import Groups from "../navigation/side_bar/groups";
import Members from "../navigation/side_bar/members";
import GroupContext from "../context_provider/group_context";

//css in Homepage.css

const MidSection = (props: any) => {
  const { joinedGroupsList } = props;
  console.log(joinedGroupsList);

  //dummy list
  const groupsList = [
    "group1",
    "group2",
    "group3",
    "group4",
    "group5",
    "group6",
    "group7",
    "group8",
    "group9",
    "group10",
    "group11",
    "group12",
    "group13",
    "group14",
    "group15",
    "group16",
    "group17",
    "group18",
    "group19",
    "group20",
  ];

  // test
  if (joinedGroupsList.length < 7) {
    for (let index in groupsList) {
      joinedGroupsList.push(groupsList[index]);
    }
  }
  console.log(joinedGroupsList);
  // delete the code above this

  const [groupSelected, setGroupSelected] = useState(
    joinedGroupsList.length > 0 ? joinedGroupsList[0] : ""
  );

  const group_selected_value = { groupSelected, setGroupSelected };

  return (
    <>
      <GroupContext.Provider value={group_selected_value}>
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
            <Groups groupsList={joinedGroupsList} />
            {props.joinedGroupsList.length > 0 ? (
              <ChatArea />
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
      </GroupContext.Provider>
    </>
  );
};

export default MidSection;
