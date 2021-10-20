//Importing packages
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "./components/LoginPage";
import "./App.css";

//Main app component
const App = () => {
  return (
    <div className="App">
      {/*Browser router*/}
      <BrowserRouter>
        <Switch>
          {/*Login route*/}
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

//Export compoent
export default App;
