import { StyleSheet, TextInputProps, View } from "react-native";
import React from "react";
import { Column, FormControl, Input, Text } from "native-base";


const PrimaryInput = (props:any) => {
  return (
    <FormControl>
      <FormControl.Label>{props.label}</FormControl.Label>
      <Input variant='filled' shadow={1} placeholder={props.placeholder}/>
    </FormControl>
  );
};

export default PrimaryInput;

const styles = StyleSheet.create({});
