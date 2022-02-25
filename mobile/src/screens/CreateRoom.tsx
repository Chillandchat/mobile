import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "../components/Button";
import Form from "../components/Form";

const CreateRoom: React.FC = () => {
  let name: string;
  let password: string;

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: "60%",
    },
    divider: {
      padding: 20,
    },
    title: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
      padding: "15%",
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.title}>Create a room...</Text>
      <Form
        safeEntry={false}
        placeholder={"Name"}
        onTextChange={(text: string): void => {
          name = text;
        }}
      />

      <View style={style.divider} />

      <Form
        safeEntry
        placeholder={"Password"}
        onTextChange={(text: string): void => {
          password = text;
        }}
      />

      <View style={style.divider} />

      <Button
        color={"#00AD98"}
        textColor={"#ffff"}
        text={"Lets' go!"}
        onPress={(): void => {}}
      />
    </View>
  );
};

export default CreateRoom;
