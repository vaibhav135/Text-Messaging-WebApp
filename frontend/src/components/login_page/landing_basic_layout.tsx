import LoginRegistrationRoute from "./login_registration_route";
import { BsChatLeftDotsFill } from "react-icons/bs";

const LandingBasicLayout = () => {
  return (
    <div className="landing_page">
      <div className="welcome_div">
        <h1 className="welcome_heading">Welcome to chatter chatter </h1>

        {/* chat icon here */}
        <BsChatLeftDotsFill id="chat_icon" />
      </div>
      {/* login page */}
      <LoginRegistrationRoute />{" "}
    </div>
  );
};

export default LandingBasicLayout;
