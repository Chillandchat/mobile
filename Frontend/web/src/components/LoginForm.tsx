// Importing packages
import React from "react";
import "./style/LoginForm.css";

// Props interface
interface Props {
  formPlaceHolder: string;
  password: boolean;
  onChange: any;
}

// Login form component
export const LoginForm: React.FC<Props> = (props) => {
  // Render password form
  if (props.password) {
    return (
      <div id="container">
        {/*Form*/}
        <input
          placeholder={props.formPlaceHolder}
          id="text-box"
          type="password"
          onChange={props.onChange}
        />
      </div>
    );
  }
  // Render non-password form
  else {
    return (
      <div id="container">
        {/*Form*/}
        <input
          placeholder={props.formPlaceHolder}
          id="text-box"
          onChange={props.onChange}
        />
      </div>
    );
  }
};
