// Import packages
import React from "react";
import Icon from "../content/User.png";
import "./style/UserBarIcon.css";

// User bar icon
export const UserBarIcon: React.FC = () => {
  // Render component
  return (
    <div id="wrapper">
      {/*Icon*/}
      <img src={Icon} alt="Error" id="icon" />
    </div>
  );
};
