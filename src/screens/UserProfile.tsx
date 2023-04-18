import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScaledSize,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { RootState } from "../redux/index.d";
import Icon from "../components/Icon";
import { setUserInfo } from "../redux/action";
import Button from "../components/Button";
import unfollowUser from "../scripts/unfollowUser";
import followUser from "../scripts/followUser";
import getUser from "../scripts/getUser";
import { AuthType } from "../scripts";
import LoadingSpinner from "../components/LoadingSpinner";

/**
 * This is the user menu screen this where the user could logout and customize their profile description.
 */

const UserProfile: React.FC<any> = ({ navigation }) => {
  const state: any = useSelector((state: RootState): RootState => state);
  const dispatch: any = useDispatch();
  const windowSize: ScaledSize = Dimensions.get("window");

  const [loading, setLoading]: any = React.useState(false);

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 20,
    },
    signOut: {
      position: "absolute",
      bottom: "7%",
    },
    text: {
      fontSize: 25,
      fontFamily: "poppins",
    },
    nameInfo: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      paddingLeft: 30,
      paddingTop: 30,
      marginTop: windowSize.height / (Platform.OS === "android" ? 3 : 5),
    },
    tittle: {
      fontSize: 25,
      fontFamily: "poppinsExtraBold",
    },
    descriptionInfo: {
      alignItems: "flex-start",
      alignSelf: "flex-start",
      paddingHorizontal: 30,
      paddingBottom: 5,
      width: "100%",
    },
    descriptionTittle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingTop: 30,
    },
    followerInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 50,
      alignSelf: "flex-start",
      paddingHorizontal: 30,
      paddingTop: 10,
    },
    heading: {
      fontSize: 25,
      fontFamily: "poppinsExtraBold",
      position: "absolute",
      top: "8%",
      alignSelf: "center",
      maxWidth: "65%",
    },
    descriptionBody: {
      height: "65%",
      width: "100%",
    },
    editPrompt: {
      marginTop: 10,
      height: "60%",
      width: "100%",
    },
    saveButton: {
      alignSelf: "center",
      paddingTop: 20,
    },
    back: {
      position: "absolute",
      top: "8%",
      left: "7%",
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
            navigation.navigate("chat");
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={style.heading} numberOfLines={1}>
          {state.profileInfo.username}
        </Text>
        <View style={style.nameInfo}>
          <Icon
            iconLetter={state.profileInfo.username[0]}
            color={state.profileInfo.iconColor}
          />
          <Text style={[style.text, { paddingLeft: 30, paddingRight: 10 }]}>
            {state.profileInfo.username}
          </Text>
          {state.profileInfo.verified ? (
            <MaterialIcons name="verified-user" size={24} color={"#00AD98"} />
          ) : null}
          {state.profileInfo.bot ? (
            <FontAwesome5 name="robot" size={24} color={"#00AD98"} />
          ) : null}
        </View>
        <View style={style.followerInfo}>
          <Text style={[style.text, { marginRight: 10, fontSize: 17 }]}>
            {state.profileInfo.followers} Followers
          </Text>
          <Text style={[style.text, { fontSize: 17 }]}>
            Following {state.profileInfo.following.length}
          </Text>
        </View>
        {!loading ? (
          <Button
            color={"#00AD98"}
            onPress={() => {
              setLoading(true);
              if (
                state.userInfo.following.includes(state.profileInfo.username)
              ) {
                unfollowUser(
                  state.profileInfo.username,
                  state.userInfo.username
                )
                  .then((): void => {
                    getUser(state.userInfo.username).then(
                      (data: AuthType | {}): void => {
                        if (Object.keys(data).length !== 0) {
                          //@ts-ignore
                          dispatch(setUserInfo(data));
                          setLoading(false);
                        }
                      }
                    );
                  })
                  .catch((err: unknown): void => {
                    console.error(err);
                    navigation.navigate("error");
                  });
              } else {
                followUser(state.profileInfo.username, state.userInfo.username)
                  .then((): void => {
                    getUser(state.userInfo.username).then(
                      (data: AuthType | {}): void => {
                        if (Object.keys(data).length !== 0) {
                          //@ts-ignore
                          dispatch(setUserInfo(data));
                          setLoading(false);
                        }
                      }
                    );
                  })
                  .catch((err: unknown): void => {
                    console.error(err);
                    navigation.navigate("error");
                  });
              }
            }}
            textColor={"white"}
            text={
              state.userInfo.following.includes(state.profileInfo.username)
                ? "Unfollow"
                : "Follow"
            }
          />
        ) : (
          <LoadingSpinner />
        )}
        <View style={style.descriptionInfo}>
          <View style={style.descriptionTittle}>
            <Text style={style.tittle}>Description</Text>
          </View>
          <View style={style.descriptionBody}>
            <ScrollView>
              <Text style={[style.text, { fontSize: 20 }]}>
                {state.profileInfo.description || "No description provided."}
              </Text>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserProfile;
