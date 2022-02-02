import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Form from "../components/LoginForm";
import Button from "../components/Button";

const Signup: React.FC = () => {
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
      marginBottom: 40,
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
      <Button
        color={"#00AD98"}
        textColor={"#ffff"}
        text={"sign up"}
        onPress={(): void => {
          if (password?.length < 5) {
            setError("Password must be at least 5 characters long.");
            setTimeout(() => {
              setError("");
            }, 5000);
            return;
          }
          if (password !== confirmPassword) {
            setError("Password and confirm password does not match.");
            setTimeout(() => {
              setError("");
            }, 5000);
            return;
          }
          return;
        }}
      />
    </View>
  );
};

export default Signup;
