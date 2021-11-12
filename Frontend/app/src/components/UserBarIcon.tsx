import React from "react";
import Icon from "../content/User.png";
import "./style/UserBarIcon.css";


export const UserBarIcon: React.FC = () => {
  return (
    <div id="wrapper">
      <img src={Icon} alt="Error" id="icon" />
    </div>
  );
};
