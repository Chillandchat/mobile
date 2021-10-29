//Importing packages
import React from "react";
import "./style/LoginForm.css";

//Props interface
interface Props {
  formPlaceHolder: string;
  formLabel: string;
  password:Boolean;
}

//Login form component
export const LoginForm:React.FC<Props> = (props) => {
  //Password form 
  if (props.password) {

    return (
      <div id="container">
        {/*Label*/}
        <p id="label">{props.formLabel}</p>
        {/*Form*/}
        <input
          placeholder={props.formPlaceHolder}
          id="textBox"
          type="password"
        />
      </div>
    );

  } 
  //Non-password form
  else {
    return (
      <div id="container">
        {/*Label*/}
        <p id="label">{props.formLabel}</p>
         {/*Form*/}
        <input placeholder={props.formPlaceHolder} id="textBox" />
      </div>
    );
  }
};
