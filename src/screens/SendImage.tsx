//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import React from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import Form from "../components/Form";
import Button from "../components/Button";
import sendMessage from "../scripts/sendMessage";
import { RootState } from "../redux/index.d";

/**
 * This is the send image screen, this screen will allow the user to send an image.
 */

const SendImage: React.FC = () => {
  const [link, setLink]: any = React.useState(
    "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg?resize=960,872?quality=90&webp=true&resize=600,545"
  );
  const [error, setError]: any = React.useState(false);
  const navigation: any = useNavigation();

  const { sessionStatus, userInfo } = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );

  React.useEffect((): any => {
    
  },[]);

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
      fontSize: 17,
      margin: 10,
    },
    buttonContainer: {
      marginTop: 50,
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.text}>Send a Image...</Text>
      {!error ? (
        <Image
          style={style.preview}
          source={{
            uri: link,
          }}
          onError={(): void => {
            console.log("error");
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
              content: `IMG(${link});`,
              room: sessionStatus.id,
              user: userInfo.username,
            });

            navigation.navigate("chat");
          }}
        />
        <Button
          color={"transparent"}
          textColor={"#000"}
          text={"Cancel"}
          onPress={(): void => {
            navigation.navigate("chat");
          }}
        />
      </View>
    </View>
  );
};

export default SendImage;
