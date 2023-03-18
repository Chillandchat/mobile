//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { RootState } from "../redux/index.d";
import Form from "../components/Form";
import { MessageType, RoomType } from "../scripts/index.d";
import getRooms from "../scripts/getRooms";
import RoomList from "../components/RoomList";
import sendMessage from "../scripts/sendMessage";

/**
 * This is the share screen, this screen will be used to prompt the user
 * about which room we should send/share message to.
 *
 * @note No props will be accepted in this component!
 */

const Share: React.FC = () => {
  const { messageInfo, userInfo, sessionStatus }: RootState = useSelector(
    (state: RootState): RootState => state
  );

  const navigation: any = useNavigation();

  const [defaultRooms, setDefaultRooms]: any = React.useState([]);
  const [rooms, setRooms]: any = React.useState([]);

  React.useEffect((): void => {
    getRooms(userInfo.username)
      .then((returnedRooms: Array<RoomType>): void => {
        let nestedRooms = returnedRooms;
        nestedRooms = nestedRooms.filter(
          (room: RoomType): boolean => room.id !== sessionStatus.id
        );
        setDefaultRooms(nestedRooms);
        setRooms(nestedRooms);
      })
      .catch((err: unknown): void => {
        console.error(err);
        navigation.navigate("error");
      });
  }, []);

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    heading: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
      position: "absolute",
      top: "13%",
    },
    searchContainer: {
      width: "100%",
      alignItems: "center",
      height: 55,
      marginTop: 5,
      marginBottom: 10,
    },
    back: {
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    roomList: {
      width: "100%",
      height: "90%",
      top: "15%",
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.back}
        onPress={(): void => {
          navigation.navigate("message-options");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={style.heading}>Share message...</Text>
      <View style={style.roomList}>
        <View style={style.searchContainer}>
          <Form
            placeholder={"Search rooms..."}
            onTextChange={(text: string): void => {
              setRooms(
                text !== ""
                  ? defaultRooms.filter((room: RoomType): boolean =>
                      room.name.toLowerCase().includes(text.toLowerCase())
                    )
                  : defaultRooms
              );
            }}
            width={"80%"}
            height={55}
          />
        </View>
        <RoomList
          rooms={rooms}
          onPress={(room: RoomType): void => {
            let message: MessageType = {
              id: uuid(),
              user: userInfo.username,
              content: messageInfo.message.content.toString(),
              room: room.id,
            };

            sendMessage(message);
            navigation.navigate("message-options");
          }}
        />
      </View>
    </View>
  );
};

export default Share;
