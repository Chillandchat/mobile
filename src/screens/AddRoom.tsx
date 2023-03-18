import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";

/**
 * The is the add room screen, this room is where the user can select to join or create a room.
 */

const AddRoom: React.FC = () => {
  const navigation: any = useNavigation();

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
      padding: 40,
    },
    joinRoom: {
      position: "absolute",
      bottom: "7%",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      borderColor: "#e5e5e5",
      borderWidth: 3,
      borderRadius: 20,
      paddingBottom: 20,
      width: "85%",
    },
    createRoom: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: -120,
    },
  });

  return (
    <View style={style.container}>
      <View style={style.createRoom}>
        <Text style={style.title}>Create a room...</Text>
        <Text
          style={[
            style.title,
            {
              fontSize: 15,
              fontFamily: "poppins",
              marginTop: -60,
              textAlign: "center",
            },
          ]}
        >
          A room is where you can invite a group of friends and chat privately!
        </Text>
        <Button
          textColor="white"
          color={"#00AD98"}
          onPress={(): void => {
            navigation.push("create-room");
          }}
          text={"Create room"}
        />
      </View>
      <View style={style.joinRoom}>
        <Text style={[style.title, { fontSize: 20, marginBottom: -10 }]}>
          Already have a room?
        </Text>
        <Button
          textColor="white"
          color={"#00ad98"}
          onPress={(): void => {
            navigation.push("join-room");
          }}
          text={"Join room"}
        />
      </View>
    </View>
  );
};

export default AddRoom;
