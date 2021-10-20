import React from "react";
import UserIcon from "../content/User.png";
import "./style/Icon.css";
export const Icon: React.FC = () => {
  return (
    <div>
      <div id="wrapper">
        <img src={UserIcon} id="userIcon" />
      </div>
    </div>
  );
};
