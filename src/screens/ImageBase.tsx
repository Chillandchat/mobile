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
import { FontAwesome } from "@expo/vector-icons";

import Form from "../components/Form";
import getGif from "../scripts/getGif";
import { setImageBase } from "../redux/action";

/**
 * This is the image base component/screen.
 * This screen allows users to send one of the provided Chill&chat images in the chat room.
 */

const ImageBase: React.FC = () => {
  const [filter, setFilter]: any = React.useState("");
  const [results, setResults]: any = React.useState([]);
  const [loading, setLoading]: any = React.useState(true);

  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  React.useEffect((): void => {
    getGif(filter, filter === "")
      .then((gif: Array<any>): void => {
        setResults((_prev: any): any => {
          return gif;
        });
      })
      .catch((err: unknown): void => {
        console.error(err);
        navigation.navigate("error");
      });
  }, []);

  React.useEffect((): void => {
    filter === "" && results.length !== 0
      ? getGif(filter, filter === "")
          .then((gif: Array<any>): void => {
            setResults((_prev: any): any => {
              return gif;
            });
          })
          .catch((err: unknown): void => {
            console.error(err);
            navigation.navigate("error");
          })
      : null;
  }, [filter]);

  React.useEffect((): void => {
    if (results.length > 0) setLoading(false);
  }, [results.length]);

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: { marginTop: 100, marginBottom: -30, maxWidth: "67%" },
    image: {
      height: 100,
      width: 100,
      borderRadius: 10,
    },
    searchWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50,
    },
    back: {
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    imageContainer: {
      backgroundColor: "#E5E5E5",
      height: 100,
      width: 100,
      margin: 3,
      borderRadius: 10,
    },
    imageListContainer: {
      height: "65%",
      width: "90%",
      justifyContent: "center",
      marginTop: 30,
      alignItems: "center",
    },
    imageListBody: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
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
        <View style={style.title}>
          <Text numberOfLines={1} style={style.text}>
            {filter ? `\"${filter}\"` : "Trending"} GIFs
          </Text>
        </View>
        <View style={style.searchWrapper}>
          <Form
            placeholder="Search"
            width={"80%"}
            value={filter}
            onTextChange={(text: string): void => {
              setFilter(text);
              getGif(filter, filter === "")
                .then((gif: Array<any>): void => {
                  setResults((_prev: any): any => {
                    return gif;
                  });
                })
                .catch((err: unknown): void => {
                  console.error(err);
                  navigation.navigate("error");
                });
            }}
          />
        </View>
        <View style={style.imageListContainer}>
          <ScrollView contentContainerStyle={style.imageListBody}>
            {loading
              ? null
              : results.map((image: any): any => {
                  return (
                    <TouchableOpacity
                      key={image.id}
                      style={style.imageContainer}
                      onPress={(): void => {
                        dispatch(setImageBase(image.images.original.url));
                        navigation.navigate("send-image");
                      }}
                    >
                      <Image
                        source={{ uri: image.images.original.url }}
                        style={style.image}
                      />
                    </TouchableOpacity>
                  );
                })}
          </ScrollView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ImageBase;
