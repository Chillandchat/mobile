import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { logout } from "../redux/action";

/**
 * This is the signout confirm component for the application, this component is responsible for
 * rendering the signout confirm components and loading signout confirm data.
 */

const SignoutConfirm: React.FC<any> = ({ navigation }) => {
  const dispatch: any = useDispatch();

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={style.container}>
      <Button
        color={"red"}
        textColor={"#ffff"}
        onPress={() => {
          Alert.alert("Signout confirm", "Are you sure you want to signout?", [
            {
              text: "Signout",
              onPress: (): void => {
                dispatch(logout());
                navigation.navigate("login");
              },
              style: "destructive",
            },
            { text: "Cancel", onPress: (): void => {} },
          ]);
        }}
        text={"sign out"}
      />
      <Button
        color={"transparent"}
        textColor={"black"}
        onPress={() => {
          navigation.navigate("menu");
        }}
        text={"back"}
      />
    </View>
  );
};

export default SignoutConfirm;
