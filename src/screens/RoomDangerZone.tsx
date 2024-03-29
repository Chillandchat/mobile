import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import reportRoom from "../scripts/reportRoom";
import Button from "../components/Button";
import { RootState } from "../redux/index.d";
import removeRoom from "../scripts/removeRoom";
import login from "../scripts/login";

/**
 * This is the room danger zone, this screen will allow the user to report or leave a room.
 * This screen was separated from the room details screen to avoid clutter and mess.
 */

const RoomDangerZone: React.FC = () => {
  const { sessionStatus, userInfo }: RootState = useSelector(
    (state: RootState): RootState => state
  );
  const navigation: any = useNavigation();

  const style: any = StyleSheet.create({
    back: {
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      marginTop: 40,
    },
    buttons: {
      padding: 35,
      borderRadius: 10,
    },
    parent: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    text: {
      fontFamily: "poppins",
      fontSize: 17,
      color: "#000",
      margin: 10,
      maxWidth: "80%",
      textAlign: "center",
      opacity: 0.5,
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.back}
        onPress={(): void => {
          navigation.goBack();
          navigation.navigate("room-details");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <View style={style.parent}>
        <AntDesign name="warning" size={35} color="red" />
        <Text style={[style.text, { color: "red", opacity: 1, fontSize: 25 }]}>
          Danger zone
        </Text>
      </View>
      <View style={style.buttons}>
        <Button
          color={"red"}
          textColor={"#fff"}
          onPress={(): void => {
            Alert.alert(
              "Report room?",
              "Are you sure you want to report this room? The Chill&chat team will be notified once it's reported. Users who spam or send useless/irrelevant report will be banned.",
              [
                {
                  text: "Report",
                  style: "destructive",
                  onPress: (): void => {
                    Alert.prompt(
                      "Enter a message",
                      "Please describe the issue",
                      [
                        {
                          text: "Submit",
                          onPress: (text: string | undefined): void => {
                            if (text === undefined) {
                              Alert.alert("Error", "No message was provided.");
                              return;
                            }

                            reportRoom(
                              sessionStatus.id,
                              String(text),
                              userInfo.username
                            )
                              .then((): void => {
                                Alert.alert(
                                  "Room reported",
                                  "This room has been reported, thank you for your feedback! We will take action as soon as possible."
                                );
                              })
                              .catch((err: unknown): void => {
                                console.error(err);
                                navigation.goBack();
                                navigation.navigate("error");
                              });
                          },
                        },
                      ]
                    );
                  },
                },
                { text: "Cancel" },
              ]
            );
          }}
          text={"report room"}
        />
        <View style={{ marginTop: 15 }} />
        <Button
          color={"red"}
          textColor={"#fff"}
          onPress={(): void => {
            Alert.alert(
              "Leave room?",
              "Are you sure you want to leave this room? You cannot join unless you are reinvited.",
              [
                {
                  text: "Leave",
                  style: "destructive",
                  onPress: (): void => {
                    Alert.prompt(
                      "Login",
                      "Please enter your password to confirm.",
                      [
                        {
                          text: "Leave room",
                          style: "destructive",
                          onPress: (text: string | undefined): void => {
                            if (text === undefined) {
                              Alert.alert(
                                "Password incorrect, please try again later."
                              );
                              return;
                            }

                            login(userInfo.username, text as string)
                              .then((): void => {
                                removeRoom(sessionStatus.id, userInfo.username)
                                  .then((): void => {
                                    navigation.goBack();
                                    navigation.push("control-center");
                                    Alert.alert(
                                      "Room left",
                                      "You have left this room."
                                    );
                                  })
                                  .catch((err: unknown): void => {
                                    console.error(err);
                                    navigation.goBack();
                                    navigation.navigate("error");
                                  });
                              })
                              .catch((err: unknown): void => {
                                console.error(err);
                                Alert.alert(
                                  "Password incorrect, please try again later."
                                );
                              });
                          },
                        },
                        {
                          text: "Cancel",
                        },
                      ],
                      "secure-text"
                    );
                  },
                },
                { text: "Cancel" },
              ]
            );
          }}
          text={"leave room"}
        />
      </View>
      <Text style={style.text}>
        Whoa there! Be careful rookie! This is a danger zone! Some actions
        CANNOT be reversed and is very dangerous! BOOM! (Please, just don't be
        stupid)
      </Text>
    </View>
  );
};

export default RoomDangerZone;
