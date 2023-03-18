import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { Dispatch } from "redux";

/** JSX parser import */
// @ts-ignore
import JsxParser from "react-native-jsx-parser";

import { setMessageInfo, setProfileInfo } from "../redux/action";
import { MessageProps as Props } from "./index.d";
import { RootState } from "../redux/index.d";
import Icon from "./Icon";

/**
 * This is the message component, this component will display the message that users send in the chat screen.
 * Each message's details can be changed by adjusting the props listed below.
 *
 * @prop {MessageType} message The message that the user sent.
 * @prop {AuthType} messageUserInfo The information about all the users in the room.
 * @prop {string} readMessage The message used in the message reading.
 */

const Message: React.FC<Props> = (props: Props) => {
  const [imageError, setImageError]: any = React.useState(false);

  const dispatch: Dispatch = useDispatch();

  const { userInfo }: RootState = useSelector((state: RootState): RootState => {
    return state;
  });

  const navigator: any = useNavigation();

  const style: any = StyleSheet.create({
    container: {
      alignSelf:
        props.message.user === userInfo.username ? "flex-end" : "flex-start",
      margin: 10,
      marginLeft: props.message.user === userInfo.username ? 0 : 60,
      padding: 25,
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
      borderRadius: 10,
      resizeMode: "cover",
    },
    delete: {
      padding: 10,
      alignSelf: "flex-end",
    },
  });

  return (
    <TouchableOpacity
      onLongPress={(): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        dispatch(
          setMessageInfo({
            message: props.message,
            readMessage: props.readMessage,
          })
        );
        navigator.navigate("message-options");
      }}
    >
      {props.message.user !== userInfo.username ? (
        <View style={style.icon}>
          <Icon
            color={
              props.messageUserInfo?.iconColor === undefined
                ? "red"
                : props.messageUserInfo.iconColor
            }
            iconLetter={
              props.messageUserInfo?.username[0] === undefined
                ? "?"
                : props.messageUserInfo?.username[0]
            }
            size={50}
            touchable={props.messageUserInfo !== undefined}
            onPress={(): void => {
              dispatch(setProfileInfo(props.messageUserInfo));
              navigator.navigate("user-profile");
            }}
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
            {props.messageUserInfo?.verified ? (
              <MaterialIcons name="verified-user" size={24} color={"#00AD98"} />
            ) : null}
            {props.messageUserInfo?.bot ? (
              <FontAwesome5 name="robot" size={24} color={"#00AD98"} />
            ) : null}
          </View>
        ) : null}

        {props.message.content.includes("!IMG") && !imageError ? (
          <Image
            source={{
              uri: props.message.content.slice(5, -1),
            }}
            style={style.imageContent}
            onError={(): void => {
              setImageError(true);
            }}
          />
        ) : imageError ? (
          <View
            style={[
              style.imageContent,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Text style={style.content}>Image unavailable</Text>
          </View>
        ) : (
          <Text style={style.content}>
            <JsxParser
              components={{ Text }}
              bindings={{
                bindingStyle: style,
                bindingContent: props.message.content,
              }}
              jsx={
                props.message.content.includes("!FMT")
                  ? `{\`${props.message.content.slice(
                      5,
                      props.message.content.length - 1
                    )}\`}`
                  : "{bindingContent}"
              }
            />
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Message;
