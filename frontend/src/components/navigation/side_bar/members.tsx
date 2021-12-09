import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import GroupContext from "../../context_provider/group_context";
const Members = (props: any) => {
  const { groupSelected, setGroupSelected } = useContext(GroupContext);
  const [adminsData, setAdminsData] = useState<any[]>([]);
  const [moderatorsData, setModeratorsData] = useState<any[]>([]);
  const [membersData, setMembersData] = useState<any[]>([]);

  const url: string = process.env.REACT_APP_BACKEND_URL || "";
  let arr = [];

  useEffect(() => {
    if (props.membersRefresh && groupSelected.length > 0) {
      arr = props.groupsList.filter(
        (value: any) => value.name === groupSelected
      );
      const data = {
        admins: arr[0].admins,
        moderators: arr[0].moderators,
        members: arr[0].members,
      };
      //console.log("data:");
      //console.log(data);
      const fetchMembers = async () => {
        await axios
          .post(`${url}post/api/getMembersData`, data, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            if (res.data.status === "ok") {
              //console.log("fetch the members");
              const memData = res.data.data;
              //console.log(memData);
              setAdminsData(memData.admin_data);
              setModeratorsData(memData.moderators_data);
              setMembersData(memData.members_data);
            } else {
              console.log(res.data.message);
            }
          });
      };
      fetchMembers();
      //setInitialState(!initialState);
      props.setMembersRefresh();
    }
  }, [props.membersRefresh, groupSelected]);
  return (
    <div className="membersArea">
      <h1 className="textFont2" id="side_heading">
        {" "}
        members{" "}
      </h1>
      {adminsData.length > 0 &&
      moderatorsData.length > 0 &&
      membersData.length > 0 ? (
        <>
          <h2 id="members_subheading">admins</h2>
          <ul id="members_ul">
            {adminsData[0].map((value: any, index: number) => (
              <li id="member_li" key={index}>
                {" "}
                <img
                  id="members_image"
                  alt="admin_image"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    value.image
                  )}`}
                />
                {value.profile_name}{" "}
              </li>
            ))}
          </ul>
          <h2 id="members_subheading">moderators</h2>
          <ul id="members_ul">
            {moderatorsData[0].map((value: any, index: number) => (
              <li id="member_li" key={index}>
                {" "}
                <img
                  id="members_image"
                  alt="admin_image"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    value.image
                  )}`}
                />
                {value.profile_name}{" "}
              </li>
            ))}
          </ul>
          <h2 id="members_subheading">members</h2>
          <ul id="members_ul">
            {membersData[0].map((value: any, index: number) => (
              <li id="member_li" key={index}>
                {" "}
                <img
                  id="members_image"
                  alt="admin_image"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    value.image
                  )}`}
                />
                {value.profile_name}{" "}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Members;
//<li id="member_li" key={index}>
//{" "}
//{value.profile_name}{" "}
//</li>
