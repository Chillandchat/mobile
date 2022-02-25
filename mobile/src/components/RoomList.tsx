import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RoomType } from "../scripts";
import Icon from "./Icon";
import { RoomListProps as Props } from "./index.d";

/**
 * This is the room list component, this component will diaplay all the rooms provied.
 * 
 * @param {Array<RoomType>} rooms The rooms to display. @see RoomType For ore information
 */

const RoomList: React.FC<Props> = (props: Props) => {
  const style: any = StyleSheet.create({
    roomContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginTop: "20%",
    },
    titleStyle: {
      fontFamily: "poppinsBold",
      fontSize: 25,
      marginHorizontal: "7%",
    },
    container: {
      alignSelf: "flex-start",
      marginHorizontal: "2%",
    },
  });

  return (
    <ScrollView style={style.container}>
      {props.rooms.map((room: RoomType): any => {
        return (
          <View style={style.roomContainer} key={room.id}>
            <Icon iconLetter={room.name[0]} color={room.iconColor} />
            <Text style={style.titleStyle}>{room.name}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default RoomList;
