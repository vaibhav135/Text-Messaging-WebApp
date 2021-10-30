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
  ];
  return (
    <div className="membersArea">
      <aside>
        <h1> this will be the members area </h1>
        <ul>
          {membersList.map((value: string, index: number) => (
            <li key={index}> {value} </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Members;
