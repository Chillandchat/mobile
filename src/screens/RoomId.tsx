import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";

import { RootState } from "../redux/index.d";

/**
 * This is the room id screen, this is where the user will see the QR code and the room id to be copied.
 */

const RoomId: React.FC = () => {
  const navigation: any = useNavigation();
  const { sessionStatus }: any = useSelector((state: RootState): RootState => {
    return state;
  });

  const style: any = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    back: {
      justifyContent: "flex-start",
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    text: {
      fontFamily: "poppins",
      fontSize: 13,
    },
    copyToClipboard: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: "#E5E5E5",
      padding: 10,
      borderWidth: 3,
      borderRadius: 10,
      marginTop: 60,
      paddingHorizontal: 40,
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.back}
        onPress={async (): Promise<void> => {
          navigation.navigate("room-details");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <QRCode
        value={`!chillandchat-room-invite(${sessionStatus.id})`}
        logo={require("../../assets/logo.png")}
        size={250}
        backgroundColor="transparent"
        logoBackgroundColor={"#ffff"}
      />
      <TouchableOpacity
        onPress={(): void => {
          Clipboard.setString(sessionStatus.id);
          Alert.alert(
            "Success",
            "Room ID was successfully copied into your clipboard."
          );
        }}
        style={style.copyToClipboard}
      >
        <AntDesign
          name="copy1"
          size={35}
          color="black"
          style={{ paddingHorizontal: 10 }}
        />
        <Text style={style.text}>Copy ID to clipboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoomId;
