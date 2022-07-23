import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import deleteMessage from "../scripts/deleteMessage";
import { RootState } from "../redux/index.d";
import { clearMessageInfo } from "../redux/action";

/**
 * This is the Message option component, this component will display the message options.(like delete)
 */

const MessageOptions: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const messageInfo: any = useSelector(
    (state: RootState): RootState => state.messageInfo
  );

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    back: {
      justifyContent: "flex-start",
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    text: {
      fontFamily: "poppins",
      fontSize: 20,
      color: "red",
      margin: 10,
    },
    delete: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={style.container}>
      <View style={style.back}>
        <TouchableOpacity
          onPress={(): void => {
            dispatch(clearMessageInfo());
            navigation.navigate("chat");
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={style.delete}
        onPress={(): void => {
          deleteMessage(messageInfo.id, messageInfo.room)
            .then((): void => {
              dispatch(clearMessageInfo());
              navigation.navigate("chat");
            })
            .catch((err: unknown): void => {
              console.error(err);
            });
        }}
      >
        <AntDesign name="delete" size={30} color="red" />
        <Text style={style.text}>Delete message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessageOptions;
