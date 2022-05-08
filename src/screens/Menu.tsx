import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import RoomList from "../components/RoomList";
import Icon from "../components/Icon";
import { RootState } from "../redux/index.d";
import getRoom from "../scripts/getRooms";
import { RoomType } from "../scripts/index.d";

/**
 * This the menu screen, this screen is where the rooms are displayed.
 */

const Menu: React.FC<any> = ({ navigation }) => {
  const { id, iconColor, username }: any = useSelector(
    (state: RootState): RootState => {
      return state.userInfo;
    }
  );

  const loggedIn: any = useSelector((state: RootState): RootState => {
    return state.loginStatus;
  });

  const [rooms, setRooms] = React.useState<Array<RoomType>>([]);

  React.useEffect((): void => {
    getRoom(id)
      .then((data: Array<RoomType>): void => {
        setRooms(data);
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
      marginTop: 250,  // Style of the header offset
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
      marginTop: "5%",
      marginLeft: "5%",
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
            height={60}
            width={60}
            iconLetter={username[0] || ""}
            color={iconColor || "#0000"}
            touchable
            onPress={(): void => {
              navigation.push("signout-confirm");
            }}
          />
        </View>
        <View style={style.bar} />
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
