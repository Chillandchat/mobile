import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Form from "../components/LoginForm";
import Button from "../components/Button";
import getUser from "../scripts/getUser";
import { AuthType } from "../types/apiTypes";
import signup from "../scripts/signup";

/**
 * This is the signup component for the application, this component is responsible for
 * rendering the signup components and calling signup functions.
 */

const Signup: React.FC<any> = ({ navigation }) => {
  const [error, setError] = React.useState("");

  let username: string;
  let password: string;
  let confirmPassword: string;

  const style = StyleSheet.create({
    container: {
      justifyContent: "center",
      flex: 1,
      alignItems: "center",
    },
    text: {
      fontFamily: "poppinsExtraBold",
      fontSize: 35,
      marginBottom: 30,
      alignSelf: "flex-start",
      paddingLeft: "09%",
    },
    formContainer: {
      marginBottom: 25,
    },
    error: {
      color: "red",
      marginTop: -20,
      marginBottom: 20,
      fontFamily: "poppinsLight",
    },
    backButton: {
      marginTop: 10,
    },
  });
  return (
    <View style={style.container}>
      <Text style={style.text}>Signup</Text>
      <View style={style.formContainer}>
        <Form
          safeEntry={false}
          type="username"
          onTextChange={(text: string): void => {
            username = text;
          }}
        />
        <Form
          safeEntry={true}
          type="password"
          onTextChange={(text: string): void => {
            password = text;
          }}
        />
        <Form
          safeEntry={true}
          type="confirm-password"
          onTextChange={(text: string): void => {
            confirmPassword = text;
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

          getUser(username).then((_data: AuthType | void): void => {
            setError("Username taken, try another username.");
            setTimeout(() => {
              setError("");
            }, 5000);
            return;
          });

          signup(username, password)
            .then((): void => {
              navigation.navigate("login");
            })
            .catch((err: any): void => {
              setError("Signup error.");
              setTimeout(() => {
                setError("");
              }, 5000);
              console.error(err);
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
    </View>
  );
};

export default Signup;
