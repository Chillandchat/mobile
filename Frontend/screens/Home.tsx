import React from "react";
import { SafeAreaView } from "react-native";
import Button from "../components/Button";

const Home: React.FunctionComponent = () => {
  return (
    <SafeAreaView>
      <Button text="Login" onPress={() => console.log("hi!")} color="#fa4747" />
    </SafeAreaView>
  );
};

export default Home;
