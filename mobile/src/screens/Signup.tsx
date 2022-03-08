import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  ScaledSize,
  Dimensions,
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
  const windowDimensions: ScaledSize = Dimensions.get("window");
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
      marginLeft: windowDimensions.width * 0.03,
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
    <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }} enabled>
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.formContainer}>
          <Text style={style.text}>Signup</Text>
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

            /**
             * !BUG REPORT!
             * Cannot signup from the ui, for some reason the signup function just skips to the error stage.
             * Further more, the code from @line 138 to @line 141 is being executed instead of @line 123 to @line 136.
             * I think this is caused because the if statement is not being executed on @line 123.
             * 
             * * TO RERODUCE THE BUG:
             * 1. Click "Signup" in the login screen.
             * 2. Enter a username and password.
             * 3. Make sure there is no user with the same username.
             * 4. Click "Signup".
             * 
             * * FIXES:
             * 
             * @note Please put fixes here.
             * 
             * * CODE FLOW:
             * 1. @line 133 The "getUser" function is being called(In order to check if the user exists or not.).
             * 2. @line 137 The code checks if the data is == {}.
             *    True:
             *    Signup is called.
             *    
             *    False:
             *    !BUG HERE!
             *    Error is set.
             * 
             * 3. Continues to @line 170.
             */

            getUser(username)
              .then((data: AuthType | {}): void => {
                console.log(data)
                if (data === {}) {
                  signup(username, password)
                    .then((): void => {
                      Keyboard.dismiss();
                      navigation.push("login");
                    })
                    .catch((err: unknown): void => {
                      setError("Signup error.");
                      setTimeout(() => {
                        setError("");
                      }, 5000);
                      console.error(err);
                    });
                  return;
                }
              
                setError("Username taken, try another username.");
                setTimeout(() => {
                  setError("");
                }, 5000);
              })
              .catch((): void => {
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
