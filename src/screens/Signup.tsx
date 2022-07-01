import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import Form from "../components/LoginForm";
import Button from "../components/Button";
import getUser from "../scripts/getUser";
import { AuthType } from "../scripts";
import signup from "../scripts/signup";

/**
 * This is the signup component for the application, this component is responsible for
 * rendering the signup components and calling signup functions.
 */

const Signup: React.FC<any> = ({ navigation }) => {
  const [error, setError] = React.useState("");
  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");

  const style = StyleSheet.create({
    container: {
      justifyContent: "center",
      flex: 1,
      alignItems: "center",
      marginTop:40
    },
    text: {
      fontFamily: "poppinsExtraBold",
      fontSize: 35,
      marginBottom: 10,
      alignSelf: "flex-start",
      marginLeft: 10 
    },
    formContainer: {
    },
    error: {
      color: "red",
      marginTop: 10,
      marginBottom: 20,
      fontFamily: "poppinsLight",
    },
    backButton: {
      marginTop: 10,
    },
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.formContainer}>
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
        </View>
        <Text style={style.error}>{error}</Text>
        <Button
          color={"#00AD98"}
          textColor={"#ffff"}
          text={"sign up"}
          onPress={(): void => {
            if (password?.length < 5) {
              setError("Password must be at least 5 letters long.");
              setTimeout(() => {
                setError("");
              }, 5000);
              return;
            }

            if (password !== confirmPassword) {
              setError("Passwords does not match.");
              setTimeout(() => {
                setError("");
              }, 5000);
              return;
            }

            if (password === undefined || username === undefined) {
              setError("Unable to create account.");
              setTimeout(() => {
                setError("");
              }, 5000);
              return;
            }

            getUser(username)
              .then((data: AuthType | {}): void => {
                if (Object.keys(data).length !== 0) {
                  setError("Username taken, try another username.");
                  setTimeout(() => {
                    setError("");
                  }, 5000);
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
                    console.error(err);
                  });
              })
              .catch((err: unknown): void => {
                console.error(err);
                setError("Unable to signup.");
                setTimeout(() => {
                  setError("");
                }, 5000);
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
