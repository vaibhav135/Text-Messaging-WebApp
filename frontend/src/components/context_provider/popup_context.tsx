import { createContext } from "react";

const default_popup_state = {
  popUpState: false,
  setPopUpState: (state: boolean) => {},
};

const PopUpContext = createContext(default_popup_state);

export default PopUpContext;
