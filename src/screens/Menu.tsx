import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScaledSize,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import RoomList from "../components/RoomList";
import Icon from "../components/Icon";
import { RootState } from "../redux/index.d";
import getRoom from "../scripts/getRooms";
import { RoomType } from "../scripts/index.d";
import Form from "../components/Form";

/**
 * This the menu screen, this screen is where the rooms are displayed.
 */

const Menu: React.FC<any> = ({ navigation }) => {
  const { username, iconColor }: any = useSelector(
    (state: RootState): RootState => {
      return state.userInfo;
    }
  );

  const windowSize: ScaledSize = Dimensions.get("window");

  const loggedIn: any = useSelector((state: RootState): RootState => {
    return state.loginStatus;
  });

  const [rooms, setRooms] = React.useState<Array<RoomType>>([]);
  const [defaultRooms, setDefaultRooms] = React.useState<Array<RoomType>>([]);

  React.useEffect((): void => {
    getRoom(username)
      .then((data: Array<RoomType>): void => {
        setRooms(data);
        setDefaultRooms(data);
      })
      .catch((err: unknown) => {
        console.error(err);
        navigation.navigate("error");
      });
  }, []);

  const style: any = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: windowSize.height / 4, // Style of the header offset
      flex: 1,
    },
    text: {
      fontFamily: "poppinsBold",
      fontSize: 35,
      flex: 1,
    },
    tittleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: "5%",
    },
    searchContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginLeft: "10%",
      height: 55,
      marginTop: 5,
      marginBottom: 10,
    },
    divider: {
      padding: 5,
    },
    addButton: {
      backgroundColor: "#00AD98",
      zIndex: 3,
      marginBottom: 10,
      position: "absolute",
      bottom: "5%",
      padding: 5,
      borderRadius: 10000,
    },
    bar: {
      backgroundColor: "#00AD98",
    },
    searchIcon: {
      marginLeft: 15,
    },
  });

  if (!loggedIn) {
    navigation.navigate("login");
    return <View></View>;
  } else {
    return (
      <View style={style.container}>
        <View style={style.tittleBar}>
          <Text style={style.text}>Messages</Text>
          <Icon
            iconLetter={username[0] || ""}
            color={iconColor || "#0000"}
            touchable
            onPress={(): void => {
              navigation.push("signout-confirm");
            }}
          />
        </View>
        <View style={style.bar} />
        <View style={style.searchContainer}>
          <Form
            placeholder={"Search"}
            width={"75%"}
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
        <RoomList rooms={rooms} />
        <TouchableOpacity
          style={style.addButton}
          onPress={(): void => {
            navigation.navigate("add-room");
          }}
        >
          <Ionicons name="ios-add" size={50} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
};

export default Menu;
