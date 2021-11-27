import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import axios from "axios";

import LoginContext from "../context_provider/login_context";
import { ProfileContext } from "../context_provider/profile_context";

const LoginRegistrationLayout = (props: any) => {
  const [uname, setUname] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //const [refreshPage, setRefreshPage] = useState(false);
  const [registerState, setRegisterState] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [profileState, setProfileState] = useState(false);

  const { userInfoHook, setUserInfoHook } = useContext(LoginContext);
  const { userProfileHook, setUserProfileHook, skip, setSkip } =
    useContext(ProfileContext);

  const url: string = process.env.REACT_APP_BACKEND_URL || "";
  const history = useHistory();

  //useEffect(() => {
  //if (refreshPage) {
  //setRefreshPage(!refreshPage);
  //}
  //}, [refreshPage]);

  useEffect(() => {
    if (registerState) {
      const registerSubmitButton = async () => {
        // creating a new user and then assigning that user
        // data to the setUserStateHook

        const newUser = {
          username: uname,
          password: password,
        };
        const res = await fetch(`${url}post/api/addUser`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log("result: ", result);
            console.log("url: ", result.url);
            if (result.status === "ok") {
              setSuccess(true);
              setUname("");
              setPassword("");
            }
            if (result.status === "error") {
              setError(result.error);
            }
          })
          .catch((error: any) => {
            console.log("error: ", error);
          });
      };
      registerSubmitButton();
      setRegisterState(!registerState);
    }
  }, [registerState]);

  useEffect(() => {
    if (profileState) {
      const getProfile = async () => {
        const res = await axios
          .get(`${url}get/api/getUserProfile/${userInfoHook.id}`, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              const result = res.data.data;
              const username = result.username;
              const user_id = result.user_id;
              const profile_name = result.profile_name;
              const gender = result.gender;
              const hobbies = result.hobbies;
              const image = result.image;
              const social_media = result.Social_media;

              if (
                profile_name.length !== "Anonymous" &&
                gender.length > 0 &&
                hobbies.length > 0
              ) {
                setSkip(true);
              }
              setUserProfileHook({
                userId: user_id,
                username: username,
                profile_name: profile_name,
                gender: gender,
                image: image,
                hobbies: hobbies,
                social_media: social_media,
              });
              if (skip) {
                console.log("hello home");
                props.pathToHome();
              } else {
                console.log("hello profile");
                props.pathToProfile();
              }
            } else {
              console.log(res.statusText);
            }
            setProfileState(!profileState);
          });
      };
      getProfile();
    }
  }, [profileState]);

  useEffect(() => {
    if (loginState) {
      const loginSubmitButton = async () => {
        const userLogin = {
          username: uname,
          password: password,
        };

        const res = await fetch(`${url}post/api/loginUser`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(userLogin),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.auth) {
              console.log(result);
              setUserInfoHook({
                id: result.id,
                username: result.username,
              });
              localStorage.setItem("token", result.data);
              setProfileState(!profileState);
            } else {
              setError(result.error);
            }
          });

        //console.log(res);
      };
      loginSubmitButton();
      setLoginState(!loginState);
    }
  }, [loginState]);

  const changeLoginState = (e: any) => {
    e.preventDefault();
    setLoginState(!loginState);
  };

  const changeRegisterState = (e: any) => {
    e.preventDefault();
    setRegisterState(!registerState);
  };

  // changes if the password will be text type or password type
  const changePasswordVisualState = () => {
    setShowPassword(!showPassword);
  };

  //const getProfile = async (value: string) => {
  //console.log(`username: ${userInfoHook.username} \n id: ${userInfoHook.id}`);
  //const res = await axios
  //.get(`${url}get/api/getUserProfile/${value}`, {
  //headers: {
  //"Content-Type": "application/json",
  //"x-access-token": `Bearer ${localStorage.getItem("token")}`,
  //},
  //})
  //.then((res) => {
  //console.log(res);
  //if (res.status === 200) {
  //const result = res.data.data;
  //const username = result.username;
  //const user_id = result.user_id;
  //const profile_name = result.profile_name;
  //const gender = result.gender;
  //const hobbies = result.hobbies;
  //const image = result.image;
  //const social_media = result.Social_media;

  //if (
  //profile_name.length !== "Anonymous" &&
  //gender.length > 0 &&
  //hobbies.length > 0
  //) {
  //setSkip(true);
  //}
  //setUserProfileHook({
  //userId: user_id,
  //username: username,
  //profile_name: profile_name,
  //gender: gender,
  //image: image,
  //hobbies: hobbies,
  //social_media: social_media,
  //});
  //if (skip) {
  //console.log("hello home");
  //history.push("/home");
  //} else {
  //console.log("hello profile");
  //history.push("/home/profile");
  //}
  //} else {
  //console.log(res.statusText);
  //}
  //});
  //};

  return (
    <div className="login_box">
      <h1 className="join_heading textFont1"> {props.headingType} </h1>
      {error === "" ? (
        <> </>
      ) : (
        <h3 className="registrationLoginError textFont3"> {error} </h3>
      )}
      {success ? (
        <h3 className="registrationSuccess textFont3">
          {" "}
          User successfully registered{" "}
        </h3>
      ) : (
        <> </>
      )}
      <form
        className="login_form"
        onSubmit={
          props.headingType !== "login" ? changeRegisterState : changeLoginState
        }
      >
        <label htmlFor="uname" className="label1 textFont3">
          username{" "}
        </label>
        <input
          type="text"
          id="uname_id"
          name="uname"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          autoFocus
          required
          autoComplete="off"
        />{" "}
        <label htmlFor="password" className="label2 textFont3">
          {" "}
          password{" "}
        </label>
        <div id="password_div">
          <input
            type={showPassword ? "text" : "password"}
            id="password_id"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showPassword ? (
            <FaEye id="eye_logo" onClick={changePasswordVisualState} />
          ) : (
            <FaEyeSlash id="eye_logo" onClick={changePasswordVisualState} />
          )}
        </div>
        {props.footerType}
        <input
          type="submit"
          className="submit_button textFontButton"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default LoginRegistrationLayout;
