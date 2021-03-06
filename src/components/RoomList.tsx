import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { RoomType } from "../scripts";
import Icon from "./Icon";
import { RoomListProps as Props } from "./index.d";
import { useDispatch } from "react-redux";
import { setSessionData } from "../redux/action";

/**
 * This is the room list component, this component will display all the rooms provided.
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
              key={room.id.concat("-a")}
              onPress={async (): Promise<void> => {
                dispatch(setSessionData(room));
                navigation.push("chat");
              }}
            >
              <Icon
                iconLetter={room.name[0]}
                color={room.iconColor}
                key={room.id.concat("-b")}
              />
              <Text
                style={style.titleStyle}
                numberOfLines={1}
                key={room.id.concat("-c")}
              >
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
