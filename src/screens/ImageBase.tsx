import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import Form from "../components/Form";

/**
 * This is the image base component/screen.
 * This screen allows users to send one of the provided Chill&chat images in the chat room.
 */

const ImageBase: React.FC = () => {
  const [filter, setFilter]: any = React.useState("");
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      height: 300,
      width: 300,
      borderRadius: 20,
    },
    back: {
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    imageContainer: {
      backgroundColor: "#E5E5E5",
      margin: 20,
      borderRadius: 20,
      height: 300,
      width: 300,
    },
    imageListContainer: {
      height: "55%",
      width: "90%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={style.container}>
        <TouchableOpacity
          style={style.back}
          onPress={(): void => {
            navigation.navigate("send-image");
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <Form
          placeholder="Search"
          onTextChange={(text: string): void => {
            setFilter(text);
          }}
        />
        <View style={style.imageListContainer}>
          <ScrollView>
            {/* <TouchableOpacity
                  key={image.link}
                  style={style.imageContainer}
                  onPress={(): void => {
                    dispatch(setImageBase(image.link));
                    navigation.navigate("send-image");
                  }}
                >
                  <Image source={{ uri: image.link }} style={style.image} />
                </TouchableOpacity> */}
          </ScrollView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ImageBase;
