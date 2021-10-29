import React from "react";
import { Icon } from "./Icon";
import { LoginForm } from "./LoginForm";
import { Link } from "react-router-dom";
import "./style/Signup.css";
export const SignUpPage: React.FC = () => {
  return (
    <div id="signupParent">
      <Icon />
      <div id="form">
        <LoginForm
          password={false}
          formPlaceHolder="Your username"
          formLabel="Username"
        />
        <LoginForm
          password={true}
          formPlaceHolder="Your password"
          formLabel="Password"
        />
        <LoginForm
          password={true}
          formPlaceHolder="Confirm password"
          formLabel="Password"
        />
      </div>
      <Link to="/" id="loginLink">
        Have an account? Login Here!
      </Link>
