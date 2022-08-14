import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";

/**
 * The is the add room screen,
 * this room is where the user can select to join or create a room.
 */

const AddRoom: React.FC<any> = () => {
  const navigation: any = useNavigation();

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    divider: {
      padding: 5,
    },
    title: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
      padding: 40,
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
      <Text style={style.title}>Add a room...</Text>
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
        textColor="black"
        color={"transparent"}
        onPress={(): void => {
          navigation.navigate("join-room");
        }}
        text={"Join room"}
      />
    </View>
  );
};

export default AddRoom;
