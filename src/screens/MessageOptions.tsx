import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Speech from "expo-speech";
import { FontAwesome5 } from "@expo/vector-icons";

import deleteMessage from "../scripts/deleteMessage";
import { RootState } from "../redux/index.d";
import { clearMessageInfo } from "../redux/action";

/**
 * This is the Message option component, this component will display the message options.(like delete)
 */

const MessageOptions: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  const { messageInfo, userInfo, sessionStatus }: any = useSelector(
    (state: RootState): RootState => state
  );

  const [processing, setProcessing] = React.useState(false);

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    back: {
      justifyContent: "flex-start",
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    text: {
      fontFamily: "poppins",
      fontSize: 20,
      color: "#000",
      margin: 10,
    },
    delete: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      height: 300,
      width: 300,
      borderRadius: 20,
      margin: 50,
      backgroundColor: "#E5E5E5",
    },
    readMessage: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return !processing ? (
    <View style={style.container}>
      <View style={style.back}>
        <TouchableOpacity
          onPress={(): void => {
            setProcessing(true);
            dispatch(clearMessageInfo());
            navigation.navigate("chat");
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {messageInfo.content.includes("!IMG") ? (
        <Image
          style={style.image}
          source={{ uri: messageInfo?.content.slice(5, -1) }}
        />
      ) : null}
      <TouchableOpacity
        style={style.readMessage}
        onPress={(): void => {
          Speech.isSpeakingAsync().then((isSpeaking: boolean): void => {
            if (isSpeaking) return;

            Speech.speak(
              `${
                sessionStatus.users.indexOf(messageInfo.user) === -1
                  ? "a deleted user"
                  : messageInfo.user === userInfo.username
                  ? "You"
                  : messageInfo.user
              } ${messageInfo.content.includes("!IMG") ? "sent" : "said:"} ${
                messageInfo.content.includes("!IMG")
                  ? "an image"
                  : messageInfo.content
              }`
            );
          });
        }}
      >
        <FontAwesome5 name="readme" size={35} color="black" />
        <Text style={style.text}>Read message</Text>
      </TouchableOpacity>
      {messageInfo.user === userInfo.username ? (
        <TouchableOpacity
          style={style.delete}
          onPress={(): void => {
            deleteMessage(messageInfo.id, messageInfo.room)
              .then((): void => {
                setProcessing(true);
                dispatch(clearMessageInfo());
                navigation.navigate("chat");
              })
              .catch((err: unknown): void => {
                console.error(err);
              });
          }}
        >
          <AntDesign name="delete" size={30} color="red" />
          <Text style={[style.text, { color: "red" }]}>Delete message</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  ) : null;
};

export default MessageOptions;
