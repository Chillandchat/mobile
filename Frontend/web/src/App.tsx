// Importing packages
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import { ChatRoom } from "./components/ChatRoom";
import "./App.css";

// Main app component
const App: React.FC = () => {
  return (
    <div className="app">
      {/*Browser router*/}
      <BrowserRouter>
        <Switch>
          {/*Login route*/}
          <Route path="/" component={Login} exact />
          {/*SignUp route*/}
          <Route exact path="/signup" component={SignUpPage} />
          {/*Chat room route*/}
          <Route exact path="/public-chat-room:8080170" component={ChatRoom} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

// Export component
export default App;
