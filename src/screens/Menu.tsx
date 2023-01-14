import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScaledSize,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import RoomList from "../components/RoomList";
import Icon from "../components/Icon";
import { RootState } from "../redux/index.d";
import getRoom from "../scripts/getRooms";
import { MessageType, RoomType } from "../scripts/index.d";
import Form from "../components/Form";
import getMessages from "../scripts/getMessages";

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

  const [rooms, setRooms]: any = React.useState([]);
  const [defaultRooms, setDefaultRooms]: any = React.useState([]);
  const [recentMessages, setRecentMessages]: any = React.useState([]);
  const [ran, setRan]: any = React.useState(false);

  React.useEffect((): void => {
    getRoom(username)
      .then((data: Array<RoomType>): void => {
        setDefaultRooms((_prev: Array<RoomType>): Array<RoomType> => data);
      })
      .catch((err: unknown) => {
        console.error(err);
        navigation.navigate("error");
      });
  }, []);

  React.useEffect((): void => {
    getRoom(username).then((ref: Array<RoomType>): void => {
      console.log();
      if (!ran && JSON.stringify(defaultRooms) === JSON.stringify(ref)) {
        let tmpRecentMessages: Array<MessageType> = [];

        ref.forEach((room: RoomType): void => {
          getMessages(room.id)
            .then((returnedMessages: Array<MessageType>): void => {
              console.log(returnedMessages);
              let current: MessageType =
                returnedMessages[returnedMessages.length - 1];
              current.content = `${
                returnedMessages[returnedMessages.length - 1].user
              }: ${returnedMessages[returnedMessages.length - 1].content}`;

              tmpRecentMessages.push(current);
              setRecentMessages(
                (_prev: Array<MessageType>): Array<MessageType> => {
                  _prev.length === defaultRooms.length
                    ? setRooms(defaultRooms)
                    : null;

                  return tmpRecentMessages;
                }
              );
            })
            .catch((err: unknown): void => {
              console.error(err);
              navigation.navigate("error");
            });
        });
        setRan(true);
      }
    });
  }, [defaultRooms]);

  React.useEffect((): any => {}, [recentMessages]);
  const style: any = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "flex-start",
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
      marginTop: windowSize.height / 4, // Style of the header offset
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
    searchIcon: {
      marginLeft: 15,
    },
  });

  if (!loggedIn) {
    navigation.navigate("login");
    return <View></View>;
  } else {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={style.container}>
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
          <View style={style.searchContainer}>
            <Form
              width={"75%"}
              placeholder={"Search..."}
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
          <RoomList rooms={rooms} displayMessages messages={recentMessages} />
          <TouchableOpacity
            style={style.addButton}
            onPress={(): void => {
              navigation.navigate("add-room");
            }}
          >
            <Ionicons name="ios-add" size={50} color="white" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
};

export default Menu;
