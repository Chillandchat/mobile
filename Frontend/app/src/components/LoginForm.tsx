//Importing packages
import React from "react";
import "./style/LoginForm.css";

//Props interface properties
interface Props {
  formPlaceHolder: string;
  formLabel: string;
  password: string;
}

//Login form component
export const LoginForm: React.FC<Props> = (props) => {
  //Conditional component rendering
  if (props.password === "true") {
    return (
      <div id="container">
        {/*Label*/}
        <p id="label">{props.formLabel}</p>
        {/*Input box*/}
        <input
          placeholder={props.formPlaceHolder}
          id="textBox"
          type="password"
        />
      </div>
    );
  } else {
    return (
      <div id="container">
        {/*Label*/}
        <p id="label">{props.formLabel}</p>
        {/*Input box*/}
        <input placeholder={props.formPlaceHolder} id="textBox" />
      </div>
    );
  }
};
