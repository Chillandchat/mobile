import React from "react";
import { View, StyleSheet, Text } from "react-native";

/**
 * This is the share screen, this screen will be used to prompt the user
 * about which room we should send/share message to.
 *
 * @note No props will be accepted in this component!
 */

const Share: React.FC = () => {
  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={style.container}>
      <Text>Hello, welcome to the 'share' screen!!!</Text>
    </View>
  );
};

export default Share;
