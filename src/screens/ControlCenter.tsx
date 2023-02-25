import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import UserMenu from "./UserMenu";
import Menu from "./Menu";
import AddRoom from "./AddRoom";

/**
 *
 */

const ControlCenter: React.FC = () => {
  const Tab: any = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={(options: any): Object => ({
        tabBarIcon: ({ color, size }: any): JSX.Element => {
          if (options.route.name === "menu") {
            return <Entypo name="chat" size={size} color={color} />;
          } else if (options.route.name === "signout-confirm") {
            return <Feather name="user" size={size} color={color} />;
          } else {
            return <Ionicons name="add-circle" size={size+10} color={color} />;
          }
        },
        tabBarActiveTintColor: "#00ad98",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="add-room"
        component={AddRoom}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="signout-confirm"
        component={UserMenu}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default ControlCenter;
