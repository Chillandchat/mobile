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
          onChange={() => console.log("hi")}
        />
        <LoginForm
          password={true}
          formPlaceHolder="Your password"
          formLabel="Password"
          onChange={() => console.log("hi")}
        />
        <LoginForm
          password={true}
          formPlaceHolder="Confirm password"
          formLabel="Password"
          onChange={() => console.log("hi")}
        />
      </div>
      <Link to="/" id="loginLink">
        Have an account? Login Here!
      </Link>
    </div>
  );
};
