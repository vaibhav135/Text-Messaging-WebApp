import React from "react";

const Members = () => {
  const membersList = [
    "member1",
    "member2",
    "member3",
    "member4",
    "member5",
    "member6",
    "member7",
    "member8",
    "member9",
    "member10",
    "member11",
    "member12",
    "member13",
    "member14",
    "member15",
    "member16",
    "member17",
    "member18",
    "member19",
    "member20",
  ];
  return (
    <div className="membersArea">
      <h1 className="textFont2" id="side_heading">
        {" "}
        members{" "}
      </h1>
      <ul id="members_ul">
        {membersList.map((value: string, index: number) => (
          <li id="member_li" key={index}>
            {" "}
            {value}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Members;
