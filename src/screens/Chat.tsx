import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import Form from "../components/Form";
import ChatRoomBar from "../components/ChatRoomBar";
import { RootState } from "../redux/index.d";

const Chat: React.FC = () => {
  const { sessionStatus }: any = useSelector((state: RootState): RootState => {
    console.log(state)
    return state;
  });

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
    },
    sendIcon: {
      padding: 10,
    },
  });

  return (
    <View style={style.container}>
      <ChatRoomBar roomData={sessionStatus}/>

      <View style={style.sendBar}>
        <Form
          placeholder={"Type a message..."}
          onTextChange={(): void => {
            return;
          }}
        />
        <View style={style.sendIcon}>
          <TouchableOpacity>
            <Feather name="send" size={32} color="#00AD98" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;
