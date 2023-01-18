import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Linking,
} from "react-native";

import Form from "../components/LoginForm";
import Button from "../components/Button";
import getUser from "../scripts/getUser";
import { AuthType } from "../scripts";
import signup from "../scripts/signup";
import Checkbox from "expo-checkbox";
import LoadingSpinner from "../components/LoadingSpinner";

/**
 * This is the signup component for the application, this component is responsible for
 * rendering the signup components and calling signup functions.
 */

const Signup: React.FC<any> = ({ navigation }) => {
  const [error, setError] = React.useState("");
  const [username, setUsername]: any = React.useState("");
  const [password, setPassword]: any = React.useState("");
  const [confirmPassword, setConfirmPassword]: any = React.useState("");
  const [agreed, setAgreed]: any = React.useState(false);
  const [loading, setLoading]: any = React.useState(false);

  const style = StyleSheet.create({
    container: {
      justifyContent: "center",
      flex: 1,
      alignItems: "center",
      marginTop: 35,
    },
    text: {
      fontFamily: "poppinsExtraBold",
      fontSize: 35,
      marginBottom: 10,
      alignSelf: "flex-start",
      marginLeft: 10,
    },
    error: {
      color: "red",
      alignSelf: "center",
      marginTop: 10,
      marginBottom: error !== "" ? 80 : 40,
      fontFamily: "poppinsLight",
    },
    backButton: {
      marginTop: 10,
    },
    selection: {
      flexDirection: "row",
      alignSelf: "center",
      justifyContent: "center",
      paddingBottom: 20,
      alignItems: "center",
      marginTop: -60,
    },
    link: {
      textDecorationLine: "underline",
      fontFamily: "poppinsExtraBold",
      fontSize: 15,
      paddingTop: 20,
    },
    checkBox: {
      marginTop: 20,
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={style.container}>
        <View>
          <Text style={style.text}>Signup</Text>
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
          <Form
            safeEntry={true}
            type="confirm-password"
            onTextChange={(text: string): void => {
              setConfirmPassword(text);
            }}
          />
          <Text style={style.error}>{error}</Text>
          <View style={style.selection}>
            <Checkbox
              value={agreed}
              style={style.checkBox}
              onValueChange={(value: boolean): void => {
                setAgreed(value);
              }}
              color={agreed ? "#00AD98" : undefined}
            />
            <Text style={[style.text, { fontSize: 15, fontFamily: "poppins" }]}>
              I agree to the{" "}
              <TouchableOpacity
                onPress={(): void => {
                  Linking.openURL(
                    "https://github.com/Chillandchat#user-safety-agreement"
                  );
                }}
              >
                <Text style={style.link}>user safety agreement</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
        <Button
          color={"#00AD98"}
          textColor={"#ffff"}
          text={"sign up"}
          disabled={!agreed}
          onPress={(): void => {
            setLoading(true);
            if (password?.length < 5) {
              setError("Password must be at least 5 letters long.");
              setTimeout(() => {
                setError("");
              }, 5000);
              setLoading(false);
              return;
            }

            if (password !== confirmPassword) {
              setError("Passwords does not match.");
              setTimeout(() => {
                setError("");
              }, 5000);
              setLoading(false);
              return;
            }

            if (username.includes(" ")) {
              setError("Usernames cannot contain spaces.");
              setTimeout(() => {
                setError("");
              }, 5000);
              setLoading(false);
              return;
            }

            if (password === undefined || username === undefined) {
              setError("Please fill in all fields!");
              setTimeout(() => {
                setError("");
              }, 5000);
              setLoading(false);
              return;
            }

            getUser(username)
              .then((data: AuthType | {}): void => {
                if (Object.keys(data).length !== 0) {
                  setError("Username taken, try another username.");
                  setTimeout(() => {
                    setError("");
                  }, 5000);
                  setLoading(false);
                  return;
                }

                signup(username, password)
                  .then((): void => {
                    navigation.push("login");
                  })
                  .catch((err: unknown): void => {
                    setError("Signup error.");
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    setLoading(false);
                    console.error(err);
                  });
              })
              .catch((err: unknown): void => {
                console.error(err);
                setError("Unable to signup.");
                setTimeout(() => {
                  setError("");
                }, 5000);
                setLoading(false);
              });
          }}
        />
        <View style={style.backButton}>
          <Button
            color={"transparent"}
            onPress={() => {
              navigation.navigate("login");
            }}
            textColor={"black"}
            text={"back"}
          />
        </View>
        {!loading ? null : (
          <View style={style.loadingContainer}>
            <View style={style.loadingBackground} />
            <View style={style.loader}>
              <LoadingSpinner />
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
