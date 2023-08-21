import { StyleSheet, TextInputProps, View } from "react-native";
import React from "react";
import { Column, FormControl, Input, Text } from "native-base";

const UnderlinedInput = (props:any) => {
  return (
    <FormControl>
      <FormControl.Label>{props.label}</FormControl.Label>
      <Input
        variant={"underlined"}
        size={"md"}
        type="password"
        placeholder={props.placeholder}
      ></Input>
    </FormControl>
  );
};

export default UnderlinedInput;

const styles = StyleSheet.create({});
