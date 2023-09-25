import { StyleSheet, TextInputProps, View } from "react-native";
import React, { useState } from "react";
import { Column, FormControl, Icon, Input, Pressable, Text } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type PasswordInputProps = {
  onDoChange? : (value : any) => void;
  label?: string;
} & TextInputProps;

const PasswordInput = (props: PasswordInputProps) => {
  const [shown, setShown] = useState(false);
  const { label, onDoChange, ...passwordInputProps } = props;
  return (
    <FormControl>
      <FormControl.Label>{props.label}</FormControl.Label>
      <Input
        {...passwordInputProps}
        onChangeText={onDoChange}
        variant={"underlined"}
        bg="white"
        _focus={{ bg: "white" }}
        size={"md"}
        keyboardType="name-phone-pad"
        type={shown ? "text" : "password"}
        InputRightElement={
          <Pressable onPress={() => setShown(!shown)}>
            <Icon
              as={<MaterialIcons name={shown ? "visibility-off" : "visibility"} />}
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
      ></Input>
    </FormControl>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({});
