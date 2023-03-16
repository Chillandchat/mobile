import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import getPublicRooms from "../scripts/getPublicRooms";
import { RoomType } from "../scripts";
import Icon from "../components/Icon";
import joinRoom from "../scripts/joinRoom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/index.d";
import getRoom from "../scripts/getRooms";
import RoomList from "../components/RoomList";
import Form from "../components/Form";

const PublicRooms: React.FC = () => {
  const navigation: any = useNavigation();
  const [rooms, setRooms]: any = React.useState([]);
  const [existingRooms, setExistingRooms]: any = React.useState([]);
  const [defaultRooms, setDefaultRooms]: any = React.useState([]);

  const { userInfo }: RootState = useSelector(
    (state: RootState): RootState => state
  );

  React.useEffect((): any => {
    getPublicRooms()
      .then((rooms: Array<RoomType>): void => {
        setRooms(rooms);
        setDefaultRooms(rooms);
      })
      .catch((err: unknown): void => {
        console.error(err);
        navigation.navigate("error");
      });

    getRoom(userInfo.username)
      .then((rooms: Array<RoomType>): void => {
        setExistingRooms(rooms);
      })
      .catch((err: unknown): void => {
        console.error(err);
        navigation.navigate("error");
      });
  }, []);

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    heading: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
      position: "absolute",
      top: "15%",
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
          navigation.navigate("join-room");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={style.heading}>Public rooms</Text>
      <View style={style.roomList}>
        <View style={style.searchContainer}>
          <Form
            width={"80%"}
            placeholder={"Search public rooms..."}
            height={55}
            onTextChange={(text: string): void => {
              setRooms(
                defaultRooms.filter((room: RoomType): boolean =>
                  room.name.toLowerCase().includes(text.toLowerCase())
                )
              );
              if (text === "") setRooms(defaultRooms);
            }}
          />
        </View>
        <RoomList
          onPress={(room: RoomType): void => {
            joinRoom(userInfo.username, room.id, null)
              .then((): void => {
                navigation.push("menu");
              })
              .catch((err: unknown): void => {
                console.error(err);
                navigation.navigate("error");
              });
          }}
          rooms={rooms.filter(
            (room: RoomType): boolean =>
              !JSON.stringify(existingRooms)
                .replaceAll(" ", "")
                .includes(`"id":"${room.id}"`)
          )}
        />
      </View>
    </View>
  );
};

export default PublicRooms;
