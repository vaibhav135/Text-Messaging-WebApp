import { createContext } from "react";
import userData from "../../interface/user_interface";

export const default_user_value = {
  userStateHook: { username: "guest", password: "" },
  setUserStateHook: (userStateHook: userData) => {},
  jwtToken: "",
  setJWTtoken: (state: string) => {},
  setLogoutState: (state: boolean) => {},
};

const LoginContext = createContext(default_user_value);

export default LoginContext;
