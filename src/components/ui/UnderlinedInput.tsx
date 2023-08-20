import { StyleSheet, TextInputProps, View } from "react-native";
import React from "react";
import { Column, Input, Text } from "native-base";

type InputProps = {
  aboveText?: string;
} & TextInputProps;

const UnderlinedInput = (props: InputProps) => {
  const { aboveText, ...inputProps } = props;
  return (
    <Column>
      {aboveText && <Text fontSize={12} {...inputProps}>{aboveText}</Text>}
      <Input
        variant={"underlined"}
        size={"md"}
        type="password"
        placeholder={aboveText}
      ></Input>
    </Column>
  );
};

export default UnderlinedInput;

const styles = StyleSheet.create({});
