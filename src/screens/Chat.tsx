//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
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
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import Form from "../components/Form";
import ChatRoomBar from "../components/ChatRoomBar";
import { RootState } from "../redux/index.d";
import sendMessage from "../scripts/sendMessage";
import { AuthType, MessageType } from "../scripts";
import Message from "../components/Message";
import getMessages from "../scripts/getMessages";
import filter from "../scripts/filter";
import setKeyboardSocket from "../scripts/setKeyboardSocket";
import getUser from "../scripts/getUser";
import { clearRoomUserInfo, setRoomUserInfo } from "../redux/action";
import { Dispatch } from "redux";

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

  const navigator: any = useNavigation();

  const scrollRef: React.MutableRefObject<any> = React.useRef();
  const windowDimensions: ScaledSize = Dimensions.get("window");

  const [message, setMessage]: any = React.useState("");
  const [textBoxHelper, setTextBoxHelper]: any = React.useState(undefined);
  const [messageDisplayed, setMessageDisplayed]: any = React.useState([]);
  const [loading, setLoading]: any = React.useState(true);
  const [errorMessage, setErrorMessage]: any = React.useState("");
  const [keyboardOpen, setKeyboardOpen]: any = React.useState(false);
  const [scrollViewHeight, setScrollViewHeight]: any = React.useState(0);
  const [scrollPosition, setScrollPosition]: any = React.useState(0);

  const [typing, setTyping]: any = React.useState(false);
  const [typingUser, setTypingUser]: any = React.useState("");

  React.useEffect((): any => {
    dispatch(clearRoomUserInfo());
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
              });
          }
          if (users.length === userList.length - 1) {
            setLoading(false);
          }
        });
      })
      .catch((err: unknown): void => {
        console.error(err);
      });

    const socket: any = io(Constants.manifest?.extra?.SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on(
      `keyboard-start:room(${sessionStatus.id})`,
      (user: string): void => {
        if (user !== userInfo.username) {
          setTyping(true);
          setTypingUser(user);
          setAnimationFrame((prevState: number): number => prevState + 1);
        }
      }
    );

    socket.on(`keyboard-stop:room(${sessionStatus.id})`, (): void => {
      setTyping(false);
      setTypingUser("");
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

    Keyboard.addListener("keyboardDidShow", (): void => {
      setKeyboardOpen(true);
    });

    Keyboard.addListener("keyboardDidHide", (): void => {
      setKeyboardOpen(false);
    });

    return (): void => {
      socket.disconnect();
      setAnimationFrame(0);
      setMessageDisplayed([]);
    };
  }, []);

  const [animationFrame, setAnimationFrame]: any = React.useState(0);
  const [animationIndexArray, setAnimationIndexArray]: any = React.useState([
    0, 0, 0,
  ]);

  React.useEffect((): void => {
    if (typing) {
      setTimeout((): void => {
        if (animationFrame >= Math.pow(2, 31) - 2) setAnimationFrame(0);
        setAnimationFrame((prevState: number): number => prevState + 1);
        setAnimationIndexArray((prevState: Array<number>): Array<number> => {
          if (prevState[0] == 1) {
            return [0, 1, 0];
          }
          if (prevState[1] == 1) {
            return [0, 0, 1];
          }
          return [1, 0, 0];
        });
      }, 700);
    }
  }, [animationFrame]);

  const style: any = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      flexDirection: "column",
      marginTop: keyboardOpen ? 30 : 0,
    },
    keyboardMessageContainer: {
      flexDirection: "row",
    },
    text: {
      fontFamily: "poppins",
    },
    sendBar: {
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      bottom: "7%",
      marginHorizontal: 50,
      maxHeight: 100,
    },
    chatRoomBar: {
      position: "absolute",
      top: "7%",
      width: "100%",
    },
    chatArea: {
      height: "65%",
      width: "90%",
      marginBottom: -20,
    },
    loadingMessageContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    typingMessage: {
      fontFamily: "poppins",
      fontSize: 16,
      alignSelf: "flex-start",
      marginLeft: 5,
    },
    typingMessageContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    typingAnimationComponent: {
      height: 10,
      width: 10,
      marginHorizontal: 3,
      borderRadius: 5,
    },
    sendIcon: {
      marginLeft: Platform.OS == "android" ? 23 : 15,
    },
    sendImage: {
      marginRight: Platform.OS == "android" ? 23 : 15,
      marginLeft: -10,
    },
    downButton: {
      alignItems: "flex-start",
      flexDirection: "row",
      width: "80%",
    },
  });

  return sessionStatus?.users.includes(userInfo.username) ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.chatRoomBar}>
          <ChatRoomBar />
        </View>
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
              {messageDisplayed?.map((tmpMessage: MessageType): any => {
                const readMessage: string = tmpMessage.content;

                let message: MessageType = { ...tmpMessage };

                if (message.content.includes("@")) {
                  sessionStatus.users.forEach((username: string): void => {
                    if (
                      message.content.includes(`@${username}`) &&
                      !message.content.includes(
                        `<Text style={[bindingStyle.content, {fontFamily: "poppinsBold"}]}>@${username}</Text>`
                      )
                    ) {
                      message.content = message.content.replace(
                        `@${username}`,
                        `<Text style={[bindingStyle.content, {fontFamily: "poppinsBold"}]}>@${username}</Text>`
                      );
                      if (
                        message.user !== userInfo.username &&
                        username === userInfo.username
                      ) {
                        message.content = message.content.replace(
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
              <Text style={style.text}>Loading, please wait...</Text>
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
        <View
          style={{
            justifyContent: "center",
            marginHorizontal: "10%",
            marginTop: 5,
          }}
        >
          <Text style={[style.text, { color: "red" }]}>{errorMessage}</Text>

          {typing ? (
            <View style={style.typingMessageContainer}>
              <View
                style={[
                  style.typingAnimationComponent,
                  {
                    backgroundColor:
                      animationIndexArray[0] === 1 ? "#00AD98" : "black",
                    opacity: animationIndexArray[0] === 1 ? 1 : 0.2,
                  },
                ]}
              />
              <View
                style={[
                  style.typingAnimationComponent,
                  {
                    backgroundColor:
                      animationIndexArray[1] === 1 ? "#00AD98" : "black",
                    opacity: animationIndexArray[1] === 1 ? 1 : 0.2,
                  },
                ]}
              />
              <View
                style={[
                  style.typingAnimationComponent,
                  {
                    backgroundColor:
                      animationIndexArray[2] === 1 ? "#00AD98" : "black",
                    opacity: animationIndexArray[2] === 1 ? 1 : 0.2,
                  },
                ]}
              />
              <Text style={style.typingMessage}>{typingUser} is typing...</Text>
            </View>
          ) : null}

          {sessionStatus.users?.length <= 1 ? (
            <Text
              style={[
                style.text,
                {
                  opacity: 0.5,
                  paddingBottom: Platform.OS === "android" ? 30 : 20,
                },
              ]}
            >
              hmmm... It seems like that there's nobody here. Why not invite a
              friend!
            </Text>
          ) : null}
        </View>
        <View style={style.sendBar}>
          <TouchableOpacity
            style={style.sendImage}
            onPress={(): void => {
              navigator.navigate("send-image");
            }}
          >
            <Ionicons name="images-outline" size={32} color="#00AD98" />
          </TouchableOpacity>
          <Form
            placeholder={"Type a message..."}
            multiline
            onTextChange={(text: string): void => {
              if (text !== "" && !typing) {
                setKeyboardSocket(
                  sessionStatus.id,
                  userInfo.username,
                  "start"
                ).catch((err: unknown): void => {
                  console.error(err);
                });
              }

              if (text === "") {
                setKeyboardSocket(
                  sessionStatus.id,
                  userInfo.username,
                  "stop"
                ).catch((err: unknown): void => {
                  console.error(err);
                });
              }

              setMessage((_prevState: string): string => text);
            }}
            value={textBoxHelper}
          />
          <View style={style.sendIcon}>
            <TouchableOpacity
              onPress={(): void => {
                if (message === undefined || message === "") return;

                if (message.length > 200) {
                  setErrorMessage(
                    "Whoa there! That's a lot of characters! You can't send messages that long!"
                  );

                  setTimeout((): void => {
                    setErrorMessage("");
                  }, 5000);

                  return;
                }

                const filteredMessage = filter(message);

                sendMessage({
                  id: uuid(),
                  content: filteredMessage,
                  room: sessionStatus.id,
                  user: userInfo.username,
                })
                  .then((): void => {
                    setKeyboardSocket(
                      sessionStatus.id,
                      userInfo.username,
                      "stop"
                    );
                    setMessage("");
                    setTextBoxHelper("");
                    setTextBoxHelper(undefined);
                  })
                  .catch((err: unknown): void => {
                    console.error(err);
                  });
              }}
            >
              <Feather name="send" size={32} color="#00AD98" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  ) : null;
};

export default Chat;
