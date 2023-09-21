import { StyleSheet, TextInputProps, View } from "react-native";
import React from "react";
import { Box, Column, FormControl, Icon, Input, Text, } from "native-base";



type PrimaryInputProps={
  label?:string
  my?:number
}& TextInputProps;

const PrimaryInput = (props: PrimaryInputProps) => {
  const {label,my,...primaryInputProps} = props;
  return (
    <FormControl my={my}>
      <FormControl.Label>{props.label}</FormControl.Label>
      <Box shadow={2}  >
        <Input bg="white" py="3" variant="filled" {...primaryInputProps} />
      </Box>
    </FormControl>
  );
};

export default PrimaryInput;

const styles = StyleSheet.create({});
