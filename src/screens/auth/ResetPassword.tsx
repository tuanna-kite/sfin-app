import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Button, Center, Column, Text } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryInput from "../../components/ui/PrimaryInput";
import PasswordInput from "../../components/ui/PasswordInput";
import FilledPasswordInput from "../../components/ui/FilledPasswordInput";
import HeaderBackground from "../../components/ui/HeaderBackground";
import { useAppDispatch, useAppSelector } from "../../store";

const ResetPassword = () => {
 
  return (
    <Box flex={1}>
      <HeaderBackground text="Đổi mật khẩu" />
      <Column
        flex={1}
        mx={15}
        pt={7}
        justifyContent="space-between"
        safeAreaBottom={5}
      >
        <Column space={3}>
          <FilledPasswordInput
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            
          />
          <FilledPasswordInput
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
          />
        </Column>
        <Button rounded="lg" color="#F8A01E">
          ĐĂNG NHẬP
        </Button>
      </Column>
    </Box>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
