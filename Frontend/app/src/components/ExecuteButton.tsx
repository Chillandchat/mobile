//Importing packages
import React from "react";
import "./style/ExecuteButton.css";

//Props interface
interface Props {
  text: string;
  onclick: () => any;
}

//ExecuteButton component
export const ExecuteButton:React.FC<Props> = (props) => {
  //Render component
  return (
    <div>
      {/*Button*/}
      <button onClick={props.onclick} id="button">
        {props.text}
      </button>
    </div>
  );
};

