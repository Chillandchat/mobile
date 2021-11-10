import React from "react";
import SendIcon from "@material-ui/icons/Send";
import "./style/SendButton.css";
interface Props {
  onclick: () => void;
}

export const SendButton: React.FC<Props> = (props) => {
  return (
    <div>
      <SendIcon id="sendButton" onClick={props.onclick} />
    </div>
  );
};
