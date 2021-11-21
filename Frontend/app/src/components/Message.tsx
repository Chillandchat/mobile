//Importing packages
import React from "react";
import "./style/Message.css";

//Props interface
interface Props {
  user: string;
  content: string;
}

//Message component
export const Message: React.FC<Props> = (props) => {
  return (
    <div id="heroWrapper">
      {/*Username*/}
      <h3 id="heroUser">{props.user}</h3>
      {/*Content*/}
      <p id="heroContent">{props.content}</p>
    </div>
  );
};
