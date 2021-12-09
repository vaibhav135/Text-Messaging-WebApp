import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Explore from "../explore/explore";
import Profile from "../profile/profile";
import NoGroupFound from "./no_group_found";
import ChatArea from "../chat_area/chat_area";
import Groups from "../navigation/side_bar/groups";
import Members from "../navigation/side_bar/members";
import GroupContext from "../context_provider/group_context";

//css in Homepage.css

const MidSection = (props: any) => {
  //membersRefresh basically refreshes the members list every time the
  //user clicks on the groups from grouplist to loads a specific group
  const [membersRefresh, setMembersRefresh] = useState(true);

  // if there are no selected groups the value will be empty.
  // If there exist some group then initially the slected group will be
  // group[0] later it will be the group that the user clicked
  // upon
  const [groupSelected, setGroupSelected] = useState<string>("");
  const group_selected_value = { groupSelected, setGroupSelected };
  const url: string = process.env.REACT_APP_BACKEND_URL || "";

  return (
    <GroupContext.Provider value={group_selected_value}>
      <Switch>
        <Route exact path="/home/explore">
          <div className="explore_section">
            <Explore userId={props.userId} username={props.username} />
          </div>
        </Route>
        <Route path="/home/profile">
          <Profile />
        </Route>
        <Route exact path="/home">
          <div className="middle_section">
            {/*
				Groups will show the list of groups that the user have joined
			   */}
            {props.joinedGroupsList.length > 0 ? (
              <>
                <Groups
                  userId={props.userId}
                  username={props.username}
                  groupsList={props.joinedGroupsList}
                  setMembersRefresh={() => setMembersRefresh(!membersRefresh)}
                />
                <ChatArea userId={props.userId} username={props.username} />
                <Members
                  groupsList={props.joinedGroupsList}
                  userId={props.userId}
                  username={props.username}
                  membersRefresh={membersRefresh}
                  setMembersRefresh={() => setMembersRefresh(!membersRefresh)}
                />
              </>
            ) : (
              <NoGroupFound />
            )}
            {/*
				Members components lists total members that have joined the current group
				that the user have selected.
			  */}
          </div>
        </Route>
      </Switch>
    </GroupContext.Provider>
  );
};

export default MidSection;
