import Constants from "expo-constants";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScaledSize,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { AntDesign } from "@expo/vector-icons";
import { Dispatch } from "redux";

import ChatRoomBar from "../components/ChatRoomBar";
import { RootState } from "../redux/index.d";
import { AuthType, MessageType } from "../scripts";
import Message from "../components/Message";
import getMessages from "../scripts/getMessages";
import getUser from "../scripts/getUser";
import {
  clearRoomUserInfo,
  clearSessionData,
  setRoomUserInfo,
} from "../redux/action";
import LoadingSpinner from "../components/LoadingSpinner";
import TypingAnimation from "../components/TypingAnimation";
import SendBar from "../components/SendBar";
import { useNavigation } from "@react-navigation/native";
import RoomWelcomer from "../components/RoomWelcomer";

/**
 * This is the chat room as the name suggests it will display the chat room.
 */

const Chat: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const { sessionStatus, userInfo, roomUserInfo }: RootState = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );

  const scrollRef: React.MutableRefObject<any> = React.useRef();
  const windowDimensions: ScaledSize = Dimensions.get("window");
  const navigator: any = useNavigation();

  const [messageDisplayed, setMessageDisplayed]: any = React.useState([]);
  const [loading, setLoading]: any = React.useState(true);

  const [scrollViewHeight, setScrollViewHeight]: any = React.useState(0);
  const [scrollPosition, setScrollPosition]: any = React.useState(0);

  const [typing, setTyping]: any = React.useState(false);

  React.useEffect((): any => {
    getMessages(sessionStatus.id)
      .then((messages: Array<MessageType>): void => {
        setMessageDisplayed([]);
        setMessageDisplayed([...messages]);

        const userList: typeof sessionStatus.users = [...sessionStatus.users];

        let users: Array<AuthType> = [];

        messages.forEach((message: MessageType): void => {
          if (!userList.includes(message.user)) {
            userList.push(message.user);
          }
        });

        userList.forEach(async (user: string): Promise<void> => {
          if (user !== userInfo.username) {
            getUser(user)
              .then((data: AuthType | {}): void => {
                if (Object.keys(data).length !== 0) {
                  users.push(data as AuthType);
                  if (users.length === userList.length - 1) {
                    dispatch(setRoomUserInfo(users));
                    setLoading(false);
                  }
                }
              })
              .catch((err: unknown): void => {
                console.error(err);
                navigator.navigate("error");
              });
          }
          if (users.length === userList.length - 1) {
            setLoading(false);
          }
        });
      })
      .catch((err: unknown): void => {
        console.error(err);
        navigator.navigate("error");
      });

    const socket: any = io(Constants.manifest?.extra?.SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on(
      `client-message:room(${sessionStatus.id})`,
      (message: MessageType): void => {
        setMessageDisplayed((messagePrevious: any): any =>
          messagePrevious.concat(message)
        );
      }
    );

    socket.on(
      `client-message-delete:room(${sessionStatus.id})`,
      (id: string): void => {
        setMessageDisplayed(
          (messagePrevious: Array<MessageType>): Array<MessageType> =>
            messagePrevious.filter(
              (message: MessageType): boolean => message.id !== id
            )
        );
      }
    );

    return (): void => {
      socket.disconnect();
      Keyboard.removeAllListeners("keyboardDidShow");
      setMessageDisplayed([]);
      dispatch(clearRoomUserInfo());
      dispatch(clearSessionData());
    };
  }, []);

  React.useEffect((): any => {
    Keyboard.removeAllListeners("keyboardDidShow");
    Keyboard.addListener("keyboardDidShow", (): void => {
      scrollRef.current.scrollTo({
        y: scrollViewHeight,
        animated: true,
      });
    });
  }, [scrollViewHeight]);

  const style: any = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      flexDirection: "column",
    },
    text: {
      fontFamily: "poppins",
    },
    chatRoomBar: {
      paddingBottom: 20,
      marginTop: 20,
      alignItems: "center",
      marginHorizontal: 40,
      width: windowDimensions.width,
    },
    chatArea: {
      width: "90%",
      marginBottom: -20,
      flex: 1,
    },
    loadingMessageContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    downButton: {
      alignItems: "flex-start",
      flexDirection: "row",
      width: "80%",
      marginBottom: -10,
    },
    informationPanel: {
      alignItems: "center",
      marginHorizontal: "10%",
      paddingTop: 20,
    },
  });

  return sessionStatus?.users.includes(userInfo.username) ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={style.container}>
        <SafeAreaView>
          <View style={style.chatRoomBar}>
            <ChatRoomBar />
          </View>
        </SafeAreaView>
        <View style={style.chatArea}>
          {!loading ? (
            <ScrollView
              ref={scrollRef}
              scrollEventThrottle={16}
              onScroll={(event: any): void => {
                setScrollPosition(event.nativeEvent.contentOffset.y);
              }}
              onContentSizeChange={(_width, height) => {
                if (scrollViewHeight === 0)
                  scrollRef.current.scrollTo({
                    y: height,
                    animated: false,
                  });
                else if (
                  scrollViewHeight < height &&
                  scrollPosition + windowDimensions.height >= scrollViewHeight
                )
                  scrollRef.current.scrollTo({
                    y: height,
                    animated: true,
                  });

                setScrollViewHeight(height);
              }}
            >
              <RoomWelcomer />
              {messageDisplayed?.map((tmpMessage: MessageType): any => {
                const readMessage: string = tmpMessage.content;

                let message: MessageType = { ...tmpMessage };

                [...message.content.matchAll(/!BOLD\((.*?)\)/g)].forEach(
                  (value: any): void => {
                    message.content = message.content.replace(
                      `!BOLD(${value[1]})`,
                      `<Text style={[bindingStyle.content, {fontFamily: "poppinsBold"}]}>${value[1]}</Text>`
                    );
                  }
                );

                [...message.content.matchAll(/!ITALIC\((.*?)\)/g)].forEach(
                  (value: any): void => {
                    message.content = message.content.replace(
                      `!ITALIC(${value[1]})`,
                      `<Text style={[bindingStyle.content, { fontStyle: "italic"}]}>${value[1]}</Text>`
                    );
                  }
                );

                [...message.content.matchAll(/!UNDERLINE\((.*?)\)/g)].forEach(
                  (value: any): void => {
                    message.content = message.content.replace(
                      `!UNDERLINE(${value[1]})`,
                      `<Text style={[bindingStyle.content, {textDecorationLine: 'underline'}]}>${value[1]}</Text>`
                    );
                  }
                );

                [...message.content.matchAll(/!TITLE\((.*?)\)/g)].forEach(
                  (value: any): void => {
                    message.content = message.content.replace(
                      `!TITLE(${value[1]})`,
                      `<Text style={[bindingStyle.content, {fontFamily: "poppinsBold", fontSize: 20}]}>${value[1]}</Text>`
                    );
                  }
                );

                if (message.content.includes("@")) {
                  sessionStatus.users.forEach((username: string): void => {
                    if (
                      message.content.includes(`@${username}`) &&
                      !message.content.includes(
                        `<Text style={[bindingStyle.content, {fontFamily: "poppinsBold"}]}>@${username}</Text>`
                      )
                    ) {
                      message.content = message.content.replaceAll(
                        `@${username}`,
                        `<Text style={[bindingStyle.content, {fontFamily: "poppinsBold"}]}>@${username}</Text>`
                      );
                      if (
                        message.user !== userInfo.username &&
                        username === userInfo.username
                      ) {
                        message.content = message.content.replaceAll(
                          `@${username}`,
                          `<Text style={[bindingStyle.content, {fontFamily: "poppinsBold", color:"red"}]}>@${username}</Text>`
                        );
                      }
                    }
                  });
                }

                return (
                  <Message
                    readMessage={readMessage}
                    key={message.id}
                    messageUserInfo={
                      message.user !== userInfo.username
                        ? roomUserInfo.find(
                            (user: AuthType): boolean =>
                              user.username === message.user
                          )
                        : userInfo
                    }
                    message={{
                      id: message.id,
                      user: message.user,
                      content: message.content,
                      room: message.room,
                    }}
                  />
                );
              })}
            </ScrollView>
          ) : (
            <View style={style.loadingMessageContainer}>
              <LoadingSpinner />
              <Text style={[style.text, { marginTop: 20, marginBottom: 40 }]}>
                Loading, please wait...
              </Text>
            </View>
          )}
        </View>
        {scrollPosition + windowDimensions.height <= scrollViewHeight ? (
          <TouchableOpacity
            style={style.downButton}
            onPress={(): void => {
              scrollRef.current.scrollTo({
                y: scrollViewHeight,
                animated: true,
              });
            }}
          >
            <AntDesign name="arrowdown" size={32} color={"#00AD98"} />
          </TouchableOpacity>
        ) : null}
        <View style={style.informationPanel}>
          <TypingAnimation state={[typing, setTyping]} />
          {sessionStatus.users?.length <= 1 ? (
            <Text
              style={[
                style.text,
                {
                  opacity: 0.5,
                  marginBottom: Platform.OS === "android" ? 0 : -10,
                  borderColor: "#e5e5e5",
                  borderWidth: 3,
                  padding: 20,
                  borderRadius: 20,
                },
              ]}
            >
              hmmm... It seems like that there's nobody here. Why not invite a
              friend!
            </Text>
          ) : null}
        </View>
        <SendBar typing={typing} />
      </ScrollView>
    </KeyboardAvoidingView>
  ) : null;
};

export default Chat;
