import React from "react";
import { View, Text, StyleSheet, BackHandler, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Button from "../components/Button";

/**
 * This is the block error page, this page will display if the user is blocked on login.
 */

const BlockError: React.FC = () => {
  const style: any = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    titleText: {
      fontFamily: "poppinsExtraBold",
      fontSize: 30,
      padding: 18,
    },
    text: {
      fontFamily: "poppins",
      fontSize: 15,
      paddingBottom: 23,
      marginHorizontal: "7%",
      textAlign: "center",
    },
  });

  return (
    <View style={style.container}>
      <MaterialIcons name="error" size={75} color="orange" />
      <Text style={style.titleText}>Connection declined</Text>
      <Text style={style.text}>
        We have received report(s) about your behavior, to prevent abuse we have blocked you from Chill&chat.
      </Text>
      <Button
        color={"orange"}
        textColor={"#ffff"}
        text="quit application"
        onPress={() => {
          BackHandler.exitApp();
        }}
      />
      <Button
        color={"transparent"}
        textColor={"#000"}
        text="report bug"
        onPress={() => {
          Linking.openURL(
            "https://github.com/Chill-and-chat/Chill-and-chat/issues/"
          );
        }}
      />
    </View>
  );
};

export default BlockError;
