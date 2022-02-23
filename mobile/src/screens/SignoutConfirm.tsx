import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { logout } from "../redux/action";

const SignoutConfirm: React.FC<any> = ({ navigation }) => {
  const dispatch: any = useDispatch();

  const style = StyleSheet.create({
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
              onPress: () => {
                dispatch(logout());
                navigation.navigate("login");
              },
              style: "destructive",
            },
            { text: "Cancel", onPress: () => {} },
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
