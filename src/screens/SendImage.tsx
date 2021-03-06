//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import Form from "../components/Form";
import Button from "../components/Button";
import sendMessage from "../scripts/sendMessage";
import { RootState } from "../redux/index.d";
import setKeyboardSocket from "../scripts/setKeyboardSocket";

/**
 * This is the send image screen, this screen will allow the user to send an image.
 */

const SendImage: React.FC = () => {
  const [link, setLink]: any = React.useState("");
  const [error, setError]: any = React.useState(true);
  const navigation: any = useNavigation();

  const { sessionStatus, userInfo }: any = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );

  React.useEffect((): any => {
    setKeyboardSocket(sessionStatus.id, userInfo.username, "start").catch(
      (err: unknown): void => {
        console.error(err);
      }
    );
  }, []);

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
    },
    preview: {
      height: "40%",
      width: "60%",
      borderRadius: 10,
      margin: 50,
    },
    errorText: {
      fontFamily: "poppins",
      fontSize: 15,
      margin: 10,
    },
    buttonContainer: {
      marginTop: 50,
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={style.container}>
        <View>
          <Text style={style.text}>Send a Image...</Text>
        </View>

        {!error ? (
          <Image
            style={style.preview}
            source={{
              uri: link,
            }}
            onError={(): void => {
              setError(true);
            }}
          />
        ) : (
          <View
            style={[
              style.preview,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <MaterialIcons name="error" size={50} color="orange" />
            <Text style={style.errorText}>No image found, try again.</Text>
          </View>
        )}

        <Form
          placeholder={"Image link"}
          onTextChange={(text: string): void => {
            setLink(text);
            setError(false);
          }}
        />
        <View style={style.buttonContainer}>
          <Button
            color={"#00AD98"}
            textColor={"white"}
            text={"Send"}
            onPress={(): void => {
              if (error) {
                Alert.alert(
                  "",
                  "No image found, we can't send an empty one. Please try again"
                );
                return;
              }

              sendMessage({
                id: uuid(),
                content: `!IMG(${link})`,
                room: sessionStatus.id,
                user: userInfo.username,
              })
                .then((): void => {
                  setKeyboardSocket(
                    sessionStatus.id,
                    userInfo.username,
                    "stop"
                  ).catch((err: unknown): void => {
                    console.error(err);
                  });
                  navigation.navigate("chat");
                })
                .catch((err: unknown): void => {
                  console.error(err);
                });
            }}
          />
          <Button
            color={"transparent"}
            textColor={"#000"}
            text={"Cancel"}
            onPress={(): void => {
              setKeyboardSocket(
                sessionStatus.id,
                userInfo.username,
                "stop"
              ).catch((err: unknown): void => {
                console.error(err);
              });

              navigation.navigate("chat");
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SendImage;
