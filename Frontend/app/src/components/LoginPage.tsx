//Importing packages
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style/LoginPage.css";
import { login } from "../scripts/login";
import { Icon } from "./Icon";
import { LoginForm } from "./LoginForm";
import { ExecuteButton } from "./ExecuteButton";
import { Link, Redirect } from "react-router-dom";
import { RootState } from "../redux/redux reducers/index";
import {
  login as reduxLogin,
  changeUsername as reduxChangeUsername,
} from "../redux/action";

//Login component
export const Login: React.FC = () => {
  //State
  let [errorMessage, setErrorMessage] = useState("");

  //Redux state
  const authenticated = useSelector((state: RootState) => {
    return state.login;
  });

  //Dispatch
  const dispatch = useDispatch();

  ////console.log(authenticated);
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
            formLabel="Username"
            formPlaceHolder="Your username"
            password={false}
            onChange={getUsername}
          />
          {/*Password form*/}
          <LoginForm
            formLabel="Password"
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
            New? Sign up today!
          </Link>

          {/*Button*/}
          <ExecuteButton
            text="LET'S GO!!"
            onclick={() => {
              //Call login function from login script
              login(usernameData, passwordData).then((isOk) => {
                if (isOk) {
                  dispatch(reduxLogin());
                  dispatch(reduxChangeUsername(usernameData));
                }
                if (!isOk) {
                  console.error(
                    `Uncaught error: Cannot login to ${usernameData} using the provided password and information.`
                  );
                  setErrorMessage(
                    "Oops! We ran into an error, please try again."
                  );
                  setTimeout(() => {
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
  if (authenticated) {
    return (
      <div>
        <Redirect to="/public-chat-room:8080170" />
      </div>
    );
  } else {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }
};
