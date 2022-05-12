import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import reportRoom from "../scripts/reportRoom";
import Button from "../components/Button";
import { RootState } from "../redux/index.d";

const RoomDangerZone: React.FC = () => {
  const { sessionStatus } = useSelector((state: RootState): RootState => state);
  const navigation: any = useNavigation();

  const style: any = StyleSheet.create({
      text:{
          fontFamily:"poppinsBold",
          fontSize:17,
          padding: 30
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
      <Text style= {style.text}>Seriously, continue with caution! </Text>
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
                  console.log("pressed");
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
    </View>
  );
};

export default RoomDangerZone;
