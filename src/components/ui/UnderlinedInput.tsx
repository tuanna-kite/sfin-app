import { StyleSheet, TextInputProps, View } from "react-native";
import React from "react";
import { Column, FormControl, Input, Text } from "native-base";

type UnderlinedInputProps = {
  onDoChange?: (value: any) => void;
  label?: string;
} & TextInputProps;

const UnderlinedInput = (props: UnderlinedInputProps) => {
  const { label, onDoChange, ...inputProps } = props;
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        {...inputProps}
        variant={"underlined"}
        size={"md"}
        type="text"
        placeholder={props.placeholder}
        onChangeText={onDoChange}
      ></Input>
    </FormControl>
  );
};

export default UnderlinedInput;

const styles = StyleSheet.create({});
