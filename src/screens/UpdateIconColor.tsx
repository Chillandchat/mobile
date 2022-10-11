import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Form from "../components/Form";
import Button from "../components/Button";
import __updateIconColor from "../scripts/updateIconColor";
import { RootState } from "../redux/index.d";
import Icon from "../components/Icon";
import ColorNames from "./colors";
import getUser from "../scripts/getUser";
import { setUserInfo } from "../redux/action";
import { AuthType } from "../scripts";

/**
 * This is the update icon color component,
 * this component is the screen where the user can change it's icon color.
 */

const updateIconColor: React.FC = () => {
  const [color, setColor]: any = React.useState("");
  const [error, setError]: any = React.useState("");
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  const { userInfo }: any = useSelector((state: RootState): RootState => state);

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    back: {
      justifyContent: "flex-start",
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    boldText: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
      position: "absolute",
      top: "7%",
    },
    text: {
      fontFamily: "poppinsExtraBold",
      fontSize: 20,
      margin: 20,
    },
    error: {
      color: "red",
      marginTop: 10,
      marginBottom: 20,
      fontFamily: "poppinsLight",
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={style.container}>
        <TouchableOpacity
          style={style.back}
          onPress={async (): Promise<void> => {
            navigation.navigate("signout-confirm");
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={style.boldText}>Update icon color</Text>
        <Text style={style.text}>Preview</Text>
        <Icon
          iconLetter={userInfo.username[0]}
          color={
            /^#([0-9a-f]{3}){1,2}$/i.test(color) ||
            ColorNames.colors[color.toLowerCase()] !== undefined
              ? color.toLowerCase()
              : userInfo.iconColor
          }
          touchable={false}
        />
        <View style={{ padding: 20 }} />
        <Form
          placeholder="Icon color"
          onTextChange={(text: string): void => {
            setColor(text);
          }}
          value={color}
        />
        <Text style={style.error}>{error}</Text>
        <Button
          color={"#00ad98"}
          text={"Change color"}
          textColor={"white"}
          onPress={(): void => {
            if (
              /^#([0-9a-f]{3}){1,2}$/i.test(color) ||
              ColorNames.colors[color.toLowerCase()] !== undefined
            ) {
              __updateIconColor(
                ColorNames.colors[color.toLowerCase()] !== undefined
                  ? ColorNames.colors[color.toLowerCase()]
                  : color.toLowerCase(),
                userInfo.username
              )
                .then(async (): Promise<void> => {
                  await getUser(userInfo.username)
                    .then((data: AuthType | {}): void => {
                      // @ts-ignore
                      dispatch(setUserInfo(data));
                    })
                    .catch((err: unknown): void => {
                      console.error(err);
                    });
                  setColor("");
                  navigation.push("signout-confirm");
                })
                .catch((err: unknown): void => {
                  console.error(err);
                });
            } else {
              setError("Invalid color, please try again.");
              setTimeout((): void => {
                setError("");
              }, 5000);
            }
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default updateIconColor;
