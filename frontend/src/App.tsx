import React from "react";
import UserState from "./user_state";
import userData from "./interface/user_interface";
import "./App.css";

function App() {
  // checking the react version
  console.log(React.version);

  return (
    <div className="App">
      <UserState />
    </div>
  );
}

export default App;
