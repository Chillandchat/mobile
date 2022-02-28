import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import Form from "../components/Form";
import { RootState } from "../redux/index.d";
import joinRoom from "../scripts/joinRoom";

/**
 * This is the join room page, this page will prompt the user to join a room.
 */

const JoinRoom: React.FC<any> = ({ navigation }) => {
  let name: string;
  let password: string;

  const { username } = useSelector((state: RootState): RootState => {
    return state.userInfo;
  });

  const [error, setError] = React.useState("");

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    divider: {
      padding: 20,
    },
    title: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
      padding: "15%",
    },
    error: {
      color: "red",
      marginTop: -20,
      marginBottom: 20,
      fontFamily: "poppinsLight",
    },
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={style.container}>
        <View>
          <Text style={style.title}>Join a room...</Text>
        </View>
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

        <Text style={style.error}>{error}</Text>
        <Button
          color={"#00AD98"}
          textColor={"#ffff"}
          text={"Lets' go!"}
          onPress={(): void => {
            if (name !== undefined && password !== undefined) {
              joinRoom(username, name, password)
                .then((): void => {
                  Alert.alert("", "Please restart the app to see the changes.");
                  navigation.navigate("menu");
                })
                .catch((err: unknown): void => {
                  setError("Unable to create room.");
                  console.error(err);
                  setTimeout((): void => {
                    setError("");
                  }, 3000);
                });
            } else {
              setError("Missing data.");
              setTimeout((): void => {
                setError("");
              }, 3000);
            }
          }}
        />
        <Button
          textColor="black"
          color={"transparent"}
          onPress={(): void => {
            navigation.navigate("menu");
          }}
          text={"Cancel"}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default JoinRoom;