import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { RootState } from "../redux/index.d";

/**
 * This is the room information screen, this screen will display the room information.
 */

const RoomInformation: React.FC<any> = ({ navigation }) => {
  const { sessionStatus } = useSelector((state: RootState): RootState => {
    return state;
  });

  const style: any = StyleSheet.create({
    container: {
      justifyContent: "center",
      flex: 1,
      alignItems: "center",
    },
    text: {
      fontFamily: "poppins",
      fontSize: 15,
    },
    back: {
      justifyContent: "flex-start",
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    boldText: {
      fontFamily: "poppinsBold",
      fontSize: 15,
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.back}
        onPress={async (): Promise<void> => {
          navigation.navigate("chat");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={[style.boldText, { fontSize: 20 }]}>
        Room information:
      </Text>
      <View style={{ height: 10 }} />
      <View style={{ flexDirection: "row" }}>
        <Text style={style.boldText}>ID:{"    "}</Text>
        <Text style={style.text}>{sessionStatus.id}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={style.boldText}>Name:{"    "}</Text>
        <Text style={style.text}>{sessionStatus.name}</Text>
      </View>
    </View>
  );
};

export default RoomInformation;
