import React from "react";
import "./style/Message.css";

interface Props {
  user: string;
  content: string;
}

export const Message: React.FC<Props> = (props) => {
  return (
    <div id="heroWrapper">
      <h3 id="heroUser">{props.user}</h3>
      <p id="heroContent">{props.content}</p>
    </div>
  );
};
