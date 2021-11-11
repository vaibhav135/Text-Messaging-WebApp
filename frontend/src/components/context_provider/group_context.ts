import React, { createContext } from "react";

const defaultValues = {
  groupSelected: "",
  setGroupSelected: (state: string) => {},
};
const GroupContext = createContext(defaultValues);

export default GroupContext;
