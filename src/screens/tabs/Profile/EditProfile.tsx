import { StyleSheet } from "react-native";
import React, { useState } from "react";
import HeaderBackground from "../../../components/ui/HeaderBackground";
import {
  Box,
  Button,
  CheckIcon,
  Column,
  FormControl,
  Icon,
  Image,
  Input,
  Pressable,
  Select,
} from "native-base";
import PrimaryInput from "../../../components/ui/PrimaryInput";
import moment from "moment";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

const EditProfile = () => {
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
    <>
      <HeaderBackground text="Sửa thông tin" />
      <Column p={5} mb={5} flex={1} justifyContent='space-between'>
        <Column w="100%" alignItems="center" space={2}>
          <Image alt="" source={require("../../../../assets/avatar.png")} />
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
        </Column>
        <Button>XONG</Button>
      </Column>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
