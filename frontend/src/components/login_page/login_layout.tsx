import React, { useState, useContext } from "react";
import LoginContext from "../context_provider/login_context";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginLayout = () => {
  const { userStateHook, setUserStateHook } = useContext(LoginContext);

  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // changes if the password will be text type or password type
  const changePasswordVisualState = () => {
    setShowPassword(!showPassword);
  };

  const submitButton = (e: any) => {
    e.preventDefault();

    // creating a new user and then assigning that user
    // data to the setUserStateHook

    const newUser = {
      username: uname,
      password: password,
    };

    setUserStateHook(newUser);
  };

  return (
    //<div className="parent_login_box">
    <div className="login_box">
      <h1 className="join_heading textFont1"> Join </h1>
      <form className="login_form" onSubmit={submitButton}>
        <label htmlFor="uname" className="label1 textFont3">
          username{" "}
        </label>
        <br />
        <input
          type="text"
          id="uname_id"
          name="uname"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          autoFocus
          required
        />{" "}
        <br />
        <label htmlFor="password" className="label2 textFont3">
          {" "}
          password{" "}
        </label>
        <br />
        <div>
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
        <br />
        <input
          type="submit"
          className="submit_button textFontButton"
          value="Submit"
        />
      </form>
    </div>
    //</div>
  );
};

export default LoginLayout;
