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
      <div id="heroWrapper">
        {/*Wrapper*/}
        <div id="userWrapper">
          {/*Username*/}
          <h3 id="heroUser">{props.user}</h3>
          {/*Check mark*/}
          <div id="checkMark">
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
    <div id="heroWrapper">
      {/*Username*/}
      <h3 id="heroUser">{props.user}</h3>
      {/*Content*/}
      <p id="heroContent">{props.content}</p>
    </div>
  );
};
