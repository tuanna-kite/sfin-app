import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Box, Column, FormControl, Text } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { EGender } from "../../types/user";

type Props = {
  value: Date;
  onChange: (value: Date) => void;
};



const FormDatePicker = ({ value, onChange }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Column w="full">
        <FormControl.Label _text={{ fontWeight: "medium" }}>Ngày sinh</FormControl.Label>
        <TouchableOpacity onPress={showDatePicker}>
          <Box bg="white" px="3" py="2.5" rounded="lg" shadow="2">
            <Text fontWeight="medium">{moment(value).format("DD - MM - YYYY")}</Text>
          </Box>
        </TouchableOpacity>
      </Column>
    </>
  );
};

export default FormDatePicker;

const styles = StyleSheet.create({});
