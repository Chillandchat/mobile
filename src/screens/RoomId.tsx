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
    boldText: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
    },
    text: {
      fontFamily: "poppins",
      fontSize: 15,
    },
    copyToClipboard: {
      flexDirection: "row",
      paddingTop: 60,
      justifyContent: "center",
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
      <Text style={[style.boldText, { paddingBottom: 20 }]}>
        Room ID QR code
      </Text>
      <QRCode
        value={`!chillandchat-room-invite(${sessionStatus.id})`}
        logo={require("../../assets/logo.png")}
        size={250}
        backgroundColor="transparent"
        logoSize={60}
        logoBackgroundColor={"#ffff"}
      />
      <TouchableOpacity
        onPress={(): void => {
          Clipboard.setString(sessionStatus.id);
          Alert.alert("Room ID copied to clipboard");
        }}
        style={style.copyToClipboard}
      >
        <AntDesign
          name="copy1"
          size={24}
          color="black"
          style={{ paddingHorizontal: 10 }}
        />
        <Text style={style.text}>Copy ID to clipboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoomId;
