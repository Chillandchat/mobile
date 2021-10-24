import React from "react";
import "./style/ExecuteButton.css";

interface Props {
  text?: String;
  onclick: () => any;
}

export const ExecuteButton = (props: Props) => {
  return (
    <div>
      <button onClick={props.onclick} id="button">
        {props.text}
      </button>
    </div>
  );
};
