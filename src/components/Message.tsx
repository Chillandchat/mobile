//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

import { MessageProps } from "./index.d";
import { RootState } from "../redux/index.d";

/**
 * This is the message component, this component will display the message that users send.
 *
 * @prop {MessageType} message The message that the user sent.
 * @prop {string} user The id of the user currently logged in.
 * @prop {Array<AuthType>} roomUserInfo The information about all the users in the room
 */

const Message: React.FC<MessageProps> = (props: MessageProps) => {
  const { username } = useSelector((state: RootState): RootState => {
    return state.userInfo;
  });

  const style: any = StyleSheet.create({
    container: {
      alignSelf: props.message.user === username ? "flex-end" : "flex-start",
      margin: 20,
      padding: 20,
      backgroundColor: props.message.user === username ? "#00AD98" : "#E5E5E5",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomRightRadius: props.message.user === username ? 0 : 50,
      borderBottomLeftRadius: props.message.user === username ? 50 : 0,
    },
    content: {
      fontFamily: "poppins",
      color: props.message.user === username ? "white" : "black",
    },
  });

  return (
    <View style={style.container} key={uuid()}>
      {props.message.user !== username ? (
        <Text
          key={uuid()}
          style={[style.content, { fontFamily: "poppinsBold", fontSize: 18 }]}
        >
          {props.message.user}
        </Text>
      ) : null}
      <Text key={uuid()} style={style.content}>
        {props.message.content}
      </Text>
    </View>
  );
};

export default Message;
