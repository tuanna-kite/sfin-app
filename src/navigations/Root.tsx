import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "./TabNav";
import ErrorOverlay from "../components/ErrorOverlay";
import { useAppSelector } from "../store";
import ProfileVerification from "../screens/tabs/Profile/ProfileVerification";
import { BottomTabsParams, RootStackParams } from "./config";
import Home from "../screens/tabs/Home";
import LoanRequest from "../screens/LoanRequest";
import Activities from "../screens/tabs/Activities";
import Payment from "../screens/Payment";
import Profile from "../screens/tabs/Profile/Profile";
import EditProfile from "../screens/tabs/Profile/EditProfile";
import ChangePassword from "../screens/tabs/Profile/ChangePassword";
import Notification from "../screens/tabs/Notification";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator<BottomTabsParams>();

const Root = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <>
      <ErrorOverlay />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!user && <Stack.Screen name="Auth" component={AuthStack} />}
          {user && <Stack.Screen name="TabNav" component={TabNav} />}
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen
            name="ProfileVerification"
            component={ProfileVerification}
          />
          <Stack.Screen name="LoanRequest" component={LoanRequest} />
          <Stack.Screen name="Payment" component={Payment} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Root;

const styles = StyleSheet.create({});
