import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";

import { login as loginAction, setUserInfo } from "../redux/action";
import Button from "../components/Button";
import Form from "../components/LoginForm";
import login from "../scripts/login";
import { AuthType } from "../scripts";
import getUser from "../scripts/getUser";
import LoadingSpinner from "../components/LoadingSpinner";
import { Dispatch } from "redux";

/**
 * This is the login component for the application, this component is responsible for
 * rendering the login components and loading login data.
 */

const Login: React.FC<any> = () => {
  const navigation: any = useNavigation();

  const [error, setError]: any = React.useState("");
  const dispatch: Dispatch = useDispatch();
  const [username, setUsername]: any = React.useState("");
  const [password, setPassword]: any = React.useState("");
  const [keyboardOpen, setKeyboardOpen]: any = React.useState(false);
  const [loading, setLoading]: any = React.useState(false);

  React.useEffect((): any => {
    NetInfo.fetch().then((state: any): void => {
      if (!state.isConnected) {
        navigation.navigate("error");
        console.error("Unable to connect. \n    Error code: CC_ERROR_0318");
      }
    });

    (async (): Promise<void> => {
      await AsyncStorage.getItem("chillandchat-login-details")
        .then((data: string | null): void => {
          if (data !== null) {
            // @ts-ignore
            data = JSON.parse(data);
            // @ts-ignore
            setUsername(data.username);
            // @ts-ignore
            setPassword(data.password);
          }
        })
        .catch((err: unknown): void => {
          console.error(err);
        });
    })();

    Keyboard.addListener("keyboardDidShow", (): void => {
      setKeyboardOpen(true);
    });

    Keyboard.addListener("keyboardDidHide", (): void => {
      setKeyboardOpen(false);
    });
  }, []);

  const style: any = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    text: {
      fontFamily: "poppinsExtraBold",
      fontSize: 35,
      marginBottom: 10,
      alignSelf: "flex-start",
      marginLeft: 10,
    },
    formContainer: {},
    signup: {
      fontFamily: "poppinsExtraBold",
    },
    error: {
      color: "red",
      marginTop: 10,
      marginBottom: 20,
      fontFamily: "poppinsLight",
    },
    link: {
      textDecorationLine: "underline",
      fontFamily: "poppinsExtraBold",
    },
    informationLink: {
      position: "absolute",
      bottom: 40,
      right: 40,
    },
    signupContainer: {
      margin: 15,
      justifyContent: "flex-start",
      flexDirection: "row",
    },
    loader: {
      backgroundColor: "#ffffff",
      padding: 40,
      borderRadius: 20,
      opacity: 1,
      zIndex: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      height: "100%",
      width: "100%",
      position: "absolute",
    },
    loadingBackground: {
      backgroundColor: "#000000",
      opacity: 0.5,
      height: "1000%",
      width: "100%",
      zIndex: 0,
      position: "absolute",
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.formContainer}>
          <Text style={style.text}>Login</Text>
          <Form
            safeEntry={false}
            type="username"
            value={username}
            onTextChange={(text: string): void => {
              setUsername(text);
            }}
          />
          <Form
            safeEntry={true}
            type="password"
            value={password}
            onTextChange={(text: string): void => {
              setPassword(text);
            }}
          />
          <View style={style.signupContainer}>
            <Text style={style.signup}>No account? </Text>

            <TouchableOpacity onPress={() => navigation.push("sign-up")}>
              <Text style={style.link}>Signup here.</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={style.error}>{error}</Text>
        <Button
          onPress={(): void => {
            setLoading(true);
            if (username === undefined || password === undefined) {
              setError("Please fill in all fields.");
              setTimeout(() => {
                setError("");
              }, 5000);
              setLoading(false);
              return;
            }

            login(username, password)
              .then((): void => {
                getUser(username)
                  .then(async (user: any): Promise<void> => {
                    if (Object.keys(user).length !== 0) {
                      if (!user.blocked && !user.bot) {
                        await AsyncStorage.getItem("chillandchat-login-details")
                          .then((data: string | null): void => {
                            // @ts-ignore
                            data = JSON.parse(data);

                            if (data !== null) {
                              // @ts-ignore
                              if (data.username !== username) {
                                setLoading(true);
                                setError("Already logged in.");
                                setTimeout(() => {
                                  setError("");
                                }, 5000);
                                console.error(
                                  "Error: User overwrite! Cannot login!\n   Error code: CC_ERROR_1591"
                                );
                                return;
                              }
                            } else {
                              AsyncStorage.setItem(
                                "chillandchat-login-details",
                                JSON.stringify({
                                  username: username,
                                  password: password,
                                })
                              );
                            }
                          })
                          .catch((err: unknown): void => {
                            console.error(err);
                          });

                        if (loading) return;

                        dispatch(setUserInfo(user as AuthType)); //! Dangerous way to convert types
                        dispatch(loginAction());

                        navigation.push("control-center");
                        setLoading(false);
                      } else {
                        navigation.push("block-error");
                        setLoading(false);
                        return;
                      }
                    } else {
                      setLoading(false);
                      setError("Unable to connect.");
                      setTimeout(() => {
                        setError("");
                      }, 5000);
                      console.error(
                        "Error: user is undefined, or not present\n   Error code: CC_ERROR_1591"
                      );
                      return;
                    }
                  })
                  .catch((err: unknown): void => {
                    setError("Missing data ");
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    setLoading(false);
                    console.error(err);
                  });
              })
              .catch((err: unknown): void => {
                setError("Invalid username or password");
                setTimeout(() => {
                  setError("");
                }, 5000);
                setLoading(false);
                console.error(err);
              });
          }}
          color={"#00AD98"}
          textColor={"#ffff"}
          text={"login"}
        />
        {!loading ? null : (
          <View style={style.loadingContainer}>
            <View style={style.loadingBackground} />
            <View style={style.loader}>
              <LoadingSpinner />
            </View>
          </View>
        )}
      </ScrollView>
      {!keyboardOpen ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("information");
          }}
          style={style.informationLink}
          disabled={loading}
        >
          <Feather name="info" size={40} color="black" />
        </TouchableOpacity>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default Login;
