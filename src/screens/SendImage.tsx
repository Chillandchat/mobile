//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
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
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Form from "../components/Form";
import Button from "../components/Button";
import sendMessage from "../scripts/sendMessage";
import { RootState } from "../redux/index.d";
import setKeyboardSocket from "../scripts/setKeyboardSocket";
import { clearImageBase } from "../redux/action";
import uploadContent from "../scripts/uploadContent";
import LoadingSpinner from "../components/LoadingSpinner";

/**
 * This is the send image screen, this screen will allow the user to send an image.
 */

const SendImage: React.FC = () => {
  const [link, setLink]: any = React.useState("");
  const [error, setError]: any = React.useState(true);
  const [keyboardOpen, setKeyboardOpen]: any = React.useState(false);
  const [loading, setLoading]: any = React.useState(false);
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  React.useEffect((): any => {
    Keyboard.addListener("keyboardDidShow", (): void => {
      setKeyboardOpen(true);
    });

    Keyboard.addListener("keyboardDidHide", (): void => {
      setKeyboardOpen(false);
    });
  });

  const { sessionStatus, userInfo, imageBase }: RootState = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );

  React.useEffect((): void => {
    imageBase !== null && imageBase.length > 0 ? setLink(imageBase) : null;
  }, [imageBase]);

  React.useEffect((): any => {
    setKeyboardSocket(sessionStatus.id, userInfo.username, "start").catch(
      (err: unknown): void => {
        console.error(err);
        navigation.navigate("error");
      }
    );
  }, []);

  React.useEffect((): void => {
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
      height: 300,
      width: 300,
      borderRadius: 20,
      margin: 50,
    },
    errorText: {
      fontFamily: "poppins",
      fontSize: 15,
      margin: 10,
    },
    find: {
      position: "absolute",
      bottom: 40,
      left: 40,
    },
    gif: {
      position: "absolute",
      bottom: 40,
      right: 40,
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
        ) : loading ? (
          <View
            style={[
              style.preview,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <LoadingSpinner />
            <Text style={style.errorText}>Uploading...</Text>
          </View>
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

        <View style={style.buttonContainer}>
          <Button
            color={"#00AD98"}
            textColor={"white"}
            text={"Send"}
            onPress={(): void => {
              if (error) {
                Alert.alert(
                  "Fatal error",
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
                    navigation.navigate("error");
                  });
                  dispatch(clearImageBase());
                  navigation.navigate("chat");
                })
                .catch((err: unknown): void => {
                  console.error(err);
                  navigation.navigate("error");
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
                navigation.navigate("error");
              });
              dispatch(clearImageBase());
              navigation.navigate("chat");
            }}
          />
        </View>
      </ScrollView>
      {!keyboardOpen ? (
        <View>
          <TouchableOpacity
            style={style.find}
            onPress={(): void => {
              dispatch(clearImageBase());
              setLoading(true);
              ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
              })
                .then(
                  async (
                    result: ImagePicker.ImagePickerResult
                  ): Promise<void> => {
                    if (result.canceled) {
                      setLoading(false);
                      setError(true);
                    }
                    if (!result.canceled) {
                      uploadContent(
                        userInfo.username,
                        Buffer.from(
                          await FileSystem.readAsStringAsync(
                            result.assets[0].uri,
                            { encoding: FileSystem.EncodingType.Base64 }
                          ),
                          "base64"
                        ),
                        result.assets[0].duration === null
                          ? "CHILL&CHAT_IMG"
                          : "CHILL&CHAT_GIF",
                        true
                      )
                        .then((id: string | void): void => {
                          const url: string = `${
                            Constants.expoConfig?.extra?.API_URL
                          }content/${userInfo.username}/${id as String}.${
                            result.assets[0].duration === null ? "webp" : "gif"
                          }`;

                          setTimeout((): void => {
                            setLink(url);
                            setError(false);
                            setLoading(false);
                          }, 5000);
                        })
                        .catch((err: unknown): void => {
                          Alert.alert(
                            "Upload too large",
                            "Sorry, your file is too large to be uploaded to the Chill&chat cloud. Why not try compressing it!"
                          );
                          console.error(err);
                        });
                    }
                  }
                )
                .catch((err: unknown): void => {
                  setLoading(false);
                  setError(true);
                  console.error(err);
                });
            }}
          >
            <AntDesign name="find" size={35} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.gif}
            onPress={(): void => {
              dispatch(clearImageBase());
              navigation.navigate("image-base");
            }}
          >
            <MaterialCommunityIcons
              name="file-gif-box"
              size={45}
              color="black"
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default SendImage;
