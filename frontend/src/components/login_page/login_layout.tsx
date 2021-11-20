import { useHistory } from "react-router-dom";

import LoginRegistrationLayout from "./login_registration_layout";

const LoginLayout = () => {
  const history = useHistory();
  const changePath = () => {
    history.push("/auth/register");
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
    <LoginRegistrationLayout headingType="login" footerType={footerType} />
  );
};

export default LoginLayout;
