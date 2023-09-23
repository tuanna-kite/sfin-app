import { StyleSheet } from "react-native";
import React from "react";
import { Center, Column, Pressable, Text } from "native-base";

type Props = {
  onPress?: () => void;
  active?: boolean;
  value: number;
};

const LoanButton = ({ onPress, value, active }: Props) => {
  return (
    <Pressable flex="1" onPress={onPress}>
      <Center
        py="5"
        bg={active ? "#F8A01E" : "#FFFFFF"}
        shadow={2}
        rounded="2xl"
      >
        <Column>
          <Text
            fontSize={20}
            fontWeight={700}
            color={active ? "#FFFFFF" : "#F8A01E"}
            textAlign="center"
          >
            {value} Triệu
          </Text>
          <Text fontSize={12} color={active ? "#FFFFFF" : "#9CA3AF"}>
            Thời hạn: 1 tháng
          </Text>
        </Column>
      </Center>
    </Pressable>
  );
};

export default LoanButton;

const styles = StyleSheet.create({});
