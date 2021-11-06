import React, { useContext } from "react";
import LoginLayout from "./login_layout";
import HomePage from "../home_page/home_page";
import LoginContext from "../context_provider/login_context";
import { BsChatLeftDotsFill } from "react-icons/bs";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./login_page.css";

const LandingPage = () => {
  // typeof contextValue => object
  const contextValue = useContext(LoginContext);

  console.log(contextValue.userStateHook.username);
  let login_check = contextValue.userStateHook.username === "guest";

  return (
    <Router>
      <Switch>
        {login_check ? (
          <Route path="/login">
            <div className="landing_page">
              <div className="welcome_div">
                <h1 className="welcome_heading">Welcome to chatter chatter </h1>

                {/* chat icon here */}
                <BsChatLeftDotsFill id="chat_icon" />
              </div>
              {/* login page */}
              <LoginLayout />{" "}
            </div>
          </Route>
        ) : (
          <Route path="/home">
            {/*
				Route path ="/home"  will take us to the homepage if the path is set to /home
			*/}
            <HomePage />{" "}
          </Route>
        )}

        {/*
			- Redirecting the path to either /login or /home depending upon the state
			  of login_check<boolean>. if login_check is true then that means we need to be logged in

			- Using push here in Redirect will push a new path to the stack in history
		*/}

        <Redirect to={login_check ? "/login" : "/home"} />
      </Switch>
    </Router>
  );
};

export default LandingPage;

// commenting in inside of jsx =>   {/* comment */}
