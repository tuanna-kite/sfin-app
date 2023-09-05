import { StyleSheet } from "react-native";
import React,{useState} from "react";
import HeaderBackground from "../../../components/ui/HeaderBackground";
import { Box, Button, Column, FormControl } from "native-base";
import FilledPasswordInput from "../../../components/ui/FilledPasswordInput";

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [errorShown, setErrorShown] = useState(false);
  const oldPassword = '123456';
  function onSetPassword(text:string){
    setPassword(text);
  }
  function onChangePass(){
    if (password !== oldPassword){
      setErrorShown(true);
    }
  }
  return (
    <>
      <HeaderBackground text="Đổi mật khẩu" />
      <Column px={5} pt={8} mb={5} justifyContent="space-between" flex={1}>
        <Column space={3}>
          <FilledPasswordInput
            label="Mật khẩu cũ"
            placeholder="Nhập mật khẩu cũ"
            onChangeText={onSetPassword}
          />
          <FilledPasswordInput
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
          />
          <FilledPasswordInput
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
          />
          <FormControl isInvalid={errorShown}>
            <FormControl.ErrorMessage>Mật khẩu cũ không đúng</FormControl.ErrorMessage>
          </FormControl>
        </Column>
        <Button onPress={onChangePass}>ĐỔI MẬT KHẨU</Button>
      </Column>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
