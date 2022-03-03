//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RoomType } from "../scripts";
import Icon from "./Icon";
import { RoomListProps as Props } from "./index.d";
import { v4 as uuid } from "uuid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { setSessionData } from "../redux/action";
import { useNavigation } from "@react-navigation/native";

/**
 * This is the room list component, this component will diaplay all the rooms provied.
 *
 * @prop {Array<RoomType>} rooms The rooms to display. @see RoomType For ore information
 */

const RoomList: React.FC<Props> = (props: Props) => {
  const dispatch: any = useDispatch();

  const navigation: any = useNavigation();

  const style: any = StyleSheet.create({
    roomContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 40,
    },
    titleStyle: {
      fontFamily: "poppinsBold",
      fontSize: 25,
      marginHorizontal: "7%",
    },
    container: {
      alignSelf: "flex-start",
      marginHorizontal: "5%",
      width: "100%",
      marginBottom: "10%",
    },
    error: {
      fontFamily: "poppins",
      fontSize: 20,
      marginTop: 70,
      opacity: 0.3,
      marginBottom: 10,
    },
    errorContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    sadFace: { opacity: 0.3 },
  });

  if (props.rooms.length === 0) {
    return (
      <View style={style.errorContainer}>
        <Text style={style.error}>No rooms found.</Text>
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          size={50}
          color="black"
          style={style.sadFace}
        />
      </View>
    );
  } else {
    return (
      <ScrollView style={style.container}>
        {props.rooms.map((room: RoomType): any => {
          return (
            <TouchableOpacity
              style={style.roomContainer}
              key={uuid()}
              onPress={async (): Promise<void> => {
                await dispatch(setSessionData(room));
                navigation.push("chat");
              }}
            >
              <Icon
                iconLetter={room.name[0]}
                color={room.iconColor}
                key={uuid()}
              />
              <Text style={style.titleStyle} numberOfLines={1} key={uuid()}>
                {room.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
};

export default RoomList;
