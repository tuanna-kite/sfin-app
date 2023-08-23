import { StyleSheet, TextInputProps, View } from "react-native";
import React from "react";
import { Box, Column, FormControl, Icon, Input, Text, } from "native-base";



type PrimaryInputProps={
  label?:string
}& TextInputProps;

const PrimaryInput = (props: PrimaryInputProps) => {
  const {label,...primaryInputProps} = props;
  return (
    <FormControl>
      <FormControl.Label>{props.label}</FormControl.Label>
      <Box shadow={2}  >
        <Input variant="filled" {...primaryInputProps} />
      </Box>
    </FormControl>
  );
};

export default PrimaryInput;

const styles = StyleSheet.create({});
