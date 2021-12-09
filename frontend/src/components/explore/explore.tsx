import React, { useContext, useEffect, useState } from "react";

import ExploreList from "./explore_list";
import LoginContext from "../context_provider/login_context";
import FetchAllGroups from "../fetch_data/fetch_all_groups";

//css in homepage.css

const Explore = (props: any) => {
  const [groups, setGroups] = useState<[]>();
  const [initialState, setInitialState] = useState(true);
  const { userInfoHook } = useContext(LoginContext);

  console.log("explore");
  useEffect(() => {
    if (initialState) {
      const getAllGroups = async () => {
        await FetchAllGroups().then((res: any) => {
          if (res.data.status === "ok") {
            setGroups(res.data.data);
          } else {
            console.log(res.data.message);
          }
        });
      };
      getAllGroups();
      setInitialState(!initialState);
    }
  }, [initialState, groups]);

  return (
    <div className="explore_div">
      <ul className="explore_ul">
        <h1 className="textFont1 explore_heading"> Community groups </h1>

        {groups !== undefined ? (
          groups.map((value: any, index: number) => (
            <ExploreList
              statusType={value.members.includes(userInfoHook.id)}
              value={value}
              key={index}
              userId={props.userId}
            />
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default Explore;
