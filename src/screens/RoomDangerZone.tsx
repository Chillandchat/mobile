import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import reportRoom from "../scripts/reportRoom";
import Button from "../components/Button";
import { RootState } from "../redux/index.d";
import removeRoom from "../scripts/removeRoom";

const RoomDangerZone: React.FC = () => {
  const { sessionStatus, userInfo }: any = useSelector(
    (state: RootState): RootState => state
  );
  const navigation: any = useNavigation();

  const style: any = StyleSheet.create({
    text: {
      fontFamily: "poppinsBold",
      fontSize: 22,
      padding: 30,
    },
    back: {
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    buttons: {
      borderColor: "red",
      borderWidth: 2,
      padding: 20
      ,borderRadius: 10,
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.back}
        onPress={(): void => {
          navigation.navigate("room-details");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={style.text}>Danger zone </Text>
      <View style={style.buttons}>
        <Button
          color={"red"}
          textColor={"#fff"}
          onPress={(): void => {
            Alert.alert(
              "",
              "Are you sure you want to report this room? The Chill&chat team will be notified once reported.",
              [
                {
                  text: "Report",
                  style: "destructive",
                  onPress: (): void => {
                    reportRoom(sessionStatus.id)
                      .then((): void => {
                        Alert.alert(
                          "Room reported",
                          "This room has been reported, thank you for your feedback! We will take action as soon as possible."
                        );
                      })
                      .catch((err: unknown): void => {
                        console.error(err);
                      });
                  },
                },
                { text: "Cancel" },
              ]
            );
          }}
          text={"report room"}
        />
        <View style={{ marginTop: 10 }} />
        <Button
          color={"red"}
          textColor={"#fff"}
          onPress={(): void => {
            Alert.alert(
              "",
              "Are you sure you want to leave this room? You cannot join unless you are reinvited.",
              [
                {
                  text: "Leave",
                  style: "destructive",
                  onPress: (): void => {
                    removeRoom(sessionStatus.id, userInfo.username)
                      .then((): void => {
                        navigation.navigate("login");
                        Alert.alert("Room left", "You have left this room.");
                      })
                      .catch((err: unknown): void => {
                        console.error(err);
                      });
                  },
                },
                { text: "Cancel" },
              ]
            );
          }}
          text={"leave room"}
        />
      </View>
    </View>
  );
};

export default RoomDangerZone;
