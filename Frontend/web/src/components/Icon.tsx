// Importing packages
import React from "react";
import UserIcon from "../content/User.png";
import "./style/Icon.css";

// Icon component
export const Icon: React.FC = () => {
  // Render component
  return (
    <div>
      {/*Wrapper*/}
      <div id="wrapper">
        {/*Icon*/}
        <img src={UserIcon} id="user-icon" alt="Error" />
      </div>
    </div>
  );
};
