import { useState, useContext } from "react";
import GroupContext from "../../context_provider/group_context";

const Groups = ({
  userId,
  username,
  groupsList,
}: {
  userId: null | any;
  username: string;
  groupsList: string[];
}) => {
  // TODO:- currently I've selected the first group as group selected later when,
  // i'll connect the frontend to the backend then. I'll create a variable named
  // group_selected in the the database which will basically tell, what group I
  // selected at last time when the user was logged in.
  //
  //
  //
  //console.log(groupsList);
  const { groupSelected, setGroupSelected } = useContext(GroupContext);

  return (
    <div className="groupsArea">
      <h1 className="textFont2" id="side_heading">
        {" "}
        groups{" "}
      </h1>
      <ul id="group_ul">
        {groupsList.map((value: string, index: number) => (
          <li
            id="group_li"
            className={groupSelected === value ? "active_group" : ""}
            key={index}
            onClick={() => setGroupSelected(groupsList[index])}
          >
            {" "}
            {value}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;
