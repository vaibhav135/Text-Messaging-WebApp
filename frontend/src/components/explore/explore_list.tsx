import React, { useContext, useState } from "react";
import axios from "axios";
import { FaUserCheck } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { ReactComponent as AddUserSVG } from "../../assets/add_person.svg";
import { ReactComponent as UserAddedSVG } from "../../assets/checked.svg";

import { FetchGroupContext } from "../home_page/home_page";

const ExploreList = (props: any) => {
  const [groupOption, setGroupOption] = useState(false);
  const [requestSent, setRequestSent] = useState(props.statusType);
  const { fetchGroup, setFetchGroup } = useContext(FetchGroupContext);

  const url: string = process.env.REACT_APP_BACKEND_URL || "";
  console.log("printing...");
  const data = {
    groupId: props.value._id,
    user_id: props.userId,
  };

  const addUserToGroup = async () => {
    console.log("add user to group");
    setRequestSent(!requestSent);
    await axios
      .patch(`${url}patch/api/updateGroupMember`, data, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.status === "ok") {
          console.log("request successful");
        } else {
          console.log(res.data.error);
        }
      });
    setFetchGroup(!fetchGroup);
  };

  const removerUserFromGroup = async () => {
    console.log("remove user from Group");
    setRequestSent(!requestSent);
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
  };

  return (
    <li
      className="explore_li"
      onMouseEnter={() => setGroupOption(true)}
      onMouseLeave={() => setGroupOption(false)}
    >
      {" "}
      <div className="div_section_explore_list">
        <div className="group_heading_div">
          <h1>{props.value.name}</h1>{" "}
        </div>
        {groupOption ? (
          requestSent ? (
            <UserAddedSVG
              className="explore_option_logo"
              id="userAddedSVG"
              onClick={() => removerUserFromGroup()}
            />
          ) : (
            <AddUserSVG
              className="explore_option_logo"
              id="addUserSVG"
              onClick={() => addUserToGroup()}
            />
          )
        ) : (
          <> </>
        )}
      </div>
      <div>
        <p className="groups_list_description">{props.value.description}</p>
        <ul className="tags_list_ul">
          {props.value.tags.map((value: string, index: number) => (
            <li key={index} className="tags_list_li">
              {" "}
              {value}{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </div>
    </li>
  );
};

export default ExploreList;
