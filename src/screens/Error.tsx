import React from "react";
import { View, Text, StyleSheet, BackHandler, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Button from "../components/Button";

/**
 * This is the error page, this page will display an error message.
 */

const Error: React.FC = () => {
  const style = StyleSheet.create({
    container: {
      justifyContent: "center",
      flex: 1,
      alignItems: "center",
    },
    titleText: {
      fontFamily: "poppinsExtraBold",
      fontSize: 30,
      padding: 18,
    },
    text: {
      fontFamily: "poppins",
      fontSize: 17,
      paddingBottom: 23,
    },
  });
  
  return (
    <View style={style.container}>
      <MaterialIcons name="error" size={75} color="orange" />
      <Text style={style.titleText}>Unexpected error</Text>
      <Text style={style.text}>Please report bug or quit app.</Text>
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

export default Error;
