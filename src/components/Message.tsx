import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { MessageProps } from "./index.d";
import { RootState } from "../redux/index.d";
import Icon from "./Icon";
import { setMessageInfo } from "../redux/action";

/**
 * This is the message component, this component will display the message that users send.
 *
 * @prop {MessageType} message The message that the user sent.
 * @prop {AuthType} messageUserInfo The information about all the users in the room
 */

const Message: React.FC<MessageProps> = (props: MessageProps) => {
  const [imageError, setImageError] = React.useState(false);
  const dispatch = useDispatch();
  const { userInfo }: any = useSelector((state: RootState): RootState => {
    return state;
  });

  const navigator: any = useNavigation();

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
    usernameBox: {
      flexDirection: "row",
      marginBottom: props.message.content.includes("!IMG") ? 10 : 0,
    },
    imageContent: {
      height: 150,
      width: 150,
      borderRadius: 5,
    },
    delete: {
      padding: 10,
      alignSelf: "flex-end",
    },
  });

  return (
    <TouchableOpacity
      disabled={props.message.user !== userInfo.username}
      onLongPress={(): void => {
        dispatch(setMessageInfo(props.message));
        navigator.navigate("message-options");
      }}
    >
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
          <View style={style.usernameBox}>
            <Text
              style={[
                style.content,
                { fontFamily: "poppinsBold", fontSize: 18, marginRight: 10 },
              ]}
            >
              {props.message.user}
            </Text>
            {props.messageUserInfo.verified ? (
              <MaterialIcons name="verified-user" size={24} color={"#00AD98"} />
            ) : null}
            {props.messageUserInfo.bot ? (
              <FontAwesome5 name="robot" size={24} color={"#00AD98"} />
            ) : null}
          </View>
        ) : null}
        {props.message.content.includes("!IMG") && !imageError ? (
          <Image
            source={{ uri: props.message.content.slice(5, -1) }}
            style={style.imageContent}
            onError={(): void => {
              setImageError(true);
            }}
          />
        ) : imageError ? (
          <View style={[style.imageContent,{justifyContent:"center",alignItems:"center"}]}>
            <Text style={style.content}>Image unavailable</Text>
          </View>
        ) : (
          <Text style={style.content}>{props.message.content}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Message;
