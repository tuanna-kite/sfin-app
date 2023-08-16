import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/tabs/Home";
import Notification from "../screens/tabs/Notification";
import Profile from "../screens/tabs/Profile/Profile";
// import { BottomTabsParams } from "./types";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Notification" component={Notification} />
    </Tab.Navigator>
  );
};

export default TabNav;

const styles = StyleSheet.create({});
