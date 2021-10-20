//Importing packages
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import "./App.css";

//Main app component
const App = () => {
  return (
    <div className="App">
      {/*Browser router*/}
      <BrowserRouter>
        <Switch>
          {/*Login route*/}
          <Route path="/" component={Login} exact />
          {/*SignUp route*/}
          <Route
            exact
            path="/signup&index=RCA@IAAgADASIAA#h%EBAxEB/8QAHwAAA%QUBAQEBAQEA"
            component={SignUpPage}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

//Export compoent
export default App;
