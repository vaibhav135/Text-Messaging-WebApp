import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import MidSection from "./mid_section";
import CreateGroup from "../create_group/create_group";
import PopUpContext from "../context_provider/popup_context";
import LoginContext from "../context_provider/login_context";
import TopNavigation from "../navigation/navigation_bar/navigation_bar";
import "./home_page.css";
import "./../navigation/navigation.css";

export type groupsListType = {
  admins: string[];
  createdOn: Date;
  description: string;
  members: string[];
  moderators: string[];
  name: string;
  tags: string[];
  _id: string;
};

const defaultFetchGroupState = {
  fetchGroup: true,
  setFetchGroup: (fetchGroup: boolean) => {},
  groupRefresh: true,
  setGroupRefresh: (groupRefresh: boolean) => {},
};
export const FetchGroupContext = createContext(defaultFetchGroupState);

const HomePage = () => {
  const [popUpState, setPopUpState] = useState<boolean>(false);
  const [fetchGroup, setFetchGroup] = useState(true);
  const [groupRefresh, setGroupRefresh] = useState(false);
  const popUp_value = { popUpState, setPopUpState };
  const [joinedGroupsList, setJoinedGroupsList] = useState<groupsListType[]>(
    []
  );

  const { userInfoHook } = useContext(LoginContext);
  const { id, username } = userInfoHook;

  const fetchGroupValue = {
    fetchGroup,
    setFetchGroup,
    groupRefresh,
    setGroupRefresh,
  };

  const url: string = process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    console.log("groups use effect called...");
    console.log("fetchGroup: " + fetchGroup);
    if (fetchGroup) {
      const fetchGroupFunc = async () => {
        await axios
          .get(`${url}get/api/getUserGroups/${id}`, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            if (res.data.status === "ok") {
              console.log("fetching the groups...");
              setJoinedGroupsList(res.data.data.slice());
              setGroupRefresh(!groupRefresh);
            } else {
              console.log(res.data.error);
            }
          });
      };
      fetchGroupFunc();
      setFetchGroup(!fetchGroup);
    }
  }, [fetchGroup]);

  return (
    <div className="home_page">
      {/*
		 PopUpContext is basically a state for the PopUp page which can be changed
		 throughout the entire DOM using the useContext(PopUpContext). In this case
		 the pop up value changes to either true or false. Which means the popUp page
		 will be visible or invisible.
	  */}

      <PopUpContext.Provider value={popUp_value}>
        <FetchGroupContext.Provider value={fetchGroupValue}>
          {popUpState ? (
            <div className="popup_parent" style={{ display: "block" }}>
              <div className="background_blur"> </div>
              <CreateGroup
                userId={id}
                username={username}
                closeState={() => setPopUpState(!popUpState)}
                setFetchGroup={() => setFetchGroup(!fetchGroup)}
              />
            </div>
          ) : (
            <> </>
          )}

          {/*
		  ExploreContext is similar to PopUpContext. But rather that popping up, it
		  creates an explore page.

		  Explore :- will show the list of groups available that the user can join.

		*/}
          {/*
			TopNavigation is a navigation bar on top of the homepage that contains four
			buttons which are HomePage, Explore, CreateGroup and Logout.
		*/}
          <TopNavigation userId={id} username={username} />
          <MidSection
            userId={id}
            username={username}
            joinedGroupsList={joinedGroupsList}
          />
        </FetchGroupContext.Provider>
      </PopUpContext.Provider>
    </div>
  );
};

export default HomePage;
