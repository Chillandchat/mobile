import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

/**
 * This is the information page,
 * this page will show the user some information about the app version.
 */

const Information: React.FC<any> = () => {
  const navigation: any = useNavigation();

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    tittle: {
      fontFamily: "poppinsExtraBold",
      fontSize: 20,
    },
    text: {
      fontFamily: "poppins",
      fontSize: 15,
    },
    back: {
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    githubLink: {
      position: "absolute",
      bottom: "7%",
      right: "7%",
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.back}
        onPress={(): void => {
          navigation.navigate("login");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={style.tittle}>App information:</Text>
      <Text style={style.text}>
        Version: Chill&chat official runtime v1.7.0
      </Text>
      <Text style={style.text}>Verified official Chill&chat build.</Text>
      <Text style={style.text}>Connected to Chill&chat global network</Text>
      <View style={{ padding: 10 }} />
      <Text style={style.tittle}>Credits:</Text>
      <Text style={style.text}>Alvin cheng - Software engineer</Text>
      <Text style={style.text}>Brianna cheng - UI&UX designer</Text>
      <View style={{ padding: 10 }} />
      <Text style={style.tittle}>Special thanks:</Text>
      <Text style={style.text}>Jonathan yao</Text>
      <TouchableOpacity
        style={style.githubLink}
        onPress={(): void => {
          Linking.openURL("https://github.com/chillandchat/mobile");
        }}
      >
        <AntDesign name="github" size={36} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Information;
