import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { login as loginAction, setUserInfo } from "../redux/action";
import Button from "../components/Button";
import Form from "../components/LoginForm";
import login from "../scripts/login";
import { AuthType } from "../scripts";
import getUser from "../scripts/getUser";

/**
 * This is the login component for the application, this component is responsible for
 * rendering the login components and loading login data.
 */
namespace Login {
  export const component: React.FC<any> = ({ navigation }) => {
    const [error, setError]: any = React.useState("");
    const dispatch: any = useDispatch();
    const [username, setUsername]: any = React.useState("");
    const [password, setPassword]: any = React.useState("");

    const style: any = StyleSheet.create({
      container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      },
      text: {
        fontFamily: "poppinsExtraBold",
        fontSize: 35,
        marginBottom: 30,
        alignSelf: "flex-start",
        marginLeft: 10,
      },
      formContainer: {
        marginBottom: 40,
      },
      signup: {
        fontFamily: "poppinsExtraBold",
      },
      error: {
        color: "red",
        marginTop: -20,
        marginBottom: 20,
        fontFamily: "poppinsLight",
      },
      link: {
        textDecorationLine: "underline",
        fontFamily: "poppinsExtraBold",
      },
      informationLink: {
        position: "absolute",
        bottom: "4%"
        ,right:"4%"
      },
      signupContainer: {
        margin: 15,
        justifyContent: "flex-start",
        flexDirection: "row",
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
                onTextChange={(text: string): void => {
                  setUsername(text);
                }}
              />
              <Form
                safeEntry={true}
                type="password"
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
                if (username === undefined || password === undefined) {
                  setError("Invalid username or password");
                  setTimeout(() => {
                    setError("");
                  }, 5000);
                  return;
                }

                login(username, password)
                  .then((): void => {
                    getUser(username)
                      .then((user: AuthType | {}): void => {
                        if (Object.keys(user).length !== 0) {
                          // @ts-ignore

                          if (!user.blocked) {
                            dispatch(setUserInfo(user as AuthType));
                            dispatch(loginAction());

                            navigation.push("menu");
                          } else {
                            navigation.push("block-error");
                            return;
                          }
                        } else {
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
                        console.error(err);
                      });
                  })
                  .catch((err: unknown): void => {
                    setError("Invalid username or password");
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    console.error(err);
                  });
              }}
              color={"#00AD98"}
              textColor={"#ffff"}
              text={"login"}
            />
          </ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("information");
          }}
          style={style.informationLink}
        >
          <Feather name="info" size={40} color="black" />
        </TouchableOpacity>
        </KeyboardAvoidingView>
    );
  };
}

export default Login.component;
