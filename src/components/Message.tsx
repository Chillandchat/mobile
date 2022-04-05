//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { v4 as uuid } from "uuid";

import { MessageProps } from "./index.d";

const Message: React.FC<MessageProps> = (props: MessageProps) => {
  const style: any = StyleSheet.create({
    container: {
      alignSelf: props.message.user === props.user ? "flex-end" : "flex-start",
      margin: 20,
      padding: 20,
      backgroundColor:
        props.message.user === props.user ? "#00AD98" : "#E5E5E5",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomRightRadius: props.message.user === props.user ? 0 : 50,
      borderBottomLeftRadius: props.message.user === props.user ? 50 : 0,
    },
    content: {
      fontFamily: "poppins",
      color: props.message.user === props.user ? "white" : "black",
    },
  });

  return (
    <View style={style.container} key={uuid()}>
      {props.message.user !== props.user ? (
        <Text
          key={uuid()}
          style={[style.content, { fontFamily: "poppinsBold", fontSize: 18 }]}
        >
          {props.user}
        </Text>
      ) : null}
      <Text key={uuid()} style={style.content}>
        {props.message.content}
      </Text>
    </View>
  );
};

export default Message;
