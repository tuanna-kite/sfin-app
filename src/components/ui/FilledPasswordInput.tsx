import { StyleSheet, TextInputProps, View } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Column,
  FormControl,
  Icon,
  Input,
  Pressable,
  Text,
} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type FilledPasswordInputProps = {
  label?: string;
} & TextInputProps;

const FilledPasswordInput = (props: FilledPasswordInputProps) => {
  const [shown, setShown] = useState(true);
  const { label, ...filledPasswordInputProps } = props;
  return (
    <FormControl>
      <FormControl.Label>{props.label}</FormControl.Label>
      <Box shadow={2}  >
        <Input
          {...filledPasswordInputProps}
          variant={"filled"}
          size={"md"}
          type={shown ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShown(!shown)}>
              <Icon
                as={
                  <MaterialIcons
                    name={shown ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
        ></Input>
      </Box>
    </FormControl>
  );
};

export default FilledPasswordInput;

const styles = StyleSheet.create({});
