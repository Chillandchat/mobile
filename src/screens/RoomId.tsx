import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { RootState } from "../redux/index.d";

/**
 * This is the room id screen, this is where the user will see the QR code and the room id to be copied.
 */

const RoomId: React.FC = () => {
  const navigation: any = useNavigation();

  const { sessionStatus }: RootState = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    back: {
      justifyContent: "flex-start",
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    parent: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    text: {
      fontFamily: "poppins",
      fontSize: 17,
      color: "#000",
      margin: 10,
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
      <View style={[style.parent, { marginBottom: 30, maxWidth: "60%" }]}>
        <MaterialCommunityIcons name="qrcode-scan" size={30} color="black" />
        <Text
          style={[style.text, { fontFamily: "poppinsBold", fontSize: 20 }]}
          numberOfLines={1}
        >
          QR code for {sessionStatus.name}
        </Text>
      </View>
      <QRCode
        logoBorderRadius={10}
        logoSize={60}
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
        style={style.parent}
      >
        <AntDesign name="copy1" size={25} color="black" />
        <Text style={style.text}>Copy to clipboard</Text>
      </TouchableOpacity>
      <Text
        style={[
          style.text,
          {
            textAlign: "center",
            opacity: 0.5,
            width: "80%",
            fontSize: 15,
            marginTop: 40,
          },
        ]}
      >
        Hot tip: Copy the room id and send it to your friends so they can join
        your room. Or better, let them scan the QR code as shown for instant
        linking!
      </Text>
    </View>
  );
};

export default RoomId;
