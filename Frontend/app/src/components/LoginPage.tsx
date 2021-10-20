import React from "react";
import "./style/LoginPage.css";
import { Icon } from "./Icon";
import { LoginForm } from "./LoginForm";

export const Login: React.FC = () => {
  return (
    <div id="loginParent">
      <Icon />
      <LoginForm
        formLable="Username"
        formPlaceHolder="Your username"
        password="false"
      />
      <LoginForm
        formLable="Password"
        formPlaceHolder="Your password"
        password="true"
      />
    </div>
  );
};
