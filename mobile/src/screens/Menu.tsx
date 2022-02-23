import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Icon from "../components/Icon";
import { RootState } from "../redux/index.d";

const Menu: React.FC<any> = ({ navigation }) => {
  const { username, iconColor }: any = useSelector(
    (state: RootState): RootState => {
      console.log(state);
      return state.userInfo;
    }
  );

  const style = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    text: {
      fontFamily: "poppinsExtraBold",
      fontSize: 35,
      flex: 1,
    },
    tittleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: "5%",
    },
  });

  return (
    <View style={style.container}>
      <View style={style.tittleBar}>
        <Text style={style.text}>Messages</Text>
        <Icon
          iconLetter={username[0]}
          color={iconColor}
          touchable
          onPress={(): void => {
            navigation.push("signout-confirm");
          }}
        />
      </View>
    </View>
  );
};

export default Menu;
