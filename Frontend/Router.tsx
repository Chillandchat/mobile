// Importing packages
import { RootState } from "./redux/reducers/index";
import * as reactRedux from "react-redux";
import Home from "./screens/Home";
import Chat from "./screens/Chat";
import CallPrompt from "./screens/CallPrompt";
import Signup from "./screens/Signup";
import Error from "./screens/Error";
import CreateMessage from "./screens/CreateMessage";
import Call from "./screens/Call";
import React from "react";

// Router component
const Router = () => {
  // Router state
  const routerState: RootState = reactRedux.useSelector(
    (state: RootState): RootState => {
      return state.router;
    }
  );

  // Routes
  switch (routerState) {
    case "/":
      // Render Home
      return <Home />;

    case "/chat":
      // Render Chat
      return <Chat />;

    case "/call":
      // Render Call
      return <Call />;

    case "/create-message":
      // Render Create Message
      return <CreateMessage />;

    case "/call-prompt":
      // Render Call Prompt
      return <CallPrompt />;

    case "/signup":
      // Render sign up
      return <Signup />;

    case "/error":
      // Render error
      return <Error />;

    default:
      // Render Home
      return <Home />;
  }
};

// Export router
export default Router;
