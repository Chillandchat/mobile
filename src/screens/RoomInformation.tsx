import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import { RootState } from "../redux/index.d";
import Button from "../components/Button";

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
    dangerButton: {
      position: "absolute",
      bottom: "7%",
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
      <Text style={[style.boldText, { fontSize: 20 }]}>Room information:</Text>
      <View style={{ height: 10 }} />
      <View style={{ flexDirection: "row" }}>
        <AntDesign
          name="idcard"
          size={30}
          color="black"
          style={{ paddingHorizontal: 10 }}
        />
        <Text style={style.text}>{sessionStatus.id}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Feather
          name="users"
          size={30}
          color="black"
          style={{ paddingHorizontal: 10 }}
        />
        <Text style={style.text}>{sessionStatus.users.length.toString()}</Text>
      </View>
      <View style={style.dangerButton}>
        <TouchableOpacity
          onPress={(): void => {
            Clipboard.setString(sessionStatus.id);
            Alert.alert("Room ID copied to clipboard");
          }}
          style={{
            flexDirection: "row",
            paddingBottom: 20,
            justifyContent: "center",
          }}
        >
          <AntDesign
            name="copy1"
            size={24}
            color="black"
            style={{ paddingHorizontal: 10 }}
          />
          <Text style={style.text}>Copy information</Text>
        </TouchableOpacity>
          <Button
            color={"red"}
            onPress={() => {
              navigation.push("room-danger-zone");
            }}
            textColor={"#ffff"}
            text={"Danger zone"}
          />
        </View>
    </View>
  );
};

export default RoomInformation;
