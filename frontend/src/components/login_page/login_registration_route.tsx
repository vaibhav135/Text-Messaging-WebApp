import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginLayout from "./login_layout";
import RegistrationLayout from "./registration_layout";

const LoginRegistrationRoute = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/auth/login");
  });

  return (
    <>
      <Switch>
        <Route exact path="/auth/login">
          <LoginLayout />
        </Route>
        <Route exact path="/auth/register">
          <RegistrationLayout />
        </Route>
      </Switch>
    </>
  );
};

export default LoginRegistrationRoute;
