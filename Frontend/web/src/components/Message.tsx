// Importing packages
import React from "react";
import "./style/Message.css";
import { VerifyCheckMark } from "./VerifyCheckMark";

// Props interface
interface Props {
  user: string;
  content: string;
  verified: boolean;
}

// Message component
export const Message: React.FC<Props> = (props) => {
  // Render verified message
  if (props.verified) {
    return (
      <div id="hero-wrapper">
        {/*Wrapper*/}
        <div id="user-wrapper">
          {/*Username*/}
          <h3 id="heroUser">{props.user}</h3>
          {/*Check mark*/}
          <div id="checkmark">
            <VerifyCheckMark />
          </div>
        </div>
        {/*Content*/}
        <p id="heroContent">{props.content}</p>
      </div>
    );
  }
  // Render message
  return (
    <div id="hero-wrapper">
      {/*Username*/}
      <h3 id="heroUser">{props.user}</h3>
      {/*Content*/}
      <p id="heroContent">{props.content}</p>
    </div>
  );
};
