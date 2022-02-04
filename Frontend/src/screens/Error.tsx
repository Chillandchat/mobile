import React from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/Button";

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
  });
  return (
    <View style={style.container}>
      <MaterialIcons name="error" size={75} color="orange" />
      <Text style={style.titleText}>Error!</Text>
      <Button
        color={"orange"}
        textColor={"#ffff"}
        text="quit application"
        onPress={() => {
          BackHandler.exitApp();
        }}
      />
    </View>
  );
};

export default Error;
