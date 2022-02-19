import { login as loginAction, setUserInfo } from "../redux/action";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Form from "../components/LoginForm";
import login from "../scripts/login";
import { AuthType } from "../scripts";
import getUser from "../scripts/getUser";
import { RootState } from "../redux/index.d";

/**
 * This is the login component for the application, this component is responsible for
 * rendering the login components and loading login data.
 */

const Login: React.FC<any> = ({ navigation }) => {
  const [error, setError] = React.useState("");
  const dispatch = useDispatch();
  let username: string;
  let password: string;

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
      margin: "03%",
    },
    formContainer: {
      marginBottom: 40,
    },
    signup: {
      margin: 15,
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
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior={"padding"}>
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.formContainer}>
          <Text style={style.text}>Login</Text>
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
          <Text style={style.signup}>
            No account?{" "}
            {
              <TouchableOpacity onPress={() => navigation.navigate("sign-up")}>
                <Text style={style.link}>Signup here.</Text>
              </TouchableOpacity>
            }
          </Text>
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
                  .then((user: AuthType | void): void => {
                    if (user !== undefined) {
                      dispatch(setUserInfo(user as AuthType));
                      dispatch(loginAction());
                      if (!user.blocked) {
                        Keyboard.dismiss();
                        navigation.navigate("menu");
                      } else {
                        navigation.navigate("block-error");
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
                  .catch((err: any): void => {
                    setError("Missing data ");
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    console.error(err);
                  });
              })
              .catch((err: any): void => {
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
    </KeyboardAvoidingView>
  );
};

export default Login;
