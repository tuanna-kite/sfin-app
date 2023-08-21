import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  Column,
  Container,
  FormControl,
  Select,
  Text,
} from "native-base";
import PrimaryInput from "../../../components/ui/PrimaryInput";
import UnderlinedInput from "../../../components/ui/UnderlinedInput";

const FillProfile = () => {
  const [gender, setGender] = useState("");
  return (
    <Column flex={1}>
      <Box alignItems={"center"} justifyContent={"flex-end"} height={88}>
        <Text fontSize={16} fontWeight={500} color={"#111827"}>
          Thông tin cá nhân
        </Text>
      </Box>
      <Text fontSize={14} textAlign={"center"} paddingTop={30}>
        Vui lòng điền các thông tin sau
      </Text>
      <Box style={styles.inputContainer}>
        <Column space={2}>
          <PrimaryInput label="Họ tên" placeholder="Vui lòng nhập họ và tên" />
          <PrimaryInput
            label="Trường học"
            placeholder="Vui lòng nhập tên trường"
          />
          <PrimaryInput label="Ngày sinh" placeholder="dd/mm/yy" />
          <FormControl>
            <FormControl.Label>Giới tính</FormControl.Label>
            <Select
              variant="filled"
              shadow={10}
              selectedValue={gender}
              placeholder="Giới tính"
              _selectedItem={{ endIcon: <CheckIcon size={5} /> }}
              mt={1}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Select.Item label="Nam" value="m" />
              <Select.Item label="Nữ" value="f" />
            </Select>
          </FormControl>
          <Button rounded={"lg"} color={"#F8A01E"} marginTop={240}>
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
    height: 308,
    marginHorizontal: 15,
    marginTop: 20,
  },
});
