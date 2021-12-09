//Importing packages
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style/LoginPage.css";
import { login } from "../scripts/login";
import { Icon } from "./Icon";
import { LoginForm } from "./LoginForm";
import { ExecuteButton } from "./ExecuteButton";
import { Link, Redirect } from "react-router-dom";
import { RootState } from "../redux/reducers/index";
import {
  login as reduxLogin,
  changeUsername as reduxChangeUsername,
} from "../redux/action";

//Login component
export const Login: React.FC = () => {
  //State
  let [errorMessage, setErrorMessage] = useState<string>("");

  //Redux state
  const authenticated = useSelector((state: RootState): RootState => {
    return state.login;
  });

  //Dispatch
  const dispatch = useDispatch();

  //Data management variables
  let usernameData: string;
  let passwordData: string;

  //Collect username data
  const getUsername = (e: any): void => {
    usernameData = e.target.value;
  };

  //Collect password data
  const getPassword = (e: any): void => {
    passwordData = e.target.value;
  };

  //Render non-authenticated component
  if (!authenticated) {
    return (
      <div id="loginParent">
        {/*Icon*/}
        <Icon />
        <div id="form">
          {/*User name form*/}
          <LoginForm
            formPlaceHolder="Your username"
            password={false}
            onChange={getUsername}
          />
          {/*Password form*/}
          <LoginForm
            formPlaceHolder="Your password"
            password={true}
            onChange={getPassword}
          />
        </div>
        {/*Error message*/}
        <strong id="errorMessage">{errorMessage}</strong>
        <br />

        {/*Sign up link*/}
        <div id="signup">
          <Link to="/signup" id="signupLink">
            <p>New? Sign up today!</p>
          </Link>

          {/*Button*/}
          <ExecuteButton
            text="LET'S GO!!"
            onclick={(): void => {
              //Call login function from login script
              login(usernameData, passwordData).then((isOk: boolean): void => {
                //Check ok status
                if (isOk) {
                  //Change redux state
                  dispatch(reduxLogin());
                  dispatch(reduxChangeUsername(usernameData));
                }
                if (!isOk) {
                  //Display error message
                  console.error(
                    `Uncaught error: Cannot login to ${usernameData} using the provided password and information.`
                  );
                  setErrorMessage(
                    "Your password or username is invalid."
                  );
                  setTimeout((): void => {
                    setErrorMessage("");
                  }, 5000);
                }
              });
            }}
          />
        </div>
      </div>
    );
  }
  //Render authenticated component
  if (authenticated) {
    return (
      <div>
        {/*Redirect*/}
        <Redirect to="/public-chat-room:8080170" />
      </div>
    );
  }
  //Throw error
  else {
    return (
      <div>
        {/*Error message*/}
        <p>Error</p>
      </div>
    );
  }
};
