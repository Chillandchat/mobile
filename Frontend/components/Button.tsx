import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface Props {
  color: string;
  text: string;
  onPress: () => void;
}

const Button: React.FunctionComponent<Props> = (props) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: props.color,
      color: "#fff",
      fontWeight: "bold",
      fontSize: 23,
      fontFamily: "poppinsBlack",
    },
    container: {
      alignItems: "center",
    },
  });

  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <Text onPress={props.onPress} style={styles.button}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
