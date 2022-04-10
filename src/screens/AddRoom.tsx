import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Button from "../components/Button";

/**
 * The is the add room screen,
 * this room is where the user can select to join or create a room.
 */

namespace AddRoom {
  export const component: React.FC<any> = ({ navigation }) => {
    const style: any = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      divider: {
        padding: 10,
      },
      title: {
        fontFamily: "poppinsExtraBold",
        fontSize: 25,
        padding: 30,
      },
      back: {
        justifyContent: "flex-start",
        position: "absolute",
        top: "7%",
        left: "7%",
      },
    });
    return (
      <View style={style.container}>
        <View style={style.back}>
          <TouchableOpacity
            onPress={(): void => {
              navigation.navigate("menu");
            }}
          >
            <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={style.title}>Create or join room?</Text>
        <Button
          textColor="white"
          color={"#00AD98"}
          onPress={(): void => {
            navigation.push("create-room");
          }}
          text={"Create room"}
        />
        <View style={style.divider} />
        <Button
          textColor="white"
          color={"#00AD98"}
          onPress={(): void => {
            navigation.navigate("join-room");
          }}
          text={"Join room"}
        />
      </View>
    );
  };
}

export default AddRoom.component;
