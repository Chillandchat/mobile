import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import RoomList from "../components/RoomList";
import Icon from "../components/Icon";
import { RootState } from "../redux/index.d";
import getRoom from "../scripts/getRooms";
import { RoomType } from "../scripts/index.d";
import Button from "../components/Button";

/**
 * This the menu screen, this screen is where the rooms are displayed.
 */

const Menu: React.FC<any> = ({ navigation }) => {
  const { username, iconColor }: any = useSelector(
    (state: RootState): RootState => {
      return state.userInfo;
    }
  );

  const loggedin: any = useSelector((state: RootState): RootState => {
    return state.loginStatus;
  });

  const [rooms, setRooms] = React.useState<Array<RoomType>>([]);

  React.useEffect((): void => {
    getRoom(username)
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
      marginTop: "50%",
      flex: 1,
    },
    text: {
      fontFamily: "poppinsExtraBold",
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
    buttonWrapper: {
      marginBottom: "10%",
      paddingTop: 30,
    },
    divider: {
      padding: 5,
    },
  });
  
  if (!loggedin) {
    navigation.naviagte("login");
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
        <RoomList rooms={rooms} />
        <View style={style.buttonWrapper}>
          <Button
            textColor="white"
            color={"#00AD98"}
            onPress={(): void => {
              navigation.navigate("create-room");
            }}
            text={"Create room"}
          />
          <View style={style.divider} />
          <Button
            textColor="white"
            color={"#00AD98"}
            onPress={(): void => {
              return;
            }}
            text={"Join room"}
          />
        </View>
      </View>
    );
  }
};

export default Menu;
