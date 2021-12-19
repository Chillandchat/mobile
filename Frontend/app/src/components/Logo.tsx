// Importing packages
import React from "react";
import logo from "../content/logo.svg";
import "./style/logo.css";

// Logo component
export const Logo: React.FC = () => {
  // Render mobile component
  if (window.innerWidth < 600) return null;
  else {
    // Render component
    return (
      <div id="logoWrapper">
        {/*Logo text*/}
        <h1 id="logoText">{"Chill&chat"}</h1>
        {/*Logo image*/}
        <img src={logo} id="logoImage" />
      </div>
    );
  }
};
