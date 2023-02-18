import React from "react";
import {
  View,
  StyleSheet,
  Alert,
  Keyboard,
  Text,
  ScaledSize,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { RootState } from "../redux/index.d";
import { logout, setUserInfo } from "../redux/action";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Form from "../components/Form";
import updateDescription from "../scripts/updateDescription";
import getUser from "../scripts/getUser";
import { AuthType, RoomType } from "../scripts";
import deleteUser from "../scripts/deleteUser";
import removeRoom from "../scripts/removeRoom";
import getRoom from "../scripts/getRooms";
import login from "../scripts/login";

/**
 * This is the user menu screen this where the user could logout and customize their profile description.
 */

const UserMenu: React.FC<any> = ({ navigation }) => {
  const [editMode, setEditMode]: any = React.useState(false);
  const [description, setDescription]: any = React.useState("");
  const [keyboardOpen, setKeyboardOpen]: any = React.useState(false);

  const dispatch: any = useDispatch();
  const state: any = useSelector((state: RootState): RootState => state);

  const windowSize: ScaledSize = Dimensions.get("window");

  React.useEffect((): any => {
    Keyboard.addListener("keyboardDidShow", (): void => {
      setKeyboardOpen(true);
    });

    Keyboard.addListener("keyboardDidHide", (): void => {
      setKeyboardOpen(false);
    });

    setDescription(state.userInfo.description);
  }, []);

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
      marginTop: windowSize.height / 7,
    },
    tittle: {
      fontSize: 25,
      fontFamily: "poppinsExtraBold",
    },
    descriptionInfo: {
      alignItems: "flex-start",
      alignSelf: "flex-start",
      paddingHorizontal: 30,
      paddingBottom: 10,
      width: "100%",
    },
    descriptionTittle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
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
      top: "7%",
      alignSelf: "center",
    },
    descriptionBody: {
      height: "60%",
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
      justifyContent: "flex-start",
      position: "absolute",
      top: "7%",
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
          onPress={async (): Promise<void> => {
            navigation.navigate("menu");
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        {keyboardOpen ? null : <Text style={style.heading}>Your profile</Text>}
        <View style={style.nameInfo}>
          <Icon
            iconLetter={state.userInfo.username[0]}
            color={state.userInfo.iconColor}
            touchable
            onPress={(): void => {
              navigation.navigate("update-icon-color");
            }}
          />
          <Text style={[style.text, { paddingLeft: 30, paddingRight: 10 }]}>
            {state.userInfo.username}
          </Text>
          {state.userInfo.verified ? (
            <MaterialIcons name="verified-user" size={24} color={"#00AD98"} />
          ) : null}
          {state.userInfo.bot ? (
            <FontAwesome5 name="robot" size={24} color={"#00AD98"} />
          ) : null}
        </View>
        <View style={style.followerInfo}>
          <Text style={[style.text, { marginRight: 10, fontSize: 17 }]}>
            {state.userInfo.followers} Followers
          </Text>
          <Text style={[style.text, { fontSize: 17 }]}>
            Following {state.userInfo.following.length}
          </Text>
        </View>
        <View style={style.descriptionInfo}>
          <View style={style.descriptionTittle}>
            <Text style={style.tittle}>Description</Text>
            <TouchableOpacity
              onPress={(): void => {
                setEditMode(true);
                if (editMode) setEditMode(false);
              }}
            >
              <Entypo
                name="edit"
                size={24}
                color="black"
                style={{ opacity: 0.5 }}
              />
            </TouchableOpacity>
          </View>
          {!editMode ? (
            <View style={style.descriptionBody}>
              <ScrollView>
                <Text style={[style.text, { fontSize: 20 }]}>
                  {state.userInfo.description || " "}
                </Text>
              </ScrollView>
            </View>
          ) : (
            <View style={style.editPrompt}>
              <Form
                placeholder={"Edit description..."}
                onTextChange={(text: string): void => {
                  setDescription(text);
                }}
                width={"100%"}
                multiline
                value={description}
              />
              <View style={style.saveButton}>
                <Button
                  onPress={(): void => {
                    Keyboard.dismiss();
                    updateDescription(state.userInfo.username, description)
                      .then((): void => {
                        getUser(state.userInfo.username)
                          .then((userData: AuthType | {}): void => {
                            if (Object.keys(userData).length !== 0) {
                              dispatch(setUserInfo(userData as AuthType));
                              setEditMode(false);
                            }
                          })
                          .catch((err: unknown): void => {
                            console.error(err);
                            navigation.navigate("error");
                          });
                      })
                      .catch((err: unknown): void => {
                        console.error(err);
                        navigation.navigate("error");
                      });
                  }}
                  color={"#00AD98"}
                  textColor={"white"}
                  text={"Save"}
                />
              </View>
            </View>
          )}
        </View>
        {!keyboardOpen ? (
          <View style={style.signOut}>
            <Button
              color={"red"}
              textColor={"#ffff"}
              onPress={() => {
                Alert.alert(
                  "Confirm account closure",
                  "Are you sure you want to close this account?? All images, rooms, history and messages will be lost!!! This cannot be undone!!",
                  [
                    {
                      text: "Proceed",
                      onPress: (): void => {
                        Alert.prompt(
                          "Login",
                          "Please enter your password to confirm closure.",
                          [
                            {
                              text: "Close account",
                              style: "destructive",
                              onPress: (text: string | undefined): void => {
                                if (text === undefined) {
                                  Alert.alert(
                                    "Password incorrect, please try again later."
                                  );
                                  return;
                                }
                                login(state.userInfo.username, text)
                                  .then((): void => {
                                    getRoom(state.userInfo.username)
                                      .then((room: Array<RoomType>): void => {
                                        room.forEach(
                                          async (
                                            room: RoomType
                                          ): Promise<void> => {
                                            await removeRoom(
                                              room.id,
                                              state.userInfo.username
                                            )
                                              .then((): void => {})
                                              .catch((err: unknown): void => {
                                                console.error(err);
                                                navigation.navigate("error");
                                              });
                                          }
                                        );

                                        deleteUser(state.userInfo.username)
                                          .then((): void => {
                                            dispatch(logout());
                                            navigation.navigate("login");
                                            Alert.alert(
                                              "Closed successfully",
                                              "You account was closed successfully, and all data was permanently deleted."
                                            );
                                          })
                                          .catch((err: unknown): void => {
                                            console.error(err);
                                            navigation.navigate("error");
                                          });
                                      })
                                      .catch((err: unknown): void => {
                                        console.error(err);
                                        navigation.navigate("error");
                                      });
                                  })
                                  .catch((): void => {
                                    Alert.alert(
                                      "Password incorrect, please try again later."
                                    );
                                    return;
                                  });
                              },
                            },
                            {
                              text: "Cancel",
                            },
                          ],
                          "secure-text"
                        );
                      },
                      style: "destructive",
                    },
                    { text: "Cancel", onPress: (): void => {} },
                  ]
                );
              }}
              text={"close account"}
            />
            <View style={{ padding: 5 }} />
            <Button
              color={"red"}
              textColor={"#ffff"}
              onPress={() => {
                Alert.alert(
                  "Signout confirm",
                  "Are you sure you want to signout?",
                  [
                    {
                      text: "Signout",
                      onPress: (): void => {
                        dispatch(logout());
                        navigation.navigate("login");
                      },
                      style: "destructive",
                    },
                    { text: "Cancel", onPress: (): void => {} },
                  ]
                );
              }}
              text={"sign out"}
            />
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserMenu;
