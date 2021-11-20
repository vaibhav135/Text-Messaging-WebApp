import React from "react";
import LandingPage from "./components/login_page/landing_page";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  // checking the react version
  console.log(React.version);

  return (
    <Router>
      <div className="App">
        <LandingPage />
      </div>
    </Router>
  );
}

export default App;
