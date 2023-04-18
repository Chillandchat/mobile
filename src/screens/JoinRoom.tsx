import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { BarCodeScanner, PermissionResponse } from "expo-barcode-scanner";
import { MaterialIcons } from "@expo/vector-icons";

import Button from "../components/Button";
import Form from "../components/Form";
import { RootState } from "../redux/index.d";
import joinRoom from "../scripts/joinRoom";
import { useNavigation } from "@react-navigation/native";

/**
 * This is the join room page, this page will prompt the user to join a room.
 */

const JoinRoom: React.FC<any> = () => {
  const [name, setName]: any = React.useState("");
  const [password, setPassword]: any = React.useState("");
  const [scannerOn, setScannerOn]: any = React.useState(false);
  const [hasPermission, setHasPermission]: any = React.useState(null);

  const navigation: any = useNavigation();

  const { username }: RootState = useSelector((state: RootState): RootState => {
    return state.userInfo;
  });

  const [error, setError]: any = React.useState("");

  const getBarCodeScannerPermissions = async (): Promise<void> => {
    BarCodeScanner.requestPermissionsAsync().then(
      (permission: PermissionResponse): void => {
        setHasPermission(permission.status === "granted");
      }
    );
  };

  React.useEffect((): void => {
    if (!hasPermission) {
      setScannerOn(false);
    }
  }, [hasPermission]);

  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    divider: {
      padding: 20,
    },
    title: {
      fontFamily: "poppinsExtraBold",
      fontSize: 25,
      padding: 60,
    },
    error: {
      color: "red",
      marginTop: -20,
      marginBottom: 20,
      fontFamily: "poppinsLight",
    },
    scannerIcon: {
      position: "absolute",
      left: "7%",
      bottom: "5%",
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
    heading: {
      fontSize: 25,
      fontFamily: "poppinsExtraBold",
      alignSelf: "center",
      marginBottom: 20,
    },
    scannerBody: {
      borderRadius: 20,
      backgroundColor: "transparent",
      height: 300,
      width: 300,
      zIndex: 2000,
      overflow: "hidden",
    },
  });

  return scannerOn ? (
    <View style={style.container}>
      <Text style={style.heading}>Scan Room QR code</Text>
      <View style={style.scannerBody}>
        <BarCodeScanner
          onBarCodeScanned={(data: any): void => {
            if (!data.data.includes("!chillandchat-room-invite")) return;

            setScannerOn(false);
            setName(data.data.slice(26, -1));
          }}
          style={style.scanner}
        />
      </View>
      <Button
        color={"transparent"}
        textColor={"black"}
        text={"Cancel"}
        onPress={(): void => {
          setScannerOn(false);
        }}
      />
    </View>
  ) : (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={style.container}>
        <View>
          <Text style={style.title}>Join a room...</Text>
        </View>
        <Form
          safeEntry={false}
          placeholder={"Name"}
          value={name}
          onTextChange={(text: string): void => {
            setName(text);
          }}
        />

        <View style={style.divider} />

        <Form
          safeEntry
          placeholder={"Password"}
          onTextChange={(text: string): void => {
            setPassword(text);
          }}
        />

        <View style={style.divider} />

        <Text style={style.error}>{error}</Text>
        <Button
          color={"#00AD98"}
          textColor={"#ffff"}
          text={"Lets' go!"}
          onPress={(): void => {
            if (name !== "" && password !== "") {
              joinRoom(username, name, password)
                .then((): void => {
                  navigation.push("menu");
                })
                .catch((err: unknown): void => {
                  setError("Unable to join room.");
                  console.error(err);
                  setTimeout((): void => {
                    setError("");
                  }, 3000);
                });
            } else {
              setError("Please fill out all fields.");
              setTimeout((): void => {
                setError("");
              }, 3000);
            }
          }}
        />
        <Button
          textColor="black"
          color={"transparent"}
          onPress={(): void => {
            navigation.navigate("menu");
          }}
          text={"Cancel"}
        />
      </ScrollView>
      <TouchableOpacity
        style={style.scannerIcon}
        onPress={(): void => {
          setScannerOn(true);
          getBarCodeScannerPermissions();
        }}
      >
        <AntDesign name="scan1" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={style.publicIcon}
        onPress={(): void => {
          navigation.push("public-rooms");
        }}
      >
        <MaterialIcons name="public" size={30} color="black" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default JoinRoom;
