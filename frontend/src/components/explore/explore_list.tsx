import React, { useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { IconContext } from "react-icons/lib";

const ExploreList = (props: any) => {
  const [groupOption, setGroupOption] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  return (
    <li
      className="explore_li"
      onMouseEnter={() => setGroupOption(true)}
      onMouseLeave={() => setGroupOption(false)}
    >
      {" "}
      <div className="div_section_explore_list">
        <h1>{props.value.name}</h1>{" "}
        {groupOption ? (
          !requestSent ? (
            <IconContext.Provider
              value={{
                color: "#0077B6",
                size: "25px",
                className: "explore_option_logo",
              }}
            >
              <IoMdPersonAdd onClick={() => setRequestSent(!requestSent)} />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{
                color: "#079465",
                size: "25px",
                className: "explore_option_logo",
              }}
            >
              <FaUserCheck onClick={() => setRequestSent(!requestSent)} />
            </IconContext.Provider>
          )
        ) : (
          <> </>
        )}
      </div>
      {props.value.description}
    </li>
  );
};

export default ExploreList;
