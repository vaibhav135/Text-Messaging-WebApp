import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import LoginRegistrationLayout from "./login_registration_layout";

const LoginRegistrationRoute = () => {
  const [loginState, setLoginState] = useState(false);
  const newPath = loginState ? "/register" : "/login";
  let history = useHistory();
  console.log(history.location.pathname);
  console.log(loginState);

  const changeLoginState = () => {
    setLoginState(!loginState);
  };

  return (
    <Router>
      <Redirect to={newPath} />
      <Switch>
        <Route exact path={newPath}>
          <LoginRegistrationLayout
            loginState={loginState}
            changeLoginState={changeLoginState}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoginRegistrationRoute;
