import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import * as expoAppLoading from "expo-app-loading";
import loadFonts from "./assets/fonts/loader";

/**
 * This is the main app component of the Chill&chat application.
 */

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontFamily: "poppinsBold",
    },
  });

  if (loading) {
    return (
      <expoAppLoading.default
        startAsync={async (): Promise<void> => {
          await loadFonts();
        }}
        onFinish={(): void => {
          setLoading(false);
        }}
        onError={(): void => {
          Alert.alert("Error", "Error loading fonts");
        }}
      />
    );
  } else {
    return (
      <View style={style.container}>
        <Text style={style.text}>Hello world</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
};

export default App;
