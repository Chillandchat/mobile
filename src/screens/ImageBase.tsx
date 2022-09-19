import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Form from "../components/Form";
import Images from "./images";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setImageBase } from "../redux/action";

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
    heading: {
      fontSize: 25,
      fontFamily: "poppinsExtraBold",
      position: "absolute",
      top: "7%",
      alignSelf: "center",
    },
    pexels: {
      height: 40,
      width: 40,
    },
    pexelsContainer: {
      position: "absolute",
      bottom: "5%",
      left: "7%",
      flexDirection: "row",
      alignItems: "center",
    },
    credit: {
      fontFamily: "poppins",
      marginLeft: 10,
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.back}
        onPress={(): void => {
          navigation.navigate("send-image");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={style.heading}>Chill&chat images</Text>
      <Form
        placeholder="Search"
        onTextChange={(text: string): void => {
          setFilter(text);
        }}
      />
      <View style={style.imageListContainer}>
        <ScrollView>
          {Images.images.map((image: Images.ImageType): any => {
            return filter == "" ||
              image.name.toLowerCase().includes(filter.toLowerCase()) ? (
              <TouchableOpacity
                key={image.link}
                style={style.imageContainer}
                onPress={(): void => {
                  dispatch(setImageBase(image.link));
                  navigation.navigate("send-image");
                }}
              >
                <Image source={{ uri: image.link }} style={style.image} />
              </TouchableOpacity>
            ) : null;
          })}
        </ScrollView>
      </View>
      <View style={style.pexelsContainer}>
        <Image
          source={{
            uri: "https://seeklogo.com/images/P/pexels-logo-EFB9232709-seeklogo.com.png",
          }}
          style={style.pexels}
        />
        <Text style={style.credit}>Images from Pexels(Not sponsored)</Text>
      </View>
    </View>
  );
};

export default ImageBase;
