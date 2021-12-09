import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ReactComponent as ThreeHorizontalDots } from "../../../assets/menu_dots.svg";

import { groupsListType } from "../../home_page/home_page";
import GroupContext from "../../context_provider/group_context";
import { FetchGroupContext } from "../../home_page/home_page";

const Groups = ({
  userId,
  username,
  groupsList,
  setMembersRefresh,
}: {
  userId: null | any;
  username: string;
  groupsList: groupsListType[];
  setMembersRefresh: any;
}) => {
  const { groupSelected, setGroupSelected } = useContext(GroupContext);
  const [showMenuGroups, setShowMenuGroups] = useState(false);
  const [showSpecificGroupMenu, setShowSpecificGroupMenu] = useState("");
  const { fetchGroup, setFetchGroup, groupRefresh, setGroupRefresh } =
    useContext(FetchGroupContext);
  const url: string = process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    if (groupRefresh) {
      setGroupSelected(groupsList[0].name);
      setGroupRefresh(!groupRefresh);
    }
  }, [groupRefresh]);

  const removerUserFromGroup = async () => {
    const currentGroup = groupsList.filter(
      (value) => value.name === showSpecificGroupMenu
    );
    const data = {
      groupId: currentGroup[0]._id,
      user_id: userId,
    };
    await axios
      .delete(`${url}delete/api/removeMember`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${localStorage.getItem("token")}`,
        },
        data,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          console.log("request successful");
        } else {
          console.log(res.data.error);
        }
      });
    setFetchGroup(!fetchGroup);
    setShowMenuGroups(false);
  };

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
              setMembersRefresh();
            }}
            onMouseEnter={() => setShowSpecificGroupMenu(value.name)}
            onMouseLeave={() => {
              setShowSpecificGroupMenu("");
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
            {showMenuGroups && showSpecificGroupMenu === value.name ? (
              <div className="group_menu_options_div">
                {" "}
                <ul className="group_menu_options_ul">
                  <li
                    className="group_menu_options_li"
                    onClick={() => removerUserFromGroup()}
                  >
                    {" "}
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
