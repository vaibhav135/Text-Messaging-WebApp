import { useHistory } from "react-router-dom";
import LoginRegistrationLayout from "./login_registration_layout";

const RegistrationLayout = () => {
  const history = useHistory();
  const changePath = () => {
    history.push("/auth/login");
  };

  const footerType = (
    <div id="login_registration_footer">
      {" "}
      already have an account?
      <h3 id="switch_login" onClick={changePath}>
        {" "}
        login{" "}
      </h3>{" "}
    </div>
  );

  return (
    <LoginRegistrationLayout headingType="register" footerType={footerType} />
  );
};

export default RegistrationLayout;
