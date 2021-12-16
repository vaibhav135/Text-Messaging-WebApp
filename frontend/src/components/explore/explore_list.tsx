import React, { useContext, useState } from "react";
import axios from "axios";
import { ReactComponent as AddUserSVG } from "../../assets/add_person.svg";
import { ReactComponent as UserAddedSVG } from "../../assets/checked.svg";
import {
  removerUserFromGroup,
  addUserToGroup,
} from "../navigation/side_bar/group_actions";
import { FetchGroupContext } from "../home_page/home_page";

const ExploreList = (props: any) => {
  const [groupOption, setGroupOption] = useState(false);
  const [requestSent, setRequestSent] = useState(props.statusType);
  const { fetchGroup, setFetchGroup } = useContext(FetchGroupContext);

  const url: string = process.env.REACT_APP_BACKEND_URL || "";
  console.log("printing...");
  const data: object = {
    groupId: props.value._id,
    user_id: props.userId,
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
              onClick={() => {
                setRequestSent(!requestSent);
                removerUserFromGroup(data, url);
                setFetchGroup(!fetchGroup);
              }}
            />
          ) : (
            <AddUserSVG
              className="explore_option_logo"
              id="addUserSVG"
              onClick={() => {
                setRequestSent(!requestSent);
                addUserToGroup(data, url);
                setFetchGroup(!fetchGroup);
              }}
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
