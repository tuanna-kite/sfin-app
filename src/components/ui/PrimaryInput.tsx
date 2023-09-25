import { StyleSheet, TextInputProps, View } from "react-native";
import React from "react";
import {
  Box,
  Column,
  FormControl,
  IInputProps,
  Icon,
  Input,
  Text,
} from "native-base";

type PrimaryInputProps = {
  label?: string;
  my?: number;
  onDoChange?: (vakue: any) => void;
} & IInputProps;

const PrimaryInput = (props: PrimaryInputProps) => {
  const { label, my, onDoChange, ...primaryInputProps } = props;
  return (
    <FormControl my={my}>
      <FormControl.Label>{props.label}</FormControl.Label>
      <Box>
        <Input
          bg="white"
          py="3"
          shadow={2}
          variant="filled"
          onChangeText={onDoChange}
          {...primaryInputProps}
        />
      </Box>
    </FormControl>
  );
};

export default PrimaryInput;

const styles = StyleSheet.create({});
