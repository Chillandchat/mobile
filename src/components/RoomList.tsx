import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { RoomType } from "../scripts/index.d";
import { RoomListProps as Props } from "./index.d";
import { setSessionData } from "../redux/action";
import Icon from "./Icon";
import { Dispatch } from "redux";

/**
 * This is the room list component, this component is used in the menu to display the rooms.
 * The information can be altered by changing the rooms prop.
 *
 * @prop {Array<RoomType>} rooms The rooms to display.
 * @optional @prop {(room: RoomType) => void} onPress What to run a user click the room.
 * @prop {boolean} displayMessages If it should display the recent messages.
 * @prop {Array<MessageType>} messages the messages to display.
 * @see RoomType For more information.
 */

const RoomList: React.FC<Props> = (props: Props) => {
  const dispatch: Dispatch = useDispatch();
  const navigation: any = useNavigation();

  const style: any = StyleSheet.create({
    roomContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
    },
    titleStyle: {
      fontFamily: "poppins",
      fontSize: 22,
      marginHorizontal: 20,
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
    sadFace: {
      opacity: 0.3,
    },
    nameContainer: {
      flexDirection: "column",
    },
  });

  return props.rooms.length === 0 ? (
    <View style={style.errorContainer} key={props.messages?.length.toString()}>
      <Text style={style.error}>No rooms found.</Text>
      <MaterialCommunityIcons
        name="emoticon-sad-outline"
        size={50}
        color="black"
        style={style.sadFace}
      />
    </View>
  ) : (
    <ScrollView style={style.container}>
      {props.rooms.map((room: RoomType, index: number): any => (
        <TouchableOpacity
          style={style.roomContainer}
          key={room.id.concat("-a")}
          // @ts-ignore
          onPress={(): void => {
            if (props.onPress !== undefined) props?.onPress(room);
            else {
              dispatch(setSessionData(room));
              navigation.push("chat");
            }
          }}
        >
          <Icon
            iconLetter={room.name[0]}
            color={room.iconColor}
            key={room.id.concat("-b")}
          />
          <View style={style.nameContainer}>
            <Text
              style={style.titleStyle}
              numberOfLines={1}
              key={room.id.concat("-c")}
            >
              {room.name}
            </Text>
            {props.displayMessages ? (
              <Text key={room.id.concat("-d")}>
                {String(
                  //@ts-ignore
                  props.messages.find(
                    //@ts-ignore
                    (message): boolean => message.room === room
                  ) || "No messages."
                )}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default RoomList;
