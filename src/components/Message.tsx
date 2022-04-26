//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { MessageProps } from "./index.d";
import { AuthType } from "../scripts/index.d";
import Icon from "./Icon";

/**
 * This is the message component, this component will display the message that users send.
 *
 * @prop {MessageType} message The message that the user sent.
 * @prop {string} user The id of the user currently logged in.
 * @prop {Array<AuthType>} roomUserInfo The information about all the users in the room
 */

const Message: React.FC<MessageProps> = (props: MessageProps) => {
  const [userInfo, setUserInfo]: any = React.useState({});

  React.useEffect((): any => {
    let foundUserInfo: boolean = false;

    !foundUserInfo
      ? props.roomUserInfo?.forEach((user: AuthType): void => {
          if (user.username === props.message.user) {
            setUserInfo(user);
            foundUserInfo = true;
          }
        })
      : null;
  });

  const style: any = StyleSheet.create({
    container: {
      alignSelf: props.message.user === props.user ? "flex-end" : "flex-start",
      margin: 20,
      padding: 20,
      backgroundColor:
        props.message.user === props.user ? "#00AD98" : "#E5E5E5",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomRightRadius: props.message.user === props.user ? 0 : 50,
      borderBottomLeftRadius: props.message.user === props.user ? 50 : 0,
    },
    content: {
      fontFamily: "poppins",
      color: props.message.user === props.user ? "white" : "black",
    },
  });

  // TODO: line 58 add positioning to icon component
  return (
    <View style={style.container} key={uuid()}>
      {props.message.user !== userInfo.id ? (
        <View>
          <Icon iconLetter={userInfo.username[0]} color={userInfo.iconColor} />
          <Text
            key={uuid()}
            style={[style.content, { fontFamily: "poppinsBold", fontSize: 18 }]}
          >
            {userInfo.username}
          </Text>
        </View>
      ) : null}
      <Text key={uuid()} style={style.content}>
        {props.message.content}
      </Text>
    </View>
  );
};

export default Message;
