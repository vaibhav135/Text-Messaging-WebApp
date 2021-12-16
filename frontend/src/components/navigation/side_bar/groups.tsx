import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ReactComponent as ThreeHorizontalDots } from "../../../assets/menu_dots.svg";

import { removerUserFromGroup } from "./group_actions";
import { groupsListType } from "../../home_page/home_page";
import GroupContext from "../../context_provider/group_context";
import { FetchGroupContext } from "../../home_page/home_page";

const Groups = ({
  userId,
  username,
  groupsList,
  setMembersRefresh,
  socket,
  url,
}: {
  userId: null | any;
  username: string;
  groupsList: groupsListType[];
  setMembersRefresh: any;
  socket: any;
  url: string;
}) => {
  const { groupSelected, setGroupSelected } = useContext(GroupContext);
  const [showMenuGroups, setShowMenuGroups] = useState(false);
  const [currentGroupName, setCurrentGroupName] = useState("");
  const { fetchGroup, setFetchGroup, groupRefresh, setGroupRefresh } =
    useContext(FetchGroupContext);

  useEffect(() => {
    if (groupRefresh) {
      setGroupSelected(groupsList[0].name);
      const joinedGroupData = {
        group_name: groupsList[0].name,
        group_id: groupsList[0]._id,
      };
      socket.emit("join_group", joinedGroupData);
      setGroupRefresh(!groupRefresh);
    }
  }, [groupRefresh]);

  console.log("group selected: " + groupSelected);
  return (
    <div className="groupsArea">
      <h1 className="textFont2" id="side_heading">
        {" "}
        groups{" "}
      </h1>
      <ul id="group_ul">
        {groupsList.map((value: any, index: number) => (
          <li
            id="group_li"
            className={groupSelected === value.name ? "active_group" : ""}
            key={index}
            onClick={() => {
              setGroupSelected(value.name);
              const joinedGroupData = {
                group_name: value.name,
                group_id: value._id,
              };
              socket.emit("join_group", joinedGroupData);
              setMembersRefresh();
            }}
            onMouseEnter={() => setCurrentGroupName(value.name)}
            onMouseLeave={() => {
              setCurrentGroupName("");
              setShowMenuGroups(false);
            }}
          >
            {" "}
            <p
              className={
                groupSelected === value.name
                  ? "active_group_name"
                  : "group_name"
              }
            >
              {value.name}{" "}
            </p>{" "}
            <ThreeHorizontalDots
              className={
                groupSelected === value.name
                  ? "active_side_bar_menu_dots"
                  : "side_bar_menu_dots"
              }
              onClick={() => setShowMenuGroups(!showMenuGroups)}
            />
            {showMenuGroups && currentGroupName === value.name ? (
              <div className="group_menu_options_div">
                {" "}
                <ul className="group_menu_options_ul">
                  <li
                    className="group_menu_options_li"
                    onClick={() => {
                      const currentGroup = groupsList.filter(
                        (value) => value.name === currentGroupName
                      );
                      const data: object = {
                        groupId: currentGroup[0]._id,
                        user_id: userId,
                      };
                      removerUserFromGroup(data, url);
                      setFetchGroup(!fetchGroup);
                      setShowMenuGroups(false);
                    }}
                  >
                    leave{" "}
                  </li>
                </ul>
              </div>
            ) : (
              <> </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;
