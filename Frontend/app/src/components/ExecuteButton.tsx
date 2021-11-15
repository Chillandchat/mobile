//Importing packages
import React, { useRef, useEffect } from "react";
import "./style/ExecuteButton.css";

//Props interface
interface Props {
  text: string;
  onclick: () => any;
}

//ExecuteButton component
export const ExecuteButton: React.FC<Props> = (props) => {
  //Button ref
  const buttonRef: any = useRef(null);

  //Use effect
  useEffect(() => {
    //Button reference
    const element = buttonRef.current;

    //Listeners
    window.addEventListener("keydown", (e) => {
      //Check button click
      /*eslint-disable-next-line*/
      if (e.code == "Enter") element.click();
    });

    //Clean up listeners
    return window.removeEventListener("keydown", () => {});
  }, []);
  //Render component
  return (
    <div>
      {/*Button*/}
      <button onClick={props.onclick} id="button" ref={buttonRef}>
        {props.text}
      </button>
    </div>
  );
};
