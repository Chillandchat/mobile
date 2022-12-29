import Constants from "expo-constants";
import React from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { View, StyleSheet, Text } from "react-native";

import { TypingAnimationProps as Props } from "./index.d";
import { RootState } from "../redux/index.d";

/**
 * This is the typing animation component, this component renders the animation that shows if someone is typing.
 *
 * @prop {[boolean, () => boolean]} state The state to change to show if it's activated.
 */

const TypingAnimation: React.FC<Props> = (props: Props): any => {
  const { sessionStatus, userInfo }: RootState = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );

  const [animationFrame, setAnimationFrame]: any = React.useState(0);
  const [animationIndexArray, setAnimationIndexArray]: any = React.useState([
    0, 0, 0,
  ]);

  const [typing, setTyping]: any = React.useState(false);
  const [typingUser, setTypingUser]: any = React.useState("");

  const [_data, setData]: any = props.state;

  const style: any = StyleSheet.create({
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
    container: typing
      ? {
          borderColor: "#e5e5e5",
          borderWidth: 3,
          padding: 10,
          borderRadius: 10,
          paddingHorizontal: 40,
          marginTop: 20,
        }
      : {},
  });

  React.useEffect((): (() => void) => {
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
          setData(true);
        }
      }
    );

    socket.on(`keyboard-stop:room(${sessionStatus.id})`, (): void => {
      setTyping(false);
      setTypingUser("");
      setData(false);
    });

    const timer: any = setInterval((): void => {
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

    return (): void => {
      setAnimationFrame(0);
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={style.container}>
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
    </View>
  );
};

export default TypingAnimation;
