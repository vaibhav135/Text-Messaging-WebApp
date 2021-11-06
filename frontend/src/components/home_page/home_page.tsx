import React, { useState } from "react";

import MidSection from "./mid_section";
import Explore from "../explore/explore";
import CreateGroup from "../create_group/create_group";
import PopUpContext from "../context_provider/popup_context";
import ExploreContext from "../context_provider/explore_context";
import FetchGroupsJoined from "../fetch_data/fetch_groups_joined";
import TopNavigation from "../navigation/navigation_bar/navigation_bar";

import "./home_page.css";
import "./../navigation/navigation.css";

const HomePage = () => {
  const [popUpState, setPopUpState] = useState<boolean>(false);
  const [exploreState, setExploreState] = useState<boolean>(false);
  const popUp_value = { popUpState, setPopUpState };
  const explore_value = { exploreState, setExploreState };

  const joinedGroupsList = FetchGroupsJoined;

  return (
    <div className="home_page">
      {/*
		 PopUpContext is basically a state for the PopUp page which can be changed
		 throughout the entire DOM using the useContext(PopUpContext). In this case
		 the pop up value changes to either true or false. Which means the popUp page
		 will be visible or invisible.
	  */}

      <PopUpContext.Provider value={popUp_value}>
        {popUpState ? (
          <div className="popup_parent" style={{ display: "block" }}>
            <div className="background_blur"> </div>
            <CreateGroup closeState={() => setPopUpState(!popUpState)} />
          </div>
        ) : (
          <> </>
        )}

        {/*
		  ExploreContext is similar to PopUpContext. But rather that popping up, it
		  creates an explore page.

		  Explore :- will show the list of groups available that the user can join.

		*/}
        <ExploreContext.Provider value={explore_value}>
          {/*
			TopNavigation is a navigation bar on top of the homepage that contains four
			buttons which are HomePage, Explore, CreateGroup and Logout.
		*/}
          <TopNavigation />
          <MidSection
            exploreState={exploreState}
            joinedGroupsList={joinedGroupsList}
          />
        </ExploreContext.Provider>
      </PopUpContext.Provider>
    </div>
  );
};

export default HomePage;
