import React from "react";
import { View, StyleSheet, Text } from "react-native";

const RoomInformation: React.FC = () => {
  const style: any = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontFamily: "poppins",
      fontSize: 15,
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.text}>Hi there!</Text>
    </View>
  );
};

export default RoomInformation;
