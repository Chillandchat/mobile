import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import Form from "../components/LoginForm";

/**
 * This is the login component for the application, this component is responsible for
 * rendering the login components and loading login data.
 */

const Login: React.FC<any> = ({ navigation }) => {
  let [error, setError] = React.useState(false);

  const style: any = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    text: {
      fontFamily: "poppinsExtraBold",
      fontSize: 35,
      marginBottom: 30,
      marginLeft: 55,
      alignSelf: "flex-start",
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
  });
  return (
    <View style={style.container}>
      <Text style={style.text}>Login</Text>
      <View style={style.formContainer}>
        <Form title="Username" safeEntry={false} type="username" />
        <Form title="Username" safeEntry={true} type="password" />
        <Text
          style={style.signup}
          onPress={() => navigation.navigate("sign-up")}
        >
          No account? signup!
        </Text>
      </View>
      {error ? (
        <Text style={style.error}>Invalid username or password.</Text>
      ) : null}
      <Button
        onPress={(): void => {
          //! DUMMY FUNCTION - REMOVE BEFORE PRODUCTION
          return;
        }}
        color={"#00AD98"}
        textColor={"#ffff"}
        text={"login"}
      />
    </View>
  );
};

export default Login;
