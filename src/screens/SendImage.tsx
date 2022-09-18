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
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Form from "../components/Form";
import Button from "../components/Button";
import sendMessage from "../scripts/sendMessage";
import { RootState } from "../redux/index.d";
import setKeyboardSocket from "../scripts/setKeyboardSocket";
import { clearImageBase } from "../redux/action";

/**
 * This is the send image screen, this screen will allow the user to send an image.
 */

const SendImage: React.FC = () => {
  const [link, setLink]: any = React.useState("");
  const [error, setError]: any = React.useState(true);
  const [keyboardOpen, setKeyboardOpen]: any = React.useState(false);
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const imageBase: any = useSelector(
    (state: RootState): RootState => state.imageBase
  );

  React.useEffect((): any => {
    Keyboard.addListener("keyboardDidShow", (): void => {
      setKeyboardOpen(true);
    });

    Keyboard.addListener("keyboardDidHide", (): void => {
      setKeyboardOpen(false);
    });
  });

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

  React.useEffect((): void => {
    if (imageBase === null) return;
    setLink(imageBase);
    setError(false);
  }, [imageBase]);

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
    find: {
      position: "absolute",
      bottom: 40,
      left: 40,
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
          value={imageBase === null ? undefined : imageBase}
          onTextChange={(text: string): void => {
            setLink(text);
            console.log("bi");
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
                  dispatch(clearImageBase());
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
              dispatch(clearImageBase());
              navigation.navigate("chat");
            }}
          />
        </View>
      </ScrollView>
      {!keyboardOpen ? (
        <TouchableOpacity
          style={style.find}
          onPress={(): void => {
            dispatch(clearImageBase());
            navigation.navigate("image-base");
          }}
        >
          <AntDesign name="find" size={35} color="black" />
        </TouchableOpacity>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default SendImage;
