import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Menu: React.FC = () => {
  const style = StyleSheet.create({
    container: {
      justifyContent: "center",
    },
    text: {
      fontFamily: "poppins",
    },
  });
  return (
    <View style={style.container}>
      <Text style={style.text}>Menu</Text>
    </View>
  );
};

export default Menu;
