import { StyleSheet, ViewProps } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  Column,
  FormControl,
  Icon,
  Input,
  Pressable,
  Select,
  Text,
} from "native-base";
import PrimaryInput from "../../../components/ui/PrimaryInput";
import UnderlinedInput from "../../../components/ui/UnderlinedInput";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import moment from "moment";


const FillProfile = (props:ViewProps) => {
  const [gender, setGender] = useState("");
  const [dateShown, setDateShown] = useState(false);

  const [date, setDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState("");

  function dateShownHandler() {
    setDateShown(!dateShown);
  }
  function onChangeDate({ type }, selectedDate: Date) {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      dateShownHandler();
    } else {
      dateShownHandler();
    }
    setDateOfBirth(moment(date).format("DD/MM/YYYY"));
  }

  return (
    <Column flex={1}>
      <Box alignItems="center" justifyContent="flex-end" height={88}>
        <Text fontSize={16} fontWeight={500} color="#111827">
          Thông tin cá nhân
        </Text>
      </Box>
      <Text fontSize={14} textAlign="center" paddingTop={30}>
        Vui lòng điền các thông tin sau
      </Text>
      <Box style={styles.inputContainer}>
        <Column space={2}>
          <PrimaryInput label="Họ tên" placeholder="Vui lòng nhập họ và tên" />
          <PrimaryInput
            label="Trường học"
            placeholder="Vui lòng nhập tên trường"
          />
          {dateShown && (
            <RNDateTimePicker
              mode="date"
              display="calendar"
              value={date}
              onChange={onChangeDate}
              positiveButton={{ label: "Select" }}
            />
          )}
          <FormControl>
            <FormControl.Label>Ngày sinh</FormControl.Label>
            <Box shadow={2}>
              <Pressable onPress={dateShownHandler}>
                <Input
                  value={dateOfBirth}
                  isReadOnly
                  placeholder="Ngày sinh"
                  variant="filled"
                  InputRightElement={
                    <Icon
                      as={<MaterialIcons name="expand-more" />}
                      size={10}
                      ml="1"
                    />
                  }
                />
              </Pressable>
            </Box>
          </FormControl>
          <FormControl>
            <FormControl.Label>Giới tính</FormControl.Label>
            <Box shadow={2}>
              <Select
                variant="filled"
                selectedValue={gender}
                placeholder="Giới tính"
                _selectedItem={{ endIcon: <CheckIcon size={5} /> }}
                mt={1}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Select.Item label="Nam" value="m" />
                <Select.Item label="Nữ" value="f" />
              </Select>
            </Box>
          </FormControl>

          <Button rounded="lg" color="#F8A01E" marginTop={240}>
            TIẾP TỤC
          </Button>
        </Column>
      </Box>
    </Column>
  );
};

export default FillProfile;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 15,
    marginTop: 20,
  },
});
