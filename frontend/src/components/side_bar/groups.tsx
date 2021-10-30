import React from "react";

const Groups = () => {
  const groupsList = [
    "group1",
    "group2",
    "group3",
    "group4",
    "group5",
    "group6",
    "group7",
  ];

  return (
    <div className="groupsArea">
      <aside>
        <h1> this will be the group area </h1>
        <ul>
          {groupsList.map((value: string, index: number) => (
            <li key={index}> {value} </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Groups;
