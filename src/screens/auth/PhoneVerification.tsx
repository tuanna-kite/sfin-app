import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import ClipBoard from "@react-native-community/clipboard";

const PhoneVerification = () => {
  return <OTPInputView pinCount={4} style={{ width: "80%", height: 200 }} />;
};

export default PhoneVerification;

const styles = StyleSheet.create({});
