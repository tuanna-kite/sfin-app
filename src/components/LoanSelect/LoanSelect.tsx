import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Column, Row } from "native-base";
import LoanButton from "./LoanButton";

type Props = {
  onChange?: (value: number) => void;
};

const LoanSelect = ({ onChange }: Props) => {
  const [selected, setSelected] = useState(0);

  // Currying Function
  const onPress = (value: number) => () => {
    let newValue = value;
    if (value === selected) {
      newValue = 0;
    }
    setSelected(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <Column space={2} mt={2}>
      <Row space={2}>
        <LoanButton active={selected == 1} value={1} onPress={onPress(1)} />
        <LoanButton active={selected == 2} value={2} onPress={onPress(2)} />
      </Row>
      <Row space={2} w="full">
        <LoanButton active={selected == 3} value={3} onPress={onPress(3)} />
        <LoanButton active={selected == 5} value={5} onPress={onPress(5)} />
      </Row>
    </Column>
  );
};

export default LoanSelect;

const styles = StyleSheet.create({});
