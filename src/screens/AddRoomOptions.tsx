import { BarCodeScanner, PermissionResponse } from "expo-barcode-scanner";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dispatch } from "redux";

import Button from "../components/Button";
import { setScannerResult } from "../redux/action";

/**
 * This is the Add room options component located on the add room component.
 * This component will prompt the user with more options around the rooms they can create.
 */

const AddRoomOptions: React.FC = () => {
  const [scannerOn, setScannerOn]: any = React.useState(false);
  const [hasPermission, setHasPermission]: any = React.useState(null);

  const navigation: any = useNavigation();

  const dispatch: Dispatch = useDispatch();

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    scannerIcon: {
      position: "absolute",
      left: "7%",
      bottom: "5%",
    },
    divider: {
      padding: 20,
    },
    publicIcon: {
      position: "absolute",
      right: "7%",
      bottom: "5%",
    },
    scanner: {
      height: 300,
      width: 300,
      borderRadius: 20,
      alignSelf: "center",
    },
    scannerBody: {
      borderRadius: 20,
      backgroundColor: "transparent",
      height: 300,
      width: 300,
      zIndex: 2000,
      overflow: "hidden",
    },
    parent: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontFamily: "poppins",
      fontSize: 20,
      color: "#000",
      margin: 10,
    },
    back: {
      position: "absolute",
      top: "7%",
      left: "7%",
    },
  });

  return !scannerOn ? (
    <View style={style.container}>
      <TouchableOpacity
        style={style.back}
        onPress={(): void => {
          navigation.navigate("add-room");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={style.parent}
        onPress={async (): Promise<void> => {
          await BarCodeScanner.requestPermissionsAsync().then(
            (permission: PermissionResponse): void => {
              setHasPermission(permission.status === "granted");
            }
          );

          hasPermission
            ? setScannerOn(true)
            : await BarCodeScanner.requestPermissionsAsync().then(
                (_permission: PermissionResponse): void => {
                  setScannerOn(true);
                }
              );
        }}
      >
        <AntDesign name="scan1" size={30} color="black" />
        <Text style={style.text}>Scan invite code</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.parent}
        onPress={(): void => {
          navigation.goBack();
          navigation.navigate("public-rooms");
        }}
      >
        <MaterialIcons name="public" size={30} color="black" />
        <Text style={style.text}>Browse public rooms</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={style.container}>
      <View style={style.scannerBody}>
        <BarCodeScanner
          onBarCodeScanned={(data: any): void => {
            if (!data.data.includes("!chillandchat-room-invite")) return;

            dispatch(setScannerResult(data.data.slice(26, -1)));
            navigation.goBack();
            navigation.navigate("join-room");
          }}
          style={style.scanner}
        />
      </View>
      <View style={style.divider} />
      <Button
        color={"transparent"}
        textColor={"black"}
        text={"Cancel"}
        onPress={(): void => {
          setScannerOn(false);
        }}
      />
    </View>
  );
};

export default AddRoomOptions;
