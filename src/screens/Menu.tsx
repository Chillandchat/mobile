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
import Constants from "expo-constants";
import { io } from "socket.io-client";

import RoomList from "../components/RoomList";
import Icon from "../components/Icon";
import { RootState } from "../redux/index.d";
import getRoom from "../scripts/getRooms";
import { MessageType, RoomType } from "../scripts/index.d";
import Form from "../components/Form";
import getMessages from "../scripts/getMessages";
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
    const socket: any = io(Constants.manifest?.extra?.SOCKET_URL, {
      transports: ["websocket"],
    });

    getRoom(username).then((ref: Array<RoomType>): void => {
      ref.forEach((room: RoomType): void => {
        socket.on(
          `client-message-delete:room(${room.id})`,
          (_id: string): void => {
            let tmpRecentMessages: Array<MessageType> = [];

            ref.forEach((room: RoomType): void => {
              getMessages(room.id)
                .then((returnedMessages: Array<MessageType>): void => {
                  if (returnedMessages.length !== 0) {
                    let current: MessageType =
                      returnedMessages[returnedMessages.length - 1];
                    current.content = `${
                      returnedMessages[returnedMessages.length - 1].user
                    }: ${
                      returnedMessages[returnedMessages.length - 1].content
                    }`;

                    [...current.content.matchAll(/!IMG\((.*?)\)/g)].forEach(
                      (value: any): void => {
                        current.content = current.content.replace(
                          value[0],
                          "<Sent an image>"
                        );
                      }
                    );

                    [...current.content.matchAll(/!(.*?)\((.*?)\)/g)].forEach(
                      (value: any): void => {
                        current.content = current.content.replace(
                          value[0],
                          value[0].slice(
                            value[0].match(/!(.*?)\(/)[0].length,
                            value[0].length - 1
                          )
                        );
                      }
                    );

                    tmpRecentMessages.push(current);
                    setRecentMessages(
                      (_prev: Array<MessageType>): Array<MessageType> => {
                        _prev.length === defaultRooms.length ||
                        defaultRooms.length === 1
                          ? setRooms(defaultRooms)
                          : null;

                        return tmpRecentMessages;
                      }
                    );
                  } else {
                    setRooms(defaultRooms);
                  }
                })
                .catch((err: unknown): void => {
                  console.error(err);
                  navigation.navigate("error");
                });
            });
          }
        );
        socket.on(
          `client-message:room(${room.id})`,
          (message: MessageType): void => {
            setRecentMessages((prev: Array<MessageType>): typeof prev => {
              const index: number = prev.indexOf(
                // @ts-ignore
                prev.find(
                  (value: MessageType): boolean => value.room === room.id
                )
              );
              if (index > -1) {
                prev.splice(index, 1);
                message.content = `${message.user}: ${message.content}`;

                [...message.content.matchAll(/!IMG\((.*?)\)/g)].forEach(
                  (value: any): void => {
                    message.content = message.content.replace(
                      value[0],
                      "<Sent an image>"
                    );
                  }
                );

                [...message.content.matchAll(/!(.*?)\((.*?)\)/g)].forEach(
                  (value: any): void => {
                    message.content = message.content.replace(
                      value[0],
                      value[0].slice(
                        value[0].match(/!(.*?)\(/)[0].length,
                        value[0].length - 1
                      )
                    );
                  }
                );
              }
              return prev.concat(message);
            });
          }
        );
      });

      if (!ran && JSON.stringify(defaultRooms) === JSON.stringify(ref)) {
        let tmpRecentMessages: Array<MessageType> = [];

        ref.forEach((room: RoomType): void => {
          getMessages(room.id)
            .then((returnedMessages: Array<MessageType>): void => {
              if (returnedMessages.length !== 0) {
                let current: MessageType =
                  returnedMessages[returnedMessages.length - 1];
                current.content = `${
                  returnedMessages[returnedMessages.length - 1].user
                }: ${returnedMessages[returnedMessages.length - 1].content}`;

                [...current.content.matchAll(/!IMG\((.*?)\)/g)].forEach(
                  (value: any): void => {
                    current.content = current.content.replace(
                      value[0],
                      "<Sent an image>"
                    );
                  }
                );

                [...current.content.matchAll(/!(.*?)\((.*?)\)/g)].forEach(
                  (value: any): void => {
                    current.content = current.content.replace(
                      value[0],
                      value[0].slice(
                        value[0].match(/!(.*?)\(/)[0].length,
                        value[0].length - 1
                      )
                    );
                  }
                );

                tmpRecentMessages.push(current);
                setRecentMessages(
                  (_prev: Array<MessageType>): Array<MessageType> => {
                    _prev.length === defaultRooms.length ||
                    defaultRooms.length === 1
                      ? setRooms(defaultRooms)
                      : null;

                    return tmpRecentMessages;
                  }
                );
              } else {
                setRooms(defaultRooms);
              }
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
      zIndex: 3,
      marginBottom: 10,
      position: "absolute",
      bottom: "5%",
      padding: 5,
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
          <View style={style.addButton}>
            <Button
              color={"#00ad98"}
              text="Add room"
              textColor={"white"}
              onPress={(): void => {
                navigation.navigate("add-room");
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
};

export default Menu;
