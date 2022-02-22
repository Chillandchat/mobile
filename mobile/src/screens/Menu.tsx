import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Menu: React.FC = () => {
  const style = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    text: {
      alignSelf: "flex-start",
      margin: "9%",
      fontFamily: "poppinsExtraBold",
      fontSize: 35,
      marginBottom: 30,
    },
  });
  return (
    <View style={style.container}>
      <Text style={style.text}>Messages</Text>
    </View>
  );
};

export default Menu;
