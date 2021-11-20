import { createContext } from "react";
import userData from "../../interface/user_interface";

export const default_user_value = {
  userInfoHook: { id: null, username: "guest" },
  setUserInfoHook: (userStateHook: userData) => {},
};

const LoginContext = createContext(default_user_value);

export default LoginContext;
