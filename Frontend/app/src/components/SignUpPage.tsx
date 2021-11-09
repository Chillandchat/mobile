//Importing packages
import React, { useState } from "react";
import { Icon } from "./Icon";
import { LoginForm } from "./LoginForm";
import { Link, Redirect } from "react-router-dom";
import { ExecuteButton } from "./ExecuteButton";
import { signUp } from "../scripts/signUp";
import "./style/Signup.css";

//Sign up component
export const SignUpPage: React.FC = () => {
  //State
  let [errorMessage, setErrorMessage] = useState("");
  let [ok, setOk] = useState(false);

  //Data management variables
  let usernameData: string;
  let passwordData: string;
  let passwordConfirmData: string;

  //Collect username data
  const getUsername = (e: any): void => {
    usernameData = e.target.value;
  };
  //Collect password data
  const getPassword = (e: any): void => {
    passwordData = e.target.value;
  };

  //Collect password confirm data
  const getPasswordConfirm = (e: any): void => {
    passwordConfirmData = e.target.value;
  };

  //Render signup component
  if (!ok) {
    return (
      <div id="signupParent">
        {/*Icon*/}
        <Icon />
        {/*Form wrapper*/}
        <div id="form">
          {/*Username input box*/}
          <LoginForm
            password={false}
            formPlaceHolder="Your username"
            formLabel="Username"
            onChange={getUsername}
          />
          {/*Password input box*/}
          <LoginForm
            password={true}
            formPlaceHolder="Your password"
            formLabel="Password"
            onChange={getPassword}
          />
          {/*Password confirm input box*/}
          <LoginForm
            password={true}
            formPlaceHolder="Confirm password"
            formLabel="Password"
            onChange={getPasswordConfirm}
          />
        </div>
        {/*Error message*/}
        <strong id="errorMessage">{errorMessage}</strong>
        <br />
        {/*Login link*/}
        <Link to="/" id="loginLink">
          Have an account? Login Here!
        </Link>
        {/*Execute button*/}
        <ExecuteButton
          onclick={() => {
            //Call sign up function from signup script
            signUp(usernameData, passwordData, passwordConfirmData).then(
              (data) => {
                //Throw error is an error occurred
                if (data) setOk(true);
                else {
                  //Throw error
                  setErrorMessage(
                    "Oops! we ran into an error, please try again."
                  );
                  setTimeout(() => {
                    setErrorMessage("");
                  }, 5000);
                }
              }
            );
          }}
          text="SIGN UP!"
        />
      </div>
    );
  }
  //Render redirect component
  if (ok) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
};
