//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
// @ts-ignore
import { SOCKET_URL } from "@env";
import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import Form from "../components/Form";
import ChatRoomBar from "../components/ChatRoomBar";
import { RootState } from "../redux/index.d";
import sendMessage from "../scripts/sendMessage";
import { MessageType } from "../scripts";

/**
 * This is the chat room as the name suggests it will display the chat room.
 */

const Chat: React.FC = () => {
  const { sessionStatus, userInfo }: any = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );

  React.useEffect((): any => {
    const socket: any = io(SOCKET_URL, { transports: ["websocket"] });
    socket.on(
      `client-message:room(${sessionStatus.id})`,
      (message: MessageType): void => {
        console.log(message);
      }
    );
    return (): void => socket.disconnect();
  }, []);

  const [message, setMessage] = React.useState("");

  const style: any = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      flexDirection: "column",
    },
    text: {
      fontFamily: "poppins",
    },
    sendBar: {
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      bottom: 50,
    },
    sendIcon: {
      padding: 10,
    },
    chatRoomBar: {
      position: "absolute",
      top: 70,
      marginHorizontal: "10%",
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.chatRoomBar}>
          <ChatRoomBar roomData={sessionStatus} />
        </View>
        <View style={style.sendBar}>
          <Form
            placeholder={"Type a message..."}
            onTextChange={(text: string): void => {
              setMessage(text);
            }}
            value={message}
          />
          <View style={style.sendIcon}>
            <TouchableOpacity
              onPress={(): void => {
                sendMessage({
                  id: uuid(),
                  content: message,
                  room: sessionStatus.id,
                  user: userInfo.username,
                })
                  .then((): void => {
                    setMessage("");
                  })
                  .catch((err: unknown): void => {
                    console.error(err);
                  });
              }}
            >
              <Feather name="send" size={32} color="#00AD98" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Chat;
