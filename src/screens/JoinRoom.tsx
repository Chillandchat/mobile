import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import Button from "../components/Button";
import Form from "../components/Form";
import { RootState } from "../redux/index.d";
import joinRoom from "../scripts/joinRoom";
import { clearScannerResult } from "../redux/action";

/**
 * This is the join room page, this page will prompt the user to join a room.
 */

const JoinRoom: React.FC<any> = () => {
  const [name, setName]: any = React.useState("");
  const [password, setPassword]: any = React.useState("");

  const dispatch: Dispatch = useDispatch();

  const navigation: any = useNavigation();

  const { userInfo, scannerResult }: RootState = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );

  React.useEffect((): void => {
    if (scannerResult !== null) setName(scannerResult);
  }, [scannerResult]);

  const [error, setError]: any = React.useState("");

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
      padding: 60,
    },
    error: {
      color: "red",
      marginTop: -20,
      marginBottom: 20,
      fontFamily: "poppinsLight",
    },
    divider: {
      padding: 20,
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={style.container}>
        <View>
          <Text style={style.title}>Join a room...</Text>
        </View>
        <Form
          safeEntry={false}
          placeholder={"Name"}
          value={name}
          onTextChange={(text: string): void => {
            setName(text);
          }}
        />

        <View style={style.divider} />

        <Form
          safeEntry
          placeholder={"Password"}
          onTextChange={(text: string): void => {
            setPassword(text);
          }}
        />

        <View style={style.divider} />

        <Text style={style.error}>{error}</Text>
        <Button
          color={"#00AD98"}
          textColor={"#ffff"}
          text={"Lets' go!"}
          onPress={(): void => {
            if (name !== "" && password !== "") {
              joinRoom(userInfo.username, name, password)
                .then((): void => {
                  dispatch(clearScannerResult());
                  navigation.push("control-center");
                })
                .catch((err: unknown): void => {
                  setError("Unable to join room.");
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
            navigation.navigate("control-center");
          }}
          text={"Cancel"}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default JoinRoom;
