/******************************************
//! Work in progress
******************************************/

//Importing packages
import React from "react";
import { useSelector } from "react-redux";
import "./style/LoginPage.css";
import login from "../scripts/login";
import { Icon } from "./Icon";
import { LoginForm } from "./LoginForm";
import { ExecuteButton } from "./ExecuteButton";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { RootState } from "../redux/reducers/index";
//Login component
export const Login: React.FC = () => {
  const authenticated = useSelector((state: RootState) => {
    return state.login;
  });
  console.log(authenticated);
  //Data management variables
  let usernameData: string;
  let passwordData: string;

  //Collect username data
  const getUsername = (e: any) => {
    usernameData = e.target.value;
  };

  //Collect password data
  const getPassword = (e: any) => {
    passwordData = e.target.value;
  };

  //Render non-authenticated component
  if (!authenticated) {
    return (
      <div id="loginParent">
        {/*Icon*/}
        <Icon />
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

        {/*Sign up form*/}
        <div id="signup">
          <Link to="/signup" id="signupLink">
            New? Sign up today!
          </Link>
          {/*Button*/}
          <ExecuteButton
            text="LET'S GO!!"
            onclick={() => {
              //Call login function from login script
              login(usernameData, passwordData);
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
