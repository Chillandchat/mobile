// Importing packages
import React from "react";
import SendIcon from "@material-ui/icons/Send";
import "./style/SendButton.css";

// Props interface
interface Props {
  onclick: () => void;
}

// Send button component
export const SendButton: React.FC<Props> = (props) => {
  // Render button component
  return (
    <div>
      {/*Send Icon*/}
      <SendIcon id="sendButton" onClick={props.onclick} />
    </div>
  );
};
