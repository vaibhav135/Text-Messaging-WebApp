import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import LoginContext from "../context_provider/login_context";

const LoginRegistrationLayout = (props: any) => {
  const [uname, setUname] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUserInfoHook } = useContext(LoginContext);

  const url: string = "http://localhost:5000/";

  const history = useHistory();

  // changes if the password will be text type or password type
  const changePasswordVisualState = () => {
    setShowPassword(!showPassword);
  };

  const registerSubmitButton = async (e: any) => {
    e.preventDefault();

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

  const loginSubmitButton = async (e: any) => {
    e.preventDefault();
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
    }).then((res) => res.json());

    console.log(res);
    if (res.auth) {
      localStorage.setItem("token", res.data);
      history.push("/home");
      setUserInfoHook({ id: res.id, username: res.username });
    } else {
      setError(res.error);
    }
  };

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
          props.headingType !== "login"
            ? registerSubmitButton
            : loginSubmitButton
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
