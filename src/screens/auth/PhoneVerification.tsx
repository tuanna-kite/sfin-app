import { StyleSheet } from "react-native";
import React, { useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Box, Button, Center, Column, Text, View } from "native-base";
import FillProfile from "./SignUp/FillProfile";
import ResetPassword from "./ResetPassword";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";

type Props = {} & NativeStackScreenProps<AuthStackParams, "PhoneVerification">;

const PhoneVerification = ({ navigation, route }: Props) => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const realOTP = "1234";
  const phone = route.params.phone;

  function OTPVerifyHandler(code: string) {
    if (code === realOTP) {
      setShowResetPassword(true);
    }
  }

  return (
    <View flex={1}>
      {!showResetPassword && (
        <Column flex={1}>
          <Center flex={1}>
            <Text fontWeight={700} fontSize={16} textAlign="center">
              Mã xác thực OTP đã được gửi tới
            </Text>
            <Text textAlign="center" fontWeight={700} fontSize={16}>
              {phone}
            </Text>
            <OTPInputView
              selectionColor="#03DAC6"
              pinCount={4}
              style={{
                width: "70%",
                height: 150,
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 20,
              }}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.borderStyleHighLighted}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={OTPVerifyHandler}
            />
          </Center>
          <Center safeAreaBottom mb={10}>
            <Column mt={10}>
              <Text color="#6B7280" fontSize={12}>
                Không nhận được mã
              </Text>
              <Button
                _text={{ underline: true }}
                variant={"link"}
                fontSize={12}
                textDecorationLine="underline"
              >
                GỬI LẠI MÃ
              </Button>
            </Column>
          </Center>
        </Column>
      )}
      {showResetPassword && <ResetPassword />}
    </View>
  );
};

export default PhoneVerification;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: "#1F2937",
    fontSize: 30,
    color: "#F8A01E",
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: "#F8A01E",
  },
});
