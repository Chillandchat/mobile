//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { MessageProps } from "./index.d";
import { AuthType } from "../scripts/index.d";
import { RootState } from "../redux/index.d";
import Icon from "./Icon";
import getUserWithId from "../scripts/getUserWithId";

/**
 * This is the message component, this component will display the message that users send.
 *
 * @prop {MessageType} message The message that the user sent.
 * @prop {string} user The id of the user currently logged in.
 * @prop {Array<AuthType>} roomUserInfo The information about all the users in the room
 */

const Message: React.FC<MessageProps> = (props: any) => {
  const { roomUserInfo } = useSelector((state: RootState): RootState => {
    return state;
  });

  const userInfo = roomUserInfo.filter(
    (user: AuthType): any => user.id === props.message.user
  );
  console.log("pp" + JSON.stringify(userInfo));

  const style: any = StyleSheet.create({
    container: {
      alignSelf: "flex-end",
      margin: 20,
      padding: 20,
      backgroundColor:
        props.message.user !== userInfo.id ? "#00AD98" : "#E5E5E5",
      borderBottomLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomRightRadius: props.message.user !== userInfo.id ? 0 : 50,
      borderTopLeftRadius: props.message.user !== userInfo.id ? 50 : 0,
      marginRight: 50,
    },
    content: {
      fontFamily: "poppins",
      color: props.message.user !== userInfo.id ? "white" : "black",
    },
  });

  // TODO: line 58 add positioning to icon component
  return (
    <View style={{ flexDirection: "row" }}>
      {props.message.user !== userInfo.id ? (
        <Icon
          height={45}
          width={45}
          iconLetter={userInfo.username[0]}
          color={userInfo.iconColor}
        />
      ) : null}
      <View style={style.container} key={uuid()}>
        {props.message.user !== userInfo.id ? (
          <View>
            <Text
              key={uuid()}
              style={[
                style.content,
                { fontFamily: "poppinsBold", fontSize: 18 },
              ]}
            >
              {userInfo.username}
            </Text>
          </View>
        ) : null}
        <Text key={uuid()} style={style.content}>
          {props.message.content}
        </Text>
      </View>
    </View>
  );
};

export default Message;
