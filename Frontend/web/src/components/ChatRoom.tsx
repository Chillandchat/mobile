// Importing packages
import React, { useState, useEffect } from "react";
import { InputField } from "./InputField";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/index";
import { Redirect } from "react-router-dom";
import { SendButton } from "./SendButton";
import { UserBar } from "./UserBar";
import { ChatBubble } from "./ChatBubble";
import { send } from "../scripts/send";
import { v4 as uuid } from "uuid";
import { Menu } from "./Menu";
import "./style/ChatRoom.css";
import { askNotification } from "../scripts/askNotify";

// ! TESTING - REMOVE OR COMMENT IN PRODUCTION
//  import { reportUser } from "../scripts/reportUser";

// Chat room component
export const ChatRoom: React.FC = () => {
  // State
  let [view, setView] = useState<boolean>(false);

  // Data management variables
  let textBoxData: string | undefined = undefined;

  // Use effect
  useEffect((): void => {
    // Ask notification permission
    if ("Notification" in window) {
      askNotification();
    }

    // ! TESTING - REMOVE OR COMMENT IN PRODUCTION
    //  reportUser("AlvinC(Team)", "BriannaC(Team)", "TEST");
  });

  // Redux state
  const username = useSelector((state: RootState): RootState => {
    return state.username;
  });
  const authenticated = useSelector((state: RootState): RootState => {
    return state.login;
  });

  // Render user component
  if (view) {
    return (
      <div>
        {/*UserBar*/}
        <UserBar
          viewOnClick={(): void => {
            // Change state
            setView(false);
          }}
        />
      </div>
    );
  }
  // Redirect user if not authenticated
  if (!authenticated) {
    return (
      <div>
        {/*Redirect user*/}
        <Redirect to="/" />
      </div>
    );
  }
  // Render default component
  return (
    <div id="chat-room">
      {/*Menu*/}
      <Menu
        viewOnClick={(): void => {
          // Change state
          setView(true);
        }}
      />
      <ChatBubble />
      {/*Send bar*/}
      <div id="send-bar">
        {/*Input field*/}
        <InputField
          placeholder="Type a message..."
          onChangeEvent={(e: any): void => {
            textBoxData = e.target.value;
          }}
        />
        {/*Send button*/}
        <SendButton
          onclick={(): void => {
            // Send message
            send({
              id: uuid(),
              user: username,
              content: textBoxData,
              verified: null,
            });
          }}
        />
      </div>
    </div>
  );
};
