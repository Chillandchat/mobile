import Checkbox from "expo-checkbox";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import { useSelector } from "react-redux";

import Button from "../components/Button";
import Form from "../components/Form";
import { RootState } from "../redux/index.d";
import createRoom from "../scripts/createRoom";

/**
 * This is the create room page, this page will prompt the user to create a room.
 */

const CreateRoom: React.FC<any> = ({ navigation }) => {
  const [name, setName]: any = React.useState("");
  const [password, setPassword]: any = React.useState("");
  const [isPublic, setIsPublic]: any = React.useState(false);
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
      padding: 60,
    },
    error: {
      color: "red",
      marginTop: -5,
      marginBottom: 20,
      fontFamily: "poppinsLight",
      paddingTop: 15,
    },
    checkBox: {
      margin: 10,
    },
    selection: {
      flexDirection: "row",
    },
    text: {
      fontFamily: "poppins",
      fontSize: 15,
      paddingHorizontal: 10,
    },
    password: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={style.container}>
        <View>
          <Text style={style.title}>Create a room...</Text>
        </View>
        <Form
          safeEntry={false}
          placeholder={"Name"}
          onTextChange={(text: string): void => {
            setName(text);
          }}
        />
        {!isPublic ? (
          <View style={style.password}>
            <View style={style.divider} />

            <Form
              safeEntry
              placeholder={"Password"}
              onTextChange={(text: string): void => {
                setPassword(text);
              }}
            />
          </View>
        ) : null}

        <View style={style.divider} />

        <View style={style.selection}>
          <Checkbox
            style={style.checkbox}
            value={isPublic}
            onValueChange={(value: boolean): void => {
              setIsPublic(value);
            }}
            color={isPublic ? "#00AD98" : undefined}
          />
          <Text style={style.text}>Make this room public</Text>
        </View>
        <Text style={style.error}>{error}</Text>
        <Button
          color={"#00AD98"}
          textColor={"#ffff"}
          text={"Lets' go!"}
          onPress={(): void => {
            if (name !== "") {
              if (password.length < 5 && !isPublic) {
                setError("Password must be at least 5 letters long.");
                setTimeout((): void => {
                  setError("");
                }, 3000);
                return;
              }

              if (isPublic) setPassword(null);

              createRoom(name, password, username, isPublic)
                .then((): void => {
                  if (name === "Rick roll" || name === "Rick astley")
                    Linking.openURL(
                      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    );
                  navigation.push("menu");
                })
                .catch((err: unknown): void => {
                  setError("Unable to create room.");
                  console.error(err);
                  setTimeout((): void => {
                    setError("");
                  }, 3000);
                });
            } else {
              setError("Please fill out all fields.");
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

export default CreateRoom;
