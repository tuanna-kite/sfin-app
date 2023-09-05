import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp/SignUp";
import { AuthStackParams } from "./config";
import ForgotPassword from "../screens/auth/ForgotPassword";
import PhoneVerification from "../screens/auth/PhoneVerification";
import FillProfile from "../screens/auth/SignUp/FillProfile";

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
      <Stack.Screen name="FillProfile" component={FillProfile} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
