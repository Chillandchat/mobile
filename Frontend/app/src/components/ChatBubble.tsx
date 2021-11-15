import React, { useEffect } from "react";
import { Message } from "./Message";
import "./style/ChatBubble.css";

export const ChatBubble: React.FC = () => {
  return (
    <div id="chatBubble">
      <Message
        user="hi"
        content="hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi"
      />
      <Message content="hi" user="hi" />
      <Message content="hi" user="hi" />
      <Message content="hi" user="hi" />
      <Message content="hi" user="hi" />
      <Message content="hi" user="hi" />
      <Message content="hi" user="hi" />
    </div>
  );
};
