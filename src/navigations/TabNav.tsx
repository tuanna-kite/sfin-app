import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/tabs/Home";
import Notification from "../screens/tabs/Notification";
import Profile from "../screens/tabs/Profile/Profile";
import Activities from "../screens/tabs/Activities";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Icon } from "native-base";
import ProfileVerification from "../screens/tabs/Profile/ProfileVerification";
// import { BottomTabsParams } from "./types";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon
              as={<MaterialIcons name="home" />}
              size={size}
              color={focused ? "#F8A01E" : "#9CA3AF"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon
              as={<MaterialIcons name="bar-chart" />}
              size={size}
              color={focused ? "#F8A01E" : "#9CA3AF"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon
              as={<MaterialIcons name="notifications" />}
              size={size}
              color={focused ? "#F8A01E" : "#9CA3AF"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon
              as={<MaterialIcons name="person" />}
              size={size}
              color={focused ? "#F8A01E" : "#9CA3AF"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;

const styles = StyleSheet.create({});
