import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

import { MessageProps } from "./index.d";
import { RootState } from "../redux/index.d";
import Icon from "./Icon";
import { AuthType } from "../scripts/index.d";

/**
 * This is the message component, this component will display the message that users send.
 *
 * @prop {MessageType} message The message that the user sent.
 * @prop {AuthType} messageUserInfo The information about all the users in the room
 */

const Message: React.FC<MessageProps> = (props: MessageProps) => {
  const { userInfo }: any = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );

  const style: any = StyleSheet.create({
    container: {
      alignSelf:
        props.message.user === userInfo.username ? "flex-end" : "flex-start",
      margin: 10,
      marginLeft: props.message.user === userInfo.username ? 0 : 60,
      padding: 20,
      backgroundColor:
        props.message.user === userInfo.username ? "#00AD98" : "#E5E5E5",
      borderTopLeftRadius: props.message.user === userInfo.username ? 50 : 0,
      borderTopRightRadius: props.message.user === userInfo.username ? 35 : 50,
      borderBottomRightRadius:
        props.message.user === userInfo.username ? 0 : 50,
      borderBottomLeftRadius:
        props.message.user !== userInfo.username ? 35 : 50,
    },
    content: {
      fontFamily: "poppins",
      color: props.message.user === userInfo.username ? "white" : "black",
    },
    icon: {
      marginBottom: -30,
    },
  });

  return (
    <View>
      {props.message.user !== userInfo.username ? (
        <View style={style.icon}>
          <Icon
            color={props.messageUserInfo.iconColor}
            iconLetter={props.messageUserInfo.username[0]}
            size={50}
          />
        </View>
      ) : null}
      <View style={style.container}>
        {props.message.user !== userInfo.username ? (
          <View>
            <Text
              style={[
                style.content,
                { fontFamily: "poppinsBold", fontSize: 18 },
              ]}
            >
              {props.message.user}
            </Text>
          </View>
        ) : null}
        <Text style={style.content}>{props.message.content}</Text>
      </View>
    </View>
  );
};

export default Message;
