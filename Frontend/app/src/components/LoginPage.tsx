//Importing packages
import React from "react";
import "./style/LoginPage.css";
import login from "../scripts/login.js";
import { Icon } from "./Icon";
import { LoginForm } from "./LoginForm";
import { ExecuteButton } from "./ExecuteButton";
import { Credit } from "./Credit";
import { Link } from "react-router-dom";

//Login component
export const Login: React.FC = () => {
  //Render component
  return (
    <div id="loginParent">
      {/*Icon*/}
      <Icon />
      {/*User name form*/}
      <LoginForm
        formLabel="Username"
        formPlaceHolder="Your username"
        password="false"
      />
      {/*Password form*/}
      <LoginForm
        formLabel="Password"
        formPlaceHolder="Your password"
        password="true"
      />
      {/*Sign up form*/}
      <div id="signup">
        <Link
          to="/signup&index=RCA@IAAgADASIAA#h%EBAxEB/8QAHwAAA%QUBAQEBAQEA"
          id="signupLink"
        >
          New? Sign up today!
        </Link>
        {/*Button*/}
        <ExecuteButton
          onclick={() => {
            login();
          }}
        />
      </div>
      {/*Credit*/}
      <Credit />
    </div>
  );
};
