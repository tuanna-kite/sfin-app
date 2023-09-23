import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Column,
  Text,
  FormControl,
  Actionsheet,
  useDisclose,
} from "native-base";
import { EGender } from "../../types/user";

type Props = {
  onChange: (value: EGender) => void;
  selected?: EGender;
};

type ActionSheetProps = {
  isOpen: boolean;
  onOpen: {};
  onClose: {};
};

const GenderSelect = ({ onChange, selected }: Props) => {
  const [gender, setGender] = useState(selected);
  const [textGender, setTextGender] = useState("Giới tính");
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <>
      <Column w="full">
        <FormControl.Label _text={{ fontWeight: "medium" }}>
          Giới tính
        </FormControl.Label>
        <TouchableOpacity onPress={onOpen}>
          <Box bg="white" px="3" py="2.5" rounded="lg" shadow="2">
            <Text fontWeight="medium"> {gender}</Text>
          </Box>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Box w="100%" h={60} px={4} justifyContent="center">
                <Text
                  fontSize="16"
                  color="gray.500"
                  _dark={{
                    color: "gray.300",
                  }}
                >
                  Giới tính
                </Text>
              </Box>
              <Actionsheet.Item
                onPress={() => {
                  setGender(EGender.M);
                  onChange(EGender.M)
                  setTextGender("Nam");
                  onClose();
                }}
              >
                Nam
              </Actionsheet.Item>
              <Actionsheet.Item
                onPress={() => {
                  setGender(EGender.F);
                  onChange(EGender.F)
                  setTextGender("Nữ");
                  onClose();
                }}
              >
                Nữ
              </Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </TouchableOpacity>
      </Column>
    </>
  );
};

export default GenderSelect;

const styles = StyleSheet.create({});
