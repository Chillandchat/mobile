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
import { PrivateValueStore, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import Form from "../components/Form";
import getGif from "../scripts/getGif";
import { setImageBase } from "../redux/action";
import Button from "../components/Button";

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
    image: {
      height: 150,
      width: 150,
      borderRadius: 20,
    },
    searchWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    searchIcon: {
      padding: 20,
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
      height: 150,
      width: 150,
    },
    imageListContainer: {
      height: "65%",
      width: "90%",
      justifyContent: "center",
      marginTop: 30,
      alignItems: "center",
    },
    _imageListContainerStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
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
        <View style={style.searchWrapper}>
          <Form
            placeholder="Search"
            width={"70%"}
            value={filter}
            onTextChange={(text: string): void => {
              setFilter(text);
            }}
          />
          <TouchableOpacity
            style={style.searchIcon}
            onPress={(): void => {
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
          >
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={style.imageListContainer}>
          <ScrollView contentContainerStyle={style._imageListContainerStyle}>
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
