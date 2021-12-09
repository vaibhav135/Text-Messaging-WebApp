import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginRegistrationLayout from "./login_registration_layout";

const LoginLayout = () => {
  const [changePathState, setChangePathState] = useState(false);
  const [path, setPath] = useState("/home");
  const history = useHistory();
  useEffect(() => {
    if (changePathState) {
      history.push(path);
      setChangePathState(!changePathState);
    }
  }, [changePathState]);

  const changePath = () => {
    history.push("/auth/register");
  };

  const changePathToProfile = () => {
    setPath("/home/profile");
    setChangePathState(!changePathState);
  };

  const changePathTohome = () => {
    setPath("/home");
    setChangePathState(!changePathState);
  };

  const footerType = (
    <div id="login_registration_footer">
      {" "}
      don't have an account?{" "}
      <h3 id="switch_register" onClick={changePath}>
        {" "}
        register{" "}
      </h3>{" "}
    </div>
  );
  return (
    <LoginRegistrationLayout
      headingType="login"
      footerType={footerType}
      pathToHome={changePathTohome}
      pathToProfile={changePathToProfile}
    />
  );
};

export default LoginLayout;
