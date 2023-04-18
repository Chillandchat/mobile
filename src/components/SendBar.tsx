//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import filter from "../scripts/filter";
import sendMessage from "../scripts/sendMessage";
import setKeyboardSocket from "../scripts/setKeyboardSocket";
import Form from "./Form";
import { SendBarProps as Props } from "./index.d";
import { RootState } from "../redux/index.d";

/**
 * This is the send bar component for the chat room, this is where the user can input a message and send it.
 * This component will normally be located at the bottom of the chat room.
 *
 * @prop {boolean} typing Whether the user is typing.
 */

const SendBar: React.FC<Props> = (props: Props) => {
  const navigator: any = useNavigation();

  const { sessionStatus, userInfo }: RootState = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );

  const [message, setMessage]: any = React.useState("");
  const [textBoxHelper, setTextBoxHelper]: any = React.useState(undefined);
  const [errorMessage, setErrorMessage]: any = React.useState("");

  const style: any = StyleSheet.create({
    sendBar: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 50,
      maxHeight: 100,
      marginBottom: 40,
      paddingTop: errorMessage !== "" ? 30 : 0,
    },
    sendIcon: {
      marginLeft: Platform.OS == "android" ? 23 : 15,
    },
    sendImage: {
      marginRight: Platform.OS == "android" ? 23 : 15,
      marginLeft: -10,
    },
    informationPanel: {
      alignItems: "center",
      marginHorizontal: "10%",
      paddingTop: 20,
    },
    text: {
      fontFamily: "poppins",
    },
  });

  return (
    <View>
      <View style={style.informationPanel}>
        <Text
          style={[
            style.text,
            {
              color: "red",
            },
          ]}
        >
          {errorMessage}
        </Text>
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
            if (text !== "" && !props.typing) {
              setKeyboardSocket(
                sessionStatus.id,
                userInfo.username,
                "start"
              ).catch((err: unknown): void => {
                console.error(err);
                navigator.navigate("error");
              });
            }

            if (text === "") {
              setKeyboardSocket(
                sessionStatus.id,
                userInfo.username,
                "stop"
              ).catch((err: unknown): void => {
                console.error(err);
                navigator.navigate("error");
              });
            }

            setMessage(text);
          }}
          value={textBoxHelper}
        />
        <View style={style.sendIcon}>
          <TouchableOpacity
            onPress={(): void => {
              if (message === undefined || message === "") return;

              setMessage(message.replace(/[{}<>\/\\\n]/g, "\\$&"));

              if (message.length > 2000) {
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
                  navigator.navigate("error");
                });
            }}
          >
            <Feather name="send" size={32} color="#00AD98" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SendBar;
