import { StyleSheet, TextInputProps, View } from "react-native";
import React, { useState } from "react";
import { Column, Icon, Input, Pressable, Text } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type InputProps = {
  aboveText?: string;
} & TextInputProps;

const PasswordInput = (props: InputProps) => {
  const [shown, setShown] = useState(true);
  const { aboveText, ...inputProps } = props;
  return (
    <Column>
      {aboveText && <Text fontSize={12}>{aboveText}</Text>}
      <Input
        {...inputProps}
        variant={"underlined"}
        size={"md"}
        type={shown ? "text" : "password"}
        InputRightElement={
          <Pressable onPress={() => setShown(!shown)}>
            <Icon
              as={
                <MaterialIcons name={shown ? "visibility" : "visibility-off"} />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
      ></Input>
    </Column>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({});
