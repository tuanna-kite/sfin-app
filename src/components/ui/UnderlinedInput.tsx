import { StyleSheet, TextInputProps, View } from "react-native";
import React from "react";
import { Column, FormControl, Input, Text } from "native-base";

type UnderlinedInputProps = {
  label?: string;
} & TextInputProps;

const UnderlinedInput = (props: UnderlinedInputProps) => {
  const { label, ...inputProps } = props;
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        {...inputProps}
        variant={"underlined"}
        size={"md"}
        type="text"
        placeholder={props.placeholder}
      ></Input>
    </FormControl>
  );
};

export default UnderlinedInput;

const styles = StyleSheet.create({});
