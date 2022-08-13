import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { RootState } from "../redux/index.d";
import Button from "../components/Button";
import { AuthType } from "../scripts";
import Icon from "../components/Icon";
import { setProfileInfo } from "../redux/action";

/**
 * This is the room information screen, this screen will display the room information.
 */

const RoomInformation: React.FC<any> = ({ navigation }) => {
  const { sessionStatus, roomUserInfo, userInfo } = useSelector(
    (state: RootState): RootState => {
      return state;
    }
  );
  const dispatch: any = useDispatch();

  const style: any = StyleSheet.create({
    container: {
      justifyContent: "center",
      flex: 1,
      alignItems: "center",
    },
    text: {
      fontFamily: "poppins",
      fontSize: 15,
    },
    back: {
      justifyContent: "flex-start",
      position: "absolute",
      top: "7%",
      left: "7%",
    },
    boldText: {
      fontFamily: "poppinsBold",
      fontSize: 15,
    },
    dangerButton: {
      position: "absolute",
      bottom: "7%",
    },
    users: {
      flexDirection: "row",
      position: "absolute",
      top: "15%",
    },
    userList: {
      height: "60%",
      width: "90%",
    },
    user: {
      flexDirection: "row",
      margin: 10,
      alignItems: "center",
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.back}
        onPress={async (): Promise<void> => {
          navigation.navigate("chat");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <View style={style.users}>
        <Feather name="users" size={24} color="black" />
        <Text style={[style.boldText, { fontSize: 25, marginLeft: 15 }]}>
          Users:
        </Text>
      </View>

      <View style={style.userList}>
        <ScrollView>
          <View style={style.user}>
            <Icon
              iconLetter={userInfo.username[0]}
              color={userInfo.iconColor}
            />
            <Text
              style={[
                style.text,
                { fontSize: 22, marginLeft: 20, marginRight: 10 },
              ]}
            >
              {`${userInfo.username} (You)`}
            </Text>
            {userInfo.verified ? (
              <MaterialIcons name="verified-user" size={24} color={"#00AD98"} />
            ) : null}

            {userInfo.bot ? (
              <FontAwesome5 name="robot" size={24} color={"#00AD98"} />
            ) : null}
          </View>

          {roomUserInfo.map((user: AuthType): any => {
            return (
              <TouchableOpacity
                disabled={user.username === userInfo.username}
                onPress={(): void => {
                  dispatch(setProfileInfo(user));
                  navigation.navigate("user-profile");
                }}
              >
                <View style={style.user} key={user.id.concat("-e")}>
                  <Icon
                    iconLetter={user.username[0]}
                    color={user.iconColor}
                    key={user.id.concat("-a")}
                  />
                  <Text
                    style={[
                      style.text,
                      { fontSize: 22, marginLeft: 20, marginRight: 10 },
                    ]}
                    key={user.id.concat("-b")}
                  >
                    {user.username}
                  </Text>
                  {user.verified ? (
                    <MaterialIcons
                      name="verified-user"
                      size={24}
                      color={"#00AD98"}
                      key={user.id.concat("-c")}
                    />
                  ) : null}
                  {user.bot ? (
                    <FontAwesome5
                      name="robot"
                      size={24}
                      color={"#00AD98"}
                      key={user.id.concat("-d")}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={style.dangerButton}>
        <TouchableOpacity
          onPress={(): void => {
            navigation.navigate("room-id");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="ios-enter-outline"
            size={30}
            color="black"
            style={{ paddingHorizontal: 10 }}
          />
          <Text style={style.text}>Invite people</Text>
        </TouchableOpacity>
        <Button
          color={"red"}
          onPress={() => {
            navigation.push("room-danger-zone");
          }}
          textColor={"#ffff"}
          text={"Danger zone"}
        />
      </View>
    </View>
  );
};

export default RoomInformation;
