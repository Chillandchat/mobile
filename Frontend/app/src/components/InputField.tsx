//Importing packages
import React from "react";
import "./style/InputField.css";

//Props interface
interface Props {
  placeholder: string;
  onChangeEvent: (e) => void;
}

//Input field component
export const InputField: React.FC<Props> = (props) => {
  //Render component
  return (
    <div>
      {/*Input field*/}
      <input
        id="inputField"
        placeholder={props.placeholder}
        onChange={props.onChangeEvent}
      />
    </div>
  );
};
