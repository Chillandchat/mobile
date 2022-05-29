//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
// @ts-ignore
import { SOCKET_URL } from "@env";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import Form from "../components/Form";
import ChatRoomBar from "../components/ChatRoomBar";
import { RootState } from "../redux/index.d";
import sendMessage from "../scripts/sendMessage";
import { MessageType } from "../scripts";
import Message from "../components/Message";
import getMessages from "../scripts/getMessages";
import filter from "../scripts/filter";
import setKeyboardSocket from "../scripts/setKeyboardSocket";

/**
 * This is the chat room as the name suggests it will display the chat room.
 */

const Chat: React.FC = () => {
  const { sessionStatus, userInfo }: any = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );

  const scrollRef: React.MutableRefObject<any> = React.useRef();

  const [message, setMessage]: any = React.useState("");
  const [messageDisplayed, setMessageDisplayed]: any = React.useState([]);
  const [loading, setLoading]: any = React.useState(true);
  const [errorMessage, setErrorMessage]: any = React.useState("");

  const [typing, setTyping]: any = React.useState(false);
  const [typingUser, setTypingUser]: any = React.useState("");

  React.useEffect((): any => {
    getMessages(sessionStatus.id)
      .then((messages: Array<MessageType>): void => {
        setMessageDisplayed([]);
        setMessageDisplayed([...messageDisplayed, ...messages]);
        setLoading(false);
      })
      .catch((err: unknown): void => {
        console.error(err);
      });

    const socket: any = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on(
      `keyboard-start:room(${sessionStatus.id})`,
      (user: string): void => {
        if (user == userInfo.username) {
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
    return (): void => {
      socket.disconnect();
      setAnimationFrame(0);
    };
  }, []);

  const [animationFrame, setAnimationFrame]: any = React.useState(0);
  const [animationIndexArray, setAnimationIndexArray]: any = React.useState([
    0, 0, 0,
  ]);

  React.useEffect((): void => {
    if (typing) {
      setTimeout((): void => {
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
      }, 1200);
    }
  }, [animationFrame]);

  const style: any = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      flexDirection: "column",
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
    },
    sendIcon: {
      padding: 10,
    },
    chatRoomBar: {
      position: "absolute",
      top: "7%",
      width: "100%",
    },
    chatArea: {
      height: "60%",
      width: "90%",
      marginTop: 10,
    },
    typingMessage: {
      fontFamily: "poppins",
      fontSize: 16,
      alignSelf: "flex-start",
      marginLeft: 5
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
  });

  return (
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
          <ScrollView
            ref={scrollRef}
            onContentSizeChange={(_width, height) => {
              scrollRef.current.scrollTo({ y: height, animated: true });
            }}
          >
            {!loading ? (
              messageDisplayed?.map((message: MessageType): any => {
                return (
                  <Message
                    message={{
                      id: message.id,
                      user: message.user,
                      content: message.content,
                      room: message.room,
                    }}
                  />
                );
              })
            ) : (
              <Text style={[style.text, { alignSelf: "center", flex: 1 }]}>
                Loading, please wait...
              </Text>
            )}
          </ScrollView>
        </View>
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
              <Text style={style.typingMessage}>
                {typingUser} is typing...
              </Text>
            </View>
          ) : null}

          {sessionStatus.users?.length <= 1 ? (
            <Text style={[style.text, { opacity: 0.5, paddingBottom: 20 }]}>
              hmmm... It seems like that there's nobody here. Why not invite a
              friend!
            </Text>
          ) : null}
        </View>
        <View style={style.sendBar}>
          <Form
            placeholder={"Type a message..."}
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

              setMessage(text);
            }}
            value={message}
          />
          <View style={style.sendIcon}>
            <TouchableOpacity
              onPress={(): void => {
                if (message === undefined || message === "") return;

                if (message.length > 150) {
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
  );
};

export default Chat;
