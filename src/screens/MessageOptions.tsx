import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Speech from "expo-speech";
import { FontAwesome5 } from "@expo/vector-icons";

import deleteMessage from "../scripts/deleteMessage";
import { RootState } from "../redux/index.d";
import { clearMessageInfo } from "../redux/action";
import Constants from "expo-constants";
import reportRoom from "../scripts/reportRoom";

/**
 * This is the Message option component, this component will display the message options.(like delete)
 */

const MessageOptions: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  const { messageInfo, userInfo, sessionStatus }: RootState = useSelector(
    (state: RootState): RootState => state
  );

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

  return (
    <View style={style.container}>
      <View style={style.back}>
        <TouchableOpacity
          onPress={(): void => {
            Speech.stop();
            dispatch(clearMessageInfo());
            navigation.navigate("chat");
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {messageInfo?.message.content.includes("!IMG") ? (
        <Image
          style={style.image}
          source={{
            uri: messageInfo?.message?.content
              .slice(5, -1)
              .includes(Constants.expoConfig?.extra?.API_URL)
              ? `${messageInfo?.message?.content.slice(5, -1)}&key=${
                  Constants.expoConfig?.extra?.API_KEY
                }`
              : messageInfo?.message?.content.slice(5, -1),
          }}
        />
      ) : null}
      <TouchableOpacity
        style={style.readMessage}
        onPress={(): void => {
          Speech.isSpeakingAsync().then((isSpeaking: boolean): void => {
            if (isSpeaking) return;

            Speech.speak(
              `${
                sessionStatus.users.indexOf(messageInfo?.message.user) === -1
                  ? "a deleted user"
                  : messageInfo?.message.user === userInfo.username
                  ? "You"
                  : messageInfo?.message.user
              } ${
                messageInfo?.message.content.includes("!IMG") ? "sent" : "said:"
              } ${
                messageInfo?.message.content.includes("!IMG")
                  ? "an image"
                  : messageInfo?.readMessage
              }`,
              { language: "en" }
            );
          });
        }}
      >
        <FontAwesome5 name="readme" size={35} color="black" />
        <Text style={style.text}>Read message</Text>
      </TouchableOpacity>
      {messageInfo?.message.user === userInfo.username ? (
        <TouchableOpacity
          style={style.delete}
          onPress={(): void => {
            deleteMessage(messageInfo?.message.id, messageInfo?.message.room)
              .then((): void => {
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
      {messageInfo?.message.user !== userInfo.username ? (
        <TouchableOpacity
          style={style.delete}
          onPress={(): void => {
            Alert.alert(
              "Flag message?",
              "Are you sure you want to report this message? The Chill&chat team will be notified once it's reported. Users who spam or send useless/irrelevant report will be banned.",
              [
                {
                  text: "Report",
                  style: "destructive",
                  onPress: (): void => {
                    reportRoom(
                      sessionStatus.id,
                      `Flagging: ${messageInfo.message.id}`,
                      userInfo.username
                    )
                      .then((): void => {
                        Alert.alert(
                          "Flagged message",
                          "This message has been reported, thank you for your feedback! We will take action as soon as possible."
                        );
                      })
                      .catch((err: unknown): void => {
                        console.error(err);
                      });
                  },
                },
                { text: "Cancel" },
              ]
            );
          }}
        >
          <AntDesign name="flag" size={30} color="red" />
          <Text style={[style.text, { color: "red" }]}>Flag message</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default MessageOptions;
