import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Chat: React.FC = () => {
  const style = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    text: {
      fontFamily: "poppins",
    },
  });
  return (
    <View style={style.container}>
      <Text style={style.text}>Chat</Text>
    </View>
  );
};

export default Chat;
